/**
 * Authentication Middleware Utilities
 * 
 * Provides middleware functions for route protection and authentication checks
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
 * Protect API routes with authentication
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
          { error: 'Unauthorized - Authentication required' },
          { status: 401 }
        )
      }
    }

    // Check if admin access is required
    if (config.requireAdmin && user) {
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', user.email)
        .eq('is_active', true)
        .single()

      if (!adminData) {
        return {
          authorized: false,
          user: user,
          response: NextResponse.json(
            { error: 'Forbidden - Admin access required' },
            { status: 403 }
          )
        }
      }
    }

    // Check if Pro access is required
    if (config.requirePro && user) {
      // Check if user has Pro access (implement your Pro check logic)
      const PRO_USERS = ['raviteja.journal@gmail.com'] // This should come from a config
      const isPro = PRO_USERS.includes(user.email || '')

      const { data: adminData } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', user.email)
        .eq('is_active', true)
        .single()

      const hasProAccess = isPro || !!adminData

      if (!hasProAccess) {
        return {
          authorized: false,
          user: user,
          response: NextResponse.json(
            { error: 'Forbidden - Pro subscription required' },
            { status: 403 }
          )
        }
      }
    }

    return {
      authorized: true,
      user: user
    }
  } catch (error: any) {
    return {
      authorized: false,
      user: null,
      response: NextResponse.json(
        { error: 'Authentication check failed', details: error.message },
        { status: 500 }
      )
    }
  }
}

/**
 * Rate limiting configuration
 */
interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

/**
 * Simple rate limiting middleware
 */
export function rateLimit(config: RateLimitConfig = { maxRequests: 100, windowMs: 60000 }) {
  return (identifier: string): { allowed: boolean; remaining: number; resetAt: number } => {
    const now = Date.now()
    const record = rateLimitStore.get(identifier)

    // Clean up expired records
    if (record && record.resetAt < now) {
      rateLimitStore.delete(identifier)
    }

    const current = rateLimitStore.get(identifier)

    if (!current) {
      // First request
      rateLimitStore.set(identifier, {
        count: 1,
        resetAt: now + config.windowMs
      })
      return {
        allowed: true,
        remaining: config.maxRequests - 1,
        resetAt: now + config.windowMs
      }
    }

    if (current.count >= config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: current.resetAt
      }
    }

    current.count++
    return {
      allowed: true,
      remaining: config.maxRequests - current.count,
      resetAt: current.resetAt
    }
  }
}

/**
 * CORS headers for API routes — restrict to known origins
 */
const ALLOWED_ORIGINS = [
  'https://www.foundersprime.com',
  'https://foundersprime.com',
  'http://localhost:3001',
  'http://localhost:3001',
]

export function corsHeaders(origin?: string) {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  }
}

/**
 * Handle OPTIONS requests for CORS
 */
export function handleCorsOptions(request: NextRequest): NextResponse {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(request.headers.get('origin') || undefined)
  })
}

/**
 * Validate request body
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
          error: `Missing required field: ${field}`
        }
      }
    }

    return {
      valid: true,
      data: body as T
    }
  } catch (error) {
    return {
      valid: false,
      error: 'Invalid JSON body'
    }
  }
}

/**
 * Create standardized API response
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
      ...headers
    }
  })
}

/**
 * Create standardized error response
 */
export function apiError(
  message: string,
  status: number = 400,
  details?: any
): NextResponse {
  return NextResponse.json(
    {
      error: message,
      details,
      timestamp: new Date().toISOString()
    },
    { status }
  )
}
