'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import { replaceUrlQuiet } from '@/lib/url-sync'
import { m, useReducedMotion } from 'framer-motion'
import type { ProgramType } from './program-type'
import ProgramsFilterBar, { ProgramFilterState } from './ProgramsFilterBar'
import { FadeUp } from '@/components/ui/premium-motion'
import { getStaticProgramCounts } from '@/lib/programs-catalog'

/** Single promote CTA — premium, minimal. Links to homepage advertise section. */
const activeLabel: Record<ProgramType, string> = {
  all: 'All Programs',
  accelerators: 'Accelerators',
  incubators: 'Incubators',
  grants: 'Grants',
}

function ProgramsPromoteBanner() {
  const reduce = useReducedMotion()
  return (
    <Link
      href="/#advertise"
      className="group relative mb-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-gradient-to-br from-white via-white to-amber-50/50 dark:from-[#0c0c0c] dark:via-[#0a0a0a] dark:to-[#14110a] px-4 py-4 md:px-5 md:py-4.5 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_10px_28px_rgba(0,0,0,0.06)] hover:border-accent-yellow/40 dark:hover:border-accent-yellow/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-accent-yellow/15 dark:bg-accent-yellow/[0.08] blur-2xl group-hover:bg-accent-yellow/25 transition-colors"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/40 to-transparent"
      />
      {!reduce && (
        <m.div
          aria-hidden
          className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent skew-x-12"
          animate={{ x: ['0%', '350%'] }}
          transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
        />
      )}

      <div className="relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-black/[0.06] dark:border-white/10 bg-accent-yellow/20 dark:bg-accent-yellow/10 shadow-sm">
        <m.span
          className="material-symbols-outlined text-amber-700 dark:text-accent-yellow !text-[22px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
          animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          campaign
        </m.span>
      </div>

      <div className="relative z-10 min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-amber-700/90 dark:text-accent-yellow/90">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-yellow opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-yellow" />
            </span>
            Ad spot open · 1 placement
          </span>
        </div>
        <p className="font-mono text-[13px] md:text-[15px] font-bold tracking-tight text-gray-900 dark:text-white leading-snug">
          Promote your program to active founders
        </p>
        <p className="mt-0.5 text-[11.5px] text-gray-500 dark:text-gray-400 line-clamp-2 sm:line-clamp-1">
          Single featured banner on this directory — no empty multi-slot clutter. Claim via homepage submission.
        </p>
      </div>

      <span className="relative z-10 inline-flex items-center justify-center gap-1.5 self-start sm:self-center rounded-xl bg-gray-900 dark:bg-accent-yellow text-white dark:text-black font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.08em] px-4 py-2.5 border border-black/10 dark:border-transparent group-hover:bg-black dark:group-hover:bg-amber-300 transition-colors whitespace-nowrap shadow-sm">
        Get featured
        <span className="material-symbols-outlined !text-[14px] group-hover:translate-x-0.5 transition-transform">
          arrow_forward
        </span>
      </span>
    </Link>
  )
}

// Load grid with SSR so first paint already has the catalog (no skeleton → shuffle).
const ProgramsGrid = dynamic(() => import('./ProgramsGrid'), {
  ssr: true,
  loading: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }, (_, i) => `prog-skel-${i}`).map((id) => (
        <div
          key={id}
          className="h-64 rounded-lg border border-white/10 bg-[#0b0b0b] animate-pulse"
        />
      ))}
    </div>
  ),
})

const DEFAULT_FILTERS: ProgramFilterState = {
  search: '',
  region: 'All',
  subtype: 'All',
  sort: 'name',
  stage: 'All',
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
      stage: params.get('stage') || 'All',
    },
  }
}

export default function ProgramsContent({ initialIsPro, initialType, initialFilters }: { initialIsPro?: boolean; initialType?: ProgramType; initialFilters?: ProgramFilterState }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const reduceMotion = useReducedMotion()

  const initial = readFromUrl(new URLSearchParams(searchParams.toString()))
  const [activeType, setActiveType] = useState<ProgramType>(initialType || initial.type)
  const [filters, setFilters] = useState<ProgramFilterState>(initialFilters || initial.filters)

  const lastWrittenUrlRef = useRef<string | null>(null)
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
    writeOrDelete('stage', filters.stage, 'All')

    const next = params.toString()
    lastWrittenUrlRef.current = next
    const url = next ? `${pathname}?${next}` : pathname
    replaceUrlQuiet(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeType, filters.search, filters.region, filters.subtype, filters.sort, filters.stage])

  // Sync URL → state (browser back/forward)
  useEffect(() => {
    const current = searchParams.toString()
    if (lastWrittenUrlRef.current !== null && current === lastWrittenUrlRef.current) return
    lastWrittenUrlRef.current = current
    const { type, filters: fromUrl } = readFromUrl(new URLSearchParams(current))
    setActiveType(type)
    setFilters(prev => {
      if (
        prev.search === fromUrl.search &&
        prev.region === fromUrl.region &&
        prev.subtype === fromUrl.subtype &&
        prev.sort === fromUrl.sort &&
        prev.stage === fromUrl.stage
      ) return prev
      return fromUrl
    })
  }, [searchParams])

  const handleTypeSelect = useCallback((type: ProgramType) => {
    setActiveType(type)
    // Reset subtype-specific filter when switching types
    setFilters(prev => ({ ...prev, subtype: 'All' }))
  }, [])

  const handleFilterChange = useCallback((newFilters: ProgramFilterState) => {
    setFilters(newFilters)
  }, [])


  // Static baseline counts; grid merges Supabase programs on the client
  const staticCounts = getStaticProgramCounts()
  const [accsCount, setAccsCount] = useState(staticCounts.accelerators)
  const [incsCount, setIncsCount] = useState(staticCounts.incubators)
  const [grtsCount, setGrtsCount] = useState(staticCounts.grants)
  const totalCount = accsCount + incsCount + grtsCount

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/deals?scope=programs')
        const data = await res.json()
        if (!data?.success || !Array.isArray(data.deals) || cancelled) return
        const { fromSupabaseProgram, mergePrograms, getStaticPrograms } = await import(
          '@/lib/programs-catalog'
        )
        const remote = data.deals.flatMap((d: any) => {
          const row = fromSupabaseProgram(d)
          return row ? [row] : []
        })
        const merged = mergePrograms(getStaticPrograms(), remote as any)
        if (cancelled) return
        setAccsCount(merged.filter((p) => p.type === 'accelerator').length)
        setIncsCount(merged.filter((p) => p.type === 'incubator').length)
        setGrtsCount(merged.filter((p) => p.type === 'grant').length)
      } catch {
        /* keep static */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
      <FadeUp delay={0.02}>
        <ProgramsPromoteBanner />
      </FadeUp>

      {/* Tabs — animated active underline */}
      <FadeUp delay={0.06}>
        <div className="relative">
          <div
            className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-gray-50 dark:from-[#000000] to-transparent pointer-events-none z-10 lg:hidden"
            aria-hidden="true"
          />
          <div
            role="tablist"
            className="flex items-center border-b border-black/[0.06] dark:border-white/10 font-mono text-[11px] font-bold uppercase tracking-[0.12em] overflow-x-auto whitespace-nowrap mobile-scroll-hide pr-12 lg:pr-0"
          >
            {[
              { id: 'all', label: 'All Programs', count: totalCount },
              { id: 'accelerators', label: 'Accelerators', count: accsCount },
              { id: 'incubators', label: 'Incubators', count: incsCount },
              { id: 'grants', label: 'Grants', count: grtsCount },
            ].map((tab) => {
              const isActive = activeType === tab.id
              return (
                <button type="button"
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTypeSelect(tab.id as ProgramType)}
                  className={`relative flex-shrink-0 px-5 py-3 transition-colors duration-300 inline-flex items-center gap-2 ${
                    isActive
                      ? 'text-accent-yellow font-black'
                      : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold leading-none transition-colors ${
                      isActive
                        ? 'bg-accent-yellow/20 text-accent-yellow'
                        : 'bg-black/[0.04] dark:bg-white/5 text-gray-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                  {isActive && !reduceMotion && (
                    <m.span
                      layoutId="programs-tab-underline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent-yellow rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {isActive && reduceMotion && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent-yellow rounded-full" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </FadeUp>

      {/* Filters + grid with soft panel cross-fade on type change */}
      <div className="flex flex-col gap-4 min-w-0">
        <FadeUp delay={0.1}>
          <ProgramsFilterBar
            activeType={activeType}
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />
        </FadeUp>

        {/* Soft fade on tab change only — no exit/enter scale that reshuffles cards */}
        <div key={activeType} className="min-w-0">
          <ProgramsGrid
            activeType={activeType}
            filters={filters}
            initialIsPro={initialIsPro}
          />
        </div>
      </div>
    </div>
  )
}
