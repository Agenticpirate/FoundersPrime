export default function IdeasFilterBar() {
  return (
    <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-black text-xl">filter_list</span>
          <span className="font-mono text-sm font-bold uppercase">Filters</span>
        </div>
        
        <div className="flex flex-wrap gap-3 flex-1">
          {/* Category Filter */}
          <select className="bg-white border-2 border-black px-3 py-2 font-mono text-sm focus:outline-none focus:border-primary">
            <option>All Categories</option>
            <option>AI/ML</option>
            <option>FinTech</option>
            <option>HealthTech</option>
            <option>EdTech</option>
            <option>E-commerce</option>
            <option>SaaS</option>
            <option>Climate</option>
            <option>Consumer</option>
            <option>B2B Tools</option>
          </select>
          
          {/* Complexity Filter */}
          <select className="bg-white border-2 border-black px-3 py-2 font-mono text-sm focus:outline-none focus:border-primary">
            <option>All Complexity</option>
            <option>Low (MVP in 1-3 months)</option>
            <option>Medium (MVP in 3-6 months)</option>
            <option>High (MVP in 6+ months)</option>
          </select>
          
          {/* Market Size Filter */}
          <select className="bg-white border-2 border-black px-3 py-2 font-mono text-sm focus:outline-none focus:border-primary">
            <option>All Market Sizes</option>
            <option>$1B+ TAM</option>
            <option>$100M-1B TAM</option>
            <option>$10M-100M TAM</option>
            <option>&lt;$10M TAM</option>
          </select>
          
          {/* Monetization Filter */}
          <select className="bg-white border-2 border-black px-3 py-2 font-mono text-sm focus:outline-none focus:border-primary">
            <option>All Models</option>
            <option>Subscription</option>
            <option>Marketplace</option>
            <option>Transaction Fees</option>
            <option>Advertising</option>
            <option>One-time Purchase</option>
            <option>Freemium</option>
          </select>
        </div>
        
        <div className="flex gap-3">
          {/* Sort Dropdown */}
          <select className="bg-gray-100 border-2 border-black px-3 py-2 font-mono text-sm focus:outline-none focus:border-primary">
            <option>Sort by Demand Score</option>
            <option>Sort by Market Size</option>
            <option>Sort by Complexity</option>
            <option>Sort by Competition</option>
            <option>Sort by Recent</option>
          </select>
          
          {/* Clear Filters */}
          <button className="px-4 py-2 bg-white hover:bg-gray-100 border-2 border-black text-black font-mono text-sm transition-colors">
            Clear
          </button>
        </div>
      </div>
      
      {/* Active Filters */}
      <div className="flex gap-2 mt-4 flex-wrap">
        <span className="bg-primary text-black px-3 py-1 font-mono text-xs border border-black flex items-center gap-2">
          AI/ML
          <span className="material-symbols-outlined text-xs cursor-pointer">close</span>
        </span>
        <span className="bg-primary text-black px-3 py-1 font-mono text-xs border border-black flex items-center gap-2">
          Medium Complexity
          <span className="material-symbols-outlined text-xs cursor-pointer">close</span>
        </span>
      </div>
    </div>
  )
}