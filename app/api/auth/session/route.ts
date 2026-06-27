/**
 * Session Management API Route
 *
 * GET    /api/auth/session         — Get current session information
 * DELETE /api/auth/session         — End current session (logout)
 * POST   /api/auth/session/refresh — Refresh current session
 *
 * Security: POST (token refresh) is rate-limited per IP to prevent
 * brute-force token refresh attacks.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getSession, endSession, refreshSession } from '@/lib/auth/session'
import { apiResponse, apiError } from '@/lib/auth/middleware'
import { authLimiter, rateLimitHeaders } from '@/lib/security/rate-limit'
import { getClientIp } from '@/lib/security/ip'

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
        createdAt: sessionInfo.createdAt,
      },
      session: {
        expiresAt: sessionInfo.expiresAt,
        isAuthenticated: sessionInfo.isAuthenticated,
      },
    })
  } catch (error: unknown) {
    return apiError('Failed to get session', 500, error)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const result = await endSession()

    if (!result.success) {
      return apiError(result.error || 'Failed to end session', 500)
    }

    return apiResponse({ message: 'Session ended successfully' })
  } catch (error: unknown) {
    return apiError('Failed to end session', 500, error)
  }
}

export async function POST(request: NextRequest) {
  // Rate-limit token refresh: 10 attempts per IP per 60s
  const clientIp = getClientIp(request)
  const rateLimitResult = authLimiter(clientIp)

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Too many refresh attempts. Please try again later.' },
      {
        status: 429,
        headers: rateLimitHeaders(rateLimitResult),
      }
    )
  }

  try {
    const sessionInfo = await refreshSession()

    if (!sessionInfo.isAuthenticated) {
      return apiError('Failed to refresh session', 401)
    }

    return apiResponse(
      {
        message: 'Session refreshed successfully',
        expiresAt: sessionInfo.expiresAt,
      },
      200,
      rateLimitHeaders(rateLimitResult)
    )
  } catch (error: unknown) {
    return apiError('Failed to refresh session', 500, error)
  }
}
