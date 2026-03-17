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
            <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4 pb-3 md:py-5">

                <div className="relative z-10 flex flex-col items-center">
                    {/* Currency Switcher desktop */}
                    <div className="absolute right-0 top-0 hidden md:block z-50">
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

                    <h1 className="font-mono text-xl md:text-3xl font-black uppercase text-[#111111] mb-1.5 tracking-tight leading-none">
                        Stop Overpaying For Software.
                    </h1>
                    <p className="font-sans text-xs md:text-sm text-gray-500 max-w-md mx-auto">
                        Join the only founder community that pays for itself. Get instant access to $500k+ in deals, grants, and resources.
                    </p>

                    {/* Mobile Currency Switcher */}
                    <div className="md:hidden mt-3 relative z-50">
                        <button
                            onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                            className="flex items-center gap-2 bg-white border-2 border-[#111111] px-3 py-1.5 font-mono font-bold text-xs shadow-[2px_2px_0_0_#111111] uppercase"
                        >
                            <span className="material-symbols-outlined text-base">language</span>
                            {currency}
                            <span className="material-symbols-outlined text-base">expand_more</span>
                        </button>
                        {isCurrencyOpen && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[120px] bg-white border-2 border-[#111111] shadow-[2px_2px_0_0_#111111] z-50">
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
            </div>

            <PricingPartnerLogos />

            <div className="my-6 md:my-8">
                <PricingPlans currency={currency} />
            </div>

            <Pricing3DTestimonials />
        </main>
    )
}
