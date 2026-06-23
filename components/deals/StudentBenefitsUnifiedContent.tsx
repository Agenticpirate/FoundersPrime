'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import StudentBenefitsSidebar, { StudentBenefitType } from './StudentBenefitsSidebar'
import StudentBenefitsFilterBar, { StudentBenefitsFilterState } from './StudentBenefitsFilterBar'
import StudentBenefitsGrid from './StudentBenefitsGrid'
import FeaturedSlot from './featured/FeaturedSlot'

const DEFAULT_FILTERS: StudentBenefitsFilterState = {
  search: '',
  category: 'All',
  subtype: 'All',
  sort: 'relevance',
  region: 'All',
}

function readFromUrl(params: URLSearchParams): { type: StudentBenefitType; filters: StudentBenefitsFilterState } {
  const rawType = params.get('type') || 'all'
  const type: StudentBenefitType = (['all', 'free-access', 'credits-savings', 'funding', 'programs'] as StudentBenefitType[]).includes(rawType as StudentBenefitType)
    ? (rawType as StudentBenefitType)
    : 'all'
  return {
    type,
    filters: {
      search: params.get('q') || '',
      category: params.get('category') || 'All',
      subtype: params.get('subtype') || 'All',
      sort: params.get('sort') || 'relevance',
      region: params.get('region') || 'All',
    },
  }
}

export default function StudentBenefitsUnifiedContent({ initialType, initialFilters }: { initialType?: StudentBenefitType; initialFilters?: StudentBenefitsFilterState }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initial = readFromUrl(new URLSearchParams(searchParams.toString()))
  const [activeType, setActiveType] = useState<StudentBenefitType>(initialType || initial.type)
  const [filters, setFilters] = useState<StudentBenefitsFilterState>(initialFilters || initial.filters)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const lastWrittenUrlRef = useRef(searchParams.toString())
  const isFirstSync = useRef(true)

  // Sync state → URL
  useEffect(() => {
    if (isFirstSync.current) { isFirstSync.current = false; return }

    const params = new URLSearchParams(searchParams.toString())
    const writeOrDelete = (key: string, value: string, defaultValue = '') => {
      if (value && value !== defaultValue) params.set(key, value)
      else params.delete(key)
    }
    writeOrDelete('type', activeType, 'all')
    writeOrDelete('q', filters.search)
    writeOrDelete('category', filters.category, 'All')
    writeOrDelete('subtype', filters.subtype, 'All')
    writeOrDelete('region', filters.region, 'All')
    writeOrDelete('sort', filters.sort, 'relevance')

    const next = params.toString()
    lastWrittenUrlRef.current = next
    const url = next ? `${pathname}?${next}` : pathname
    router.replace(url, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeType, filters.search, filters.category, filters.subtype, filters.region, filters.sort])

  // Sync URL → state (browser back/forward)
  useEffect(() => {
    const current = searchParams.toString()
    if (current === lastWrittenUrlRef.current) return
    lastWrittenUrlRef.current = current
    const { type, filters: fromUrl } = readFromUrl(new URLSearchParams(current))
    setActiveType(type)
    setFilters(prev => {
      if (
        prev.search === fromUrl.search &&
        prev.category === fromUrl.category &&
        prev.subtype === fromUrl.subtype &&
        prev.region === fromUrl.region &&
        prev.sort === fromUrl.sort
      ) return prev
      return fromUrl
    })
  }, [searchParams])

  const handleTypeSelect = useCallback((type: StudentBenefitType) => {
    setActiveType(type)
    setMobileSidebarOpen(false)
    // Reset category/subtype-specific filters when switching types
    setFilters(prev => ({ ...prev, category: 'All', subtype: 'All', region: 'All' }))
  }, [])

  const handleFilterChange = useCallback((newFilters: StudentBenefitsFilterState) => {
    setFilters(newFilters)
  }, [])

  const activeLabel: Record<StudentBenefitType, string> = {
    all: 'All Benefits',
    'free-access': 'Campus Edge',
    'credits-savings': 'Credits & Savings',
    funding: 'Funding & Opps',
    programs: 'Programs',
  }

  return (
    <div className="max-w-[1600px] mx-auto" id="student-benefits-container">
      {/* Header Featured Banner — rotating, full width, shown on all sizes */}
      <FeaturedSlot variant="banner" count={1} intervalMs={5000} offset={0} className="mb-4" />

      {/* Mobile sidebar toggle button */}
      <div className="lg:hidden mb-3">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 rounded-lg font-mono text-[11px] font-semibold uppercase tracking-wide hover:bg-gray-50 dark:hover:bg-white/10 transition-all w-full text-gray-700 dark:text-gray-300 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px] text-gray-500 dark:text-gray-400">tune</span>
          <span>Filter by Benefit Type</span>
          {activeType !== 'all' && (
            <span className="ml-auto bg-cyan-500 text-white text-[9px] px-1.5 py-0.5 font-bold rounded-full">
              {activeLabel[activeType]}
            </span>
          )}
          <span className="material-symbols-outlined text-[18px] text-gray-400 dark:text-gray-500">chevron_right</span>
        </button>
      </div>

      {/* Mobile sidebar drawer */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm bg-white dark:bg-[#0c0c0c] border-r dark:border-white/10 overflow-y-auto lg:hidden transition-transform duration-200 ease-out ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!mobileSidebarOpen}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10 bg-gray-900 text-white sticky top-0 z-10">
          <h2 className="font-mono font-bold text-sm uppercase tracking-[0.1em]">Benefit Type</h2>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="flex items-center justify-center w-8 h-8 rounded-md border border-white/20 hover:bg-white/10 transition-colors"
            aria-label="Close sidebar"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
        <div className="p-3">
          <StudentBenefitsSidebar selectedType={activeType} onTypeSelect={handleTypeSelect} />
        </div>
      </div>

      {/* Main layout */}
      <div className="flex gap-5 lg:gap-6 items-start">
        {/* Left sidebar — desktop only */}
        <div className="w-60 flex-shrink-0 hidden lg:block">
          <FeaturedSlot variant="rail" count={2} intervalMs={6000} offset={0} className="mb-4" />
          <StudentBenefitsSidebar selectedType={activeType} onTypeSelect={handleTypeSelect} />
        </div>

        {/* Right column: filter bar + grid */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <StudentBenefitsFilterBar
            activeType={activeType}
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />
          <StudentBenefitsGrid activeType={activeType} filters={filters} />
        </div>

        {/* Right Rail: stack of Featured slots filling the column — wide screens only */}
        <div className="w-60 flex-shrink-0 hidden xl:block">
          <div className="sticky top-20 space-y-3">
            <FeaturedSlot variant="rail" count={1} intervalMs={6500} offset={3} dense />
            <FeaturedSlot variant="rail" count={1} intervalMs={7500} offset={4} showHeader={false} dense />
            <FeaturedSlot variant="rail" count={1} intervalMs={7000} offset={5} showHeader={false} dense />
            <FeaturedSlot variant="rail" count={1} intervalMs={8000} offset={6} showHeader={false} dense />
          </div>
        </div>
      </div>
    </div>
  )
}
