// User Context and Pro Status Utilities
import { createClient } from '@/lib/supabase/client'

export interface UserProfile {
  id: string
  email: string
  name?: string
  isPro: boolean        // True for Founder, Legend, Admin (Full Access)
  isNextFounder: boolean // True for NextFounder / Student plan ($1/yr)
  isAdmin: boolean
  plan: 'free' | 'nextfounder' | 'founder' | 'legend'
  subscription?: {
    plan: 'free' | 'nextfounder' | 'founder' | 'legend' | 'campus' | 'explorer' | 'pro' | 'pro-plus'
    status: 'active' | 'cancelled' | 'expired'
    expiresAt?: string
  }
}

// Pro-override emails — admin access without a subscription row.
// Configurable via PRO_OVERRIDE_EMAILS (comma-separated env var).
// The DB subscription check is the primary, authoritative source.
// Hardcoded entries below are always active regardless of env vars.
const PRO_OVERRIDE_EMAILS: Set<string> = new Set([
  // ── Hardcoded overrides ──────────────────────────────────────────────
  'raviteja.journal@gmail.com',
  'hello@axionxlab.com',
  'pulligellaraviteja@gmail.com',
  // ── Env-var-driven overrides (comma-separated) ───────────────────────
  ...(process.env.PRO_OVERRIDE_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
])

// Memory cache for user status
let cachedStatus: {
  isAuthenticated: boolean
  isPro: boolean
  isAdmin: boolean
  user: UserProfile | null
} | null = null

// Flag to prevent multiple concurrent requests
let pendingCheckPromise: Promise<{
  isAuthenticated: boolean
  isPro: boolean
  isAdmin: boolean
  user: UserProfile | null
}> | null = null

// Initialize listener in browser context
if (typeof window !== 'undefined') {
  try {
    const supabase = createClient()
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
        cachedStatus = null
        try {
          sessionStorage.removeItem('user_pro_status')
        } catch {}
      } else if (event === 'SIGNED_IN') {
        cachedStatus = null
        try {
          sessionStorage.removeItem('user_pro_status')
        } catch {}
        // Pre-fetch in background
        checkProStatus().catch(() => {})
      }
    })
  } catch (err) {
    console.error('Failed to initialize auth state listener:', err)
  }
}

// Check if user has Pro access
export async function checkProStatus(): Promise<{
  isAuthenticated: boolean
  isPro: boolean
  isAdmin: boolean
  user: UserProfile | null
}> {
  // If cached in memory, return instantly
  if (cachedStatus) {
    return cachedStatus
  }

  // If in browser session storage, parse and use it
  if (typeof window !== 'undefined') {
    try {
      const localData = sessionStorage.getItem('user_pro_status')
      if (localData) {
        const parsed = JSON.parse(localData)
        cachedStatus = parsed
        // Refresh in background to keep it fresh
        fetchAndCacheProStatus().catch(() => {})
        return parsed
      }
    } catch {}
  }

  // Deduplicate inflight requests
  if (pendingCheckPromise) {
    return pendingCheckPromise
  }

  pendingCheckPromise = fetchAndCacheProStatus()
  try {
    const result = await pendingCheckPromise
    return result
  } finally {
    pendingCheckPromise = null
  }
}

async function fetchAndCacheProStatus(): Promise<{
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
      const emptyResult = {
        isAuthenticated: false,
        isPro: false,
        isAdmin: false,
        user: null
      }
      if (typeof window !== 'undefined') {
        cachedStatus = emptyResult
        try {
          sessionStorage.setItem('user_pro_status', JSON.stringify(emptyResult))
        } catch {}
      }
      return emptyResult
    }

    // Check if user email is in the override list (env-var-driven)
    const isHardcodedPro = PRO_OVERRIDE_EMAILS.has((user.email || '').toLowerCase())
    
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

    let computedPlan: 'free' | 'nextfounder' | 'founder' | 'legend' = 'free'
    
    if (isAdmin || isHardcodedPro) {
      computedPlan = 'legend'
    } else if (subData) {
      // Map legacy 'explorer' / 'campus' subscriptions to 'nextfounder'
      const dbPlan = subData.plan as string
      computedPlan = (
        dbPlan === 'explorer' || dbPlan === 'campus' ? 'nextfounder' : dbPlan
      ) as any
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

    const result = {
      isAuthenticated: true,
      isPro,
      isAdmin,
      user: userProfile
    }

    if (typeof window !== 'undefined') {
      cachedStatus = result
      try {
        sessionStorage.setItem('user_pro_status', JSON.stringify(result))
      } catch {}
    }

    return result
  } catch (error) {
    console.error('Pro status check error:', error)
    const emptyResult = {
      isAuthenticated: false,
      isPro: false,
      isAdmin: false,
      user: null
    }
    return emptyResult
  }
}

// Quick check for Pro status (client-side)
export async function isProUser(): Promise<boolean> {
  const { isPro } = await checkProStatus()
  return isPro
}

// Quick check for NextFounder / Student status (client-side)
export async function isNextFounderUser(): Promise<boolean> {
  const { user } = await checkProStatus()
  return !!user?.isNextFounder
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
