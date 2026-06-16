'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { Deal } from '@/lib/deals-database'
import { useFeaturedDeals, useRotatingWindow } from './useFeatured'

type Variant = 'banner' | 'rail' | 'inline'

interface FeaturedSlotProps {
    variant: Variant
    /** How many deals to show at once (rail can stack 2–3). */
    count?: number
    /** Rotation cadence in ms. */
    intervalMs?: number
    /** Stagger so different slots don't show the same deal simultaneously. */
    offset?: number
    /** Show the "Featured / Ad" header label (set false for stacked extras). */
    showHeader?: boolean
    /** Slimmer rail promo — for stacking multiple spots in a column. */
    compact?: boolean
    /** Reduced-size full rail promo (keeps the rich layout, smaller). */
    dense?: boolean
    className?: string
}

/* ─── Logo tile (shared) ─── */
function LogoTile({ deal, size = 'w-10 h-10' }: { deal: Deal; size?: string }) {
    return (
        <div className={`${size} flex-shrink-0 border-2 border-black bg-gray-50 flex items-center justify-center overflow-hidden rounded-sm`}>
            {deal.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={deal.logoUrl}
                    alt={deal.provider || deal.title}
                    className="w-full h-full object-contain"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                />
            ) : (
                <span className="material-symbols-outlined text-[18px] text-gray-400">storefront</span>
            )}
        </div>
    )
}

/* ─── Single featured deal, per variant ─── */
function DealView({ deal, variant }: { deal: Deal; variant: Variant }) {
    if (variant === 'banner') {
        return (
            <Link
                href={`/deals/${deal.slug}`}
                className="group relative flex items-center gap-4 bg-gradient-to-r from-gray-900 via-gray-900 to-black text-white border-2 border-black rounded-xl px-4 py-3 shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111] hover:-translate-y-px transition-all overflow-hidden"
            >
                <span className="absolute -top-1.5 -left-1.5 bg-amber-400 text-black border border-black px-1.5 py-0.5 font-mono text-[8px] font-black uppercase tracking-wider rotate-[-3deg]">
                    ⭐ Featured
                </span>
                <LogoTile deal={deal} size="w-12 h-12" />
                <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm md:text-base font-black leading-tight truncate">{deal.title}</p>
                    <p className="text-[11px] text-gray-300 truncate">By {deal.provider}</p>
                </div>
                {deal.value && (
                    <span className="hidden sm:inline-block bg-accent-yellow text-black font-mono text-xs font-black uppercase px-2.5 py-1 border border-black whitespace-nowrap">
                        {deal.value}
                    </span>
                )}
                <span className="inline-flex items-center gap-1 bg-white text-black font-mono text-[10px] md:text-[11px] font-black uppercase tracking-wide px-3 py-1.5 border-2 border-black group-hover:bg-accent-yellow transition-colors whitespace-nowrap">
                    View
                    <span className="material-symbols-outlined !text-[13px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </span>
            </Link>
        )
    }

    if (variant === 'inline') {
        return (
            <Link
                href={`/deals/${deal.slug}`}
                className="group relative flex h-full flex-col bg-amber-50 border-2 border-amber-500 rounded-sm shadow-[3px_3px_0px_#b45309] hover:shadow-[5px_5px_0px_#b45309] hover:-translate-x-px hover:-translate-y-px transition-all overflow-hidden"
            >
                <div className="px-3 pt-2.5">
                    <span className="inline-block px-1.5 py-0.5 bg-amber-400 text-black text-[8px] font-black uppercase tracking-wider rounded-sm">
                        ⭐ Featured
                    </span>
                </div>
                <div className="flex items-center gap-2.5 px-3 pt-2 pb-2">
                    <LogoTile deal={deal} />
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight line-clamp-2 min-w-0">
                        {deal.title}
                    </h3>
                </div>
                <div className="px-3 pb-2 flex-grow">
                    <p className="text-[11px] text-gray-600 leading-snug line-clamp-2">{deal.shortDescription}</p>
                </div>
                <div className="px-3 pb-3 mt-auto border-t border-amber-200 pt-2 flex items-center justify-between gap-1.5">
                    <p className="text-xs sm:text-sm font-bold text-amber-700 font-mono line-clamp-1 flex-1 min-w-0">
                        {deal.value}
                    </p>
                    <span className="relative inline-flex items-center gap-0.5 bg-black text-white text-[9px] font-bold uppercase px-2.5 py-1.5 rounded-sm group-hover:bg-accent-yellow group-hover:text-black transition-all">
                        View
                        <span className="material-symbols-outlined text-[10px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                    </span>
                </div>
            </Link>
        )
    }

    // rail
    return (
        <Link
            href={`/deals/${deal.slug}`}
            className="group relative block bg-white border-2 border-black rounded-lg p-3 shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all overflow-hidden"
        >
            <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-black border border-black px-1.5 py-0.5 font-mono text-[8px] font-black uppercase tracking-wider shadow-[1px_1px_0px_#111] rotate-3">
                ⭐ Featured
            </span>
            <div className="flex items-center gap-2.5">
                <LogoTile deal={deal} size="w-9 h-9" />
                <div className="min-w-0 flex-1">
                    <p className="font-mono text-[12px] font-black text-gray-900 leading-tight truncate">{deal.title}</p>
                    <p className="text-[10px] text-gray-500 truncate">By {deal.provider}</p>
                </div>
            </div>
            {deal.value && (
                <div className="mt-2 inline-block bg-black text-accent-yellow font-mono text-[10px] font-black uppercase px-2 py-0.5 tracking-wide">
                    {deal.value}
                </div>
            )}
        </Link>
    )
}

/* ─── Empty-inventory promo, per variant ─── */
function Promo({ variant, compact = false, dense = false }: { variant: Variant; compact?: boolean; dense?: boolean }) {
    if (variant === 'rail' && compact) {
        return (
            <Link
                href="/submit-deal"
                className="group relative block bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white border-2 border-dashed border-amber-400 rounded-lg p-3 shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all overflow-hidden"
            >
                <span className="absolute -top-1.5 -right-1.5 bg-accent-yellow text-black border border-black px-1.5 py-0.5 font-mono text-[8px] font-black uppercase tracking-wider rotate-3">
                    Open
                </span>
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 flex-shrink-0 border-2 border-dashed border-amber-400/70 bg-white/5 flex items-center justify-center rounded-sm">
                        <span className="material-symbols-outlined text-[18px] text-accent-yellow group-hover:scale-110 transition-transform">add</span>
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="font-mono text-[12px] font-black leading-tight">Your deal here</p>
                        <p className="text-[10px] text-gray-400 truncate">Feature your offer</p>
                    </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wide">
                        From <span className="text-accent-yellow font-black">$25</span>
                    </span>
                    <span className="inline-flex items-center gap-0.5 bg-accent-yellow text-black font-mono text-[9px] font-black uppercase tracking-wide px-2 py-0.5 border border-black">
                        Get Featured
                        <span className="material-symbols-outlined !text-[11px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                    </span>
                </div>
            </Link>
        )
    }

    if (variant === 'banner') {
        return (
            <Link
                href="/submit-deal"
                className="group relative flex items-center gap-4 bg-gradient-to-r from-gray-900 via-gray-900 to-black text-white border-2 border-black rounded-xl px-4 py-3 shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111] hover:-translate-y-px transition-all overflow-hidden"
            >
                <span className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[8px] font-black uppercase tracking-[0.12em] px-2 py-0.5 border border-black whitespace-nowrap">
                    <span className="w-1 h-1 rounded-full bg-black animate-pulse" />
                    Open Slot
                </span>
                <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm md:text-base font-black leading-tight">Feature your deal right here</p>
                    <p className="text-[11px] text-gray-300 truncate">Pin your offer to the top of the catalog — seen first by thousands of founders.</p>
                </div>
                <span className="inline-flex items-center gap-1 bg-accent-yellow text-black font-mono text-[10px] md:text-[11px] font-black uppercase tracking-wide px-3 py-1.5 border-2 border-black whitespace-nowrap">
                    From $25 · Get Featured
                    <span className="material-symbols-outlined !text-[13px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </span>
            </Link>
        )
    }

    if (variant === 'inline') {
        return (
            <Link
                href="/submit-deal"
                className="group relative flex h-full flex-col items-center justify-center text-center bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white border-2 border-dashed border-amber-400 rounded-sm shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all p-4 overflow-hidden"
            >
                <span className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[8px] font-black uppercase tracking-[0.12em] px-2 py-0.5 border border-black mb-2">
                    Open Slot
                </span>
                <p className="font-mono text-sm font-black uppercase leading-tight mb-1">Your deal here</p>
                <p className="text-[10.5px] text-gray-300 leading-snug mb-3">Get pinned with a ⭐ Featured badge.</p>
                <span className="inline-flex items-center gap-1 bg-accent-yellow text-black font-mono text-[10px] font-black uppercase tracking-wide px-2.5 py-1 border border-black">
                    From $25
                    <span className="material-symbols-outlined !text-[12px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </span>
            </Link>
        )
    }

    // rail (full promo) — `dense` renders a reduced-size version for the right rail
    return (
        <Link
            href="/submit-deal"
            className={`group relative block bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white border-2 border-black rounded-xl shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all overflow-hidden ${dense ? 'p-3' : 'p-4'}`}
        >
            <div className={`absolute -top-8 -right-8 pointer-events-none opacity-[0.16] ${dense ? 'w-20 h-20' : 'w-28 h-28'}`} aria-hidden="true">
                <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow featured-slot-spin" fill="none" stroke="currentColor" strokeWidth="0.8">
                    <circle cx="100" cy="100" r="45" />
                    <circle cx="100" cy="100" r="70" strokeDasharray="2 5" />
                    {[0, 72, 144, 216, 288].map((deg) => (
                        <g key={deg} transform={`rotate(${deg} 100 100)`}>
                            <line x1="100" y1="45" x2="100" y2="25" />
                            <circle cx="100" cy="25" r="2.5" fill="currentColor" />
                        </g>
                    ))}
                    <circle cx="100" cy="100" r="3" fill="currentColor" />
                </svg>
            </div>
            <div className="relative">
                <span className={`inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono font-black uppercase tracking-[0.12em] border border-black ${dense ? 'text-[7px] px-1.5 py-0.5 mb-1.5' : 'text-[8px] px-2 py-0.5 mb-2.5'}`}>
                    <span className="w-1 h-1 rounded-full bg-black animate-pulse" />
                    Open Slot
                </span>
                <p className={`font-mono font-black uppercase leading-tight mb-1 ${dense ? 'text-sm' : 'text-base'}`}>Your deal here</p>
                <p className={`text-gray-300 leading-relaxed ${dense ? 'text-[10px] mb-2' : 'text-[11px] mb-3'}`}>
                    Pin your offer to the top and get seen first by thousands of verified founders.
                </p>
                <ul className={`${dense ? 'space-y-0.5 mb-2.5' : 'space-y-1 mb-3.5'}`}>
                    {['Pinned above all listings', '⭐ Featured badge', 'Auto-refund if not approved'].map((b) => (
                        <li key={b} className={`flex items-center gap-1.5 text-gray-200 ${dense ? 'text-[9.5px]' : 'text-[10.5px]'}`}>
                            <span className={`material-symbols-outlined text-accent-yellow ${dense ? '!text-[12px]' : '!text-[13px]'}`}>check</span>
                            {b}
                        </li>
                    ))}
                </ul>
                <div className="flex items-center justify-between">
                    <span className={`font-mono text-gray-400 uppercase tracking-wide ${dense ? 'text-[9px]' : 'text-[10px]'}`}>
                        From <span className={`text-accent-yellow font-black ${dense ? 'text-[11px]' : 'text-xs'}`}>$25</span>/wk
                    </span>
                    <span className={`inline-flex items-center gap-1 bg-accent-yellow text-black font-mono font-black uppercase tracking-wide border border-black group-hover:gap-2 transition-all ${dense ? 'text-[9px] px-2 py-0.5' : 'text-[10px] px-2.5 py-1'}`}>
                        Get Featured
                        <span className={`material-symbols-outlined group-hover:translate-x-0.5 transition-transform ${dense ? '!text-[12px]' : '!text-[13px]'}`}>arrow_forward</span>
                    </span>
                </div>
            </div>
            <style jsx>{`
                @keyframes featuredSlotSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                :global(.featured-slot-spin) { animation: featuredSlotSpin 80s linear infinite; transform-origin: center; }
                @media (prefers-reduced-motion: reduce) { :global(.featured-slot-spin) { animation: none; } }
            `}</style>
        </Link>
    )
}

/* ─── Public slot ─── */
export default function FeaturedSlot({
    variant,
    count = 1,
    intervalMs = 6000,
    offset = 0,
    showHeader = true,
    compact = false,
    dense = false,
    className = '',
}: FeaturedSlotProps) {
    const { deals, loading } = useFeaturedDeals()
    const { window: shown, tick } = useRotatingWindow(deals, count, intervalMs, offset)

    if (loading) return null

    const isEmpty = deals.length === 0

    return (
        <div className={className}>
            {showHeader && (variant === 'rail' || variant === 'banner') && (
                <div className="flex items-center justify-between mb-2 px-0.5">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-black uppercase tracking-[0.14em] text-gray-500">
                        <span className="material-symbols-outlined !text-[13px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        Featured
                    </span>
                    <span className="font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-gray-400">Ad</span>
                </div>
            )}

            {isEmpty ? (
                <Promo variant={variant} compact={compact} dense={dense} />
            ) : (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={tick}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className={variant === 'rail' ? 'space-y-2' : variant === 'banner' ? '' : 'h-full'}
                    >
                        {shown.map((deal) => (
                            <DealView key={deal.slug} deal={deal} variant={variant} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            )}

            {variant === 'rail' && !isEmpty && showHeader && (
                <Link
                    href="/submit-deal"
                    className="block text-center font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-gray-500 hover:text-black transition-colors pt-2"
                >
                    + Feature your deal here
                </Link>
            )}
        </div>
    )
}
