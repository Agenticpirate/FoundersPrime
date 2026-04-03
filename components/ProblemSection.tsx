'use client'

import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'

export default function ProblemSection() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [activeIdx, setActiveIdx] = useState(0)
    const isTouch = useRef(false)
    const CARD_COUNT = 4

    // Auto-advance every 3 seconds on mobile
    useEffect(() => {
        const interval = setInterval(() => {
            if (isTouch.current) return
            const container = scrollRef.current
            if (!container) return
            const next = (activeIdx + 1) % CARD_COUNT
            const card = container.children[next] as HTMLElement
            if (card) {
                container.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' })
                setActiveIdx(next)
            }
        }, 3000)
        return () => clearInterval(interval)
    }, [activeIdx])

    const handleScroll = () => {
        const container = scrollRef.current
        if (!container) return
        const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth || 0
        const idx = Math.round(container.scrollLeft / (cardWidth + 16))
        setActiveIdx(Math.min(idx, CARD_COUNT - 1))
    }

    return (
        <section className="relative py-4 md:py-8 lg:py-10 overflow-hidden grid-bg flex flex-col border-b-2 border-black">
            <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center w-full">
                    
                    {/* Left side: Text & Context */}
                    <div className="flex-1 flex flex-col items-start text-left w-full lg:max-w-[55%]">
                        {/* Label */}
                        <div className="inline-block bg-black text-white text-xs font-mono font-bold px-3 py-1 mb-2 md:mb-3 uppercase tracking-wider neo-shadow-sm transform -rotate-2 self-start">
                            Why This Exists
                        </div>

                        {/* Headline */}
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-black mb-3 leading-[1.1] uppercase font-sans w-full">
                            The problem isn't <br className="hidden sm:block" />
                            lack of opportunities.<br />
                            <span className="bg-accent-red text-white px-3 mt-2 inline-block transform rotate-1 origin-left border-2 border-black neo-shadow-sm">It's lack of visibility.</span>
                        </h2>

                        {/* Subheadline */}
                        <p className="text-xs sm:text-lg lg:text-xl text-gray-800 font-medium leading-relaxed max-w-xl mb-4 font-mono bg-white/70 p-2 sm:p-0 sm:bg-transparent border-2 border-black sm:border-none shadow-[2px_2px_0_0_rgba(0,0,0,1)] sm:shadow-none">
                            Startup credits, grants, and accelerator programs already exist.
                            But they're scattered across dozens of sites, buried in PDFs,
                            or discovered only after founders have already overspent.
                        </p>

                        {/* Reframe Line */}
                        <div className="relative mb-0 md:mb-2 w-full max-w-xl">
                            <div className="absolute -inset-1 bg-gray-200 transform -rotate-1 border-2 border-black"></div>
                            <p className="relative z-10 text-sm md:text-lg font-black text-black bg-white border-2 border-black px-4 py-3 neo-shadow">
                                FoundersPrime brings all of this into one structured platform.
                            </p>
                        </div>

                    </div>

                    {/* Right side: Cards */}
                    <div className="flex-1 w-full lg:max-w-[45%]">
                        {/* Insights — horizontal auto-scroll on mobile, 2x2 grid on sm+ */}
                        <div
                            ref={scrollRef}
                            onScroll={handleScroll}
                            onTouchStart={() => { isTouch.current = true }}
                            onTouchEnd={() => { setTimeout(() => { isTouch.current = false }, 2000) }}
                            className="flex sm:grid sm:grid-cols-2 gap-4 sm:gap-5 w-full text-left overflow-x-auto snap-x snap-mandatory pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:pt-0 scroll-smooth mobile-scroll-hide"
                        >
                            
                            {/* Insight 1 */}
                            <div className="border-2 border-black p-5 lg:p-6 bg-accent-yellow neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all snap-start shrink-0 w-[85vw] sm:w-auto h-full flex flex-col justify-start relative group">
                                <div className="absolute top-4 right-4 opacity-10 transform scale-150 rotate-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                                    <span className="material-symbols-outlined text-6xl">schedule</span>
                                </div>
                                <span className="material-symbols-outlined text-3xl mb-4 block text-black bg-white/50 w-fit p-1.5 rounded-md border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">schedule</span>
                                <p className="font-bold text-black text-sm md:text-base font-mono leading-snug z-10">
                                    Credits exist, but founders hear about them <span className="inline-block bg-black text-white px-1 mt-0.5 transform -rotate-1 rounded-sm">too late</span>.
                                </p>
                            </div>

                            {/* Insight 2 */}
                            <div className="border-2 border-black p-5 lg:p-6 bg-accent-cyan neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all snap-start shrink-0 w-[85vw] sm:w-auto h-full flex flex-col justify-start relative group">
                                <div className="absolute top-4 right-4 opacity-10 transform scale-150 -rotate-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                                    <span className="material-symbols-outlined text-6xl">search_off</span>
                                </div>
                                <span className="material-symbols-outlined text-3xl mb-4 block text-black bg-white/50 w-fit p-1.5 rounded-md border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">search_off</span>
                                <p className="font-bold text-black text-sm md:text-base font-mono leading-snug z-10">
                                    Grants are real, but eligibility and timelines are <span className="inline-block bg-white text-black border border-black px-1 mt-0.5 transform rotate-2 rounded-sm">unclear</span>.
                                </p>
                            </div>

                            {/* Insight 3 */}
                            <div className="border-2 border-black p-5 lg:p-6 bg-primary text-white neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all snap-start shrink-0 w-[85vw] sm:w-auto h-full flex flex-col justify-start relative group">
                                <div className="absolute top-4 right-4 opacity-10 transform scale-150 rotate-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                                    <span className="material-symbols-outlined text-6xl text-white">hourglass_empty</span>
                                </div>
                                <span className="material-symbols-outlined text-3xl mb-4 block text-black bg-white w-fit p-1.5 rounded-md border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">hourglass_empty</span>
                                <p className="font-bold text-white text-sm md:text-base font-mono leading-snug z-10">
                                    Accelerators are competitive, and applications are mostly <span className="inline-block bg-accent-orange text-black px-1 mt-0.5 transform -rotate-2 border border-black rounded-sm">rushed</span>.
                                </p>
                            </div>

                            {/* Insight 4 */}
                            <div className="border-2 border-black p-5 lg:p-6 bg-accent-orange text-black neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all snap-start shrink-0 w-[85vw] sm:w-auto h-full flex flex-col justify-start relative group">
                                <div className="absolute top-4 right-4 opacity-10 transform scale-150 -rotate-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                                    <span className="material-symbols-outlined text-6xl">school</span>
                                </div>
                                <span className="material-symbols-outlined text-3xl mb-4 block text-black bg-white/50 w-fit p-1.5 rounded-md border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">school</span>
                                <p className="font-bold text-black text-sm md:text-base font-mono leading-snug z-10">
                                    <span className="inline-block bg-accent-yellow border border-black px-1 mb-1 transform rotate-1 rounded-sm">Student Benefits:</span> Build for free with exclusive deals & credits.
                                </p>
                            </div>

                        </div>

                        {/* Animated scroll dots — mobile only */}
                        <div className="flex sm:hidden items-center justify-center gap-2 mt-4">
                            {[0, 1, 2, 3].map((idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        const container = scrollRef.current
                                        if (!container) return
                                        const card = container.children[idx] as HTMLElement
                                        if (card) { container.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' }) }
                                        setActiveIdx(idx)
                                    }}
                                    className={`transition-all duration-300 ${activeIdx === idx ? 'w-4 h-1.5 bg-black rounded-sm' : 'w-1.5 h-1.5 bg-gray-300 rounded-full'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

