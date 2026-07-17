'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * Thin top-of-page progress bar for route changes.
 * Starts on internal link click so users feel the click landed;
 * completes when pathname/search updates.
 */
export default function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const routeKey = `${pathname}?${searchParams?.toString() || ''}`
  const routeKeyRef = useRef(routeKey)

  const clearTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current)
      hideTimerRef.current = null
    }
  }

  const start = () => {
    clearTimers()
    setVisible(true)
    setProgress(18)
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 88) return p
        return Math.min(88, p + 6 + Math.random() * 10)
      })
    }, 180)
  }

  const finish = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setProgress(100)
    hideTimerRef.current = setTimeout(() => {
      setVisible(false)
      setProgress(0)
    }, 220)
  }

  // Complete when the URL actually changes
  useEffect(() => {
    if (routeKeyRef.current !== routeKey) {
      routeKeyRef.current = routeKey
      if (visible || progress > 0) finish()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey])

  // Capture internal link clicks (header, footer, anywhere)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return
      }
      const el = (e.target as HTMLElement | null)?.closest?.('a')
      if (!el) return
      const href = el.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return
      if (el.getAttribute('target') === '_blank' || el.hasAttribute('download')) return
      // External
      if (/^https?:\/\//i.test(href) && !href.includes(window.location.host)) return

      try {
        const url = new URL(href, window.location.origin)
        if (url.origin !== window.location.origin) return
        const nextKey = `${url.pathname}?${url.searchParams.toString()}`
        const currentKey = `${window.location.pathname}?${window.location.search.replace(/^\?/, '')}`
        // Normalize empty search
        const norm = (k: string) => k.replace(/\?$/, '')
        if (norm(nextKey) === norm(currentKey)) return
        start()
      } catch {
        // ignore malformed
      }
    }

    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      clearTimers()
    }
  }, [])

  if (!visible && progress === 0) return null

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 right-0 z-[100] h-[2.5px]"
      role="progressbar"
      aria-hidden={!visible}
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full origin-left bg-accent-yellow shadow-[0_0_12px_rgba(255,221,0,0.65)] transition-[width,opacity] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  )
}
