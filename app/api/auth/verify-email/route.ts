/**
 * Email Verification API Route
 * 
 * POST /api/auth/verify-email - Send verification email
 * GET /api/auth/verify-email/status - Check verification status
 */

import { NextRequest } from 'next/server'
import { 
  sendVerificationEmail, 
  getEmailVerificationStatus 
} from '@/lib/auth/email-verification'
import { apiResponse, apiError, validateRequestBody } from '@/lib/auth/middleware'
import { getSession } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  try {
    // Get current user's email
    const sessionInfo = await getSession()

    if (!sessionInfo.isAuthenticated || !sessionInfo.user?.email) {
      return apiError('Not authenticated', 401)
    }

    const result = await sendVerificationEmail(sessionInfo.user.email)

    if (!result.success) {
      return apiError(result.error || 'Failed to send verification email', 400)
    }

    return apiResponse({
      message: result.message,
      email: sessionInfo.user.email
    })
  } catch (error: any) {
    return apiError('Failed to send verification email', 500, error.message)
  }
}

export async function GET(request: NextRequest) {
  try {
    const status = await getEmailVerificationStatus()

    return apiResponse({
      verified: status.verified,
      email: status.email,
      verifiedAt: status.verifiedAt
    })
  } catch (error: any) {
    return apiError('Failed to check verification status', 500, error.message)
  }
}
