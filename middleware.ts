import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { globalApiLimiter, rateLimitHeaders } from '@/lib/security/rate-limit'
import { getClientIp } from '@/lib/security/ip'
import { discoveryLinkHeader } from '@/lib/agent-ready/config'
import {
  estimateTokens,
  pageToMarkdown,
  prefersMarkdown,
} from '@/lib/agent-ready/markdown'

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
    // OAuth callback — provider-initiated redirect, not a user-repeated request.
    // Rate-limiting this causes Cloudflare to flag the code= param as an attack.
    pathname === '/auth/callback' ||
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

/** HTML page routes that support Accept: text/markdown negotiation */
function supportsMarkdownNegotiation(pathname: string): boolean {
  if (isApiRoute(pathname)) return false
  if (pathname.startsWith('/.well-known/')) return false
  if (pathname.startsWith('/_next/')) return false
  if (pathname.startsWith('/admin')) return false
  if (
    pathname === '/llms.txt' ||
    pathname === '/llms-full.txt' ||
    pathname === '/auth.md' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return false
  }
  if (/\.[a-z0-9]+$/i.test(pathname)) return false
  return true
}

function applyAgentDiscoveryHeaders(response: NextResponse, pathname: string) {
  // RFC 8288 Link headers for agent discovery (homepage is required by scanners;
  // also useful on other public pages).
  if (
    supportsMarkdownNegotiation(pathname) ||
    pathname === '/' ||
    pathname === ''
  ) {
    response.headers.set('Link', discoveryLinkHeader())
  }
  // Content Signals as an HTTP header (complements robots.txt Content-Signal)
  response.headers.set(
    'Content-Signal',
    'search=yes, ai-train=no, ai-input=yes'
  )
  // Advertise alternate markdown representation
  if (supportsMarkdownNegotiation(pathname)) {
    const vary = response.headers.get('Vary')
    response.headers.set(
      'Vary',
      vary ? `${vary}, Accept` : 'Accept'
    )
  }
  return response
}

// ─── Main middleware ───────────────────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // ── Step 0: Markdown for Agents (content negotiation) ─────────────────────
  // When an agent sends Accept: text/markdown, return a compact Markdown
  // representation instead of HTML. HTML remains the default for browsers.
  if (
    request.method === 'GET' &&
    supportsMarkdownNegotiation(pathname) &&
    prefersMarkdown(request.headers.get('accept'))
  ) {
    const markdown = pageToMarkdown(pathname)
    const tokens = estimateTokens(markdown)
    const response = new NextResponse(markdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
        'x-markdown-tokens': String(tokens),
        'x-original-tokens': String(Math.round(tokens * 4)),
        Vary: 'Accept',
        Link: discoveryLinkHeader(),
        'Content-Signal': 'search=yes, ai-train=no, ai-input=yes',
        'Access-Control-Allow-Origin': '*',
      },
    })
    return response
  }

  // ── Step 1: Global API rate limiting ──────────────────────────────────────
  // Applied before Supabase session refresh to protect all API routes cheaply.
  // Webhooks and static assets are explicitly exempted.
  // Capture headers once — do NOT call the limiter again later (it consumes tokens).
  let apiRateLimitHeaders: Record<string, string> | null = null
  if (isApiRoute(pathname) && !isExemptFromRateLimit(pathname)) {
    const clientIp = getClientIp(request)
    const result = globalApiLimiter(clientIp)
    const rlHeaders = rateLimitHeaders(result)
    apiRateLimitHeaders = rlHeaders

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
    return applyAgentDiscoveryHeaders(response, pathname)
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

    // IMPORTANT: Use getUser() not getSession() here.
    // getUser() revalidates the JWT with the Supabase Auth server and refreshes
    // the session cookie. getSession() only reads from cookies without validating,
    // which can cause stale sessions to persist or valid sessions to appear missing.
    await supabase.auth.getUser()
  } catch {
    // Supabase auth failed — continue without session
  }

  // ── Step 3: Attach rate limit headers to API responses ────────────────────
  // Reuse the Step 1 result — calling the limiter again would double-count.
  if (apiRateLimitHeaders) {
    for (const [key, value] of Object.entries(apiRateLimitHeaders)) {
      response.headers.set(key, value)
    }
  }

  return applyAgentDiscoveryHeaders(response, pathname)
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static  (Next.js static chunks)
     * - _next/image   (Next.js image optimisation)
     * - favicon.ico
     * - Common static file extensions (images, fonts, manifests)
     *
     * Keeping this tight reduces the number of Supabase session-refresh
     * calls, which was causing users to appear logged out when Cloudflare
     * blocked an upstream request mid-flow.
     */
    '/((?!_next/static|_next/image|favicon\.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|otf|css|js|map)$).*)',
  ],
}
