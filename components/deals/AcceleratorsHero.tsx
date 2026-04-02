export default function AcceleratorsHero() {
  return (
    <div className="mb-4 md:mb-6">
      <div className="mb-3 md:mb-4">
        <div className="inline-block border-2 border-black bg-accent-yellow px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-2">
          FUNDING + MENTORSHIP
        </div>
        <h1 className="font-mono text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-2 leading-tight">
          Startup Accelerators
        </h1>
        <p className="font-sans text-sm md:text-base text-gray-700 leading-relaxed max-w-3xl">
          Get funded, mentored, and connected through top accelerator programs. Access <span className="font-bold text-black bg-primary/20 px-1">$250K+</span> in funding plus invaluable networks from Y Combinator, Techstars, and global programs.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-4">
        <div className="bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-3 md:p-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Avg Investment</p>
            <p className="font-mono text-xl md:text-2xl font-bold text-white">$250K</p>
          </div>
          <span className="material-symbols-outlined text-xl text-primary hidden sm:block">trending_up</span>
        </div>
        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-3 md:p-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Acceptance Rate</p>
            <p className="font-mono text-xl md:text-2xl font-bold text-black">~2%</p>
          </div>
          <span className="material-symbols-outlined text-xl text-black hidden sm:block">filter_alt</span>
        </div>
      </div>
    </div>
  )
}
