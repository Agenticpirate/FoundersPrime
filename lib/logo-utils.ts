/**
 * Utility functions for fetching high-quality brand logos with fallbacks
 */

// Primary: Clearbit Logo API (high quality, free)
// Fallback 1: Google Favicon (reliable but low quality)
// Fallback 2: UI Avatars (always works)

export const getLogoUrl = (domain: string, size: number = 128): string => {
  if (!domain) return ''
  // Clean domain - remove protocol and www
  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]
  return `https://logo.clearbit.com/${cleanDomain}`
}

export const getFaviconUrl = (domain: string, size: number = 128): string => {
  if (!domain) return ''
  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]
  return `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=${size}`
}

export const getAvatarUrl = (name: string, size: number = 128): string => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f3f4f6&color=374151&bold=true&size=${size}`
}

// Get the best logo URL with domain extraction from various URL formats
export const extractDomainFromUrl = (url: string): string | null => {
  try {
    // Handle Google favicon URLs
    if (url.includes('domain=')) {
      return url.split('domain=')[1].split('&')[0]
    }
    // Handle Clearbit URLs
    if (url.includes('logo.clearbit.com/')) {
      return url.split('logo.clearbit.com/')[1].split('?')[0]
    }
    // Handle regular URLs
    if (url.includes('://')) {
      return new URL(url).hostname.replace('www.', '')
    }
    return null
  } catch {
    return null
  }
}

// Get best logo with automatic fallback chain
export const getBestLogoUrl = (
  logoUrl: string | undefined | null,
  providerName: string,
  providerDomain?: string
): { primary: string; fallback: string; avatar: string } => {
  let domain = providerDomain

  // Try to extract domain from existing logo URL
  if (!domain && logoUrl) {
    domain = extractDomainFromUrl(logoUrl) || undefined
  }

  // Generate domain from provider name as last resort
  if (!domain) {
    domain = `${providerName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
  }

  return {
    primary: getLogoUrl(domain),
    fallback: getFaviconUrl(domain),
    avatar: getAvatarUrl(providerName)
  }
}
