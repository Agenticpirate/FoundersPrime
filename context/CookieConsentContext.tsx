'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CookiePreferences {
    essential: boolean
    analytics: boolean
    marketing: boolean
    functional: boolean
}

interface CookieConsentContextType {
    preferences: CookiePreferences
    isModalOpen: boolean
    openModal: () => void
    closeModal: () => void
    savePreferences: (prefs: CookiePreferences) => void
    hasConsented: boolean
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

export function useCookieConsent() {
    const context = useContext(CookieConsentContext)
    if (!context) {
        throw new Error('useCookieConsent must be used within a CookieConsentProvider')
    }
    return context
}

export default CookieConsentContext
