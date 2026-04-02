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
    explorer: PlanConfig
    founder: PlanConfig
    legend: PlanConfig
}

export const PRICING_CONFIG: PricingConfig = {
    explorer: {
        USD: {
            actual: null,
            discounted: 1.99,
            savings: null,
            symbol: '$',
            period: '/mo'
        }
    },
    founder: {
        USD: {
            actual: null,
            discounted: 89.99,
            savings: null,
            symbol: '$',
            period: '/yr',
            monthlyEquivalent: 7.50
        }
    },
    legend: {
        USD: {
            actual: null,
            discounted: 149.99,
            savings: null,
            symbol: '$',
            period: '/once'
        }
    }
}

export function getPricing(plan: keyof PricingConfig, currency: Currency): PricingDetails {
    return PRICING_CONFIG[plan][currency]
}

export function formatPrice(amount: number | null | undefined, currency: Currency): string {
    if (amount === null || amount === undefined) return ''
    const info = PRICING_CONFIG.explorer[currency]
    return `${info.symbol}${amount.toLocaleString('en-US', {
        minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
        maximumFractionDigits: 2
    })}`
}
