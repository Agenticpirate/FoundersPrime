'use client'

import { useState, useEffect } from 'react'
import { X, Shield, BarChart3, Target, Settings, Check } from 'lucide-react'
import { useCookieConsent, CookiePreferences } from '@/context/CookieConsentContext'

export default function CookiePreferencesModal() {
    const { isModalOpen, closeModal, preferences, savePreferences } = useCookieConsent()
    const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(preferences)

    // Sync local state with global preferences when modal opens
    useEffect(() => {
        if (isModalOpen) {
            setLocalPreferences(preferences)
        }
    }, [isModalOpen, preferences])

    if (!isModalOpen) return null

    const handleToggle = (key: keyof CookiePreferences) => {
        if (key === 'essential') return // Cannot toggle essential
        setLocalPreferences(prev => ({
            ...prev,
            [key]: !prev[key]
        }))
    }

    const handleSave = () => {
        savePreferences(localPreferences)
        closeModal()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_#1a1a1a] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm relative animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="sticky top-0 bg-white border-b-2 border-black p-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                        <div className="bg-accent-yellow border-2 border-black p-1.5 shadow-[2px_2px_0px_0px_#1a1a1a]">
                            <Settings className="w-5 h-5 text-black" />
                        </div>
                        <h2 className="text-xl font-bold font-mono text-black uppercase tracking-tight">
                            COOKIE_PREFERENCES
                        </h2>
                    </div>
                    <button
                        onClick={closeModal}
                        className="p-1 hover:bg-gray-100 border-2 border-transparent hover:border-black rounded-sm transition-all"
                    >
                        <X className="w-6 h-6 text-black" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    <p className="text-sm text-gray-800 font-sans leading-relaxed">
                        Manage your cookie preferences here. Essential cookies are required for the website to function, while others help us improve your experience.
                    </p>

                    <div className="space-y-4">
                        {/* Essential */}
                        <div className="border-2 border-black p-4 bg-gray-50 opacity-75">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <Shield className="w-5 h-5 text-black mt-0.5" />
                                    <div>
                                        <h3 className="font-bold font-mono text-black text-sm">Essential Cookies</h3>
                                        <p className="text-xs text-gray-600 font-sans mt-1">
                                            Strictly necessary for security and basic functionality. Cannot be disabled.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase">Required</div>
                                    <input type="checkbox" checked disabled className="w-5 h-5 accent-black opacity-50 cursor-not-allowed" />
                                </div>
                            </div>
                        </div>

                        {/* Analytics */}
                        <div className="border-2 border-black p-4 bg-white hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <BarChart3 className="w-5 h-5 text-black mt-0.5" />
                                    <div>
                                        <h3 className="font-bold font-mono text-black text-sm">Analytics Cookies</h3>
                                        <p className="text-xs text-gray-600 font-sans mt-1">
                                            Help us understand how visitors use our site to improve performance.
                                        </p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={localPreferences.analytics}
                                        onChange={() => handleToggle('analytics')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none border-2 border-black rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-2 after:border-black after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-yellow"></div>
                                </label>
                            </div>
                        </div>

                        {/* Marketing */}
                        <div className="border-2 border-black p-4 bg-white hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <Target className="w-5 h-5 text-black mt-0.5" />
                                    <div>
                                        <h3 className="font-bold font-mono text-black text-sm">Marketing Cookies</h3>
                                        <p className="text-xs text-gray-600 font-sans mt-1">
                                            Used to deliver relevant ads and track campaign effectiveness.
                                        </p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={localPreferences.marketing}
                                        onChange={() => handleToggle('marketing')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none border-2 border-black rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-2 after:border-black after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-yellow"></div>
                                </label>
                            </div>
                        </div>

                        {/* Functional */}
                        <div className="border-2 border-black p-4 bg-white hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <Settings className="w-5 h-5 text-black mt-0.5" />
                                    <div>
                                        <h3 className="font-bold font-mono text-black text-sm">Functional Cookies</h3>
                                        <p className="text-xs text-gray-600 font-sans mt-1">
                                            Enable personalized features and settings.
                                        </p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={localPreferences.functional}
                                        onChange={() => handleToggle('functional')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none border-2 border-black rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-2 after:border-black after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-yellow"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t-2 border-black p-4 flex justify-end gap-3 z-10">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-white hover:bg-gray-100 text-black font-bold font-mono text-sm border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-accent-yellow hover:bg-black hover:text-white text-black font-bold font-mono text-sm border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    )
}
