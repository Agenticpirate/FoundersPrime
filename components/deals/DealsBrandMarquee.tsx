'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Brand = {
  name: string
  domain: string
  /** Explicit same-origin PNG — never depends on BrandLogo chain / SVG quirks */
  logo: string
}

/**
 * Deals page trust strip brands.
 * Logos are fixed local PNGs under /public/brand-logos (logo.dev quality).
 * Do not use BrandLogo here — plate/lazy/SVG issues were causing blank/initials pills.
 */
const BRANDS: Brand[] = [
  { name: 'AWS', domain: 'aws.amazon.com', logo: '/brand-logos/aws.png' },
  { name: 'Google Cloud', domain: 'cloud.google.com', logo: '/brand-logos/googlecloud.png' },
  { name: 'Microsoft', domain: 'microsoft.com', logo: '/brand-logos/microsoft.png' },
  { name: 'OpenAI', domain: 'openai.com', logo: '/brand-logos/openai.png' },
  { name: 'Stripe', domain: 'stripe.com', logo: '/brand-logos/stripe.png' },
  { name: 'Notion', domain: 'notion.so', logo: '/brand-logos/notion.png' },
  { name: 'Vercel', domain: 'vercel.com', logo: '/brand-logos/vercel.png' },
  { name: 'GitHub', domain: 'github.com', logo: '/brand-logos/github.png' },
  { name: 'HubSpot', domain: 'hubspot.com', logo: '/brand-logos/hubspot.png' },
  { name: 'Figma', domain: 'figma.com', logo: '/brand-logos/figma.png' },
  { name: 'DigitalOcean', domain: 'digitalocean.com', logo: '/brand-logos/digitalocean.png' },
  { name: 'Cloudflare', domain: 'cloudflare.com', logo: '/brand-logos/cloudflare.png' },
  { name: 'Anthropic', domain: 'anthropic.com', logo: '/brand-logos/anthropic.png' },
  { name: 'MongoDB', domain: 'mongodb.com', logo: '/brand-logos/mongodb.png' },
  { name: 'Twilio', domain: 'twilio.com', logo: '/brand-logos/twilio.png' },
  { name: 'Datadog', domain: 'datadoghq.com', logo: '/brand-logos/datadog.png' },
  { name: 'Airtable', domain: 'airtable.com', logo: '/brand-logos/airtable.png' },
  { name: 'Linear', domain: 'linear.app', logo: '/brand-logos/linear.png' },
  { name: 'Supabase', domain: 'supabase.com', logo: '/brand-logos/supabase.png' },
  { name: 'Slack', domain: 'slack.com', logo: '/brand-logos/slack.png' },
  { name: 'Intercom', domain: 'intercom.com', logo: '/brand-logos/intercom.png' },
  { name: 'Auth0', domain: 'auth0.com', logo: '/brand-logos/auth0.png' },
  { name: 'Webflow', domain: 'webflow.com', logo: '/brand-logos/webflow.png' },
  { name: 'Framer', domain: 'framer.com', logo: '/brand-logos/framer.png' },
]

function MarqueeLogo({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false)
  // Google favicon as last-resort remote (only if local PNG missing/corrupt)
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

export default function DealsBrandMarquee({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion()
  // Triple row for seamless longer strip
  const row = [...BRANDS, ...BRANDS, ...BRANDS]

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
        Brands founders claim credits from
      </p>
      {reduce ? (
        <div className="flex flex-wrap gap-1.5 md:gap-2 px-3 md:px-4">
          {BRANDS.map((b) => (
            <BrandPill key={b.domain} brand={b} />
          ))}
        </div>
      ) : (
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-2 md:gap-2.5 px-3 md:px-4 will-change-transform"
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
