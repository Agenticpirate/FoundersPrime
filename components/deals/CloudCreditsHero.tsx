export default function CloudCreditsHero() {
  return (
    <div className="mb-3 md:mb-5">
      <div className="mb-2">
        <div className="inline-block border border-black bg-accent-yellow px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide rounded-sm mb-1.5">
          Verified & Active
        </div>
        <h1 className="font-mono text-lg md:text-3xl font-bold tracking-tight text-black mb-1 leading-tight">
          Non-Dilutive Cloud Capital
        </h1>
        <p className="text-xs md:text-sm text-gray-600 max-w-2xl">
          Access <span className="font-bold text-black">$500K+</span> in free cloud credits from AWS, Google Cloud, Azure, and more.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-1.5 md:gap-3">
        <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] p-2 md:p-3">
          <p className="font-mono text-[8px] md:text-[10px] font-bold text-gray-400 uppercase">Total Value</p>
          <p className="font-mono text-lg md:text-2xl font-bold text-black">$2.4M+</p>
        </div>
        <div className="bg-black text-white border-2 border-black shadow-[2px_2px_0px_#111] p-2 md:p-3">
          <p className="font-mono text-[8px] md:text-[10px] font-bold text-gray-500 uppercase">Programs</p>
          <p className="font-mono text-lg md:text-2xl font-bold">15+</p>
        </div>
        <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] p-2 md:p-3">
          <p className="font-mono text-[8px] md:text-[10px] font-bold text-gray-400 uppercase">Providers</p>
          <p className="font-mono text-lg md:text-2xl font-bold text-black">40+</p>
        </div>
      </div>
    </div>
  )
}
