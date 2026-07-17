/**
 * Brand logo URL helpers — permanent, fail-soft chain.
 *
 * Order (BrandLogo / cards):
 *   0. Local /brand-logos/* matched by DOMAIN first (product site > parent company)
 *   1. Local matched by brand NAME (safe exact/word match only)
 *   2. Explicit logo URL (if usable)
 *   3. Google s2 favicons
 *   4. logo.dev
 *   5. DuckDuckGo icons
 *   6. UI Avatars (always returns a bitmap)
 *
 * Clearbit is intentionally omitted (blank/403).
 */

import { getLocalBrandLogoCandidates } from '@/lib/brand-icons'

const LOGO_DEV_TOKEN = 'pk_WQ-XL0MlQ3-ODa_K0zgqEg'

export function cleanDomain(domain: string): string {
  if (!domain) return ''
  return domain
    .replace(/^(https?:\/\/)?(www\.)?/i, '')
    .split('/')[0]
    .split('?')[0]
    .toLowerCase()
}

export const getFaviconUrl = (domain: string, size: number = 128): string => {
  if (!domain) return ''
  const clean = cleanDomain(domain)
  return `https://www.google.com/s2/favicons?domain=${clean}&sz=${size}`
}

/** @deprecated Clearbit removed — use getLogoDevUrl */
export const getLogoUrl = (domain: string): string => getLogoDevUrl(domain)

export const getLogoDevUrl = (
  domain: string,
  size: number = 128,
  theme: 'auto' | 'light' | 'dark' = 'auto'
): string => {
  if (!domain) return ''
  const clean = cleanDomain(domain)
  const themeQ = theme === 'auto' ? '' : `&theme=${theme}`
  return `https://img.logo.dev/${clean}?token=${LOGO_DEV_TOKEN}&size=${size}&format=png${themeQ}`
}

export const getDuckDuckGoIconUrl = (domain: string): string => {
  if (!domain) return ''
  const clean = cleanDomain(domain)
  return `https://icons.duckduckgo.com/ip3/${clean}.ico`
}

export const getAvatarUrl = (name: string, size: number = 128): string => {
  const label = (name || '?').trim() || '?'
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(label)}&background=e5e7eb&color=111827&bold=true&size=${size}&format=png`
}

export const extractDomainFromUrl = (url: string): string | null => {
  try {
    if (!url) return null
    if (url.includes('domain=')) return url.split('domain=')[1].split('&')[0]
    if (url.includes('logo.clearbit.com/')) {
      return url.split('logo.clearbit.com/')[1].split('?')[0]
    }
    if (url.includes('img.logo.dev/')) {
      return url.split('img.logo.dev/')[1]?.split('?')[0] || null
    }
    if (url.includes('://')) return new URL(url).hostname.replace(/^www\./, '')
    return null
  } catch {
    return null
  }
}

export function isUsableLogoUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false
  const u = url.trim()
  if (!u) return false
  if (u.includes('rocket') || u.includes('placeholder') || u.includes('ui-avatars')) return false
  if (u.includes('logo.clearbit.com')) return false
  if (u.includes('cdn.simpleicons.org/') && u.endsWith('simpleicons.org/')) return false
  if (
    u.includes('t0.gstatic.com') ||
    u.includes('t1.gstatic.com') ||
    u.includes('t2.gstatic.com') ||
    u.includes('t3.gstatic.com')
  ) {
    return false
  }
  if (u.includes('faviconV2') && u.includes('gstatic.com')) return false
  if (u.includes('upload.wikimedia.org') || u.includes('redditstatic.com')) return false
  // Local paths are always usable
  if (u.startsWith('/brand-logos/') || u.startsWith('/logos/')) return true
  return true
}

/** CDN / non-brand hosts — never treat these as the brand domain. */
export function isGarbageLogoDomain(domain: string): boolean {
  if (!domain) return true
  const d = cleanDomain(domain)
  if (!d) return true
  const bad = [
    'gstatic.com',
    'googleusercontent.com',
    'wikimedia.org',
    'redditstatic.com',
    'framerusercontent.com',
    'logo.clearbit.com',
    'img.logo.dev',
    'icons.duckduckgo.com',
    'ui-avatars.com',
    'cloudfront.net',
    'akamaized.net',
    'amazonaws.com', // bare CDN host without product
  ]
  // Note: google.com is a REAL brand domain — do not treat as garbage
  return bad.some((b) => d === b || d.endsWith('.' + b))
}

export type LogoChainOptions = {
  theme?: 'auto' | 'light' | 'dark'
  preferLocal?: boolean
}

/**
 * Ordered list of logo URLs. Callers advance on error / tiny images.
 * Domain-based local marks ALWAYS win over parent-company name matches
 * (e.g. YouTube URL + company "Google" → YouTube icon, not Google Cloud).
 */
export function getLogoUrlChain(
  name: string,
  domain?: string | null,
  explicitLogo?: string | null,
  opts?: LogoChainOptions
): string[] {
  let resolved = domain ? cleanDomain(domain) : ''
  if (resolved && isGarbageLogoDomain(resolved)) resolved = ''
  if (!resolved && explicitLogo) {
    const fromLogo = extractDomainFromUrl(explicitLogo) || ''
    resolved = fromLogo && !isGarbageLogoDomain(fromLogo) ? cleanDomain(fromLogo) : ''
  }
  if (!resolved) {
    const slug = (name || 'brand').toLowerCase().replace(/[^a-z0-9]/g, '') || 'brand'
    resolved = `${slug}.com`
  }

  const theme = opts?.theme ?? 'auto'
  const preferLocal = opts?.preferLocal !== false

  // Domain-first, then name — never let a parent company steal a product domain mark
  const localDomain = preferLocal
    ? getLocalBrandLogoCandidates(null, resolved)
    : []
  const localName = preferLocal
    ? getLocalBrandLogoCandidates(name, null)
    : []
  // If domain local exists, use ONLY that for local (ignore conflicting company name)
  const local = localDomain.length > 0 ? localDomain : localName

  const chain = [
    ...local,
    ...(explicitLogo && isUsableLogoUrl(explicitLogo) ? [explicitLogo] : []),
    getFaviconUrl(resolved, 128),
    getLogoDevUrl(resolved, 128, theme),
    getDuckDuckGoIconUrl(resolved),
    getAvatarUrl(name, 128),
  ]

  return [...new Set(chain.filter(Boolean))]
}

/** @deprecated use getLogoUrlChain */
export const getBestLogoUrl = (
  logoUrl: string | undefined | null,
  providerName: string,
  providerDomain?: string
): { primary: string; fallback: string; avatar: string } => {
  const chain = getLogoUrlChain(providerName, providerDomain, logoUrl)
  return {
    primary: chain[0] || getAvatarUrl(providerName),
    fallback: chain[1] || getFaviconUrl(providerDomain || 'example.com'),
    avatar: chain[chain.length - 1] || getAvatarUrl(providerName),
  }
}
