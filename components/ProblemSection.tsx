'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import BrandLogo from '@/components/ui/BrandLogo'
import { Reveal, RevealStagger, RevealItem } from '@/components/ui/premium-motion'

/* ─── Binoculars line-icon (no Material Symbols equivalent) ─── */
function Binoculars({ className = '' }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <rect x="8.25" y="3.75" width="7.5" height="2.6" rx="1" />
            <path d="M9.6 6.2 8 14" />
            <path d="M14.4 6.2 16 14" />
            <circle cx="6" cy="16.5" r="3.9" />
            <circle cx="18" cy="16.5" r="3.9" />
            <path d="M9.7 14.9h4.6" />
        </svg>
    )
}

/* ─── Left-column proof badges ─── */
const badges = [
    { icon: 'verified_user', label: ['Verified', 'Programs'] },
    { icon: 'payments', label: ['Huge', 'Savings'] },
    { icon: 'percent', label: ['No Equity', 'Taken'] },
]

/* ─── Logos shown inside the dark promo card ─── */
const promoLogos = [
    { name: 'AWS', domain: 'aws.amazon.com' },
    { name: 'Google Cloud', domain: 'cloud.google.com' },
    { name: 'HubSpot', domain: 'hubspot.com' },
]


/* Shared header for the four pain/solution cards: icon tile + hairline rule */
function CardHead({ 
    icon, 
    materialIcon, 
    isFeatured = false 
}: { 
    icon?: ReactNode; 
    materialIcon?: string; 
    isFeatured?: boolean 
}) {
    return (
        <div className="flex items-center gap-2.5 mb-4">
            <span className={`w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 ${
                isFeatured 
                    ? 'bg-accent-yellow text-black border-none' 
                    : 'border border-white/20 text-white bg-white/5'
            }`}>
                {icon ? (
                    <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
                ) : (
                    <span className="material-symbols-outlined !text-[20px]">{materialIcon}</span>
                )}
            </span>
            <span className={`h-px w-7 ${isFeatured ? 'bg-accent-yellow/20' : 'bg-white/20'}`} />
        </div>
    )
}

export default function ProblemSection() {
    return (
        <section className="relative overflow-hidden bg-black grid-bg-dark py-14 md:py-20 lg:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-0 w-72 h-72 -translate-y-1/2 bg-accent-yellow/[0.04] rounded-full blur-3xl"
            />
            <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

                    {/* ─── LEFT: headline + copy + proof badges ─── */}
                    <Reveal className="lg:col-span-5">
                        <h2 className="font-mono font-black uppercase text-white tracking-tight leading-[1.1] text-2xl sm:text-3xl lg:text-[34px]">
                            The problem isn&apos;t<br />
                            missing opportunities.
                        </h2>

                        <div className="mt-5">
                            <span className="inline-block bg-accent-yellow text-black font-mono font-black uppercase tracking-tight leading-[1.1] text-2xl sm:text-3xl lg:text-[34px] px-3.5 py-2.5 shadow-[4px_4px_0_0_rgba(255,215,0,0.25)]">
                                It&apos;s not finding<br />
                                them in time.
                            </span>
                        </div>

                        <p className="mt-6 text-sm md:text-[15px] text-gray-400 leading-relaxed max-w-md">
                            FoundersPrime helps you discover the best startup credits, grants &amp; perks &mdash; all in one place. Save money, extend runway, and build faster.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-x-7 gap-y-4">
                            {badges.map((b) => (
                                <div key={b.label.join(' ')} className="flex items-center gap-2.5 group/badge">
                                    <span className="w-9 h-9 rounded-lg border-[1.5px] border-accent-yellow flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/badge:scale-110 group-hover/badge:-rotate-3">
                                        <span className="material-symbols-outlined !text-[18px] text-accent-yellow">{b.icon}</span>
                                    </span>
                                    <span className="font-mono text-[11px] md:text-xs font-bold text-white leading-tight">
                                        {b.label[0]}<br />{b.label[1]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    {/* ─── RIGHT: pain/solution card grid ─── */}
                    <div className="lg:col-span-7">
                        <RevealStagger className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            <RevealItem>
                                <div className="rounded-2xl bg-[#0d0d0d] border border-accent-yellow p-4 md:p-5 flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,215,0,0.08)]">
                                    <div>
                                        <CardHead icon={<Binoculars className="w-5 h-5" />} isFeatured={true} />
                                        <h3 className="font-sans font-bold text-[14px] md:text-[15px] text-accent-yellow leading-snug">
                                            Hard to find the right perks
                                        </h3>
                                        <p className="mt-2 font-sans text-[12px] md:text-[13px] text-gray-400 leading-relaxed">
                                            Thousands of programs, but scattered and hard to track.
                                        </p>
                                    </div>
                                </div>
                            </RevealItem>

                            <RevealItem>
                                <div className="rounded-2xl bg-[#0d0d0d] border border-white/10 p-4 md:p-5 flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                                    <div>
                                        <CardHead materialIcon="find_in_page" />
                                        <h3 className="font-sans font-bold text-[14px] md:text-[15px] text-white leading-snug">
                                            Manual tracking is painful
                                        </h3>
                                        <p className="mt-2 font-sans text-[12px] md:text-[13px] text-gray-400 leading-relaxed">
                                            Deadlines, eligibility, updates &mdash; easy to miss everything.
                                        </p>
                                    </div>
                                </div>
                            </RevealItem>

                            <RevealItem>
                                <div className="rounded-2xl bg-[#0d0d0d] border border-white/10 p-4 md:p-5 flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                                    <div>
                                        <CardHead materialIcon="account_balance_wallet" />
                                        <h3 className="font-sans font-bold text-[14px] md:text-[15px] text-white leading-snug">
                                            Time lost = money lost
                                        </h3>
                                        <p className="mt-2 font-sans text-[12px] md:text-[13px] text-gray-400 leading-relaxed">
                                            Every missed perk is money out of your pocket.
                                        </p>
                                    </div>
                                </div>
                            </RevealItem>

                            <RevealItem>
                                <div className="rounded-2xl bg-[#0d0d0d] border border-white/10 p-4 md:p-5 flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                                    <div>
                                        <CardHead materialIcon="shield" />
                                        <h3 className="font-sans font-bold text-[14px] md:text-[15px] text-white leading-snug">
                                            We solve it for you
                                        </h3>
                                        <p className="mt-2 font-sans text-[12px] md:text-[13px] text-gray-400 leading-relaxed">
                                            Curated. Verified. Updated weekly. So you never miss what matters.
                                        </p>
                                    </div>
                                </div>
                            </RevealItem>

                            <RevealItem className="col-span-2">
                                <div className="rounded-2xl bg-[#0d0d0d] border border-accent-yellow p-4 md:p-5 flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,215,0,0.08)]">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-gray-300">
                                                <span className="relative flex h-1.5 w-1.5">
                                                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent-yellow opacity-60 animate-ping" />
                                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-yellow" />
                                                </span>
                                                Founders are saving big
                                            </span>
                                            <span className="material-symbols-outlined !text-[18px] text-white/70">open_in_full</span>
                                        </div>

                                        <p className="mt-3 font-mono font-black text-accent-yellow text-3xl md:text-[34px] leading-none">
                                            $500K+ on tap.
                                        </p>
                                        <p className="mt-2 font-sans text-[13px] md:text-sm text-gray-200">
                                            Across cloud credits, grants &amp; SaaS perks.
                                        </p>

                                        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                                            {promoLogos.map((logo) => (
                                                <div key={logo.name} className="flex items-center gap-1.5">
                                                    <BrandLogo name={logo.name} domain={logo.domain} size="sm" plate eager />
                                                    <span className="font-sans text-xs font-semibold text-white whitespace-nowrap">
                                                        {logo.name}
                                                    </span>
                                                </div>
                                            ))}
                                            <span className="font-sans text-xs text-gray-500">and more</span>
                                        </div>
                                    </div>

                                    <Link
                                        href="/deals"
                                        className="mt-5 w-full bg-accent-yellow text-black font-mono font-black text-[13px] uppercase tracking-[0.12em] flex items-center justify-center gap-2 py-3.5 hover:bg-white transition-colors"
                                    >
                                        Browse all perks
                                        <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
                                    </Link>
                                </div>
                            </RevealItem>
                        </RevealStagger>
                    </div>
                </div>
            </div>
        </section>
    )
}
