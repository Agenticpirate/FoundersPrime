export default function StartupsHero() {
  return (
    <div className="mb-4 md:mb-6">
      <div className="mb-2 md:mb-3">
        <div className="inline-block border-2 border-black bg-accent-yellow px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-2">
          DISCOVER + INVEST
        </div>
        <h1 className="font-mono text-2xl md:text-4xl lg:text-6xl font-bold tracking-tight text-black mb-1.5 md:mb-3 leading-tight">
          Verified Startups
        </h1>
        <p className="font-sans text-xs md:text-base text-gray-700 leading-relaxed max-w-3xl">
          Access <span className="font-bold text-black bg-primary/20 px-1">1368+</span> verified high-potential startups. Direct data from Y Combinator and top accelerators. Real metrics, vetted founders, and breakout opportunities.
        </p>
      </div>

      {/* Compact Stats - 3-col horizontal layout on all sizes */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="bg-white border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a] md:shadow-[3px_3px_0px_0px_#1a1a1a] p-2.5 md:p-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 md:mb-1">Verified Companies</p>
            <p className="font-mono text-lg md:text-2xl font-bold text-black">1368</p>
          </div>
          <span className="material-symbols-outlined text-xl md:text-2xl text-black">verified</span>
        </div>

        <div className="bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a] md:shadow-[3px_3px_0px_0px_#1a1a1a] p-2.5 md:p-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5 md:mb-1">Total Valuation</p>
            <p className="font-mono text-lg md:text-2xl font-bold text-white">$4.2B+</p>
          </div>
          <span className="material-symbols-outlined text-xl md:text-2xl text-primary">trending_up</span>
        </div>

        <div className="bg-white border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a] md:shadow-[3px_3px_0px_0px_#1a1a1a] p-2.5 md:p-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 md:mb-1">Avg Seed Round</p>
            <p className="font-mono text-lg md:text-2xl font-bold text-black">$3.5M</p>
          </div>
          <span className="material-symbols-outlined text-xl md:text-2xl text-black">paid</span>
        </div>
      </div>
    </div>
  )
}