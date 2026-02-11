'use client'

import { useState, useCallback } from 'react'
import DealsFilterBar from './DealsFilterBar'
import DealsGrid from './DealsGrid'
import DealsSidebar from './DealsSidebar'
import DealsCategorySidebar from './DealsCategorySidebar'

interface FilterState {
  search: string
  category: string
  subcategory: string
  value: string
  sort: string
}

export default function DealsContent() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    subcategory: '',
    value: '',
    sort: 'relevance'
  })

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
  }, [])

  const handleCategorySelect = useCallback((category: string, subcategory?: string) => {
    setFilters(prev => ({
      ...prev,
      category,
      subcategory: subcategory || ''
    }))
  }, [])

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex gap-4 lg:gap-6 items-start">
        {/* Left Column: Category Sidebar - Narrower */}
        <div className="w-56 flex-shrink-0 hidden lg:block">
          <DealsCategorySidebar
            onCategorySelect={handleCategorySelect}
            selectedCategory={filters.category}
            selectedSubcategory={filters.subcategory}
          />
        </div>

        {/* Right Column: Filters & Grid - Takes remaining space */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Pro Tip Alert */}
          <div className="bg-yellow-50 border-1 border-yellow-200 p-4 rounded-lg flex items-start gap-3">
            <span className="material-symbols-outlined text-yellow-600 mt-0.5">lightbulb</span>
            <div>
              <p className="text-sm text-yellow-800 font-medium">
                <span className="font-bold">Pro Tip:</span> Use a professional email/domain (e.g. name@FoundersPrime.com) instead of generic providers (gmail, yahoo) to increase approval chances.
              </p>
            </div>
          </div>

          <DealsFilterBar onFilterChange={handleFilterChange} currentFilters={filters} />
          <DealsGrid filters={filters} />
        </div>
      </div>
    </div>
  )
}