import Link from 'next/link'

export default function ProblemSection() {
    return (
        <section className="relative py-14 border-b-2 border-black grid-bg overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    {/* Label */}
                    <div className="inline-block bg-black text-white text-xs md:text-sm font-mono font-bold px-4 py-1.5 mb-6 uppercase tracking-wider neo-shadow-sm transform -rotate-1">
                        Why This Exists
                    </div>

                    {/* Headline */}
                    <h2 className="text-3xl md:text-5xl font-black text-black mb-6 leading-tight uppercase font-sans">
                        The problem isn't <br className="hidden md:block" />
                        lack of opportunities.<br />
                        <span className="bg-accent-red text-white px-2 mt-2 inline-block transform rotate-1">It's lack of visibility.</span>
                    </h2>

                    {/* Subheadline */}
                    <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed max-w-2xl mb-10 font-mono">
                        Startup credits, grants, and accelerator programs already exist.
                        But they're scattered across dozens of sites, buried in PDFs,
                        or discovered only after founders have already overspent.
                    </p>

                    {/* Insights Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10 text-left">
                        {/* Insight 1 */}
                        <div className="border-2 border-black p-5 bg-accent-yellow neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                            <span className="material-symbols-outlined text-3xl mb-3 block">schedule</span>
                            <p className="font-bold text-black text-sm font-mono">
                                Credits exist, but founders hear about them <span className="underline decoration-2">too late</span>.
                            </p>
                        </div>

                        {/* Insight 2 */}
                        <div className="border-2 border-black p-5 bg-accent-cyan neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                            <span className="material-symbols-outlined text-3xl mb-3 block">search_off</span>
                            <p className="font-bold text-black text-sm font-mono">
                                Grants are real, but eligibility and timelines are <span className="underline decoration-2">unclear</span>.
                            </p>
                        </div>

                        {/* Insight 3 */}
                        <div className="border-2 border-black p-5 bg-primary text-white neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                            <span className="material-symbols-outlined text-3xl mb-3 block">hourglass_empty</span>
                            <p className="font-bold text-white text-sm font-mono">
                                Accelerators are competitive, and most applications are <span className="underline decoration-2">rushed</span>.
                            </p>
                        </div>
                    </div>

                    {/* Reframe Line */}
                    <div className="relative mb-10">
                        <div className="absolute -inset-1 bg-gray-200 transform rotate-1"></div>
                        <p className="relative z-10 text-xl md:text-2xl font-black text-black bg-white border-2 border-black px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            FoundersPrime brings all of this into one structured platform.
                        </p>
                    </div>

                    {/* Scroll Cue */}
                    <div className="animate-bounce">
                        <p className="font-mono text-xs font-bold text-gray-500 mb-2 uppercase tracking-tight">Here's what you can access</p>
                        <span className="material-symbols-outlined text-2xl">arrow_downward</span>
                    </div>

                </div>
            </div>
        </section>
    )
}
