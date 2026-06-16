'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import DealsFilterBar from './DealsFilterBar'
import DealsGrid from './DealsGrid'
import DealsCategorySidebar from './DealsCategorySidebar'
import FeaturedSlot from './featured/FeaturedSlot'

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
  // Track the last URL we wrote so we can tell URL changes that came from
  // OUR setFilters effect from URL changes that came from elsewhere
  // (browser back/forward, deep-link). When the change is external, we
  // re-sync local state from URL without firing the URL-write effect.
  const lastWrittenUrlRef = useRef<string>(searchParams.toString())
  const isFirstSync = useRef(true)

  // Sync filters → URL via Next.js router (replace, no scroll). This
  // ensures Next.js's history stack stays consistent so browser
  // back/forward from a single-deal page restores both filters AND the
  // pagination page param.
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

    // Compare the FILTER-RELEVANT parts of URL — not the full URL — so
    // a `?page=5` that already exists doesn't make this effect run and
    // reset the page param. Only when filter values genuinely change do
    // we reset pagination.
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

    if (currentFilterKey === newFilterKey) {
      // Filters already match URL — nothing to write. This is the case
      // when the URL update came from pagination (router.push with
      // ?page=N) and our filter state was simply re-synced via the URL
      // change effect below.
      return
    }

    // Genuine filter change — drop the page param so we go to page 1.
    params.delete('page')
    const next = params.toString()
    lastWrittenUrlRef.current = next
    const url = next ? `${pathname}?${next}` : pathname
    router.replace(url, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.category, filters.subcategory, filters.value, filters.sort])

  // When the URL changes from outside our control (browser back/forward,
  // direct nav, or a `router.push` from DealsGrid pagination), re-read
  // filters into local state. We compare both the raw URL string AND the
  // filter-relevant fields so a `?page=5` change alone does NOT cause us
  // to setFilters (which would trigger the URL-write effect and wipe the
  // page param).
  useEffect(() => {
    const current = searchParams.toString()
    if (current === lastWrittenUrlRef.current) return
    lastWrittenUrlRef.current = current
    const fromUrl = readFiltersFromUrl(new URLSearchParams(current))
    setFilters(prev => {
      // Only return a new object if a filter field actually differs —
      // otherwise we'd cause the URL-write effect to fire and drop ?page.
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
      {/* Header Featured Banner — rotating, full width, shown on all sizes */}
      <FeaturedSlot variant="banner" count={1} intervalMs={5000} offset={0} className="mb-4" />

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
          <FeaturedSlot variant="rail" count={3} intervalMs={6000} offset={0} className="mb-4" />
          <DealsCategorySidebar
            onCategorySelect={handleCategorySelect}
            selectedCategory={filters.category}
            selectedSubcategory={filters.subcategory}
          />
          <div className="mt-4 space-y-3">
            <FeaturedSlot variant="rail" count={1} intervalMs={7200} offset={9} showHeader={false} dense />
            <FeaturedSlot variant="rail" count={1} intervalMs={8200} offset={10} showHeader={false} dense />
            <FeaturedSlot variant="rail" count={1} intervalMs={9200} offset={11} showHeader={false} dense />
          </div>
        </div>

        {/* Right Column: Filters & Grid */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <DealsFilterBar onFilterChange={handleFilterChange} currentFilters={filters} />
          <DealsGrid filters={filters} />
        </div>

        {/* Right Rail: stack of Featured slots filling the column — wide
            screens only (xl+) so the grid isn't squeezed on smaller laptops.
            Sticky so the ads stay in view while scrolling the long grid.
            Each slot rotates independently; when deals > slots they spin. */}
        <div className="w-60 flex-shrink-0 hidden xl:block">
          <div className="sticky top-4 space-y-3">
            <FeaturedSlot variant="rail" count={1} intervalMs={6500} offset={3} dense />
            <FeaturedSlot variant="rail" count={1} intervalMs={7500} offset={4} showHeader={false} dense />
            <FeaturedSlot variant="rail" count={1} intervalMs={7000} offset={5} showHeader={false} dense />
            <FeaturedSlot variant="rail" count={1} intervalMs={8000} offset={6} showHeader={false} dense />
            <FeaturedSlot variant="rail" count={1} intervalMs={8500} offset={7} showHeader={false} dense />
            <FeaturedSlot variant="rail" count={1} intervalMs={9000} offset={8} showHeader={false} dense />
          </div>
        </div>
      </div>
    </div>
  )
}
