'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { flashDeals, FLASH_CATEGORIES } from '@/data/flash-deals'
import FlashDealCard from './FlashDealCard'

export default function FlashDealsBrowse() {
  const [active, setActive] = useState('all')

  const visible = useMemo(
    () => (active === 'all' ? flashDeals : flashDeals.filter((d) => d.category === active)),
    [active]
  )

  // Count per category
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: flashDeals.length }
    flashDeals.forEach((d) => {
      map[d.category] = (map[d.category] ?? 0) + 1
    })
    return map
  }, [])

  return (
    <section className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
      {/* Heading row */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          {/* Left accent bar */}
          <span
            className="hidden sm:block w-[3px] h-5 bg-accent-yellow"
            aria-hidden="true"
            style={{ boxShadow: '0 0 8px rgba(255,215,0,0.6)' }}
          />
          <h2 className="font-mono font-black text-[12px] md:text-[13px] uppercase tracking-[0.18em] text-gray-600 dark:text-gray-300">
            Browse Flash Deals by Category
          </h2>
        </div>
        <Link
          href="/deals"
          className="flex-shrink-0 inline-flex items-center gap-1 font-mono font-bold text-[10px] uppercase tracking-[0.12em] text-gray-500 hover:text-accent-yellow transition-colors group"
        >
          View all deals
          <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FLASH_CATEGORIES.map((cat) => {
          const isActive = active === cat.key
          const count = counts[cat.key] ?? 0
          return (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`inline-flex items-center gap-1.5 font-mono font-bold text-[10px] uppercase tracking-[0.08em] px-3.5 py-1.5 border transition-all duration-150 ${
                isActive
                  ? 'bg-accent-yellow text-black border-accent-yellow shadow-[0_0_12px_rgba(255,215,0,0.3)]'
                  : 'bg-gray-50 dark:bg-white/[0.03] border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/30 hover:bg-gray-100 dark:hover:bg-white/[0.06]'
              }`}
              aria-pressed={isActive}
            >
              {cat.label}
              {count > 0 && (
                <span
                  className={`text-[9px] font-black px-1 py-px leading-none ${
                    isActive ? 'bg-black/20 text-black' : 'bg-black/5 dark:bg-white/10 text-gray-500'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {visible.map((deal) => (
            <FlashDealCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-gray-200 dark:border-white/10 py-20 text-center bg-gray-50/50 dark:bg-white/[0.01]">
          <span
            className="material-symbols-outlined text-5xl text-accent-yellow/30"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            bolt
          </span>
          <p className="font-mono font-bold text-sm text-gray-400 mt-3 uppercase tracking-wide">
            No flash deals in this category right now
          </p>
          <p className="font-sans text-[13px] text-gray-600 mt-1.5">
            New drops land every week — check back soon.
          </p>
        </div>
      )}
    </section>
  )
}
