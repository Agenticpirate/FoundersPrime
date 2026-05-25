'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import DealsFilterBar from './DealsFilterBar'
import DealsGrid from './DealsGrid'
import DealsCategorySidebar from './DealsCategorySidebar'
import SidebarMandalaStack from './SidebarMandalaStack'

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

export default function DealsContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialize from URL so deep-linked / back-navigated state is preserved
  const [filters, setFilters] = useState<FilterState>(() => readFiltersFromUrl(new URLSearchParams(searchParams.toString())))
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false)
  const isFirstSync = useRef(true)

  // Sync filters → URL (without breaking the page param). Use replaceState
  // for filter changes so the browser back stack stays clean — pagination
  // pushes its own history entries via DealsGrid.
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
    // When filters change we want to start on page 1
    params.delete('page')
    const next = params.toString()
    const url = next ? `${pathname}?${next}` : pathname
    window.history.replaceState(null, '', url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.category, filters.subcategory, filters.value, filters.sort])

  // When the user hits browser back/forward, the searchParams change —
  // re-read them so filter state reflects the URL.
  useEffect(() => {
    const handlePopState = () => {
      const fromUrl = readFiltersFromUrl(new URLSearchParams(window.location.search))
      setFilters(fromUrl)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
  }, [])

  const handleCategorySelect = useCallback((category: string, subcategory?: string) => {
    setFilters(prev => ({
      ...prev,
      category,
      subcategory: subcategory || '',
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

      {/* Mobile Category Drawer */}
      {mobileCategoryOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileCategoryOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm bg-white overflow-y-auto lg:hidden transition-transform duration-200 ease-out ${
          mobileCategoryOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!mobileCategoryOpen}
      >
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
