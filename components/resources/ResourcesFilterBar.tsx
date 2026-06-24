export interface ResourcesFilterState {
  category: string;
  type: string;
  format: string;
  price: string;
  sort: string;
}

interface ResourcesFilterBarProps {
  filters: ResourcesFilterState;
  onFilterChange: (filters: ResourcesFilterState) => void;
  onClear: () => void;
}

export interface ResourcesFilterState {
  category: string;
  type: string;
  format: string;
  price: string;
  sort: string;
}

interface ResourcesFilterBarProps {
  filters: ResourcesFilterState;
  onFilterChange: (filters: ResourcesFilterState) => void;
  onClear: () => void;
}

export default function ResourcesFilterBar({ filters, onFilterChange, onClear }: ResourcesFilterBarProps) {
  const handleChange = (key: keyof ResourcesFilterState, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value === 'All Categories' || value === 'All Types' || value === 'All Formats' || value === 'All Prices' ? '' : value
    })
  }

  const hasActiveFilters =
    filters.category !== "" ||
    filters.type !== "" ||
    filters.format !== "" ||
    filters.price !== "" ||
    filters.sort !== "popular";

  const selectClass =
    "h-9 appearance-none bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 pl-3 pr-7 text-[12px] text-gray-700 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700]/40 focus:border-[#ffd700] cursor-pointer hover:border-gray-300 dark:hover:border-white/20 transition-colors font-medium truncate";

  return (
    <div className="mb-4 md:mb-5 space-y-2">
      {/* Horizontal Filter Bar */}
      <div className="flex items-center gap-2 bg-[#0c0c0c] border border-white/10 rounded-xl px-3 py-2 shadow-sm sticky top-14 md:top-20 z-30 transition-colors duration-300">
        
        <div className="flex items-center gap-1.5 text-gray-400 mr-2 flex-shrink-0">
          <span className="material-symbols-outlined text-[18px]">filter_list</span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Filters</span>
        </div>

        {/* Category Dropdown */}
        <div className="relative flex-shrink-0">
          <select
            value={filters.category || 'All Categories'}
            onChange={(e) => handleChange('category', e.target.value)}
            className={`${selectClass} w-36 sm:w-40`}
          >
            <option>All Categories</option>
            <option>Business Planning</option>
            <option>Legal &amp; Compliance</option>
            <option>Marketing &amp; Sales</option>
            <option>Product Development</option>
            <option>Fundraising</option>
            <option>Operations</option>
            <option>Finance &amp; Accounting</option>
            <option>HR &amp; Team Building</option>
            <option>Tools &amp; Software</option>
            <option>Templates</option>
            <option>Courses &amp; Education</option>
            <option>Industry Reports</option>
          </select>
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-[15px] pointer-events-none">
            expand_more
          </span>
        </div>

        {/* Type Dropdown */}
        <div className="relative flex-shrink-0">
          <select
            value={filters.type || 'All Types'}
            onChange={(e) => handleChange('type', e.target.value)}
            className={`${selectClass} w-32`}
          >
            <option>All Types</option>
            <option>Templates</option>
            <option>Guides</option>
            <option>Tools</option>
            <option>Courses</option>
            <option>Checklists</option>
            <option>Reports</option>
            <option>Videos</option>
            <option>Podcasts</option>
          </select>
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-[15px] pointer-events-none">
            expand_more
          </span>
        </div>

        {/* Format Dropdown */}
        <div className="relative flex-shrink-0 hidden sm:block">
          <select
            value={filters.format || 'All Formats'}
            onChange={(e) => handleChange('format', e.target.value)}
            className={`${selectClass} w-32`}
          >
            <option>All Formats</option>
            <option>PDF</option>
            <option>Google Docs</option>
            <option>Excel/Sheets</option>
            <option>Notion Template</option>
            <option>Figma Template</option>
            <option>Video</option>
            <option>Web Tool</option>
          </select>
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-[15px] pointer-events-none">
            expand_more
          </span>
        </div>

        {/* Price Dropdown */}
        <div className="relative flex-shrink-0 hidden md:block">
          <select
            value={filters.price || 'All Prices'}
            onChange={(e) => handleChange('price', e.target.value)}
            className={`${selectClass} w-32`}
          >
            <option>All Prices</option>
            <option>Free</option>
            <option>Under $50</option>
            <option>$50-$200</option>
            <option>$200+</option>
          </select>
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-[15px] pointer-events-none">
            expand_more
          </span>
        </div>

        {/* Sort Dropdown */}
        <div className="relative flex-shrink-0 hidden md:block">
          <select
            value={filters.sort}
            onChange={(e) => handleChange('sort', e.target.value)}
            className={`${selectClass} w-36`}
          >
            <option value="popular">Most Relevant</option>
            <option value="recent">Sort by Recent</option>
            <option value="rating">Sort by Rating</option>
            <option value="downloads">Sort by Downloads</option>
            <option value="price">Sort by Price</option>
          </select>
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-[15px] pointer-events-none">
            expand_more
          </span>
        </div>

        {/* Action Toggle Clear Button */}
        <button
          className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border transition-all ${
            hasActiveFilters
              ? "bg-[#ffd700] border-[#ffd700] text-black shadow-sm"
              : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
          }`}
          onClick={hasActiveFilters ? onClear : undefined}
          title={hasActiveFilters ? "Clear filters" : "Filters"}
          aria-label={hasActiveFilters ? "Clear all filters" : "Filter options"}
        >
          <span className="material-symbols-outlined text-[18px]">
            {hasActiveFilters ? "filter_alt_off" : "tune"}
          </span>
        </button>
      </div>
    </div>
  );
}