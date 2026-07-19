// @ts-nocheck
'use client'

import Link from 'next/link'
import { CardBrandHeader } from '@/components/ui/CardBrandHeader'
import { BrandLogoPlate } from '@/components/ui/BrandLogo'
import { cleanDomain } from '@/lib/logo-utils'
import {
  CardHoverGlowShell,
  cardHoverClass,
  cardLogoHoverClass,
  cardTitleHoverClass,
} from '@/components/ui/card-hover'
import type { Grant } from '@/data/grants-2026'

export const getStatusColor = (status: Grant['applicationStatus']) => {
  switch (status) {
    case 'Active': return 'bg-amber-600 text-white'
    case 'Rolling': return 'bg-blue-600 text-white'
    case 'Closed': return 'bg-gray-600 text-white'
    case 'Opening Soon': return 'bg-yellow-600 text-white'
    default: return 'bg-gray-600 text-white'
  }
}

export const getTypeColor = (type: Grant['type']) => {
  switch (type) {
    case 'Government': return 'bg-blue-600 text-white'
    case 'Corporate': return 'bg-purple-600 text-white'
    case 'Foundation': return 'bg-yellow-600 text-white'
    case 'Competition': return 'bg-red-600 text-white'
    case 'State/Regional': return 'bg-amber-600 text-white'
    default: return 'bg-gray-600 text-white'
  }
}

function getGrantDomain(grant: Grant): string | undefined {
  try {
    return cleanDomain(new URL(grant.website).hostname) || undefined
  } catch {
    return undefined
  }
}

export function GrantLogo({ grant, className = '' }: { grant: Grant; className?: string }) {
  return (
    <BrandLogoPlate
      name={grant.organization || grant.name}
      domain={getGrantDomain(grant)}
      logo={grant.logo}
      size="sm"
      plateClassName={className}
    />
  )
}

export function GrantCard({ grant, isPro }: { grant: Grant; isPro: boolean }) {
  return (
    <Link
      href={isPro ? `/deals/${grant.slug}` : '/pricing'}
      className={`flex flex-col bg-white dark:bg-[#0c0c0c] border border-black/10 dark:border-white/10 rounded-2xl shadow-sm h-full overflow-visible ${cardHoverClass}`}
    >
      <CardHoverGlowShell className="rounded-2xl" />
      <div className="relative px-3.5 md:px-4 pt-2.5 h-[26px] flex items-center">
        <span className={`inline-block px-1.5 py-0.5 ${getStatusColor(grant.applicationStatus)} text-[8px] font-bold uppercase tracking-wider leading-none`}>
          {grant.applicationStatus}
        </span>
      </div>
      <div className="relative px-3.5 md:px-4 pt-2 pb-2">
        <CardBrandHeader
          name={grant.organization || grant.name}
          domain={getGrantDomain(grant)}
          logo={grant.logo}
          plateClassName={cardLogoHoverClass}
          textClassName={cardTitleHoverClass}
        />
      </div>
      <div className="px-3.5 md:px-4 pb-2 flex-grow">
        <p className="text-[10px] md:text-xs text-gray-500 leading-snug line-clamp-3">
          {grant.organization && grant.organization !== grant.name ? `${grant.name} — ` : ''}
          {grant.description}
        </p>
      </div>
      <div className="px-3.5 md:px-4 pb-3 mt-auto border-t border-gray-100 dark:border-white/10 pt-2">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-xs md:text-sm font-bold text-amber-700 dark:text-accent-yellow font-mono line-clamp-1">{grant.fundingAmount}</p>
            <p className="text-[9px] text-gray-400">{grant.equity}</p>
          </div>
          <span
            className="shrink-0 inline-flex items-center gap-0.5 bg-black dark:bg-white text-white dark:text-black text-[9px] font-bold uppercase tracking-wide px-2.5 py-1.5 rounded-md shadow-sm group-hover:bg-accent-yellow group-hover:text-black transition-all duration-200"
            aria-hidden="true"
          >
            View
            <span className="material-symbols-outlined !text-[12px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}
