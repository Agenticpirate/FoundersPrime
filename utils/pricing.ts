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
    nextfounder: PlanConfig
    founder: PlanConfig
    legend: PlanConfig
}

export const PRICING_CONFIG: PricingConfig = {
    nextfounder: {
        USD: {
            actual: null,
            discounted: 59,
            savings: null,
            symbol: '$',
            period: '/yr'
        }
    },
    founder: {
        USD: {
            actual: null,
            discounted: 149,
            savings: null,
            symbol: '$',
            period: '/yr',
            monthlyEquivalent: 12.42
        }
    },
    legend: {
        USD: {
            actual: null,
            discounted: 299,
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
    const info = PRICING_CONFIG.nextfounder[currency]
    return `${info.symbol}${amount.toLocaleString('en-US', {
        minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
        maximumFractionDigits: 2
    })}`
}
