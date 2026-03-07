'use client'

export default function DealsHero() {
    return (
        <div className="mb-4 md:mb-8">
            {/* Neo-Brutalist Header Block */}
            <div className="mb-3 md:mb-6 relative">
                <div className="inline-block border-2 border-black bg-accent-yellow px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wide rounded-sm mb-2 shadow-[2px_2px_0px_0px_#1a1a1a]">
                    Verified Opportunities
                </div>
                <h1 className="font-mono text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-black mb-2 md:mb-4 leading-none">
                    Startup Deals &amp; Credits
                </h1>
                <p className="font-sans text-sm md:text-lg text-gray-700 leading-relaxed max-w-3xl border-l-4 border-black pl-3">
                    500+ verified opportunities to save money and grow faster. Access <span className="font-bold text-black bg-primary/20 px-1">$2.4M+</span> in cloud credits, SaaS discounts, grants, and more.
                </p>
            </div>

            {/* Stats - Horizontal Layout (Ultra Compact) */}
            <div className="grid grid-cols-3 gap-2 md:gap-3">
                <div className="bg-white border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a] p-3 flex flex-row items-center justify-between hover:translate-y-0.5 hover:shadow-none transition-all">
                    <div className="flex flex-col">
                        <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider">Active Deals</p>
                        <p className="font-mono text-2xl font-black text-black leading-none mt-1">523</p>
                    </div>
                    <span className="material-symbols-outlined text-2xl text-black bg-gray-100 p-1.5 rounded-full">local_offer</span>
                </div>

                <div className="bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a] p-3 flex flex-row items-center justify-between hover:translate-y-0.5 hover:shadow-none transition-all">
                    <div className="flex flex-col">
                        <p className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Value</p>
                        <p className="font-mono text-2xl font-black text-white leading-none mt-1">$2.4M+</p>
                    </div>
                    <span className="material-symbols-outlined text-2xl text-primary bg-gray-800 p-1.5 rounded-full">payments</span>
                </div>

                <div className="bg-white border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a] p-3 flex flex-row items-center justify-between hover:translate-y-0.5 hover:shadow-none transition-all">
                    <div className="flex flex-col">
                        <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider">New This Week</p>
                        <p className="font-mono text-2xl font-black text-black leading-none mt-1">47</p>
                    </div>
                    <span className="material-symbols-outlined text-2xl text-black bg-gray-100 p-1.5 rounded-full">new_releases</span>
                </div>
            </div>
        </div>
    )
}
