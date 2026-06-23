'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import ProgramsSidebar, { ProgramType } from './ProgramsSidebar'
import ProgramsFilterBar, { ProgramFilterState } from './ProgramsFilterBar'
import ProgramsGrid from './ProgramsGrid'
import FeaturedSlot from './featured/FeaturedSlot'

const DEFAULT_FILTERS: ProgramFilterState = {
  search: '',
  region: 'All',
  subtype: 'All',
  sort: 'name',
}

function readFromUrl(params: URLSearchParams): { type: ProgramType; filters: ProgramFilterState } {
  const rawType = params.get('type') || 'all'
  const type: ProgramType = (['all', 'accelerators', 'incubators', 'grants'] as ProgramType[]).includes(rawType as ProgramType)
    ? (rawType as ProgramType)
    : 'all'
  return {
    type,
    filters: {
      search: params.get('q') || '',
      region: params.get('region') || 'All',
      subtype: params.get('subtype') || 'All',
      sort: params.get('sort') || 'name',
    },
  }
}

export default function ProgramsContent({ initialIsPro, initialType, initialFilters }: { initialIsPro?: boolean; initialType?: ProgramType; initialFilters?: ProgramFilterState }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initial = readFromUrl(new URLSearchParams(searchParams.toString()))
  const [activeType, setActiveType] = useState<ProgramType>(initialType || initial.type)
  const [filters, setFilters] = useState<ProgramFilterState>(initialFilters || initial.filters)
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
    writeOrDelete('region', filters.region, 'All')
    writeOrDelete('subtype', filters.subtype, 'All')
    writeOrDelete('sort', filters.sort, 'name')

    const next = params.toString()
    lastWrittenUrlRef.current = next
    const url = next ? `${pathname}?${next}` : pathname
    router.replace(url, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeType, filters.search, filters.region, filters.subtype, filters.sort])

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
        prev.region === fromUrl.region &&
        prev.subtype === fromUrl.subtype &&
        prev.sort === fromUrl.sort
      ) return prev
      return fromUrl
    })
  }, [searchParams])

  const handleTypeSelect = useCallback((type: ProgramType) => {
    setActiveType(type)
    setMobileSidebarOpen(false)
    // Reset subtype-specific filter when switching types
    setFilters(prev => ({ ...prev, subtype: 'All' }))
  }, [])

  const handleFilterChange = useCallback((newFilters: ProgramFilterState) => {
    setFilters(newFilters)
  }, [])

  const activeLabel: Record<ProgramType, string> = {
    all: 'All Programs',
    accelerators: 'Accelerators',
    incubators: 'Incubators',
    grants: 'Grants',
  }

  return (
    <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
      {/* Header Featured Banner — rotating, full width, shown on all sizes */}
      <FeaturedSlot variant="banner" count={1} intervalMs={5000} offset={0} className="mb-2" />

      {/* Horizontal Tabs Switcher */}
      <div className="flex items-center border-b border-white/10 font-mono text-[11px] font-bold uppercase tracking-[0.12em]">
        {[
          { id: 'all', label: 'All Programs' },
          { id: 'accelerators', label: 'Accelerators' },
          { id: 'incubators', label: 'Incubators' },
          { id: 'grants', label: 'Grants' }
        ].map((tab) => {
          const isActive = activeType === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => handleTypeSelect(tab.id as any)}
              className={`px-5 py-3 border-b-2 transition-all relative ${
                isActive
                  ? 'border-accent-yellow text-accent-yellow font-black'
                  : 'border-transparent text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Main layout with Right Rail */}
      <div className="flex gap-5 lg:gap-6 items-start">
        {/* Left/Main Column: Filters & Grid */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <ProgramsFilterBar
            activeType={activeType}
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />
          <ProgramsGrid activeType={activeType} filters={filters} initialIsPro={initialIsPro} />
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
