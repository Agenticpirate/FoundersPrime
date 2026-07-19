'use client'

import Link from 'next/link'
import type { FlashDeal, FlashBadge, FlashDiscountColor } from '@/data/flash-deals'
import FlashCountdown from './FlashCountdown'
import FlashLogo from './FlashLogo'
import { GlowingEffect } from '@/components/ui/GlowingEffect'
import { useAuth } from '@/lib/auth/hooks'
import { CardHoverGlowShell, cardHoverClass, cardTitleHoverClass } from '@/components/ui/card-hover'

const BADGE_STYLES: Record<FlashBadge, { label: string; short: string; className: string }> = {
  hot: {
    label: '🔥 Hot',
    short: '🔥',
    className: 'bg-red-500 text-white border-red-400/40 shadow-[0_0_12px_rgba(239,68,68,0.35)]',
  },
  recommended: {
    label: '⭐ Top pick',
    short: '⭐',
    className: 'bg-amber-400 text-black border-amber-300/50',
  },
  new: {
    label: '✦ New',
    short: '✦',
    className: 'bg-purple-600 text-white border-purple-400/40',
  },
}

const DISCOUNT_STYLES: Record<FlashDiscountColor, string> = {
  violet: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
  orange: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
  red: 'bg-red-500/15 text-red-300 border-red-500/30',
  emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
}

export default function FlashDealCard({
  deal,
  featured = false,
}: {
  deal: FlashDeal
  featured?: boolean
}) {
  const badge = BADGE_STYLES[deal.badge]
  const discountClass = DISCOUNT_STYLES[deal.discountColor] || DISCOUNT_STYLES.orange
  const { isAuthenticated, loading } = useAuth()

  const detailPath = `/flash-deals/${deal.id}`
  // Flash claims require a free account — unauthenticated users go to signup first
  const cardHref =
    loading || isAuthenticated
      ? detailPath
      : `/login?view=signup&redirect=${encodeURIComponent(detailPath)}`

  return (
    <div className={`relative h-full rounded-xl md:rounded-2xl ${featured ? 'sm:col-span-1' : ''}`}>
      <GlowingEffect
        spread={40}
        glow={false}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
      />

      <Link
        href={cardHref}
        className={`flex flex-col bg-white dark:bg-[#0c0c0c] border border-black/10 dark:border-white/10 shadow-sm h-full rounded-xl md:rounded-2xl text-left ${cardHoverClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-yellow/50`}
      >
        <CardHoverGlowShell className="rounded-xl md:rounded-2xl" />

        {/* Top strip: badge + discount — denser on mobile */}
        <div className="relative flex items-center justify-between gap-1 px-2 pt-2 sm:px-3 sm:pt-3">
          <span
            className={`inline-flex items-center font-mono text-[8px] sm:text-[9px] font-black uppercase tracking-wide px-1.5 sm:px-2 py-0.5 rounded-full border ${badge.className}`}
          >
            <span className="sm:hidden">{badge.short}</span>
            <span className="hidden sm:inline">{badge.label}</span>
          </span>
          <span
            className={`inline-flex items-center font-mono text-[8px] sm:text-[9px] font-black uppercase tracking-wide px-1.5 sm:px-2 py-0.5 rounded-md border ${discountClass}`}
          >
            {deal.discount}
          </span>
        </div>

        {/* Logo + Title */}
        <div className="relative flex items-center gap-2 px-2 pt-2 pb-1.5 sm:gap-2.5 sm:px-3 sm:pt-3 sm:pb-2">
          <FlashLogo deal={deal} />
          <div className="min-w-0 flex-1">
            <h3
              className={`text-[11px] sm:text-sm font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 ${cardTitleHoverClass}`}
            >
              {deal.name}
            </h3>
            {deal.priceUnit && (
              <p className="mt-0.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-gray-400 dark:text-zinc-500 truncate">
                {deal.priceUnit}
              </p>
            )}
          </div>
        </div>

        {/* Description — 1 line mobile, 2 lines sm+ */}
        <div className="px-2 pb-1 sm:px-3 sm:pb-3 flex-grow min-h-0">
          <p className="text-[9.5px] sm:text-[11px] text-gray-500 dark:text-gray-400 leading-snug line-clamp-1 sm:line-clamp-2">
            {deal.description}
          </p>
        </div>

        {/* Countdown — compact */}
        <div className="px-2 pb-1.5 sm:px-3 sm:pb-2.5">
          <div className="flex items-center gap-1 rounded-md sm:rounded-lg border border-black/[0.06] dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.03] px-1.5 sm:px-2.5 py-1 sm:py-1.5">
            <span className="material-symbols-outlined !text-[11px] sm:!text-[13px] text-red-500 animate-pulse">
              timer
            </span>
            <span className="text-gray-600 dark:text-zinc-400 font-mono text-[8px] sm:text-[10px] truncate">
              <FlashCountdown
                endsAt={deal.endsAt}
                durationHours={deal.durationHours}
                variant="inline"
              />
            </span>
          </div>
        </div>

        {/* Value + CTA */}
        <div className="px-2 pb-2 sm:px-3 sm:pb-3 mt-auto border-t border-gray-100 dark:border-white/10 pt-1.5 sm:pt-2.5">
          <div className="flex items-center justify-between gap-1.5">
            <div className="min-w-0">
              <div className="flex items-baseline gap-1 flex-wrap">
                <span className="text-[12px] sm:text-sm font-black text-amber-700 dark:text-accent-yellow font-mono leading-none">
                  {deal.price}
                </span>
                {deal.originalPrice && (
                  <span className="font-mono text-[8px] sm:text-[10px] text-gray-400 line-through">
                    {deal.originalPrice}
                  </span>
                )}
              </div>
            </div>
            <span className="relative shrink-0 inline-flex items-center gap-0.5 bg-[#000000] text-white border border-[#FFD500]/40 text-[8px] sm:text-[9px] font-bold uppercase px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg group-hover:bg-[#FFD500] group-hover:text-black group-hover:border-[#FFD500] transition-all duration-200">
              {loading ? (
                <span>…</span>
              ) : isAuthenticated ? (
                <>
                  Claim
                  <span className="material-symbols-outlined !text-[10px] sm:!text-[11px] group-hover:translate-x-0.5 transition-transform">
                    arrow_forward
                  </span>
                </>
              ) : (
                <>
                  Sign up
                  <span className="material-symbols-outlined !text-[10px] sm:!text-[11px]">lock</span>
                </>
              )}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
