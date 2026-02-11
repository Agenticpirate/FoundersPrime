/**
 * Current User API Route
 * 
 * GET /api/auth/me - Get current authenticated user information
 */

import { NextRequest } from 'next/server'
import { getSession } from '@/lib/auth/session'
import { checkProStatus } from '@/lib/auth/user-context'
import { getEmailVerificationStatus } from '@/lib/auth/email-verification'
import { apiResponse, apiError } from '@/lib/auth/middleware'

export async function GET(request: NextRequest) {
  try {
    const sessionInfo = await getSession()

    if (!sessionInfo.isAuthenticated || !sessionInfo.user) {
      return apiError('Not authenticated', 401)
    }

    // Get Pro status
    const proStatus = await checkProStatus()

    // Get email verification status
    const emailStatus = await getEmailVerificationStatus()

    return apiResponse({
      id: sessionInfo.user.id,
      email: sessionInfo.user.email,
      name: sessionInfo.user.user_metadata?.full_name || sessionInfo.user.email?.split('@')[0],
      emailVerified: emailStatus.verified,
      emailVerifiedAt: emailStatus.verifiedAt,
      isPro: proStatus.isPro,
      isAdmin: proStatus.isAdmin,
      subscription: proStatus.user?.subscription,
      createdAt: sessionInfo.createdAt,
      session: {
        expiresAt: sessionInfo.expiresAt
      }
    })
  } catch (error: any) {
    return apiError('Failed to get user information', 500, error.message)
  }
}
