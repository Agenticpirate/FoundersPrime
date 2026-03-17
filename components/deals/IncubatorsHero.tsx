export default function IncubatorsHero() {
  return (
    <div className="mb-6 md:mb-6 md:mb-4 md:mb-6">
      {/* Compact Header */}
      <div className="mb-4 md:mb-6">
        <div className="inline-block border-2 border-black bg-accent-yellow px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-3">
          GLOBAL DIRECTORY 2026
        </div>
        <h1 className="font-mono text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-3 leading-tight">
          Startup Incubators & Venture Studios
        </h1>
        <p className="font-sans text-base text-gray-700 leading-relaxed max-w-3xl">
          Discover <span className="font-bold text-black bg-primary/20 px-1">22 active incubators</span> worldwide including university programs, corporate innovation labs, and venture studios. Many offer equity-free support, lab access, and co-founding opportunities.
        </p>
      </div>

      {/* Compact Stats - Horizontal Layout */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-2 md:p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Active Programs</p>
            <p className="font-mono text-2xl font-bold text-black">22</p>
          </div>
          <span className="material-symbols-outlined text-2xl text-black">factory</span>
        </div>

        <div className="bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-2 md:p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Equity-Free</p>
            <p className="font-mono text-2xl font-bold text-white">18%</p>
          </div>
          <span className="material-symbols-outlined text-2xl text-primary">verified</span>
        </div>

        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-2 md:p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Venture Studios</p>
            <p className="font-mono text-2xl font-bold text-black">4</p>
          </div>
          <span className="material-symbols-outlined text-2xl text-black">business_center</span>
        </div>
      </div>
    </div>
  )
}