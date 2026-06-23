interface ResourcesHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function ResourcesHero({ searchQuery, onSearchChange }: ResourcesHeroProps) {
  return (
    <div className="mb-3 md:mb-6">
      <div className="flex flex-col justify-center max-w-4xl">
        <div className="inline-block w-fit border-2 border-black bg-accent-yellow px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-1.5 md:mb-4">
          FREE RESOURCES
        </div>
        <h1 className="font-mono text-xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-1.5 md:mb-4 leading-tight">
          Startup Resources Library
        </h1>
        <p className="font-sans text-xs md:text-xl text-gray-700 leading-relaxed max-w-3xl border-l-4 border-primary pl-3 md:pl-6">
          Access curated resources including guides, templates, tools, and courses.
        </p>

        {/* Search Bar — hidden on mobile for compactness */}
        <div className="hidden sm:flex mt-4 md:mt-6 flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg md:text-xl">search</span>
            <input
              className="w-full bg-white border-2 md:border-3 border-black text-black px-10 md:px-12 py-2.5 md:py-4 font-mono text-sm md:text-base focus:outline-none focus:border-primary focus:ring-0 placeholder:text-gray-500 rounded-sm shadow-[3px_3px_0px_0px_#1a1a1a]"
              placeholder="Search guides, templates, tools..."
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <button className="px-5 py-2.5 md:px-8 md:py-4 bg-primary hover:bg-black hover:text-white border-2 md:border-3 border-black text-black font-mono font-bold rounded-sm shadow-[3px_3px_0px_0px_#1a1a1a] transition-all text-sm">
            Search
          </button>
        </div>

        {/* Popular Searches — hidden on mobile */}
        <div className="hidden sm:flex mt-3 md:mt-6 flex-wrap gap-1.5 md:gap-2">
          <span className="font-mono text-xs md:text-sm text-gray-500">Popular:</span>
          {['Pitch Deck', 'Business Plan', 'Legal Docs', 'Marketing'].map((term, index) => (
            <button
              key={index}
              onClick={() => onSearchChange(term)}
              className="px-2 py-0.5 md:px-3 md:py-1 bg-gray-100 hover:bg-gray-200 border border-black text-black font-mono text-xs rounded-sm transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}


