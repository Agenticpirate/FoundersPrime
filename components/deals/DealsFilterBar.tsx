'use client'

import { useState, useEffect, useRef } from 'react'
import { getAllCategories, getSubcategoriesByCategory, type DealSubcategory } from '@/lib/deals-database'

interface FilterState {
  search: string
  category: string
  subcategory: string
  value: string
  sort: string
}

interface DealsFilterBarProps {
  onFilterChange?: (filters: FilterState) => void
  currentFilters?: FilterState
}

export default function DealsFilterBar({ onFilterChange, currentFilters }: DealsFilterBarProps) {
  const [filters, setFilters] = useState<FilterState>(
    currentFilters || {
      search: '',
      category: '',
      subcategory: '',
      value: '',
      sort: 'relevance',
    }
  )

  const [subcategories, setSubcategories] = useState<DealSubcategory[]>([])
  const isInitialMount = useRef(true)
  const categories = getAllCategories()

  useEffect(() => {
    if (currentFilters && !isInitialMount.current) setFilters(currentFilters)
  }, [currentFilters])

  useEffect(() => {
    if (filters.category) {
      setSubcategories(getSubcategoriesByCategory(filters.category))
    } else {
      setSubcategories([])
    }
  }, [filters.category])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    const t = setTimeout(() => onFilterChange?.(filters), 100)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.category, filters.subcategory, filters.value, filters.sort])

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const n = { ...prev, [key]: value }
      if (key === 'category') n.subcategory = ''
      return n
    })
  }

  const resetFilters = () => {
    setFilters({ search: '', category: '', subcategory: '', value: '', sort: 'relevance' })
  }

  const activeFiltersCount = Object.values(filters).filter((v) => v && v !== 'relevance').length

  const selectClass =
    'h-10 w-full appearance-none rounded-lg border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-white/[0.03] pl-3 pr-9 text-[12px] font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-accent-yellow/50 focus:border-accent-yellow/40 cursor-pointer hover:border-black/10 dark:hover:border-white/15 transition-colors'

  const quickChips = [
    { label: 'All', active: activeFiltersCount === 0, action: resetFilters },
    {
      label: 'New',
      active: filters.sort === 'newest',
      action: () => handleFilterChange('sort', 'newest'),
    },
    {
      label: 'AI Tools',
      active: filters.category === 'saas-discounts' && filters.subcategory === 'ai-tools',
      action: () => setFilters((p) => ({ ...p, category: 'saas-discounts', subcategory: 'ai-tools' })),
    },
    {
      label: 'Cloud',
      active: filters.category === 'cloud-credits',
      action: () => handleFilterChange('category', 'cloud-credits'),
    },
    {
      label: 'SaaS & Tools',
      active: filters.category === 'saas-discounts' && !filters.subcategory,
      action: () => handleFilterChange('category', 'saas-discounts'),
    },
    {
      label: 'Highest value',
      active: filters.sort === 'value-high',
      action: () => handleFilterChange('sort', 'value-high'),
    },
  ]

  return (
    <div className="relative sticky top-14 md:top-20 z-30 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden transition-colors duration-300">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"
        aria-hidden
      />

      <div className="relative p-3 md:p-4 space-y-3">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-yellow text-[18px] pointer-events-none transition-colors">
            search
          </span>
          <input
            className="w-full h-11 pl-11 pr-10 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-gray-50/80 dark:bg-white/[0.03] text-[13px] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-accent-yellow/50 focus:border-accent-yellow/40 focus:bg-white dark:focus:bg-white/[0.05] transition-all"
            placeholder="Search deals by name, provider, or category…"
            type="search"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            aria-label="Search deals"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => handleFilterChange('search', '')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div className="relative hidden sm:block">
            <select
              className={selectClass}
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              aria-label="Category"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">
              expand_more
            </span>
          </div>

          {subcategories.length > 0 && (
            <div className="relative">
              <select
                className={selectClass}
                value={filters.subcategory}
                onChange={(e) => handleFilterChange('subcategory', e.target.value)}
                aria-label="Subcategory"
              >
                <option value="">All subcategories</option>
                {subcategories.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">
                expand_more
              </span>
            </div>
          )}

          <div className="relative">
            <select
              className={selectClass}
              value={filters.value}
              onChange={(e) => handleFilterChange('value', e.target.value)}
              aria-label="Value range"
            >
              <option value="">Any Value</option>
              <option value="under-1k">&lt; $1K</option>
              <option value="1k-10k">$1K — $10K</option>
              <option value="10k-50k">$10K — $50K</option>
              <option value="50k-100k">$50K — $100K</option>
              <option value="over-100k">&gt; $100K</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">
              expand_more
            </span>
          </div>

          <div className="relative">
            <select
              className={selectClass}
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              aria-label="Sort"
            >
              <option value="relevance">Most Relevant</option>
              <option value="newest">Newest First</option>
              <option value="value-high">Highest Value</option>
              <option value="value-low">Lowest Value</option>
              <option value="alphabetical">A–Z</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-0.5 border-t border-black/[0.04] dark:border-white/[0.05]">
          <span className="hidden sm:inline-flex font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500 flex-shrink-0">
            Quick
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto mobile-scroll-hide flex-1 min-w-0 py-0.5">
            {quickChips.map((f) => (
              <button
                key={f.label}
                type="button"
                onClick={f.action}
                className={`px-3 py-1.5 text-[11px] font-medium rounded-full transition-all whitespace-nowrap flex-shrink-0 border ${
                  f.active
                    ? 'bg-accent-yellow text-black border-accent-yellow shadow-[0_0_0_1px_rgba(0,0,0,0.04)] font-semibold'
                    : 'bg-transparent text-gray-500 dark:text-gray-400 border-black/[0.06] dark:border-white/[0.08] hover:border-black/15 dark:hover:border-white/20 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-full text-red-500/90 hover:bg-red-500/10 transition-colors whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
