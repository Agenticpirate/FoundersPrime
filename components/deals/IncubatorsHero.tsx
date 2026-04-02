export default function IncubatorsHero() {
  return (
    <div className="mb-6">
      <div className="mb-4 md:mb-6">
        <div className="inline-block border-2 border-black bg-accent-yellow px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-3">
          GLOBAL DIRECTORY
        </div>
        <h1 className="font-mono text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-3 leading-tight">
          Startup Incubators &amp; Venture Studios
        </h1>
        <p className="font-sans text-sm md:text-base text-gray-700 leading-relaxed max-w-3xl">
          Discover verified incubators worldwide — university programs, corporate innovation labs, and venture studios. Many offer equity-free support, lab access, and co-founding opportunities.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-4">
        <div className="bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-3 md:p-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Equity-Free Options</p>
            <p className="font-mono text-xl md:text-2xl font-bold text-white">Available</p>
          </div>
          <span className="material-symbols-outlined text-xl text-primary hidden sm:block">verified</span>
        </div>
        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-3 md:p-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Includes</p>
            <p className="font-mono text-xl md:text-2xl font-bold text-black">Venture Studios</p>
          </div>
          <span className="material-symbols-outlined text-xl text-black hidden sm:block">business_center</span>
        </div>
      </div>
    </div>
  )
}
