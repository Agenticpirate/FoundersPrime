'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

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
    <span className="relative w-6 h-6 flex-shrink-0 rounded-full bg-white border border-black/[0.08] dark:border-white/10 overflow-hidden flex items-center justify-center p-0.5 shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={24}
        height={24}
        className="w-full h-full object-contain"
        loading="eager"
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

export default function ProgramsBrandMarquee() {
  const reduce = useReducedMotion()
  // Triple row for seamless longer strip (matches deals marquee)
  const row = [...BRANDS, ...BRANDS, ...BRANDS]

  return (
    <div className="relative mt-6 overflow-hidden rounded-2xl border border-black/[0.05] dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm py-3">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10 bg-gradient-to-r from-gray-50 dark:from-black to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10 bg-gradient-to-l from-gray-50 dark:from-black to-transparent"
        aria-hidden
      />

      <p className="px-4 mb-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">
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
          <motion.div
            className="flex gap-2.5 px-4 will-change-transform"
            animate={{ x: ['0%', '-33.333%'] }}
            transition={{ duration: 48, ease: 'linear', repeat: Infinity }}
          >
            {row.map((b, idx) => (
              <BrandPill key={`${b.domain}-${idx}`} brand={b} />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  )
}
