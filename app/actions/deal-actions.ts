'use server'

import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { normalizeUserPlan } from '@/lib/auth/user-context'

export interface ClaimResult {
  success: boolean
  url?: string
  error?: string
  limitReached?: boolean
  usage?: {
    weeklyUsed: number
    weeklyLimit: number
    monthlyUsed: number
    monthlyLimit: number
  }
}

// Allow-listed accounts that get full Founder/Legend-level access
// even without an active Dodo subscription row.
const PRO_USERS = new Set([
  'raviteja.journal@gmail.com',
  'hello@axionxlab.com',
  'pulligellaraviteja@gmail.com',
  ...(process.env.PRO_OVERRIDE_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
])

function getServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createServiceClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

/**
 * Server action: claim a deal click.
 *
 * Uses the *server* Supabase client so cookies/auth state are read correctly.
 * Calling the client-side helper here was returning a null user even when the
 * caller was logged in, which is why admins were seeing
 * "You must be logged in to claim this deal."
 */
export async function claimDeal(dealId: string, applicationUrl: string): Promise<ClaimResult> {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return { success: false, error: 'You must be logged in to claim this deal.' }
    }

    const serviceClient = getServiceRoleClient()
    if (!serviceClient) {
      console.error('Deal claim failed: SUPABASE_SERVICE_ROLE_KEY is not configured')
      return { success: false, error: 'Deal claims are temporarily unavailable. Please try again shortly.' }
    }

    // All privileged reads/writes below use service role only after the caller's
    // signed-in identity has been verified above. This avoids relying on a
    // user_deal_clicks INSERT policy while still scoping every operation to user.id.
    const { data: adminUser } = await serviceClient
      .from('admin_users')
      .select('role')
      .eq('email', user.email)
      .eq('is_active', true)
      .maybeSingle()

    const isAdmin = !!adminUser
    const isHardcodedPro = PRO_USERS.has((user.email || '').toLowerCase())

    // Active subscription lookup
    const { data: sub, error: subscriptionError } = await serviceClient
      .from('user_subscriptions')
      .select('plan, status, period_end')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (subscriptionError) {
      console.error('Error resolving subscription for deal claim:', subscriptionError)
      return { success: false, error: 'An error occurred while verifying your membership.' }
    }

    // Compute the user's effective plan using the same canonical mapping as UI/server auth.
    const plan = isAdmin || isHardcodedPro
      ? 'legend'
      : normalizeUserPlan(sub?.plan as string | null | undefined)

    // A terminal provider webhook can be delayed or missed. Annual paid plans
    // must have a valid end date and must never receive access past that date.
    const periodEndTime = sub?.period_end ? new Date(sub.period_end).getTime() : null
    const requiresPeriodEnd =
      !isAdmin &&
      !isHardcodedPro &&
      Boolean(sub) &&
      ['nextfounder', 'founder'].includes(plan)

    if (requiresPeriodEnd && (periodEndTime === null || Number.isNaN(periodEndTime))) {
      console.error(`Annual entitlement has no valid period end for user ${user.id}`)
      return {
        success: false,
        error: 'We could not verify your membership period. Please contact support@foundersprime.com.',
      }
    }

    if (requiresPeriodEnd && periodEndTime !== null && periodEndTime <= Date.now()) {
      console.warn(`Expired entitlement blocked during deal claim for user ${user.id}`)
      return { success: false, error: 'Your membership has expired. Please renew to claim this deal.' }
    }

    const isPro = isAdmin || ['founder', 'legend'].includes(plan)

    // Founder, Legend, and admins → unlimited claims
    if (isPro) {
      return { success: true, url: applicationUrl }
    }

    // Free users → blocked entirely
    if (plan === 'free') {
      return { success: false, error: 'Upgrade to NextFounder or Founder to claim this deal.' }
    }

    // NextFounder users — track weekly/monthly limits
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const startOfWeek = new Date()
    const dayOfWeek = startOfWeek.getDay()
    startOfWeek.setDate(startOfWeek.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
    startOfWeek.setHours(0, 0, 0, 0)

    const { count: monthlyCount, error: monthError } = await serviceClient
      .from('user_deal_clicks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('clicked_at', startOfMonth.toISOString())

    if (monthError) {
      console.error('Error counting monthly deal clicks:', monthError)
      return { success: false, error: 'An error occurred while verifying your access limits.' }
    }

    const { count: weeklyCount, error: weekError } = await serviceClient
      .from('user_deal_clicks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('clicked_at', startOfWeek.toISOString())

    if (weekError) {
      console.error('Error counting weekly deal clicks:', weekError)
      return { success: false, error: 'An error occurred while verifying your access limits.' }
    }

    const monthly = monthlyCount || 0
    const weekly = weeklyCount || 0

    if (monthly >= 20) {
      return {
        success: false,
        error: 'You have reached your monthly limit of 20 deal claims. Upgrade to Founder for unlimited access.',
        limitReached: true,
        usage: { weeklyUsed: weekly, weeklyLimit: 5, monthlyUsed: monthly, monthlyLimit: 20 },
      }
    }

    if (weekly >= 5) {
      return {
        success: false,
        error: 'You have reached your weekly limit of 5 deal claims. Resets every Monday, or upgrade to Founder for unlimited.',
        limitReached: true,
        usage: { weeklyUsed: weekly, weeklyLimit: 5, monthlyUsed: monthly, monthlyLimit: 20 },
      }
    }

    // Register the new click
    const { error: insertError } = await serviceClient
      .from('user_deal_clicks')
      .insert({ user_id: user.id, deal_id: dealId })

    if (insertError) {
      console.error('Error recording deal click:', insertError)
      return { success: false, error: 'Failed to register deal claim. Please try again.' }
    }

    return {
      success: true,
      url: applicationUrl,
      usage: { weeklyUsed: weekly + 1, weeklyLimit: 5, monthlyUsed: monthly + 1, monthlyLimit: 20 },
    }
  } catch (error) {
    console.error('Failed to claim deal:', error)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}
