'use client'

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
  totalCount: number
  onReset: () => void
}

export default function IdeasFilterBar({
  filters,
  onFilterChange,
  categories,
  sources,
  resultCount,
  totalCount,
  onReset,
}: IdeasFilterBarProps) {
  const set = (key: keyof IdeasFilterState, value: string) =>
    onFilterChange({ ...filters, [key]: value })

  const hasActiveFilters =
    filters.search !== '' ||
    filters.category !== '' ||
    filters.source !== '' ||
    filters.sort !== 'relevance'

  const selectClass =
    'h-11 sm:h-9 min-h-[44px] sm:min-h-0 appearance-none bg-transparent border-0 pl-0 pr-6 text-[16px] sm:text-[12px] font-medium text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer truncate max-w-[10.5rem] sm:max-w-none'

  const activeChips: { key: keyof IdeasFilterState; label: string }[] = []
  if (filters.search.trim()) {
    activeChips.push({ key: 'search', label: `“${filters.search.trim().slice(0, 28)}${filters.search.trim().length > 28 ? '…' : ''}”` })
  }
  if (filters.category) activeChips.push({ key: 'category', label: filters.category })
  if (filters.source) activeChips.push({ key: 'source', label: filters.source })
  if (filters.sort !== 'relevance') {
    const sortLabel =
      filters.sort === 'alphabetical'
        ? 'A–Z'
        : filters.sort === 'category'
          ? 'By category'
          : filters.sort === 'signal'
            ? 'Highest signal'
            : filters.sort
    activeChips.push({ key: 'sort', label: sortLabel })
  }

  return (
    <div className="mb-4 md:mb-6 space-y-2 md:space-y-3">
      {/* Unified filter shell */}
      <div className="sticky sticky-mobile-filters top-14 md:top-20 z-30 rounded-xl md:rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-0 p-2 sm:p-1.5 sm:pl-2">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 !text-[18px] pointer-events-none">
              search
            </span>
            <input
              className="w-full h-12 sm:h-9 min-h-[48px] sm:min-h-0 pl-10 pr-10 rounded-xl border-0 bg-gray-50 dark:bg-white/[0.04] sm:bg-transparent dark:sm:bg-transparent focus:bg-gray-50 dark:focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-accent-yellow/30 text-[16px] sm:text-[13px] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white transition-colors"
              placeholder="Search ideas…"
              type="search"
              enterKeyHint="search"
              autoComplete="off"
              value={filters.search}
              onChange={(e) => set('search', e.target.value)}
              aria-label="Search ideas"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => set('search', '')}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full text-gray-400 active:bg-black/5 dark:active:bg-white/10 transition-colors"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined !text-[16px]">close</span>
              </button>
            )}
          </div>

          <div className="hidden sm:block h-5 w-px bg-black/[0.06] dark:bg-white/10 shrink-0 mx-1" aria-hidden />

          {/* Controls row */}
          <div className="flex items-center gap-1 px-0.5 sm:px-0 overflow-x-auto mobile-chip-scroll">
            <div className="relative shrink-0 pl-2 sm:pl-1">
              <select
                className={selectClass}
                value={filters.category}
                onChange={(e) => set('category', e.target.value)}
                aria-label="Category"
              >
                <option value="">All markets</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 !text-[15px] pointer-events-none">
                expand_more
              </span>
            </div>

            <div className="relative shrink-0 pl-2">
              <select
                className={selectClass}
                value={filters.source}
                onChange={(e) => set('source', e.target.value)}
                aria-label="Source"
              >
                <option value="">All sources</option>
                {sources.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 !text-[15px] pointer-events-none">
                expand_more
              </span>
            </div>

            <div className="relative shrink-0 pl-2">
              <select
                className={selectClass}
                value={filters.sort}
                onChange={(e) => set('sort', e.target.value)}
                aria-label="Sort"
              >
                <option value="relevance">Most relevant</option>
                <option value="signal">Highest signal</option>
                <option value="alphabetical">A–Z</option>
                <option value="category">By market</option>
              </select>
              <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 !text-[15px] pointer-events-none">
                expand_more
              </span>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={onReset}
                className="ml-1 shrink-0 h-8 px-2.5 inline-flex items-center gap-1 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wide text-amber-800 dark:text-accent-yellow hover:bg-accent-yellow/10 transition-colors"
                aria-label="Clear all filters"
              >
                <span className="material-symbols-outlined !text-[14px]">close</span>
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Meta + active chips */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-0.5">
        <p className="font-mono text-[11px] text-gray-500 dark:text-gray-500">
          <span className="font-bold text-gray-900 dark:text-white tabular-nums">{resultCount}</span>
          <span className="mx-1 opacity-50">/</span>
          <span className="tabular-nums">{totalCount}</span>
          <span className="ml-1.5">ideas</span>
        </p>

        {activeChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {activeChips.map((chip) => (
              <button
                key={chip.key + chip.label}
                type="button"
                onClick={() =>
                  set(chip.key, chip.key === 'sort' ? 'relevance' : '')
                }
                className="inline-flex items-center gap-1 rounded-full border border-black/[0.06] dark:border-white/10 bg-white dark:bg-white/[0.04] pl-2.5 pr-1.5 py-0.5 font-mono text-[10px] font-semibold text-gray-700 dark:text-gray-300 hover:border-accent-yellow/40 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <span className="max-w-[140px] truncate">{chip.label}</span>
                <span className="material-symbols-outlined !text-[13px] text-gray-400">close</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
