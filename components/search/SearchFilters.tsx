'use client'

import { useMemo, useState } from 'react'

const filterCategories = [
  {
    name: 'Content Type',
    filters: ['Deals', 'Startups', 'Ideas', 'Resources', 'Blog Posts']
  },
  {
    name: 'Category',
    filters: ['Cloud Credits', 'SaaS Tools', 'Funding', 'Marketing', 'Analytics']
  },
  {
    name: 'Value Range',
    filters: ['$0-$1K', '$1K-$10K', '$10K-$50K', '$50K+']
  },
  {
    name: 'Status',
    filters: ['Active', 'Verified', 'Featured', 'New', 'Trending']
  }
]

const sortOptions = [
  'Relevance',
  'Most Recent',
  'Most Popular',
  'Highest Value',
  'Alphabetical'
]

const dateOptions = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'quarter', label: 'This Quarter' },
  { value: 'year', label: 'This Year' }
]


export default function SearchFilters() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('relevance')
  const [dateRange, setDateRange] = useState('all')
  const activeFilterSet = useMemo(() => new Set(activeFilters), [activeFilters])

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setSortBy('relevance')
    setDateRange('all')
  }

  return (
    <div className="mb-4 md:mb-6">
      {/* Filter Bar */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          {/* Filter Categories */}
          <div className="flex flex-wrap gap-4">
            {filterCategories.map((category, index) => (
              <div key={category.name} className="relative group">
                <button type="button" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border-2 border-black rounded-sm font-mono text-sm font-bold transition-colors">
                  {category.name}
                  <span className="material-symbols-outlined text-sm ml-1">expand_more</span>
                </button>
                
                {/* Dropdown */}
                <div className="absolute top-full left-0 mt-2 bg-white border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_#1a1a1a] p-4 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  <div className="space-y-2">
                    {category.filters.map((filter, filterIndex) => (
                      <label key={filterIndex} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={activeFilterSet.has(filter)}
                          onChange={() => toggleFilter(filter)}
                          className="size-4 border-2 border-black rounded-sm"
                        />
                        <span className="font-sans text-sm text-gray-700">{filter}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Sort and Date */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-black">Sort:</span>
              <select
                aria-label="Sort search results"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border-2 border-black rounded-sm font-mono text-sm bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_#1a1a1a]"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option.toLowerCase().replace(' ', '-')}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-black">Date:</span>
              <select
                aria-label="Filter by date range"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border-2 border-black rounded-sm font-mono text-sm bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_#1a1a1a]"
              >
                {dateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="bg-primary/10 border-2 border-black rounded-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-sm font-bold text-black">
              Active Filters ({activeFilters.length})
            </span>
            <button type="button"
              onClick={clearAllFilters}
              className="font-mono text-sm text-red-600 hover:text-black transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <span
                key={filter}
                className="px-3 py-1 bg-white border-2 border-black rounded-sm font-mono text-xs flex items-center gap-2"
              >
                {filter}
                <button type="button"
                  onClick={() => toggleFilter(filter)}
                  className="text-red-600 hover:text-black transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}