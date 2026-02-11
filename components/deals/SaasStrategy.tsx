export default function SaasStrategy() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
            <div className="lg:col-span-8">
                <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6 md:p-8 relative overflow-hidden">
                    {/* Decorative background pattern */}
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <span className="material-symbols-outlined text-[150px]">layers</span>
                    </div>

                    <h2 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
                        <span className="bg-black text-white size-8 flex items-center justify-center text-lg rounded-sm">1</span>
                        The Lean Stack Strategy
                    </h2>

                    <div className="prose prose-neutral max-w-none">
                        <h3 className="font-mono text-lg font-bold uppercase mb-3 text-primary bg-black inline-block px-2 text-white">
                            Don't Pay Until Scale
                        </h3>
                        <p className="font-sans text-gray-700 mb-4 text-base">
                            The modern startup stack is expensive. By leveraging startup programs, you can delay major SaaS costs for 12-24 months.
                            Smart founders stack free tiers (Notion, Linear, GitHub) with startup credits (AWS, Stripe, Segment) to keep burn near zero.
                        </p>

                        <div className="bg-gray-100 border-2 border-dashed border-gray-400 p-4 rounded-sm mb-6">
                            <p className="font-mono text-xs font-bold text-gray-500 uppercase mb-3">Essential Free Tiers</p>
                            <ul className="space-y-2 font-mono text-sm">
                                <li className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green-600 text-sm">check_circle</span>
                                    <span>CRM: HubSpot for Startups (90% off)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green-600 text-sm">check_circle</span>
                                    <span>Design: Figma (Free for students/educators)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green-600 text-sm">check_circle</span>
                                    <span>Docs: Notion (6 months free)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
                {/* Pro Tip Card */}
                <div className="bg-accent-yellow border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 bg-white border-2 border-black rounded-full p-2 size-16 flex items-end justify-center">
                        <span className="material-symbols-outlined text-3xl mb-1">lightbulb</span>
                    </div>
                    <h3 className="font-mono text-xl font-bold mb-3 uppercase">Secret Credits</h3>
                    <p className="font-mono text-xs leading-relaxed font-medium">
                        Many SaaS providers don&apos;t advertise their startup programs publicly. If you don&apos;t see a deal here, email their support mentioning you are a "Seed stage startup backed by [Accelerator/VC]" - it works 60% of the time.
                    </p>
                </div>

                {/* Newsletter / CTA Card */}
                <div className="bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
                    <h3 className="font-mono text-lg font-bold mb-3 text-primary">Deal Alerts</h3>
                    <p className="font-sans text-gray-300 mb-4 text-xs">
                        New SaaS discounts drop every Tuesday.
                    </p>
                    <div className="flex flex-col gap-3">
                        <input
                            className="w-full bg-gray-800 border-2 border-gray-700 text-white px-3 py-2 font-mono text-xs focus:outline-none focus:border-primary focus:ring-0 placeholder:text-gray-500 rounded-sm"
                            placeholder="founder@startup.com"
                            type="email"
                        />
                        <button className="w-full py-2 text-xs uppercase bg-primary hover:bg-white border-2 border-white text-black font-mono font-bold rounded-sm shadow-[2px_2px_0px_0px_#888] hover:shadow-[1px_1px_0px_0px_#888] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
