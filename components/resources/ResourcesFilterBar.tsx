export default function ResourcesFilterBar() {
  return (
    <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-black text-xl">filter_list</span>
          <span className="font-mono text-sm font-bold uppercase">Filters</span>
        </div>
        
        <div className="flex flex-wrap gap-3 flex-1">
          {/* Category Filter */}
          <select className="bg-white border-2 border-black px-3 py-2 font-mono text-sm rounded-sm focus:outline-none focus:border-primary">
            <option>All Categories</option>
            <option>Business Planning</option>
            <option>Legal & Compliance</option>
            <option>Marketing & Sales</option>
            <option>Product Development</option>
            <option>Fundraising</option>
            <option>Operations</option>
            <option>Finance & Accounting</option>
            <option>HR & Team Building</option>
            <option>Tools & Software</option>
            <option>Templates</option>
            <option>Courses & Education</option>
            <option>Industry Reports</option>
          </select>
          
          {/* Type Filter */}
          <select className="bg-white border-2 border-black px-3 py-2 font-mono text-sm rounded-sm focus:outline-none focus:border-primary">
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
          
          {/* Format Filter */}
          <select className="bg-white border-2 border-black px-3 py-2 font-mono text-sm rounded-sm focus:outline-none focus:border-primary">
            <option>All Formats</option>
            <option>PDF</option>
            <option>Google Docs</option>
            <option>Excel/Sheets</option>
            <option>Notion Template</option>
            <option>Figma Template</option>
            <option>Video</option>
            <option>Web Tool</option>
          </select>
          
          {/* Price Filter */}
          <select className="bg-white border-2 border-black px-3 py-2 font-mono text-sm rounded-sm focus:outline-none focus:border-primary">
            <option>All Prices</option>
            <option>Free</option>
            <option>Under $50</option>
            <option>$50-$200</option>
            <option>$200+</option>
          </select>
        </div>
        
        <div className="flex gap-3">
          {/* Sort Dropdown */}
          <select className="bg-gray-100 border-2 border-black px-3 py-2 font-mono text-sm rounded-sm focus:outline-none focus:border-primary">
            <option>Sort by Popular</option>
            <option>Sort by Recent</option>
            <option>Sort by Rating</option>
            <option>Sort by Downloads</option>
            <option>Sort by Price</option>
          </select>
          
          {/* Clear Filters */}
          <button className="px-4 py-2 bg-white hover:bg-gray-100 border-2 border-black text-black font-mono text-sm rounded-sm transition-colors">
            Clear
          </button>
        </div>
      </div>
      
      {/* Active Filters */}
      <div className="flex gap-2 mt-4 flex-wrap">
        <span className="bg-primary text-black px-3 py-1 font-mono text-xs rounded-sm border border-black flex items-center gap-2">
          Business Planning
          <span className="material-symbols-outlined text-xs cursor-pointer">close</span>
        </span>
        <span className="bg-primary text-black px-3 py-1 font-mono text-xs rounded-sm border border-black flex items-center gap-2">
          Templates
          <span className="material-symbols-outlined text-xs cursor-pointer">close</span>
        </span>
      </div>
    </div>
  )
}