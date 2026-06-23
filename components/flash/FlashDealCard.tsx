'use client'

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
  const [showOptionsModal, setShowOptionsModal] = useState(false)
  const { isAuthenticated, loading } = useAuth()

  return (
    <div className="relative h-full rounded-sm">
      <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
      
      <div className="relative flex flex-col bg-white dark:bg-[#0c0c0c] border-2 border-black dark:border-white/10 shadow-[3px_3px_0px_#111] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.05)] hover:shadow-[5px_5px_0px_#111] dark:hover:shadow-[5px_5px_0px_rgba(255,255,255,0.15)] hover:-translate-x-px hover:-translate-y-px transition-all duration-200 overflow-hidden group h-full rounded-sm text-left">
        
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
            ) : !isAuthenticated ? (
              <a
                href="/signup?next=/flash-deals"
                className="relative rounded-sm flex-shrink-0"
              >
                <GlowingEffect spread={30} glow={false} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={1} />
                <span className="relative inline-flex items-center gap-0.5 bg-black dark:bg-white text-white dark:text-black text-[9px] font-bold uppercase px-2.5 py-1.5 rounded-sm group-hover:bg-accent-yellow dark:group-hover:bg-accent-yellow group-hover:text-black dark:group-hover:text-black transition-all duration-200 shadow-[2px_2px_0px_#333] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.15)] group-hover:shadow-[3px_3px_0px_#111] dark:group-hover:shadow-[3px_3px_0px_#111]">
                  Sign Up to Claim
                  <span className="material-symbols-outlined text-[10px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </span>
              </a>
            ) : deal.options && deal.options.length > 0 ? (
              <button
                onClick={() => setShowOptionsModal(true)}
                className="relative rounded-sm flex-shrink-0 text-left"
              >
                <GlowingEffect spread={30} glow={false} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={1} />
                <span className="relative inline-flex items-center gap-0.5 bg-black dark:bg-white text-white dark:text-black text-[9px] font-bold uppercase px-2.5 py-1.5 rounded-sm group-hover:bg-accent-yellow dark:group-hover:bg-accent-yellow group-hover:text-black dark:group-hover:text-black transition-all duration-200 shadow-[2px_2px_0px_#333] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.15)] group-hover:shadow-[3px_3px_0px_#111] dark:group-hover:shadow-[3px_3px_0px_#111]">
                  Claim
                  <span className="material-symbols-outlined text-[10px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </span>
              </button>
            ) : (
              <a
                href={deal.dealUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-sm flex-shrink-0"
              >
                <GlowingEffect spread={30} glow={false} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={1} />
                <span className="relative inline-flex items-center gap-0.5 bg-black dark:bg-white text-white dark:text-black text-[9px] font-bold uppercase px-2.5 py-1.5 rounded-sm group-hover:bg-accent-yellow dark:group-hover:bg-accent-yellow group-hover:text-black dark:group-hover:text-black transition-all duration-200 shadow-[2px_2px_0px_#333] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.15)] group-hover:shadow-[3px_3px_0px_#111] dark:group-hover:shadow-[3px_3px_0px_#111]">
                  Claim
                  <span className="material-symbols-outlined text-[10px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Region Selector Modal */}
      {showOptionsModal && deal.options && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0a0a0a] border-2 border-white/10 p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-sm text-left">
            <button
              onClick={() => setShowOptionsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
            
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-accent-yellow inline-block"></span>
              Select Your Region
            </h3>
            <p className="text-[11px] text-gray-500 mb-6 font-sans">
              Choose your region below to claim your specific promo code for {deal.name}.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto pr-1">
              {deal.options.map((opt) => (
                <a
                  key={opt.label}
                  href={opt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowOptionsModal(false)}
                  className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 hover:border-accent-yellow hover:bg-white/[0.05] transition-all rounded-sm text-xs font-mono font-bold text-gray-300 hover:text-white group/item"
                >
                  <span>{opt.label}</span>
                  <span className="material-symbols-outlined text-xs text-gray-500 group-hover/item:text-accent-yellow group-hover/item:translate-x-0.5 transition-all">
                    arrow_forward
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
