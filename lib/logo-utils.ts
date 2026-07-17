/**
 * Utility functions for fetching brand logos with fallbacks.
 * Priority: Google Favicons (fast, reliable) → Clearbit (high quality) → UI Avatars (always works)
 */

export const getFaviconUrl = (domain: string, size: number = 128): string => {
  if (!domain) return ''
  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]
  return `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=${size}`
}

export const getLogoUrl = (domain: string): string => {
  if (!domain) return ''
  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]
  return `https://logo.clearbit.com/${cleanDomain}`
}

export const getAvatarUrl = (name: string, size: number = 128): string => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f3f4f6&color=374151&bold=true&size=${size}`
}

export const extractDomainFromUrl = (url: string): string | null => {
  try {
    if (url.includes('domain=')) return url.split('domain=')[1].split('&')[0]
    if (url.includes('logo.clearbit.com/')) return url.split('logo.clearbit.com/')[1].split('?')[0]
    if (url.includes('://')) return new URL(url).hostname.replace('www.', '')
    return null
  } catch { return null }
}

// Returns favicon first (fast), then clearbit (high quality), then avatar (always works)
export const getBestLogoUrl = (
  logoUrl: string | undefined | null,
  providerName: string,
  providerDomain?: string
): { primary: string; fallback: string; avatar: string } => {
  let domain = providerDomain
  if (!domain && logoUrl) domain = extractDomainFromUrl(logoUrl) || undefined
  if (!domain) {
    const name = (providerName || 'unknown').toString()
    domain = `${name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'unknown'}.com`
  }

  return {
    primary: getFaviconUrl(domain),
    fallback: getLogoUrl(domain),
    avatar: getAvatarUrl(providerName)
  }
}
