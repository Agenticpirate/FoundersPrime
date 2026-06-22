'use client'

import React, { useState, useEffect } from 'react'
import CookieConsentContext, { CookiePreferences } from '@/context/CookieConsentContext'
import CookiePreferencesModal from './CookiePreferencesModal'
import CookieBanner from './CookieBanner'

const DEFAULT_PREFERENCES: CookiePreferences = {
    essential: true,
    analytics: false,
    marketing: false,
    functional: false
}

export default function CookieConsentProvider({ children }: { children: React.ReactNode }) {
    const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [hasConsented, setHasConsented] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    // Load preferences from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('cookie_preferences')
        if (saved) {
            try {
                setPreferences(JSON.parse(saved))
                setHasConsented(true)
            } catch (e) {
                console.error('Failed to parse cookie preferences', e)
            }
        }
        setIsLoaded(true)
    }, [])

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const savePreferences = (newPrefs: CookiePreferences) => {
        setPreferences(newPrefs)
        setHasConsented(true)
        localStorage.setItem('cookie_preferences', JSON.stringify(newPrefs))
        // Here you would typically trigger GTM or other scripts to enable/disable
        console.log('Cookie preferences saved:', newPrefs)
    }

    // Show banner if not consented yet (optional, implementing minimal non-intrusive logic first)
    // For now, we only open modal explicitly on request to keep UI clean as per user style

    return (
        <CookieConsentContext.Provider
            value={{
                preferences,
                isModalOpen,
                openModal,
                closeModal,
                savePreferences,
                hasConsented
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
