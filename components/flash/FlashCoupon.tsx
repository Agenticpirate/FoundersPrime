'use client'

import { useState } from 'react'
import { FLASH_COUPON } from '@/data/flash-deals'
import { useAuth } from '@/lib/auth/hooks'

export default function FlashCoupon() {
  const [copied, setCopied] = useState(false)
  const { isAuthenticated, loading } = useAuth()

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(FLASH_COUPON.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked — no-op; user can still read the code.
    }
  }

  if (loading) {
    return (
      <div className="relative flex items-center justify-center bg-black border border-dashed border-accent-yellow/40 p-4 font-mono text-[11px] text-gray-500 uppercase tracking-widest">
        Loading...
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div>
        <div className="relative flex items-stretch bg-black border border-dashed border-accent-yellow/40 overflow-hidden">
          {/* Left icon accent */}
          <div className="flex items-center justify-center px-3 bg-accent-yellow/[0.06] border-r border-dashed border-accent-yellow/30">
            <span
              className="material-symbols-outlined text-accent-yellow text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lock
            </span>
          </div>

          {/* Code info */}
          <div className="flex-1 min-w-0 px-3 py-2.5">
            <p className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Exclusive coupon
            </p>
            <p className="font-mono font-black text-[17px] text-gray-600 leading-tight tracking-wider">
              ••••••••
            </p>
            <p className="font-sans text-[11px] text-gray-400 mt-0.5">{FLASH_COUPON.label}</p>
          </div>

          {/* Unlock button */}
          <a
            href="/signup?next=/flash-deals"
            className="flex-shrink-0 self-stretch px-4 flex items-center bg-accent-yellow text-black hover:bg-white font-mono font-black text-[10px] uppercase tracking-[0.14em] transition-all"
            aria-label="Unlock discount code"
          >
            Unlock Code
          </a>
        </div>

        <p className="flex items-center gap-1.5 mt-2 font-sans text-[10.5px] text-gray-600">
          <span className="material-symbols-outlined text-[13px] text-gray-600">info</span>
          Sign up to reveal this exclusive discount code.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="relative flex items-stretch bg-black border border-dashed border-accent-yellow/40 overflow-hidden">
        {/* Left icon accent */}
        <div className="flex items-center justify-center px-3 bg-accent-yellow/[0.06] border-r border-dashed border-accent-yellow/30">
          <span
            className="material-symbols-outlined text-accent-yellow text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            sell
          </span>
        </div>

        {/* Code info */}
        <div className="flex-1 min-w-0 px-3 py-2.5">
          <p className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-gray-500">
            Exclusive coupon
          </p>
          <p className="font-mono font-black text-[17px] text-white leading-tight tracking-wider">
            {FLASH_COUPON.code}
          </p>
          <p className="font-sans text-[11px] text-gray-400 mt-0.5">{FLASH_COUPON.label}</p>
        </div>

        {/* Copy button */}
        <button
          onClick={copy}
          className={`flex-shrink-0 self-stretch px-4 font-mono font-black text-[10px] uppercase tracking-[0.14em] transition-all ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-accent-yellow text-black hover:bg-white'
          }`}
          aria-label={`Copy coupon code ${FLASH_COUPON.code}`}
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

      <p className="flex items-center gap-1.5 mt-2 font-sans text-[10.5px] text-gray-600">
        <span className="material-symbols-outlined text-[13px] text-gray-600">info</span>
        {FLASH_COUPON.note}
      </p>
    </div>
  )
}
