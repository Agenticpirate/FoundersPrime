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

  return (
    <section className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
      {/* Heading + view all */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <h2 className="font-mono font-black text-[13px] md:text-sm uppercase tracking-[0.16em] text-gray-300">
          Browse Flash Deals by Category
        </h2>
        <Link
          href="/deals"
          className="flex-shrink-0 inline-flex items-center gap-1 font-mono font-bold text-[11px] uppercase tracking-[0.1em] text-gray-400 hover:text-accent-yellow transition-colors"
        >
          View all deals
          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
        </Link>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-7">
        {FLASH_CATEGORIES.map((cat) => {
          const isActive = active === cat.key
          return (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`font-mono font-bold text-[11px] uppercase tracking-[0.08em] px-4 py-1.5 rounded-full border transition-colors ${
                isActive
                  ? 'bg-accent-yellow/10 border-accent-yellow text-accent-yellow'
                  : 'bg-white/[0.03] border-white/15 text-gray-400 hover:text-white hover:border-white/40'
              }`}
              aria-pressed={isActive}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visible.map((deal) => (
            <FlashDealCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-white/15 py-16 text-center">
          <span className="material-symbols-outlined text-4xl text-gray-600">bolt</span>
          <p className="font-mono font-bold text-sm text-gray-400 mt-3 uppercase tracking-wide">
            No flash deals in this category right now
          </p>
          <p className="font-sans text-[13px] text-gray-500 mt-1">
            New drops land every Monday &amp; Thursday — check back soon.
          </p>
        </div>
      )}
    </section>
  )
}
