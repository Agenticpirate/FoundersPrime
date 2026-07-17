'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import DodoPaymentsBadge from '@/components/ui/DodoPaymentsBadge'

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

const PLAN_LABELS: Record<string, string> = {
  nextfounder: "Next'Founder",
  founder: 'Founder',
  legend: 'Legend (Lifetime)',
}

const PLAN_PRICES: Record<string, string> = {
  nextfounder: '$1/year',
  founder: '$48/year',
  legend: '$99 one-time',
}

const PLAN_ICONS: Record<string, string> = {
  nextfounder: 'rocket_launch',
  founder: 'workspace_premium',
  legend: 'diamond',
  free: 'person',
  admin: 'admin_panel_settings',
}

const PLAN_FEATURES: Record<string, string[]> = {
  nextfounder: [
    '1,000+ student discounts',
    'AI & SaaS credits for builders',
    'Hackathons & early grants',
    'Opportunity Hub access',
  ],
  founder: [
    'Full cloud & SaaS catalog',
    'Unlimited deal claims',
    'Grants & accelerators',
    'Founder Vault resources',
  ],
  legend: [
    'Everything in Founder forever',
    'No renewals ever',
    'Future catalog updates included',
    'Launch-locked lifetime rate',
  ],
  free: [
    'Browse public previews',
    'Limited catalog access',
    'Upgrade anytime',
  ],
}

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

const stepSlide = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 18 : -18 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -18 : 18 }),
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

  const cancelSteps = [
    { id: 'why' as const, label: 'Reason' },
    { id: 'review' as const, label: 'Review' },
    { id: 'done' as const, label: 'Done' },
  ]
  const cancelStepIndex = cancelSteps.findIndex((s) => s.id === cancelStep)

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
    ? new Date(subscription.period_end).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
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
        body: JSON.stringify({ reason: cancelReason, feedback: cancelComments }),
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

  const FEEDBACK_OPTIONS = [
    'Too expensive / pricing',
    'Found a better alternative',
    'Missing features I need',
    'No longer need these credits/deals',
    'Other (please specify below)',
  ]

  const manageItems = [
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
                        initial={reduce ? false : { width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-accent-yellow to-amber-400"
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
              Subscription since{' '}
              {new Date(subscription.created_at).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
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
          {manageItems.map((item, i) => (
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

      {/* ── Cancel auto-renewal modal — 3-step flow ── */}
      <AnimatePresence>
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-[6px]"
              onClick={() => {
                if (isCancelling) return
                // Allow backdrop close on why/done; soft-block on review
                if (cancelStep !== 'review') closeModal()
              }}
              aria-hidden
            />
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cancel-modal-title"
              tabIndex={-1}
              initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0c0c0c] shadow-2xl outline-none"
            >
              {/* Drag handle (mobile) */}
              <div className="sm:hidden flex justify-center pt-2.5 pb-0" aria-hidden>
                <div className="w-10 h-1 rounded-full bg-black/15 dark:bg-white/20" />
              </div>

              {/* Progress header */}
              <div className="px-5 pt-4 sm:pt-5 pb-3 border-b border-black/5 dark:border-white/10 sticky top-0 bg-white/95 dark:bg-[#0c0c0c]/95 backdrop-blur-md z-10">
                <div className="flex items-center justify-between mb-4">
                  <h2
                    id="cancel-modal-title"
                    className="font-mono text-[12px] font-black uppercase tracking-[0.1em] text-gray-900 dark:text-white"
                  >
                    {cancelStep === 'why' && 'Cancel auto-renewal'}
                    {cancelStep === 'review' && 'Confirm your choice'}
                    {cancelStep === 'done' && "You're all set"}
                  </h2>
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={isCancelling}
                    aria-label="Close"
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-black/10 dark:border-white/15 text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 transition-colors"
                  >
                    <span className="material-symbols-outlined !text-[16px]">close</span>
                  </button>
                </div>

                {/* Step indicators */}
                <div className="flex items-center gap-0">
                  {cancelSteps.map((s, i) => {
                    const done = i < cancelStepIndex || cancelStep === 'done'
                    const active = s.id === cancelStep
                    return (
                      <div key={s.id} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1.5 min-w-[56px]">
                          <motion.div
                            animate={{
                              scale: active ? 1.05 : 1,
                              backgroundColor:
                                done || active
                                  ? 'rgb(255, 215, 0)'
                                  : 'rgba(128,128,128,0.15)',
                            }}
                            className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-[10px] font-black ${
                              done || active
                                ? 'text-black'
                                : 'text-gray-400 dark:text-zinc-500'
                            }`}
                          >
                            {done && !active ? (
                              <span className="material-symbols-outlined !text-[14px]">check</span>
                            ) : (
                              i + 1
                            )}
                          </motion.div>
                          <span
                            className={`font-mono text-[9px] font-bold uppercase tracking-wide ${
                              active || done
                                ? 'text-gray-900 dark:text-white'
                                : 'text-gray-400 dark:text-zinc-600'
                            }`}
                          >
                            {s.label}
                          </span>
                        </div>
                        {i < cancelSteps.length - 1 && (
                          <div className="flex-1 h-0.5 mx-1 mb-5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                            <motion.div
                              initial={false}
                              animate={{ width: i < cancelStepIndex || cancelStep === 'done' ? '100%' : '0%' }}
                              transition={{ duration: 0.35, ease: 'easeOut' }}
                              className="h-full bg-accent-yellow"
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="p-5 md:p-6">
                <AnimatePresence mode="wait" custom={stepDir}>
                  {cancelStep === 'why' && (
                    <motion.div
                      key="why"
                      custom={stepDir}
                      variants={reduce ? undefined : stepSlide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-3.5 mb-4 flex items-start gap-2.5">
                        <span className="material-symbols-outlined !text-[18px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                          verified_user
                        </span>
                        <p className="text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed">
                          You keep{' '}
                          <span className="font-semibold text-gray-900 dark:text-white">
                            full access until {renewalDate || 'period end'}
                          </span>
                          . We only stop future charges — nothing is cut off today.
                        </p>
                      </div>

                      <p className="text-[12px] font-medium text-gray-600 dark:text-zinc-400 mb-3">
                        What&apos;s the main reason? (helps us improve)
                      </p>
                      <div className="space-y-2 mb-4" role="radiogroup" aria-label="Cancellation reason">
                        {FEEDBACK_OPTIONS.map((opt) => {
                          const selected = cancelReason === opt
                          return (
                            <label
                              key={opt}
                              className={`flex items-center gap-3 p-3.5 min-h-[48px] rounded-xl border cursor-pointer transition-all ${
                                selected
                                  ? 'border-accent-yellow/50 bg-accent-yellow/[0.08] dark:bg-accent-yellow/[0.06] shadow-[0_0_0_1px_rgba(255,215,0,0.15)]'
                                  : 'border-black/[0.08] dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5'
                              }`}
                            >
                              <span
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                  selected
                                    ? 'border-accent-yellow bg-accent-yellow'
                                    : 'border-gray-300 dark:border-white/25'
                                }`}
                              >
                                {selected && (
                                  <motion.span
                                    layoutId="reason-dot"
                                    className="h-2 w-2 rounded-full bg-black"
                                  />
                                )}
                              </span>
                              <input
                                type="radio"
                                name="cancelReason"
                                value={opt}
                                checked={selected}
                                onChange={(e) => setCancelReason(e.target.value)}
                                className="sr-only"
                              />
                              <span className="text-[12.5px] text-gray-800 dark:text-gray-200 font-medium">
                                {opt}
                              </span>
                            </label>
                          )
                        })}
                      </div>
                      <textarea
                        value={cancelComments}
                        onChange={(e) => setCancelComments(e.target.value)}
                        placeholder="Anything else we should know? (optional)"
                        className="w-full h-20 p-3 text-[13px] rounded-xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white border border-black/10 dark:border-white/15 outline-none focus:border-accent-yellow/50 font-sans mb-5 resize-none transition-colors"
                        maxLength={500}
                      />
                      <div className="flex flex-col-reverse sm:flex-row gap-2.5">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="flex-1 min-h-[48px] rounded-xl border border-black/10 dark:border-white/15 font-mono text-[11px] font-bold uppercase text-gray-800 dark:text-white hover:bg-black/[0.03] dark:hover:bg-white/5 transition-colors"
                        >
                          Keep my plan
                        </button>
                        <button
                          type="button"
                          onClick={() => goStep('review')}
                          className="flex-1 min-h-[48px] rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-mono text-[11px] font-black uppercase inline-flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-[0.99] transition-all"
                        >
                          Continue
                          <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {cancelStep === 'review' && (
                    <motion.div
                      key="review"
                      custom={stepDir}
                      variants={reduce ? undefined : stepSlide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                      <div className="rounded-2xl border border-black/[0.08] dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] p-4 mb-4">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">
                          What happens next
                        </p>
                        <ul className="space-y-3">
                          {[
                            {
                              icon: 'event_available',
                              title: 'Access stays active',
                              body: `Until ${renewalDate || 'the end of your period'}`,
                              tone: 'good' as const,
                            },
                            {
                              icon: 'credit_card_off',
                              title: 'No more charges',
                              body: 'Auto-renewal stops after this period',
                              tone: 'good' as const,
                            },
                            {
                              icon: 'restart_alt',
                              title: 'Easy to come back',
                              body: 'Resubscribe anytime before period end',
                              tone: 'good' as const,
                            },
                            {
                              icon: 'info',
                              title: 'Past payments',
                              body: 'Already-paid amounts are non-refundable',
                              tone: 'warn' as const,
                            },
                          ].map((row, i) => (
                            <motion.li
                              key={row.title}
                              initial={reduce ? false : { opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-start gap-3"
                            >
                              <span
                                className={`material-symbols-outlined !text-[18px] mt-0.5 ${
                                  row.tone === 'warn'
                                    ? 'text-amber-600'
                                    : 'text-emerald-600 dark:text-emerald-400'
                                }`}
                              >
                                {row.icon}
                              </span>
                              <span>
                                <span className="block text-[13px] font-semibold text-gray-900 dark:text-white">
                                  {row.title}
                                </span>
                                <span className="block text-[12px] text-gray-500 dark:text-zinc-400 mt-0.5">
                                  {row.body}
                                </span>
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-xl border border-black/[0.06] dark:border-white/10 px-3.5 py-2.5 mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined !text-[16px] text-gray-400">
                          chat
                        </span>
                        <p className="text-[11px] text-gray-500 dark:text-zinc-500 font-mono truncate">
                          Reason:{' '}
                          <span className="text-gray-800 dark:text-zinc-300">{cancelReason}</span>
                        </p>
                      </div>

                      <div className="flex flex-col-reverse sm:flex-row gap-2.5">
                        <button
                          type="button"
                          onClick={() => goStep('why')}
                          disabled={isCancelling}
                          className="flex-1 min-h-[48px] rounded-xl border border-black/10 dark:border-white/15 font-mono text-[11px] font-bold uppercase disabled:opacity-50 hover:bg-black/[0.03] dark:hover:bg-white/5 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleCancel}
                          disabled={isCancelling}
                          className="flex-1 min-h-[48px] rounded-xl bg-red-500 hover:bg-red-600 text-white font-mono text-[11px] font-black uppercase inline-flex items-center justify-center gap-1.5 disabled:opacity-60 transition-colors active:scale-[0.99]"
                        >
                          {isCancelling ? (
                            <>
                              <span className="material-symbols-outlined !text-[16px] animate-spin">
                                progress_activity
                              </span>
                              Cancelling…
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined !text-[16px]">check</span>
                              Confirm cancel renewal
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {cancelStep === 'done' && (
                    <motion.div
                      key="done"
                      custom={stepDir}
                      variants={reduce ? undefined : stepSlide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="text-center py-2"
                    >
                      <motion.div
                        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30 relative"
                      >
                        <span className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping opacity-40" />
                        <span className="material-symbols-outlined !text-[32px] text-emerald-500 relative">
                          check_circle
                        </span>
                      </motion.div>
                      <h3 className="font-mono text-lg font-black text-gray-900 dark:text-white mb-2">
                        Auto-renewal cancelled
                      </h3>
                      <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed mb-2 max-w-sm mx-auto">
                        {cancelResult?.message ||
                          `You keep full access until ${renewalDate || 'period end'}. No further charges.`}
                      </p>
                      {renewalDate && (
                        <p className="inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-6">
                          <span className="material-symbols-outlined !text-[14px]">event</span>
                          Access through {renewalDate}
                        </p>
                      )}
                      {!renewalDate && <div className="mb-6" />}
                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="flex-1 min-h-[48px] rounded-xl bg-accent-yellow text-black font-mono text-[11px] font-black uppercase hover:bg-yellow-300 transition-colors"
                        >
                          Back to billing
                        </button>
                        <Link
                          href="/deals"
                          onClick={closeModal}
                          className="flex-1 min-h-[48px] rounded-xl border border-black/10 dark:border-white/15 font-mono text-[11px] font-bold uppercase inline-flex items-center justify-center text-gray-800 dark:text-white hover:bg-black/[0.03] dark:hover:bg-white/5 transition-colors"
                        >
                          Browse deals
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
