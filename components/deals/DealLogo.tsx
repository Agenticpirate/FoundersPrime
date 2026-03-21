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

export default function DealLogo({ logoUrl, brandIcon, provider, size = 'md' }: DealLogoProps) {
  const [hasError, setHasError] = useState(false)

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  }

  const imageUrl = hasError ? null : (logoUrl || brandIcon || null)

  return (
    <div className={`${sizeClasses[size]} bg-white border-3 border-black rounded-lg flex items-center justify-center flex-shrink-0 shadow-[4px_4px_0px_#111111] overflow-hidden`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${provider} logo`}
          className="object-contain w-full h-full p-2"
          onError={() => setHasError(true)}
        />
      ) : (
        <InitialsFallback provider={provider} size={size} />
      )}
    </div>
  )
}
