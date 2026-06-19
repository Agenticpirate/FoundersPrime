'use client'

import type { FlashDeal, FlashBadge, FlashDiscountColor } from '@/data/flash-deals'
import FlashLogo from './FlashLogo'
import FlashCountdown from './FlashCountdown'

const BADGE_STYLES: Record<FlashBadge, { label: string; icon: string; className: string }> = {
  hot: {
    label: 'Hot Deal',
    icon: 'local_fire_department',
    className: 'bg-accent-yellow text-black',
  },
  recommended: {
    label: 'Recommended',
    icon: 'verified',
    className: 'bg-accent-blue text-white',
  },
  new: {
    label: 'New',
    icon: 'auto_awesome',
    className: 'bg-accent-blue text-white',
  },
}

const DISCOUNT_STYLES: Record<FlashDiscountColor, string> = {
  violet: 'bg-violet-600 text-white',
  orange: 'bg-orange-500 text-white',
  red: 'bg-red-500 text-white',
}

export default function FlashDealCard({ deal }: { deal: FlashDeal }) {
  const badge = BADGE_STYLES[deal.badge]

  return (
    <div className="group relative flex flex-col bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 hover:border-accent-yellow/40 transition-colors duration-200">
      {/* Badge tab */}
      <span
        className={`absolute -top-px left-3 inline-flex items-center gap-1 ${badge.className} font-mono font-black text-[9px] uppercase tracking-[0.1em] px-2 py-1`}
      >
        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          {badge.icon}
        </span>
        {badge.label}
      </span>

      <div className="p-4 pt-7 flex flex-col flex-1">
        {/* Logo + name + description */}
        <div className="flex items-start gap-3 mb-4">
          <FlashLogo deal={deal} />
          <div className="min-w-0">
            <h3 className="font-mono font-bold text-[15px] text-white leading-tight">{deal.name}</h3>
            <p className="font-sans text-[12px] text-gray-400 leading-snug mt-1 line-clamp-2">
              {deal.description}
            </p>
          </div>
        </div>

        {/* Price row */}
        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mb-3">
          <span className="font-mono font-black text-[17px] text-white">{deal.price}</span>
          <span className="font-sans text-[12px] text-gray-400">{deal.priceUnit}</span>
          <span className="font-sans text-[12px] text-gray-600 line-through ml-0.5">{deal.originalPrice}</span>
          <span
            className={`ml-auto font-mono font-black text-[10px] uppercase tracking-[0.06em] px-2 py-0.5 ${DISCOUNT_STYLES[deal.discountColor]}`}
          >
            {deal.discount}
          </span>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 text-red-400 px-2.5 py-1.5 mb-4">
          <span className="material-symbols-outlined text-[14px]">timer</span>
          <FlashCountdown durationHours={deal.durationHours} endsAt={deal.endsAt} variant="inline" />
        </div>

        {/* CTA */}
        <a
          href={deal.dealUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-full inline-flex items-center justify-center gap-1.5 bg-white/[0.06] text-white border border-white/15 group-hover:bg-accent-yellow group-hover:text-black group-hover:border-accent-yellow font-mono font-black text-[10px] uppercase tracking-[0.14em] py-2.5 transition-colors"
          aria-label={`View the ${deal.name} flash deal`}
        >
          View Deal
          <span className="material-symbols-outlined text-[14px] transition-transform group-hover:translate-x-0.5">
            arrow_forward
          </span>
        </a>
      </div>
    </div>
  )
}
