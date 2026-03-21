export default function IdeasHero() {
  return (
    <div className="mb-4 md:mb-6">
      <div className="mb-2 md:mb-3">
        <div className="inline-block border-2 border-black bg-accent-yellow px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-2">
          BUILD + SHIP
        </div>
        <h1 className="font-mono text-2xl md:text-4xl lg:text-6xl font-bold tracking-tight text-black mb-1.5 md:mb-3 leading-tight">
          Validated Startup Ideas
        </h1>
        <p className="font-sans text-xs md:text-base text-gray-700 leading-relaxed max-w-3xl">
          <span className="font-bold text-black bg-primary/20 px-1">73 validated problems</span> worth solving. Curated from top accelerators and real user pain points. Stop waiting for validation—these problems are <span className="font-bold text-primary">already proven</span>. Start building today.
        </p>
      </div>

      {/* Compact Stats - 3-col horizontal layout on all sizes */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="bg-white border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a] md:shadow-[3px_3px_0px_0px_#1a1a1a] p-2.5 md:p-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 md:mb-1">Total Ideas</p>
            <p className="font-mono text-lg md:text-2xl font-bold text-black">73</p>
          </div>
          <span className="material-symbols-outlined text-xl md:text-2xl text-black">lightbulb</span>
        </div>

        <div className="bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a] md:shadow-[3px_3px_0px_0px_#1a1a1a] p-2.5 md:p-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5 md:mb-1">High Demand</p>
            <p className="font-mono text-lg md:text-2xl font-bold text-white">0</p>
          </div>
          <span className="material-symbols-outlined text-xl md:text-2xl text-primary">trending_up</span>
        </div>

        <div className="bg-white border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a] md:shadow-[3px_3px_0px_0px_#1a1a1a] p-2.5 md:p-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 md:mb-1">Categories</p>
            <p className="font-mono text-lg md:text-2xl font-bold text-black">25</p>
          </div>
          <span className="material-symbols-outlined text-xl md:text-2xl text-black">category</span>
        </div>
      </div>
    </div>
  )
}
