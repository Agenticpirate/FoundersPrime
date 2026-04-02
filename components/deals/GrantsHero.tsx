export default function GrantsHero() {
  return (
    <div className="mb-6">
      <div className="mb-4 md:mb-6">
        <div className="inline-block border-2 border-black bg-accent-yellow px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-3">
          NON-DILUTIVE FUNDING
        </div>
        <h1 className="font-mono text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-3 leading-tight">
          Startup Grants &amp; Competitions
        </h1>
        <p className="font-sans text-sm md:text-base text-gray-700 leading-relaxed max-w-3xl">
          Get funded without giving up equity. Access verified grants from government agencies, foundations, and global competitions — from $10K micro-grants to $100M+ prize pools.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-4">
        <div className="bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-3 md:p-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Total Funding Available</p>
            <p className="font-mono text-xl md:text-2xl font-bold text-white">$237M+</p>
          </div>
          <span className="material-symbols-outlined text-xl text-primary hidden sm:block">trending_up</span>
        </div>
        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-3 md:p-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Equity Required</p>
            <p className="font-mono text-xl md:text-2xl font-bold text-black">0%</p>
          </div>
          <span className="material-symbols-outlined text-xl text-black hidden sm:block">block</span>
        </div>
      </div>
    </div>
  )
}
