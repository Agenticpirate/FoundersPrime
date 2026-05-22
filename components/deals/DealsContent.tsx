'use client'

import { useState, useCallback } from 'react'
import DealsFilterBar from './DealsFilterBar'
import DealsGrid from './DealsGrid'
import DealsSidebar from './DealsSidebar'
import DealsCategorySidebar from './DealsCategorySidebar'
import SidebarMandalaStack from './SidebarMandalaStack'

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
          className="flex items-center gap-2 px-3.5 py-2.5 border border-gray-200 bg-white rounded-lg font-mono text-[11px] font-semibold uppercase tracking-wide hover:bg-gray-50 transition-all w-full text-gray-700 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px] text-gray-500">filter_list</span>
          <span>Filter by Category</span>
          {activeCategory && (
            <span className="ml-auto bg-accent-yellow text-black text-[9px] px-1.5 py-0.5 font-bold rounded-full">1</span>
          )}
          <span className="material-symbols-outlined text-[18px] text-gray-400">chevron_right</span>
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
        className={`fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm bg-white overflow-y-auto lg:hidden transition-transform duration-200 ease-out ${
          mobileCategoryOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!mobileCategoryOpen}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-900 text-white sticky top-0 z-10">
          <h2 className="font-mono font-bold text-sm uppercase tracking-[0.1em]">
            Browse Categories
          </h2>
          <button
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
          />
        </div>
      </div>

      <div className="flex gap-5 lg:gap-6 items-start">
        {/* Left Column: Category Sidebar - Desktop only */}
        <div className="w-60 flex-shrink-0 hidden lg:block">
          <DealsCategorySidebar
            onCategorySelect={handleCategorySelect}
            selectedCategory={filters.category}
            selectedSubcategory={filters.subcategory}
          />
          <SidebarMandalaStack />
        </div>

        {/* Right Column: Filters & Grid */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <DealsFilterBar onFilterChange={handleFilterChange} currentFilters={filters} />
          <DealsGrid filters={filters} />
        </div>
      </div>
    </div>
  )
}
