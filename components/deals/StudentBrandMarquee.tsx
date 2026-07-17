'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

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
const BRANDS: Brand[] = [
  { name: 'GitHub', domain: 'github.com', logo: '/brand-logos/github.png' },
  { name: 'Figma', domain: 'figma.com', logo: '/brand-logos/figma.png' },
  { name: 'Notion', domain: 'notion.so', logo: '/brand-logos/notion.png' },
  { name: 'Microsoft', domain: 'microsoft.com', logo: '/brand-logos/microsoft.png' },
  { name: 'Adobe', domain: 'adobe.com', logo: '/brand-logos/adobe.png' },
  { name: 'Google', domain: 'google.com', logo: '/brand-logos/google.png' },
  { name: 'Spotify', domain: 'spotify.com', logo: '/brand-logos/spotify.svg' },
  { name: 'AWS', domain: 'aws.amazon.com', logo: '/brand-logos/aws.png' },
  { name: 'Canva', domain: 'canva.com', logo: '/brand-logos/canva.png' },
  { name: 'Autodesk', domain: 'autodesk.com', logo: '/brand-logos/autodesk.svg' },
  { name: 'JetBrains', domain: 'jetbrains.com', logo: '/brand-logos/jetbrains.svg' },
  { name: 'Apple', domain: 'apple.com', logo: '/brand-logos/apple.svg' },
  { name: 'Slack', domain: 'slack.com', logo: '/brand-logos/slack.png' },
  { name: 'Zoom', domain: 'zoom.us', logo: '/brand-logos/zoom.svg' },
  { name: 'Dropbox', domain: 'dropbox.com', logo: '/brand-logos/dropbox.svg' },
  { name: 'LinkedIn', domain: 'linkedin.com', logo: '/brand-logos/linkedin.png' },
  { name: 'Amazon', domain: 'amazon.com', logo: '/brand-logos/amazon.png' },
  { name: 'Unity', domain: 'unity.com', logo: '/brand-logos/unity.svg' },
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

export default function StudentBrandMarquee() {
  const reduce = useReducedMotion()
  // Triple row for seamless longer strip
  const row = [...BRANDS, ...BRANDS, ...BRANDS]

  return (
    <div className="relative mt-6 overflow-hidden rounded-2xl border border-black/[0.05] dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm py-3">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent"
        aria-hidden
      />
      <p className="px-4 mb-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">
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
          <motion.div
            className="flex gap-2.5 px-4 will-change-transform"
            animate={{ x: ['0%', '-33.333%'] }}
            transition={{ duration: 55, ease: 'linear', repeat: Infinity }}
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
