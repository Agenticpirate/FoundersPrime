'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/hooks'
import { CATALOG, CATALOG_COPY, OFFERS_TOTAL, PROGRAMS_TOTAL } from '@/lib/catalog-stats'

/**
 * Site-wide launch-offer popup.
 *
 * Each plan row is selectable and starts that plan's paid trial directly, so a
 * visitor can convert from the popup without first hunting for the pricing page.
 * Dismissal is remembered so the same visitor is not nagged on every page view.
 *
 * Deliberately not shown on pages where it would be redundant or obstructive:
 * pricing (already showing the offer), checkout, auth, dashboard and admin.
 */

/** Bump to re-show the popup to everyone after the offer changes. */
const DISMISS_KEY = 'fp_offer_popup_v1'

/** Days a dismissal is respected before the popup may appear again. */
const DISMISS_DAYS = 7

/** Delay before appearing, so it never competes with first paint. */
const APPEAR_DELAY_MS = 3500

/**
 * Cookie preference key written by CookieConsentProvider. The offer waits until
 * the cookie choice has been made so a visitor never faces two overlays at once.
 */
const CONSENT_KEY = 'fp:cookie_preferences:v1'

/** How often to re-check whether the cookie banner has been dealt with. */
const CONSENT_POLL_MS = 1500

/** Stop waiting for a cookie decision after this long. */
const CONSENT_WAIT_LIMIT_MS = 60_000

const HIDDEN_PATH_PREFIXES = [
  '/pricing',
  '/checkout',
  '/login',
  '/forgot-password',
  '/auth',
  '/dashboard',
  '/admin',
  '/billing',
  '/email-preferences',
  '/maintenance',
  '/coming-soon',
]

type PlanId = 'nextfounder' | 'founder'

interface PlanOffer {
  id: PlanId
  name: string
  audience: string
  annual: string
  wasAnnual: string
  trial: string
  /** Short hook shown above the row; distinct per plan so they never read alike. */
  badge: string
  featured: boolean
}

const OFFERS: PlanOffer[] = [
  {
    id: 'nextfounder',
    name: "Next'Founder",
    audience: `${CATALOG.studentPerks.toLocaleString('en-US')} student perks + credits`,
    annual: '$14.99',
    wasAnnual: '$59',
    trial: '$1',
    badge: 'Save 75%',
    featured: false,
  },
  {
    id: 'founder',
    name: 'Founder',
    audience: `All ${OFFERS_TOTAL.toLocaleString('en-US')} offers · unlimited claims`,
    annual: '$48',
    wasAnnual: '$149',
    trial: '$9.99',
    badge: 'Most popular',
    featured: true,
  },
]

function wasRecentlyDismissed(): boolean {
  try {
    const raw = window.localStorage.getItem(DISMISS_KEY)
    if (!raw) return false
    const dismissedAt = Number(raw)
    if (!Number.isFinite(dismissedAt)) return false
    return Date.now() - dismissedAt < DISMISS_DAYS * 24 * 60 * 60 * 1000
  } catch {
    // Private mode or storage disabled — treat as not dismissed but never throw.
    return false
  }
}

export default function OfferPopup() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [open, setOpen] = useState(false)
  const [startingPlan, setStartingPlan] = useState<PlanId | null>(null)
  const [error, setError] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  const hiddenHere = HIDDEN_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname?.startsWith(`${prefix}/`)
  )

  const remember = () => {
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()))
    } catch {
      // Ignore storage failures; the popup simply reappears next visit.
    }
  }

  const close = useCallback(() => {
    setOpen(false)
    remember()
    previouslyFocused.current?.focus?.()
  }, [])

  /** Start the paid trial for a plan, mirroring the pricing page checkout flow. */
  const startTrial = useCallback(
    async (plan: PlanId) => {
      if (authLoading || startingPlan) return
      setError(null)

      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const currentUser = session?.user || user

      // An account is required before checkout, so send visitors to sign up and
      // remember the offer as seen rather than showing it again behind them.
      if (!currentUser) {
        remember()
        setOpen(false)
        router.push(`/login?view=signup&redirect=${encodeURIComponent('/pricing#plans')}`)
        return
      }

      setStartingPlan(plan)
      try {
        const headers: Record<string, string> = { 'Content-Type': 'application/json' }
        if (session?.access_token) headers['Authorization'] = `Bearer ${session.access_token}`

        const res = await fetch('/api/payment/create-link', {
          method: 'POST',
          headers,
          body: JSON.stringify({ plan, mode: 'trial' }),
        })

        if (!(res.headers.get('content-type') || '').includes('application/json')) {
          setError('Checkout is unavailable right now. Please try again shortly.')
          return
        }

        const data = await res.json()
        if (res.ok && data.url) {
          remember()
          window.location.href = data.url
          return
        }
        if (res.status === 401) {
          remember()
          setOpen(false)
          router.push(`/login?redirect=${encodeURIComponent('/pricing#plans')}`)
          return
        }
        setError(data.error || 'Could not start checkout. Please try again.')
      } catch {
        setError('Network error. Please try again.')
      } finally {
        setStartingPlan(null)
      }
    },
    [authLoading, startingPlan, user, router]
  )

  useEffect(() => {
    if (hiddenHere || wasRecentlyDismissed()) return

    let poller: number | undefined
    const startedAt = Date.now()

    const consentDecided = () => {
      try {
        return window.localStorage.getItem(CONSENT_KEY) !== null
      } catch {
        return true
      }
    }

    const timer = window.setTimeout(() => {
      if (consentDecided()) {
        setOpen(true)
        return
      }
      // Cookie banner is still up — wait for it rather than stacking overlays.
      poller = window.setInterval(() => {
        if (consentDecided() || Date.now() - startedAt > CONSENT_WAIT_LIMIT_MS) {
          window.clearInterval(poller)
          setOpen(true)
        }
      }, CONSENT_POLL_MS)
    }, APPEAR_DELAY_MS)

    return () => {
      window.clearTimeout(timer)
      if (poller) window.clearInterval(poller)
    }
  }, [hiddenHere])

  // Escape to close, focus the dialog, and restore focus on exit.
  useEffect(() => {
    if (!open) return
    previouslyFocused.current = document.activeElement as HTMLElement | null

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => dialogRef.current?.focus(), 40)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      window.clearTimeout(focusTimer)
    }
  }, [open, close])

  if (!open) return null

  return (
    <div
      // Below the cookie UI (9998/9999) so consent always takes precedence.
      style={{ zIndex: 9990 }}
      className="fixed inset-0 flex items-end sm:items-center justify-center p-2 sm:p-6"
      role="presentation"
    >
      {/* Backdrop — clicking it dismisses, same as the close button. */}
      <button
        type="button"
        aria-label="Close offer"
        onClick={close}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-popup-title"
        aria-describedby="offer-popup-terms"
        tabIndex={-1}
        className="relative w-full max-w-md sm:max-w-lg bg-white dark:bg-[#0a0a0a] border-2 border-black dark:border-white/15 shadow-[4px_4px_0px_#111] sm:shadow-[6px_6px_0px_#111] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.08)] rounded-xl overflow-hidden focus:outline-none"
      >
        <div aria-hidden className="h-1 w-full bg-accent-yellow" />

        <button
          type="button"
          onClick={close}
          aria-label="Close offer"
          className="absolute top-2 right-2 z-10 w-8 h-8 inline-flex items-center justify-center rounded-lg border border-black/10 dark:border-white/15 bg-white/90 dark:bg-black/60 text-gray-600 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        >
          <span className="material-symbols-outlined !text-[18px]">close</span>
        </button>

        <div className="p-3.5 sm:p-6">
          <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-md bg-accent-yellow text-black border border-black/10 font-mono text-[8.5px] sm:text-[10px] font-black uppercase tracking-[0.1em]">
            <span
              className="material-symbols-outlined !text-[11px] sm:!text-[12px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
            Launch pricing
          </span>

          <h2
            id="offer-popup-title"
            className="mt-2 font-mono text-[16px] sm:text-[23px] font-black leading-tight tracking-tight text-gray-900 dark:text-white"
          >
            {CATALOG_COPY.offersTotal} verified deals. Yours from $1.
          </h2>
          {/* Supporting detail is desktop-only to keep the mobile sheet compact. */}
          <p className="hidden sm:block mt-1.5 text-[13px] text-gray-600 dark:text-gray-400 leading-snug">
            {CATALOG.founderDeals} founder deals · {PROGRAMS_TOTAL} accelerators, incubators and
            grants · {CATALOG.studentPerks.toLocaleString('en-US')} student perks. Founders save{' '}
            {CATALOG_COPY.typicalSaving} in year one.
          </p>

          <p className="mt-2 sm:mt-3 font-mono text-[8.5px] sm:text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">
            30-day trial:{' '}
            <span className="text-gray-900 dark:text-white font-black">$1</span> or{' '}
            <span className="text-gray-900 dark:text-white font-black">$9.99</span> — then the
            discounted annual price
          </p>

          {/* Selectable plan rows — each starts that plan's paid trial. The extra
              top margin clears the badge that now overhangs the first row. */}
          <div className="mt-3.5 sm:mt-4 space-y-2.5 sm:space-y-3">
            {OFFERS.map((offer) => {
              const busy = startingPlan === offer.id
              return (
                <button
                  key={offer.id}
                  type="button"
                  onClick={() => startTrial(offer.id)}
                  disabled={startingPlan !== null}
                  aria-label={`Start the ${offer.name} 30-day trial for ${offer.trial}, then ${offer.annual} per year`}
                  className={`group relative w-full text-left flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-lg border-2 transition-colors disabled:opacity-60 ${
                    offer.featured
                      ? 'border-accent-yellow bg-accent-yellow/[0.07] hover:bg-accent-yellow/[0.14]'
                      : 'border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/25'
                  }`}
                >
                  <span
                    className={`absolute -top-2 left-2.5 px-1.5 py-px rounded-full font-mono text-[7.5px] sm:text-[8px] font-black uppercase tracking-wider border ${
                      offer.featured
                        ? 'bg-accent-yellow text-black border-black/10'
                        : 'bg-[#0d0d0d] text-accent-yellow border-black/10 dark:border-white/15'
                    }`}
                  >
                    {offer.badge}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-[0.08em] text-gray-900 dark:text-white">
                      {offer.name}
                    </span>
                    <span className="block text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                      {offer.audience}
                    </span>
                  </span>
                  <span className="text-right shrink-0">
                    <span className="block font-mono text-[13px] sm:text-[17px] font-black text-gray-900 dark:text-white leading-none">
                      {offer.annual}
                      <span className="ml-1 text-[9px] sm:text-[10px] font-bold text-gray-400 line-through">
                        {offer.wasAnnual}
                      </span>
                      <span className="text-[8.5px] sm:text-[9px] font-bold text-gray-500">/yr</span>
                    </span>
                    {/* Trial price sits in an inverted chip so the entry price reads
                        instantly without out-shouting the annual hero price. */}
                    <span className="mt-1 sm:mt-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border border-black/10 bg-[#0d0d0d] dark:bg-accent-yellow leading-none">
                      {busy ? (
                        <span className="font-mono text-[8.5px] sm:text-[10px] font-black uppercase tracking-[0.08em] text-white dark:text-black">
                          Starting…
                        </span>
                      ) : (
                        <>
                          <span className="font-mono text-[7.5px] sm:text-[8.5px] font-black uppercase tracking-[0.08em] text-white/70 dark:text-black/70">
                            30 days
                          </span>
                          <span className="font-mono text-[12px] sm:text-[14px] font-black leading-none text-accent-yellow dark:text-black">
                            {offer.trial}
                          </span>
                          <span className="material-symbols-outlined !text-[12px] sm:!text-[13px] text-white dark:text-black group-hover:translate-x-0.5 transition-transform">
                            arrow_forward
                          </span>
                        </>
                      )}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {error && (
            <p
              role="alert"
              className="mt-2 text-[10px] sm:text-[11px] text-red-600 dark:text-red-400 leading-snug"
            >
              {error}
            </p>
          )}

          <div className="mt-2.5 sm:mt-4 flex items-center justify-between gap-3">
            <Link
              href="/pricing#plans"
              onClick={close}
              className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] text-gray-700 dark:text-gray-300 underline hover:text-black dark:hover:text-white"
            >
              Compare all plans
            </Link>
            <button
              type="button"
              onClick={close}
              className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              Maybe later
            </button>
          </div>

          <p
            id="offer-popup-terms"
            className="mt-1.5 sm:mt-2 text-[8.5px] sm:text-[10px] text-gray-400 dark:text-gray-500 leading-snug"
          >
            Trials renew automatically at the annual price shown. Cancel anytime before renewal.
          </p>
        </div>
      </div>
    </div>
  )
}
