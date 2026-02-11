/**
 * Currency Detection and Management Utilities
 * Detects user region and provides appropriate currency
 * Supports top 5 global currencies: USD, EUR, GBP, INR, AUD
 */

export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD'
export type Region = 'US' | 'EU' | 'GB' | 'IN' | 'AU' | 'OTHER'

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
    EUR: {
        code: 'EUR',
        symbol: '€',
        name: 'Euro',
        flag: '🇪🇺',
    },
    GBP: {
        code: 'GBP',
        symbol: '£',
        name: 'British Pound',
        flag: '🇬🇧',
    },
    INR: {
        code: 'INR',
        symbol: '₹',
        name: 'Indian Rupee',
        flag: '🇮🇳',
    },
    AUD: {
        code: 'AUD',
        symbol: 'A$',
        name: 'Australian Dollar',
        flag: '🇦🇺',
    },
}

/**
 * Detect user's region based on timezone
 * This is a fallback method when IP geolocation is not available
 */
export function detectRegionFromTimezone(): Region {
    try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

        // Map timezones to regions
        if (timezone.includes('America/New_York') || timezone.includes('America/Chicago') ||
            timezone.includes('America/Los_Angeles') || timezone.includes('America/Denver')) {
            return 'US'
        }
        if (timezone.includes('Europe/') && !timezone.includes('Europe/London')) {
            return 'EU'
        }
        if (timezone.includes('Europe/London')) {
            return 'GB'
        }
        if (timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Calcutta')) {
            return 'IN'
        }
        if (timezone.includes('Australia/')) {
            return 'AU'
        }

        return 'OTHER'
    } catch (error) {
        console.error('Error detecting timezone:', error)
        return 'OTHER' // Default to USD
    }
}

/**
 * Detect user's region using IP geolocation API
 * Falls back to timezone detection if API fails
 */
export async function detectRegion(): Promise<Region> {
    try {
        // Try IP geolocation first (using ipapi.co free tier)
        const response = await fetch('https://ipapi.co/json/')
        if (response.ok) {
            const data = await response.json()
            const countryCode = data.country_code

            // Map country codes to regions
            if (countryCode === 'US') return 'US'
            if (countryCode === 'IN') return 'IN'
            if (countryCode === 'GB') return 'GB'
            if (countryCode === 'AU') return 'AU'
            // EU countries
            if (['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'PT', 'IE', 'FI', 'GR', 'SE', 'DK', 'PL', 'CZ', 'RO', 'HU'].includes(countryCode)) {
                return 'EU'
            }

            return 'OTHER'
        }
    } catch (error) {
        console.warn('IP geolocation failed, falling back to timezone:', error)
    }

    // Fallback to timezone detection
    return detectRegionFromTimezone()
}

/**
 * Get currency based on region
 */
export function getCurrencyForRegion(region: Region): Currency {
    const currencyMap: Record<Region, Currency> = {
        US: 'USD',
        EU: 'EUR',
        GB: 'GBP',
        IN: 'INR',
        AU: 'AUD',
        OTHER: 'USD', // Default to USD
    }
    return currencyMap[region]
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currency: Currency): string {
    return CURRENCIES[currency].symbol
}

/**
 * Format price with currency
 */
export function formatPrice(amount: number, currency: Currency): string {
    const symbol = getCurrencySymbol(currency)
    return `${symbol}${amount.toLocaleString()}`
}

/**
 * Save currency preference to localStorage
 */
export function saveCurrencyPreference(currency: Currency): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem('preferred_currency', currency)
    }
}

/**
 * Get saved currency preference from localStorage
 */
export function getSavedCurrencyPreference(): Currency | null {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('preferred_currency')
        return saved === 'INR' || saved === 'USD' ? saved : null
    }
    return null
}

/**
 * Get user's currency (checks saved preference first, then detects)
 */
export async function getUserCurrency(): Promise<Currency> {
    // Check if user has a saved preference
    const savedPreference = getSavedCurrencyPreference()
    if (savedPreference) {
        return savedPreference
    }

    // Detect region and get currency
    const region = await detectRegion()
    const currency = getCurrencyForRegion(region)

    // Save the detected currency as preference
    saveCurrencyPreference(currency)

    return currency
}
