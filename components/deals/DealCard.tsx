'use client'

import Link from 'next/link'
import { GlowingEffect } from '@/components/ui/GlowingEffect'
import { CardHoverGlow, cardHoverClass, cardLogoHoverClass, cardTitleHoverClass } from '@/components/ui/card-hover'
import BrandLogo from '@/components/ui/BrandLogo'
import { resolveBrandDomain } from '@/lib/brand-domain'
import { isUsableLogoUrl } from '@/lib/logo-utils'

interface Deal {
  id: string
  logo: string
  /** Preferred brand domain (from claim URL) — wins over name-guessing */
  domain?: string
  category: string
  badge?: string
  badgeColor?: string
  title: string
  provider: string
  value: string
  valueSubtext: string
  valueStyle: string
  description: string
  eligibility?: string
  validFor?: string
  applicationUrl?: string
  verified?: boolean
}

interface DealCardProps {
  deal: Deal
  basePath?: string
  overrideHref?: string
}

const truncateValue = (val: string, max: number = 36): string => {
  if (!val) return ''
  if (val.length <= max) return val
  return val.substring(0, max).trim() + '…'
}

function usableLogo(logo?: string): string | undefined {
  if (!logo || typeof logo !== 'string') return undefined
  const u = logo.trim()
  if (!u) return undefined
  if (!isUsableLogoUrl(u)) return undefined
  if (
    u.includes('rocket') ||
    u.includes('placeholder') ||
    u.includes('upload.wikimedia.org') ||
    u.includes('redditstatic.com')
  ) {
    return undefined
  }
  return u
}

export default function DealCard({ deal, basePath = '/deals', overrideHref }: DealCardProps) {
  const { id, logo, badge, badgeColor, title, provider, value, description } = deal

  const href = overrideHref ?? `${basePath}/${id}`
  const isExternal = href.startsWith('http')
  const LinkComponent = isExternal ? 'a' : Link
  const linkProps = isExternal
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { href }

  const cleanProvider = (provider || '').replace(/^By\s+/i, '').trim()
  const domain =
    deal.domain ||
    resolveBrandDomain({
      name: cleanProvider || title,
      website: deal.applicationUrl,
      logo,
    })
  const logoSrc = usableLogo(logo)

  const ctaLabel =
    basePath.includes('student')
      ? 'Get Access'
      : overrideHref === '/pricing'
        ? 'Unlock'
        : 'View Deal'
  const ctaShort =
    basePath.includes('student')
      ? 'Access'
      : overrideHref === '/pricing'
        ? 'Unlock'
        : 'View'
  const isLocked = overrideHref === '/pricing'

  /*
    Mobile: compact density (shorter title band, 1-line desc, smaller logo/CTA).
    Desktop (md+): unchanged premium geometry.
  */
  return (
    <div className="relative h-[168px] md:h-[200px] flex flex-col rounded-xl md:rounded-2xl min-w-0">
      <GlowingEffect
        spread={40}
        glow={false}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
      />
      <LinkComponent
        {...linkProps}
        className={`relative flex flex-col h-full p-2.5 md:p-3.5 bg-white dark:bg-gradient-to-b dark:from-[#111] dark:to-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.08] shadow-sm flex-1 rounded-xl md:rounded-2xl text-left overflow-hidden min-w-0 ${cardHoverClass}`}
        aria-label={`View details for ${title}`}
      >
        <CardHoverGlow />

        {badge ? (
          <span
            className={`absolute top-1.5 right-1.5 md:top-2.5 md:right-2.5 z-10 inline-flex items-center h-4 md:h-5 px-1.5 md:px-2 ${badgeColor || 'bg-orange-500'} text-white text-[7px] md:text-[8px] font-bold uppercase tracking-wider rounded-full leading-none shadow-sm max-w-[42%] truncate`}
          >
            {badge}
          </span>
        ) : null}

        {/* Header: logo + title */}
        <div className="flex items-start gap-2 md:gap-3 shrink-0 pr-10 md:pr-14 min-w-0">
          <div
            className={`relative w-9 h-9 md:w-11 md:h-11 shrink-0 rounded-lg md:rounded-[10px] bg-white border border-black/[0.08] dark:border-white/10 overflow-hidden shadow-sm ${cardLogoHoverClass}`}
          >
            <div className="absolute inset-0 flex items-center justify-center p-1 md:p-[7px]">
              <BrandLogo
                name={cleanProvider || title}
                domain={domain}
                logo={logoSrc}
                size="md"
                eager
                className="!w-full !h-full !max-w-full !max-h-full !rounded-none !border-0 !p-0 !bg-transparent !shadow-none !inline-flex !overflow-hidden"
              />
            </div>
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <h3
              className={`text-[11px] md:text-[13px] font-bold text-gray-900 dark:text-white leading-[1.25] line-clamp-2 h-[2.2rem] md:h-[2.6rem] md:leading-[1.3] ${cardTitleHoverClass}`}
              title={title}
            >
              {title}
            </h3>
            <p
              className="mt-0.5 text-[9px] md:text-[10px] leading-3 md:leading-4 h-3 md:h-4 text-gray-500 dark:text-gray-400 font-mono truncate"
              title={cleanProvider}
            >
              {cleanProvider}
            </p>
          </div>
        </div>

        {/* Description — 1 line mobile, 2 lines desktop */}
        <p
          className="mt-2 md:mt-3 shrink-0 text-[10px] md:text-[11px] leading-[1.35] md:leading-[1.4] h-[1.35rem] md:h-[2.8rem] text-gray-500 dark:text-gray-400 line-clamp-1 md:line-clamp-2 overflow-hidden"
          title={description}
        >
          {description}
        </p>

        {/* Value + CTA */}
        <div className="mt-auto shrink-0 w-full min-w-0 pt-1.5 md:pt-0">
          <div className="w-full flex items-center justify-between gap-1.5 md:gap-2 h-8 md:h-9 rounded-lg border border-black/[0.06] dark:border-white/10 bg-gray-50 dark:bg-white/[0.04] pl-2 md:pl-3 pr-0.5 md:pr-1 min-w-0">
            <p
              className="min-w-0 flex-1 text-left text-[10px] md:text-[12px] font-bold text-amber-700 dark:text-accent-yellow font-mono truncate leading-none"
              title={value}
            >
              <span className="md:hidden">{truncateValue(value, 12)}</span>
              <span className="hidden md:inline">{truncateValue(value, 28)}</span>
            </p>
            <span
              className="shrink-0 inline-flex h-6 md:h-7 items-center justify-center gap-0.5 md:gap-1 bg-black dark:bg-white text-white dark:text-black text-[8px] md:text-[9px] font-bold uppercase tracking-wide px-1.5 md:px-2.5 rounded-md shadow-sm group-hover:bg-accent-yellow group-hover:text-black transition-all duration-200 leading-none"
              aria-hidden="true"
            >
              <span className="leading-none md:hidden">{ctaShort}</span>
              <span className="leading-none hidden md:inline">{ctaLabel}</span>
              {isLocked ? (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="block shrink-0" aria-hidden>
                  <path d="M17 11V8a5 5 0 0 0-10 0v3M6 11h12v9H6v-9Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="block shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden>
                  <path d="M2.5 7h9M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
          </div>
        </div>
      </LinkComponent>
    </div>
  )
}
