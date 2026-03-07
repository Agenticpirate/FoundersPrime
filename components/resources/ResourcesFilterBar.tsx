export default function ResourcesFilterBar() {
  return (
    <div className="bg-white border-2 md:border-3 border-black shadow-sm md:shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-3 md:p-6 mb-4 md:mb-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-black text-lg md:text-xl">filter_list</span>
          <span className="font-mono text-xs md:text-sm font-bold uppercase">Filters</span>
        </div>

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-2">
          <select className="bg-white border-2 border-black px-2 md:px-3 py-1.5 md:py-2 font-mono text-xs md:text-sm rounded-sm focus:outline-none focus:border-primary">
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

          <select className="bg-white border-2 border-black px-2 md:px-3 py-1.5 md:py-2 font-mono text-xs md:text-sm rounded-sm focus:outline-none focus:border-primary">
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

          <select className="bg-white border-2 border-black px-2 md:px-3 py-1.5 md:py-2 font-mono text-xs md:text-sm rounded-sm focus:outline-none focus:border-primary">
            <option>All Formats</option>
            <option>PDF</option>
            <option>Google Docs</option>
            <option>Excel/Sheets</option>
            <option>Notion Template</option>
            <option>Figma Template</option>
            <option>Video</option>
            <option>Web Tool</option>
          </select>

          <select className="bg-white border-2 border-black px-2 md:px-3 py-1.5 md:py-2 font-mono text-xs md:text-sm rounded-sm focus:outline-none focus:border-primary">
            <option>All Prices</option>
            <option>Free</option>
            <option>Under $50</option>
            <option>$50-$200</option>
            <option>$200+</option>
          </select>

          <select className="bg-gray-100 border-2 border-black px-2 md:px-3 py-1.5 md:py-2 font-mono text-xs md:text-sm rounded-sm focus:outline-none focus:border-primary">
            <option>Sort by Popular</option>
            <option>Sort by Recent</option>
            <option>Sort by Rating</option>
            <option>Sort by Downloads</option>
            <option>Sort by Price</option>
          </select>

          <button className="px-3 py-1.5 md:py-2 bg-white hover:bg-gray-100 border-2 border-black text-black font-mono text-xs md:text-sm rounded-sm transition-colors">
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}