'use client'

import { useState, useEffect } from 'react'
import { X, Shield, BarChart3, Target, Settings, Check } from 'lucide-react'
import { useCookieConsent, CookiePreferences } from '@/context/CookieConsentContext'

// ── Compact pill toggle ───────────────────────────────────────────────────────
function Toggle({ checked, onChange, disabled }: { checked: boolean; onChange: () => void; disabled?: boolean }) {
    return (
        <div
            role="switch"
            aria-checked={checked}
            tabIndex={disabled ? -1 : 0}
            onClick={disabled ? undefined : onChange}
            onKeyDown={disabled ? undefined : (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onChange() } }}
            title={disabled ? 'Required – cannot be disabled' : undefined}
            style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                flexShrink: 0,
                width: '44px',
                height: '24px',
                borderRadius: '100px',
                backgroundColor: disabled
                    ? 'rgba(245,216,0,0.3)'
                    : checked
                    ? '#F5D800'
                    : 'rgba(255,255,255,0.12)',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s ease',
                outline: 'none',
                border: checked && !disabled ? '1.5px solid rgba(245,216,0,0.5)' : '1.5px solid rgba(255,255,255,0.08)',
                boxSizing: 'border-box',
            }}
        >
            <span
                style={{
                    position: 'absolute',
                    top: '3px',
                    left: '3px',
                    width: '16px',
                    height: '16px',
                    backgroundColor: disabled
                        ? 'rgba(245,216,0,0.7)'
                        : checked
                        ? '#000'
                        : 'rgba(255,255,255,0.45)',
                    borderRadius: '50%',
                    transform: checked ? 'translateX(20px)' : 'translateX(0)',
                    transition: 'transform 0.22s cubic-bezier(0.4,0,0.2,1), background-color 0.2s ease',
                    display: 'block',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.5)',
                }}
            />
        </div>
    )
}

// ── Cookie item row ───────────────────────────────────────────────────────────
interface CookieItemProps {
    icon: React.ReactNode
    title: string
    desc: string
    required?: boolean
    checked?: boolean
    onToggle?: () => void
}

function CookieItem({ icon, title, desc, required, checked, onToggle }: CookieItemProps) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                padding: '10px 14px',
                border: '1px solid rgba(255,255,255,0.07)',
                backgroundColor: 'rgba(255,255,255,0.02)',
                borderRadius: '4px',
            }}
        >
            {/* Left: icon + text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                <div style={{ color: required ? 'rgba(245,216,0,0.5)' : '#6b7280', flexShrink: 0 }}>
                    {icon}
                </div>
                <div style={{ minWidth: 0 }}>
                    <p style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: required ? '#9ca3af' : '#fff',
                        margin: 0,
                        textTransform: 'uppercase',
                        letterSpacing: '0.03em',
                    }}>
                        {title}
                    </p>
                    <p style={{
                        fontFamily: 'var(--font-sans, sans-serif)',
                        fontSize: '10px',
                        color: '#4b5563',
                        margin: '2px 0 0',
                        lineHeight: '1.4',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}>
                        {desc}
                    </p>
                </div>
            </div>

            {/* Right: toggle (always shown, disabled for required) */}
            <Toggle
                checked={required ? true : !!checked}
                onChange={required ? () => {} : onToggle!}
                disabled={required}
            />
        </div>
    )
}

// ── Main modal ────────────────────────────────────────────────────────────────
export default function CookiePreferencesModal() {
    const { isModalOpen, closeModal, preferences, savePreferences } = useCookieConsent()
    const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(preferences)

    useEffect(() => {
        if (isModalOpen) setLocalPreferences(preferences)
    }, [isModalOpen, preferences])

    if (!isModalOpen) return null

    const handleToggle = (key: keyof CookiePreferences) => {
        if (key === 'essential') return
        setLocalPreferences(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const handleSave = () => {
        savePreferences(localPreferences)
        closeModal()
    }

    const handleAcceptAll = () => {
        const all: CookiePreferences = { essential: true, analytics: true, marketing: true, functional: true }
        savePreferences(all)
        closeModal()
    }

    return (
        // Backdrop
        <div
            onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                backgroundColor: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(4px)',
            }}
        >
            {/* Modal panel */}
            <div style={{
                backgroundColor: '#0d0d0d',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                width: '100%',
                maxWidth: '420px',
                display: 'flex',
                flexDirection: 'column',
                animation: 'cookieModalIn 0.18s ease',
                borderRadius: '4px',
                overflow: 'hidden',
            }}>

                {/* ── Header ── */}
                <div style={{
                    backgroundColor: '#111',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            backgroundColor: '#F5D800',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '2px',
                        }}>
                            <Settings size={12} color="#000" />
                        </div>
                        <span style={{
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#fff',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                        }}>
                            Cookie Preferences
                        </span>
                    </div>
                    <button
                        onClick={closeModal}
                        aria-label="Close"
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '3px',
                            padding: '4px',
                            cursor: 'pointer',
                            color: '#4b5563',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'border-color 0.15s, color 0.15s',
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)'
                            ;(e.currentTarget as HTMLElement).style.color = '#fff'
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'
                            ;(e.currentTarget as HTMLElement).style.color = '#4b5563'
                        }}
                    >
                        <X size={14} />
                    </button>
                </div>

                {/* ── Body ── */}
                <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <p style={{
                        fontFamily: 'var(--font-sans, sans-serif)',
                        fontSize: '11px',
                        color: '#6b7280',
                        lineHeight: '1.5',
                        margin: '0 0 8px',
                    }}>
                        Choose which cookies you allow. Essential cookies are always on.
                    </p>

                    <CookieItem
                        icon={<Shield size={14} />}
                        title="Essential"
                        desc="Security & core functionality — always on"
                        required
                    />
                    <CookieItem
                        icon={<BarChart3 size={14} />}
                        title="Analytics"
                        desc="Site usage & performance insights"
                        checked={localPreferences.analytics}
                        onToggle={() => handleToggle('analytics')}
                    />
                    <CookieItem
                        icon={<Target size={14} />}
                        title="Marketing"
                        desc="Relevant ads & campaign tracking"
                        checked={localPreferences.marketing}
                        onToggle={() => handleToggle('marketing')}
                    />
                    <CookieItem
                        icon={<Settings size={14} />}
                        title="Functional"
                        desc="Personalization & browsing history"
                        checked={localPreferences.functional}
                        onToggle={() => handleToggle('functional')}
                    />
                </div>

                {/* ── Footer ── */}
                <div style={{
                    backgroundColor: '#111',
                    borderTop: '1px solid rgba(255,255,255,0.07)',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '8px',
                }}>
                    {/* Accept All */}
                    <button
                        onClick={handleAcceptAll}
                        style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: '3px',
                            padding: '7px 14px',
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '10px',
                            fontWeight: 700,
                            color: '#9ca3af',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            cursor: 'pointer',
                            transition: 'background 0.15s, color 0.15s',
                            whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'
                            ;(e.currentTarget as HTMLElement).style.color = '#fff'
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'
                            ;(e.currentTarget as HTMLElement).style.color = '#9ca3af'
                        }}
                    >
                        Accept All
                    </button>

                    {/* Save Preferences */}
                    <button
                        onClick={handleSave}
                        style={{
                            background: '#F5D800',
                            border: '1px solid #F5D800',
                            borderRadius: '3px',
                            padding: '7px 16px',
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '10px',
                            fontWeight: 700,
                            color: '#000',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            transition: 'background 0.15s',
                            whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ffe033' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#F5D800' }}
                    >
                        <Check size={11} />
                        Save
                    </button>
                </div>
            </div>

            {/* Keyframe animation */}
            <style>{`
                @keyframes cookieModalIn {
                    from { opacity: 0; transform: scale(0.97) translateY(6px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </div>
    )
}
