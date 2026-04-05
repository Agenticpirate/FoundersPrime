export default function GrantsHero() {
  return (
    <div className="mb-3 md:mb-5">
      <div className="mb-2">
        <div className="inline-block border border-black bg-accent-yellow px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide rounded-sm mb-1.5">
          Non-Dilutive Funding
        </div>
        <h1 className="font-mono text-lg md:text-3xl font-bold tracking-tight text-black mb-1 leading-tight">
          Startup Grants & Competitions
        </h1>
        <p className="text-xs md:text-sm text-gray-600 max-w-2xl">
          Get funded without giving up equity. Verified grants from government agencies, foundations, and competitions.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-1.5 md:gap-3">
        <div className="bg-black text-white border-2 border-black shadow-[2px_2px_0px_#111] p-2 md:p-3">
          <p className="font-mono text-[8px] md:text-[10px] font-bold text-gray-500 uppercase">Total Funding</p>
          <p className="font-mono text-lg md:text-2xl font-bold">$237M+</p>
        </div>
        <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] p-2 md:p-3">
          <p className="font-mono text-[8px] md:text-[10px] font-bold text-gray-400 uppercase">Equity Required</p>
          <p className="font-mono text-lg md:text-2xl font-bold text-black">0%</p>
        </div>
      </div>
    </div>
  )
}
