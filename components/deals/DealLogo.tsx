'use client'

import { useState } from 'react'
import Image from 'next/image'

interface DealLogoProps {
  logoUrl?: string
  brandIcon?: string
  provider: string
  size?: 'sm' | 'md' | 'lg'
}

export default function DealLogo({ logoUrl, brandIcon, provider, size = 'md' }: DealLogoProps) {
  const [hasError, setHasError] = useState(false)
  const sizeClasses = {
    sm: 'w-12 h-12 p-2',
    md: 'w-20 h-20 p-3',
    lg: 'w-24 h-24 p-4'
  }

  const iconSizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl'
  }

  const fallbackUrl = `/logos/${provider.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`
  const uiAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(provider)}&background=f3f4f6&color=1f2937&size=100`
  const imageUrl = hasError ? uiAvatarUrl : (logoUrl || brandIcon || fallbackUrl)

  return (
    <div className={`${sizeClasses[size]} bg-white border-3 border-black rounded-lg flex items-center justify-center flex-shrink-0 shadow-[4px_4px_0px_#111111] transition-colors overflow-hidden`}>
      <div className="relative w-full h-full p-2 text-center rounded">
        <img
          alt={`${provider} Logo`}
          className="object-contain w-full h-full"
          src={imageUrl}
          onError={() => setHasError(true)}
        />
      </div>
    </div>
  )
}
