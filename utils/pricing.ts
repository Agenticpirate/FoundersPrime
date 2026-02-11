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
            actual: 599,
            discounted: 299,
            savings: 400,
            symbol: '₹',
            period: '/mo'
        },
        USD: {
            actual: 14.99,
            discounted: 9.99,
            savings: 10,
            symbol: '$',
            period: '/mo'
        },
        EUR: {
            actual: 14.99,
            discounted: 9.99,
            savings: 10,
            symbol: '€',
            period: '/mo'
        },
        GBP: {
            actual: 12.99,
            discounted: 8.99,
            savings: 9,
            symbol: '£',
            period: '/mo'
        },
        AUD: {
            actual: 22.99,
            discounted: 14.99,
            savings: 15,
            symbol: 'A$',
            period: '/mo'
        }
    },

    founder: {
        INR: {
            actual: 3499,
            discounted: 1499,
            savings: 2089,
            symbol: '₹',
            period: '/yr',
            badge: 'SAVE ₹2,089',
            monthlyEquivalent: 125
        },
        USD: {
            actual: 99.99,
            discounted: 59.99,
            savings: 60,
            symbol: '$',
            period: '/yr',
            badge: 'SAVE $60',
            monthlyEquivalent: 5
        },
        EUR: {
            actual: 99.99,
            discounted: 54.99,
            savings: 65,
            symbol: '€',
            period: '/yr',
            badge: 'SAVE €65',
            monthlyEquivalent: 4.58
        },
        GBP: {
            actual: 89.99,
            discounted: 49.99,
            savings: 58,
            symbol: '£',
            period: '/yr',
            badge: 'SAVE £58',
            monthlyEquivalent: 4.17
        },
        AUD: {
            actual: 149.99,
            discounted: 84.99,
            savings: 95,
            symbol: 'A$',
            period: '/yr',
            badge: 'SAVE A$95',
            monthlyEquivalent: 7.08
        }
    },

    legend: {
        INR: {
            actual: 8999,
            discounted: 4999,
            savings: 10000,
            symbol: '₹',
            period: '/once',
            badge: 'SAVE ₹10,000'
        },
        USD: {
            actual: 199.99,
            discounted: 199.99,
            savings: 100,
            symbol: '$',
            period: '/once',
            badge: 'SAVE $100'
        },
        EUR: {
            actual: 189.99,
            discounted: 189.99,
            savings: 85,
            symbol: '€',
            period: '/once',
            badge: 'SAVE €85'
        },
        GBP: {
            actual: 169.99,
            discounted: 179.99,
            savings: 70,
            symbol: '£',
            period: '/once',
            badge: 'SAVE £70'
        },
        AUD: {
            actual: 279.99,
            discounted: 299.99,
            savings: 125,
            symbol: 'A$',
            period: '/once',
            badge: 'SAVE A$125'
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
