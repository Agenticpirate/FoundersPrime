'use client'

import { useEffect } from 'react'

/**
 * Scroll to a hash target after client navigation / late-mounted sections.
 * Home `#advertise` is lazy-loaded; native hash scroll can miss it.
 */
export default function HashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash?.replace(/^#/, '')
      if (!hash) return
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    // Immediate + delayed (for dynamically imported sections)
    scrollToHash()
    const t1 = window.setTimeout(scrollToHash, 150)
    const t2 = window.setTimeout(scrollToHash, 500)
    window.addEventListener('hashchange', scrollToHash)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.removeEventListener('hashchange', scrollToHash)
    }
  }, [])

  return null
}
