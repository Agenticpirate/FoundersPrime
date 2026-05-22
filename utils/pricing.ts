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
            actual: 59,
            discounted: 29.99,
            savings: 29,
            symbol: '$',
            period: '/yr',
            badge: 'SAVE $29'
        }
    },
    founder: {
        USD: {
            actual: 149,
            discounted: 69,
            savings: 80,
            symbol: '$',
            period: '/yr',
            monthlyEquivalent: 5.75,
            badge: 'SAVE $80'
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
    const info = PRICING_CONFIG.nextfounder[currency]
    return `${info.symbol}${amount.toLocaleString('en-US', {
        minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
        maximumFractionDigits: 2
    })}`
}
