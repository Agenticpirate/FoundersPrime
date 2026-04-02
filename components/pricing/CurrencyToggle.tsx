// CurrencyToggle — USD only, kept for compatibility
'use client'

import { Currency } from '@/utils/currency'

interface CurrencyToggleProps {
    currentCurrency: Currency
    onCurrencyChange: (currency: Currency) => void
}

export default function CurrencyToggle({ currentCurrency }: CurrencyToggleProps) {
    return (
        <div className="text-xs font-mono font-bold text-gray-400 uppercase">
            {currentCurrency}
        </div>
    )
}
