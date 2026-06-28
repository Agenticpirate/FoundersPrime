'use client'

import { useState } from 'react'
import type { FlashDeal } from '@/data/flash-deals'

/** Brand logo with resilient fallback chain:
 *  explicit logo → logo.dev API → Google favicon → DuckDuckGo favicon → initials
 */
export default function FlashLogo({ deal }: { deal: FlashDeal }) {
  const chain = [
    // 1. Explicit logo URL from data file
    ...(deal.logo ? [deal.logo] : []),
    // 2. logo.dev (high-quality brand logos)
    ...(deal.domain
      ? [`https://img.logo.dev/${deal.domain}?token=pk_WQ-XL0MlQ3-ODa_K0zgqEg`]
      : []),
    // 3. Google favicon service
    ...(deal.domain
      ? [`https://www.google.com/s2/favicons?domain=${deal.domain}&sz=128`]
      : []),
    // 4. DuckDuckGo favicon
    ...(deal.domain
      ? [`https://icons.duckduckgo.com/ip3/${deal.domain}.ico`]
      : []),
  ]

  // Deduplicate — explicit logo might already be a logo.dev URL
  const uniqueChain = [...new Set(chain)]

  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(uniqueChain.length === 0)

  const handleError = () => {
    if (index + 1 < uniqueChain.length) {
      setIndex(index + 1)
    } else {
      setFailed(true)
    }
  }

  if (failed) {
    // Initials fallback
    const initials = deal.name
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase()
    return (
      <span className="w-10 h-10 flex items-center justify-center bg-accent-yellow/10 border border-accent-yellow/30 font-mono font-black text-[12px] text-accent-yellow rounded-md flex-shrink-0">
        {initials}
      </span>
    )
  }

  return (
    <span className="w-10 h-10 flex items-center justify-center bg-white/[0.06] border border-white/10 rounded-md flex-shrink-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={uniqueChain[index]}
        alt={`${deal.name} logo`}
        width={28}
        height={28}
        loading="lazy"
        decoding="async"
        className="w-7 h-7 object-contain"
        onError={handleError}
      />
    </span>
  )
}
