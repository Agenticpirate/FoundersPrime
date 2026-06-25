'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { studentBenefits2026 } from '@/data/student-benefits-2026'
import type { StudentBenefitType } from './StudentBenefitsSidebar'

interface StudentBenefitsFilterState {
  search: string
  category: string
  subtype: string // represents funding subtype like Grant, Fellowship etc.
  sort: string
  region: string
}

interface StudentBenefitsFilterBarProps {
  activeType: StudentBenefitType
  onFilterChange?: (filters: StudentBenefitsFilterState) => void
  currentFilters?: StudentBenefitsFilterState
}

const REGION_OPTIONS = ['All', 'Global', 'US', 'Europe']

const FUNDING_SUBTYPES = ['All', 'Grant', 'Scholarship', 'Competition', 'Investment', 'Fellowship']

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'value-high', label: 'Value (High→Low)' },
  { value: 'alphabetical', label: 'Name (A–Z)' },
]

export type { StudentBenefitsFilterState }

export default function StudentBenefitsFilterBar({ activeType, onFilterChange, currentFilters }: StudentBenefitsFilterBarProps) {
  const [filters, setFilters] = useState<StudentBenefitsFilterState>(
    currentFilters || { search: '', category: 'All', subtype: 'All', sort: 'relevance', region: 'All' }
  )
  const isInitialMount = useRef(true)

  // Compute unique categories dynamically
  const categories = useMemo(() => {
    const subset = activeType === 'all'
      ? studentBenefits2026
      : studentBenefits2026.filter(b => {
          if (activeType === 'free-access') return b.appCategory === 'Software & Tools'
          if (activeType === 'credits-savings') return b.appCategory === 'Credits & Savings'
          if (activeType === 'funding') return b.appCategory === 'Funding & Opportunities'
          if (activeType === 'programs') return b.appCategory === 'Programs'
          return true
        })
    const unique = Array.from(new Set(subset.map(b => b.category))).filter(Boolean).sort()
    return ['All', ...unique]
  }, [activeType])

  useEffect(() => {
    if (currentFilters && !isInitialMount.current) setFilters(currentFilters)
  }, [currentFilters])

  useEffect(() => {
    if (isInitialMount.current) { isInitialMount.current = false; return }
    const t = setTimeout(() => onFilterChange?.(filters), 100)
    return () => clearTimeout(t)
  }, [filters.search, filters.category, filters.subtype, filters.sort, filters.region])

  const lastActiveType = useRef(activeType)
  // Reset filters when active type tab changes (but not on mount)
  useEffect(() => {
    if (lastActiveType.current !== activeType) {
      lastActiveType.current = activeType
      setFilters(prev => ({ ...prev, category: 'All', subtype: 'All', region: 'All' }))
    }
  }, [activeType])

  const handleChange = (key: keyof StudentBenefitsFilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({ search: '', category: 'All', subtype: 'All', sort: 'relevance', region: 'All' })
  }

  const activeCount = [
    filters.search,
    filters.category !== 'All' ? filters.category : '',
    filters.subtype !== 'All' ? filters.subtype : '',
    filters.region !== 'All' ? filters.region : '',
    filters.sort !== 'relevance' ? filters.sort : '',
  ].filter(Boolean).length

  const quickChips: { label: string; active: boolean; action: () => void }[] = [
    { label: 'All', active: activeCount === 0, action: resetFilters },
    { label: 'Global', active: filters.region === 'Global', action: () => handleChange('region', 'Global') },
    { label: 'US Only', active: filters.region === 'US', action: () => handleChange('region', 'US') },
    ...(activeType === 'funding' || activeType === 'all'
      ? [{ label: 'Grants', active: filters.subtype === 'Grant', action: () => handleChange('subtype', 'Grant') }]
      : []),
  ]

  const selectClass =
    'h-9 w-full appearance-none border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0c0c0c] pl-2.5 pr-7 text-[12px] text-gray-700 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-450/40 focus:border-cyan-500 cursor-pointer hover:border-gray-300 dark:hover:border-white/20 transition-colors font-medium'

  const searchPlaceholders: Record<StudentBenefitType, string> = {
    all: 'Search student discounts, licenses, opportunities by name or provider…',
    'free-access': 'Search software tools, apps & student licenses by name…',
    'credits-savings': 'Search credits & student subscription savings…',
    funding: 'Search grants, scholarships, student fellowships…',
    programs: 'Search student programs, fellowships & residencies…',
  }

  return (
    <div className="relative bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl p-3 md:p-3.5 sticky top-14 md:top-20 z-30 shadow-sm overflow-hidden transition-colors duration-300">
      {/* Decorative mandala */}
      <div className="absolute -top-10 -right-10 w-32 h-32 pointer-events-none opacity-[0.05]" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="w-full h-full text-cyan-700 dark:text-cyan-400 student-filterbar-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
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
        <div className="relative mb-2.5">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px] pointer-events-none">search</span>
          <input
            className="w-full h-9 pl-10 pr-9 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-450/40 focus:border-cyan-500 text-[12.5px] bg-gray-50 dark:bg-white/5 hover:bg-white focus:bg-white dark:focus:bg-[#0c0c0c] transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:text-white"
            placeholder={searchPlaceholders[activeType]}
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            aria-label="Search student benefits"
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

        {/* Dropdowns row */}
        <div className="grid grid-cols-4 gap-2 mb-2.5">
          {/* Category */}
          <div className="relative">
            <select
              className={selectClass}
              value={filters.category}
              onChange={(e) => handleChange('category', e.target.value)}
              aria-label="Filter by category"
            >
              {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">expand_more</span>
          </div>

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

          {/* Funding subtype (only shown if type is funding or all) */}
          <div className="relative">
            <select
              className={selectClass}
              value={filters.subtype}
              disabled={activeType !== 'funding' && activeType !== 'all'}
              onChange={(e) => handleChange('subtype', e.target.value)}
              aria-label="Filter by opportunity type"
            >
              {FUNDING_SUBTYPES.map(t => (
                <option key={t} value={t}>{t === 'All' ? 'All Opps' : t}</option>
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
              aria-label="Sort student benefits"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">expand_more</span>
          </div>
        </div>

        {/* Quick chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto mobile-scroll-hide">
          <span className="hidden md:inline-flex font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 mr-1 flex-shrink-0">Quick:</span>
          {quickChips.map(chip => (
            <button
              key={chip.label}
              onClick={chip.action}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
                chip.active
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-sm'
                  : 'bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {chip.label}
            </button>
          ))}
          {activeCount > 0 && (
            <button
              onClick={resetFilters}
              className="ml-auto px-2.5 py-1 text-[11px] font-semibold rounded-full text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors whitespace-nowrap flex-shrink-0 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
              Clear all
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes studentFilterBarMandalaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        :global(.student-filterbar-mandala-spin) {
          animation: studentFilterBarMandalaSpin 70s linear infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.student-filterbar-mandala-spin) { animation: none; }
        }
      `}</style>
    </div>
  )
}
