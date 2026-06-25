'use client'

import { useState, useEffect, useRef } from 'react'
import type { ProgramType } from './ProgramsSidebar'

interface ProgramFilterState {
  search: string
  region: string
  subtype: string
  sort: string
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

export default function ProgramsFilterBar({ activeType, onFilterChange, currentFilters }: ProgramsFilterBarProps) {
  const [filters, setFilters] = useState<ProgramFilterState>(
    currentFilters || { search: '', region: 'All', subtype: 'All', sort: 'name' }
  )
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (currentFilters && !isInitialMount.current) setFilters(currentFilters)
  }, [currentFilters])

  useEffect(() => {
    if (isInitialMount.current) { isInitialMount.current = false; return }
    const t = setTimeout(() => onFilterChange?.(filters), 100)
    return () => clearTimeout(t)
  }, [filters.search, filters.region, filters.subtype, filters.sort])

  // Reset subtype/sort when type changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, region: 'All', subtype: 'All', sort: 'name' }))
  }, [activeType])

  const handleChange = (key: keyof ProgramFilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({ search: '', region: 'All', subtype: 'All', sort: 'name' })
  }

  const activeCount = [
    filters.search,
    filters.region !== 'All' ? filters.region : '',
    filters.subtype !== 'All' ? filters.subtype : '',
    filters.sort !== 'name' ? filters.sort : '',
  ].filter(Boolean).length

  const sortOptions = SORT_OPTIONS[activeType] || SORT_OPTIONS['all']

  const quickChips = [
    { label: 'AI & ML', value: 'AI' },
    { label: 'Fintech', value: 'Fintech' },
    { label: 'Climate Tech', value: 'Climate' },
    { label: 'Health Tech', value: 'Health' },
    { label: 'Web3', value: 'Web3' },
    { label: 'SaaS', value: 'SaaS' },
    { label: 'Consumer', value: 'Consumer' },
    { label: 'Deep Tech', value: 'Deep Tech' }
  ]

  const selectClass =
    'h-9 w-full appearance-none border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0c0c0c] pl-2.5 pr-7 text-[12px] text-gray-750 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-yellow/40 focus:border-accent-yellow cursor-pointer hover:border-gray-300 dark:hover:border-white/20 transition-colors font-medium'

  const searchPlaceholders: Record<ProgramType, string> = {
    all: 'Search programs by name, keyword, or focus area…',
    accelerators: 'Search accelerators by name, location, or focus area…',
    incubators: 'Search incubators by name, location, or focus area…',
    grants: 'Search grants by name, organization, or category…',
  }

  return (
    <div className="relative bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl p-2.5 md:p-3.5 sticky top-14 md:top-20 z-30 shadow-sm overflow-hidden transition-colors duration-300">
      {/* Decorative mandala */}
      <div className="absolute -top-10 -right-10 w-32 h-32 pointer-events-none opacity-[0.03]" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow filterbar-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
          <circle cx="100" cy="100" r="40" />
          <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + Math.cos((i * Math.PI) / 4) * 80}
              y2={100 + Math.sin((i * Math.PI) / 4) * 80}
            />
          ))}
          <circle cx="100" cy="100" r="2" fill="currentColor" />
        </svg>
      </div>

      <div className="relative">
        {/* Search */}
        <div className="relative mb-2">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px] pointer-events-none">search</span>
          <input
            className="w-full h-9 pl-10 pr-9 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-yellow/40 focus:border-accent-yellow text-[12.5px] bg-gray-50 dark:bg-white/5 hover:bg-white focus:bg-white dark:focus:bg-[#0c0c0c] transition-colors placeholder:text-gray-455 dark:placeholder:text-gray-500 dark:text-white"
            placeholder={searchPlaceholders[activeType]}
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            aria-label="Search programs"
          />
          {filters.search && (
            <button
              onClick={() => handleChange('search', '')}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Dropdowns row - 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
          {/* Region */}
          <div className="relative">
            <select
              className={selectClass}
              value={filters.region}
              onChange={(e) => handleChange('region', e.target.value)}
              aria-label="Filter by region"
            >
              {REGION_OPTIONS.map(r => <option key={r} value={r}>{r === 'All' ? 'All Regions' : r}</option>)}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">expand_more</span>
          </div>

          {/* Subtype Focus / Grant Type */}
          <div className="relative">
            <select
              className={selectClass}
              value={filters.subtype}
              onChange={(e) => handleChange('subtype', e.target.value)}
              aria-label={activeType === 'grants' || activeType === 'all' ? 'Filter by grant type' : 'Filter by focus area'}
            >
              {(activeType === 'grants' || activeType === 'all' ? GRANT_TYPE_OPTIONS : ['All', 'B2B', 'B2C', 'Deep Tech', 'Climate', 'Fintech', 'AI']).map(t => (
                <option key={t} value={t}>{t === 'All' ? (activeType === 'grants' || activeType === 'all' ? 'All Categories' : 'All Focus') : t}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">expand_more</span>
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              className={selectClass}
              value={filters.sort}
              onChange={(e) => handleChange('sort', e.target.value)}
              aria-label="Sort programs"
            >
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">expand_more</span>
          </div>

          {/* Dummy Stage filter to align with reference design "All Stages" */}
          <div className="relative">
            <select
              className={selectClass}
              defaultValue="All"
              aria-label="Filter by stage"
            >
              <option value="All">All Stages</option>
              <option value="Idea">Idea Stage</option>
              <option value="MVP">MVP / Seed</option>
              <option value="Growth">Growth</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">expand_more</span>
          </div>
        </div>

        {/* Quick chips & controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto mobile-scroll-hide">
          <span className="hidden md:inline-flex font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-gray-500 mr-1 flex-shrink-0">Popular:</span>
          {quickChips.map(chip => {
            const isActive = filters.search.toLowerCase() === chip.value.toLowerCase()
            return (
              <button
                key={chip.label}
                onClick={() => handleChange('search', isActive ? '' : chip.value)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? 'bg-accent-yellow text-black shadow-sm font-bold'
                    : 'bg-gray-50 dark:bg-white/5 text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 hover:border-gray-350 dark:hover:border-white/20 hover:text-white'
                }`}
              >
                {chip.label}
              </button>
            )
          })}
          {activeCount > 0 && (
            <button
              onClick={resetFilters}
              className="ml-auto px-2.5 py-1 text-[11px] font-semibold rounded-full text-red-500 hover:bg-red-950/20 transition-colors whitespace-nowrap flex-shrink-0 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
              Clear all
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes filterBarMandalaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        :global(.filterbar-mandala-spin) {
          animation: filterBarMandalaSpin 70s linear infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.filterbar-mandala-spin) { animation: none; }
        }
      `}</style>
    </div>
  )
}

