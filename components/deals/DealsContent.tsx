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

  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false)

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
  }, [])

  const handleCategorySelect = useCallback((category: string, subcategory?: string) => {
    setFilters(prev => ({
      ...prev,
      category,
      subcategory: subcategory || ''
    }))
    setMobileCategoryOpen(false)
  }, [])

  const activeCategory = filters.category || filters.subcategory

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Mobile Category Filter Button */}
      <div className="lg:hidden mb-3">
        <button
          onClick={() => setMobileCategoryOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 border-2 border-black bg-white shadow-[3px_3px_0px_#111] font-mono text-xs font-bold uppercase tracking-wide hover:bg-gray-50 transition-all w-full"
        >
          <span className="material-symbols-outlined text-base">filter_list</span>
          Filter by Category
          {activeCategory && (
            <span className="ml-auto bg-black text-white text-[10px] px-2 py-0.5 font-bold uppercase">
              1 active
            </span>
          )}
        </button>
      </div>

      {/* Mobile Category Drawer — always mounted, toggled via CSS for smooth UX and scroll-state preservation */}
      {/* Backdrop: conditional is fine (cheap DOM node) */}
      {mobileCategoryOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileCategoryOpen(false)}
        />
      )}
      {/* Drawer: always in DOM, slides in/out via transform */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm bg-white border-r-2 border-black shadow-[4px_0px_0px_#111] overflow-y-auto lg:hidden transition-transform duration-200 ease-out ${
          mobileCategoryOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!mobileCategoryOpen}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-black bg-black text-white sticky top-0">
          <h2 className="font-mono font-bold text-sm uppercase tracking-wide">
            Browse Categories
          </h2>
          <button
            onClick={() => setMobileCategoryOpen(false)}
            className="flex items-center justify-center w-8 h-8 border border-white/30 hover:bg-white/10 transition-colors"
            aria-label="Close categories"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
        {/* Sidebar content inside drawer */}
        <div className="p-3">
          <DealsCategorySidebar
            onCategorySelect={handleCategorySelect}
            selectedCategory={filters.category}
            selectedSubcategory={filters.subcategory}
          />
        </div>
      </div>

      <div className="flex gap-4 lg:gap-6 items-start">
        {/* Left Column: Category Sidebar - Desktop only */}
        <div className="w-56 flex-shrink-0 hidden lg:block">
          <DealsCategorySidebar
            onCategorySelect={handleCategorySelect}
            selectedCategory={filters.category}
            selectedSubcategory={filters.subcategory}
          />
        </div>

        {/* Right Column: Filters & Grid */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Pro Tip Alert */}
          <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-sm flex items-start gap-3 shadow-sm">
            <span className="material-symbols-outlined text-yellow-600 mt-0.5 shrink-0">lightbulb</span>
            <div>
              <p className="text-xs md:text-sm text-yellow-800 font-medium">
                <span className="font-bold uppercase tracking-wider text-[10px] md:text-xs bg-yellow-200 px-1 py-0.5 rounded-sm mr-2 mb-1 inline-block">Pro Tip</span>
                Use a professional email/domain (e.g. name@startup.com) instead of generic providers (gmail, yahoo) to increase approval chances.
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
