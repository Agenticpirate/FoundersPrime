'use client'

import type { CSSProperties } from 'react'
import { useCookieConsent } from '@/context/CookieConsentContext'
import { Cookie } from 'lucide-react'

/** Module-scoped styles — identical to previous inline values (no visual change) */
const MOBILE_BAR: CSSProperties = {
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
}

const MOBILE_ROW: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  flex: 1,
  minWidth: 0,
}

const MOBILE_ICON: CSSProperties = {
  backgroundColor: '#F5D800',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

const MOBILE_LABEL: CSSProperties = {
  fontFamily: 'var(--font-sans, sans-serif)',
  fontSize: '11px',
  color: '#9ca3af',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

const MOBILE_LINK_BTN: CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  fontFamily: 'inherit',
  fontSize: 'inherit',
  color: '#F5D800',
  cursor: 'pointer',
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
}

const MOBILE_ACTIONS: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  flexShrink: 0,
}

const MOBILE_DECLINE: CSSProperties = {
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
}

const MOBILE_ACCEPT: CSSProperties = {
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
}

const DESKTOP_CARD: CSSProperties = {
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
}

const DESKTOP_HEADER: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
}

const DESKTOP_ICON: CSSProperties = {
  backgroundColor: '#F5D800',
  padding: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

const DESKTOP_TITLE: CSSProperties = {
  fontFamily: 'var(--font-mono, monospace)',
  fontSize: '11px',
  fontWeight: 800,
  color: '#F5D800',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  margin: 0,
}

const DESKTOP_BODY: CSSProperties = {
  fontFamily: 'var(--font-sans, sans-serif)',
  fontSize: '11px',
  color: '#9ca3af',
  lineHeight: '1.5',
  margin: '5px 0 0',
}

const DESKTOP_ACTIONS: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: '10px',
  borderTop: '1px solid rgba(255,255,255,0.07)',
  gap: '8px',
}

const DESKTOP_CUSTOMIZE: CSSProperties = {
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
}

const DESKTOP_BTN_ROW: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
}

const DESKTOP_DECLINE: CSSProperties = {
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
}

const DESKTOP_ACCEPT: CSSProperties = {
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
}

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
      <div className="md:hidden" style={MOBILE_BAR}>
        <div style={MOBILE_ROW}>
          <div style={MOBILE_ICON}>
            <Cookie size={12} color="#000" />
          </div>
          <span style={MOBILE_LABEL}>
            We use cookies.{' '}
            <button type="button" onClick={openModal} style={MOBILE_LINK_BTN}>
              Customize
            </button>
          </span>
        </div>

        <div style={MOBILE_ACTIONS}>
          <button type="button" onClick={handleDeclineOptional} style={MOBILE_DECLINE}>
            Decline
          </button>
          <button type="button" onClick={handleAcceptAll} style={MOBILE_ACCEPT}>
            Accept
          </button>
        </div>
      </div>

      {/* ── DESKTOP: floating card (bottom-right) ───────────────────────────── */}
      <div className="hidden md:block" style={DESKTOP_CARD}>
        <div style={DESKTOP_HEADER}>
          <div style={DESKTOP_ICON}>
            <Cookie size={14} color="#000" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={DESKTOP_TITLE}>COOKIE_&amp;_DATA_CONSENT</p>
            <p style={DESKTOP_BODY}>
              We use cookies for analytics &amp; personalization. Customize or accept to continue.
            </p>
          </div>
        </div>

        <div style={DESKTOP_ACTIONS}>
          <button type="button" onClick={openModal} style={DESKTOP_CUSTOMIZE}>
            Customize
          </button>
          <div style={DESKTOP_BTN_ROW}>
            <button type="button" onClick={handleDeclineOptional} style={DESKTOP_DECLINE}>
              Decline Optional
            </button>
            <button type="button" onClick={handleAcceptAll} style={DESKTOP_ACCEPT}>
              Accept All
            </button>
          </div>
        </div>
      </div>

      <style>{`
                @keyframes slideUpBanner {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
    </>
  )
}
