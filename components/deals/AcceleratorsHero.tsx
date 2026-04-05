export default function AcceleratorsHero() {
  return (
    <div className="mb-3 md:mb-5">
      <div className="mb-2">
        <div className="inline-block border border-black bg-accent-yellow px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide rounded-sm mb-1.5">
          Funding + Mentorship
        </div>
        <h1 className="font-mono text-lg md:text-3xl font-bold tracking-tight text-black mb-1 leading-tight">
          Startup Accelerators
        </h1>
        <p className="text-xs md:text-sm text-gray-600 max-w-2xl">
          Get funded and mentored through top programs. Access <span className="font-bold text-black">$250K+</span> in funding from YC, Techstars, and global programs.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-1.5 md:gap-3">
        <div className="bg-black text-white border-2 border-black shadow-[2px_2px_0px_#111] p-2 md:p-3">
          <p className="font-mono text-[8px] md:text-[10px] font-bold text-gray-500 uppercase">Avg Investment</p>
          <p className="font-mono text-lg md:text-2xl font-bold">$250K</p>
        </div>
        <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] p-2 md:p-3">
          <p className="font-mono text-[8px] md:text-[10px] font-bold text-gray-400 uppercase">Acceptance</p>
          <p className="font-mono text-lg md:text-2xl font-bold text-black">~2%</p>
        </div>
      </div>
    </div>
  )
}
