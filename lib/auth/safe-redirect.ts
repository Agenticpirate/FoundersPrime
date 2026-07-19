/**
 * Allowlist relative post-auth redirects to prevent open redirects.
 * Only same-site paths; blocks protocol-relative and external URLs.
 * Behavior for normal app links (e.g. /dashboard, /deals?x=1) is unchanged.
 */

const DEFAULT_REDIRECT = '/dashboard'

/** Paths (and prefixes) users may be sent to after login / OAuth */
const ALLOWED_PREFIXES = [
  '/dashboard',
  '/deals',
  '/programs',
  '/student-benefits',
  '/ideas',
  '/pricing',
  '/checkout',
  '/flash-deals',
  '/submit-deal',
  '/contact',
  '/about',
  '/resources',
  '/login',
  '/account',
  '/billing',
  '/profile',
  '/featured-thank-you',
  '/admin',
] as const

/** Allowed login UI modes from URL (prevents arbitrary view injection) */
export type LoginView = 'login' | 'signup' | 'forgot' | 'mfa' | 'reset'

const LOGIN_VIEWS = new Set<LoginView>(['login', 'signup', 'forgot', 'mfa', 'reset'])

export function sanitizeLoginView(raw: string | null | undefined): LoginView {
  if (raw && LOGIN_VIEWS.has(raw as LoginView)) return raw as LoginView
  return 'login'
}

export function sanitizeAuthRedirect(
  raw: string | null | undefined,
  fallback: string = DEFAULT_REDIRECT
): string {
  if (!raw || typeof raw !== 'string') return fallback

  const trimmed = raw.trim()
  // Must be same-site relative path
  if (!trimmed.startsWith('/') || trimmed.startsWith('//')) return fallback
  // Block backslash tricks / encoded schemes
  if (trimmed.includes('\\') || /^\/[a-z]+:/i.test(trimmed)) return fallback

  try {
    const url = new URL(trimmed, 'https://www.foundersprime.com')
    if (url.origin !== 'https://www.foundersprime.com') return fallback
    const path = url.pathname || '/'
    const allowed = ALLOWED_PREFIXES.some(
      (p) => path === p || path.startsWith(`${p}/`)
    )
    if (!allowed) return fallback
    // Preserve query + hash for in-app deep links
    return `${path}${url.search}${url.hash}`
  } catch {
    return fallback
  }
}
