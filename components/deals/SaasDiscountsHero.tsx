export default function SaasDiscountsHero() {
  return (
    <div className="mb-4 md:mb-6">
      {/* Compact Header */}
      <div className="mb-2 md:mb-3">
        <div className="inline-block border-2 border-black bg-accent-yellow px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-2">
          VERIFIED DEALS
        </div>
        <h1 className="font-mono text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-black mb-1 leading-tight">
          SaaS Discounts for Startups
        </h1>
        <p className="font-sans text-sm md:text-base text-gray-700 leading-relaxed max-w-3xl">
          Cut your software costs by up to <span className="font-bold text-black bg-primary/20 px-1">90%</span> with exclusive startup discounts. Access Notion, Figma, Slack, and hundreds of other platforms.
        </p>
      </div>

      {/* Compact Stats — 3-col horizontal always */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-2 md:p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Tools</p>
            <p className="font-mono text-xl md:text-2xl font-bold text-black">240+</p>
          </div>
          <span className="material-symbols-outlined text-xl text-black hidden sm:block">apps</span>
        </div>

        <div className="bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-2 md:p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Savings</p>
            <p className="font-mono text-xl md:text-2xl font-bold text-white">$50K+</p>
          </div>
          <span className="material-symbols-outlined text-xl text-primary hidden sm:block">savings</span>
        </div>

        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-2 md:p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Categories</p>
            <p className="font-mono text-xl md:text-2xl font-bold text-black">25+</p>
          </div>
          <span className="material-symbols-outlined text-xl text-black hidden sm:block">category</span>
        </div>
      </div>
    </div>
  )
}