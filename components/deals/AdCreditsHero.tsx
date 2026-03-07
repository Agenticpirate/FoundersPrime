export default function AdCreditsHero() {
  return (
    <div className="mb-8">
      {/* Compact Header */}
      <div className="mb-4">
        <div className="inline-block border-2 border-black bg-accent-yellow px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-2">
          Verified Marketing Deals
        </div>
        <h1 className="font-mono text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-black mb-2 leading-tight">
          Growth Capital Without Dilution
        </h1>
        <p className="font-sans text-sm md:text-base text-gray-700 leading-relaxed max-w-3xl">
          Acquire your first 10,000 users for free. Access over <span className="font-bold text-black bg-primary/20 px-1">$75,000+</span> in ad credits from Google, Meta, TikTok, and more.
        </p>
      </div>

      {/* Compact Stats - Horizontal Layout */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-2 md:p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Value</p>
            <p className="font-mono text-2xl font-bold text-black">$75K+</p>
          </div>
          <span className="material-symbols-outlined text-2xl text-black">payments</span>
        </div>

        <div className="bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-2 md:p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Programs</p>
            <p className="font-mono text-2xl font-bold text-white">12+</p>
          </div>
          <span className="material-symbols-outlined text-2xl text-primary">campaign</span>
        </div>

        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-2 md:p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Providers</p>
            <p className="font-mono text-2xl font-bold text-black">10+</p>
          </div>
          <span className="material-symbols-outlined text-2xl text-black">public</span>
        </div>
      </div>
    </div>
  )
}