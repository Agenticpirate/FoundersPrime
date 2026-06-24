"use client";

export interface IdeasFilterState {
  search: string;
  category: string;
  source: string;
  sort: string;
}

interface IdeasFilterBarProps {
  filters: IdeasFilterState;
  onFilterChange: (filters: IdeasFilterState) => void;
  categories: string[];
  sources: string[];
  resultCount: number;
  totalCount: number;
  onReset: () => void;
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
    onFilterChange({ ...filters, [key]: value });

  const hasActiveFilters =
    filters.search !== "" ||
    filters.category !== "" ||
    filters.source !== "" ||
    filters.sort !== "relevance";

  const selectClass =
    "h-9 appearance-none bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 pl-3 pr-7 text-[12px] text-gray-700 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-yellow/40 focus:border-accent-yellow cursor-pointer hover:border-gray-300 dark:hover:border-white/20 transition-colors font-medium truncate";

  return (
    <div className="mb-4 md:mb-5 space-y-2">
      {/* Single row filter bar */}
      <div className="flex items-center gap-2 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 shadow-sm sticky top-14 md:top-20 z-30 transition-colors duration-300">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-[18px] pointer-events-none">
            search
          </span>
          <input
            className="w-full h-9 pl-10 pr-8 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-yellow/40 focus:border-accent-yellow text-[12.5px] bg-gray-50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/8 focus:bg-white dark:focus:bg-[#111] transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-800 dark:text-white"
            placeholder="Search ideas by title, problem, or tag…"
            type="text"
            value={filters.search}
            onChange={(e) => set("search", e.target.value)}
          />
          {filters.search && (
            <button
              onClick={() => set("search", "")}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 transition-colors"
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
        </div>

        {/* Category select */}
        <div className="relative flex-shrink-0">
          <select
            className={`${selectClass} w-36 sm:w-40`}
            value={filters.category}
            onChange={(e) => set("category", e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-[15px] pointer-events-none">
            expand_more
          </span>
        </div>

        {/* Source select */}
        <div className="relative flex-shrink-0 hidden sm:block">
          <select
            className={`${selectClass} w-32`}
            value={filters.source}
            onChange={(e) => set("source", e.target.value)}
          >
            <option value="">All Sources</option>
            {sources.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-[15px] pointer-events-none">
            expand_more
          </span>
        </div>

        {/* Sort select */}
        <div className="relative flex-shrink-0 hidden md:block">
          <select
            className={`${selectClass} w-36`}
            value={filters.sort}
            onChange={(e) => set("sort", e.target.value)}
          >
            <option value="relevance">Most Relevant</option>
            <option value="alphabetical">A–Z</option>
            <option value="category">By Category</option>
          </select>
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-[15px] pointer-events-none">
            expand_more
          </span>
        </div>

        {/* Filter icon button */}
        <button
          className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border transition-all ${
            hasActiveFilters
              ? "bg-accent-yellow border-accent-yellow text-black shadow-sm"
              : "border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10"
          }`}
          onClick={hasActiveFilters ? onReset : undefined}
          title={hasActiveFilters ? "Clear filters" : "Filters"}
          aria-label={hasActiveFilters ? "Clear all filters" : "Filter options"}
        >
          <span className="material-symbols-outlined text-[18px]">
            {hasActiveFilters ? "filter_alt_off" : "tune"}
          </span>
        </button>
      </div>

      {/* Results count row */}
      <div className="flex items-center justify-between px-0.5">
        <p className="font-mono text-[11px] text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-bold text-gray-900 dark:text-white">{resultCount}</span>{" "}
          of{" "}
          <span className="font-bold text-gray-900 dark:text-white">{totalCount}</span>{" "}
          ideas
        </p>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-[11px] font-mono text-red-500 hover:text-red-600 flex items-center gap-0.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[13px]">close</span>
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
