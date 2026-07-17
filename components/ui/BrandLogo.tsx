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
  /** Light circular plate (deals / programs / students marquees) */
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
  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0][0] || ''}${parts[1][0] || ''}`.toUpperCase()
  }
  return (name || '?').slice(0, 2).toUpperCase()
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
 * Permanent brand mark:
 * 1. Local /brand-logos first (same-origin)
 * 2. Google → logo.dev → DDG → ui-avatars
 * 3. Dark initials always visible on light plates (never blank discs)
 * 4. Local + plate logos paint immediately (no lazy/opacity trap inside Framer Motion grids)
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

  // Critical: local assets + plate logos (card grids) must never wait on lazy/onLoad.
  // Framer Motion transforms break IntersectionObserver for loading="lazy", leaving
  // opacity-0 images forever and only initials visible.
  const paintNow = eager || plate || isLocalAsset(currentSrc) || isLocalAsset(logo)
  const showImg = paintNow || imgOk
  const hideInitials = Boolean(imgOk && !exhausted)

  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden flex-shrink-0 ${box} ${
        plate
          ? 'rounded-full bg-white border border-black/[0.08] p-[3px] shadow-sm'
          : ''
      } ${className}`}
      title={name}
    >
      {/* Initials fallback — hidden only after a real image has loaded */}
      <span
        aria-hidden
        className={`absolute inset-0 z-0 flex items-center justify-center font-black font-mono leading-none select-none ${textSizeClasses[size]} ${initialsColor} ${
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
          width={64}
          height={64}
          className={`relative z-[1] w-full h-full object-contain ${
            showImg ? 'opacity-100' : 'opacity-0'
          }`}
          loading={paintNow ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={(e) => {
            const img = e.currentTarget
            // Skip empty CDN placeholders; allow SVG (naturalWidth often 0 until laid out)
            const isSvg =
              (img.currentSrc || img.src || '').includes('.svg') ||
              isLocalAsset(img.currentSrc || img.src)
            if (!isSvg && (!img.naturalWidth || img.naturalWidth < 12)) {
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
