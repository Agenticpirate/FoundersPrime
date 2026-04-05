'use client'

import { useState } from 'react'
import { getBestLogoUrl } from '@/lib/logo-utils'

interface BrandLogoProps {
  logo?: string | null
  name: string
  domain?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  showFallbackIcon?: boolean
}

const sizeClasses = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12'
}

export default function BrandLogo({ 
  logo, 
  name, 
  domain, 
  size = 'md', 
  className = '',
  showFallbackIcon = true 
}: BrandLogoProps) {
  const [loadState, setLoadState] = useState<'primary' | 'fallback' | 'avatar' | 'icon'>('primary')
  const [loaded, setLoaded] = useState(false)

  const urls = getBestLogoUrl(logo, name, domain)

  const getCurrentSrc = () => {
    switch (loadState) {
      case 'primary': return urls.primary
      case 'fallback': return urls.fallback
      case 'avatar': return urls.avatar
      default: return ''
    }
  }

  const handleError = () => {
    setLoaded(false)
    if (loadState === 'primary') {
      setLoadState('fallback')
    } else if (loadState === 'fallback') {
      setLoadState('avatar')
    } else {
      setLoadState('icon')
    }
  }

  const handleLoad = () => {
    setLoaded(true)
  }

  if (loadState === 'icon') {
    if (!showFallbackIcon) {
      return (
        <span className={`${sizeClasses[size]} flex items-center justify-center text-xs font-black font-mono text-gray-400 ${className}`}>
          {name.substring(0, 2).toUpperCase()}
        </span>
      )
    }
    return (
      <span className={`material-symbols-outlined ${size === 'xs' ? 'text-sm' : size === 'sm' ? 'text-base' : size === 'md' ? 'text-xl' : 'text-2xl'} text-gray-300 ${className}`}>
        rocket_launch
      </span>
    )
  }

  return (
    <img
      src={getCurrentSrc()}
      alt={`${name} logo`}
      className={`${sizeClasses[size]} object-contain ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200 ${className}`}
      loading="lazy"
      onLoad={handleLoad}
      onError={handleError}
    />
  )
}
