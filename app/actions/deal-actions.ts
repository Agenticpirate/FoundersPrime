'use server'

import { createClient } from '@/lib/supabase/server'
import { checkProStatus } from '@/lib/auth/user-context'

export interface ClaimResult {
  success: boolean
  url?: string
  error?: string
  limitReached?: boolean
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

    // Count how many deals the Explorer user has claimed this month
    // We do this by hitting the user_deal_clicks table directly here
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count, error: countError } = await supabase
      .from('user_deal_clicks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('clicked_at', startOfMonth.toISOString())

    if (countError) {
      console.error('Error counting deal clicks:', countError)
      return { success: false, error: 'An error occurred while verifying your access limits.' }
    }

    const limit = 10
    const currentCount = count || 0

    if (currentCount >= limit) {
      return { 
        success: false, 
        error: `You have reached your limit of ${limit} deal claims this month.`,
        limitReached: true
      }
    }

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

    // Success! Return the URL
    return { success: true, url: applicationUrl }

  } catch (error) {
    console.error('Failed to claim deal:', error)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}
