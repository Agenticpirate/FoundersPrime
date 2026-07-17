'use client'

import { useState } from 'react'
import Link from 'next/link'

interface CategoryCount {
  name: string
  count: number
}

interface IdeasSidebarProps {
  categories: CategoryCount[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
  totalIdeas: number
}

const STEPS = [
  { title: 'Demand', desc: 'Search & community signal' },
  { title: 'Traction', desc: 'Funding & product momentum' },
  { title: 'Feasibility', desc: 'Path to a lean MVP' },
  { title: 'Monetization', desc: 'Willingness to pay' },
]

export default function IdeasSidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  totalIdeas,
}: IdeasSidebarProps) {
  const [showAll, setShowAll] = useState(false)
  const visibleCategories = showAll ? categories : categories.slice(0, 8)

  return (
    <aside className="space-y-3 sm:space-y-4 lg:sticky lg:top-24">
      {/* Mobile: horizontal market chips (faster filter) */}
      <div className="lg:hidden -mx-1">
        <div className="flex items-center justify-between px-1 mb-2">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500">
            Markets · {totalIdeas} ideas
          </p>
          {selectedCategory && (
            <button
              type="button"
              onClick={() => onSelectCategory('')}
              className="font-mono text-[10px] font-bold text-amber-700 dark:text-accent-yellow"
            >
              Clear
            </button>
          )}
        </div>
        <div className="mobile-chip-scroll px-1" role="listbox" aria-label="Filter by market">
          <button
            type="button"
            onClick={() => onSelectCategory('')}
            className={`shrink-0 min-h-[40px] px-3 rounded-full text-[11px] font-mono font-bold border transition-colors ${
              !selectedCategory
                ? 'bg-accent-yellow text-black border-accent-yellow'
                : 'bg-white dark:bg-white/[0.04] text-gray-600 dark:text-gray-300 border-black/[0.06] dark:border-white/10'
            }`}
          >
            All ({totalIdeas})
          </button>
          {(showAll ? categories : categories.slice(0, 12)).map((category) => {
            const active = selectedCategory === category.name
            return (
              <button
                key={category.name}
                type="button"
                onClick={() => onSelectCategory(category.name)}
                className={`shrink-0 min-h-[40px] px-3 rounded-full text-[11px] font-mono font-semibold border transition-colors ${
                  active
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-black border-gray-900 dark:border-white'
                    : 'bg-white dark:bg-white/[0.04] text-gray-600 dark:text-gray-300 border-black/[0.06] dark:border-white/10'
                }`}
              >
                {category.name}
                <span className="ml-1 opacity-60 tabular-nums">{category.count}</span>
              </button>
            )
          })}
          {categories.length > 12 && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="shrink-0 min-h-[40px] px-3 rounded-full text-[11px] font-mono font-bold border border-dashed border-black/15 dark:border-white/20 text-gray-500"
            >
              {showAll ? 'Less' : `+${categories.length - 12}`}
            </button>
          )}
        </div>
      </div>

      {/* Desktop summary + markets list */}
      <div className="hidden lg:block rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] p-4 md:p-5">
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-amber-700 dark:text-accent-yellow mb-2">
          Hub inventory
        </p>
        <p className="font-mono text-3xl font-black text-gray-900 dark:text-white tabular-nums leading-none tracking-tight">
          {totalIdeas.toLocaleString()}
        </p>
        <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400 leading-snug">
          Validated problems across {categories.length} markets
        </p>
      </div>

      <div className="hidden lg:block rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] p-4 md:p-5">
        <h3 className="font-mono text-[10px] font-black uppercase tracking-[0.14em] mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined !text-[15px] text-accent-yellow">
            category
          </span>
          Markets
        </h3>
        <div className="space-y-0.5" role="listbox" aria-label="Filter by market">
          <button
            type="button"
            onClick={() => onSelectCategory('')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all text-[12px] font-mono ${
              !selectedCategory
                ? 'bg-accent-yellow text-black font-bold'
                : 'hover:bg-black/[0.03] dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span>All ideas</span>
            <span
              className={`font-mono text-[10px] tabular-nums px-1.5 py-0.5 rounded-md ${
                !selectedCategory
                  ? 'bg-black/10 text-black font-bold'
                  : 'bg-black/[0.04] dark:bg-white/10 text-gray-400'
              }`}
            >
              {totalIdeas}
            </span>
          </button>
          {visibleCategories.map((category) => {
            const active = selectedCategory === category.name
            return (
              <button
                key={category.name}
                type="button"
                onClick={() => onSelectCategory(category.name)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all text-[12px] font-mono ${
                  active
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-black font-bold'
                    : 'hover:bg-black/[0.03] dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="truncate pr-2">{category.name}</span>
                <span
                  className={`font-mono text-[10px] tabular-nums flex-shrink-0 px-1.5 py-0.5 rounded-md ${
                    active
                      ? 'bg-accent-yellow text-black font-bold'
                      : 'bg-black/[0.04] dark:bg-white/10 text-gray-400'
                  }`}
                >
                  {category.count}
                </span>
              </button>
            )
          })}
        </div>
        {categories.length > 8 && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="w-full mt-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1"
          >
            {showAll ? 'Show less' : `+${categories.length - 8} more`}
            <span className="material-symbols-outlined !text-[14px]">
              {showAll ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        )}
      </div>

      {/* Validation — compact (desktop only to reduce scroll noise) */}
      <div className="hidden lg:block rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] p-4 md:p-5">
        <h3 className="font-mono text-[10px] font-black uppercase tracking-[0.14em] mb-3.5 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined !text-[15px] text-accent-yellow">
            verified
          </span>
          How we pick
        </h3>
        <ol className="space-y-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent-yellow/15 font-mono text-[9px] font-black text-amber-800 dark:text-accent-yellow">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[11px] font-bold text-gray-900 dark:text-white">
                  {step.title}
                </p>
                <p className="font-sans text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Quiet CTA */}
      <Link
        href="/deals"
        className="group flex items-center gap-3 rounded-2xl border border-black/[0.06] dark:border-accent-yellow/20 bg-gray-50 dark:bg-accent-yellow/[0.06] p-3.5 sm:p-4 min-h-[56px] active:border-accent-yellow/40 md:hover:border-accent-yellow/40 dark:md:hover:bg-accent-yellow/10 transition-colors"
      >
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-yellow text-black">
          <span className="material-symbols-outlined !text-[18px]">local_offer</span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] font-black uppercase tracking-wide text-gray-900 dark:text-white">
            Ship with deals
          </p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
            Cloud, SaaS &amp; ad credits
          </p>
        </div>
        <span className="material-symbols-outlined !text-[16px] text-gray-400 group-hover:text-accent-yellow group-hover:translate-x-0.5 transition-all">
          arrow_forward
        </span>
      </Link>
    </aside>
  )
}
