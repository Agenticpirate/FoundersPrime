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
            {/* ── Hero Section ── */}
            <div className="bg-black text-white border-b-4 border-accent-yellow">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-14 text-center">
                    <div className="inline-flex items-center gap-1.5 bg-accent-yellow text-black px-2 py-0.5 font-mono text-[9px] font-black uppercase tracking-widest mb-3 border border-black">
                        <span className="material-symbols-outlined text-[10px]">bolt</span>
                        One membership. Unlimited savings.
                    </div>
                    <h1 className="font-mono text-2xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight mb-2 md:mb-4">
                        Stop Overpaying.<br />
                        <span className="text-accent-yellow">Start Saving $500K+</span>
                    </h1>
                    <p className="text-gray-400 text-xs md:text-lg leading-relaxed max-w-2xl mx-auto mb-4 md:mb-6">
                        Every deal is verified. Every credit is real. Join 5,000+ founders who stopped leaving money on the table.
                    </p>
                    <div className="grid grid-cols-3 gap-1.5 md:gap-4 max-w-xl mx-auto">
                        {[
                            { value: '$500K+', label: 'Avg Savings', color: 'text-accent-yellow' },
                            { value: '5,000+', label: 'Founders', color: 'text-accent-yellow' },
                            { value: 'Weekly', label: 'New Deals', color: 'text-green-400' },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white/10 border border-white/20 p-2 md:p-4 rounded-sm">
                                <p className={`font-mono text-base md:text-2xl font-black ${stat.color}`}>{stat.value}</p>
                                <p className="text-[8px] md:text-xs text-gray-400 font-bold uppercase mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <PricingPartnerLogos />

            {/* ── Plans ── */}
            <div className="my-6 md:my-10">
                <PricingPlans currency={currency} />
            </div>

            {/* ── ROI Comparison ── */}
            <section className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-14">
                <div className="text-center mb-4">
                    <h2 className="font-mono text-lg md:text-3xl font-black uppercase mb-1">The Math Speaks for Itself</h2>
                    <p className="text-gray-600 text-xs md:text-base">Your membership pays for itself with a single deal.</p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                    <div className="border border-gray-200 bg-gray-50 p-3 md:p-6 rounded-sm">
                        <h3 className="font-mono font-black text-xs md:text-lg mb-2 md:mb-4 text-gray-500">Searching Alone</h3>
                        <ul className="space-y-1.5 md:space-y-3 text-[10px] md:text-sm text-gray-500">
                            <li className="flex items-start gap-1.5"><span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 md:mt-2 flex-shrink-0" />Hours researching manually</li>
                            <li className="flex items-start gap-1.5"><span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 md:mt-2 flex-shrink-0" />Broken links, dead ends</li>
                            <li className="flex items-start gap-1.5"><span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 md:mt-2 flex-shrink-0" />Missing grants you never knew</li>
                            <li className="flex items-start gap-1.5"><span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 md:mt-2 flex-shrink-0" />Paying full price for tools</li>
                        </ul>
                    </div>
                    <div className="border-2 border-black bg-white p-3 md:p-6 shadow-[2px_2px_0px_#111] rounded-sm relative">
                        <div className="absolute top-2 right-2 text-[8px] md:text-xs font-mono font-bold text-accent-yellow uppercase bg-black px-1.5 py-0.5">Best</div>
                        <h3 className="font-mono font-black text-xs md:text-lg mb-2 md:mb-4">With FoundersPrime</h3>
                        <ul className="space-y-1.5 md:space-y-3 text-[10px] md:text-sm">
                            <li className="flex items-start gap-1.5"><span className="w-1 h-1 bg-black rounded-full mt-1.5 md:mt-2 flex-shrink-0" />Hundreds of verified deals</li>
                            <li className="flex items-start gap-1.5"><span className="w-1 h-1 bg-black rounded-full mt-1.5 md:mt-2 flex-shrink-0" />Direct apply links</li>
                            <li className="flex items-start gap-1.5"><span className="w-1 h-1 bg-black rounded-full mt-1.5 md:mt-2 flex-shrink-0" />Grants & accelerators</li>
                            <li className="flex items-start gap-1.5"><span className="w-1 h-1 bg-black rounded-full mt-1.5 md:mt-2 flex-shrink-0" />Save $50K+ in 3 months</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ── What's Included ── */}
            <section className="bg-gray-50 border-y-2 border-black py-6 md:py-12 mb-6 md:mb-12">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-mono text-lg md:text-3xl font-black uppercase text-center mb-4 md:mb-8">Everything You Get</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                        {[
                            { icon: 'cloud', label: 'Cloud Credits', sub: 'AWS, GCP, Azure' },
                            { icon: 'payments', label: 'Grants', sub: 'Non-dilutive capital' },
                            { icon: 'rocket_launch', label: 'Accelerators', sub: 'Top programs' },
                            { icon: 'apps', label: 'SaaS Deals', sub: '50-90% off' },
                            { icon: 'campaign', label: 'Ad Credits', sub: 'Google, Meta' },
                            { icon: 'lightbulb', label: 'Ideas', sub: 'Validated opps' },
                            { icon: 'verified', label: 'Startups', sub: 'Funded companies' },
                            { icon: 'school', label: 'Student', sub: 'Free tools' },
                        ].map((item) => (
                            <div key={item.label} className="bg-white border-2 border-black p-2.5 md:p-4 shadow-[2px_2px_0px_#111] rounded-sm">
                                <span className="material-symbols-outlined text-base md:text-2xl mb-1 block">{item.icon}</span>
                                <p className="font-mono font-bold text-[10px] md:text-sm uppercase">{item.label}</p>
                                <p className="text-[9px] md:text-xs text-gray-500">{item.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-12">
                <h2 className="font-mono text-lg md:text-3xl font-black uppercase text-center mb-4">Questions</h2>
                <div className="space-y-2">
                    {[
                        { q: 'How fast will I see savings?', a: 'Most founders claim their first deal within 3 minutes. A single cloud credit can save $5K–$100K instantly.' },
                        { q: 'Are deals actually verified?', a: 'Every deal is manually verified weekly. Broken links removed, expired offers flagged, new deals added constantly.' },
                        { q: 'What if I only need one deal?', a: 'Even one deal pays for your membership 10x over. Explorer at $1.99/mo gets you started immediately.' },
                        { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no lock-in. Cancel from your dashboard in one click.' },
                    ].map((faq) => (
                        <details key={faq.q} className="group border-2 border-black bg-white shadow-[2px_2px_0px_#111]">
                            <summary className="flex items-center justify-between p-3 cursor-pointer font-mono font-bold text-xs md:text-sm uppercase">
                                {faq.q}
                                <span className="material-symbols-outlined text-sm transition-transform group-open:rotate-180">expand_more</span>
                            </summary>
                            <div className="px-3 pb-3 text-xs md:text-sm text-gray-600 leading-relaxed">{faq.a}</div>
                        </details>
                    ))}
                </div>
            </section>

            <Pricing3DTestimonials />

            {/* ── Final CTA ── */}
            <section className="bg-black text-white py-6 md:py-12 border-t-4 border-accent-yellow">
                <div className="max-w-[800px] mx-auto px-4 text-center">
                    <h2 className="font-mono text-xl md:text-4xl font-black uppercase mb-2">
                        Every day you wait,<br />you&apos;re leaving money on the table.
                    </h2>
                    <p className="text-gray-400 text-xs md:text-base mb-4 max-w-lg mx-auto">
                        Deals expire. Windows close. The founders who move first save the most.
                    </p>
                    <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                        className="inline-flex items-center gap-2 bg-accent-yellow text-black font-mono font-black text-xs md:text-base uppercase px-6 py-2.5 md:px-8 md:py-3 border-2 border-accent-yellow hover:bg-white hover:border-black transition-all shadow-[3px_3px_0px_rgba(255,255,255,0.2)]">
                        Get Started Now <span className="material-symbols-outlined text-sm">arrow_upward</span>
                    </a>
                </div>
            </section>
        </main>
    )
}
