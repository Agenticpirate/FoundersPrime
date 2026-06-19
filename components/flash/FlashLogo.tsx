'use client'

import { useState } from 'react'
import type { FlashDeal } from '@/data/flash-deals'

/** Brand logo with a resilient fallback chain: explicit logo → favicon → initials. */
export default function FlashLogo({ deal }: { deal: FlashDeal }) {
  const chain = [
    ...(deal.logo ? [deal.logo] : []),
    ...(deal.domain
      ? [
          `https://www.google.com/s2/favicons?domain=${deal.domain}&sz=128`,
          `https://icons.duckduckgo.com/ip3/${deal.domain}.ico`,
        ]
      : []),
  ]

  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(chain.length === 0)

  if (failed) {
    return (
      <span className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 font-mono font-black text-[12px] text-accent-yellow rounded-md">
        {deal.name.slice(0, 2).toUpperCase()}
      </span>
    )
  }

  return (
    <span className="w-10 h-10 flex items-center justify-center bg-white/[0.06] border border-white/10 rounded-md flex-shrink-0">
      <img
        src={chain[index]}
        alt={`${deal.name} logo`}
        width={24}
        height={24}
        loading="lazy"
        decoding="async"
        className="w-6 h-6 object-contain"
        onError={() => (index + 1 < chain.length ? setIndex(index + 1) : setFailed(true))}
      />
    </span>
  )
}
