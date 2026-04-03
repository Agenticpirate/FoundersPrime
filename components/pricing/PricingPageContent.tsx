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
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 text-center">
                    <div className="inline-flex items-center gap-1.5 bg-accent-yellow text-black px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest mb-4 border border-black">
                        <span className="material-symbols-outlined text-xs">bolt</span>
                        One membership. Unlimited savings.
                    </div>
                    <h1 className="font-mono text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight mb-4">
                        Stop Overpaying.<br />
                        <span className="text-accent-yellow">Start Saving $500K+</span>
                    </h1>
                    <p className="text-gray-300 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
                        Every deal is verified. Every credit is real. Join 5,000+ founders who stopped
                        leaving money on the table.
                    </p>
                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-2xl mx-auto">
                        {[
                            { value: '$500K+', label: 'Avg Savings', color: 'text-accent-yellow' },
                            { value: '5,000+', label: 'Active Founders', color: 'text-accent-yellow' },
                            { value: 'Weekly', label: 'New Deals Added', color: 'text-green-400' },
                        ].map((stat) => (
                            <div key={stat.label} className="relative rounded-sm bg-white/10 border border-white/20 p-2.5 md:p-4">
                                <GlowingEffect spread={20} glow={false} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={1} />
                                <p className={`font-mono text-lg md:text-2xl font-black ${stat.color}`}>{stat.value}</p>
                                <p className="text-[9px] md:text-xs text-gray-400 font-bold uppercase mt-0.5">{stat.label}</p>
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
            <section className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-14">
                <div className="text-center mb-6">
                    <h2 className="font-mono text-xl md:text-3xl font-black uppercase mb-2">The Math Speaks for Itself</h2>
                    <p className="text-gray-600 text-sm md:text-base">Your membership pays for itself with a single deal.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative rounded-sm border-2 border-gray-200 bg-gray-50 p-5 md:p-6">
                        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 uppercase">Without us</div>
                        <h3 className="font-mono font-black text-lg mb-4 text-gray-500">Searching Alone</h3>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li className="flex items-start gap-2"><span className="material-symbols-outlined text-red-400 text-base mt-0.5">close</span>Hours researching each deal manually</li>
                            <li className="flex items-start gap-2"><span className="material-symbols-outlined text-red-400 text-base mt-0.5">close</span>Broken links, expired offers, dead ends</li>
                            <li className="flex items-start gap-2"><span className="material-symbols-outlined text-red-400 text-base mt-0.5">close</span>Missing grants you never knew existed</li>
                            <li className="flex items-start gap-2"><span className="material-symbols-outlined text-red-400 text-base mt-0.5">close</span>Paying full price for tools competitors get free</li>
                        </ul>
                    </div>
                    <div className="relative rounded-sm border-3 border-black bg-white p-5 md:p-6 shadow-[4px_4px_0px_#111]">
                        <GlowingEffect spread={30} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-accent-yellow uppercase bg-black px-2 py-0.5">Recommended</div>
                        <h3 className="font-mono font-black text-lg mb-4">With FoundersPrime</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2"><span className="material-symbols-outlined text-green-600 text-base mt-0.5">check_circle</span>Hundreds of deals verified and updated weekly</li>
                            <li className="flex items-start gap-2"><span className="material-symbols-outlined text-green-600 text-base mt-0.5">check_circle</span>Direct apply links — no middlemen</li>
                            <li className="flex items-start gap-2"><span className="material-symbols-outlined text-green-600 text-base mt-0.5">check_circle</span>Non-dilutive grants, accelerators & programs</li>
                            <li className="flex items-start gap-2"><span className="material-symbols-outlined text-green-600 text-base mt-0.5">check_circle</span>Average member saves $50K+ in first 3 months</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ── What's Included ── */}
            <section className="bg-gray-50 border-y-2 border-black py-8 md:py-12 mb-8 md:mb-12">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-mono text-xl md:text-3xl font-black uppercase text-center mb-6 md:mb-8">Everything You Get Access To</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                        {[
                            { icon: 'cloud', label: 'Cloud Credits', sub: 'AWS, GCP, Azure & more' },
                            { icon: 'payments', label: 'Grants & Funding', sub: 'Non-dilutive capital' },
                            { icon: 'rocket_launch', label: 'Accelerators', sub: 'Top programs worldwide' },
                            { icon: 'apps', label: 'SaaS Discounts', sub: 'Tools at 50-90% off' },
                            { icon: 'campaign', label: 'Ad Credits', sub: 'Google, Meta, TikTok' },
                            { icon: 'lightbulb', label: 'Startup Ideas', sub: 'Validated opportunities' },
                            { icon: 'verified', label: 'Verified Startups', sub: 'Funded companies database' },
                            { icon: 'school', label: 'Student Benefits', sub: 'Free tools & resources' },
                        ].map((item) => (
                            <div key={item.label} className="relative rounded-sm bg-white border-2 border-black p-3 md:p-4 shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all">
                                <GlowingEffect spread={20} glow={false} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={1} />
                                <span className="material-symbols-outlined text-xl md:text-2xl mb-2 block">{item.icon}</span>
                                <p className="font-mono font-bold text-xs md:text-sm uppercase">{item.label}</p>
                                <p className="text-[10px] md:text-xs text-gray-500 mt-0.5">{item.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
                <h2 className="font-mono text-xl md:text-3xl font-black uppercase text-center mb-6">Common Questions</h2>
                <div className="space-y-3">
                    {[
                        { q: 'How fast will I see savings?', a: 'Most founders claim their first deal within 3 minutes of signing up. A single AWS or Google Cloud credit can save you $5,000–$100,000 instantly.' },
                        { q: 'Are the deals actually verified?', a: 'Every single deal is manually verified by our team weekly. Broken links are removed, expired offers are flagged, and new deals are added constantly.' },
                        { q: 'What if I only need one deal?', a: 'Even one deal pays for your membership 10x over. The Explorer plan at $1.99/mo gives you access to start claiming immediately.' },
                        { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no lock-in. Cancel from your dashboard in one click. The Legend plan is a one-time payment with lifetime access.' },
                    ].map((faq) => (
                        <details key={faq.q} className="group border-2 border-black bg-white shadow-[2px_2px_0px_#111]">
                            <summary className="flex items-center justify-between p-4 cursor-pointer font-mono font-bold text-sm uppercase">
                                {faq.q}
                                <span className="material-symbols-outlined text-sm transition-transform group-open:rotate-180">expand_more</span>
                            </summary>
                            <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</div>
                        </details>
                    ))}
                </div>
            </section>

            <Pricing3DTestimonials />

            {/* ── Final CTA ── */}
            <section className="bg-black text-white py-8 md:py-12 border-t-4 border-accent-yellow">
                <div className="max-w-[800px] mx-auto px-4 text-center">
                    <h2 className="font-mono text-2xl md:text-4xl font-black uppercase mb-3">
                        Every day you wait,<br />you&apos;re leaving money on the table.
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base mb-6 max-w-lg mx-auto">
                        Deals expire. Windows close. Credits run out. The founders who move first save the most.
                    </p>
                    <div className="inline-block relative rounded-sm">
                        <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                            className="pricing-cta-btn relative inline-flex items-center gap-2 bg-accent-yellow text-black font-mono font-black text-sm md:text-base uppercase px-8 py-3 border-2 border-accent-yellow hover:bg-white hover:border-black transition-all shadow-[4px_4px_0px_rgba(255,255,255,0.2)]">
                            Get Started Now <span className="material-symbols-outlined text-base pricing-cta-arrow">arrow_upward</span>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    )
}
