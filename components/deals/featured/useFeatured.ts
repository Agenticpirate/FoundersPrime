'use client'

import { useEffect, useRef, useState } from 'react'
import type { Deal } from '@/lib/deals-database'

/* ─────────────────────────────────────────────────────────────
 * Shared featured-deals data layer.
 * A single module-level cache + in-flight promise means every slot
 * on the page (header, left rail, right rail, inline ads) shares ONE
 * /api/deals request instead of each fetching independently.
 * ──────────────────────────────────────────────────────────── */

let cache: Deal[] | null = null
let cacheTime = 0
let inFlight: Promise<Deal[]> | null = null
const TTL = 60_000 // 60s — matches DealsGrid

function isPaidFeatured(d: Deal): boolean {
    return !!(d.featured && d.featuredUntil && new Date(d.featuredUntil).getTime() > Date.now())
}

function fetchFeatured(): Promise<Deal[]> {
    if (cache && Date.now() - cacheTime < TTL) return Promise.resolve(cache)
    if (!inFlight) {
        inFlight = fetch('/api/deals', { cache: 'no-store' })
            .then((r) => r.json())
            .then((data) => {
                const deals: Deal[] = data?.success ? data.deals : []
                const featured = deals.filter(isPaidFeatured)
                cache = featured
                cacheTime = Date.now()
                inFlight = null
                return featured
            })
            .catch(() => {
                inFlight = null
                return []
            })
    }
    return inFlight
}

/** Returns the pool of currently-active paid featured deals. */
export function useFeaturedDeals(): { deals: Deal[]; loading: boolean } {
    const [deals, setDeals] = useState<Deal[]>(cache || [])
    const [loading, setLoading] = useState(!cache)

    useEffect(() => {
        let active = true
        fetchFeatured().then((d) => {
            if (!active) return
            setDeals(d)
            setLoading(false)
        })
        return () => {
            active = false
        }
    }, [])

    return { deals, loading }
}

function prefersReducedMotion(): boolean {
    return (
        typeof window !== 'undefined' &&
        !!window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
}

/**
 * Rotates a pool of items through a fixed-size viewing window.
 * Advances by `size` every `intervalMs`, wrapping around the pool, so a
 * 30-deal pool cycles through every featured listing over time.
 *
 * - No rotation when the pool fits the window (size >= pool length).
 * - No rotation when the user prefers reduced motion.
 * - `offset` lets different slots start at different points so they don't
 *   all show the same deal at the same moment.
 */
export function useRotatingWindow<T>(
    items: T[],
    size: number,
    intervalMs = 6000,
    offset = 0
): { window: T[]; tick: number } {
    const [start, setStart] = useState(0)
    const n = items.length
    const sizeRef = useRef(size)
    sizeRef.current = size

    useEffect(() => {
        if (n <= size) return
        if (prefersReducedMotion()) return
        const id = setInterval(() => {
            setStart((s) => (s + sizeRef.current) % n)
        }, intervalMs)
        return () => clearInterval(id)
    }, [n, size, intervalMs])

    if (n === 0) return { window: [], tick: 0 }

    const base = (start + offset) % n
    const win: T[] = []
    for (let i = 0; i < Math.min(size, n); i++) {
        win.push(items[(base + i) % n])
    }
    return { window: win, tick: base }
}
