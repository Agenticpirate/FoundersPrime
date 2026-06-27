'use client'

import { useState, useEffect } from 'react'

const PROMO_CODES = [
  {
    code: 'FOUNDERLAUNCH50',
    label: 'FOUNDER Plan — 50% off, 1 Year',
    note: 'Founding member launch discount · Limited time',
    color: '#FFD700',
    glow: 'rgba(255,215,0,0.5)',
    tag: 'Founding Member',
    icon: 'rocket_launch',
  },
  {
    code: 'NEXTLAUNCH60',
    label: 'NEXTFOUNDERS — 60% off, For Students',
    note: 'Exclusive student founder launch offer',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.5)',
    tag: 'Student Offer',
    icon: 'school',
  },
  {
    code: 'LEGENDLAUNCH60',
    label: 'LEGEND Lifetime — 60% off forever',
    note: 'One-time payment, lifetime access · Early adopter',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.5)',
    tag: 'Legend Deal',
    icon: 'workspace_premium',
  },
]

const CYCLE_MS = 3500 // rotate every 3.5 seconds

export default function FlashCoupon() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [copied, setCopied] = useState(false)

  // Cycle through promo codes
  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % PROMO_CODES.length)
        setCopied(false)
        setVisible(true)
      }, 350) // fade duration
    }, CYCLE_MS)
    return () => clearInterval(interval)
  }, [])

  const promo = PROMO_CODES[index]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(promo.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // no-op
    }
  }

  return (
    <div>

      {/* Main coupon strip */}
      <div
        className="relative flex items-stretch overflow-hidden transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, rgba(0,0,0,0.95), rgba(0,0,0,0.9))`,
          border: `1.5px dashed`,
          borderColor: visible ? `${promo.color}60` : 'rgba(255,255,255,0.1)',
          boxShadow: visible ? `0 0 18px ${promo.glow.replace('0.5', '0.15')}, inset 0 0 20px rgba(0,0,0,0.3)` : 'none',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(4px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        }}
      >
        {/* Left icon */}
        <div
          className="flex items-center justify-center px-3 flex-shrink-0 border-r border-dashed transition-colors duration-300"
          style={{
            background: `${promo.color}10`,
            borderColor: `${promo.color}30`,
          }}
        >
          <span
            className="material-symbols-outlined text-[20px] transition-colors duration-300"
            style={{ color: promo.color, fontVariationSettings: "'FILL' 1", filter: `drop-shadow(0 0 6px ${promo.glow})` }}
          >
            {promo.icon}
          </span>
        </div>

        {/* Code info */}
        <div className="flex-1 min-w-0 px-3 py-2.5">
          <p
            className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] transition-colors duration-300"
            style={{ color: `${promo.color}99` }}
          >
            {promo.tag}
          </p>
          <p
            className="font-mono font-black text-[17px] leading-tight tracking-wider transition-colors duration-300"
            style={{
              color: promo.color,
              textShadow: `0 0 16px ${promo.glow}`,
            }}
          >
            {promo.code}
          </p>
          <p className="font-sans text-[11px] text-gray-400 mt-0.5 truncate">{promo.label}</p>
        </div>

        {/* Copy button */}
        <button
          onClick={copy}
          className={`flex-shrink-0 self-stretch px-4 font-mono font-black text-[10px] uppercase tracking-[0.14em] transition-all duration-200`}
          style={
            copied
              ? { background: '#22c55e', color: '#fff' }
              : { background: promo.color, color: '#000' }
          }
          aria-label={`Copy coupon code ${promo.code}`}
        >
          {copied ? (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check</span>
              Copied!
            </span>
          ) : (
            'Copy Code'
          )}
        </button>
      </div>

      <p className="flex items-center gap-1.5 mt-2 font-sans text-[10.5px] text-gray-600 transition-all duration-300">
        <span className="material-symbols-outlined text-[13px] text-gray-600">info</span>
        {promo.note}
      </p>
    </div>
  )
}
