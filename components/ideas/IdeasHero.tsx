export default function IdeasHero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
      <div className="lg:col-span-8 flex flex-col justify-center">
        <div className="inline-block w-fit border-2 border-black bg-accent-yellow px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide rounded-sm mb-4">
          VALIDATED IDEAS
        </div>
        <h1 className="font-mono text-5xl md:text-6xl font-bold tracking-tight text-black mb-6 leading-[1.1]">
          Startup Ideas <br className="hidden md:block"/> Database
        </h1>
        <p className="font-sans text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl border-l-4 border-primary pl-6 py-1">
          Discover <span className="font-bold text-black bg-primary/20 px-1">2,847</span> validated startup ideas with market research, demand signals, and implementation guides. Each idea includes competitor analysis, monetization strategies, and technical requirements.
        </p>
        
        {/* Search Bar */}
        <div className="mt-8 flex gap-3">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">search</span>
            <input 
              className="w-full bg-white border-3 border-black text-black px-12 py-4 font-mono text-base focus:outline-none focus:border-primary focus:ring-0 placeholder:text-gray-500 rounded-sm shadow-[4px_4px_0px_0px_#1a1a1a]" 
              placeholder="Search ideas, problems, or markets..." 
              type="text"
            />
          </div>
          <button className="px-8 py-4 bg-primary hover:bg-black hover:text-white border-3 border-black text-black font-mono font-bold rounded-sm shadow-[4px_4px_0px_0px_#1a1a1a] hover:shadow-[2px_2px_0px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            Search
          </button>
        </div>
        
        {/* Methodology Note */}
        <div className="mt-6 bg-gray-50 border-2 border-gray-300 rounded-sm p-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">science</span>
            <div>
              <h3 className="font-mono text-sm font-bold mb-1">Our Validation Methodology</h3>
              <p className="font-sans text-sm text-gray-600">
                Each idea is scored using search volume, social signals, competitor funding, and market size data. We analyze 50+ data points to validate demand and feasibility.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="lg:col-span-4 flex flex-col gap-5">
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6 flex items-center justify-between">
          <div>
            <p className="font-mono text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Ideas</p>
            <p className="font-mono text-4xl font-bold text-black">2,847</p>
          </div>
          <span className="material-symbols-outlined text-4xl text-black">lightbulb</span>
        </div>
        
        <div className="bg-black text-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6 flex items-center justify-between">
          <div>
            <p className="font-mono text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Avg Demand Score</p>
            <p className="font-mono text-4xl font-bold text-white">7.2/10</p>
          </div>
          <span className="material-symbols-outlined text-4xl text-primary">trending_up</span>
        </div>
        
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6 flex items-center justify-between">
          <div>
            <p className="font-mono text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Categories</p>
            <p className="font-mono text-4xl font-bold text-black">24</p>
          </div>
          <span className="material-symbols-outlined text-4xl text-black">category</span>
        </div>
      </div>
    </div>
  )
}