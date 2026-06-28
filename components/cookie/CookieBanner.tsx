'use client'

import { useCookieConsent } from '@/context/CookieConsentContext'
import { Cookie } from 'lucide-react'

export default function CookieBanner() {
    const { hasConsented, savePreferences, openModal } = useCookieConsent()

    if (hasConsented) return null

    const handleAcceptAll = () => {
        savePreferences({ essential: true, analytics: true, marketing: true, functional: true })
    }

    const handleDeclineOptional = () => {
        savePreferences({ essential: true, analytics: false, marketing: false, functional: false })
    }

    return (
        <>
            {/* ── MOBILE: slim bottom bar ─────────────────────────────────────────── */}
            <div
                className="md:hidden"
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 9998,
                    backgroundColor: '#111',
                    borderTop: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 14px',
                    animation: 'slideUpBanner 0.25s ease',
                }}
            >
                {/* Cookie icon + short label */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flex: 1,
                    minWidth: 0,
                }}>
                    <div style={{
                        backgroundColor: '#F5D800',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}>
                        <Cookie size={12} color="#000" />
                    </div>
                    <span style={{
                        fontFamily: 'var(--font-sans, sans-serif)',
                        fontSize: '11px',
                        color: '#9ca3af',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>
                        We use cookies.{' '}
                        <button
                            onClick={openModal}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                fontFamily: 'inherit',
                                fontSize: 'inherit',
                                color: '#F5D800',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                textUnderlineOffset: '2px',
                            }}
                        >
                            Customize
                        </button>
                    </span>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                    <button
                        onClick={handleDeclineOptional}
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.15)',
                            padding: '5px 10px',
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '10px',
                            fontWeight: 700,
                            color: '#9ca3af',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAcceptAll}
                        style={{
                            background: '#F5D800',
                            border: '1px solid #F5D800',
                            padding: '5px 10px',
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '10px',
                            fontWeight: 700,
                            color: '#000',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Accept
                    </button>
                </div>
            </div>

            {/* ── DESKTOP: floating card (bottom-right) ───────────────────────────── */}
            <div
                className="hidden md:block"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 9998,
                    width: '360px',
                    backgroundColor: '#0d0d0d',
                    border: '1px solid rgba(255,255,255,0.12)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    animation: 'slideUpBanner 0.3s ease',
                }}
            >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{
                        backgroundColor: '#F5D800',
                        padding: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}>
                        <Cookie size={14} color="#000" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '11px',
                            fontWeight: 800,
                            color: '#F5D800',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            margin: 0,
                        }}>
                            COOKIE_&amp;_DATA_CONSENT
                        </p>
                        <p style={{
                            fontFamily: 'var(--font-sans, sans-serif)',
                            fontSize: '11px',
                            color: '#9ca3af',
                            lineHeight: '1.5',
                            margin: '5px 0 0',
                        }}>
                            We use cookies for analytics &amp; personalization. Customize or accept to continue.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '10px',
                    borderTop: '1px solid rgba(255,255,255,0.07)',
                    gap: '8px',
                }}>
                    <button
                        onClick={openModal}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '10px',
                            color: '#d1d5db',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            textDecoration: 'underline',
                            textUnderlineOffset: '3px',
                            cursor: 'pointer',
                        }}
                    >
                        Customize
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                            onClick={handleDeclineOptional}
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.15)',
                                padding: '6px 12px',
                                fontFamily: 'var(--font-mono, monospace)',
                                fontSize: '10px',
                                fontWeight: 700,
                                color: '#9ca3af',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                cursor: 'pointer',
                            }}
                        >
                            Decline Optional
                        </button>
                        <button
                            onClick={handleAcceptAll}
                            style={{
                                background: '#F5D800',
                                border: '1px solid #F5D800',
                                padding: '6px 14px',
                                fontFamily: 'var(--font-mono, monospace)',
                                fontSize: '10px',
                                fontWeight: 700,
                                color: '#000',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                cursor: 'pointer',
                            }}
                        >
                            Accept All
                        </button>
                    </div>
                </div>
            </div>

            {/* Slide-up animation */}
            <style>{`
                @keyframes slideUpBanner {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    )
}
