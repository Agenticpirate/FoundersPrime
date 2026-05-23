import { NextRequest, NextResponse } from 'next/server'
import DodoPayments from 'dodopayments'
import { createClient } from '@/lib/supabase/server'

/**
 * Cancel auto-renewal for the signed-in user's active subscription.
 *
 * - Calls Dodo `subscriptions.update(id, { cancel_at_next_billing_date: true })`
 *   so the user keeps access until the period ends, then auto-renew stops.
 * - Marks the row in user_subscriptions with cancel_at_period_end=true.
 * - The actual transition to `cancelled` happens via the
 *   `subscription.cancelled` webhook when Dodo finalizes the cancellation
 *   at period end.
 */
export async function POST(_req: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const apiKey = process.env.DODO_PAYMENTS_API_KEY
    const env = (process.env.DODO_PAYMENTS_ENVIRONMENT || 'test_mode') as 'test_mode' | 'live_mode'
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Payments are not configured. Email support@foundersprime.com.' },
        { status: 500 }
      )
    }

    // Find the active subscription row
    const { data: sub, error: subErr } = await supabase
      .from('user_subscriptions')
      .select('id, plan, stripe_subscription_id, status, period_end')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (subErr || !sub) {
      return NextResponse.json(
        { error: "You don't have an active subscription to cancel." },
        { status: 404 }
      )
    }

    // Lifetime / Legend plans have no auto-renewal
    if (sub.plan === 'legend') {
      return NextResponse.json(
        { error: 'Legend plan is a one-time purchase. There is nothing to cancel — your access never expires.' },
        { status: 400 }
      )
    }

    if (!sub.stripe_subscription_id) {
      return NextResponse.json(
        {
          error:
            'We could not find a billing reference for your subscription. Please email support@foundersprime.com so we can cancel manually.',
        },
        { status: 400 }
      )
    }

    // Tell Dodo to stop auto-renewal at the next billing date
    const dodo = new DodoPayments({ bearerToken: apiKey, environment: env })
    try {
      await dodo.subscriptions.update(sub.stripe_subscription_id, {
        cancel_at_next_billing_date: true,
      })
    } catch (e: any) {
      console.error('Dodo cancel error:', e?.message || e)
      return NextResponse.json(
        {
          error:
            'We could not contact the payments provider. Please try again or email support@foundersprime.com.',
        },
        { status: 502 }
      )
    }

    // Reflect locally so the UI updates immediately
    await supabase
      .from('user_subscriptions')
      .update({
        cancel_at_period_end: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', sub.id)

    return NextResponse.json({
      success: true,
      message:
        sub.period_end
          ? `Auto-renewal cancelled. You'll keep full access until ${new Date(sub.period_end).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.`
          : "Auto-renewal cancelled. You'll keep access until your current billing period ends.",
      periodEnd: sub.period_end,
    })
  } catch (error: any) {
    console.error('Cancel API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please email support@foundersprime.com.' },
      { status: 500 }
    )
  }
}
