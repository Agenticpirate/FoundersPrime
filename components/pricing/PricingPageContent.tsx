'use client'

import React from 'react'
import PricingPlans from '@/components/pricing/PricingPlans'
import PricingPartnerLogos from '@/components/pricing/PricingPartnerLogos'
import Pricing3DTestimonials from '@/components/pricing/Pricing3DTestimonials'
import { GlowingEffect } from '@/components/ui/GlowingEffect'
import { Currency } from '@/utils/currency'

export default function PricingPageContent() {
    const currency: Currency = 'USD'

    return (
        <main className="bg-white min-h-screen pb-12">
            {/* ── Compact Hero — designed to fit pricing cards above the fold ── */}
            <div className="relative bg-black text-white border-b-2 border-accent-yellow overflow-hidden">
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                        backgroundImage:
                            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />
                {/* Glow blobs */}
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-accent-yellow/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

                {/* Decorative mandalas */}
                <div className="absolute -top-12 right-1/4 w-44 h-44 pointer-events-none opacity-[0.10] hidden md:block" aria-hidden="true">
                    <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow pricing-hero-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
                        <circle cx="100" cy="100" r="40" />
                        <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
                        <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
                        {[0, 60, 120, 180, 240, 300].map((deg) => (
                            <g key={deg} transform={`rotate(${deg} 100 100)`}>
                                <line x1="100" y1="40" x2="100" y2="20" />
                                <circle cx="100" cy="20" r="2" fill="currentColor" />
                            </g>
                        ))}
                        <circle cx="100" cy="100" r="3" fill="currentColor" />
                    </svg>
                </div>
                <div className="absolute -bottom-10 left-10 w-32 h-32 pointer-events-none opacity-[0.07] hidden md:block" aria-hidden="true">
                    <svg viewBox="0 0 200 200" className="w-full h-full text-white pricing-hero-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.6">
                        <circle cx="100" cy="100" r="50" />
                        <circle cx="100" cy="100" r="35" strokeDasharray="3 3" />
                        {[...Array(12)].map((_, i) => (
                            <line
                                key={i}
                                x1="100"
                                y1="100"
                                x2={100 + Math.cos((i * Math.PI) / 6) * 90}
                                y2={100 + Math.sin((i * Math.PI) / 6) * 90}
                            />
                        ))}
                        <circle cx="100" cy="100" r="2" fill="currentColor" />
                    </svg>
                </div>

                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-7">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8">
                        {/* Left: headline */}
                        <div className="min-w-0 flex-1">
                            <div className="inline-flex items-center gap-1.5 bg-accent-yellow text-black px-2.5 py-0.5 font-mono text-[9.5px] font-black uppercase tracking-[0.14em] mb-2.5 border-2 border-black shadow-[2px_2px_0px_#fff]">
                                <span className="material-symbols-outlined !text-[11px]">bolt</span>
                                One membership · Every advantage
                            </div>
                            <h1 className="font-mono text-2xl md:text-3xl lg:text-[38px] font-black uppercase tracking-tight leading-[1.05]">
                                Built to ship faster.{' '}
                                <span className="bg-gradient-to-r from-accent-yellow via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                                    Built to spend less.
                                </span>
                            </h1>
                            <p className="text-gray-400 text-[12.5px] md:text-sm leading-relaxed mt-2 max-w-xl">
                                Vetted credits, SaaS deals, grants, and programs — all in one founder dashboard. Pick a plan, claim what you qualify for, keep building.
                            </p>
                        </div>

                        {/* Right: inline stat strip */}
                        <div className="flex gap-2 lg:gap-2.5 lg:flex-shrink-0">
                            {[
                                { value: '500+', label: 'Vetted deals', icon: 'inventory_2', color: 'text-accent-yellow', dot: 'bg-accent-yellow' },
                                { value: 'Weekly', label: 'New listings', icon: 'update', color: 'text-pink-300', dot: 'bg-pink-400' },
                                { value: '1-click', label: 'Apply flow', icon: 'rocket_launch', color: 'text-emerald-400', dot: 'bg-emerald-400' },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="relative flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/15 px-2.5 py-2 rounded-sm hover:bg-white/10 transition-colors flex-1 lg:flex-none lg:min-w-[120px]"
                                >
                                    <span className={`material-symbols-outlined !text-[18px] ${stat.color} flex-shrink-0`}>{stat.icon}</span>
                                    <div className="min-w-0">
                                        <p className={`font-mono text-[13px] md:text-base font-black ${stat.color} leading-none tabular-nums`}>
                                            {stat.value}
                                        </p>
                                        <p className="text-[8.5px] md:text-[9px] text-gray-400 font-bold uppercase mt-0.5 tracking-[0.1em] flex items-center gap-1">
                                            <span className={`w-1 h-1 rounded-full ${stat.dot}`} />
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Partner logos — slim strip ── */}
            <PricingPartnerLogos />

            {/* ── Plans (lifted) ── */}
            <div className="mt-2 mb-6 md:mb-10">
                <PricingPlans currency={currency} />
            </div>

            {/* ── Value Comparison ── */}
            <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-14">
                <div className="text-center mb-5 md:mb-8">
                    <span className="inline-flex items-center gap-1.5 bg-black text-accent-yellow font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.16em] px-2.5 py-1 border-2 border-black mb-2 shadow-[2px_2px_0px_#FFD500]">
                        <span className="material-symbols-outlined !text-[11px]">compare_arrows</span>
                        The Difference
                    </span>
                    <h2 className="font-mono text-lg md:text-3xl font-black uppercase mb-1 leading-tight">
                        Build solo, or build with{' '}
                        <span className="bg-accent-yellow px-2 inline-block border-2 border-black shadow-[2px_2px_0px_#111]">
                            FoundersPrime
                        </span>
                    </h2>
                    <p className="text-gray-600 text-xs md:text-base mt-3">Same goal. Two very different paths.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                    {/* The hard way */}
                    <div className="relative bg-white border-2 border-gray-300 p-4 md:p-6 rounded-sm overflow-hidden">
                        <div className="absolute -top-8 -right-8 w-32 h-32 pointer-events-none opacity-[0.06]" aria-hidden="true">
                            <svg viewBox="0 0 200 200" className="w-full h-full text-gray-700 comparison-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.6">
                                {[20, 35, 50, 65].map((r, i) => (
                                    <ellipse
                                        key={i}
                                        cx="100"
                                        cy="100"
                                        rx={r}
                                        ry={r / 1.8}
                                        transform={`rotate(${i * 30} 100 100)`}
                                    />
                                ))}
                                <circle cx="100" cy="100" r="2" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="relative">
                            <div className="absolute top-0 right-0 text-[8px] md:text-[10px] font-mono font-black text-gray-700 uppercase bg-gray-100 px-2 py-0.5 border-2 border-gray-300 tracking-wider rounded-sm">
                                The hard way
                            </div>
                            <h3 className="font-mono font-black text-sm md:text-lg mb-1 text-gray-700 uppercase">Going it alone</h3>
                            <p className="text-[10px] md:text-xs text-gray-500 mb-3 md:mb-4 font-mono">Hunting deals one by one</p>
                            <ul className="space-y-2 md:space-y-3 text-[11px] md:text-sm text-gray-700">
                                {[
                                    { text: 'Hours lost combing forums and threads' },
                                    { text: 'Dead links and expired discount codes' },
                                    { text: 'Eligibility unclear until you apply' },
                                    { text: 'Missed grants and programs you never saw' },
                                ].map((row) => (
                                    <li key={row.text} className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-gray-400 text-base flex-shrink-0 mt-0.5">remove_circle</span>
                                        <span className="flex-1">{row.text}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 pt-3 border-t border-dashed border-gray-300 flex items-center justify-between">
                                <span className="font-mono text-[10px] md:text-xs uppercase font-bold text-gray-600">Outcome</span>
                                <span className="font-mono text-[12px] md:text-sm font-black text-gray-700">Slow · Frustrating</span>
                            </div>
                        </div>
                    </div>

                    {/* With FoundersPrime */}
                    <div className="relative bg-gradient-to-br from-accent-yellow/15 to-white border-2 border-black p-4 md:p-6 shadow-[5px_5px_0px_#111,8px_8px_0px_#FFD500] rounded-sm overflow-hidden">
                        <div className="absolute -top-12 -right-12 w-44 h-44 pointer-events-none opacity-[0.10]" aria-hidden="true">
                            <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 comparison-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
                                <circle cx="100" cy="100" r="40" />
                                <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
                                <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
                                {[0, 60, 120, 180, 240, 300].map((deg) => (
                                    <g key={deg} transform={`rotate(${deg} 100 100)`}>
                                        <line x1="100" y1="40" x2="100" y2="20" />
                                        <circle cx="100" cy="20" r="2" fill="currentColor" />
                                    </g>
                                ))}
                                <circle cx="100" cy="100" r="3" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="relative">
                            <div className="absolute top-0 right-0 text-[8px] md:text-[10px] font-mono font-black text-accent-yellow uppercase bg-black px-2 py-0.5 border-2 border-black tracking-wider rounded-sm shadow-[1px_1px_0px_#FFD500]">
                                ✓ Recommended
                            </div>
                            <h3 className="font-mono font-black text-sm md:text-lg mb-1 text-black uppercase">With FoundersPrime</h3>
                            <p className="text-[10px] md:text-xs text-emerald-700 mb-3 md:mb-4 font-mono">One founder dashboard for everything</p>
                            <ul className="space-y-2 md:space-y-3 text-[11px] md:text-sm text-black">
                                {[
                                    { text: 'Hundreds of vetted deals in one dashboard' },
                                    { text: 'Direct apply links — no broken pages' },
                                    { text: 'Eligibility & application tips on every deal' },
                                    { text: 'Grants, accelerators, and credits matched to your stage' },
                                ].map((row) => (
                                    <li key={row.text} className="flex items-start gap-2">
                                        <span
                                            className="material-symbols-outlined text-emerald-600 text-base flex-shrink-0 mt-0.5"
                                            style={{ fontVariationSettings: "'FILL' 1" }}
                                        >
                                            check_circle
                                        </span>
                                        <span className="flex-1">{row.text}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 pt-3 border-t border-dashed border-black/30 flex items-center justify-between">
                                <span className="font-mono text-[10px] md:text-xs uppercase font-bold text-black">Outcome</span>
                                <span className="font-mono text-[12px] md:text-sm font-black text-emerald-700">Fast · Focused · Founder-built</span>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes comparisonMandalaSpin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    @keyframes comparisonMandalaSpinReverse {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(-360deg); }
                    }
                    :global(.comparison-mandala-spin) {
                        animation: comparisonMandalaSpin 90s linear infinite;
                        transform-origin: center;
                    }
                    :global(.comparison-mandala-spin-reverse) {
                        animation: comparisonMandalaSpinReverse 110s linear infinite;
                        transform-origin: center;
                    }
                    @media (prefers-reduced-motion: reduce) {
                        :global(.comparison-mandala-spin),
                        :global(.comparison-mandala-spin-reverse) { animation: none; }
                    }
                `}</style>
            </section>

            {/* ── What's Included ── */}
            <section className="bg-gradient-to-b from-gray-50 via-white to-gray-50 border-y-2 border-black py-8 md:py-14 mb-8 md:mb-14 relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage:
                            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />
                {/* Decorative mandalas */}
                <div className="absolute -top-12 -right-12 w-56 h-56 pointer-events-none opacity-[0.06]" aria-hidden="true">
                    <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 included-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
                        <circle cx="100" cy="100" r="40" />
                        <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
                        <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                            <g key={deg} transform={`rotate(${deg} 100 100)`}>
                                <line x1="100" y1="40" x2="100" y2="20" />
                                <circle cx="100" cy="20" r="2" fill="currentColor" />
                            </g>
                        ))}
                    </svg>
                </div>
                <div className="absolute -bottom-16 -left-16 w-48 h-48 pointer-events-none opacity-[0.05]" aria-hidden="true">
                    <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 included-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.6">
                        {[20, 35, 50, 65].map((r, i) => (
                            <ellipse
                                key={i}
                                cx="100"
                                cy="100"
                                rx={r}
                                ry={r / 1.8}
                                transform={`rotate(${i * 30} 100 100)`}
                            />
                        ))}
                    </svg>
                </div>
                <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6 md:mb-10 max-w-2xl mx-auto">
                        <span className="inline-flex items-center gap-1.5 bg-black text-accent-yellow font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.16em] px-2.5 py-1 border-2 border-black mb-3 shadow-[2px_2px_0px_#FFD500]">
                            <span className="material-symbols-outlined !text-[11px]">stack</span>
                            What you unlock
                        </span>
                        <h2 className="font-mono text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-[1.05]">
                            Eight categories.{' '}
                            <span className="bg-accent-yellow px-2 inline-block border-2 border-black shadow-[3px_3px_0px_#111] mt-1 md:mt-2">
                                One dashboard.
                            </span>
                        </h2>
                        <p className="text-gray-600 text-[12.5px] md:text-[14px] mt-4 leading-relaxed">
                            Stop scattering tabs across the internet. Everything you need to ship, scale, and stack savings — organized by stage and intent.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4">
                        {[
                            { icon: 'cloud', label: 'Cloud Credits', sub: 'AWS, GCP, Azure', tag: 'Infra', bg: 'bg-sky-100', accent: 'bg-sky-500', text: 'text-sky-900', delay: '0ms' },
                            { icon: 'payments', label: 'Grants', sub: 'Non-dilutive capital', tag: 'Funding', bg: 'bg-green-100', accent: 'bg-green-500', text: 'text-green-900', delay: '60ms' },
                            { icon: 'rocket_launch', label: 'Accelerators', sub: 'Top global programs', tag: 'Programs', bg: 'bg-orange-100', accent: 'bg-orange-500', text: 'text-orange-900', delay: '120ms' },
                            { icon: 'apps', label: 'SaaS Deals', sub: 'Tools at founder rates', tag: 'Stack', bg: 'bg-purple-100', accent: 'bg-purple-500', text: 'text-purple-900', delay: '180ms' },
                            { icon: 'campaign', label: 'Ad Credits', sub: 'Google, Meta, X', tag: 'Growth', bg: 'bg-pink-100', accent: 'bg-pink-500', text: 'text-pink-900', delay: '240ms' },
                            { icon: 'lightbulb', label: 'Startup Ideas', sub: 'Validated opportunities', tag: 'Inspiration', bg: 'bg-yellow-100', accent: 'bg-yellow-500', text: 'text-yellow-900', delay: '300ms' },
                            { icon: 'verified', label: 'Verified Startups', sub: 'Funded companies', tag: 'Research', bg: 'bg-blue-100', accent: 'bg-blue-500', text: 'text-blue-900', delay: '360ms' },
                            { icon: 'school', label: 'Student Perks', sub: "Next'Founder only", tag: 'Exclusive', bg: 'bg-rose-100', accent: 'bg-rose-500', text: 'text-rose-900', delay: '420ms' },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className={`relative ${item.bg} border-2 border-black p-3 md:p-4 shadow-[3px_3px_0px_#111] rounded-sm hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0px_#111] transition-all group overflow-hidden included-card-fade-in`}
                                style={{ animationDelay: item.delay }}
                            >
                                {/* Glow blob */}
                                <div className={`absolute -top-3 -right-3 w-16 h-16 md:w-20 md:h-20 ${item.accent} opacity-15 rounded-full blur-xl group-hover:opacity-30 transition-opacity`} />

                                {/* Mandala — visible on hover */}
                                <div className="absolute -bottom-8 -right-8 w-20 h-20 pointer-events-none opacity-[0.08] group-hover:opacity-[0.18] transition-opacity" aria-hidden="true">
                                    <svg viewBox="0 0 200 200" className={`w-full h-full ${item.text} included-card-mandala-spin`} fill="none" stroke="currentColor" strokeWidth="0.7">
                                        <circle cx="100" cy="100" r="40" />
                                        <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
                                        {[0, 60, 120, 180, 240, 300].map((deg) => (
                                            <g key={deg} transform={`rotate(${deg} 100 100)`}>
                                                <line x1="100" y1="40" x2="100" y2="20" />
                                                <circle cx="100" cy="20" r="2" fill="currentColor" />
                                            </g>
                                        ))}
                                        <circle cx="100" cy="100" r="2.5" fill="currentColor" />
                                    </svg>
                                </div>

                                <div className="relative">
                                    {/* Icon row */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className={`w-9 h-9 md:w-10 md:h-10 bg-white/80 border-2 border-black rounded-sm flex items-center justify-center shadow-[1px_1px_0px_#111] transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110`}>
                                            <span className={`material-symbols-outlined !text-[18px] md:!text-[20px] ${item.text}`}>{item.icon}</span>
                                        </div>
                                        <span className={`font-mono text-[8.5px] md:text-[9px] font-black ${item.text} bg-white/80 border-2 border-black px-1.5 py-0.5 rounded-sm uppercase tracking-[0.1em] shadow-[1px_1px_0px_#111]`}>
                                            {item.tag}
                                        </span>
                                    </div>

                                    {/* Label + sub */}
                                    <p className={`font-mono font-black text-[12px] md:text-[14px] uppercase tracking-tight ${item.text} leading-tight mb-0.5`}>{item.label}</p>
                                    <p className={`text-[10px] md:text-[11.5px] ${item.text} opacity-75 leading-snug`}>{item.sub}</p>

                                    {/* Hover arrow */}
                                    <div className={`mt-2.5 pt-2 border-t border-dashed ${item.text} opacity-30 group-hover:opacity-70 transition-opacity flex items-center justify-between`}>
                                        <span className={`font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-wide ${item.text} opacity-80`}>
                                            Included
                                        </span>
                                        <span className={`material-symbols-outlined !text-[14px] ${item.text} opacity-80 group-hover:translate-x-1 transition-transform`}>
                                            arrow_forward
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA strip */}
                    <div className="mt-6 md:mt-8 text-center">
                        <p className="inline-flex items-center gap-2 font-mono text-[11px] md:text-[12px] text-gray-700">
                            <span className="material-symbols-outlined !text-[14px] text-accent-yellow">bolt</span>
                            Browse the full catalog after you join
                            <span className="material-symbols-outlined !text-[14px] text-accent-yellow">bolt</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-14">
                <div className="text-center mb-5 md:mb-8">
                    <span className="inline-block bg-black text-accent-yellow font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border border-black mb-2">
                        ❓ Common questions
                    </span>
                    <h2 className="font-mono text-lg md:text-3xl font-black uppercase">Got Questions?</h2>
                </div>
                <div className="space-y-2.5">
                    {[
                        { icon: 'speed', q: 'How fast will I see savings?', a: 'Most founders claim their first deal within 3 minutes. A single cloud credit can save $5K–$100K instantly.' },
                        { icon: 'verified', q: 'Are deals actually verified?', a: 'Every deal is manually verified weekly. Broken links removed, expired offers flagged, new deals added constantly.' },
                        { icon: 'school', q: 'I am a student — which plan is for me?', a: 'Next\'Founder ($59/yr) is built for active students, indie hackers, and early builders. You get premium AI & SaaS credits, hackathons, internships, fellowships, grants, and the Opportunity Hub. Tailored for student builders.' },
                        { icon: 'savings', q: 'What if I only need one deal?', a: 'Even one deal pays for your membership several times over. Founder at $149/yr gets you full unlimited access immediately.' },
                        { icon: 'cancel', q: 'Can I cancel anytime? What about refunds?', a: 'Yes, you can cancel anytime — no contracts, no lock-in. Cancel from your dashboard in one click and you keep access until your billing period ends. Please note: all payments are non-refundable. Once a subscription or lifetime plan is purchased, the amount paid cannot be returned. We recommend reviewing the plan details before checkout.' },
                    ].map((faq) => (
                        <details
                            key={faq.q}
                            className="group border-2 border-black bg-white shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111] hover:-translate-y-0.5 transition-all open:bg-yellow-50"
                        >
                            <summary className="flex items-center gap-3 p-3 md:p-4 cursor-pointer font-mono font-bold text-xs md:text-sm uppercase list-none">
                                <span className="w-7 h-7 md:w-9 md:h-9 bg-accent-yellow border-2 border-black flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-sm md:text-base text-black">{faq.icon}</span>
                                </span>
                                <span className="flex-1">{faq.q}</span>
                                <span className="material-symbols-outlined text-base md:text-lg transition-transform group-open:rotate-180">expand_more</span>
                            </summary>
                            <div className="px-3 md:px-4 pb-3 md:pb-4 pl-12 md:pl-16 text-xs md:text-sm text-gray-700 leading-relaxed">{faq.a}</div>
                        </details>
                    ))}
                </div>
            </section>

            <Pricing3DTestimonials />

            {/* ── Final CTA ── */}
            <section className="relative bg-black text-white py-8 md:py-16 border-t-4 border-accent-yellow overflow-hidden">
                {/* Animated gradient blobs */}
                <div className="absolute -top-32 left-1/4 w-96 h-96 bg-accent-yellow/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage:
                            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />
                {/* Decorative mandalas */}
                <div className="absolute top-8 right-8 w-40 h-40 pointer-events-none opacity-[0.10] hidden md:block" aria-hidden="true">
                    <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow final-cta-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
                        <circle cx="100" cy="100" r="40" />
                        <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
                        {[0, 60, 120, 180, 240, 300].map((deg) => (
                            <g key={deg} transform={`rotate(${deg} 100 100)`}>
                                <line x1="100" y1="40" x2="100" y2="20" />
                                <circle cx="100" cy="20" r="2" fill="currentColor" />
                            </g>
                        ))}
                        <circle cx="100" cy="100" r="3" fill="currentColor" />
                    </svg>
                </div>
                <div className="absolute bottom-8 left-8 w-32 h-32 pointer-events-none opacity-[0.08] hidden md:block" aria-hidden="true">
                    <svg viewBox="0 0 200 200" className="w-full h-full text-white final-cta-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.6">
                        {[...Array(12)].map((_, i) => (
                            <line
                                key={i}
                                x1="100"
                                y1="100"
                                x2={100 + Math.cos((i * Math.PI) / 6) * 90}
                                y2={100 + Math.sin((i * Math.PI) / 6) * 90}
                            />
                        ))}
                        <circle cx="100" cy="100" r="2" fill="currentColor" />
                    </svg>
                </div>

                <div className="relative max-w-[800px] mx-auto px-4 text-center">
                    <span className="inline-block bg-accent-yellow text-black font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border border-black mb-3 md:mb-4 shadow-[2px_2px_0px_#fff]">
                        ⚡ Limited time pricing
                    </span>
                    <h2 className="font-mono text-xl md:text-4xl lg:text-5xl font-black uppercase mb-3 md:mb-4 leading-tight">
                        Every day you wait,<br />
                        <span className="bg-gradient-to-r from-accent-yellow via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                            you're leaving money on the table.
                        </span>
                    </h2>
                    <p className="text-gray-400 text-xs md:text-base mb-5 md:mb-7 max-w-lg mx-auto">
                        Deals expire. Windows close. The founders who move first save the most.
                    </p>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="inline-flex items-center gap-2 bg-accent-yellow text-black font-mono font-black text-xs md:text-base uppercase px-7 py-3 md:px-10 md:py-4 border-2 border-accent-yellow hover:bg-white hover:border-black hover:-translate-y-1 transition-all shadow-[4px_4px_0px_rgba(255,255,255,0.3)] hover:shadow-[6px_6px_0px_rgba(255,255,255,0.4)]"
                    >
                        <span className="material-symbols-outlined text-base md:text-lg">bolt</span>
                        Claim Your Spot Now
                        <span className="material-symbols-outlined text-base md:text-lg">arrow_forward</span>
                    </a>
                    <p className="mt-4 text-[10px] md:text-xs text-gray-500 font-mono">No contracts · Cancel anytime · Secure checkout</p>
                </div>
            </section>
        </main>
    )
}
