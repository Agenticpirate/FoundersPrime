'use client'

import { useState, useEffect } from 'react'
import { Currency, CURRENCIES, saveCurrencyPreference } from '@/utils/currency'

interface CurrencyToggleProps {
    currentCurrency: Currency
    onCurrencyChange: (currency: Currency) => void
}

export default function CurrencyToggle({ currentCurrency, onCurrencyChange }: CurrencyToggleProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleCurrencyChange = (currency: Currency) => {
        onCurrencyChange(currency)
        saveCurrencyPreference(currency)
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 border-2 border-[#111111] bg-white hover:bg-gray-50 transition-colors rounded-sm shadow-neo-sm text-[11px] font-bold"
                aria-label="Change currency"
            >
                <span className="material-symbols-outlined text-sm">language</span>
                <span>{currentCurrency}</span>
                <span className="material-symbols-outlined text-sm">
                    {isOpen ? 'expand_less' : 'expand_more'}
                </span>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute top-full right-0 mt-1 w-56 border-2 border-[#111111] bg-white shadow-neo-md rounded-sm z-50 overflow-hidden">
                        {/* USD */}
                        <button
                            onClick={() => handleCurrencyChange('USD')}
                            className={`w-full px-3 py-2 text-left text-[11px] font-bold hover:bg-gray-50 transition-colors flex items-center justify-between ${currentCurrency === 'USD' ? 'bg-[#13b6ec] text-[#111111]' : ''
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-base">{CURRENCIES.USD.flag}</span>
                                <div>
                                    <div>{CURRENCIES.USD.name}</div>
                                    <div className="text-[9px] opacity-60">United States</div>
                                </div>
                            </div>
                            {currentCurrency === 'USD' && (
                                <span className="material-symbols-outlined text-sm">check</span>
                            )}
                        </button>

                        <div className="h-[2px] bg-[#111111]" />

                        {/* EUR */}
                        <button
                            onClick={() => handleCurrencyChange('EUR')}
                            className={`w-full px-3 py-2 text-left text-[11px] font-bold hover:bg-gray-50 transition-colors flex items-center justify-between ${currentCurrency === 'EUR' ? 'bg-[#13b6ec] text-[#111111]' : ''
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-base">{CURRENCIES.EUR.flag}</span>
                                <div>
                                    <div>{CURRENCIES.EUR.name}</div>
                                    <div className="text-[9px] opacity-60">European Union</div>
                                </div>
                            </div>
                            {currentCurrency === 'EUR' && (
                                <span className="material-symbols-outlined text-sm">check</span>
                            )}
                        </button>

                        <div className="h-[2px] bg-[#111111]" />

                        {/* GBP */}
                        <button
                            onClick={() => handleCurrencyChange('GBP')}
                            className={`w-full px-3 py-2 text-left text-[11px] font-bold hover:bg-gray-50 transition-colors flex items-center justify-between ${currentCurrency === 'GBP' ? 'bg-[#13b6ec] text-[#111111]' : ''
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-base">{CURRENCIES.GBP.flag}</span>
                                <div>
                                    <div>{CURRENCIES.GBP.name}</div>
                                    <div className="text-[9px] opacity-60">United Kingdom</div>
                                </div>
                            </div>
                            {currentCurrency === 'GBP' && (
                                <span className="material-symbols-outlined text-sm">check</span>
                            )}
                        </button>

                        <div className="h-[2px] bg-[#111111]" />

                        {/* INR */}
                        <button
                            onClick={() => handleCurrencyChange('INR')}
                            className={`w-full px-3 py-2 text-left text-[11px] font-bold hover:bg-gray-50 transition-colors flex items-center justify-between ${currentCurrency === 'INR' ? 'bg-[#13b6ec] text-[#111111]' : ''
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-base">{CURRENCIES.INR.flag}</span>
                                <div>
                                    <div>{CURRENCIES.INR.name}</div>
                                    <div className="text-[9px] opacity-60">India</div>
                                </div>
                            </div>
                            {currentCurrency === 'INR' && (
                                <span className="material-symbols-outlined text-sm">check</span>
                            )}
                        </button>

                        <div className="h-[2px] bg-[#111111]" />

                        {/* AUD */}
                        <button
                            onClick={() => handleCurrencyChange('AUD')}
                            className={`w-full px-3 py-2 text-left text-[11px] font-bold hover:bg-gray-50 transition-colors flex items-center justify-between ${currentCurrency === 'AUD' ? 'bg-[#13b6ec] text-[#111111]' : ''
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-base">{CURRENCIES.AUD.flag}</span>
                                <div>
                                    <div>{CURRENCIES.AUD.name}</div>
                                    <div className="text-[9px] opacity-60">Australia</div>
                                </div>
                            </div>
                            {currentCurrency === 'AUD' && (
                                <span className="material-symbols-outlined text-sm">check</span>
                            )}
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
