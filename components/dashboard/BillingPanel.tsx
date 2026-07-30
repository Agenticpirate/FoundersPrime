'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import DodoPaymentsBadge from '@/components/ui/DodoPaymentsBadge'
import { formatDateLong, formatMonthYear } from '@/lib/format-date'
import { PLAN_LABELS, PLAN_PRICES, PLAN_ICONS, PLAN_FEATURES } from './billing-plan-config'
import BillingCancelModal from './BillingCancelModal'

type Subscription = {
  id: string
  plan: 'nextfounder' | 'founder' | 'legend'
  status: string
  period_start: string | null
  period_end: string | null
  cancel_at_period_end: boolean
  stripe_subscription_id: string | null
  created_at: string
} | null

interface BillingPanelProps {
  isPro: boolean
  isAdmin: boolean
  subscription: Subscription
  userName: string
  userEmail: string
  memberSinceFull: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' as const },
  }),
}

function daysUntil(iso: string | null | undefined): number | null {
  if (!iso) return null
  const end = new Date(iso).getTime()
  if (Number.isNaN(end)) return null
  const ms = end - Date.now()
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}

function periodProgress(start: string | null, end: string | null): number | null {
  if (!start || !end) return null
  const s = new Date(start).getTime()
  const e = new Date(end).getTime()
  if (Number.isNaN(s) || Number.isNaN(e) || e <= s) return null
  const pct = ((Date.now() - s) / (e - s)) * 100
  return Math.min(100, Math.max(0, Math.round(pct)))
}

const MANAGE_ITEMS =  [
  {
    href: '/pricing',
    icon: 'swap_horiz',
    label: 'Change plan',
    sub: 'Upgrade or compare plans',
  },
  {
    href: '/deals',
    icon: 'local_offer',
    label: 'Browse deals',
    sub: 'Use your catalog access',
  },
  {
    href: '/auth/reset-password',
    icon: 'lock_reset',
    label: 'Change password',
    sub: 'Update credentials',
  },
  {
    href: 'mailto:support@foundersprime.com?subject=Billing%20Support',
    icon: 'support_agent',
    label: 'Billing support',
    sub: 'Email our team',
  },
  {
    href: '/refund',
    icon: 'receipt_long',
    label: 'Refund policy',
    sub: 'How billing & refunds work',
  },
  {
    href: '/terms',
    icon: 'gavel',
    label: 'Terms of service',
    sub: 'Legal & subscription terms',
  },
]


export default function BillingPanel({
  isPro,
  isAdmin,
  subscription,
  userName,
  userEmail,
  memberSinceFull,
}: BillingPanelProps) {
  const router = useRouter()
  const reduce = useReducedMotion()
  const [cancelStep, setCancelStep] = useState<'why' | 'review' | 'done'>('why')
  const [stepDir, setStepDir] = useState(1)
  const [cancelReason, setCancelReason] = useState('Too expensive / pricing')
  const [cancelComments, setCancelComments] = useState('')
  const [isCancelling, setIsCancelling] = useState(false)
  const [cancelResult, setCancelResult] = useState<{ ok: boolean; message: string } | null>(null)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

    const planKey = subscription?.plan || (isPro ? 'founder' : 'free')
  const planLabel = isAdmin
    ? 'Admin'
    : subscription
      ? PLAN_LABELS[subscription.plan] || 'Founder'
      : isPro
        ? 'Founder'
        : 'Free'
  const planPrice = subscription ? PLAN_PRICES[subscription.plan] : isPro ? null : 'Free'
  const planIcon = isAdmin
    ? PLAN_ICONS.admin
    : PLAN_ICONS[planKey] || PLAN_ICONS.free
  const isLifetime = subscription?.plan === 'legend'
  const cancelPending = subscription?.cancel_at_period_end === true
  const renewalDate = subscription?.period_end
    ? formatDateLong(subscription.period_end)
    : null
  const daysLeft = daysUntil(subscription?.period_end)
  const progress = periodProgress(subscription?.period_start ?? null, subscription?.period_end ?? null)
  const features =
    PLAN_FEATURES[isAdmin ? 'founder' : planKey] || PLAN_FEATURES.free

  const goStep = (next: 'why' | 'review' | 'done') => {
    const order = { why: 0, review: 1, done: 2 }
    setStepDir(order[next] >= order[cancelStep] ? 1 : -1)
    setCancelStep(next)
  }

  const handleCancel = async () => {
    if (isCancelling) return
    setIsCancelling(true)
    setCancelResult(null)
    try {
      const res = await fetch('/api/billing/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason: cancelReason,
          feedback: cancelComments,
          confirm: true,
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setCancelResult({ ok: true, message: data.message || 'Auto-renewal cancelled successfully.' })
        goStep('done')
        setTimeout(() => router.refresh(), 1800)
      } else {
        setCancelResult({
          ok: false,
          message: data.error || 'Could not cancel. Please email support.',
        })
        setShowCancelModal(false)
        setCancelStep('why')
      }
    } catch {
      setCancelResult({ ok: false, message: 'Network error. Please try again.' })
      setShowCancelModal(false)
      setCancelStep('why')
    } finally {
      setIsCancelling(false)
    }
  }

  const closeModal = useCallback(() => {
    if (isCancelling) return
    const wasDone = cancelStep === 'done'
    setShowCancelModal(false)
    setCancelStep('why')
    setStepDir(1)
    setCancelComments('')
    setCancelReason('Too expensive / pricing')
    if (wasDone) router.refresh()
  }, [isCancelling, cancelStep, router])

  const openCancelModal = () => {
    setCancelStep('why')
    setStepDir(1)
    setCancelResult(null)
    setShowCancelModal(true)
  }

  // Escape + body scroll lock while modal open
  useEffect(() => {
    if (!showCancelModal) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isCancelling) closeModal()
    }
    window.addEventListener('keydown', onKey)
    // Focus dialog for a11y
    const t = window.setTimeout(() => modalRef.current?.focus(), 50)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(t)
    }
  }, [showCancelModal, isCancelling, closeModal])

  return (
    <section className="relative">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6"
      >
        <div>
          <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.16em] text-gray-600 dark:text-gray-400 inline-flex items-center gap-1.5 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow" />
            Billing &amp; subscription
          </h2>
          <p className="font-mono text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Manage your access
          </p>
          <p className="mt-1 text-[12px] text-gray-500 dark:text-zinc-500 max-w-md">
            Plan status, renewals, and support — all in one place.
          </p>
        </div>
        <DodoPaymentsBadge className="!self-start sm:!self-auto" />
      </motion.div>

      <AnimatePresence>
        {cancelResult && !showCancelModal && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className={`mb-5 px-4 py-3.5 rounded-2xl border flex items-start gap-2.5 ${
              cancelResult.ok
                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700/40'
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/40'
            }`}
          >
            <span
              className={`material-symbols-outlined !text-[18px] flex-shrink-0 mt-0.5 ${
                cancelResult.ok ? 'text-emerald-600' : 'text-red-600'
              }`}
            >
              {cancelResult.ok ? 'check_circle' : 'error'}
            </span>
            <p className="text-[13px] text-gray-800 dark:text-gray-200 leading-relaxed flex-1">
              {cancelResult.message}
            </p>
            <button
              type="button"
              onClick={() => setCancelResult(null)}
              className="text-gray-400 hover:text-gray-700 dark:hover:text-white p-1"
              aria-label="Dismiss"
            >
              <span className="material-symbols-outlined !text-[16px]">close</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
        {/* ── Plan hero card ── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial={reduce ? false : 'hidden'}
          animate="show"
          className="lg:col-span-8 relative overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-[#0a0a0a]"
        >
          {/* Top accent bar */}
          <div
            className={`h-1 w-full ${
              cancelPending
                ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500/40'
                : isPro
                  ? 'bg-gradient-to-r from-accent-yellow via-amber-300 to-accent-yellow/30'
                  : 'bg-gradient-to-r from-emerald-500/80 via-emerald-400/50 to-transparent'
            }`}
          />

          <div className="relative p-5 md:p-7">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-10 h-52 w-52 rounded-full bg-accent-yellow/10 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-amber-500/[0.05] blur-3xl"
            />

            <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div className="flex items-start gap-3.5 min-w-0">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${
                    isPro
                      ? 'bg-accent-yellow/15 border-accent-yellow/35 text-amber-700 dark:text-accent-yellow'
                      : 'bg-gray-100 dark:bg-white/5 border-black/10 dark:border-white/10 text-gray-600 dark:text-zinc-300'
                  }`}
                >
                  <span className="material-symbols-outlined !text-[24px]">{planIcon}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-500 mb-1">
                    Current plan
                  </p>
                  <h3 className="font-mono text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                    {planLabel}
                  </h3>
                  {planPrice && (
                    <p className="mt-1.5 font-mono text-sm text-gray-500 dark:text-gray-400 inline-flex items-center gap-2">
                      <span>{planPrice}</span>
                      {!isLifetime && isPro && (
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-zinc-600">
                          billed yearly
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`inline-flex self-start items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] font-black uppercase tracking-wide border ${
                  cancelPending
                    ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
                    : isPro
                      ? 'bg-accent-yellow text-black border-accent-yellow shadow-[0_0_20px_rgba(255,215,0,0.2)]'
                      : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/25'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    cancelPending
                      ? 'bg-amber-500'
                      : isPro
                        ? 'bg-black'
                        : 'bg-emerald-500 animate-pulse'
                  }`}
                />
                {cancelPending ? 'Cancels at period end' : isPro ? 'Active' : 'Free plan'}
              </div>
            </div>

            {/* Cancel pending banner */}
            {cancelPending && renewalDate && (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative mb-5 rounded-xl border border-amber-500/25 bg-amber-500/[0.07] p-4 flex items-start gap-3"
              >
                <span className="material-symbols-outlined !text-[20px] text-amber-600 dark:text-amber-400">
                  schedule
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[12px] font-bold text-amber-900 dark:text-amber-200">
                    Auto-renewal is off
                  </p>
                  <p className="text-[13px] text-amber-800/90 dark:text-amber-300/90 mt-0.5 leading-relaxed">
                    Full access until <span className="font-semibold">{renewalDate}</span>
                    {daysLeft != null && (
                      <>
                        {' '}
                        <span className="text-amber-700/80 dark:text-amber-400/80">
                          ({daysLeft} day{daysLeft === 1 ? '' : 's'} left)
                        </span>
                      </>
                    )}
                    , then Free plan.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Feature grid */}
            <ul className="relative grid sm:grid-cols-2 gap-2 mb-6">
              {features.map((f, i) => (
                <motion.li
                  key={f}
                  initial={reduce ? false : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className="flex items-start gap-2 text-[13px] text-gray-700 dark:text-gray-300 rounded-lg px-2 py-1.5 -mx-2 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors"
                >
                  <span
                    className="material-symbols-outlined !text-[16px] text-accent-yellow mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  {f}
                </motion.li>
              ))}
            </ul>

            {/* Renewal timeline */}
            {isPro && subscription?.period_end && !cancelPending && !isLifetime && (
              <div className="relative rounded-xl border border-black/[0.06] dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] p-4 mb-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                      Next renewal
                    </p>
                    <p className="font-mono text-[15px] font-black text-gray-900 dark:text-white">
                      {renewalDate}
                    </p>
                  </div>
                  {daysLeft != null && (
                    <div className="text-right">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Days left
                      </p>
                      <p className="font-mono text-[15px] font-black text-accent-yellow tabular-nums">
                        {daysLeft}
                      </p>
                    </div>
                  )}
                </div>
                {progress != null && (
                  <div className="mb-2.5">
                    <div className="h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                      <motion.div
                        initial={reduce ? false : { scaleX: 0 }}
                        animate={{ scaleX: Math.min(1, Math.max(0, progress / 100)) }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        style={{ transformOrigin: 'left center' }}
                        className="h-full w-full rounded-full bg-gradient-to-r from-accent-yellow to-amber-400"
                      />
                    </div>
                    <p className="mt-1.5 font-mono text-[9px] text-gray-400 uppercase tracking-wide">
                      Billing period · {progress}% complete
                    </p>
                  </div>
                )}
                <p className="text-[12px] text-gray-500 dark:text-zinc-400">
                  Auto-renews unless you cancel. No surprise charges — you choose.
                </p>
              </div>
            )}

            {isLifetime && (
              <div className="relative rounded-xl border border-accent-yellow/25 bg-accent-yellow/[0.08] p-4 mb-5 flex items-start gap-3">
                <span className="material-symbols-outlined !text-[20px] text-amber-600 dark:text-accent-yellow">
                  all_inclusive
                </span>
                <p className="text-[13px] text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">Lifetime access</span> — one-time payment. Nothing
                  to renew or cancel.
                </p>
              </div>
            )}

            {!isPro && (
              <Link
                href="/pricing"
                className="relative inline-flex items-center gap-2 min-h-[48px] px-5 rounded-xl bg-accent-yellow text-black font-mono font-black text-[12px] uppercase tracking-wide hover:bg-yellow-300 transition-colors shadow-[0_0_24px_rgba(255,215,0,0.2)]"
              >
                <span className="material-symbols-outlined !text-[18px]">bolt</span>
                Upgrade plan
              </Link>
            )}

            {isPro && !isLifetime && (
              <div className="relative flex flex-wrap gap-2">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-xl border border-black/10 dark:border-white/15 text-gray-900 dark:text-white font-mono text-[11px] font-bold uppercase hover:border-accent-yellow/50 hover:bg-accent-yellow/[0.06] transition-colors"
                >
                  <span className="material-symbols-outlined !text-[16px]">compare_arrows</span>
                  Compare plans
                </Link>
                {!cancelPending && subscription && (
                  <button
                    type="button"
                    onClick={openCancelModal}
                    className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-xl border border-red-500/30 text-red-600 dark:text-red-400 font-mono text-[11px] font-bold uppercase hover:bg-red-500/10 transition-colors"
                  >
                    <span className="material-symbols-outlined !text-[16px]">autorenew</span>
                    Cancel auto-renewal
                  </button>
                )}
                {cancelPending && (
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-xl bg-accent-yellow text-black font-mono text-[11px] font-black uppercase hover:bg-yellow-300 transition-colors"
                  >
                    <span className="material-symbols-outlined !text-[16px]">replay</span>
                    Resume subscription
                  </Link>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Account snapshot ── */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial={reduce ? false : 'hidden'}
          animate="show"
          className="lg:col-span-4 rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-[#0a0a0a] p-5 md:p-6 flex flex-col"
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500 mb-4">
            Account
          </p>
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-black/[0.06] dark:border-white/10">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-yellow/15 border border-accent-yellow/30 font-mono text-sm font-black text-amber-800 dark:text-accent-yellow uppercase">
              {(userName || userEmail || '?').slice(0, 1)}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-gray-900 dark:text-white truncate">
                {userName}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-zinc-500 truncate">{userEmail}</p>
            </div>
          </div>
          <dl className="space-y-4 flex-1">
            {[
              { label: 'Member since', value: memberSinceFull },
              {
                label: 'Access',
                value: isAdmin ? 'Admin' : isPro ? 'Paid / granted' : 'Free',
              },
              {
                label: 'Billing',
                value: cancelPending
                  ? 'Cancels at period end'
                  : isLifetime
                    ? 'Lifetime (no renewal)'
                    : isPro && subscription
                      ? 'Auto-renew on'
                      : isPro
                        ? 'Complimentary'
                        : '—',
              },
            ].map((row) => (
              <div key={row.label}>
                <dt className="font-mono text-[9px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  {row.label}
                </dt>
                <dd className="mt-0.5 text-[13px] font-semibold text-gray-900 dark:text-white">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
          {subscription?.created_at && (
            <p className="mt-5 pt-4 border-t border-black/[0.06] dark:border-white/10 font-mono text-[10px] text-gray-500">
              Subscription since {formatMonthYear(subscription.created_at)}
            </p>
          )}
        </motion.div>
      </div>

      {/* Manage grid */}
      <motion.div
        custom={2}
        variants={fadeUp}
        initial={reduce ? false : 'hidden'}
        animate="show"
        className="mt-5 rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-[#0a0a0a] p-5 md:p-6"
      >
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500 mb-4">
          Manage &amp; support
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {MANAGE_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              variants={fadeUp}
              initial={reduce ? false : 'hidden'}
              animate="show"
            >
              <Link
                href={item.href}
                className="group flex items-center gap-3 p-3.5 min-h-[64px] rounded-xl border border-black/[0.06] dark:border-white/[0.08] hover:border-accent-yellow/40 hover:bg-accent-yellow/[0.04] transition-all"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-white border border-black/5 dark:border-white/10 group-hover:bg-accent-yellow/15 group-hover:text-amber-800 dark:group-hover:text-accent-yellow transition-colors">
                  <span className="material-symbols-outlined !text-[18px]">{item.icon}</span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[11px] font-black uppercase tracking-wide text-gray-900 dark:text-white">
                    {item.label}
                  </span>
                  <span className="block text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                    {item.sub}
                  </span>
                </span>
                <span className="material-symbols-outlined !text-[16px] text-gray-400 group-hover:translate-x-0.5 group-hover:text-accent-yellow transition-all">
                  chevron_right
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Comped access note */}
      {isPro && !subscription && (
        <motion.div
          custom={3}
          variants={fadeUp}
          initial={reduce ? false : 'hidden'}
          animate="show"
          className="mt-5 rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-5 md:p-6"
        >
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined !text-[22px] text-amber-600 dark:text-amber-400">
              info
            </span>
            <div>
              <p className="font-mono text-[12px] font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wide">
                {isAdmin ? 'Admin / complimentary access' : 'Granted access'}
              </p>
              <p className="mt-1 text-[13px] text-amber-900/80 dark:text-amber-300/90 leading-relaxed">
                Full access without a paid subscription — nothing to cancel. Questions?{' '}
                <a
                  href="mailto:support@foundersprime.com?subject=Subscription%20Question"
                  className="underline font-semibold"
                >
                  Email support
                </a>
                .
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Cancel emphasis block */}
      {isPro && subscription && !isLifetime && !cancelPending && (
        <motion.div
          custom={4}
          variants={fadeUp}
          initial={reduce ? false : 'hidden'}
          animate="show"
          className="mt-5 rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/[0.04] to-transparent dark:from-red-950/25 dark:to-transparent p-5 md:p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
                <span className="material-symbols-outlined !text-[20px]">event_busy</span>
              </span>
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-red-500 mb-1">
                  Cancel auto-renewal
                </p>
                <p className="text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed">
                  Stops future charges on{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {renewalDate || 'your next billing date'}
                  </span>
                  . You keep full access until then. Payments already made are non-refundable.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={openCancelModal}
              className="shrink-0 inline-flex items-center justify-center gap-1.5 min-h-[44px] px-5 rounded-xl border border-red-500/40 text-red-600 dark:text-red-400 font-mono text-[11px] font-black uppercase hover:bg-red-500/10 active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined !text-[16px]">cancel</span>
              Cancel renewal
            </button>
          </div>
        </motion.div>
      )}

      <BillingCancelModal
        show={showCancelModal}
        cancelStep={cancelStep}
        stepDir={stepDir}
        cancelReason={cancelReason}
        setCancelReason={setCancelReason}
        cancelComments={cancelComments}
        setCancelComments={setCancelComments}
        isCancelling={isCancelling}
        cancelResult={cancelResult}
        renewalDate={renewalDate}
        modalRef={modalRef}
        goStep={goStep}
        handleCancel={handleCancel}
        closeModal={closeModal}
      />
    </section>
  )
}
