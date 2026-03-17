export default function SaasDiscountsHero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-10 md:mb-14">
      <div className="lg:col-span-7 flex flex-col justify-center">
        <div className="inline-block w-fit border-2 border-black bg-accent-yellow px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide rounded-sm mb-4">
          VERIFIED DEALS
        </div>
        <h1 className="font-mono text-5xl md:text-6xl font-bold tracking-tight text-black mb-6 leading-[1.1]">
          SaaS Discounts <br className="hidden md:block"/> for Startups
        </h1>
        <p className="font-sans text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl border-l-4 border-primary pl-6 py-1">
          Cut your software costs by up to <span className="font-bold text-black bg-primary/20 px-1">90%</span> with exclusive startup discounts. Access premium tools from Notion, Figma, Slack, and 200+ other platforms. Most deals stack with existing promotions.
        </p>
      </div>
      
      {/* Stats */}
      <div className="lg:col-span-5 flex flex-col gap-5">
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6 flex items-center justify-between">
          <div>
            <p className="font-mono text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Tools Available</p>
            <p className="font-mono text-4xl font-bold text-black">240+</p>
          </div>
          <span className="material-symbols-outlined text-4xl text-black">apps</span>
        </div>
        
        <div className="bg-black text-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6 flex items-center justify-between">
          <div>
            <p className="font-mono text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Potential Savings</p>
            <p className="font-mono text-4xl font-bold text-white">$50K+</p>
          </div>
          <span className="material-symbols-outlined text-4xl text-primary">savings</span>
        </div>
        
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6 flex items-center justify-between">
          <div>
            <p className="font-mono text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Categories</p>
            <p className="font-mono text-4xl font-bold text-black">25+</p>
          </div>
          <span className="material-symbols-outlined text-4xl text-black">category</span>
        </div>
      </div>
    </div>
  )
}