'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'
import { flashDeals, FLASH_CATEGORIES } from '@/data/flash-deals'
import FlashDealCard from './FlashDealCard'
import { StaggerGrid, StaggerGridItem } from '@/components/ui/premium-motion'

const CATEGORY_ICONS: Record<string, string> = {
  all: 'apps',
  'ai-credits': 'smart_toy',
  productivity: 'design_services',
}

export default function FlashDealsBrowse() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState('all')
  const [query, setQuery] = useState('')

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: flashDeals.length }
    flashDeals.forEach((d) => {
      map[d.category] = (map[d.category] ?? 0) + 1
    })
    return map
  }, [])

  const hotDeals = useMemo(
    () => flashDeals.filter((d) => d.badge === 'hot').slice(0, 4),
    []
  )

  const showHotStrip = active === 'all' && !query.trim() && hotDeals.length > 0
  const hotIds = useMemo(() => new Set(hotDeals.map((d) => d.id)), [hotDeals])

  const visible = useMemo(() => {
    let list = active === 'all' ? flashDeals : flashDeals.filter((d) => d.category === active)
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.discount.toLowerCase().includes(q) ||
          d.price.toLowerCase().includes(q)
      )
    }
    // When the hot strip is showing, don't duplicate those cards in the grid
    if (showHotStrip) {
      list = list.filter((d) => !hotIds.has(d.id))
    }
    // Hot first, then recommended, then new, then rest
    const rank = (b: string) => (b === 'hot' ? 0 : b === 'recommended' ? 1 : b === 'new' ? 2 : 3)
    return [...list].sort((a, b) => rank(a.badge) - rank(b.badge))
  }, [active, query, showHotStrip, hotIds])

  return (
    <section
      id="flash-deals-grid"
      className="relative max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-14 scroll-mt-16"
    >
      {/* Hot strip */}
      {showHotStrip && (
        <div className="mb-6 sm:mb-10">
          <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg sm:rounded-xl bg-red-500/15 border border-red-500/25 text-red-500">
                <span className="material-symbols-outlined !text-[16px] sm:!text-[18px]">
                  local_fire_department
                </span>
              </span>
              <div>
                <h2 className="font-mono font-black text-[11px] sm:text-[13px] uppercase tracking-[0.14em] text-gray-900 dark:text-white">
                  Hot right now
                </h2>
                <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-zinc-500 mt-0.5">
                  Claim before they vanish
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {hotDeals.map((deal, i) => (
              <m.div
                key={deal.id}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <FlashDealCard deal={deal} featured />
              </m.div>
            ))}
          </div>
        </div>
      )}

      {/* Heading + search */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2.5 sm:gap-4 mb-3 sm:mb-5">
        <div className="flex items-start gap-2 sm:gap-3 min-w-0">
          <span
            className="hidden sm:block w-[3px] h-10 bg-accent-yellow rounded-full mt-0.5"
            aria-hidden
            style={{ boxShadow: '0 0 10px rgba(255,215,0,0.55)' }}
          />
          <div>
            <h2 className="font-mono font-black text-[11px] sm:text-[14px] uppercase tracking-[0.14em] text-gray-900 dark:text-white">
              Browse flash deals
            </h2>
            <p className="text-[11px] sm:text-[12px] text-gray-500 dark:text-zinc-500 mt-0.5 sm:mt-1">
              Filter or search — timers live
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-1.5 sm:gap-2 w-full lg:w-auto">
          <label className="relative flex-1 lg:w-64 min-w-0">
            <span className="material-symbols-outlined absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 !text-[16px] sm:!text-[18px] text-gray-400">
              search
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-full min-h-[40px] sm:min-h-[44px] pl-9 sm:pl-10 pr-8 sm:pr-9 rounded-xl border border-black/10 dark:border-white/12 bg-white dark:bg-white/[0.04] text-[12px] sm:text-[13px] text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:border-accent-yellow/50 focus:ring-1 focus:ring-accent-yellow/20 transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined !text-[15px]">close</span>
              </button>
            )}
          </label>
          <Link
            href="/deals"
            className="shrink-0 inline-flex items-center justify-center gap-1 min-h-[40px] sm:min-h-[44px] px-2.5 sm:px-4 rounded-xl border border-black/10 dark:border-white/12 font-mono font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.08em] text-gray-600 dark:text-gray-400 hover:text-accent-yellow hover:border-accent-yellow/40 transition-colors"
          >
            Catalog
            <span className="material-symbols-outlined !text-[13px]">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* Category pills — horizontal scroll on mobile */}
      <div
        className="flex gap-1.5 sm:gap-2 mb-2.5 sm:mb-3 overflow-x-auto scrollbar-none -mx-0.5 px-0.5 pb-0.5"
        role="tablist"
        aria-label="Flash deal categories"
      >
        {FLASH_CATEGORIES.map((cat) => {
          const isActive = active === cat.key
          const count = counts[cat.key] ?? 0
          const icon = CATEGORY_ICONS[cat.key] || 'local_offer'
          return (
            <button
              key={cat.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(cat.key)}
              className={`inline-flex shrink-0 items-center gap-1 sm:gap-1.5 font-mono font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.08em] px-2.5 sm:px-3.5 py-1.5 sm:py-2 min-h-[34px] sm:min-h-[40px] rounded-lg sm:rounded-xl border transition-all duration-150 ${
                isActive
                  ? 'bg-accent-yellow text-black border-accent-yellow shadow-[0_0_16px_rgba(255,215,0,0.28)]'
                  : 'bg-gray-50 dark:bg-white/[0.03] border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/30'
              }`}
            >
              <span className="material-symbols-outlined !text-[13px] sm:!text-[14px]">{icon}</span>
              {cat.label}
              {count > 0 && (
                <span
                  className={`text-[8px] sm:text-[9px] font-black px-1 sm:px-1.5 py-0.5 rounded-md leading-none ${
                    isActive
                      ? 'bg-black/15 text-black'
                      : 'bg-black/5 dark:bg-white/10 text-gray-500'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Result meta */}
      <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-6">
        <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.12em] text-gray-500">
          <span className="text-gray-900 dark:text-white font-black">{visible.length}</span>
          {query ? ' match' : ' deal'}
          {visible.length === 1 ? '' : 's'}
          {active !== 'all' && (
            <>
              {' '}
              in{' '}
              <span className="text-accent-yellow">
                {FLASH_CATEGORIES.find((c) => c.key === active)?.label}
              </span>
            </>
          )}
        </p>
        {(query || active !== 'all') && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setActive('all')
            }}
            className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-gray-500 hover:text-accent-yellow transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {/* Grid — 2 col mobile */}
      <AnimatePresence mode="wait">
        {visible.length > 0 ? (
          <StaggerGrid
            key={`${active}-${query}`}
            animKey={`${active}-${query}`}
            className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4"
          >
            {visible.map((deal) => (
              <StaggerGridItem key={deal.id}>
                <FlashDealCard deal={deal} />
              </StaggerGridItem>
            ))}
          </StaggerGrid>
        ) : (
          <m.div
            key="empty"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-dashed border-gray-200 dark:border-white/10 py-16 md:py-20 text-center bg-gray-50/50 dark:bg-white/[0.015]"
          >
            <span
              className="material-symbols-outlined text-5xl text-accent-yellow/35"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
            <p className="font-mono font-bold text-sm text-gray-500 dark:text-gray-400 mt-3 uppercase tracking-wide">
              {query ? 'No deals match your search' : 'No flash deals in this category'}
            </p>
            <p className="font-sans text-[13px] text-gray-500 mt-1.5 max-w-sm mx-auto">
              {query
                ? 'Try a different keyword or clear the search.'
                : 'New drops land every Monday & Thursday — check back soon.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setActive('all')
              }}
              className="mt-5 inline-flex items-center gap-1.5 min-h-[40px] px-4 rounded-xl bg-accent-yellow text-black font-mono text-[11px] font-black uppercase"
            >
              Show all deals
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  )
}
