'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { studentBenefits2026 } from '@/data/student-benefits-2026'
import { isStudentCatalogEligibility } from '@/lib/catalog-segregation'
import {
  matchesStudentBenefitType,
  type StudentBenefitType,
} from './student-benefit-types'

interface StudentBenefitsFilterState {
  search: string
  category: string
  subtype: string
  sort: string
  region: string
}

interface StudentBenefitsFilterBarProps {
  activeType: StudentBenefitType
  onFilterChange?: (filters: StudentBenefitsFilterState) => void
  currentFilters?: StudentBenefitsFilterState
}

const REGION_OPTIONS = ['All', 'Global', 'US', 'Europe']

const FUNDING_SUBTYPES = [
  'All',
  'Grant',
  'Scholarship',
  'Competition',
  'Investment',
  'Fellowship',
]

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'value-high', label: 'Value (High→Low)' },
  { value: 'alphabetical', label: 'Name (A–Z)' },
]

export type { StudentBenefitsFilterState }

export default function StudentBenefitsFilterBar({
  activeType,
  onFilterChange,
  currentFilters,
}: StudentBenefitsFilterBarProps) {
  const [filters, setFilters] = useState<StudentBenefitsFilterState>(
    currentFilters || {
      search: '',
      category: 'All',
      subtype: 'All',
      sort: 'relevance',
      region: 'All',
    }
  )
  const isInitialMount = useRef(true)

  const categories = useMemo(() => {
    const subset = studentBenefits2026.filter(
      (b) =>
        isStudentCatalogEligibility(b.eligibility) && matchesStudentBenefitType(b, activeType)
    )
    const unique = Array.from(new Set(subset.map((b) => b.category)))
      .filter(Boolean)
      .sort()
    return ['All', ...unique]
  }, [activeType])

  useEffect(() => {
    if (currentFilters && !isInitialMount.current) setFilters(currentFilters)
  }, [currentFilters])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    const t = setTimeout(() => onFilterChange?.(filters), 100)
    return () => clearTimeout(t)
  }, [filters.search, filters.category, filters.subtype, filters.sort, filters.region])

  const lastActiveType = useRef(activeType)
  useEffect(() => {
    if (lastActiveType.current !== activeType) {
      lastActiveType.current = activeType
      setFilters((prev) => ({ ...prev, category: 'All', subtype: 'All', region: 'All' }))
    }
  }, [activeType])

  const handleChange = (key: keyof StudentBenefitsFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      subtype: 'All',
      sort: 'relevance',
      region: 'All',
    })
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
    {
      label: 'Highest value',
      active: filters.sort === 'value-high',
      action: () => handleChange('sort', 'value-high'),
    },
    {
      label: 'Global',
      active: filters.region === 'Global',
      action: () => handleChange('region', 'Global'),
    },
    {
      label: 'US Only',
      active: filters.region === 'US',
      action: () => handleChange('region', 'US'),
    },
    ...(activeType === 'funding' || activeType === 'all'
      ? [
          {
            label: 'Grants',
            active: filters.subtype === 'Grant',
            action: () => handleChange('subtype', 'Grant'),
          },
        ]
      : []),
    ...(activeType === 'credits-savings' || activeType === 'all'
      ? [
          {
            label: 'Free forever',
            active: filters.search.toLowerCase() === 'free',
            action: () => handleChange('search', 'free'),
          },
        ]
      : []),
  ]

  const selectClass =
    'h-10 w-full appearance-none rounded-lg border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-white/[0.03] pl-3 pr-9 text-[12px] font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-accent-yellow/50 focus:border-accent-yellow/40 cursor-pointer hover:border-black/10 dark:hover:border-white/15 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'

  const searchPlaceholders: Record<StudentBenefitType, string> = {
    all: 'Search student discounts, licenses, opportunities…',
    'free-access': 'Search free software, apps & student licenses…',
    'credits-savings': 'Search credits, free months & subscription savings…',
    funding: 'Search grants, scholarships, student fellowships…',
    programs: 'Search student programs, fellowships & residencies…',
  }

  return (
    <div className="relative bg-white dark:bg-[#0c0c0c] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-3 md:p-3.5 sticky top-14 md:top-20 z-30 shadow-sm overflow-hidden transition-colors duration-300">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/30 to-transparent"
      />

      <div className="relative">
        <div className="relative mb-2.5">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px] pointer-events-none">
            search
          </span>
          <input
            className="w-full h-10 pl-10 pr-9 rounded-lg border border-black/[0.06] dark:border-white/[0.08] focus:outline-none focus:ring-1 focus:ring-accent-yellow/50 focus:border-accent-yellow/40 text-[12.5px] bg-gray-50/80 dark:bg-white/[0.03] hover:bg-white focus:bg-white dark:focus:bg-[#0c0c0c] transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:text-white"
            placeholder={searchPlaceholders[activeType]}
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            aria-label="Search student benefits"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => handleChange('search', '')}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2.5">
          <div className="relative">
            <select
              className={selectClass}
              value={filters.category}
              onChange={(e) => handleChange('category', e.target.value)}
              aria-label="Filter by category"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Categories' : c}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">
              expand_more
            </span>
          </div>

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
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">
              expand_more
            </span>
          </div>

          <div className="relative">
            <select
              className={selectClass}
              value={filters.subtype}
              disabled={activeType !== 'funding' && activeType !== 'all'}
              onChange={(e) => handleChange('subtype', e.target.value)}
              aria-label="Filter by opportunity type"
            >
              {FUNDING_SUBTYPES.map((t) => (
                <option key={t} value={t}>
                  {t === 'All' ? 'All Opps' : t}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">
              expand_more
            </span>
          </div>

          <div className="relative">
            <select
              className={selectClass}
              value={filters.sort}
              onChange={(e) => handleChange('sort', e.target.value)}
              aria-label="Sort student benefits"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto mobile-scroll-hide">
          <span className="hidden md:inline-flex font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 mr-1 flex-shrink-0">
            Quick:
          </span>
          {quickChips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={chip.action}
              className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
                chip.active
                  ? 'bg-gray-900 dark:bg-accent-yellow text-white dark:text-black shadow-sm'
                  : 'bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-black/[0.06] dark:border-white/10 hover:bg-white dark:hover:bg-white/10 hover:border-black/10 dark:hover:border-white/20'
              }`}
            >
              {chip.label}
            </button>
          ))}
          {activeCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="ml-auto px-2.5 py-1.5 text-[11px] font-semibold rounded-full text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors whitespace-nowrap flex-shrink-0 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
              Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
