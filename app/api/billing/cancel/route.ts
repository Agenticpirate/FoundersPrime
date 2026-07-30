import { NextRequest, NextResponse } from 'next/server'
import DodoPayments from 'dodopayments'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import { billingLimiter, rateLimitHeaders } from '@/lib/security/rate-limit'
import {
  isMissingDodoIdColumnError,
  resolveDodoSubscriptionId,
} from '@/lib/billing/provider-columns'

function getServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createServiceClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

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
export async function POST(req: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Privileged subscription reads/writes happen only after cookie-auth
    // verification and remain scoped to the authenticated user ID.
    const serviceClient = getServiceRoleClient()
    if (!serviceClient) {
      console.error('Subscription cancellation failed: service role is not configured')
      return NextResponse.json(
        { error: 'Subscription management is temporarily unavailable. Please try again shortly.' },
        { status: 500 }
      )
    }

    // Rate-limit cancellation by user ID (10 attempts per 5 min)
    const rateLimitResult = billingLimiter(user.id)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many cancellation requests. Please wait before trying again.' },
        {
          status: 429,
          headers: rateLimitHeaders(rateLimitResult),
        }
      )
    }

    let reason = 'Not specified'
    let feedback = ''
    let confirmed = false
    try {
      const body = await req.json()
      reason = body.reason || 'Not specified'
      feedback = body.feedback || ''
      confirmed = body.confirm === true
    } catch (e) {
      // Ignore body parsing issues if none provided
    }

    // Require explicit client confirmation payload
    if (!confirmed) {
      return NextResponse.json(
        { error: 'Please confirm cancellation before proceeding.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.DODO_PAYMENTS_API_KEY
    const env = (process.env.DODO_PAYMENTS_ENVIRONMENT || 'test_mode') as 'test_mode' | 'live_mode'
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Payments are not configured. Email support@foundersprime.com.' },
        { status: 500 }
      )
    }

    // Find the active subscription row. Prefer the canonical Dodo identifier
    // column and fall back to the legacy name if the rename migration has not
    // reached this database yet.
    const selectActiveSubscription = (columns: string) =>
      serviceClient
        .from('user_subscriptions')
        .select(columns)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

    let { data: sub, error: subErr } = await selectActiveSubscription(
      'id, plan, dodo_subscription_id, stripe_subscription_id, status, period_end, cancel_at_period_end'
    ) as { data: any; error: { message?: string } | null }

    if (subErr && isMissingDodoIdColumnError(subErr)) {
      ;({ data: sub, error: subErr } = await selectActiveSubscription(
        'id, plan, stripe_subscription_id, status, period_end, cancel_at_period_end'
      ) as { data: any; error: { message?: string } | null })
    }

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

    // Already scheduled to cancel — treat as success (idempotent)
    if (sub.cancel_at_period_end === true) {
      return NextResponse.json({
        success: true,
        message: sub.period_end
          ? `Auto-renewal is already off. You keep access until ${new Date(sub.period_end).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.`
          : 'Auto-renewal is already cancelled for this subscription.',
        periodEnd: sub.period_end,
      })
    }

    const dodoSubscriptionId = resolveDodoSubscriptionId(sub)

    if (!dodoSubscriptionId) {
      return NextResponse.json(
        {
          error:
            'We could not find a billing reference for your subscription. Please email support@foundersprime.com so we can cancel manually.',
        },
        { status: 400 }
      )
    }

    // Tell Dodo to stop auto-renewal at the next billing date and attach feedback in metadata
    const dodo = new DodoPayments({ bearerToken: apiKey, environment: env })
    try {
      await dodo.subscriptions.update(dodoSubscriptionId, {
        cancel_at_next_billing_date: true,
        metadata: {
          cancel_reason: reason,
          cancel_feedback: feedback,
        }
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

    // Reflect locally so the UI updates immediately. Try updating with reason & feedback fields,
    // falling back to only cancel_at_period_end if the optional feedback columns are absent.
    let localUpdateError: { message?: string } | null = null
    try {
      const { data: updatedRow, error: updateErr } = await serviceClient
        .from('user_subscriptions')
        .update({
          cancel_at_period_end: true,
          cancel_reason: reason,
          cancel_feedback: feedback,
          updated_at: new Date().toISOString(),
        })
        .eq('id', sub.id)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .select('id')
        .maybeSingle()

      if (updateErr) {
        const { data: fallbackRow, error: fallbackError } = await serviceClient
          .from('user_subscriptions')
          .update({
            cancel_at_period_end: true,
            updated_at: new Date().toISOString(),
          })
          .eq('id', sub.id)
          .eq('user_id', user.id)
          .eq('status', 'active')
          .select('id')
          .maybeSingle()
        localUpdateError = fallbackError ||
          (fallbackRow ? null : { message: 'Local cancellation marker updated zero rows' })
      } else if (!updatedRow) {
        localUpdateError = { message: 'Local cancellation marker updated zero rows' }
      }
    } catch (dbErr) {
      localUpdateError = {
        message: dbErr instanceof Error ? dbErr.message : 'Unknown database update error',
      }
    }

    if (localUpdateError) {
      // Dodo already accepted the cancellation. Do not falsely report a fully
      // synchronized state; retries are safe and support can reconcile the row.
      console.error('Provider cancellation succeeded but local marker failed:', localUpdateError.message)
      return NextResponse.json(
        {
          error:
            'Auto-renewal was cancelled with the payment provider, but your account display has not updated yet. Please retry shortly or contact support@foundersprime.com.',
          providerCancelled: true,
        },
        { status: 500 }
      )
    }

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
