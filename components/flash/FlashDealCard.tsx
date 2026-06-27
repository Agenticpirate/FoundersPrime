'use client'

import Link from 'next/link'
import type { FlashDeal, FlashBadge, FlashDiscountColor } from '@/data/flash-deals'
import FlashCountdown from './FlashCountdown'
import FlashLogo from './FlashLogo'
import { GlowingEffect } from '@/components/ui/GlowingEffect'


const BADGE_STYLES: Record<FlashBadge, { label: string; className: string }> = {
  hot: {
    label: '🔥 Hot Deal',
    className: 'bg-red-500 text-white',
  },
  recommended: {
    label: '⭐ Recommended',
    className: 'bg-amber-400 text-black',
  },
  new: {
    label: '✦ New Drop',
    className: 'bg-purple-600 text-white',
  },
}

export default function FlashDealCard({ deal }: { deal: FlashDeal }) {
  const badge = BADGE_STYLES[deal.badge]


  return (
    <div className="relative h-full rounded-sm">
      <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
      
      <div className="relative flex flex-col bg-white dark:bg-[#0c0c0c] border-2 border-black dark:border-white/10 shadow-[3px_3px_0px_#111] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.05)] hover:shadow-[5px_5px_0px_#111] dark:hover:shadow-[5px_5px_0px_rgba(255,255,255,0.15)] hover:-translate-x-px hover:-translate-y-px transition-all duration-200 overflow-hidden group h-full rounded-sm text-left">
        
        {/* Logo + Title */}
        <div className="flex items-center gap-2.5 px-3 pt-3 pb-2">
          <FlashLogo deal={deal} />
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight group-hover:text-black dark:group-hover:text-accent-yellow transition-colors line-clamp-2 min-w-0">
            {deal.name}
          </h3>
        </div>

        {/* Description */}
        <div className="px-3 pb-2 flex-grow">
          <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug line-clamp-2">{deal.description}</p>
        </div>

        {/* Value + CTA */}
        <div className="px-3 pb-3 mt-auto border-t border-gray-100 dark:border-white/10 pt-2">
          <div className="flex items-center justify-between gap-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-green-600 dark:text-emerald-400 font-mono">
                {deal.price}
              </span>
              <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider">{deal.discount}</span>
            </div>
            <Link
              href={`/flash-deals/${deal.id}`}
              className="relative rounded-sm flex-shrink-0"
            >
              <GlowingEffect spread={30} glow={false} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={1} />
              <span className="relative inline-flex items-center gap-0.5 bg-black dark:bg-white text-white dark:text-black text-[9px] font-bold uppercase px-2.5 py-1.5 rounded-sm group-hover:bg-accent-yellow dark:group-hover:bg-accent-yellow group-hover:text-black dark:group-hover:text-black transition-all duration-200 shadow-[2px_2px_0px_#333] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.15)] group-hover:shadow-[3px_3px_0px_#111] dark:group-hover:shadow-[3px_3px_0px_#111]">
                Claim Now
                <span className="material-symbols-outlined text-[10px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
