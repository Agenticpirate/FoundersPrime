import Mandala from "@/components/ui/Mandala";

interface ResourcesHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
}

export default function ResourcesHero({ searchQuery, onSearchChange, totalCount }: ResourcesHeroProps) {
  return (
    <div className="relative mb-6">
      {/* Background mandala */}
      <Mandala
        variant="rings"
        colorClass="text-white/5"
        opacity={0.07}
        speed={80}
        className="absolute -top-8 -right-6 w-56 h-56 hidden md:block"
      />

      <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        {/* Left: Headline & Search */}
        <div className="min-w-0 flex-1">
          <div className="relative inline-flex items-center gap-1.5 mb-2.5 px-2.5 py-1 rounded-full border bg-accent-yellow/15 border-accent-yellow/20 text-gray-300 overflow-hidden">
            <span className="material-symbols-outlined relative !text-[12px] text-accent-yellow">folder_open</span>
            <span className="relative font-mono text-[9.5px] font-bold uppercase tracking-[0.14em]">
              Discover + Invest
            </span>
          </div>

          <h1 className="font-mono text-2xl md:text-3xl lg:text-[34px] font-black tracking-tight text-white leading-[1.05] mb-2.5">
            Curated resources for <span className="text-[#ffd700]">Founders</span> &amp; Builders
          </h1>
          
          <p className="font-sans text-[13px] md:text-sm text-gray-400 leading-relaxed max-w-2xl mb-4">
            Access guides, templates, tools and courses to build, launch and scale faster.
          </p>

          {/* Search bar inside hero */}
          <div className="flex flex-col sm:flex-row gap-2 max-w-xl">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[18px] pointer-events-none">
                search
              </span>
              <input
                className="w-full h-10 pl-10 pr-4 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700]/40 focus:border-[#ffd700] text-[12.5px] bg-white/5 hover:bg-white/8 focus:bg-[#111] transition-colors placeholder:text-gray-500 text-white"
                placeholder="Search guides, templates, tools…"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            <button className="h-10 px-5 bg-[#ffd700] hover:bg-[#ffe033] text-black font-mono text-[12.5px] font-bold rounded-lg transition-colors flex items-center justify-center">
              Search
            </button>
          </div>

          {/* Popular search terms pills */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3 text-[11px] font-mono">
            <span className="text-gray-500">Popular:</span>
            {["Pitch Deck", "Business Plan", "Legal Docs", "Marketing", "Financial Model"].map((term) => (
              <button
                key={term}
                onClick={() => onSearchChange(term)}
                className="px-2.5 py-1 bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: 3 Stats Strip matching startups layout */}
        <div className="grid grid-cols-3 gap-2.5 lg:gap-3 lg:flex-shrink-0 lg:min-w-[560px]">
          {/* Stat 1 */}
          <div className="relative bg-[#0c0c0c] border border-white/10 rounded-xl p-3 md:p-4 flex items-center justify-between overflow-hidden group">
            <div>
              <p className="font-mono text-[9px] text-gray-500 uppercase tracking-wider mb-1">
                Total Resources
              </p>
              <h4 className="font-mono text-base md:text-xl font-bold text-white tracking-tight">
                {totalCount}
              </h4>
              <p className="font-mono text-[9px] text-gray-500 mt-0.5">
                Curated
              </p>
            </div>
            <span className="material-symbols-outlined text-[20px] text-accent-yellow">analytics</span>
          </div>

          {/* Stat 2 */}
          <div className="relative bg-[#0c0c0c] border border-white/10 rounded-xl p-3 md:p-4 flex items-center justify-between overflow-hidden group">
            <div>
              <p className="font-mono text-[9px] text-gray-500 uppercase tracking-wider mb-1">
                Categories
              </p>
              <h4 className="font-mono text-base md:text-xl font-bold text-white tracking-tight">
                12
              </h4>
              <p className="font-mono text-[9px] text-gray-500 mt-0.5">
                Topics
              </p>
            </div>
            <span className="material-symbols-outlined text-[20px] text-sky-400">category</span>
          </div>

          {/* Stat 3 */}
          <div className="relative bg-[#0c0c0c] border border-white/10 rounded-xl p-3 md:p-4 flex items-center justify-between overflow-hidden group">
            <div>
              <p className="font-mono text-[9px] text-gray-500 uppercase tracking-wider mb-1">
                Templates
              </p>
              <h4 className="font-mono text-base md:text-xl font-bold text-white tracking-tight">
                25+
              </h4>
              <p className="font-mono text-[9px] text-gray-500 mt-0.5">
                Ready to use
              </p>
            </div>
            <span className="material-symbols-outlined text-[20px] text-accent-yellow">verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}


