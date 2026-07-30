'use client'

import { useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'

type Brand = {
  name: string
  domain: string
  /** Explicit same-origin asset under /public/brand-logos */
  logo: string
}

/**
 * Student benefits trust strip.
 * Fixed local logos (same pattern as Deals/Programs marquees) so BrandLogo
 * remote-chain / SVG quirks never leave blank or initials-only pills.
 */
const LOGO_V = '20260718official'

const BRANDS: Brand[] = [
  { name: 'GitHub', domain: 'github.com', logo: `/brand-logos/github.png?v=${LOGO_V}` },
  { name: 'Figma', domain: 'figma.com', logo: `/brand-logos/figma.png?v=${LOGO_V}` },
  { name: 'Notion', domain: 'notion.so', logo: `/brand-logos/notion.png?v=${LOGO_V}` },
  { name: 'Microsoft', domain: 'microsoft.com', logo: `/brand-logos/microsoft.svg?v=${LOGO_V}` },
  { name: 'Adobe', domain: 'adobe.com', logo: `/brand-logos/adobe.svg?v=${LOGO_V}` },
  { name: 'Google', domain: 'google.com', logo: `/brand-logos/google.png?v=${LOGO_V}` },
  { name: 'Spotify', domain: 'spotify.com', logo: `/brand-logos/spotify.svg?v=${LOGO_V}` },
  { name: 'AWS', domain: 'aws.amazon.com', logo: `/brand-logos/aws.png?v=${LOGO_V}` },
  { name: 'Canva', domain: 'canva.com', logo: `/brand-logos/canva.png?v=${LOGO_V}` },
  { name: 'Autodesk', domain: 'autodesk.com', logo: `/brand-logos/autodesk.svg?v=${LOGO_V}` },
  { name: 'JetBrains', domain: 'jetbrains.com', logo: `/brand-logos/jetbrains.svg?v=${LOGO_V}` },
  { name: 'Apple', domain: 'apple.com', logo: `/brand-logos/apple.svg?v=${LOGO_V}` },
  { name: 'Slack', domain: 'slack.com', logo: `/brand-logos/slack.svg?v=${LOGO_V}` },
  { name: 'Zoom', domain: 'zoom.us', logo: `/brand-logos/zoom.svg?v=${LOGO_V}` },
  { name: 'Dropbox', domain: 'dropbox.com', logo: `/brand-logos/dropbox.svg?v=${LOGO_V}` },
  { name: 'LinkedIn', domain: 'linkedin.com', logo: `/brand-logos/linkedin.png?v=${LOGO_V}` },
  { name: 'Amazon', domain: 'amazon.com', logo: `/brand-logos/amazon.png?v=${LOGO_V}` },
  { name: 'Unity', domain: 'unity.com', logo: `/brand-logos/unity.svg?v=${LOGO_V}` },
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

export default function StudentBrandMarquee({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion()

  return (
    <div
      className={`relative overflow-hidden rounded-xl md:rounded-2xl border border-black/[0.05] dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm ${
        compact ? 'mt-3 py-2 md:mt-6 md:py-3' : 'mt-6 py-3'
      }`}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-8 md:w-12 z-10 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-8 md:w-12 z-10 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent"
        aria-hidden
      />
      <p
        className={`px-3 md:px-4 font-mono font-bold uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500 ${
          compact
            ? 'mb-1.5 text-[8px] md:mb-2.5 md:text-[9px] md:tracking-[0.16em]'
            : 'mb-2.5 text-[9px] tracking-[0.16em]'
        }`}
      >
        Brands students claim free tools &amp; credits from
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
            transition={{ duration: 55, ease: 'linear', repeat: Infinity }}
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
