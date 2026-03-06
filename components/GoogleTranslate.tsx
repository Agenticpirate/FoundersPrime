'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

declare global {
    interface Window {
        googleTranslateElementInit: () => void
        google: any
    }
}

export default function GoogleTranslate() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        // Safety function to init
        const initTranslate = () => {
            try {
                if (window.google && window.google.translate && window.google.translate.TranslateElement) {
                    const target = document.getElementById('google_translate_element');
                    if (target) {
                        // Clear content to prevent doubling
                        target.innerHTML = '';
                        new window.google.translate.TranslateElement(
                            {
                                pageLanguage: 'en',
                                autoDisplay: false,
                                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                            },
                            'google_translate_element'
                        )
                    }
                }
            } catch (e) {
                console.warn("Google Translate init failed:", e);
            }
        };

        // If script is already loaded, init manually
        if (window.google && window.google.translate) {
            initTranslate();
        }

        // Global callback for script load
        window.googleTranslateElementInit = initTranslate;
    }, [])

    if (!mounted) return null

    return (
        <>
            <div id="google_translate_element" className="google-translate-container" />
            <Script
                src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                strategy="lazyOnload"
                onError={(e) => console.warn("Google Translate script failed to load", e)}
            />
        </>
    )
}
