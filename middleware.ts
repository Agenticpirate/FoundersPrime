import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { globalApiLimiter, rateLimitHeaders } from '@/lib/security/rate-limit'
import { getClientIp } from '@/lib/security/ip'

/**
 * Paths that should NEVER be rate-limited:
 * - Static assets (_next/static, images, fonts, icons)
 * - Internal Next.js internals
 */
function isStaticPath(pathname: string): boolean {
  return (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/logos/') ||
    /\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|otf|eot)$/i.test(pathname)
  )
}

/**
 * Paths that are API routes (eligible for rate limiting).
 */
function isApiPath(pathname: string): boolean {
  return pathname.startsWith('/api/')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Step 1: Global API rate limiting ──────────────────────────────────────
  if (isApiPath(pathname) && !isStaticPath(pathname)) {
    const ip = getClientIp(request)
    const result = globalApiLimiter(ip)
    if (!result.allowed) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please slow down.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            ...rateLimitHeaders(result),
          },
        }
      )
    }
  }

  // ── Step 2: Supabase session refresh ──────────────────────────────────────
  let response = NextResponse.next({
    request: { headers: request.headers },
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
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    })

    await supabase.auth.getUser()
  } catch (e) {
    // Supabase auth failed — continue without session
  }

  // ── Step 3: Attach rate limit headers to API responses ────────────────────
  if (isApiPath(pathname)) {
    const ip = getClientIp(request)
    const result = globalApiLimiter(ip)
    const rlHeaders = rateLimitHeaders(result)
    Object.entries(rlHeaders).forEach(([k, v]) => response.headers.set(k, v))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
