'use client'

import React, { useState, useEffect, useCallback } from 'react'
import CookieConsentContext, { CookiePreferences } from '@/context/CookieConsentContext'
import CookiePreferencesModal from './CookiePreferencesModal'
import CookieBanner from './CookieBanner'

const DEFAULT_PREFERENCES: CookiePreferences = {
    essential: true,
    analytics: false,
    marketing: false,
    functional: false
}

const STORAGE_KEY = 'cookie_preferences'
const HISTORY_KEY = 'fp_browsing_history'
const MAX_HISTORY = 50

// ─── Google Analytics helpers ─────────────────────────────────────────────────

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void
        dataLayer?: unknown[]
    }
}

function grantAnalytics() {
    if (typeof window === 'undefined') return
    window.gtag?.('consent', 'update', {
        analytics_storage: 'granted',
    })
}

function denyAnalytics() {
    if (typeof window === 'undefined') return
    window.gtag?.('consent', 'update', {
        analytics_storage: 'denied',
    })
}

function grantMarketing() {
    if (typeof window === 'undefined') return
    window.gtag?.('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
    })
}

function denyMarketing() {
    if (typeof window === 'undefined') return
    window.gtag?.('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
    })
}

// ─── Browsing history helpers ─────────────────────────────────────────────────

export interface BrowsingHistoryEntry {
    path: string
    title: string
    visitedAt: string // ISO string
}

function loadHistory(): BrowsingHistoryEntry[] {
    try {
        const raw = localStorage.getItem(HISTORY_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

function pushHistory(entry: BrowsingHistoryEntry) {
    try {
        const history = loadHistory()
        // Remove duplicate path if already present (move to top)
        const filtered = history.filter(h => h.path !== entry.path)
        const updated = [entry, ...filtered].slice(0, MAX_HISTORY)
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
    } catch {
        // localStorage unavailable — fail silently
    }
}

// ─── Provider ────────────────────────────────────────────────────────────────

export default function CookieConsentProvider({ children }: { children: React.ReactNode }) {
    const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [hasConsented, setHasConsented] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    // ── Apply GA consent mode based on preferences ──────────────────────────
    const applyConsent = useCallback((prefs: CookiePreferences) => {
        if (prefs.analytics) {
            grantAnalytics()
        } else {
            denyAnalytics()
        }

        if (prefs.marketing) {
            grantMarketing()
        } else {
            denyMarketing()
        }
    }, [])

    // ── Load saved preferences from localStorage on mount ───────────────────
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                const parsed: CookiePreferences = JSON.parse(saved)
                setPreferences(parsed)
                setHasConsented(true)
                applyConsent(parsed)
            } catch (e) {
                console.error('[CookieConsent] Failed to parse saved preferences', e)
            }
        } else {
            // Default-deny until user consents
            denyAnalytics()
            denyMarketing()
        }
        setIsLoaded(true)
    }, [applyConsent])

    // ── Track current page in browsing history (only if functional is on) ───
    useEffect(() => {
        if (!isLoaded) return
        if (!preferences.functional) return

        const entry: BrowsingHistoryEntry = {
            path: window.location.pathname + window.location.search,
            title: document.title || window.location.pathname,
            visitedAt: new Date().toISOString(),
        }
        pushHistory(entry)
    }, [isLoaded, preferences.functional])

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const savePreferences = useCallback((newPrefs: CookiePreferences) => {
        // Always keep essential = true
        const safe: CookiePreferences = { ...newPrefs, essential: true }
        setPreferences(safe)
        setHasConsented(true)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(safe))
        applyConsent(safe)

        // If functional just got enabled, record this page visit now
        if (safe.functional) {
            pushHistory({
                path: window.location.pathname + window.location.search,
                title: document.title || window.location.pathname,
                visitedAt: new Date().toISOString(),
            })
        }

        // If functional was just disabled, clear stored history
        if (!safe.functional) {
            localStorage.removeItem(HISTORY_KEY)
        }

        console.log('[CookieConsent] Preferences saved:', safe)
    }, [applyConsent])

    return (
        <CookieConsentContext.Provider
            value={{
                preferences,
                isModalOpen,
                openModal,
                closeModal,
                savePreferences,
                hasConsented,
            }}
        >
            {children}
            {isLoaded && (
                <>
                    <CookiePreferencesModal />
                    <CookieBanner />
                </>
            )}
        </CookieConsentContext.Provider>
    )
}
