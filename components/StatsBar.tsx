export default function StatsBar() {
  return (
    <section className="border-b-2 border-black bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 divide-y-2 lg:divide-y-0 divide-black font-mono">
          {/* Left Block (Stats 1-3) matching Hero text width (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black lg:border-r-2 border-black">
            <div className="p-6 text-center group hover:bg-accent-yellow transition-colors cursor-default">
              <div className="text-3xl font-bold text-black mb-1 group-hover:translate-x-1 transition-transform">$2.4M+</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-black">Total Savings</div>
            </div>
            <div className="p-6 text-center group hover:bg-accent-cyan transition-colors cursor-default">
              <div className="text-3xl font-bold text-black mb-1 group-hover:translate-x-1 transition-transform">12,847</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-black">Founders</div>
            </div>
            <div className="p-6 text-center group hover:bg-primary hover:text-white transition-colors cursor-default">
              <div className="text-3xl font-bold mb-1 group-hover:translate-x-1 transition-transform">156</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white">Grants</div>
            </div>
          </div>

          {/* Right Block (Stats 4-5) matching Hero card width (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black lg:border-l-2 border-black">
            <div className="p-6 text-center group hover:bg-accent-red transition-colors cursor-default">
              <div className="text-3xl font-bold text-black mb-1 group-hover:translate-x-1 transition-transform">94</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-black">Startup Ideas</div>
            </div>
            <div className="p-6 text-center group hover:bg-black hover:text-white transition-colors cursor-default">
              <div className="text-3xl font-bold mb-1 group-hover:translate-x-1 transition-transform">847</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white">Active Deals</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}