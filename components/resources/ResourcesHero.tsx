export default function ResourcesHero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-12 mb-6 md:mb-16">
      <div className="lg:col-span-8 flex flex-col justify-center">
        <div className="inline-block w-fit border-2 border-black bg-accent-yellow px-2 py-0.5 md:px-3 md:py-1 font-mono text-xs font-bold uppercase tracking-wide rounded-sm mb-2 md:mb-4">
          FREE RESOURCES
        </div>
        <h1 className="font-mono text-2xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-3 md:mb-6 leading-[1.1]">
          Startup Resources Library
        </h1>
        <p className="font-sans text-sm md:text-xl text-gray-700 leading-relaxed max-w-3xl border-l-4 border-primary pl-3 md:pl-6 py-1">
          Access <span className="font-bold text-black bg-primary/20 px-1">1,247</span> curated resources including guides, templates, tools, and courses.
        </p>

        {/* Search Bar */}
        <div className="mt-4 md:mt-8 flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg md:text-xl">search</span>
            <input
              className="w-full bg-white border-2 md:border-3 border-black text-black px-10 md:px-12 py-2.5 md:py-4 font-mono text-sm md:text-base focus:outline-none focus:border-primary focus:ring-0 placeholder:text-gray-500 rounded-sm shadow-[3px_3px_0px_0px_#1a1a1a]"
              placeholder="Search guides, templates, tools..."
              type="text"
            />
          </div>
          <button className="px-5 py-2.5 md:px-8 md:py-4 bg-primary hover:bg-black hover:text-white border-2 md:border-3 border-black text-black font-mono font-bold rounded-sm shadow-[3px_3px_0px_0px_#1a1a1a] transition-all text-sm">
            Search
          </button>
        </div>

        {/* Popular Searches */}
        <div className="mt-3 md:mt-6 flex flex-wrap gap-1.5 md:gap-2">
          <span className="font-mono text-xs md:text-sm text-gray-500">Popular:</span>
          {['Pitch Deck', 'Business Plan', 'Legal Docs', 'Marketing'].map((term, index) => (
            <button key={index} className="px-2 py-0.5 md:px-3 md:py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 font-mono text-xs rounded-sm transition-colors">
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Stats - hidden on mobile */}
      <div className="lg:col-span-4 hidden lg:flex flex-col gap-5">
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6 flex items-center justify-between">
          <div>
            <p className="font-mono text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Resources</p>
            <p className="font-mono text-4xl font-bold text-black">1,247</p>
          </div>
          <span className="material-symbols-outlined text-4xl text-black">library_books</span>
        </div>

        <div className="bg-black text-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6 flex items-center justify-between">
          <div>
            <p className="font-mono text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Downloads</p>
            <p className="font-mono text-4xl font-bold text-white">847K</p>
          </div>
          <span className="material-symbols-outlined text-4xl text-primary">download</span>
        </div>

        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6 flex items-center justify-between">
          <div>
            <p className="font-mono text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Categories</p>
            <p className="font-mono text-4xl font-bold text-black">12</p>
          </div>
          <span className="material-symbols-outlined text-4xl text-black">category</span>
        </div>
      </div>
    </div>
  )
}