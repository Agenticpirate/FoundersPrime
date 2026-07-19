// @ts-nocheck
'use client'

import type { Grant } from '@/data/grants-2026'

type Props = {
  regions: string[]
  types: string[]
  selectedRegion: string
  selectedType: string
  searchQuery: string
  setSearchQuery: (v: string) => void
  filteredCount: number
  startIndex: number
  endIndex: number
  handleFilterChange: (setter: (val: string) => void, val: string) => void
  setSelectedRegion: (v: string) => void
  setSelectedType: (v: string) => void
  handlePageChange: (page: number) => void
}

export default function GrantsToolbar({
  regions,
  types,
  selectedRegion,
  selectedType,
  searchQuery,
  setSearchQuery,
  filteredCount,
  startIndex,
  endIndex,
  handleFilterChange,
  setSelectedRegion,
  setSelectedType,
  handlePageChange,
}: Props) {
  // local aliases for JSX that used filteredGrants.length
  const filteredGrants = { length: filteredCount }
  return (
    <>
      <div className="relative bg-white border-2 border-black shadow-[3px_3px_0px_#111] rounded-sm overflow-hidden">
        {/* Decorative mandala */}
        <div className="absolute -top-12 -right-12 w-44 h-44 pointer-events-none opacity-[0.05]" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="w-full h-full text-amber-800 grants-toolbar-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
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
          {/* Header row */}
          <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b-2 border-black border-dashed">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="inline-flex items-center justify-center w-7 h-7 bg-amber-100 border-2 border-black rounded-sm shadow-[1px_1px_0px_#111] flex-shrink-0">
                <span className="material-symbols-outlined !text-[14px] text-amber-800">payments</span>
              </span>
              <div className="min-w-0">
                <h2 className="font-mono text-[13px] md:text-sm font-black uppercase tracking-[0.06em] text-black leading-none truncate">
                  Grant Programs
                </h2>
                <p className="font-mono text-[10px] text-gray-500 mt-1 leading-none flex items-center gap-1.5">
                  <span className="font-bold text-black tabular-nums">{filteredGrants.length}</span>
                  <span className="text-gray-400">·</span>
                  {filteredGrants.length > 0 ? (
                    <span>showing {startIndex + 1}&ndash;{Math.min(endIndex, filteredGrants.length)}</span>
                  ) : (
                    <span>verified &amp; deadline-tracked</span>
                  )}
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
                placeholder="Search by grant, organization, or category..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  handlePageChange(1)
                }}
                className="w-full pl-10 pr-10 py-2.5 font-mono text-[12.5px] bg-white border-2 border-black rounded-sm outline-none transition-all duration-200 placeholder:text-gray-400 shadow-[2px_2px_0px_#111] focus:shadow-[3px_3px_0px_#FFD500] focus:translate-x-[-1px] focus:translate-y-[-1px]"
                aria-label="Search grants"
              />
              {searchQuery && (
                <button type="button"
                  onClick={() => { setSearchQuery(''); handlePageChange(1) }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-6 h-6 rounded-sm border border-black bg-white hover:bg-accent-yellow transition-colors"
                  aria-label="Clear search"
                >
                  <span className="material-symbols-outlined !text-[12px] text-black">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Region + Type dropdowns */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-gray-500">Region</span>
                <span className="h-px flex-1 bg-gray-200" />
              </div>
              <div className="relative">
                <select
                  aria-label="Filter grants by region"
                  value={selectedRegion}
                  onChange={(e) => handleFilterChange(setSelectedRegion, e.target.value)}
                  className="w-full appearance-none px-3 py-2 pr-9 font-mono text-[11px] font-bold bg-white border-2 border-black rounded-sm focus:outline-none focus:shadow-[3px_3px_0px_#FFD500] hover:shadow-[2px_2px_0px_#111] transition-all cursor-pointer"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined !text-[16px] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">expand_more</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-gray-500">Type</span>
                <span className="h-px flex-1 bg-gray-200" />
              </div>
              <div className="relative">
                <select
                  aria-label="Filter grants by type"
                  value={selectedType}
                  onChange={(e) => handleFilterChange(setSelectedType, e.target.value)}
                  className="w-full appearance-none px-3 py-2 pr-9 font-mono text-[11px] font-bold bg-white border-2 border-black rounded-sm focus:outline-none focus:shadow-[3px_3px_0px_#FFD500] hover:shadow-[2px_2px_0px_#111] transition-all cursor-pointer"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined !text-[16px] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">expand_more</span>
              </div>
            </div>
          </div>

          {/* Active filters chip row */}
          {(selectedRegion !== 'All' || selectedType !== 'All' || searchQuery !== '') && (
            <div className="mt-3 pt-3 border-t border-dashed border-gray-300 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-gray-500">Active</span>
                {selectedRegion !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-yellow border-2 border-black rounded-sm font-mono text-[10px] font-black uppercase tracking-wider">
                    {selectedRegion}
                  </span>
                )}
                {selectedType !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-yellow border-2 border-black rounded-sm font-mono text-[10px] font-black uppercase tracking-wider">
                    {selectedType}
                  </span>
                )}
                {searchQuery.trim() && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border-2 border-black rounded-sm font-mono text-[10px] font-black uppercase tracking-wider max-w-[180px] truncate">
                    &ldquo;{searchQuery}&rdquo;
                  </span>
                )}
              </div>
              <button type="button"
                onClick={() => {
                  setSelectedRegion('All')
                  setSelectedType('All')
                  setSearchQuery('')
                  handlePageChange(1)
                }}
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
          @keyframes grantsToolbarMandalaSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          :global(.grants-toolbar-mandala-spin) {
            animation: grantsToolbarMandalaSpin 110s linear infinite;
            transform-origin: center;
          }
          @media (prefers-reduced-motion: reduce) {
            :global(.grants-toolbar-mandala-spin) { animation: none; }
          }
        `}</style>
      </div>


    </>
  )
}