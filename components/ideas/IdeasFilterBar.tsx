"use client";

export interface IdeasFilterState {
  search: string
  category: string
  source: string
  sort: string
}

interface IdeasFilterBarProps {
  filters: IdeasFilterState
  onFilterChange: (filters: IdeasFilterState) => void
  categories: string[]
  sources: string[]
  resultCount: number
  onReset: () => void
}

export default function IdeasFilterBar({
  filters,
  onFilterChange,
  categories,
  sources,
  resultCount,
  onReset,
}: IdeasFilterBarProps) {
  const set = (key: keyof IdeasFilterState, value: string) =>
    onFilterChange({ ...filters, [key]: value })

  const hasActiveFilters =
    filters.search !== '' || filters.category !== '' || filters.source !== '' || filters.sort !== 'relevance'

  const selectClass =
    "h-9 w-full appearance-none border border-gray-200 bg-white pl-2.5 pr-7 text-[12px] text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-yellow/40 focus:border-accent-yellow cursor-pointer hover:border-gray-300 transition-colors font-medium"

  return (
    <div className="relative bg-white border border-gray-200 rounded-xl p-3 md:p-3.5 shadow-sm overflow-hidden mb-4 md:mb-6">
      {/* Decorative mandala — top-right corner */}
      <div className="absolute -top-10 -right-10 w-32 h-32 pointer-events-none opacity-[0.05]" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 ideas-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
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
        {/* Search row */}
        <div className="relative mb-2.5">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px] pointer-events-none">search</span>
          <input
            className="w-full h-9 pl-10 pr-9 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-yellow/40 focus:border-accent-yellow text-[12.5px] bg-gray-50 hover:bg-white focus:bg-white transition-colors placeholder:text-gray-400"
            placeholder="Search validated ideas by title, problem, or tag…"
            type="text"
            value={filters.search}
            onChange={(e) => set('search', e.target.value)}
          />
          {filters.search && (
            <button
              onClick={() => set('search', '')}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Dropdowns row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div className="relative">
            <select className={selectClass} value={filters.category} onChange={(e) => set('category', e.target.value)}>
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">expand_more</span>
          </div>
          <div className="relative">
            <select className={selectClass} value={filters.source} onChange={(e) => set('source', e.target.value)}>
              <option value="">All Sources</option>
              {sources.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">expand_more</span>
          </div>
          <div className="relative col-span-2 md:col-span-1">
            <select className={selectClass} value={filters.sort} onChange={(e) => set('sort', e.target.value)}>
              <option value="relevance">Most Relevant</option>
              <option value="alphabetical">A–Z</option>
              <option value="category">By Category</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] pointer-events-none">expand_more</span>
          </div>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
            {filters.category && (
              <span className="inline-flex items-center gap-1 bg-gray-900 text-white px-2.5 py-1 text-[11px] font-semibold rounded-full">
                {filters.category}
                <button onClick={() => set('category', '')} aria-label="Remove category filter" className="inline-flex">
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            )}
            {filters.source && (
              <span className="inline-flex items-center gap-1 bg-gray-900 text-white px-2.5 py-1 text-[11px] font-semibold rounded-full">
                {filters.source}
                <button onClick={() => set('source', '')} aria-label="Remove source filter" className="inline-flex">
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            )}
            <span className="font-mono text-[11px] text-gray-500 ml-1">
              <span className="font-bold text-black">{resultCount}</span> match{resultCount === 1 ? '' : 'es'}
            </span>
            <button
              onClick={onReset}
              className="ml-auto px-2.5 py-1 text-[11px] font-semibold rounded-full text-red-600 hover:bg-red-50 transition-colors whitespace-nowrap flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
              Clear all
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes ideasMandalaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        :global(.ideas-mandala-spin) {
          animation: ideasMandalaSpin 70s linear infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.ideas-mandala-spin) { animation: none; }
        }
      `}</style>
    </div>
  )
}
