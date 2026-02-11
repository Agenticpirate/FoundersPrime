/**
 * Session Management API Route
 * 
 * GET /api/auth/session - Get current session information
 * DELETE /api/auth/session - End current session (logout)
 * POST /api/auth/session/refresh - Refresh current session
 */

import { NextRequest } from 'next/server'
import { getSession, endSession, refreshSession } from '@/lib/auth/session'
import { apiResponse, apiError } from '@/lib/auth/middleware'

export async function GET(request: NextRequest) {
  try {
    const sessionInfo = await getSession()

    if (!sessionInfo.isAuthenticated) {
      return apiError('No active session', 401)
    }

    return apiResponse({
      user: {
        id: sessionInfo.user?.id,
        email: sessionInfo.user?.email,
        emailVerified: sessionInfo.user?.email_confirmed_at,
        createdAt: sessionInfo.createdAt
      },
      session: {
        expiresAt: sessionInfo.expiresAt,
        isAuthenticated: sessionInfo.isAuthenticated
      }
    })
  } catch (error: any) {
    return apiError('Failed to get session', 500, error.message)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const result = await endSession()

    if (!result.success) {
      return apiError(result.error || 'Failed to end session', 500)
    }

    return apiResponse({ message: 'Session ended successfully' })
  } catch (error: any) {
    return apiError('Failed to end session', 500, error.message)
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionInfo = await refreshSession()

    if (!sessionInfo.isAuthenticated) {
      return apiError('Failed to refresh session', 401)
    }

    return apiResponse({
      message: 'Session refreshed successfully',
      expiresAt: sessionInfo.expiresAt
    })
  } catch (error: any) {
    return apiError('Failed to refresh session', 500, error.message)
  }
}
