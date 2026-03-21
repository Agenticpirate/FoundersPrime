export default function StatsBar() {
  return (
    <section className="border-b-2 border-black bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: 2-column compact grid */}
        <div className="grid grid-cols-3 lg:hidden divide-x-2 divide-black font-mono">
          {[
            { val: '$2.4M+', label: 'Savings', hover: 'hover:bg-accent-yellow' },
            { val: '12,847', label: 'Founders', hover: 'hover:bg-accent-cyan' },
            { val: '847', label: 'Deals', hover: 'hover:bg-black hover:text-white' },
          ].map((s) => (
            <div key={s.label} className={`p-2.5 text-center group ${s.hover} transition-colors`}>
              <div className="text-base font-bold text-black group-hover:inherit">{s.val}</div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-gray-500 group-hover:inherit">{s.label}</div>
            </div>
          ))}
        </div>
        {/* Tablet+ row */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-0 divide-x-2 divide-black font-mono">
          <div className="lg:col-span-7 grid grid-cols-3 divide-x-2 divide-black lg:border-r-2 border-black">
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
          <div className="lg:col-span-5 grid grid-cols-2 divide-x-2 divide-black">
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

