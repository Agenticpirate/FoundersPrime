'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import { replaceUrlQuiet } from '@/lib/url-sync'
import { m, useReducedMotion } from 'framer-motion'
import DealsFilterBar from './DealsFilterBar'
import DealsGrid from './DealsGrid'
import DealsCategorySidebar from './DealsCategorySidebar'
import { FadeUp } from '@/components/ui/premium-motion'
import { premiumEase } from '@/lib/premium-motion-variants'

interface FilterState {
  search: string
  category: string
  subcategory: string
  value: string
  sort: string
}

const DEFAULT_FILTERS: FilterState = {
  search: '',
  category: '',
  subcategory: '',
  value: '',
  sort: 'relevance',
}

function readFiltersFromUrl(searchParams: URLSearchParams): FilterState {
  return {
    search: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    subcategory: searchParams.get('subcategory') || '',
    value: searchParams.get('value') || '',
    sort: searchParams.get('sort') || 'relevance',
  }
}

/** Single promote CTA — same pattern as Programs (no empty multi-ad rails). */
function DealsPromoteBanner() {
  const reduce = useReducedMotion()
  return (
    <Link
      href="/#advertise"
      className="group relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-gradient-to-br from-white via-white to-amber-50/50 dark:from-[#0c0c0c] dark:via-[#0a0a0a] dark:to-[#14110a] px-4 py-4 md:px-5 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_10px_28px_rgba(0,0,0,0.06)] hover:border-accent-yellow/40 dark:hover:border-accent-yellow/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-accent-yellow/15 dark:bg-accent-yellow/[0.08] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/40 to-transparent"
      />
      {!reduce && (
        <m.div
          aria-hidden
          className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent skew-x-12"
          animate={{ x: ['0%', '350%'] }}
          transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
        />
      )}

      <div className="relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-black/[0.06] dark:border-white/10 bg-accent-yellow/20 dark:bg-accent-yellow/10 shadow-sm">
        <m.span
          className="material-symbols-outlined text-amber-700 dark:text-accent-yellow !text-[22px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
          animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          campaign
        </m.span>
      </div>

      <div className="relative z-10 min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-amber-700/90 dark:text-accent-yellow/90">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-yellow opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-yellow" />
            </span>
            Ad spot open · 1 placement
          </span>
        </div>
        <p className="font-mono text-[13px] md:text-[15px] font-bold tracking-tight text-gray-900 dark:text-white leading-snug">
          Promote your deal to high-intent founders
        </p>
        <p className="mt-0.5 text-[11.5px] text-gray-500 dark:text-gray-400 line-clamp-2 sm:line-clamp-1">
          One featured banner on the deals directory — claim via homepage submission form.
        </p>
      </div>

      <span className="relative z-10 inline-flex items-center justify-center gap-1.5 self-start sm:self-center rounded-xl bg-gray-900 dark:bg-accent-yellow text-white dark:text-black font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.08em] px-4 py-2.5 border border-black/10 dark:border-transparent group-hover:bg-black dark:group-hover:bg-amber-300 transition-colors whitespace-nowrap shadow-sm">
        Get featured
        <span className="material-symbols-outlined !text-[14px] group-hover:translate-x-0.5 transition-transform">
          arrow_forward
        </span>
      </span>
    </Link>
  )
}

export default function DealsContent({
  initialIsPro,
  initialFilters,
  initialDeals,
}: {
  initialIsPro?: boolean
  initialFilters?: FilterState
  initialDeals?: import('@/lib/deals-database').Deal[]
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const reduceMotion = useReducedMotion()

  const [filters, setFilters] = useState<FilterState>(
    () => initialFilters || readFiltersFromUrl(new URLSearchParams(searchParams.toString()))
  )
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false)
  // null until first write/read — avoid evaluating searchParams in useRef() each render
  const lastWrittenUrlRef = useRef<string | null>(null)
  const isFirstSync = useRef(true)

  useEffect(() => {
    if (isFirstSync.current) {
      isFirstSync.current = false
      return
    }
    const params = new URLSearchParams(searchParams.toString())
    const writeOrDelete = (key: string, value: string, defaultValue = '') => {
      if (value && value !== defaultValue) params.set(key, value)
      else params.delete(key)
    }
    writeOrDelete('q', filters.search)
    writeOrDelete('category', filters.category)
    writeOrDelete('subcategory', filters.subcategory)
    writeOrDelete('value', filters.value)
    writeOrDelete('sort', filters.sort, 'relevance')

    const currentFilterKey = [
      searchParams.get('q') || '',
      searchParams.get('category') || '',
      searchParams.get('subcategory') || '',
      searchParams.get('value') || '',
      searchParams.get('sort') || 'relevance',
    ].join('|')
    const newFilterKey = [
      filters.search,
      filters.category,
      filters.subcategory,
      filters.value,
      filters.sort,
    ].join('|')

    if (currentFilterKey === newFilterKey) return

    params.delete('page')
    const next = params.toString()
    lastWrittenUrlRef.current = next
    const url = next ? `${pathname}?${next}` : pathname
    replaceUrlQuiet(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.category, filters.subcategory, filters.value, filters.sort])

  useEffect(() => {
    const current = searchParams.toString()
    if (lastWrittenUrlRef.current !== null && current === lastWrittenUrlRef.current) return
    lastWrittenUrlRef.current = current
    const fromUrl = readFiltersFromUrl(new URLSearchParams(current))
    setFilters((prev) => {
      if (
        prev.search === fromUrl.search &&
        prev.category === fromUrl.category &&
        prev.subcategory === fromUrl.subcategory &&
        prev.value === fromUrl.value &&
        prev.sort === fromUrl.sort
      ) {
        return prev
      }
      return fromUrl
    })
  }, [searchParams])

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
  }, [])

  const handleCategorySelect = useCallback((category: string, subcategory?: string) => {
    setFilters((prev) => ({
      ...prev,
      category,
      subcategory: subcategory || '',
    }))
    setMobileCategoryOpen(false)
  }, [])

  const activeCategory = filters.category || filters.subcategory

  return (
    <div className="max-w-[1600px] mx-auto flex flex-col gap-5">
      <FadeUp delay={0.02}>
        <DealsPromoteBanner />
      </FadeUp>

      {/* Mobile Category Filter Button */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileCategoryOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 border border-black/[0.06] dark:border-white/[0.08] bg-white/90 dark:bg-white/5 rounded-xl font-mono text-[11px] font-semibold uppercase tracking-wide hover:bg-gray-50 dark:hover:bg-white/10 transition-all w-full text-gray-700 dark:text-gray-300 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px] text-gray-500 dark:text-gray-400">
            filter_list
          </span>
          <span>Filter by Category</span>
          {activeCategory && (
            <span className="ml-auto bg-accent-yellow text-black text-[9px] px-1.5 py-0.5 font-bold rounded-full">
              1
            </span>
          )}
          <span className="material-symbols-outlined text-[18px] text-gray-400 dark:text-gray-500">
            chevron_right
          </span>
        </button>
      </div>

      {/* Mobile Category Drawer */}
      {mobileCategoryOpen && (
        <button
          type="button"
          aria-label="Close category filter"
          className="fixed inset-0 z-40 border-0 bg-black/40 p-0 lg:hidden backdrop-blur-[2px] cursor-default"
          onClick={() => setMobileCategoryOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm bg-white dark:bg-[#0c0c0c] border-r dark:border-white/10 overflow-y-auto lg:hidden transition-transform duration-300 ease-out ${
          mobileCategoryOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!mobileCategoryOpen}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10 bg-gray-900 text-white sticky top-0 z-10">
          <h2 className="font-mono font-bold text-sm uppercase tracking-[0.1em]">Browse Categories</h2>
          <button
            type="button"
            onClick={() => setMobileCategoryOpen(false)}
            className="flex items-center justify-center w-8 h-8 rounded-md border border-white/20 hover:bg-white/10 transition-colors"
            aria-label="Close categories"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
        <div className="p-3">
          <DealsCategorySidebar
            onCategorySelect={handleCategorySelect}
            selectedCategory={filters.category}
            selectedSubcategory={filters.subcategory}
            initialDeals={initialDeals}
          />
        </div>
      </div>

      <div className="flex gap-5 lg:gap-6 items-start">
        {/* Left: categories only (no empty ad rail) */}
        <FadeUp delay={0.06} className="w-60 flex-shrink-0 hidden lg:block">
          <div className="sticky top-20">
            <DealsCategorySidebar
              onCategorySelect={handleCategorySelect}
              selectedCategory={filters.category}
              selectedSubcategory={filters.subcategory}
              initialDeals={initialDeals}
            />
          </div>
        </FadeUp>

        {/* Main: filters + grid */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <FadeUp delay={0.08}>
            <DealsFilterBar onFilterChange={handleFilterChange} currentFilters={filters} />
          </FadeUp>
          <m.div
            key={`${filters.category}|${filters.subcategory}|${filters.sort}`}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: premiumEase }}
          >
            <DealsGrid
              filters={filters}
              initialIsPro={initialIsPro}
              initialDeals={initialDeals}
            />
          </m.div>
        </div>
      </div>
    </div>
  )
}
