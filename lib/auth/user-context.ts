// User Context and Pro Status Utilities
import { createClient } from '@/lib/supabase/client'

export interface UserProfile {
  id: string
  email: string
  name?: string
  isPro: boolean
  isAdmin: boolean
  subscription?: {
    plan: 'free' | 'pro' | 'pro-plus'
    status: 'active' | 'cancelled' | 'expired'
    expiresAt?: string
  }
}

// Admin/Pro users who get full access
const PRO_USERS = [
  'raviteja.journal@gmail.com',
  // Add more pro users here
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
    const isPro = PRO_USERS.includes(user.email || '')
    
    // Check if user is admin
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', user.email)
      .eq('is_active', true)
      .single()

    const isAdmin = !!adminData

    // If admin or in pro list, grant pro access
    const hasProAccess = isPro || isAdmin

    const userProfile: UserProfile = {
      id: user.id,
      email: user.email || '',
      name: user.user_metadata?.name || user.email?.split('@')[0],
      isPro: hasProAccess,
      isAdmin: isAdmin,
      subscription: hasProAccess ? {
        plan: isAdmin ? 'pro-plus' : 'pro',
        status: 'active'
      } : {
        plan: 'free',
        status: 'active'
      }
    }

    return {
      isAuthenticated: true,
      isPro: hasProAccess,
      isAdmin: isAdmin,
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
