'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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

interface BillingClientProps {
  userName: string
  userEmail: string
  memberSince: string
  isPro: boolean
  isAdmin: boolean
  subscription: Subscription
}

const PLAN_LABELS: Record<string, string> = {
  nextfounder: "Next'Founder",
  founder: 'Founder',
  legend: 'Legend (Lifetime)',
}

const PLAN_PRICES: Record<string, string> = {
  nextfounder: '$59/year',
  founder: '$149/year',
  legend: '$299 one-time',
}

export default function BillingClient({
  userName,
  userEmail,
  memberSince,
  isPro,
  isAdmin,
  subscription,
}: BillingClientProps) {
  const router = useRouter()
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
  const [cancelResult, setCancelResult] = useState<{ ok: boolean; message: string } | null>(null)

  const planLabel = isAdmin
    ? 'Admin'
    : subscription
      ? PLAN_LABELS[subscription.plan] || 'Founder'
      : isPro
        ? 'Founder'
        : 'Free'

  const planPrice = subscription ? PLAN_PRICES[subscription.plan] : null
  const isLifetime = subscription?.plan === 'legend'
  const cancelPending = subscription?.cancel_at_period_end === true
  const renewalDate = subscription?.period_end
    ? new Date(subscription.period_end).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null

  const handleCancel = async () => {
    setIsCancelling(true)
    setCancelResult(null)
    try {
      const res = await fetch('/api/billing/cancel', { method: 'POST' })
      const data = await res.json()
      if (res.ok && data.success) {
        setCancelResult({ ok: true, message: data.message })
        // Refresh server data so the UI shows the pending state
        setTimeout(() => router.refresh(), 1200)
      } else {
        setCancelResult({ ok: false, message: data.error || 'Could not cancel. Please email support.' })
      }
    } catch (err) {
      setCancelResult({ ok: false, message: 'Network error. Please try again.' })
    } finally {
      setIsCancelling(false)
    }
  }

  const closeModal = () => {
    if (isCancelling) return
    setShowCancelModal(false)
    // Keep cancelResult visible for 5s on the page, then auto-clear on next interaction
    if (cancelResult?.ok) {
      setCancelResult(null)
    }
  }

  return (
    <div className="max-w-[900px] mx-auto px-4 md:px-8 py-6 md:py-10">
      {/* Breadcrumb */}
      <Link
        href="/dashboard"
        className="text-[11px] font-mono text-gray-500 hover:text-black uppercase mb-3 inline-flex items-center gap-1 tracking-wide"
      >
        <span className="material-symbols-outlined !text-[14px]">arrow_back</span>
        Dashboard
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="font-mono text-2xl md:text-3xl font-black uppercase tracking-tight text-black leading-tight">
          Billing &amp; Subscription
        </h1>
        <p className="text-[12.5px] text-gray-600 mt-1.5">Manage your plan, payment method, and account.</p>
      </div>

      {/* Result banner */}
      {cancelResult && (
        <div
          role="status"
          className={`mb-5 px-4 py-3 border-2 border-black rounded-sm shadow-[3px_3px_0px_#111] flex items-start gap-2.5 ${
            cancelResult.ok ? 'bg-emerald-50' : 'bg-red-50'
          }`}
        >
          <span className={`material-symbols-outlined !text-[18px] flex-shrink-0 mt-0.5 ${cancelResult.ok ? 'text-emerald-600' : 'text-red-600'}`}>
            {cancelResult.ok ? 'check_circle' : 'error'}
          </span>
          <p className="text-[12.5px] text-gray-800 leading-relaxed">{cancelResult.message}</p>
        </div>
      )}

      {/* Current Plan */}
      <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] rounded-sm p-5 md:p-6 mb-4">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-gray-500 mb-1">
              Current Plan
            </p>
            <h2 className="font-mono text-lg md:text-xl font-black uppercase text-black leading-tight">
              {planLabel}
            </h2>
            {planPrice && (
              <p className="text-[12px] text-gray-600 mt-1 font-mono">{planPrice}</p>
            )}
          </div>
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border-2 border-black shadow-[1px_1px_0px_#111] font-mono text-[10px] font-black uppercase tracking-wide ${
              cancelPending
                ? 'bg-amber-100 text-amber-900'
                : isPro
                  ? 'bg-accent-yellow text-black'
                  : 'bg-gray-100 text-gray-700'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                cancelPending ? 'bg-amber-500' : isPro ? 'bg-black' : 'bg-emerald-500 animate-pulse'
              }`}
            />
            {cancelPending ? 'Cancels at period end' : isPro ? 'Active' : 'Free'}
          </div>
        </div>

        {/* Pending cancellation banner */}
        {cancelPending && renewalDate && (
          <div className="bg-amber-50 border-2 border-black border-dashed rounded-sm p-3 flex items-start gap-2.5 mb-4">
            <span className="material-symbols-outlined !text-[18px] text-amber-700 flex-shrink-0 mt-0.5">
              schedule
            </span>
            <div className="text-[12.5px] leading-relaxed">
              <p className="font-bold text-amber-900">Auto-renewal off</p>
              <p className="text-amber-800">
                You&apos;ll keep full access until <span className="font-bold">{renewalDate}</span>. After that, your account moves to the Free plan.
              </p>
            </div>
          </div>
        )}

        {!isPro && (
          <div>
            <p className="text-[13px] text-gray-700 mb-3 leading-relaxed">
              You&apos;re on the free preview. Upgrade to unlock the full founder dashboard.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-accent-yellow text-black font-mono font-black text-[12px] uppercase tracking-[0.1em] px-5 py-2.5 border-2 border-black rounded-sm shadow-[3px_3px_0px_#111] hover:bg-amber-300 hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all"
            >
              <span className="material-symbols-outlined !text-[16px]">bolt</span>
              Scale as a Founder
            </Link>
          </div>
        )}

        {isPro && subscription?.period_end && !cancelPending && (
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-3 text-[12px] text-gray-700">
            <p>
              <span className="font-bold text-black">Next renewal:</span>{' '}
              <span className="font-mono">{renewalDate}</span>
              {isLifetime ? '' : ' · auto-renews unless cancelled'}
            </p>
          </div>
        )}

        {isPro && isLifetime && (
          <div className="bg-amber-50 border border-amber-200 rounded-sm p-3 text-[12px] text-amber-900">
            <p>
              <span className="font-bold">Lifetime access</span> — one-time payment. Nothing to renew or cancel.
            </p>
          </div>
        )}
      </div>

      {/* Account Details */}
      <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] rounded-sm p-5 md:p-6 mb-4">
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-gray-500 mb-4">
          Account Details
        </p>
        <dl className="space-y-2.5">
          <div className="flex items-center justify-between py-1.5 border-b border-dashed border-gray-200">
            <dt className="text-[12.5px] text-gray-600">Name</dt>
            <dd className="text-[12.5px] font-bold text-black">{userName}</dd>
          </div>
          <div className="flex items-center justify-between py-1.5 border-b border-dashed border-gray-200">
            <dt className="text-[12.5px] text-gray-600">Email</dt>
            <dd className="text-[12.5px] font-bold font-mono text-black">{userEmail}</dd>
          </div>
          <div className="flex items-center justify-between py-1.5 border-b border-dashed border-gray-200">
            <dt className="text-[12.5px] text-gray-600">Member Since</dt>
            <dd className="text-[12.5px] font-bold text-black">{memberSince}</dd>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <dt className="text-[12.5px] text-gray-600">Status</dt>
            <dd className="text-[12.5px] font-bold text-emerald-700 inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
            </dd>
          </div>
        </dl>
      </div>

      {/* Manage actions */}
      <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] rounded-sm p-5 md:p-6 mb-4">
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-gray-500 mb-4">
          Manage
        </p>
        <div className="space-y-2">
          {[
            { href: '/pricing', icon: 'swap_horiz', label: 'Change Plan', sub: 'Upgrade or compare plans' },
            { href: '/auth/reset-password', icon: 'lock_reset', label: 'Change Password', sub: 'Update your credentials' },
            { href: 'mailto:support@foundersprime.com?subject=Billing%20Support', icon: 'support_agent', label: 'Billing Support', sub: 'Email our team' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex items-center justify-between gap-3 px-3.5 py-3 border-2 border-black border-dashed rounded-sm hover:bg-accent-yellow/10 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 bg-gray-100 border-2 border-black rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined !text-[16px] text-black">{item.icon}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[12px] font-black uppercase tracking-tight text-black leading-tight">{item.label}</p>
                  <p className="text-[10.5px] text-gray-500 mt-0.5">{item.sub}</p>
                </div>
              </div>
              <span className="material-symbols-outlined !text-[16px] text-gray-400 group-hover:translate-x-0.5 group-hover:text-black transition-all flex-shrink-0">
                chevron_right
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Cancel auto-renewal — only for active subscription users (not lifetime, not free) */}
      {isPro && subscription && !isLifetime && !cancelPending && (
        <div className="bg-white border-2 border-red-300 shadow-[3px_3px_0px_rgba(239,68,68,0.35)] rounded-sm p-5 md:p-6">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-red-500 mb-3 inline-flex items-center gap-1.5">
            <span className="material-symbols-outlined !text-[12px]">warning</span>
            Cancel Auto-Renewal
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[13px] font-black uppercase text-black leading-tight mb-1">
                Stop future charges
              </p>
              <p className="text-[12px] text-gray-700 leading-relaxed">
                Your subscription will auto-renew on{' '}
                <span className="font-bold">{renewalDate || 'the next billing date'}</span>. Cancel
                now to stop the renewal — you&apos;ll keep full access until then.
              </p>
              <p className="text-[11px] text-gray-500 mt-1.5 italic">
                Note: payments already made are non-refundable per our terms.
              </p>
            </div>
            <button
              onClick={() => setShowCancelModal(true)}
              className="inline-flex items-center justify-center gap-1.5 bg-white text-red-600 font-mono font-black text-[11px] uppercase tracking-wider px-4 py-2.5 border-2 border-red-500 rounded-sm shadow-[2px_2px_0px_rgba(239,68,68,0.4)] hover:bg-red-50 hover:shadow-[3px_3px_0px_rgba(239,68,68,0.4)] hover:-translate-x-px hover:-translate-y-px transition-all flex-shrink-0"
            >
              <span className="material-symbols-outlined !text-[14px]">cancel</span>
              Cancel Auto-Renewal
            </button>
          </div>
        </div>
      )}

      {/* Already-cancelled state — give them a way back */}
      {isPro && subscription && cancelPending && (
        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] rounded-sm p-5 md:p-6">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-gray-500 mb-3 inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-amber-500" />
            Renewal Cancelled
          </p>
          <p className="text-[12.5px] text-gray-700 leading-relaxed mb-3">
            Want to keep your Founder access? Re-subscribe before {renewalDate} and your access continues uninterrupted.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-accent-yellow text-black font-mono font-black text-[11px] uppercase tracking-[0.1em] px-4 py-2 border-2 border-black rounded-sm shadow-[2px_2px_0px_#111] hover:bg-amber-300 hover:shadow-[3px_3px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all"
          >
            <span className="material-symbols-outlined !text-[14px]">refresh</span>
            Resume Subscription
          </Link>
        </div>
      )}

      {/* ─── Cancel confirmation modal ─── */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={closeModal} aria-hidden="true" />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-modal-title"
            className="relative w-full max-w-md bg-white border-2 border-black shadow-[6px_6px_0px_#111] rounded-sm overflow-hidden cancel-modal-pop"
          >
            {/* Header */}
            <div className="bg-red-50 px-5 py-3.5 border-b-2 border-black flex justify-between items-center">
              <h2
                id="cancel-modal-title"
                className="font-mono text-[13px] font-black uppercase tracking-[0.1em] text-black inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined !text-[16px] text-red-600">warning</span>
                Cancel Auto-Renewal?
              </h2>
              <button
                onClick={closeModal}
                aria-label="Close"
                className="w-7 h-7 flex items-center justify-center bg-white border-2 border-black hover:bg-black hover:text-white transition-colors rounded-sm shadow-[1px_1px_0px_#111]"
              >
                <span className="material-symbols-outlined !text-[14px]">close</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-5 md:p-6">
              <p className="text-[13px] text-gray-700 leading-relaxed mb-4">
                You&apos;ll keep full access to the Founder dashboard until{' '}
                <span className="font-bold text-black">{renewalDate || 'your current period ends'}</span>. After that,
                your account moves to the Free plan.
              </p>

              <ul className="bg-gray-50 border-2 border-black border-dashed rounded-sm p-3.5 space-y-2 mb-5">
                <li className="flex items-start gap-2 text-[12px] text-gray-800">
                  <span
                    className="material-symbols-outlined !text-[14px] text-emerald-600 flex-shrink-0 mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span>You keep access until {renewalDate || 'period end'}</span>
                </li>
                <li className="flex items-start gap-2 text-[12px] text-gray-800">
                  <span
                    className="material-symbols-outlined !text-[14px] text-emerald-600 flex-shrink-0 mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span>No further charges to your card</span>
                </li>
                <li className="flex items-start gap-2 text-[12px] text-gray-800">
                  <span
                    className="material-symbols-outlined !text-[14px] text-emerald-600 flex-shrink-0 mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span>You can resume anytime before period end</span>
                </li>
                <li className="flex items-start gap-2 text-[12px] text-amber-900">
                  <span className="material-symbols-outlined !text-[14px] text-amber-600 flex-shrink-0 mt-0.5">info</span>
                  <span>Payments already made are non-refundable</span>
                </li>
              </ul>

              <div className="flex flex-col-reverse sm:flex-row gap-2.5">
                <button
                  onClick={closeModal}
                  disabled={isCancelling}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white text-black font-mono font-black text-[11px] uppercase tracking-wider px-4 py-2.5 border-2 border-black rounded-sm shadow-[2px_2px_0px_#111] hover:bg-gray-50 hover:shadow-[3px_3px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all disabled:opacity-60"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isCancelling}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-red-500 text-white font-mono font-black text-[11px] uppercase tracking-wider px-4 py-2.5 border-2 border-black rounded-sm shadow-[2px_2px_0px_#111] hover:bg-red-600 hover:shadow-[3px_3px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all disabled:opacity-60"
                >
                  {isCancelling ? (
                    <>
                      <span className="material-symbols-outlined !text-[14px] animate-spin">refresh</span>
                      Cancelling…
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined !text-[14px]">cancel</span>
                      Yes, Cancel
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes cancelModalPop {
              from { opacity: 0; transform: translateY(8px) scale(0.96); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
            :global(.cancel-modal-pop) {
              animation: cancelModalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            }
            @media (prefers-reduced-motion: reduce) {
              :global(.cancel-modal-pop) { animation: none; }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}
