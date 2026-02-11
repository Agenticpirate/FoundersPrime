export default function ResourcesHero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
      <div className="lg:col-span-8 flex flex-col justify-center">
        <div className="inline-block w-fit border-2 border-black bg-accent-yellow px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide rounded-sm mb-4">
          FREE RESOURCES
        </div>
        <h1 className="font-mono text-5xl md:text-6xl font-bold tracking-tight text-black mb-6 leading-[1.1]">
          Startup Resources <br className="hidden md:block"/> Library
        </h1>
        <p className="font-sans text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl border-l-4 border-primary pl-6 py-1">
          Access <span className="font-bold text-black bg-primary/20 px-1">1,247</span> curated resources including guides, templates, tools, and courses. Everything you need to build, launch, and scale your startup from idea to IPO.
        </p>
        
        {/* Search Bar */}
        <div className="mt-8 flex gap-3">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">search</span>
            <input 
              className="w-full bg-white border-3 border-black text-black px-12 py-4 font-mono text-base focus:outline-none focus:border-primary focus:ring-0 placeholder:text-gray-500 rounded-sm shadow-[4px_4px_0px_0px_#1a1a1a]" 
              placeholder="Search guides, templates, tools..." 
              type="text"
            />
          </div>
          <button className="px-8 py-4 bg-primary hover:bg-black hover:text-white border-3 border-black text-black font-mono font-bold rounded-sm shadow-[4px_4px_0px_0px_#1a1a1a] hover:shadow-[2px_2px_0px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            Search
          </button>
        </div>
        
        {/* Popular Searches */}
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="font-mono text-sm text-gray-500">Popular:</span>
          {['Pitch Deck Template', 'Business Plan Guide', 'Legal Documents', 'Marketing Tools'].map((term, index) => (
            <button key={index} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 font-mono text-sm rounded-sm transition-colors">
              {term}
            </button>
          ))}
        </div>
      </div>
      
      {/* Stats */}
      <div className="lg:col-span-4 flex flex-col gap-5">
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