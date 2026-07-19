'use client'

import Link from 'next/link'
import { GlowingEffect } from '@/components/ui/GlowingEffect'
import {
  CardHoverGlowShell,
  cardHoverClass,
  cardLogoHoverClass,
  cardTitleHoverClass,
} from '@/components/ui/card-hover'
import { CardBrandHeader } from '@/components/ui/CardBrandHeader'
import { resolveBrandDomain } from '@/lib/brand-domain'
import { isUsableLogoUrl } from '@/lib/logo-utils'
import { cardDescription, cardValueLabel, productWebsiteForLogo } from '@/lib/card-text'

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

function usableLogo(logo?: string): string | undefined {
  if (!logo || typeof logo !== 'string') return undefined
  const u = logo.trim()
  if (!u) return undefined
  if (!isUsableLogoUrl(u)) return undefined
  if (u.includes('google.com/s2/favicons') || u.includes('gstatic.com')) return undefined
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
  const productSite = productWebsiteForLogo(deal.applicationUrl)
  const domain =
    deal.domain ||
    resolveBrandDomain({
      name: cleanProvider || title,
      website: productSite,
      logo,
    })
  const logoSrc = usableLogo(logo)

  const brandName = cleanProvider || title || 'Brand'

  const normalizeForCompare = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

  const titleWithoutBrand = (() => {
    const rawTitle = (title || '').trim()
    if (!rawTitle) return ''
    const brand = brandName.trim()
    const normalizedTitle = normalizeForCompare(rawTitle)
    const normalizedBrand = normalizeForCompare(brand)
    if (normalizedTitle === normalizedBrand) return ''
    if (normalizedBrand && normalizedTitle.startsWith(`${normalizedBrand} `)) {
      return rawTitle
        .replace(new RegExp(`^${brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*(?:[:|–—-]|for\\b)?\\s*`, 'i'), '')
        .trim()
    }
    return rawTitle
  })()

  const detailParts = [titleWithoutBrand, description]
    .map((part) => (part || '').trim())
    .filter((part, index, parts) => {
      if (!part) return false
      const normalized = normalizeForCompare(part)
      return !parts.slice(0, index).some((existing) => {
        const prior = normalizeForCompare(existing)
        return prior === normalized || prior.includes(normalized) || normalized.includes(prior)
      })
    })
  const displayDesc = cardDescription(detailParts.join(' — '), 138)
  const displayValue = cardValueLabel(value || '', 14)

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
  const isLockedCta = overrideHref === '/pricing'

  return (
    <article className="relative flex h-[212px] flex-col rounded-xl md:h-[230px] md:rounded-2xl min-w-0">
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
        className={`flex h-full min-w-0 flex-1 flex-col overflow-visible rounded-xl border border-black/[0.06] bg-gradient-to-b from-white to-gray-50/70 p-3.5 text-left shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_8px_22px_rgba(0,0,0,0.05)] dark:rounded-2xl dark:border-white/[0.08] dark:from-[#111] dark:to-[#090909] md:rounded-2xl md:p-4 ${cardHoverClass}`}
        aria-label={`View details for ${title}`}
      >
        {/* Glow clipped here — never on the card root (avoids logo crop) */}
        <CardHoverGlowShell />

        {badge ? (
          <span
            className={`absolute top-1.5 right-1.5 md:top-2.5 md:right-2.5 z-10 inline-flex items-center h-4 md:h-5 px-1.5 md:px-2 ${badgeColor || 'bg-orange-500'} text-white text-[7px] md:text-[8px] font-bold uppercase tracking-wider rounded-full leading-none shadow-sm max-w-[36%] truncate`}
          >
            {badge}
          </span>
        ) : null}

        <CardBrandHeader
          name={brandName}
          domain={domain}
          logo={logoSrc}
          endClearance="badge"
          plateClassName={cardLogoHoverClass}
          textClassName={cardTitleHoverClass}
        />

        {/* Offer title + short description share a fixed three-line detail track. */}
        <p
          className="relative z-[1] mt-2 h-14 shrink-0 overflow-hidden text-[10px] leading-[1.4] text-gray-500 line-clamp-3 dark:text-gray-400 md:text-[11px]"
          title={[title, description].filter(Boolean).join(' — ')}
        >
          {displayDesc}
        </p>

        <div className="relative z-[1] mt-auto shrink-0 w-full min-w-0 pt-1.5">
          <div className="w-full flex items-center justify-between gap-1.5 h-8 md:h-9 rounded-lg border border-black/[0.06] dark:border-white/10 bg-gray-50 dark:bg-white/[0.04] pl-2 md:pl-2.5 pr-0.5 md:pr-1 min-w-0">
            <p
              className="min-w-0 flex-1 text-left text-[10px] md:text-[12px] font-bold text-amber-700 dark:text-accent-yellow font-mono truncate leading-none"
              title={value}
            >
              {displayValue}
            </p>
            <span
              className="shrink-0 inline-flex h-6 md:h-7 items-center justify-center gap-0.5 md:gap-1 bg-[#000000] text-white border border-[#FFD500]/40 text-[8px] md:text-[9px] font-bold uppercase tracking-wide px-1.5 md:px-2.5 rounded-md shadow-sm group-hover:bg-[#FFD500] group-hover:text-black group-hover:border-[#FFD500] transition-all duration-200 leading-none"
              aria-hidden="true"
            >
              <span className="leading-none md:hidden">{ctaShort}</span>
              <span className="leading-none hidden md:inline">{ctaLabel}</span>
              {isLockedCta ? (
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
    </article>
  )
}
