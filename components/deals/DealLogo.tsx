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

// Helper to get domain from provider name
function providerToDomain(provider: string): string {
  const cleaned = (provider || '').toLowerCase().replace(/[^a-z0-9]/g, '')
  const domainMap: Record<string, string> = {
    'aws': 'aws.amazon.com',
    'amazon': 'amazon.com',
    'amazonwebservices': 'aws.amazon.com',
    'awsactivate': 'aws.amazon.com',
    'googlecloud': 'cloud.google.com',
    'googleforstartups': 'google.com',
    'google': 'google.com',
    'microsoftazure': 'microsoft.com',
    'microsoftforstartups': 'microsoft.com',
    'microsoft': 'microsoft.com',
    'azure': 'microsoft.com',
    'notion': 'notion.so',
    'linear': 'linear.app',
    'github': 'github.com',
    'stripe': 'stripe.com',
    'vercel': 'vercel.com',
    'netlify': 'netlify.com',
    'digitalocean': 'digitalocean.com',
    'hubspot': 'hubspot.com',
    'intercom': 'intercom.com',
    'airtable': 'airtable.com',
    'figma': 'figma.com',
    'slack': 'slack.com',
    'discord': 'discord.com',
    'mongodb': 'mongodb.com',
    'supabase': 'supabase.com',
    'cloudflare': 'cloudflare.com',
    'datadog': 'datadoghq.com',
    'sentry': 'sentry.io',
    'segment': 'segment.com',
    'mixpanel': 'mixpanel.com',
    'amplitude': 'amplitude.com',
    'brex': 'brex.com',
    'ramp': 'ramp.com',
    'openai': 'openai.com',
    'anthropic': 'anthropic.com',
  }
  return domainMap[cleaned] || `${cleaned}.com`
}

export default function DealLogo({ logoUrl, brandIcon, provider, size = 'md' }: DealLogoProps) {
  const [fallbackIndex, setFallbackIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  }

  const sizePx = { sm: 48, md: 80, lg: 96 }[size]

  // Get domain from provider name (used as fallback if logoUrl isn't usable)
  const domain = providerToDomain(provider)

  // Prefer caller-provided logoUrl / brandIcon when they look like real
  // image URLs. Skip generic placeholders.
  const isUsable = (s?: string) =>
    !!s &&
    /^https?:\/\//i.test(s) &&
    !s.includes('ui-avatars') &&
    !s.includes('rocket')

  const fallbackChain = [
    ...(isUsable(logoUrl) ? [logoUrl as string] : []),
    ...(isUsable(brandIcon) && brandIcon !== logoUrl ? [brandIcon as string] : []),
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    `https://logo.clearbit.com/${domain}`,
  ]

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
      {!failed ? (
        <img
          src={fallbackChain[fallbackIndex]}
          alt={`${provider} logo`}
          width={sizePx}
          height={sizePx}
          loading="lazy"
          decoding="async"
          className="object-contain w-full h-full p-2"
          onError={handleError}
        />
      ) : (
        <InitialsFallback provider={provider} size={size} />
      )}
    </div>
  )
}
