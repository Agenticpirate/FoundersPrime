// @ts-nocheck
'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import DealCard from './DealCard'
import { incubators2026, Incubator } from '@/data/incubators-2026'
import { useAuth } from '@/lib/auth/hooks'
import { checkProStatus } from '@/lib/auth/user-context'
import ProGateOverlay from '@/components/ProGateOverlay'
import { StaggerGrid, StaggerGridItem } from '@/components/ui/premium-motion'

export default function IncubatorsGrid() {
  const { user } = useAuth()
  const [isPro, setIsPro] = useState(false)

  useEffect(() => {
    const checkAccess = async () => {
      if (user) {
        const { isPro: hasProAccess } = await checkProStatus()
        setIsPro(hasProAccess)
      } else {
        setIsPro(false)
      }
    }
    checkAccess()
  }, [user])

  const [filterRegion, setFilterRegion] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const regions = ['All', 'Global', 'North America', 'India', 'Europe', 'Southeast Asia', 'MENA', 'Africa', 'LatAm', 'Oceania']

  const filteredDeals = useMemo(() => {
    let results = incubators2026

    if (filterRegion !== 'All') {
      results = results.filter((inc) => inc.region === filterRegion || inc.region === 'Global')
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      results = results.filter(
        (inc) =>
          inc.name.toLowerCase().includes(q) ||
          inc.location.toLowerCase().includes(q) ||
          inc.focusArea.toLowerCase().includes(q) ||
          inc.description.toLowerCase().includes(q)
      )
    }

    return results
  }, [filterRegion, searchQuery])

  const handleClearFilters = useCallback(() => {
    setFilterRegion('All')
    setSearchQuery('')
  }, [])

  const hasActiveFilters = filterRegion !== 'All' || searchQuery.trim() !== ''

  // Helper to convert Incubator to DealCard format
  const convertToCard = (inc: Incubator) => {
    return {
      id: inc.slug,
      logo: inc.logo || '',
      category: 'Incubator',
      badge: inc.applicationStatus === 'Active' ? 'Applications Open' : inc.applicationStatus,
      badgeColor: inc.applicationStatus === 'Active' ? 'bg-amber-600' : 'bg-gray-500',
      title: inc.name,
      provider: inc.name,
      value: inc.support,
      valueSubtext: inc.equity === '0% (Equity-free)' ? 'Equity Free' : inc.equity,
      valueStyle: 'bg-white text-ink border-2 border-ink',
      description: inc.description,
      eligibility: inc.founderStage,
      validFor: inc.applicationDeadline ? `Deadline: ${inc.applicationDeadline}` : inc.applicationStatus,
      applicationUrl: inc.website,
      verified: true,
    }
  }

  return (
    <div className="w-full">
      {/* ─── Premium Toolbar ─── */}
      <div className="relative bg-white border-2 border-black shadow-[3px_3px_0px_#111] rounded-sm overflow-hidden mb-4">
        {/* Decorative mandala */}
        <div className="absolute -top-12 -right-12 w-44 h-44 pointer-events-none opacity-[0.05]" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="w-full h-full text-violet-700 incub-toolbar-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
            <circle cx="100" cy="100" r="40" />
            <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
            <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 100 100)`}>
                <line x1="100" y1="40" x2="100" y2="20" />
                <circle cx="100" cy="20" r="2" fill="currentColor" />
              </g>
            ))}
            <circle cx="100" cy="100" r="3" fill="currentColor" />
          </svg>
        </div>

        <div className="relative p-3 md:p-4">
          {/* Header row — title + count */}
          <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b-2 border-black border-dashed">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="inline-flex items-center justify-center w-7 h-7 bg-violet-100 border-2 border-black rounded-sm shadow-[1px_1px_0px_#111] flex-shrink-0">
                <span className="material-symbols-outlined !text-[14px] text-violet-700">lightbulb</span>
              </span>
              <div className="min-w-0">
                <h2 className="font-mono text-[13px] md:text-sm font-black uppercase tracking-[0.06em] text-black leading-none truncate">
                  Top Programs
                </h2>
                <p className="font-mono text-[10px] text-gray-500 mt-1 leading-none flex items-center gap-1.5">
                  <span className="font-bold text-black tabular-nums">{filteredDeals.length}</span>
                  <span className="text-gray-400">·</span>
                  Verified directory &middot; refreshed weekly
                </p>
              </div>
            </div>
          </div>

          {/* Search row */}
          <div className="mb-3">
            <div className="relative w-full">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <span className="material-symbols-outlined !text-[16px] text-gray-400">search</span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, location, or focus area..."
                className="w-full pl-10 pr-10 py-2.5 font-mono text-[12.5px] bg-white border-2 border-black rounded-sm outline-none transition-all duration-200 placeholder:text-gray-400 shadow-[2px_2px_0px_#111] focus:shadow-[3px_3px_0px_#FFD500] focus:translate-x-[-1px] focus:translate-y-[-1px]"
                aria-label="Search incubators"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-6 h-6 rounded-sm border border-black bg-white hover:bg-accent-yellow transition-colors"
                  aria-label="Clear search"
                >
                  <span className="material-symbols-outlined !text-[12px] text-black">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Region pills row */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-gray-500">Region</span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="flex gap-1.5 overflow-x-auto mobile-scroll-hide pb-0.5">
              {regions.map((region) => {
                const active = filterRegion === region
                return (
                  <button
                    key={region}
                    onClick={() => setFilterRegion(region)}
                    className={`px-2.5 py-1 font-mono text-[10.5px] font-black uppercase tracking-wider border-2 border-black rounded-sm whitespace-nowrap flex-shrink-0 transition-all ${
                      active
                        ? 'bg-black text-accent-yellow shadow-[2px_2px_0px_#FFD500]'
                        : 'bg-white text-black hover:bg-gray-50 hover:shadow-[2px_2px_0px_#111] hover:-translate-x-px hover:-translate-y-px'
                    }`}
                    aria-pressed={active}
                  >
                    {region}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active filters chip row */}
          {hasActiveFilters && (
            <div className="mt-3 pt-3 border-t border-dashed border-gray-300 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-gray-500">Active</span>
                {filterRegion !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-yellow border-2 border-black rounded-sm font-mono text-[10px] font-black uppercase tracking-wider">
                    {filterRegion}
                  </span>
                )}
                {searchQuery.trim() && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border-2 border-black rounded-sm font-mono text-[10px] font-black uppercase tracking-wider max-w-[200px] truncate">
                    &ldquo;{searchQuery}&rdquo;
                  </span>
                )}
              </div>
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1 px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-wider bg-white border-2 border-black rounded-sm shadow-[1px_1px_0px_#111] hover:bg-black hover:text-white transition-all"
                aria-label="Clear all filters"
              >
                <span className="material-symbols-outlined !text-[12px]">close</span>
                Clear all
              </button>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes incubToolbarMandalaSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          :global(.incub-toolbar-mandala-spin) {
            animation: incubToolbarMandalaSpin 110s linear infinite;
            transform-origin: center;
          }
          @media (prefers-reduced-motion: reduce) {
            :global(.incub-toolbar-mandala-spin) { animation: none; }
          }
        `}</style>
      </div>

      {/* Grid */}
      {filteredDeals.length > 0 ? (
        <div>
          <StaggerGrid
            animKey={`incub-${isPro}-${filteredDeals.length}`}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4"
          >
            {(isPro ? filteredDeals : filteredDeals.slice(0, 3)).map((inc) => (
              <StaggerGridItem key={inc.id}>
                <DealCard
                  deal={convertToCard(inc)}
                  overrideHref={isPro ? undefined : '/pricing'}
                />
              </StaggerGridItem>
            ))}
          </StaggerGrid>

          {!isPro && filteredDeals.length > 3 && (
            <ProGateOverlay
              totalCount={filteredDeals.length}
              visibleCount={3}
              label="Incubators"
            >
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                {filteredDeals.slice(3, 9).map((inc) => (
                  <DealCard key={inc.id} deal={convertToCard(inc)} />
                ))}
              </div>
            </ProGateOverlay>
          )}
        </div>
      ) : (
        <div className="text-center py-8 bg-white border-2 border-black border-dashed rounded-sm">
          <span className="material-symbols-outlined !text-[32px] text-gray-400 mb-2 block">search_off</span>
          <p className="font-mono text-sm font-black uppercase text-black mb-1">No programs found</p>
          <p className="font-mono text-[12px] text-gray-500 max-w-sm mx-auto mb-3">
            Try adjusting your filters or search query
          </p>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono font-black text-[11px] uppercase tracking-wider px-4 py-2 border-2 border-black rounded-sm shadow-[2px_2px_0px_#111] hover:bg-amber-300 hover:shadow-[3px_3px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}
