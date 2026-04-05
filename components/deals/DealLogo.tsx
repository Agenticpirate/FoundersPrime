'use client'

import { useState } from 'react'

interface DealLogoProps {
  logoUrl?: string
  brandIcon?: string
  provider: string
  size?: 'sm' | 'md' | 'lg'
}

// Generate a deterministic color from a string
function hashColor(str: string): string {
  const colors = ['#f5d000', '#13b6ec', '#ff6b35', '#6c63ff', '#00c896', '#ff4757', '#2ed573', '#ffa502']
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

// Initials fallback component — no external dependency
function InitialsFallback({ provider, size }: { provider: string; size: 'sm' | 'md' | 'lg' }) {
  const initials = provider
    .split(/[\s\-_&.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() || '')
    .join('')
  const bg = hashColor(provider)
  const textSize = size === 'sm' ? 'text-sm' : size === 'md' ? 'text-lg' : 'text-xl'

  return (
    <div
      className={`w-full h-full flex items-center justify-center font-black font-mono ${textSize}`}
      style={{ backgroundColor: bg, color: '#111111' }}
    >
      {initials || '?'}
    </div>
  )
}

// Helper to get high-quality brand logo
function getBrandLogo(logoUrl: string | undefined, brandIcon: string | undefined, provider: string): string | null {
  const originalUrl = logoUrl || brandIcon
  
  if (!originalUrl) {
    // Try Clearbit as primary source
    const domain = provider.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '') + '.com'
    return `https://logo.clearbit.com/${domain}`
  }
  
  // If it's already a high-quality logo URL, use it
  if (originalUrl.includes('logo.clearbit.com') || originalUrl.includes('cdn.brandfetch.io')) {
    return originalUrl
  }
  
  // Try to extract domain and get better logo
  try {
    let domain = ''
    if (originalUrl.includes('domain=')) {
      domain = originalUrl.split('domain=')[1].split('&')[0]
    } else if (originalUrl.includes('url=')) {
      const url = originalUrl.split('url=')[1].split('&')[0]
      domain = new URL(decodeURIComponent(url)).hostname
    } else if (originalUrl.includes('favicons?')) {
      // Google favicon URL - extract domain
      const match = originalUrl.match(/domain=([^&]+)/)
      if (match) domain = match[1]
    }
    
    if (domain) {
      // Use Clearbit for high-quality logos
      return `https://logo.clearbit.com/${domain}`
    }
  } catch {
    // Fall through to original URL
  }
  
  return originalUrl
}

export default function DealLogo({ logoUrl, brandIcon, provider, size = 'md' }: DealLogoProps) {
  const [fallbackIndex, setFallbackIndex] = useState(0)
  const [failed, setFailed] = useState(false)

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  }

  const domain = provider.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '') + '.com'
  const fallbackChain = [
    getBrandLogo(logoUrl, brandIcon, provider),
    `https://logo.clearbit.com/${domain}`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
  ].filter(Boolean) as string[]

  const handleError = () => {
    const nextIndex = fallbackIndex + 1
    if (nextIndex < fallbackChain.length) {
      setFallbackIndex(nextIndex)
    } else {
      setFailed(true)
    }
  }

  return (
    <div className={`${sizeClasses[size]} bg-white border-3 border-black rounded-lg flex items-center justify-center flex-shrink-0 shadow-[4px_4px_0px_#111111] overflow-hidden`}>
      {!failed && fallbackChain.length > 0 ? (
        <img
          src={fallbackChain[fallbackIndex]}
          alt={`${provider} logo`}
          className="object-contain w-full h-full p-2"
          onError={handleError}
        />
      ) : (
        <InitialsFallback provider={provider} size={size} />
      )}
    </div>
  )
}
