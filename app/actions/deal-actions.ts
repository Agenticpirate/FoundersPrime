'use server'

import { createClient } from '@/lib/supabase/server'
import { checkProStatus } from '@/lib/auth/user-context'

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

export async function claimDeal(dealId: string, applicationUrl: string): Promise<ClaimResult> {
  try {
    const { isAuthenticated, isPro, user } = await checkProStatus()

    if (!isAuthenticated || !user) {
      return { success: false, error: 'You must be logged in to claim this deal.' }
    }

    // Admins and full Pro users (Founder/Legend) have unlimited access
    if (isPro) {
      return { success: true, url: applicationUrl }
    }

    // Only Explorer users are tracked for limits (Free users are blocked completely)
    if (user.plan !== 'explorer') {
      return { success: false, error: 'Upgrade to Explorer or Founder to claim this deal.' }
    }

    const supabase = createClient()

    // Explorer limits: 5 deals per week, 20 deals per month
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const startOfWeek = new Date()
    const dayOfWeek = startOfWeek.getDay()
    startOfWeek.setDate(startOfWeek.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
    startOfWeek.setHours(0, 0, 0, 0)

    // Check monthly limit (20)
    const { count: monthlyCount, error: monthError } = await supabase
      .from('user_deal_clicks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('clicked_at', startOfMonth.toISOString())

    if (monthError) {
      console.error('Error counting monthly deal clicks:', monthError)
      return { success: false, error: 'An error occurred while verifying your access limits.' }
    }

    // Check weekly limit (5)
    const { count: weeklyCount, error: weekError } = await supabase
      .from('user_deal_clicks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('clicked_at', startOfWeek.toISOString())

    if (weekError) {
      console.error('Error counting weekly deal clicks:', weekError)
      return { success: false, error: 'An error occurred while verifying your access limits.' }
    }

    if ((monthlyCount || 0) >= 20) {
      return { 
        success: false, 
        error: 'You have reached your monthly limit of 20 deal claims. Upgrade to Founder for unlimited access.',
        limitReached: true,
        usage: { weeklyUsed: weeklyCount || 0, weeklyLimit: 5, monthlyUsed: monthlyCount || 0, monthlyLimit: 20 }
      }
    }

    if ((weeklyCount || 0) >= 5) {
      return { 
        success: false, 
        error: 'You have reached your weekly limit of 5 deal claims. Resets every Monday, or upgrade to Founder for unlimited.',
        limitReached: true,
        usage: { weeklyUsed: weeklyCount || 0, weeklyLimit: 5, monthlyUsed: monthlyCount || 0, monthlyLimit: 20 }
      }
    }

    const currentCount = monthlyCount || 0
    const currentWeekly = weeklyCount || 0

    // Register the new click
    const { error: insertError } = await supabase
      .from('user_deal_clicks')
      .insert({
        user_id: user.id,
        deal_id: dealId
      })

    if (insertError) {
      console.error('Error recording deal click:', insertError)
      return { success: false, error: 'Failed to register deal claim. Please try again.' }
    }

    // Success! Return the URL with usage stats
    return { 
      success: true, 
      url: applicationUrl,
      usage: { weeklyUsed: currentWeekly + 1, weeklyLimit: 5, monthlyUsed: currentCount + 1, monthlyLimit: 20 }
    }

  } catch (error) {
    console.error('Failed to claim deal:', error)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}
