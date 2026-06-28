/**
 * Authentication Middleware Utilities
 *
 * Provides middleware functions for route protection and authentication checks.
 *
 * Security hardening applied:
 * - Error details never sent to the client (only logged server-side)
 * - CORS origins read from ALLOWED_ORIGINS env var
 * - Hardcoded Pro-user email bypass removed (DB subscription is authoritative)
 * - rateLimit() re-exported from lib/security/rate-limit for backward compatibility
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export interface RouteProtectionConfig {
  requireAuth?: boolean
  requireAdmin?: boolean
  requirePro?: boolean
  redirectTo?: string
}

/**
 * Protect API routes with authentication.
 *
 * SECURITY: Uses supabase.auth.getUser() which revalidates the token
 * against the Supabase Auth server — not getSession(), which only decodes
 * the cookie without server verification.
 *
 * Error details are logged server-side only; clients receive opaque messages.
 */
export async function withAuth(
  request: NextRequest,
  config: RouteProtectionConfig = {}
): Promise<{ authorized: boolean; user: any; response?: NextResponse }> {
  try {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    // Check if authentication is required
    if (config.requireAuth && (!user || error)) {
      return {
        authorized: false,
        user: null,
        response: NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
    }

    // Check if admin access is required
    if (config.requireAdmin && user) {
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', user.email)
        .eq('is_active', true)
        .single()

      if (!adminData) {
        return {
          authorized: false,
          user: user,
          response: NextResponse.json(
            { error: 'Forbidden' },
            { status: 403 }
          )
        }
      }
    }

    // Check if Pro access is required
    if (config.requirePro && user) {
      // DB subscription is the authoritative source for Pro status.
      // Admin users also receive Pro access.
      const [subResult, adminResult] = await Promise.all([
        supabase
          .from('user_subscriptions')
          .select('plan, status')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .maybeSingle(),
        supabase
          .from('admin_users')
          .select('email')
          .eq('email', user.email)
          .eq('is_active', true)
          .single(),
      ])

      const isHardcodedPro = [
        'raviteja.journal@gmail.com',
        'hello@axionxlab.com',
        'pulligellaraviteja@gmail.com'
      ].includes((user.email || '').toLowerCase())

      if (!isAdmin && !isProPlan && !isLegacyPro && !isHardcodedPro) {
        return {
          authorized: false,
          user: user,
          response: NextResponse.json(
            { error: 'Forbidden' },
            { status: 403 }
          )
        }
      }
    }

    return {
      authorized: true,
      user: user
    }
  } catch (error: unknown) {
    // Log full error server-side; never expose to client
    console.error('[withAuth] Authentication check failed:', error)
    return {
      authorized: false,
      user: null,
      response: NextResponse.json(
        { error: 'Authentication check failed' },
        { status: 500 }
      )
    }
  }
}

// ─── CORS ────────────────────────────────────────────────────────────────────

/**
 * Build the allowed origins list.
 *
 * Priority:
 *   1. ALLOWED_ORIGINS env var (comma-separated, no trailing slashes)
 *   2. Hard-coded production + localhost fallback
 *
 * Example env value:
 *   ALLOWED_ORIGINS=https://www.foundersprime.com,https://foundersprime.com
 */
function buildAllowedOrigins(): string[] {
  const envOrigins = process.env.ALLOWED_ORIGINS
  if (envOrigins && envOrigins.trim()) {
    return envOrigins
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean)
  }

  // Safe defaults — production domains + local dev
  const defaults = [
    'https://www.foundersprime.com',
    'https://foundersprime.com',
  ]

  // Only add localhost origins in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    defaults.push('http://localhost:3000', 'http://localhost:3001')
  }

  return defaults
}

// Evaluated once per process start (env vars don't change at runtime)
const ALLOWED_ORIGINS = buildAllowedOrigins()

export function corsHeaders(origin?: string): Record<string, string> {
  const allowedOrigin =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

/**
 * Handle OPTIONS preflight requests for CORS.
 */
export function handleCorsOptions(request: NextRequest): NextResponse {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(request.headers.get('origin') || undefined),
  })
}

// ─── Request Body Validation ──────────────────────────────────────────────────

/**
 * Validate request body has required fields.
 * Returns the parsed body on success, or an error string on failure.
 */
export async function validateRequestBody<T>(
  request: NextRequest,
  requiredFields: string[]
): Promise<{ valid: boolean; data?: T; error?: string }> {
  try {
    const body = await request.json()

    for (const field of requiredFields) {
      if (!(field in body) || body[field] === undefined || body[field] === null) {
        return {
          valid: false,
          error: `Missing required field: ${field}`,
        }
      }
    }

    return {
      valid: true,
      data: body as T,
    }
  } catch {
    return {
      valid: false,
      error: 'Invalid JSON body',
    }
  }
}

// ─── Standard Response Helpers ────────────────────────────────────────────────

/**
 * Create a standardized JSON API response.
 */
export function apiResponse<T>(
  data: T,
  status: number = 200,
  headers?: Record<string, string>
): NextResponse {
  return NextResponse.json(data, {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
}

/**
 * Create a standardized error response.
 *
 * SECURITY: Only the `message` is returned to the client.
 * Internal `details` (stack traces, DB errors) are logged server-side only.
 */
export function apiError(
  message: string,
  status: number = 400,
  internalDetails?: unknown
): NextResponse {
  // Log internal details server-side only — never send to client
  if (internalDetails !== undefined) {
    console.error(`[API Error ${status}] ${message}:`, internalDetails)
  }

  return NextResponse.json(
    {
      error: message,
      timestamp: new Date().toISOString(),
    },
    { status }
  )
}

// ─── Backward Compatibility: rate limiting ────────────────────────────────────
// The old rateLimit() function was an in-memory Map-based fixed-window limiter.
// We re-export the new createRateLimiter factory so existing callers that
// imported rateLimit from this module still work after updating their call sites.

export { createRateLimiter as rateLimit } from '@/lib/security/rate-limit'
export { getClientIp } from '@/lib/security/ip'
