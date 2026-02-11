'use client'

import { useState, useEffect, useRef } from 'react'
import { dealCategories, getAllCategories, getSubcategoriesByCategory, type DealCategory, type DealSubcategory } from '@/lib/deals-database'

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
    search: '',
    category: '',
    subcategory: '',
    value: '',
    sort: 'relevance'
  })

  const [subcategories, setSubcategories] = useState<DealSubcategory[]>([])
  const [showSubcategories, setShowSubcategories] = useState(false)
  const isInitialMount = useRef(true)

  const categories = getAllCategories()

  // Update local filters when currentFilters prop changes (but not on initial mount)
  useEffect(() => {
    if (currentFilters && !isInitialMount.current) {
      setFilters(currentFilters)
    }
  }, [currentFilters])

  useEffect(() => {
    if (filters.category) {
      const subs = getSubcategoriesByCategory(filters.category)
      setSubcategories(subs)
      setShowSubcategories(subs.length > 0)
    } else {
      setSubcategories([])
      setShowSubcategories(false)
    }
  }, [filters.category])

  // Only notify parent when filters actually change (not on mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const timeoutId = setTimeout(() => {
      onFilterChange?.(filters)
    }, 100) // Debounce to prevent rapid updates

    return () => clearTimeout(timeoutId)
  }, [filters.search, filters.category, filters.subcategory, filters.value, filters.sort])

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value }
      // Reset subcategory when category changes
      if (key === 'category') {
        newFilters.subcategory = ''
      }
      return newFilters
    })
  }

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      subcategory: '',
      value: '',
      sort: 'relevance'
    })
  }

  const activeFiltersCount = Object.values(filters).filter(value => value && value !== 'relevance').length

  return (
    <div className="bg-white border-2 border-gray-200 p-3 shadow-sm">
      {/* Main Filter Row - Single Line on Desktop */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search - Takes more space */}
        <div className="relative flex-1 min-w-0">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
          <input 
            className="w-full h-10 pl-10 pr-4 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary font-sans text-sm bg-white placeholder:text-gray-400 rounded" 
            placeholder="Search deals..." 
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>
        
        {/* Compact Filter Controls */}
        <div className="flex flex-wrap md:flex-nowrap gap-2">
          {/* Category Dropdown */}
          <select 
            className="h-10 border border-gray-300 bg-white px-3 py-1 text-sm focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer rounded min-w-[140px]"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Value Filter */}
          <select 
            className="h-10 border border-gray-300 bg-white px-3 py-1 text-sm focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer rounded min-w-[120px]"
            value={filters.value}
            onChange={(e) => handleFilterChange('value', e.target.value)}
          >
            <option value="">Any Value</option>
            <option value="under-1k">&lt; $1K</option>
            <option value="1k-10k">$1K - $10K</option>
            <option value="10k-50k">$10K - $50K</option>
            <option value="50k-100k">$50K - $100K</option>
            <option value="over-100k">&gt; $100K</option>
          </select>

          {/* Sort */}
          <select 
            className="h-10 border border-gray-300 bg-white px-3 py-1 text-sm focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer rounded min-w-[130px]"
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
            <option value="value-high">Value ↓</option>
            <option value="value-low">Value ↑</option>
            <option value="deadline">Deadline</option>
            <option value="alphabetical">A-Z</option>
          </select>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <button 
              onClick={resetFilters}
              className="h-10 px-3 bg-gray-100 text-gray-700 text-sm font-medium border border-gray-300 hover:bg-gray-200 transition-colors rounded whitespace-nowrap"
            >
              Clear ({activeFiltersCount})
            </button>
          )}
        </div>
      </div>
      
      {/* Quick Filters - Collapsible on Mobile */}
      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
        <button 
          onClick={() => resetFilters()}
          className={`px-2.5 py-1 text-xs font-medium border rounded transition-colors ${
            activeFiltersCount === 0 ? 'bg-ink text-white border-ink' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          All
        </button>
        <button 
          onClick={() => handleFilterChange('sort', 'newest')}
          className={`px-2.5 py-1 text-xs font-medium border rounded transition-colors ${
            filters.sort === 'newest' ? 'bg-ink text-white border-ink' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          New
        </button>
        <button 
          onClick={() => handleFilterChange('category', 'ai')}
          className={`px-2.5 py-1 text-xs font-medium border rounded transition-colors ${
            filters.category === 'ai' ? 'bg-ink text-white border-ink' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          AI Tools
        </button>
        <button 
          onClick={() => handleFilterChange('value', 'over-100k')}
          className={`px-2.5 py-1 text-xs font-medium border rounded transition-colors ${
            filters.value === 'over-100k' ? 'bg-ink text-white border-ink' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          High Value
        </button>
      </div>
    </div>
  )
}