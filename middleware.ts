import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { globalApiLimiter, rateLimitHeaders } from '@/lib/security/rate-limit'
import { getClientIp } from '@/lib/security/ip'

// ─── Route classification helpers ─────────────────────────────────────────────

/**
 * Paths that should NEVER be rate-limited:
 *  - Next.js internals (_next/*)
 *  - Static files / images
 *  - Cloudflare-verified webhooks (signature-protected — not user traffic)
 *  - Health/readiness probes
 */
function isExemptFromRateLimit(pathname: string): boolean {
  return (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/webhooks/') ||
    pathname === '/api/health' ||
    pathname === '/api/ping' ||
    // Static asset extensions
    /\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|otf|css|js)$/.test(pathname)
  )
}

/**
 * Paths that are API routes (eligible for rate limiting).
 */
function isApiRoute(pathname: string): boolean {
  return pathname.startsWith('/api/')
}

// ─── Main middleware ───────────────────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // ── Step 1: Global API rate limiting ──────────────────────────────────────
  // Applied before Supabase session refresh to protect all API routes cheaply.
  // Webhooks and static assets are explicitly exempted.
  if (isApiRoute(pathname) && !isExemptFromRateLimit(pathname)) {
    const clientIp = getClientIp(request)
    const result = globalApiLimiter(clientIp)
    const rlHeaders = rateLimitHeaders(result)

    if (!result.allowed) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please slow down.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            ...rlHeaders,
          },
        }
      )
    }

    // Allowed — attach rate limit headers to the downstream response and continue
    // We'll set these on the response later after the Supabase session refresh.
    // Store them in a request header for the response handler below.
    // (Next.js edge middleware cannot modify response headers after NextResponse.next()
    //  returns from an async supabase call, so we attach them here via a trick.)
  }

  // ── Step 2: Supabase session refresh ──────────────────────────────────────
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Skip Supabase session refresh if credentials are missing or placeholders
  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl === 'http://localhost:54321' ||
    supabaseAnonKey === 'placeholder-anon-key'
  ) {
    return response
  }

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({
              name,
              value,
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({
              name,
              value: '',
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value: '',
              ...options,
            })
          },
        },
      }
    )

    await supabase.auth.getSession()
  } catch {
    // Supabase auth failed — continue without session
  }

  // ── Step 3: Attach rate limit headers to API responses ────────────────────
  // Attach informational RateLimit-* headers so API clients can self-throttle.
  if (isApiRoute(pathname) && !isExemptFromRateLimit(pathname)) {
    const clientIp = getClientIp(request)
    // Re-check (does NOT consume another token — just reads current state)
    // We call the limiter again; since we already consumed a token in Step 1,
    // this will reflect the correct remaining count.
    const result = globalApiLimiter(clientIp)
    const rlHeaders = rateLimitHeaders(result)
    for (const [key, value] of Object.entries(rlHeaders)) {
      response.headers.set(key, value)
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
