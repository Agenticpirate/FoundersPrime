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
  const [filters, setFilters] = useState<FilterState>(currentFilters || {
    search: '', category: '', subcategory: '', value: '', sort: 'relevance'
  })

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
    if (isInitialMount.current) { isInitialMount.current = false; return }
    const t = setTimeout(() => onFilterChange?.(filters), 100)
    return () => clearTimeout(t)
  }, [filters.search, filters.category, filters.subcategory, filters.value, filters.sort])

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => {
      const n = { ...prev, [key]: value }
      if (key === 'category') n.subcategory = ''
      return n
    })
  }

  const resetFilters = () => {
    setFilters({ search: '', category: '', subcategory: '', value: '', sort: 'relevance' })
  }

  const activeFiltersCount = Object.values(filters).filter(v => v && v !== 'relevance').length

  const selectClass =
    "h-9 w-full appearance-none border border-gray-200 bg-white pl-2.5 pr-7 text-[12px] text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-yellow/40 focus:border-accent-yellow cursor-pointer hover:border-gray-300 transition-colors font-medium"

  const quickChips = [
    { label: 'All', active: activeFiltersCount === 0, action: resetFilters },
    { label: 'New', active: filters.sort === 'newest', action: () => handleFilterChange('sort', 'newest') },
    { label: 'AI Tools', active: filters.category === 'saas-discounts' && filters.subcategory === 'ai-tools', action: () => setFilters(p => ({ ...p, category: 'saas-discounts', subcategory: 'ai-tools' })) },
    { label: 'Popular', active: filters.sort === 'relevance' && !filters.category, action: () => { resetFilters() } },
    { label: 'Cloud', active: filters.category === 'cloud-credits', action: () => handleFilterChange('category', 'cloud-credits') },
    { label: 'Grants', active: filters.subcategory === 'grants', action: () => setFilters(p => ({ ...p, category: 'startup-programs', subcategory: 'grants' })) },
  ]

  return (
    <div className="relative bg-white border border-gray-200 rounded-xl p-3 md:p-3.5 sticky top-14 md:top-20 z-30 shadow-sm overflow-hidden">
      {/* Decorative mandala — top-right corner */}
      <div className="absolute -top-10 -right-10 w-32 h-32 pointer-events-none opacity-[0.05]" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 filterbar-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
          <circle cx="100" cy="100" r="40" />
          <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + Math.cos((i * Math.PI) / 4) * 80}
              y2={100 + Math.sin((i * Math.PI) / 4) * 80}
            />
          ))}
          <circle cx="100" cy="100" r="2" fill="currentColor" />
        </svg>
      </div>

      <div className="relative">
      {/* Search row */}
      <div className="relative mb-2.5">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px] pointer-events-none">search</span>
        <input
          className="w-full h-9 pl-10 pr-9 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-yellow/40 focus:border-accent-yellow text-[12.5px] bg-gray-50 hover:bg-white focus:bg-white transition-colors placeholder:text-gray-400"
          placeholder="Search hundreds of deals by name, provider or category…"
          type="text"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
        {filters.search && (
          <button
            onClick={() => handleFilterChange('search', '')}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Clear search"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>

      {/* Dropdowns row */}
      <div className="grid grid-cols-3 gap-2 mb-2.5">
        <div className="relative">
          <select
            className={selectClass}
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">expand_more</span>
        </div>
        <div className="relative">
          <select
            className={selectClass}
            value={filters.value}
            onChange={(e) => handleFilterChange('value', e.target.value)}
          >
            <option value="">Any Value</option>
            <option value="under-1k">&lt; $1K</option>
            <option value="1k-10k">$1K — $10K</option>
            <option value="10k-50k">$10K — $50K</option>
            <option value="50k-100k">$50K — $100K</option>
            <option value="over-100k">&gt; $100K</option>
          </select>
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">expand_more</span>
        </div>
        <div className="relative">
          <select
            className={selectClass}
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
          >
            <option value="relevance">Most Relevant</option>
            <option value="newest">Newest First</option>
            <option value="value-high">Highest Value</option>
            <option value="value-low">Lowest Value</option>
            <option value="alphabetical">A–Z</option>
          </select>
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">expand_more</span>
        </div>
      </div>

      {/* Quick chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto mobile-scroll-hide">
        <span className="hidden md:inline-flex font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 mr-1 flex-shrink-0">Quick:</span>
        {quickChips.map(f => (
          <button
            key={f.label}
            onClick={f.action}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
              f.active
                ? 'bg-gray-900 text-white shadow-sm'
                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-white hover:border-gray-300 hover:text-gray-900'
            }`}
          >
            {f.label}
          </button>
        ))}
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="ml-auto px-2.5 py-1 text-[11px] font-semibold rounded-full text-red-600 hover:bg-red-50 transition-colors whitespace-nowrap flex-shrink-0 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
            Clear all
          </button>
        )}
      </div>
      </div>

      <style jsx>{`
        @keyframes filterBarMandalaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        :global(.filterbar-mandala-spin) {
          animation: filterBarMandalaSpin 70s linear infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.filterbar-mandala-spin) { animation: none; }
        }
      `}</style>
    </div>
  )
}
