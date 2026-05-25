'use server'

import { createClient } from '@/lib/supabase/server'

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
const PRO_USERS = ['raviteja.journal@gmail.com', 'hello@axionxlab.com']

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

    // Admin lookup
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('role')
      .eq('email', user.email)
      .eq('is_active', true)
      .maybeSingle()

    const isAdmin = !!adminUser
    const isHardcodedPro = PRO_USERS.includes(user.email || '')

    // Active subscription lookup
    const { data: sub } = await supabase
      .from('user_subscriptions')
      .select('plan, status')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    // Compute the user's effective plan
    let plan: 'free' | 'nextfounder' | 'founder' | 'legend' = 'free'
    if (isAdmin || isHardcodedPro) {
      plan = 'legend'
    } else if (sub?.plan) {
      const raw = String(sub.plan)
      plan = (raw === 'explorer' || raw === 'campus' ? 'nextfounder' : raw) as typeof plan
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

    const { count: monthlyCount, error: monthError } = await supabase
      .from('user_deal_clicks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('clicked_at', startOfMonth.toISOString())

    if (monthError) {
      console.error('Error counting monthly deal clicks:', monthError)
      return { success: false, error: 'An error occurred while verifying your access limits.' }
    }

    const { count: weeklyCount, error: weekError } = await supabase
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
    const { error: insertError } = await supabase
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
