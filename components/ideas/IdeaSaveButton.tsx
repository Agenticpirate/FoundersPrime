'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  ideaId: string
  variant?: 'icon' | 'full'
  className?: string
}

export default function IdeaSaveButton({ ideaId, variant = 'icon', className = '' }: Props) {
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)
  const statusLoadedRef = useRef(false)

  /** Load save status on first interaction — avoids fetch-in-effect races. */
  const ensureStatus = async (): Promise<boolean> => {
    if (statusLoadedRef.current) return saved
    try {
      const r = await fetch('/api/saved-ideas')
      const d = r.ok ? await r.json() : null
      const isSaved = Boolean(d?.success && (d.savedIdeas || []).includes(ideaId))
      setSaved(isSaved)
      statusLoadedRef.current = true
      return isSaved
    } catch {
      statusLoadedRef.current = true
      return saved
    }
  }

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (busy) return
    setBusy(true)
    try {
      const currentlySaved = await ensureStatus()
      const res = currentlySaved
        ? await fetch(`/api/saved-ideas?ideaId=${encodeURIComponent(ideaId)}`, { method: 'DELETE' })
        : await fetch('/api/saved-ideas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ideaId }),
          })
      if (res.status === 401) { router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`); return }
      const data = await res.json().catch(() => ({}))
      if (data?.success) setSaved(!currentlySaved)
    } catch {
      // swallow — UI stays in current state
    } finally {
      setBusy(false)
    }
  }

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={toggle}
        onMouseEnter={() => { void ensureStatus() }}
        onFocus={() => { void ensureStatus() }}
        disabled={busy}
        aria-pressed={saved}
        className={className || 'w-full py-3 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono font-bold rounded-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60'}
      >
        <span className="material-symbols-outlined text-sm" style={saved ? { fontVariationSettings: "'FILL' 1" } : undefined}>
          {saved ? 'bookmark_added' : 'bookmark'}
        </span>
        {saved ? 'Saved' : 'Save Idea'}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      onMouseEnter={() => { void ensureStatus() }}
      onFocus={() => { void ensureStatus() }}
      disabled={busy}
      aria-pressed={saved}
      aria-label={saved ? 'Remove saved idea' : 'Save idea'}
      className={className || 'p-1.5 border-2 border-black bg-white hover:bg-accent-yellow rounded-sm transition-colors disabled:opacity-60'}
    >
      <span className="material-symbols-outlined text-sm md:text-base align-middle" style={saved ? { fontVariationSettings: "'FILL' 1" } : undefined}>
        {saved ? 'bookmark' : 'bookmark_border'}
      </span>
    </button>
  )
}
