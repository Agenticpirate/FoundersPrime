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

  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(provider)}&background=f3f4f6&color=1f2937&size=80&bold=true`
  const imageUrl = logoUrl || brandIcon || fallbackUrl
  const hasValidLogo = imageUrl && !imageUrl.includes('ui-avatars.com') && !hasError

  return (
    <div className={`${sizeClasses[size]} bg-white border-3 border-black rounded-lg flex items-center justify-center flex-shrink-0 shadow-[4px_4px_0px_#111111] transition-colors ${!hasValidLogo ? 'group-hover:bg-yellow-50' : ''}`}>
      {hasValidLogo ? (
        <div className="relative w-full h-full">
          <Image
            alt={`${provider} Logo`}
            className="object-contain"
            src={imageUrl}
            fill
            sizes="(max-width: 768px) 48px, 80px"
            onError={() => setHasError(true)}
          />
        </div>
      ) : (
        <span className={`material-symbols-outlined ${iconSizes[size]} text-yellow-500 group-hover:text-yellow-600 group-hover:scale-110 transition-all duration-200 ${hasError ? 'animate-pulse' : ''}`}>
          rocket_launch
        </span>
      )}
    </div>
  )
}
