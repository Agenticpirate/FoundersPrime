'use client'

export default function SaasHero() {
    return (
        <div className="mb-4 md:mb-6">
            {/* Compact Header */}
            <div className="mb-2 md:mb-3">
                <div className="inline-block border-2 border-black bg-accent-yellow px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-2">
                    Verified & Active Deals
                </div>
                <h1 className="font-mono text-3xl md:text-4xl font-bold tracking-tight text-black mb-1 leading-tight">
                    Free & Discounted SaaS
                </h1>
                <p className="font-sans text-sm md:text-base text-gray-700 leading-relaxed max-w-3xl">
                    Stop paying full price for software. Access <span className="font-bold text-black bg-primary/20 px-1">hundreds of</span> SaaS tools for free or at massive discounts. From productivity to marketing to customer support — we&apos;ve got your entire stack covered.
                </p>
            </div>

            {/* Compact Stats - Horizontal Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
                    <div>
                        <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Deals</p>
                        <p className="font-mono text-2xl font-bold text-black">203</p>
                    </div>
                    <span className="material-symbols-outlined text-2xl text-black">local_offer</span>
                </div>

                <div className="bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
                    <div>
                        <p className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Savings</p>
                        <p className="font-mono text-2xl font-bold text-white">$500K+</p>
                    </div>
                    <span className="material-symbols-outlined text-2xl text-primary">savings</span>
                </div>

                <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
                    <div>
                        <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Categories</p>
                        <p className="font-mono text-2xl font-bold text-black">8+</p>
                    </div>
                    <span className="material-symbols-outlined text-2xl text-black">category</span>
                </div>
            </div>
        </div>
    )
}
