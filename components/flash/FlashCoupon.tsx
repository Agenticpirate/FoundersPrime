'use client'

import { useState } from 'react'
import { FLASH_COUPON } from '@/data/flash-deals'

export default function FlashCoupon() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(FLASH_COUPON.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked — no-op; user can still read the code.
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 bg-black/40 border-2 border-dashed border-accent-yellow/50 px-4 py-3">
        <span className="material-symbols-outlined text-accent-yellow text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          sell
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400">
            Exclusive coupon
          </p>
          <p className="font-mono font-black text-lg text-white leading-tight truncate">
            {FLASH_COUPON.code}
          </p>
          <p className="font-sans text-[11px] text-gray-400">{FLASH_COUPON.label}</p>
        </div>
        <button
          onClick={copy}
          className="flex-shrink-0 bg-accent-yellow text-black font-mono font-black text-[11px] uppercase tracking-[0.1em] px-4 py-2.5 hover:bg-white transition-colors"
          aria-label={`Copy coupon code ${FLASH_COUPON.code}`}
        >
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <p className="flex items-center gap-1.5 mt-2 font-sans text-[11px] text-gray-500">
        <span className="material-symbols-outlined text-[14px]">info</span>
        {FLASH_COUPON.note}
      </p>
    </div>
  )
}
