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

  return (
    <div className="bg-white border-2 border-black p-2 md:p-3 shadow-[2px_2px_0px_#111] sticky top-14 md:top-20 z-30">
      {/* Search + Filters in one compact block */}
      <div className="flex flex-col gap-1.5">
        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
          <input
            className="w-full h-8 pl-8 pr-3 border-2 border-black focus:border-primary focus:ring-0 font-mono text-xs bg-white placeholder:text-gray-400"
            placeholder="Search deals..."
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        {/* Dropdowns — compact row */}
        <div className="grid grid-cols-3 gap-1.5">
          <select
            className="h-7 border border-gray-300 bg-white px-1.5 text-[11px] md:text-xs focus:ring-0 focus:border-primary cursor-pointer font-mono"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">Category</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select
            className="h-7 border border-gray-300 bg-white px-1.5 text-[11px] md:text-xs focus:ring-0 focus:border-primary cursor-pointer font-mono"
            value={filters.value}
            onChange={(e) => handleFilterChange('value', e.target.value)}
          >
            <option value="">Value</option>
            <option value="under-1k">&lt;$1K</option>
            <option value="1k-10k">$1K-$10K</option>
            <option value="10k-50k">$10K-$50K</option>
            <option value="50k-100k">$50K-$100K</option>
            <option value="over-100k">&gt;$100K</option>
          </select>
          <select
            className="h-7 border border-gray-300 bg-white px-1.5 text-[11px] md:text-xs focus:ring-0 focus:border-primary cursor-pointer font-mono"
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
          >
            <option value="relevance">Sort</option>
            <option value="newest">Newest</option>
            <option value="value-high">Value ↓</option>
            <option value="value-low">Value ↑</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex gap-1.5 mt-1.5 pt-1.5 border-t border-gray-100 overflow-x-auto mobile-scroll-hide">
        {[
          { label: 'All', active: activeFiltersCount === 0, action: resetFilters },
          { label: 'New', active: filters.sort === 'newest', action: () => handleFilterChange('sort', 'newest') },
          { label: 'AI Tools', active: filters.category === 'ai', action: () => handleFilterChange('category', 'ai') },
          { label: 'Popular', active: filters.sort === 'relevance' && !filters.category, action: () => { resetFilters() } },
        ].map(f => (
          <button
            key={f.label}
            onClick={f.action}
            className={`px-2 py-0.5 text-[10px] font-bold border transition-colors whitespace-nowrap flex-shrink-0 font-mono ${
              f.active ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
        {activeFiltersCount > 0 && (
          <button onClick={resetFilters} className="px-2 py-0.5 text-[10px] font-bold text-red-500 border border-red-200 hover:bg-red-50 whitespace-nowrap flex-shrink-0 font-mono">
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
