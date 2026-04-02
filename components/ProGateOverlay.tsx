'use client'

import React from 'react'
import Link from 'next/link'

interface ProGateOverlayProps {
    totalCount: number
    visibleCount: number
    label?: string
    children: React.ReactNode
}

export default function ProGateOverlay({
    totalCount,
    visibleCount,
    label = 'Programs',
    children,
}: ProGateOverlayProps) {
    const hiddenCount = totalCount - visibleCount

    return (
        <div className="relative mt-6" style={{ minHeight: 520 }}>

            {/* ── Real cards blurred behind the gate ─────────────────────── */}
            <div
                style={{
                    filter: 'blur(9px) brightness(0.88) saturate(0.4)',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    maskImage:
                        'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage:
                        'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 100%)',
                }}
                aria-hidden="true"
            >
                {children}
            </div>

            {/* ── Glass + Neo-brutalist CTA panel ─────────────────────────── */}
            <div
                className="absolute inset-0 flex items-start justify-center pt-12 px-4"
                style={{ zIndex: 20 }}
            >
                {/* Outer neo‑brutalist frame */}
                <div
                    className="relative w-full max-w-[440px]"
                    style={{
                        border: '3px solid #111111',
                        boxShadow: '8px 8px 0px 0px #111111',
                        background: 'transparent',
                    }}
                >
                    {/* Frosted glass inner fill */}
                    <div
                        style={{
                            backdropFilter: 'blur(24px) saturate(1.6)',
                            WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
                            background: 'rgba(244, 243, 239, 0.88)', // paper colour at 88%
                            padding: '36px 36px 32px',
                        }}
                    >

                        {/* Top accent stripe */}
                        <div
                            className="absolute top-0 left-0 right-0 h-[5px]"
                            style={{ background: '#38bdf8' }}
                        />

                        {/* Lock icon */}
                        <div className="flex justify-center mb-5">
                            <div
                                className="animate-lock-pulse"
                                style={{
                                    width: 52,
                                    height: 52,
                                    background: '#111111',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px solid #111111',
                                    boxShadow: '4px 4px 0px #ffd700',
                                }}
                            >
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: 26, color: '#ffd700', fontVariationSettings: "'FILL' 1" }}
                                >
                                    lock
                                </span>
                            </div>
                        </div>

                        {/* PRO badge */}
                        <div className="flex justify-center mb-4">
                            <span
                                style={{
                                    background: '#ffd700',
                                    color: '#111111',
                                    fontFamily: 'IBM Plex Mono, monospace',
                                    fontSize: 10,
                                    fontWeight: 800,
                                    letterSpacing: '0.18em',
                                    padding: '4px 14px',
                                    border: '2px solid #111111',
                                    textTransform: 'uppercase',
                                    boxShadow: '2px 2px 0px #111111',
                                }}
                            >
                                ✦ Founder Plan — Full Access
                            </span>
                        </div>

                        {/* Headline */}
                        <h3
                            style={{
                                fontFamily: 'IBM Plex Mono, monospace',
                                fontSize: 24,
                                fontWeight: 900,
                                color: '#111111',
                                textTransform: 'uppercase',
                                letterSpacing: '-0.01em',
                                textAlign: 'center',
                                marginBottom: 6,
                                lineHeight: 1.15,
                            }}
                        >
                            More {label} Available
                        </h3>

                        <p
                            style={{
                                fontFamily: 'IBM Plex Mono, monospace',
                                fontSize: 12,
                                color: '#555555',
                                textAlign: 'center',
                                marginBottom: 0,
                            }}
                        >
                            You&apos;re seeing a preview — unlock the full collection
                        </p>

                        {/* Divider */}
                        <div
                            style={{
                                borderTop: '2px dashed #111111',
                                margin: '20px 0',
                                opacity: 0.25,
                            }}
                        />

                        {/* Feature list */}
                        <ul style={{ margin: '0 0 24px', padding: 0, listStyle: 'none' }}>
                            {[
                                `Unlimited access to all verified ${label.toLowerCase()}`,
                                'Direct application links & verified deadlines',
                                'Full funding amounts & equity terms',
                                'New deals added weekly — never miss an opportunity',
                            ].map((item) => (
                                <li
                                    key={item}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 10,
                                        marginBottom: 10,
                                        fontFamily: 'IBM Plex Mono, monospace',
                                        fontSize: 12,
                                        color: '#222222',
                                        fontWeight: 500,
                                    }}
                                >
                                    <span
                                        className="material-symbols-outlined"
                                        style={{
                                            fontSize: 17,
                                            color: '#38bdf8',
                                            flexShrink: 0,
                                            marginTop: 1,
                                            fontVariationSettings: "'FILL' 1",
                                        }}
                                    >
                                        check_circle
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <Link
                            href="/pricing"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8,
                                width: '100%',
                                background: '#111111',
                                color: '#ffd700',
                                fontFamily: 'IBM Plex Mono, monospace',
                                fontWeight: 800,
                                fontSize: 13,
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                padding: '14px 24px',
                                textDecoration: 'none',
                                border: '2px solid #111111',
                                boxShadow: '4px 4px 0px #ffd700',
                                transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLAnchorElement
                                el.style.transform = 'translate(-2px, -2px)'
                                el.style.boxShadow = '6px 6px 0px #ffd700'
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLAnchorElement
                                el.style.transform = 'translate(0, 0)'
                                el.style.boxShadow = '4px 4px 0px #ffd700'
                            }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>
                                workspace_premium
                            </span>
                            Unlock All {label} — Join Founder Plan
                        </Link>

                        {/* Fine print */}
                        <p
                            style={{
                                fontFamily: 'IBM Plex Mono, monospace',
                                fontSize: 10,
                                color: '#888888',
                                textAlign: 'center',
                                marginTop: 14,
                                letterSpacing: '0.02em',
                            }}
                        >
                            Starts from{' '}
                            <strong style={{ color: '#111111' }}>$89.99/year</strong> — that&apos;s less than $7.50/mo
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
