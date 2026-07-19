'use client'

import { useEffect, useMemo, useState } from 'react'
import { getLogoUrlChain } from '@/lib/logo-utils'

interface BrandLogoProps {
  logo?: string | null
  name: string
  domain?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  /** Marquee / above-the-fold — load immediately, never opacity-gate */
  eager?: boolean
  /**
   * Light circular plate (marquees). Card grids should use BrandLogoPlate instead.
   */
  plate?: boolean
  /** Parent is a dark strip (no plate) — light initials */
  onDark?: boolean
}

const sizeClasses = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
}

const textSizeClasses = {
  xs: 'text-[7px]',
  sm: 'text-[9px]',
  md: 'text-[10px]',
  lg: 'text-[12px]',
}

function initialsOf(name: string): string {
  const raw = (name || '?').trim()
  const parts = raw
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([0-9])([A-Za-z])/g, '$1 $2')
    .replace(/([A-Za-z])([0-9])/g, '$1 $2')
    .split(/[\s\-_./]+/)
    .filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0][0] || ''}${parts[1][0] || ''}`.toUpperCase()
  }
  return raw.slice(0, 2).toUpperCase()
}

/** Google’s “no favicon” placeholder is a 16×16 globe that still loads successfully. */
function isLikelyPlaceholderFavicon(src: string, naturalWidth: number): boolean {
  if (naturalWidth > 0 && naturalWidth < 24) return true
  const s = src || ''
  if (
    (s.includes('gstatic.com') || s.includes('google.com/s2/favicons')) &&
    naturalWidth > 0 &&
    naturalWidth <= 32
  ) {
    return true
  }
  return false
}

function isLocalAsset(src: string | null | undefined): boolean {
  if (!src) return false
  return (
    src.startsWith('/brand-logos/') ||
    src.startsWith('/logos/') ||
    src.startsWith('/logo')
  )
}

/**
 * Permanent brand mark (inline / marquee / detail).
 * Card grids MUST use BrandLogoPlate — it owns sizing so marks never crop.
 */
export default function BrandLogo({
  logo,
  name,
  domain,
  size = 'md',
  className = '',
  eager = false,
  plate = false,
  onDark = false,
}: BrandLogoProps) {
  const chain = useMemo(
    () =>
      getLogoUrlChain(name, domain, logo, {
        theme: plate ? 'light' : onDark ? 'dark' : 'auto',
        preferLocal: true,
      }),
    [name, domain, logo, plate, onDark]
  )

  const [index, setIndex] = useState(0)
  const [imgOk, setImgOk] = useState(false)
  const chainKey = chain.join('|')

  useEffect(() => {
    setIndex(0)
    setImgOk(false)
  }, [chainKey])

  const exhausted = chain.length === 0 || index >= chain.length
  const currentSrc = !exhausted ? chain[index] : null

  const advance = () => {
    setImgOk(false)
    setIndex((i) => i + 1)
  }

  const initials = initialsOf(name)
  const box = sizeClasses[size]

  const initialsColor = plate
    ? 'text-gray-900'
    : onDark
      ? 'text-gray-100'
      : 'text-gray-800 dark:text-gray-100'

  const paintNow = eager || plate || isLocalAsset(currentSrc) || isLocalAsset(logo)
  const showImg = paintNow || imgOk
  const hideInitials = Boolean(imgOk && !exhausted)

  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden flex-shrink-0 min-w-0 min-h-0 ${box} ${
        plate ? 'rounded-full bg-white border border-black/[0.08] p-1.5 shadow-sm' : ''
      } ${className}`}
      title={name}
    >
      <span
        aria-hidden
        className={`absolute inset-0 z-0 flex items-center justify-center font-black font-mono leading-none select-none pointer-events-none ${textSizeClasses[size]} ${initialsColor} ${
          hideInitials ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {initials}
      </span>

      {currentSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${index}-${currentSrc}`}
          src={currentSrc}
          alt=""
          width={32}
          height={32}
          className={`relative z-[1] block object-contain object-center ${
            showImg ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
          }}
          loading={paintNow ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={(e) => {
            const img = e.currentTarget
            const src = img.currentSrc || img.src || ''
            const isSvg = src.includes('.svg') || isLocalAsset(src)
            if (!isSvg && (!img.naturalWidth || img.naturalWidth < 12)) {
              advance()
              return
            }
            if (!isLocalAsset(src) && isLikelyPlaceholderFavicon(src, img.naturalWidth)) {
              advance()
              return
            }
            setImgOk(true)
          }}
          onError={advance}
        />
      ) : null}
    </span>
  )
}

// Card grids: use the dedicated plate (pixel-locked, absolute inset mark).
export { BrandLogoPlate, type BrandLogoPlateProps, type BrandLogoPlateSize } from './BrandLogoPlate'
