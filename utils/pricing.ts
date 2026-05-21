/**
 * Pricing Configuration — USD Only
 */

import { Currency } from './currency'

interface PricingDetails {
    actual: number | null
    discounted: number
    savings: number | null
    symbol: string
    period: string
    badge?: string
    monthlyEquivalent?: number
}

interface PlanConfig {
    [key: string]: PricingDetails
}

export interface PricingConfig {
    campus: PlanConfig
    founder: PlanConfig
    legend: PlanConfig
}

export const PRICING_CONFIG: PricingConfig = {
    campus: {
        USD: {
            actual: null,
            discounted: 9.99,
            savings: null,
            symbol: '$',
            period: '/mo'
        }
    },
    founder: {
        USD: {
            actual: 149,
            discounted: 99.99,
            savings: 49.01,
            symbol: '$',
            period: '/yr',
            monthlyEquivalent: 8.33,
            badge: 'SAVE $49'
        }
    },
    legend: {
        USD: {
            actual: 299,
            discounted: 149,
            savings: 150,
            symbol: '$',
            period: '/once',
            badge: 'SAVE $150'
        }
    }
}

export function getPricing(plan: keyof PricingConfig, currency: Currency): PricingDetails {
    return PRICING_CONFIG[plan][currency]
}

export function formatPrice(amount: number | null | undefined, currency: Currency): string {
    if (amount === null || amount === undefined) return ''
    const info = PRICING_CONFIG.campus[currency]
    return `${info.symbol}${amount.toLocaleString('en-US', {
        minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
        maximumFractionDigits: 2
    })}`
}
