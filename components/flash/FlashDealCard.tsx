import { useState } from 'react'
import type { FlashDeal, FlashBadge, FlashDiscountColor } from '@/data/flash-deals'
import FlashCountdown from './FlashCountdown'
import { GlowingEffect } from '@/components/ui/GlowingEffect'
import { useAuth } from '@/lib/auth/hooks'

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
  const [failed, setFailed] = useState(false)
  const { isAuthenticated, loading } = useAuth()

  return (
    <div className="relative h-full rounded-sm">
      <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
      
      <div className="relative flex flex-col bg-white dark:bg-[#0c0c0c] border-2 border-black dark:border-white/10 shadow-[3px_3px_0px_#111] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.05)] hover:shadow-[5px_5px_0px_#111] dark:hover:shadow-[5px_5px_0px_rgba(255,255,255,0.1)] hover:-translate-x-px hover:-translate-y-px transition-all duration-200 overflow-hidden group h-full rounded-sm text-left">
        
        {/* Logo + Title */}
        <div className="flex items-center gap-2.5 px-3 pt-3 pb-2">
          <div className="w-10 h-10 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center p-1 flex-shrink-0 rounded-sm overflow-hidden relative">
            {!failed && deal.logo ? (
              <img
                alt={`${deal.name} logo`}
                className="w-full h-full object-contain"
                src={deal.logo}
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
                onError={() => setFailed(true)}
              />
            ) : (
              <span className="text-[10px] font-black font-mono text-gray-400">
                {deal.name.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>
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
            {loading ? (
              <div className="relative rounded-sm flex-shrink-0">
                <span className="relative inline-flex items-center gap-0.5 bg-black/10 dark:bg-white/10 text-gray-400 text-[9px] font-bold uppercase px-2.5 py-1.5 rounded-sm">
                  Loading...
                </span>
              </div>
            ) : (
              <a
                href={isAuthenticated ? deal.dealUrl : '/signup?next=/flash-deals'}
                target={isAuthenticated ? "_blank" : undefined}
                rel={isAuthenticated ? "noopener noreferrer" : undefined}
                className="relative rounded-sm flex-shrink-0"
              >
                <GlowingEffect spread={30} glow={false} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={1} />
                <span className="relative inline-flex items-center gap-0.5 bg-black dark:bg-white text-white dark:text-black text-[9px] font-bold uppercase px-2.5 py-1.5 rounded-sm group-hover:bg-accent-yellow dark:group-hover:bg-accent-yellow group-hover:text-black dark:group-hover:text-black transition-all duration-200 shadow-[2px_2px_0px_#333] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.15)] group-hover:shadow-[3px_3px_0px_#111] dark:group-hover:shadow-[3px_3px_0px_#111]">
                  {isAuthenticated ? 'Claim' : 'Sign Up to Claim'}
                  <span className="material-symbols-outlined text-[10px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
