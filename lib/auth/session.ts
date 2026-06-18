/**
 * Session Management Utilities
 * 
 * Handles user session management, persistence, and security
 */

import { createClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import type { Session, User } from '@supabase/supabase-js'

export interface SessionInfo {
  user: User | null
  session: Session | null
  isAuthenticated: boolean
  expiresAt?: Date
  createdAt?: Date
}

export interface SessionActivity {
  userId: string
  action: 'login' | 'logout' | 'refresh' | 'access'
  timestamp: Date
  ipAddress?: string
  userAgent?: string
  location?: string
}

/**
 * Get current session information (server-side)
 *
 * SECURITY: authenticates with getUser() (which revalidates the token against
 * the Supabase Auth server) rather than trusting getSession()'s cookie-decoded
 * claims. Session metadata (expiry) is read only for display after the user is
 * confirmed authentic.
 */
export async function getSession(): Promise<SessionInfo> {
  try {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return {
        user: null,
        session: null,
        isAuthenticated: false
      }
    }

    // User is verified; pull session only for non-authoritative expiry metadata.
    const { data: { session } } = await supabase.auth.getSession()

    return {
      user,
      session: session ?? null,
      isAuthenticated: true,
      expiresAt: session?.expires_at ? new Date(session.expires_at * 1000) : undefined,
      createdAt: user.created_at ? new Date(user.created_at) : undefined
    }
  } catch {
    return {
      user: null,
      session: null,
      isAuthenticated: false
    }
  }
}

/**
 * Get current session information (client-side)
 */
export async function getSessionClient(): Promise<SessionInfo> {
  try {
    const supabase = createBrowserClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error || !session) {
      return {
        user: null,
        session: null,
        isAuthenticated: false
      }
    }

    return {
      user: session.user,
      session: session,
      isAuthenticated: true,
      expiresAt: session.expires_at ? new Date(session.expires_at * 1000) : undefined,
      createdAt: session.user.created_at ? new Date(session.user.created_at) : undefined
    }
  } catch {
    return {
      user: null,
      session: null,
      isAuthenticated: false
    }
  }
}

/**
 * Refresh current session (server-side)
 */
export async function refreshSession(): Promise<SessionInfo> {
  try {
    const supabase = createClient()
    const { data: { session }, error } = await supabase.auth.refreshSession()

    if (error || !session) {
      return {
        user: null,
        session: null,
        isAuthenticated: false
      }
    }

    return {
      user: session.user,
      session: session,
      isAuthenticated: true,
      expiresAt: session.expires_at ? new Date(session.expires_at * 1000) : undefined
    }
  } catch {
    return {
      user: null,
      session: null,
      isAuthenticated: false
    }
  }
}

/**
 * Refresh current session (client-side)
 */
export async function refreshSessionClient(): Promise<SessionInfo> {
  try {
    const supabase = createBrowserClient()
    const { data: { session }, error } = await supabase.auth.refreshSession()

    if (error || !session) {
      return {
        user: null,
        session: null,
        isAuthenticated: false
      }
    }

    return {
      user: session.user,
      session: session,
      isAuthenticated: true,
      expiresAt: session.expires_at ? new Date(session.expires_at * 1000) : undefined
    }
  } catch {
    return {
      user: null,
      session: null,
      isAuthenticated: false
    }
  }
}

/**
 * End current session (server-side)
 */
export async function endSession(): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to end session'
    }
  }
}

/**
 * End current session (client-side)
 */
export async function endSessionClient(): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createBrowserClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to end session'
    }
  }
}

/**
 * Check if session is valid and not expired
 */
export async function isSessionValid(): Promise<boolean> {
  const sessionInfo = await getSession()
  
  if (!sessionInfo.isAuthenticated || !sessionInfo.session) {
    return false
  }

  // Check if session is expired
  if (sessionInfo.expiresAt && sessionInfo.expiresAt < new Date()) {
    return false
  }

  return true
}

/**
 * Get session time remaining in seconds
 */
export async function getSessionTimeRemaining(): Promise<number> {
  const sessionInfo = await getSession()
  
  if (!sessionInfo.expiresAt) {
    return 0
  }

  const now = new Date()
  const remaining = Math.floor((sessionInfo.expiresAt.getTime() - now.getTime()) / 1000)
  
  return Math.max(0, remaining)
}

/**
 * Set up automatic session refresh
 * Returns a cleanup function to stop the refresh interval
 */
export function setupAutoRefresh(intervalMinutes: number = 50): () => void {
  const supabase = createBrowserClient()
  
  const intervalMs = intervalMinutes * 60 * 1000
  const intervalId = setInterval(async () => {
    try {
      await supabase.auth.refreshSession()
    } catch (error) {
      console.error('Auto-refresh failed:', error)
    }
  }, intervalMs)

  // Return cleanup function
  return () => clearInterval(intervalId)
}

/**
 * Log session activity (for security monitoring)
 */
export async function logSessionActivity(
  activity: Omit<SessionActivity, 'timestamp'>
): Promise<void> {
  try {
    const supabase = createClient()
    
    // Store in session_activity table (you'll need to create this table)
    await supabase.from('session_activity').insert({
      user_id: activity.userId,
      action: activity.action,
      ip_address: activity.ipAddress,
      user_agent: activity.userAgent,
      location: activity.location,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    // Silently fail - don't break the app if logging fails
    console.error('Failed to log session activity:', error)
  }
}

/**
 * Get user's session history
 */
export async function getSessionHistory(userId: string, limit: number = 10): Promise<SessionActivity[]> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('session_activity')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(limit)

    if (error) throw error

    return (data || []).map(record => ({
      userId: record.user_id,
      action: record.action,
      timestamp: new Date(record.timestamp),
      ipAddress: record.ip_address,
      userAgent: record.user_agent,
      location: record.location
    }))
  } catch {
    return []
  }
}

/**
 * Revoke all sessions for a user (security feature)
 */
export async function revokeAllSessions(): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()
    
    // Sign out from all devices
    const { error } = await supabase.auth.signOut({ scope: 'global' })

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to revoke sessions'
    }
  }
}

/**
 * Check if user has multiple active sessions
 */
export async function hasMultipleSessions(userId: string): Promise<boolean> {
  try {
    const history = await getSessionHistory(userId, 5)
    const recentLogins = history.filter(
      activity => activity.action === 'login' && 
      activity.timestamp > new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
    )
    return recentLogins.length > 1
  } catch {
    return false
  }
}
