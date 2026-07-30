'use client'

/**
 * Bulletproof card logo plate — All Deals, Programs, Student Benefits (mobile-first).
 *
 * Guarantees:
 * - Fixed pixel box (cannot grow with img intrinsic size)
 * - Mark uses a consistent 12.5% inset so padded and full-bleed assets stay readable
 * - object-fit:contain + absolute positioning only
 * - overflow:hidden ONLY on this plate (rounded white box)
 * - Parent cards must stay overflow-visible (no card-level clip)
 */

import { useEffect, useMemo, useState } from 'react'
import { getLogoUrlChain } from '@/lib/logo-utils'

export type BrandLogoPlateSize = 'sm' | 'md' | 'lg' | 'program' | 'student'

export interface BrandLogoPlateProps {
  logo?: string | null
  name: string
  domain?: string
  size?: BrandLogoPlateSize
  className?: string
  plateClassName?: string
  /** Set only for plates above the fold; everything else should stay lazy. */
  eager?: boolean
}

const OUTER: Record<BrandLogoPlateSize, { w: number; h: number; r: number }> = {
  sm: { w: 32, h: 32, r: 8 },
  md: { w: 40, h: 40, r: 10 },
  lg: { w: 48, h: 48, r: 12 },
  program: { w: 44, h: 44, r: 12 },
  student: { w: 44, h: 44, r: 12 },
}

/** 12.5% inset keeps marks visually consistent without shrinking padded logos. */
const INSET_RATIO = 0.125

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

function isLocalAsset(src: string | null | undefined): boolean {
  if (!src) return false
  return src.startsWith('/brand-logos/') || src.startsWith('/logos/') || src.startsWith('/logo')
}

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

export function BrandLogoPlate({
  logo,
  name,
  domain,
  size = 'md',
  className = '',
  plateClassName = '',
  // Lazy by default: a catalog page renders dozens of these, and eager loading
  // them all competes with the largest contentful paint. Pass eager only for
  // plates that are genuinely above the fold.
  eager = false,
}: BrandLogoPlateProps) {
  const chain = useMemo(
    () =>
      getLogoUrlChain(name, domain, logo, {
        theme: 'light',
        preferLocal: true,
        preferRemote: true,
      }),
    [name, domain, logo]
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
  const initials = initialsOf(name)
  const box = OUTER[size]
  const inset = Math.max(7, Math.round(box.w * INSET_RATIO))
  const mark = Math.max(14, box.w - inset * 2)

  const advance = () => {
    setImgOk(false)
    setIndex((i) => i + 1)
  }

  return (
    <div
      data-logo-plate="v4"
      title={name}
      className={`bg-white border border-black/[0.08] dark:border-white/10 shadow-sm ${plateClassName} ${className}`}
      style={{
        width: box.w,
        height: box.h,
        minWidth: box.w,
        minHeight: box.h,
        maxWidth: box.w,
        maxHeight: box.h,
        borderRadius: box.r,
        overflow: 'hidden',
        flexShrink: 0,
        flexGrow: 0,
        flexBasis: box.w,
        boxSizing: 'border-box',
        display: 'block',
        position: 'relative',
        // Prevent any transform/filter parent from shifting paint
        contain: 'layout paint size',
        isolation: 'isolate',
      }}
    >
      <span
        aria-hidden
        className={`absolute inset-0 z-0 flex items-center justify-center font-black font-mono text-[10px] leading-none select-none text-gray-900 pointer-events-none ${
          imgOk && currentSrc ? 'opacity-0' : 'opacity-100'
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
          width={mark}
          height={mark}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          style={{
            position: 'absolute',
            zIndex: 1,
            top: inset,
            left: inset,
            width: mark,
            height: mark,
            maxWidth: mark,
            maxHeight: mark,
            objectFit: 'contain',
            objectPosition: 'center center',
            display: 'block',
            // Kill intrinsic min-content expansion in all engines
            minWidth: 0,
            minHeight: 0,
          }}
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
    </div>
  )
}

export default BrandLogoPlate
