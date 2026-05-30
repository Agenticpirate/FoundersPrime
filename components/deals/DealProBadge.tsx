'use client'

import { useEffect, useState } from 'react'
import { checkProStatus } from '@/lib/auth/user-context'

/**
 * DealProBadge — client-side "Pro" lock indicator for deal pages.
 *
 * The deal page itself is statically generated (no per-request auth), so the
 * only user-specific bit — whether to show the "Pro" lock chip — is resolved
 * here on the client after hydration. Pro/admin users see no badge; everyone
 * else sees the lock chip. Renders nothing until status is known, so it never
 * flashes the wrong state.
 */
export default function DealProBadge() {
  const [isPro, setIsPro] = useState<boolean | null>(null)

  useEffect(() => {
    let active = true
    checkProStatus()
      .then(({ isPro }) => {
        if (active) setIsPro(isPro)
      })
      .catch(() => {
        if (active) setIsPro(false)
      })
    return () => {
      active = false
    }
  }, [])

  // Unknown yet, or Pro/admin → no badge.
  if (isPro === null || isPro) return null

  return (
    <span className="inline-flex items-center gap-1 rounded-sm px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-wide bg-accent-yellow text-black border-2 border-black shadow-[1px_1px_0px_#111]">
      <span className="material-symbols-outlined text-[12px]">lock</span>
      Pro
    </span>
  )
}
