// User Context and Pro Status Utilities
import { createClient } from '@/lib/supabase/client'

export interface UserProfile {
  id: string
  email: string
  name?: string
  isPro: boolean      // True for Founder, Legend, Admin (Full Access)
  isCampus: boolean   // True for Campus / Student plan ($9.99/mo)
  isAdmin: boolean
  plan: 'free' | 'campus' | 'founder' | 'legend'
  subscription?: {
    plan: 'free' | 'campus' | 'founder' | 'legend' | 'explorer' | 'pro' | 'pro-plus'
    status: 'active' | 'cancelled' | 'expired'
    expiresAt?: string
  }
}

// Admin/Pro users who get full access
const PRO_USERS = [
  'raviteja.journal@gmail.com',
  'hello@axionxlab.com',
]

// Check if user has Pro access
export async function checkProStatus(): Promise<{
  isAuthenticated: boolean
  isPro: boolean
  isAdmin: boolean
  user: UserProfile | null
}> {
  try {
    const supabase = createClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return {
        isAuthenticated: false,
        isPro: false,
        isAdmin: false,
        user: null
      }
    }

    // Check if user is in Pro users list
    const isHardcodedPro = PRO_USERS.includes(user.email || '')
    
    // Check if user is admin
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', user.email)
      .eq('is_active', true)
      .single()

    const isAdmin = !!adminData

    // Check actual subscriptions
    const { data: subData } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    let computedPlan: 'free' | 'campus' | 'founder' | 'legend' = 'free'
    
    if (isAdmin || isHardcodedPro) {
      computedPlan = 'legend'
    } else if (subData) {
      // Map legacy 'explorer' subscriptions to 'campus'
      const dbPlan = subData.plan as string
      computedPlan = (dbPlan === 'explorer' ? 'campus' : dbPlan) as any
    }

    const isPro = ['founder', 'legend'].includes(computedPlan) || isAdmin
    const isCampus = computedPlan === 'campus'

    const userProfile: UserProfile = {
      id: user.id,
      email: user.email || '',
      name: user.user_metadata?.name || user.email?.split('@')[0],
      isPro,
      isCampus,
      isAdmin,
      plan: computedPlan,
      subscription: {
        plan: computedPlan,
        status: 'active',
        expiresAt: subData?.period_end
      }
    }

    return {
      isAuthenticated: true,
      isPro,
      isAdmin,
      user: userProfile
    }
  } catch (error) {
    console.error('Pro status check error:', error)
    return {
      isAuthenticated: false,
      isPro: false,
      isAdmin: false,
      user: null
    }
  }
}

// Quick check for Pro status (client-side)
export async function isProUser(): Promise<boolean> {
  const { isPro } = await checkProStatus()
  return isPro
}

// Quick check for Campus / Student status (client-side)
export async function isCampusUser(): Promise<boolean> {
  const { user } = await checkProStatus()
  return !!user?.isCampus
}

// Quick check for Admin status (client-side)
export async function isAdminUser(): Promise<boolean> {
  const { isAdmin } = await checkProStatus()
  return isAdmin
}

// Get current user profile
export async function getCurrentUser(): Promise<UserProfile | null> {
  const { user } = await checkProStatus()
  return user
}
