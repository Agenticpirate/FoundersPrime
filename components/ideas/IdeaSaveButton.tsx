'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Stable id for an idea. Detail pages pass an explicit id; list cards derive
// one from the title so saving works without a dedicated slug field.
export function ideaIdFromTitle(title: string): string {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)
}

interface Props {
  ideaId: string
  variant?: 'icon' | 'full'
  className?: string
}

export default function IdeaSaveButton({ ideaId, variant = 'icon', className = '' }: Props) {
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let active = true
    fetch('/api/saved-ideas')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (active && d?.success) setSaved((d.savedIdeas || []).includes(ideaId)) })
      .catch(() => {})
    return () => { active = false }
  }, [ideaId])

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (busy) return
    setBusy(true)
    try {
      const res = saved
        ? await fetch(`/api/saved-ideas?ideaId=${encodeURIComponent(ideaId)}`, { method: 'DELETE' })
        : await fetch('/api/saved-ideas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ideaId }),
          })
      if (res.status === 401) { router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`); return }
      const data = await res.json().catch(() => ({}))
      if (data?.success) setSaved(!saved)
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
