/**
 * Email Verification Utilities
 * 
 * Handles email verification flow for user registration
 */

import { createClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'

export interface EmailVerificationResult {
  success: boolean
  error?: string
  message?: string
}

/**
 * Send verification email to user
 */
export async function sendVerificationEmail(email: string): Promise<EmailVerificationResult> {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.foundersprime.com'}/auth/verify-email`
      }
    })

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true,
      message: 'Verification email sent successfully'
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to send verification email'
    }
  }
}

/**
 * Verify email with token (server-side)
 */
export async function verifyEmailWithToken(token: string): Promise<EmailVerificationResult> {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'email'
    })

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true,
      message: 'Email verified successfully'
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Email verification failed'
    }
  }
}

/**
 * Check if user's email is verified
 */
export async function isEmailVerified(): Promise<boolean> {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return false
    }

    // Check if email is confirmed
    return user.email_confirmed_at !== null && user.email_confirmed_at !== undefined
  } catch {
    return false
  }
}

/**
 * Get email verification status for current user
 */
export async function getEmailVerificationStatus(): Promise<{
  verified: boolean
  email?: string
  verifiedAt?: string
}> {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { verified: false }
    }

    return {
      verified: !!user.email_confirmed_at,
      email: user.email,
      verifiedAt: user.email_confirmed_at || undefined
    }
  } catch {
    return { verified: false }
  }
}

/**
 * Client-side: Send verification email
 */
export async function sendVerificationEmailClient(): Promise<EmailVerificationResult> {
  try {
    const supabase = createBrowserClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.email) {
      return {
        success: false,
        error: 'No user email found'
      }
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user.email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/verify-email`
      }
    })

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true,
      message: 'Verification email sent successfully'
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to send verification email'
    }
  }
}

/**
 * Require email verification middleware
 */
export async function requireEmailVerification(): Promise<{
  verified: boolean
  redirectUrl?: string
}> {
  const status = await getEmailVerificationStatus()
  
  if (!status.verified) {
    return {
      verified: false,
      redirectUrl: '/auth/pending-verification'
    }
  }

  return {
    verified: true
  }
}
