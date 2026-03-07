export default function CloudCreditsHero() {
  return (
    <div className="mb-8">
      {/* Compact Header */}
      <div className="mb-4">
        <div className="inline-block border-2 border-black bg-accent-yellow px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-2">
          Verified & Active Programs
        </div>
        <h1 className="font-mono text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-black mb-2 leading-tight">
          Non-Dilutive Cloud Capital
        </h1>
        <p className="font-sans text-sm md:text-base text-gray-700 leading-relaxed max-w-3xl">
          Scale your startup without burning cash. Access over <span className="font-bold text-black bg-primary/20 px-1">$500,000+</span> in free cloud credits from major providers like AWS, Google Cloud, and Azure.
        </p>
      </div>

      {/* Compact Stats - Horizontal Layout */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-2 md:p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Value</p>
            <p className="font-mono text-2xl font-bold text-black">$2.4M+</p>
          </div>
          <span className="material-symbols-outlined text-2xl text-black">payments</span>
        </div>

        <div className="bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-2 md:p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Programs</p>
            <p className="font-mono text-2xl font-bold text-white">15+</p>
          </div>
          <span className="material-symbols-outlined text-2xl text-primary">inventory_2</span>
        </div>

        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-2 md:p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Providers</p>
            <p className="font-mono text-2xl font-bold text-black">40+</p>
          </div>
          <span className="material-symbols-outlined text-2xl text-black">public</span>
        </div>
      </div>
    </div>
  )
}