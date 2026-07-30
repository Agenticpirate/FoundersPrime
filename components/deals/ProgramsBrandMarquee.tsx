'use client'

import { useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'

type Brand = {
  name: string
  domain: string
  /** Explicit same-origin PNG under /public/brand-logos */
  logo: string
}

/**
 * Programs page trust strip.
 * Uses fixed local PNGs (same pattern as DealsBrandMarquee) so BrandLogo
 * chain/SVG quirks never leave blank or initials-only pills.
 */
const BRANDS: Brand[] = [
  { name: 'Y Combinator', domain: 'ycombinator.com', logo: '/brand-logos/ycombinator.svg' },
  { name: 'Techstars', domain: 'techstars.com', logo: '/brand-logos/techstars.png' },
  { name: '500 Global', domain: '500.co', logo: '/brand-logos/500global.png' },
  { name: 'a16z', domain: 'a16z.com', logo: '/brand-logos/a16z.png' },
  { name: 'Plug and Play', domain: 'plugandplaytechcenter.com', logo: '/brand-logos/plugandplay.png' },
  { name: 'MassChallenge', domain: 'masschallenge.org', logo: '/brand-logos/masschallenge.png' },
  { name: 'StartX', domain: 'startx.com', logo: '/brand-logos/startx.png' },
  { name: 'Alchemist', domain: 'alchemistaccelerator.com', logo: '/brand-logos/alchemist.png' },
  { name: 'Antler', domain: 'antler.co', logo: '/brand-logos/antler.png' },
  { name: 'Entrepreneur First', domain: 'joinef.com', logo: '/brand-logos/joinef.png' },
  { name: 'SOSV', domain: 'sosv.com', logo: '/brand-logos/sosv.png' },
  { name: 'Founder Institute', domain: 'fi.co', logo: '/brand-logos/foundersinstitute.png' },
]

function MarqueeLogo({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false)
  const fallback = `https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`
  const src = failed ? fallback : brand.logo

  return (
    <span className="relative w-6 h-6 flex-shrink-0 rounded-full bg-white border border-black/[0.08] dark:border-white/10 overflow-hidden flex items-center justify-center p-1 shadow-sm box-border min-w-0 min-h-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={16}
        height={16}
        className="block w-full h-full max-w-full max-h-full object-contain"
        style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%' }}
        loading="lazy"
        fetchPriority="low"
        decoding="async"
        draggable={false}
        onError={() => {
          if (!failed) setFailed(true)
        }}
      />
    </span>
  )
}

function BrandPill({ brand }: { brand: Brand }) {
  return (
    <div className="flex items-center gap-2.5 rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-white/[0.06] pl-1.5 pr-3.5 py-1.5 shadow-[0_1px_0_rgba(255,255,255,0.4)_inset] flex-shrink-0">
      <MarqueeLogo brand={brand} />
      <span className="font-mono text-[10px] font-semibold text-gray-800 dark:text-gray-100 whitespace-nowrap">
        {brand.name}
      </span>
    </div>
  )
}

export default function ProgramsBrandMarquee({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion()

  return (
    <div
      className={`relative overflow-hidden rounded-xl md:rounded-2xl border border-black/[0.05] dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm ${
        compact ? 'mt-3 py-2 md:mt-6 md:py-3' : 'mt-6 py-3'
      }`}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-8 md:w-12 z-10 bg-gradient-to-r from-gray-50 dark:from-black to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-8 md:w-12 z-10 bg-gradient-to-l from-gray-50 dark:from-black to-transparent"
        aria-hidden
      />

      <p
        className={`px-3 md:px-4 font-mono font-bold uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500 ${
          compact
            ? 'mb-1.5 text-[8px] md:mb-2.5 md:text-[9px] md:tracking-[0.16em]'
            : 'mb-2.5 text-[9px] tracking-[0.16em]'
        }`}
      >
        Featured programs in the directory
      </p>

      {reduce ? (
        <div className="flex flex-wrap gap-2 px-4">
          {BRANDS.map((b) => (
            <BrandPill key={b.domain} brand={b} />
          ))}
        </div>
      ) : (
        <div className="flex overflow-hidden">
          <m.div
            className="flex gap-2.5 px-4 will-change-transform"
            animate={{ x: ['0%', '-33.333%'] }}
            transition={{ duration: 48, ease: 'linear', repeat: Infinity }}
          >
            {(['a', 'b', 'c'] as const).flatMap((pass) =>
              BRANDS.map((b) => (
                <BrandPill key={`${pass}-${b.domain}`} brand={b} />
              ))
            )}
          </m.div>
        </div>
      )}
    </div>
  )
}
