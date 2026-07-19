'use client'

import { useState, useEffect, useRef } from 'react'
import type { ProgramType } from './program-type'

interface ProgramFilterState {
  search: string
  region: string
  subtype: string
  sort: string
  stage: string
}

interface ProgramsFilterBarProps {
  activeType: ProgramType
  onFilterChange?: (filters: ProgramFilterState) => void
  currentFilters?: ProgramFilterState
}

const REGION_OPTIONS = [
  'All',
  'Global',
  'North America',
  'Europe',
  'Southeast Asia',
  'India',
  'MENA',
  'Africa',
  'LatAm',
  'Oceania',
]

const GRANT_TYPE_OPTIONS = [
  'All',
  'Government',
  'Corporate',
  'Foundation',
  'Competition',
  'State/Regional',
]

const STAGE_OPTIONS = [
  { value: 'All', label: 'All Stages' },
  { value: 'Idea', label: 'Idea Stage' },
  { value: 'MVP', label: 'MVP / Seed' },
  { value: 'Growth', label: 'Growth' },
]

const SORT_OPTIONS: Record<ProgramType, { value: string; label: string }[]> = {
  all: [
    { value: 'name', label: 'Name (A–Z)' },
    { value: 'investment-high', label: 'Investment · High–Low' },
    { value: 'status', label: 'Application Status' },
  ],
  accelerators: [
    { value: 'name', label: 'Name (A–Z)' },
    { value: 'investment-high', label: 'Investment · High–Low' },
    { value: 'equity-low', label: 'Equity · Low–High' },
    { value: 'status', label: 'Application Status' },
  ],
  incubators: [
    { value: 'name', label: 'Name (A–Z)' },
    { value: 'status', label: 'Application Status' },
  ],
  grants: [
    { value: 'name', label: 'Name (A–Z)' },
    { value: 'funding-high', label: 'Funding · High–Low' },
    { value: 'status', label: 'Application Status' },
  ],
}

export type { ProgramFilterState }

const DEFAULT: ProgramFilterState = {
  search: '',
  region: 'All',
  subtype: 'All',
  sort: 'name',
  stage: 'All',
}

const quickChips = [
  { label: 'AI & ML', value: 'AI' },
  { label: 'Fintech', value: 'Fintech' },
  { label: 'Climate Tech', value: 'Climate' },
  { label: 'Health Tech', value: 'Health' },
  { label: 'Web3', value: 'Web3' },
  { label: 'SaaS', value: 'SaaS' },
  { label: 'Consumer', value: 'Consumer' },
  { label: 'Deep Tech', value: 'Deep Tech' },
]


const searchPlaceholders: Record<ProgramType, string> = {
  all: 'Search programs by name, keyword, or focus area…',
  accelerators: 'Search accelerators by name, location, or focus area…',
  incubators: 'Search incubators by name, location, or focus area…',
  grants: 'Search grants by name, organization, or category…',
}

export default function ProgramsFilterBar({
  activeType,
  onFilterChange,
  currentFilters,
}: ProgramsFilterBarProps) {
  const [filters, setFilters] = useState<ProgramFilterState>({
    ...DEFAULT,
    ...currentFilters,
  })
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (currentFilters && !isInitialMount.current) {
      setFilters((prev) => ({ ...DEFAULT, ...prev, ...currentFilters }))
    }
  }, [currentFilters])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    const t = setTimeout(() => onFilterChange?.(filters), 100)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.region, filters.subtype, filters.sort, filters.stage])

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      region: 'All',
      subtype: 'All',
      sort: 'name',
      stage: 'All',
    }))
  }, [activeType])

  const handleChange = (key: keyof ProgramFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => setFilters({ ...DEFAULT })

  const activeCount = [
    filters.search,
    filters.region !== 'All' ? filters.region : '',
    filters.subtype !== 'All' ? filters.subtype : '',
    filters.sort !== 'name' ? filters.sort : '',
    filters.stage !== 'All' ? filters.stage : '',
  ].filter(Boolean).length

  const sortOptions = SORT_OPTIONS[activeType] || SORT_OPTIONS.all


  const selectClass =
    'h-10 w-full appearance-none rounded-lg border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-white/[0.03] pl-3 pr-9 text-[12px] font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-accent-yellow/50 focus:border-accent-yellow/40 cursor-pointer hover:border-black/10 dark:hover:border-white/15 transition-colors'


  return (
    <div className="relative sticky top-14 md:top-20 z-30 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden transition-colors duration-300">
      {/* subtle top highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"
        aria-hidden
      />

      <div className="relative p-3 md:p-4 space-y-3">
        {/* Search */}
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-yellow text-[18px] pointer-events-none transition-colors">
            search
          </span>
          <input
            className="w-full h-11 pl-11 pr-10 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-gray-50/80 dark:bg-white/[0.03] text-[13px] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-accent-yellow/50 focus:border-accent-yellow/40 focus:bg-white dark:focus:bg-white/[0.05] transition-all"
            placeholder={searchPlaceholders[activeType]}
            type="search"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            aria-label="Search programs"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => handleChange('search', '')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="relative">
            <select
              className={selectClass}
              value={filters.region}
              onChange={(e) => handleChange('region', e.target.value)}
              aria-label="Filter by region"
            >
              {REGION_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r === 'All' ? 'All Regions' : r}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">
              expand_more
            </span>
          </div>

          <div className="relative">
            <select
              className={selectClass}
              value={filters.subtype}
              onChange={(e) => handleChange('subtype', e.target.value)}
              aria-label={
                activeType === 'grants' || activeType === 'all'
                  ? 'Filter by grant type'
                  : 'Filter by focus area'
              }
            >
              {(activeType === 'grants' || activeType === 'all'
                ? GRANT_TYPE_OPTIONS
                : ['All', 'B2B', 'B2C', 'Deep Tech', 'Climate', 'Fintech', 'AI']
              ).map((t) => (
                <option key={t} value={t}>
                  {t === 'All'
                    ? activeType === 'grants' || activeType === 'all'
                      ? 'All Categories'
                      : 'All Focus'
                    : t}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">
              expand_more
            </span>
          </div>

          <div className="relative">
            <select
              className={selectClass}
              value={filters.sort}
              onChange={(e) => handleChange('sort', e.target.value)}
              aria-label="Sort programs"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">
              expand_more
            </span>
          </div>

          <div className="relative">
            <select
              className={selectClass}
              value={filters.stage}
              onChange={(e) => handleChange('stage', e.target.value)}
              aria-label="Filter by stage"
            >
              {STAGE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Popular chips */}
        <div className="flex items-center gap-2 pt-0.5 border-t border-black/[0.04] dark:border-white/[0.05]">
          <span className="hidden sm:inline-flex font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500 flex-shrink-0">
            Popular
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto mobile-scroll-hide flex-1 min-w-0 py-0.5">
            {quickChips.map((chip) => {
              const isActive = filters.search.toLowerCase() === chip.value.toLowerCase()
              return (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => handleChange('search', isActive ? '' : chip.value)}
                  className={`px-3 py-1.5 text-[11px] font-medium rounded-full transition-all whitespace-nowrap flex-shrink-0 border ${
                    isActive
                      ? 'bg-accent-yellow text-black border-accent-yellow shadow-[0_0_0_1px_rgba(0,0,0,0.04)] font-semibold'
                      : 'bg-transparent text-gray-500 dark:text-gray-400 border-black/[0.06] dark:border-white/[0.08] hover:border-black/15 dark:hover:border-white/20 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {chip.label}
                </button>
              )
            })}
          </div>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-full text-red-500/90 hover:bg-red-500/10 transition-colors whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
