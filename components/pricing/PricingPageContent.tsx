'use client'

import React, { useState, useEffect } from 'react'
import PricingPlans from '@/components/pricing/PricingPlans'
import PricingPartnerLogos from '@/components/pricing/PricingPartnerLogos'
import Pricing3DTestimonials from '@/components/pricing/Pricing3DTestimonials'
import { Currency, CURRENCIES, getUserCurrency, saveCurrencyPreference } from '@/utils/currency'

export default function PricingPageContent() {
    const [currency, setCurrency] = useState<Currency>('USD')
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false)

    useEffect(() => {
        const loadCurrency = async () => {
            const saved = await getUserCurrency()
            if (saved) setCurrency(saved)
        }
        loadCurrency()
    }, [])

    const handleCurrencyChange = (c: Currency) => {
        setCurrency(c)
        saveCurrencyPreference(c)
        setIsCurrencyOpen(false)
    }

    return (
        <main className="bg-white min-h-screen pb-12">
            {/* ── Mobile Hero Banner ── */}
            <div className="md:hidden bg-black text-white px-4 py-5 border-b-4 border-[#00D4FF]">
                <div className="text-center">
                    <div className="inline-flex items-center gap-1.5 bg-[#00D4FF] text-black px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest mb-3 border border-black">
                        <span className="material-symbols-outlined text-xs">bolt</span>
                        Limited Time
                    </div>
                    <h1 className="font-mono text-2xl font-black uppercase tracking-tight leading-tight mb-2">
                        Save <span className="text-[#00D4FF]">$500K+</span><br />In Startup Costs
                    </h1>
                    <p className="text-gray-300 text-xs leading-relaxed mb-4">
                        Access 2,800+ verified deals, cloud credits, grants & accelerator programs. One membership pays for itself in minutes.
                    </p>
                    {/* Social Proof */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-white/10 border border-white/20 p-2 text-center">
                            <p className="font-mono text-base font-black text-[#00D4FF]">5K+</p>
                            <p className="text-[9px] text-gray-400 font-bold uppercase">Founders</p>
                        </div>
                        <div className="bg-white/10 border border-white/20 p-2 text-center">
                            <p className="font-mono text-base font-black text-[#00D4FF]">$500K</p>
                            <p className="text-[9px] text-gray-400 font-bold uppercase">Avg Savings</p>
                        </div>
                        <div className="bg-white/10 border border-white/20 p-2 text-center">
                            <p className="font-mono text-base font-black text-[#00D4FF]">2,800+</p>
                            <p className="text-[9px] text-gray-400 font-bold uppercase">Live Deals</p>
                        </div>
                    </div>
                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center justify-center gap-2 text-[9px] font-bold text-gray-400">
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-green-400 text-xs">verified</span>
                            <span>All deals verified</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-green-400 text-xs">lock</span>
                            <span>Cancel anytime</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-green-400 text-xs">payments</span>
                            <span>No setup fees</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop header section (minimal) */}
            <div className="hidden md:block relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6 pb-2">
                <h1 className="font-mono text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111] mb-3">Choose Your Plan</h1>
                <p className="font-sans text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-1">Start free and upgrade as you grow. All plans include access to our core database.</p>

                {/* Currency Switcher desktop */}
                <div className="absolute right-6 top-6 hidden md:block z-50">
                    <div className="relative">
                        <button
                            onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                            className="flex items-center gap-2 bg-white border-2 border-[#111111] px-4 py-2 font-mono font-bold text-sm shadow-[4px_4px_0_0_#111111] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_#111111] transition-all uppercase"
                        >
                            <span className="material-symbols-outlined text-lg">language</span>
                            {currency}
                            <span className="material-symbols-outlined text-lg">expand_more</span>
                        </button>

                        {isCurrencyOpen && (
                            <div className="absolute right-0 top-full mt-2 w-full min-w-[120px] bg-white border-2 border-[#111111] shadow-[4px_4px_0_0_#111111] z-50">
                                {Object.values(CURRENCIES).map((c) => (
                                    <button
                                        key={c.code}
                                        onClick={() => handleCurrencyChange(c.code)}
                                        className="w-full text-left px-4 py-2 font-mono text-sm font-bold hover:bg-gray-100 flex items-center justify-between"
                                    >
                                        <span>{c.code}</span>
                                        <span>{c.flag}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Currency Switcher */}
            <div className="md:hidden flex items-center justify-between px-4 py-2 border-b border-gray-100">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Pick a plan</p>
                <div className="relative z-50">
                    <button
                        onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                        className="flex items-center gap-1.5 bg-white border-2 border-[#111111] px-2.5 py-1 font-mono font-bold text-xs shadow-[2px_2px_0_0_#111111] uppercase"
                    >
                        <span className="material-symbols-outlined text-sm">language</span>
                        {currency}
                        <span className="material-symbols-outlined text-sm">expand_more</span>
                    </button>
                    {isCurrencyOpen && (
                        <div className="absolute right-0 top-full mt-1 w-[120px] bg-white border-2 border-[#111111] shadow-[2px_2px_0_0_#111111] z-50">
                            {Object.values(CURRENCIES).map((c) => (
                                <button
                                    key={c.code}
                                    onClick={() => handleCurrencyChange(c.code)}
                                    className="w-full text-left px-3 py-1.5 font-mono text-xs font-bold hover:bg-gray-100 flex items-center justify-between"
                                >
                                    <span>{c.code}</span>
                                    <span>{c.flag}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <PricingPartnerLogos />

            <div className="my-4 md:my-8">
                <PricingPlans currency={currency} />
            </div>

            {/* Mobile CTA strip between plans and testimonials */}
            <div className="md:hidden mx-4 mb-6 bg-[#00D4FF] border-3 border-black p-4 shadow-[4px_4px_0_0_#111111]">
                <p className="font-mono text-xs font-black uppercase text-black mb-1">⚡ Why wait? Join 5,000+ founders</p>
                <p className="text-[10px] text-black/70 font-mono leading-relaxed">
                    The average Founder plan member saves <strong>$50K+ in tools & credits</strong> within the first 3 months.
                </p>
            </div>

            <Pricing3DTestimonials />
        </main>
    )
}
