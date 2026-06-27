/**
 * JWT Token Management Utilities
 * 
 * Handles JWT token validation, refresh, and session management
 * for the FoundersPrime authentication system.
 */

import { createClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import type { Session, User } from '@supabase/supabase-js'

export interface TokenValidationResult {
  valid: boolean
  user: User | null
  session: Session | null
  error?: string
}

/**
 * Validate the current JWT token (server-side)
 *
 * SECURITY: Uses getUser() which revalidates the token against the Supabase
 * Auth server — not getSession(), which only decodes the cookie without
 * server-side verification. Session expiry metadata is read separately for
 * display purposes only, matching the pattern in lib/auth/session.ts.
 */
export async function validateToken(): Promise<TokenValidationResult> {
  try {
    const supabase = createClient()

    // Authoritative server-side token verification
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return {
        valid: false,
        user: null,
        session: null,
        error: 'Invalid or expired token',
      }
    }

    // User is verified — read session only for non-authoritative expiry metadata
    const { data: { session } } = await supabase.auth.getSession()

    return {
      valid: true,
      user,
      session: session ?? null,
    }
  } catch (error: unknown) {
    return {
      valid: false,
      user: null,
      session: null,
      error: 'Token validation failed',
    }
  }
}

/**
 * Refresh the JWT token (server-side)
 */
export async function refreshToken(): Promise<TokenValidationResult> {
  try {
    const supabase = createClient()
    const { data: { session }, error } = await supabase.auth.refreshSession()

    if (error) {
      return {
        valid: false,
        user: null,
        session: null,
        error: error.message
      }
    }

    if (!session) {
      return {
        valid: false,
        user: null,
        session: null,
        error: 'Failed to refresh session'
      }
    }

    return {
      valid: true,
      user: session.user,
      session: session
    }
  } catch (error: any) {
    return {
      valid: false,
      user: null,
      session: null,
      error: error.message || 'Token refresh failed'
    }
  }
}

/**
 * Get the current session with automatic refresh if needed (server-side)
 */
export async function getSessionWithRefresh(): Promise<TokenValidationResult> {
  const validation = await validateToken()
  
  // If token is expired, try to refresh
  if (!validation.valid && validation.error === 'Token expired') {
    return await refreshToken()
  }
  
  return validation
}

/**
 * Client-side token refresh utility
 */
export async function refreshTokenClient(): Promise<TokenValidationResult> {
  try {
    const supabase = createBrowserClient()
    const { data: { session }, error } = await supabase.auth.refreshSession()

    if (error) {
      return {
        valid: false,
        user: null,
        session: null,
        error: error.message
      }
    }

    if (!session) {
      return {
        valid: false,
        user: null,
        session: null,
        error: 'Failed to refresh session'
      }
    }

    return {
      valid: true,
      user: session.user,
      session: session
    }
  } catch (error: any) {
    return {
      valid: false,
      user: null,
      session: null,
      error: error.message || 'Token refresh failed'
    }
  }
}

/**
 * Extract user ID from JWT token
 */
export async function getUserIdFromToken(): Promise<string | null> {
  const validation = await validateToken()
  return validation.user?.id || null
}

/**
 * Check if token will expire soon (within 5 minutes)
 */
export async function isTokenExpiringSoon(): Promise<boolean> {
  try {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.expires_at) {
      return true
    }

    const expiresAt = session.expires_at * 1000
    const fiveMinutesFromNow = Date.now() + (5 * 60 * 1000)

    return expiresAt < fiveMinutesFromNow
  } catch {
    return true
  }
}

/**
 * Get token expiry time
 */
export async function getTokenExpiry(): Promise<Date | null> {
  try {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.expires_at) {
      return null
    }

    return new Date(session.expires_at * 1000)
  } catch {
    return null
  }
}
