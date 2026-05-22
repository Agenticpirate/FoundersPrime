'use client'

import { useRef, useState, useEffect } from 'react'

const insights = [
    {
        icon: 'schedule',
        title: 'Heard too late',
        text: 'You only find the $50K credit after you\'ve burned $50K. The clock\'s already running.',
        bg: 'bg-accent-yellow',
        accent: 'bg-orange-400',
    },
    {
        icon: 'search_off',
        title: 'Buried details',
        text: 'Grants exist — but eligibility is buried in 40-page PDFs no founder has time to read.',
        bg: 'bg-blue-100',
        accent: 'bg-blue-500',
    },
    {
        icon: 'hourglass_empty',
        title: 'Last-minute apps',
        text: 'Accelerator deadlines hit your inbox the night before. Rushed apps don\'t get accepted.',
        bg: 'bg-pink-100',
        accent: 'bg-pink-500',
    },
    {
        icon: 'school',
        title: 'Students get more',
        text: 'Most student perks aren\'t advertised. Next\'Founder unlocks the ones built for builders.',
        bg: 'bg-green-100',
        accent: 'bg-green-500',
    },
]

export default function ProblemSection() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [activeIdx, setActiveIdx] = useState(0)
    const isTouch = useRef(false)
    const CARD_COUNT = insights.length

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
        <section className="relative py-8 md:py-14 overflow-hidden border-b-2 border-black bg-gradient-to-b from-white via-gray-50 to-white grid-bg">
            {/* Soft accent blobs */}
            <div className="absolute -top-20 right-1/4 w-72 h-72 bg-accent-yellow/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 left-0 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top header row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                    {/* Left: header + copy */}
                    <div className="lg:col-span-7 flex flex-col items-start">
                        <span className="inline-flex items-center gap-1.5 bg-black text-accent-yellow font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border border-black mb-3 md:mb-4">
                            <span className="material-symbols-outlined text-[12px]">visibility_off</span>
                            The hidden cost most founders pay
                        </span>

                        <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-black mb-4 leading-[1.05] uppercase font-sans w-full">
                            The problem isn't<br className="hidden sm:block" />
                            <span className="text-gray-500">missing opportunities.</span><br />
                            <span className="relative inline-block mt-2">
                                <span className="absolute inset-0 bg-accent-red transform -skew-y-1 -z-0" />
                                <span className="relative text-white px-3 py-1 inline-block">It's not finding them in time.</span>
                            </span>
                        </h2>

                        <p className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium leading-relaxed max-w-xl mb-4">
                            Most founders leave <strong>$50K–$500K on the table</strong> in their first 18 months — not because the credits don't exist, but because they're scattered, buried, or surface days before deadline.
                        </p>

                        {/* Cost meter — three stat tiles, same vertical footprint */}
                        <div className="grid grid-cols-3 gap-2 w-full max-w-xl mb-4">
                            {[
                                { value: '40+', label: 'Sites to track', icon: 'public' },
                                { value: '20hr', label: 'Wasted/week', icon: 'schedule' },
                                { value: '$50K+', label: 'Left behind', icon: 'trending_down' },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className="bg-white border-2 border-black p-2 md:p-3 shadow-[2px_2px_0px_#111] flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
                                >
                                    <span className="material-symbols-outlined text-base md:text-lg text-accent-red flex-shrink-0">{s.icon}</span>
                                    <div className="min-w-0">
                                        <p className="font-mono font-black text-sm md:text-base leading-none text-black">{s.value}</p>
                                        <p className="font-mono text-[8px] md:text-[9px] uppercase tracking-widest text-gray-500 mt-0.5 truncate">{s.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="relative w-full max-w-xl">
                            <div className="absolute -inset-1 bg-accent-yellow transform -rotate-1 border-2 border-black" />
                            <p className="relative z-10 text-sm md:text-base font-black text-black bg-white border-2 border-black px-4 py-3 shadow-[3px_3px_0px_#111] flex items-center gap-2">
                                <span className="material-symbols-outlined text-base text-accent-yellow bg-black p-0.5 rounded-sm flex-shrink-0">bolt</span>
                                One terminal. Every deal that matters. Verified weekly.
                            </p>
                        </div>
                    </div>

                    {/* Right: insight cards */}
                    <div className="lg:col-span-5 w-full">
                        <div
                            ref={scrollRef}
                            onScroll={handleScroll}
                            onTouchStart={() => { isTouch.current = true }}
                            onTouchEnd={() => { setTimeout(() => { isTouch.current = false }, 2000) }}
                            className="flex sm:grid sm:grid-cols-2 gap-3 md:gap-4 w-full text-left overflow-x-auto snap-x snap-mandatory pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:pt-0 scroll-smooth mobile-scroll-hide"
                        >
                            {insights.map((insight, idx) => (
                                <div
                                    key={insight.title}
                                    className={`relative ${insight.bg} border-2 border-black p-4 md:p-5 shadow-[3px_3px_0px_#111] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#111] transition-all snap-start shrink-0 w-[85vw] sm:w-auto h-full flex flex-col group overflow-hidden insight-fade-in`}
                                    style={{ animationDelay: `${idx * 80}ms` }}
                                >
                                    <div className={`absolute -top-4 -right-4 w-16 h-16 ${insight.accent} opacity-30 rounded-full blur-2xl group-hover:opacity-50 transition-opacity pointer-events-none`} />

                                    <div className="relative z-10 flex items-start gap-2.5 mb-2">
                                        <div className="w-9 h-9 bg-white border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_#111]">
                                            <span className="material-symbols-outlined text-lg text-black">{insight.icon}</span>
                                        </div>
                                        <h3 className="font-mono font-black text-[11px] md:text-xs uppercase tracking-wider text-black pt-1.5">
                                            {insight.title}
                                        </h3>
                                    </div>
                                    <p className="relative z-10 font-sans text-sm md:text-[15px] text-black leading-snug font-medium">
                                        {insight.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Mobile dots */}
                        <div className="flex sm:hidden justify-center gap-1.5 mt-2">
                            {insights.map((_, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        width: activeIdx === idx ? 16 : 6,
                                        height: 6,
                                        backgroundColor: activeIdx === idx ? '#000' : '#d1d5db',
                                        transition: 'all 0.3s',
                                    }}
                                />
                            ))}
                        </div>

                        {/* Audience reel — sleek minimalist animation strip (desktop only) */}
                        <div className="hidden sm:block mt-4 relative bg-white border-2 border-black shadow-[3px_3px_0px_#111] overflow-hidden">
                            {/* Decorative left bar */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-yellow" />

                            <div className="flex items-center gap-3 px-4 py-3">
                                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-black flex-shrink-0">
                                    Built for
                                </span>

                                {/* Vertical scroll reel */}
                                <div className="relative h-5 flex-1 overflow-hidden">
                                    <div className="audience-reel">
                                        {[
                                            { icon: 'rocket_launch', label: 'First-time founders', color: 'text-orange-600' },
                                            { icon: 'school', label: 'Student builders', color: 'text-pink-600' },
                                            { icon: 'payments', label: 'Grant seekers', color: 'text-green-600' },
                                            { icon: 'trending_up', label: 'Bootstrappers', color: 'text-blue-600' },
                                            { icon: 'lightbulb', label: 'Indie hackers', color: 'text-amber-600' },
                                            { icon: 'code', label: 'Solo devs', color: 'text-purple-600' },
                                            { icon: 'rocket_launch', label: 'First-time founders', color: 'text-orange-600' },
                                        ].map((item, i) => (
                                            <div key={i} className="h-5 flex items-center gap-1.5 font-mono text-[12px] font-black">
                                                <span className={`material-symbols-outlined text-[14px] ${item.color}`}>{item.icon}</span>
                                                <span className="text-black">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tiny pulse */}
                                <div className="flex items-center gap-1 flex-shrink-0">
                                    <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-gray-400">Live</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes insightFadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .insight-fade-in {
                    animation: insightFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                /* Audience reel — vertical cycle with hold + transition */
                @keyframes audienceReel {
                    0%, 14%   { transform: translateY(0); }
                    16%, 30%  { transform: translateY(-20px); }
                    32%, 46%  { transform: translateY(-40px); }
                    48%, 62%  { transform: translateY(-60px); }
                    64%, 78%  { transform: translateY(-80px); }
                    80%, 94%  { transform: translateY(-100px); }
                    96%, 100% { transform: translateY(-120px); }
                }
                .audience-reel {
                    animation: audienceReel 14s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                    .audience-reel {
                        animation: none;
                    }
                }
            `}</style>
        </section>
    )
}
