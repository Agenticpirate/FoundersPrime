export default function SaasStrategy() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 md:gap-4 mb-3 md:mb-5">
            <div className="lg:col-span-8">
                <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] p-3 md:p-5">
                    <h2 className="font-mono text-sm md:text-lg font-bold text-black mb-2 flex items-center gap-2">
                        <span className="bg-black text-white w-6 h-6 flex items-center justify-center text-xs rounded-sm">1</span>
                        The Lean Stack Strategy
                    </h2>
                    <p className="text-xs text-gray-600 mb-2">
                        Stack free tiers with startup credits to keep burn near zero for 12-24 months.
                    </p>
                    <div className="bg-gray-50 border border-dashed border-gray-300 p-2 md:p-3 rounded-sm">
                        <p className="font-mono text-[9px] font-bold text-gray-400 uppercase mb-1.5">Essential Free Tiers</p>
                        <div className="space-y-1 font-mono text-[11px] md:text-xs">
                            {[
                                'CRM: HubSpot for Startups (90% off)',
                                'Design: Figma (Free for students)',
                                'Docs: Notion (6 months free)',
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                    <span className="w-1 h-1 bg-black rounded-full flex-shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-4">
                <div className="bg-accent-yellow border-2 border-black shadow-[2px_2px_0px_#111] p-3">
                    <h3 className="font-mono text-xs font-bold mb-1.5 uppercase">Secret Credits</h3>
                    <p className="font-mono text-[11px] leading-relaxed">
                        Many SaaS providers don&apos;t advertise startup programs. Email support mentioning you&apos;re a seed-stage startup — it works 60% of the time.
                    </p>
                </div>
            </div>
        </div>
    )
}
