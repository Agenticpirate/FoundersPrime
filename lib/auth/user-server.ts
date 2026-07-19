// Server-side check for Pro status
import { createClient } from '@/lib/supabase/server'
import { UserProfile, normalizeUserPlan, type UserPlan } from './user-context'

const PRO_USERS = [
  'raviteja.journal@gmail.com',
  'hello@axionxlab.com',
  'pulligellaraviteja@gmail.com',
]

export async function checkProStatusServer(): Promise<{
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

    let computedPlan: UserPlan = 'free'
    
    if (isAdmin || isHardcodedPro) {
      computedPlan = 'legend'
    } else if (subData) {
      computedPlan = normalizeUserPlan(subData.plan as string)
    }

    const isPro = ['founder', 'legend'].includes(computedPlan) || isAdmin
    const isNextFounder = computedPlan === 'nextfounder'

    const userProfile: UserProfile = {
      id: user.id,
      email: user.email || '',
      name: user.user_metadata?.name || user.email?.split('@')[0],
      isPro,
      isNextFounder,
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
    console.error('Server Pro status check error:', error)
    return {
      isAuthenticated: false,
      isPro: false,
      isAdmin: false,
      user: null
    }
  }
}
