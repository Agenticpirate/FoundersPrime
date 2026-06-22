'use client'

import { useCookieConsent } from '@/context/CookieConsentContext'
import { Cookie, X } from 'lucide-react'

export default function CookieBanner() {
    const { hasConsented, savePreferences, openModal } = useCookieConsent()

    if (hasConsented) return null

    const handleAcceptAll = () => {
        savePreferences({
            essential: true,
            analytics: true,
            marketing: true,
            functional: true
        })
    }

    const handleDeclineOptional = () => {
        savePreferences({
            essential: true,
            analytics: false,
            marketing: false,
            functional: false
        })
    }

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-40 animate-in slide-in-from-bottom-8 duration-300">
            <div className="bg-black border-2 border-white p-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] flex flex-col gap-3.5">
                {/* Header/Info */}
                <div className="flex items-start gap-2.5">
                    <div className="bg-accent-yellow p-1.5 border border-black shrink-0">
                        <Cookie className="w-4 h-4 text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-mono text-xs font-black uppercase text-accent-yellow tracking-wider">
                            COOKIE_&_DATA_CONSENT
                        </h4>
                        <p className="font-sans text-xs text-gray-300 leading-relaxed mt-1">
                            We collect browsing history, analytics, and functional preferences to personalize your experience. Customize or accept to save your settings.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-2.5 pt-1.5 border-t border-white/10">
                    <button
                        onClick={openModal}
                        className="font-mono text-[10px] text-gray-400 hover:text-white uppercase tracking-wider underline underline-offset-2 transition-colors"
                    >
                        Customize
                    </button>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDeclineOptional}
                            className="px-2.5 py-1.5 bg-transparent hover:bg-white/5 text-gray-300 font-bold font-mono text-[10px] border border-white/20 uppercase tracking-wider transition-all"
                        >
                            Decline Optional
                        </button>
                        <button
                            onClick={handleAcceptAll}
                            className="px-2.5 py-1.5 bg-accent-yellow hover:bg-white text-black font-bold font-mono text-[10px] border border-accent-yellow uppercase tracking-wider transition-all"
                        >
                            Accept All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
