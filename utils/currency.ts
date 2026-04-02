/**
 * Currency Configuration — USD Only
 */

export type Currency = 'USD'
export type Region = 'US' | 'OTHER'

interface CurrencyConfig {
    code: Currency
    symbol: string
    name: string
    flag: string
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
    USD: {
        code: 'USD',
        symbol: '$',
        name: 'US Dollar',
        flag: '🇺🇸',
    },
}

export function getCurrencySymbol(currency: Currency): string {
    return CURRENCIES[currency].symbol
}

export function formatPrice(amount: number, currency: Currency): string {
    const symbol = getCurrencySymbol(currency)
    return `${symbol}${amount.toLocaleString()}`
}

export function saveCurrencyPreference(_currency: Currency): void {}

export function getSavedCurrencyPreference(): Currency {
    return 'USD'
}

export async function getUserCurrency(): Promise<Currency> {
    return 'USD'
}
