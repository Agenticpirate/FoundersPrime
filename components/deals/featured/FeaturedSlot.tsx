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
    /** Show the "Pinned / Ad" header label (set false for stacked extras). */
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
        <div className={`${size} flex-shrink-0 border-2 border-black dark:border-white/10 bg-gray-50 dark:bg-white/5 flex items-center justify-center overflow-hidden rounded-sm`}>
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
                    📌 Pinned to top
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
                className="group relative flex h-full flex-col bg-amber-50 dark:bg-[#1a1510] border-2 border-amber-500 dark:border-amber-500/50 rounded-xl shadow-[3px_3px_0px_#b45309] dark:shadow-[3px_3px_0px_rgba(245,158,11,0.2)] hover:shadow-[5px_5px_0px_#b45309] dark:hover:shadow-[5px_5px_0px_rgba(245,158,11,0.3)] hover:-translate-x-px hover:-translate-y-px transition-all overflow-hidden"
            >
                <div className="px-3 pt-2.5">
                    <span className="inline-block px-1.5 py-0.5 bg-amber-400 text-black text-[8px] font-black uppercase tracking-wider rounded-sm">
                        📌 Pinned to top
                    </span>
                </div>
                <div className="flex items-center gap-2.5 px-3 pt-2 pb-2">
                    <LogoTile deal={deal} />
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 min-w-0">
                        {deal.title}
                    </h3>
                </div>
                <div className="px-3 pb-2 flex-grow">
                    <p className="text-[11px] text-gray-600 dark:text-gray-450 leading-snug line-clamp-2">{deal.shortDescription}</p>
                </div>
                <div className="px-3 pb-3 mt-auto border-t border-amber-200 dark:border-amber-900/50 pt-2 flex items-center justify-between gap-1.5">
                    <p className="text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-400 font-mono line-clamp-1 flex-1 min-w-0">
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
            className="group relative block bg-white dark:bg-[#0c0c0c] border-2 border-black dark:border-white/10 rounded-lg p-3 shadow-[3px_3px_0px_#111] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.05)] hover:shadow-[5px_5px_0px_#111] dark:hover:shadow-[5px_5px_0px_rgba(255,255,255,0.1)] hover:-translate-x-px hover:-translate-y-px transition-all overflow-hidden"
        >
            <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-black border border-black px-1.5 py-0.5 font-mono text-[8px] font-black uppercase tracking-wider shadow-[1px_1px_0px_#111] rotate-3">
                📌 Pinned
            </span>
            <div className="flex items-center gap-2.5">
                <LogoTile deal={deal} size="w-9 h-9" />
                <div className="min-w-0 flex-1">
                    <p className="font-mono text-[12px] font-black text-gray-900 dark:text-white leading-tight truncate">{deal.title}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">By {deal.provider}</p>
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
                        <p className="text-[10px] text-gray-400 truncate">Pin it to the top</p>
                    </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wide">
                        From <span className="text-accent-yellow font-black">$25</span>
                    </span>
                    <span className="inline-flex items-center gap-0.5 bg-accent-yellow text-black font-mono text-[9px] font-black uppercase tracking-wide px-2 py-0.5 border border-black">
                        Get Pinned
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
                {/* Decorative megaphone watermark */}
                <span
                    aria-hidden="true"
                    className="material-symbols-outlined pointer-events-none select-none absolute top-1/2 right-[32%] -translate-y-1/2 -rotate-12 hidden lg:block z-0 text-accent-yellow opacity-[0.16] !text-[72px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                >
                    campaign
                </span>
                <span className="relative z-10 inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[8px] font-black uppercase tracking-[0.12em] px-2 py-0.5 border border-black whitespace-nowrap">
                    <span className="w-1 h-1 rounded-full bg-black animate-pulse" />
                    Open Slot
                </span>
                <div className="relative z-10 min-w-0 flex-1">
                    <p className="font-mono text-sm md:text-base font-black leading-tight">Pin your deal to the top</p>
                    <p className="text-[11px] text-gray-300 truncate">Jump above every listing — seen first by thousands of founders.</p>
                </div>
                <span className="relative z-10 inline-flex items-center gap-1 bg-accent-yellow text-black font-mono text-[10px] md:text-[11px] font-black uppercase tracking-wide px-3 py-1.5 border-2 border-black whitespace-nowrap">
                    From $25 · Get Pinned
                    <span className="material-symbols-outlined !text-[13px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </span>
            </Link>
        )
    }

    if (variant === 'inline') {
        return (
            <Link
                href="/submit-deal"
                className="group relative flex h-full flex-col items-center justify-center text-center bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white border-2 border-dashed border-amber-400 rounded-xl shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all p-4 overflow-hidden"
            >
                <span className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[8px] font-black uppercase tracking-[0.12em] px-2 py-0.5 border border-black mb-2">
                    Open Slot
                </span>
                <p className="font-mono text-sm font-black uppercase leading-tight mb-1">Your deal here</p>
                <p className="text-[10.5px] text-gray-300 leading-snug mb-3">Get pinned to the top with a 📌 badge.</p>
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
                    {['Pinned above all listings', '📌 Pinned-to-top badge', 'Auto-refund if not approved'].map((b) => (
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
                        Get Pinned
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

function FeaturedSlotSkeleton({ variant, dense }: { variant: Variant; dense?: boolean }) {
    if (variant === 'banner') {
        return (
            <div className="w-full h-[76px] rounded-xl bg-gray-200 dark:bg-neutral-900 animate-pulse border border-gray-300 dark:border-neutral-800" />
        )
    }
    if (variant === 'inline') {
        return (
            <div className="w-full h-full min-h-[220px] rounded-xl bg-gray-200 dark:bg-neutral-900 animate-pulse border border-gray-300 dark:border-neutral-800" />
        )
    }
    // rail
    return (
        <div className={`w-full ${dense ? 'h-[140px]' : 'h-[160px]'} rounded-lg bg-gray-200 dark:bg-neutral-900 animate-pulse border border-gray-300 dark:border-neutral-800`} />
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

    if (loading) {
        return (
            <div className={className}>
                {showHeader && (variant === 'rail' || variant === 'banner') && (
                    <div className="flex items-center justify-between mb-2 px-0.5">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-black uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                            <span className="material-symbols-outlined !text-[13px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>push_pin</span>
                            Pinned
                        </span>
                        <span className="font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-gray-400 dark:text-gray-500">Ad</span>
                    </div>
                )}
                <FeaturedSlotSkeleton variant={variant} dense={dense} />
            </div>
        )
    }

    const isEmpty = deals.length === 0

    return (
        <div className={`${className} ${variant === 'inline' ? 'h-full' : ''}`.trim()}>
            {/* Desktop View */}
            <div className="hidden lg:block h-full">
                {showHeader && (variant === 'rail' || variant === 'banner') && (
                    <div className="flex items-center justify-between mb-2 px-0.5">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-black uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                            <span className="material-symbols-outlined !text-[13px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>push_pin</span>
                            Pinned
                        </span>
                        <span className="font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-gray-400 dark:text-gray-500">Ad</span>
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
                        className="block text-center font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors pt-2"
                    >
                        + Pin your deal to the top
                    </Link>
                )}
            </div>

            {/* Mobile View */}
            <div className="block lg:hidden h-full">
                {variant === 'banner' ? (
                    <div>
                        {showHeader && (
                            <div className="flex items-center justify-between mb-1.5 px-0.5">
                                <span className="inline-flex items-center gap-1 font-mono text-[9px] font-black uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                                    <span className="material-symbols-outlined !text-[11px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>push_pin</span>
                                    Pinned Ads
                                </span>
                                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-gray-400 dark:text-gray-500">Ad</span>
                            </div>
                        )}
                        {isEmpty ? (
                            <Link
                                href="/submit-deal"
                                className="group relative flex items-center justify-between bg-gradient-to-r from-gray-900 via-gray-900 to-black text-white border border-dashed border-amber-500/50 rounded-lg px-3 py-2 text-xs w-full shadow-sm hover:border-amber-450 transition-colors"
                            >
                                <span className="font-mono text-[9px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                                    Pinned Ad: Open Slot
                                </span>
                                <span className="font-mono text-[9px] bg-amber-400 text-black px-1.5 py-0.5 rounded font-black">
                                    FROM $25
                                </span>
                            </Link>
                        ) : (
                            <div className="flex gap-2.5 overflow-x-auto pb-2 pt-0.5 mobile-scroll-hide">
                                {deals.map((deal) => (
                                    <Link
                                        key={deal.slug}
                                        href={`/deals/${deal.slug}`}
                                        className="flex items-center gap-2 bg-[#0a0a0a] dark:bg-[#0c0c0c] border border-gray-800 dark:border-white/10 rounded-lg px-2.5 py-1.5 flex-shrink-0 text-xs w-[170px]"
                                    >
                                        <LogoTile deal={deal} size="w-7 h-7" />
                                        <div className="min-w-0 flex-1">
                                            <p className="font-mono text-[10.5px] font-black leading-tight truncate text-white dark:text-white group-hover:text-accent-yellow">{deal.provider || deal.title}</p>
                                            <p className="text-[9px] text-amber-450 font-bold truncate">{deal.value || 'Special Offer'}</p>
                                        </div>
                                    </Link>
                                ))}
                                <Link
                                    href="/submit-deal"
                                    className="flex items-center justify-center gap-1 border border-dashed border-gray-700 dark:border-white/10 rounded-lg px-3 py-1.5 flex-shrink-0 text-[10px] font-mono text-gray-400 hover:text-white hover:border-white transition-colors"
                                >
                                    + Pin Yours
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {showHeader && (variant === 'rail') && (
                            <div className="flex items-center justify-between mb-2 px-0.5">
                                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-black uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                                    <span className="material-symbols-outlined !text-[13px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>push_pin</span>
                                    Pinned
                                </span>
                                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-gray-400 dark:text-gray-500">Ad</span>
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
                                    className={variant === 'rail' ? 'space-y-2' : 'h-full'}
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
                                className="block text-center font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors pt-2"
                            >
                                + Pin your deal to the top
                            </Link>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
