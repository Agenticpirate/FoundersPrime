/**
 * Pricing Configuration for Different Currencies
 */

import { Currency } from './currency'

// Pricing Details Interface
interface PricingDetails {
    actual: number | null
    discounted: number
    savings: number | null
    symbol: string
    period: string
    badge?: string
    monthlyEquivalent?: number
}

// Plan Configuration Interface
interface PlanConfig {
    [key: string]: PricingDetails // Key is Currency (USD, EUR, etc.)
}

// Main Pricing Configuration Interface
export interface PricingConfig {
    explorer: PlanConfig
    founder: PlanConfig
    legend: PlanConfig
}

export const PRICING_CONFIG: PricingConfig = {
    explorer: {
        INR: {
            actual: null,
            discounted: 199,
            savings: null,
            symbol: '₹',
            period: '/mo'
        },
        USD: {
            actual: null,
            discounted: 1.99,
            savings: null,
            symbol: '$',
            period: '/mo'
        },
        EUR: {
            actual: null,
            discounted: 1.99,
            savings: null,
            symbol: '€',
            period: '/mo'
        },
        GBP: {
            actual: null,
            discounted: 1.99,
            savings: null,
            symbol: '£',
            period: '/mo'
        },
        AUD: {
            actual: null,
            discounted: 2.99,
            savings: null,
            symbol: 'A$',
            period: '/mo'
        }
    },

    founder: {
        INR: {
            actual: null,
            discounted: 2999,
            savings: null,
            symbol: '₹',
            period: '/yr',
            monthlyEquivalent: 250
        },
        USD: {
            actual: null,
            discounted: 79.99,
            savings: null,
            symbol: '$',
            period: '/yr',
            monthlyEquivalent: 6.67
        },
        EUR: {
            actual: null,
            discounted: 79.99,
            savings: null,
            symbol: '€',
            period: '/yr',
            monthlyEquivalent: 6.67
        },
        GBP: {
            actual: null,
            discounted: 69.99,
            savings: null,
            symbol: '£',
            period: '/yr',
            monthlyEquivalent: 5.83
        },
        AUD: {
            actual: null,
            discounted: 119.99,
            savings: null,
            symbol: 'A$',
            period: '/yr',
            monthlyEquivalent: 10
        }
    },

    legend: {
        INR: {
            actual: null,
            discounted: 7999,
            savings: null,
            symbol: '₹',
            period: '/once'
        },
        USD: {
            actual: null,
            discounted: 199.99,
            savings: null,
            symbol: '$',
            period: '/once'
        },
        EUR: {
            actual: null,
            discounted: 199.99,
            savings: null,
            symbol: '€',
            period: '/once'
        },
        GBP: {
            actual: null,
            discounted: 179.99,
            savings: null,
            symbol: '£',
            period: '/once'
        },
        AUD: {
            actual: null,
            discounted: 299.99,
            savings: null,
            symbol: 'A$',
            period: '/once'
        }
    }
}

/**
 * Get pricing for a specific plan and currency
 */
export function getPricing(plan: keyof PricingConfig, currency: Currency): PricingDetails {
    return PRICING_CONFIG[plan][currency]
}

/**
 * Format price with currency symbol
 */
export function formatPrice(amount: number | null | undefined, currency: Currency): string {
    if (amount === null || amount === undefined) return ''

    const info = PRICING_CONFIG.explorer[currency]

    // For INR, no decimal places
    if (currency === 'INR') {
        return `${info.symbol}${amount.toLocaleString('en-IN')}`
    }

    // For other currencies, show .99 pricing if it's not a whole number or if specifically requested
    // Logic: If it has decimals, show 2. If it's an even dollar amount, we can optionally show .00 or not.
    // The user request shows .99 for USD/EUR etc.
    return `${info.symbol}${amount.toLocaleString('en-US', {
        minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
        maximumFractionDigits: 2
    })}`
}
