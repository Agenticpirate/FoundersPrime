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

interface BillingPanelProps {
  isPro: boolean
  isAdmin: boolean
  subscription: Subscription
  userName: string
  userEmail: string
  memberSinceFull: string
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
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.16em] text-gray-700 inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow" />
          Billing &amp; Subscription
        </h2>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        {/* Current Plan card */}
        <div className="lg:col-span-2 bg-white border-2 border-black shadow-[3px_3px_0px_#111] rounded-sm p-5 md:p-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-gray-500 mb-1">
                Current Plan
              </p>
              <h3 className="font-mono text-lg md:text-xl font-black uppercase text-black leading-tight">
                {planLabel}
              </h3>
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

          {cancelPending && renewalDate && (
            <div className="bg-amber-50 border-2 border-black border-dashed rounded-sm p-3 flex items-start gap-2.5 mb-4">
              <span className="material-symbols-outlined !text-[18px] text-amber-700 flex-shrink-0 mt-0.5">schedule</span>
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

        {/* Account snapshot card */}
        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] rounded-sm p-5 md:p-6">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-gray-500 mb-3">
            Account
          </p>
          <dl className="space-y-2">
            <div>
              <dt className="text-[10px] text-gray-500 font-mono uppercase tracking-wide">Name</dt>
              <dd className="text-[12.5px] font-bold text-black truncate">{userName}</dd>
            </div>
            <div>
              <dt className="text-[10px] text-gray-500 font-mono uppercase tracking-wide">Email</dt>
              <dd className="text-[12.5px] font-bold font-mono text-black truncate">{userEmail}</dd>
            </div>
            <div>
              <dt className="text-[10px] text-gray-500 font-mono uppercase tracking-wide">Member Since</dt>
              <dd className="text-[12.5px] font-bold text-black">{memberSinceFull}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Manage row */}
      <div className="mt-4 md:mt-5 bg-white border-2 border-black shadow-[3px_3px_0px_#111] rounded-sm p-5 md:p-6">
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-gray-500 mb-4">Manage</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {[
            { href: '/pricing', icon: 'swap_horiz', label: 'Change Plan', sub: 'Upgrade or compare plans' },
            { href: '/auth/reset-password', icon: 'lock_reset', label: 'Change Password', sub: 'Update credentials' },
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
                  <p className="font-mono text-[11.5px] font-black uppercase tracking-tight text-black leading-tight">{item.label}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5 truncate">{item.sub}</p>
                </div>
              </div>
              <span className="material-symbols-outlined !text-[16px] text-gray-400 group-hover:translate-x-0.5 group-hover:text-black transition-all flex-shrink-0">
                chevron_right
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Cancel auto-renewal */}
      {isPro && subscription && !isLifetime && !cancelPending && (
        <div className="mt-4 md:mt-5 bg-white border-2 border-red-300 shadow-[3px_3px_0px_rgba(239,68,68,0.35)] rounded-sm p-5 md:p-6">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-red-500 mb-3 inline-flex items-center gap-1.5">
            <span className="material-symbols-outlined !text-[12px]">warning</span>
            Cancel Auto-Renewal
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[13px] font-black uppercase text-black leading-tight mb-1">Stop future charges</p>
              <p className="text-[12px] text-gray-700 leading-relaxed">
                Your subscription will auto-renew on{' '}
                <span className="font-bold">{renewalDate || 'the next billing date'}</span>. Cancel now to stop the renewal — you&apos;ll keep full access until then.
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

      {/* Comped/Admin/Allowlist Pro access — explain why cancel isn't shown */}
      {isPro && !subscription && (
        <div className="mt-4 md:mt-5 bg-white border-2 border-black shadow-[3px_3px_0px_#111] rounded-sm p-5 md:p-6">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-gray-500 mb-3 inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-accent-yellow" />
            Subscription Status
          </p>
          <div className="flex items-start gap-3 bg-amber-50 border-2 border-black border-dashed rounded-sm p-3.5">
            <span className="material-symbols-outlined !text-[18px] text-amber-700 flex-shrink-0 mt-0.5">info</span>
            <div className="text-[12.5px] leading-relaxed">
              <p className="font-bold text-amber-900 mb-1">
                {isAdmin ? 'Admin / complimentary access' : 'Granted access'}
              </p>
              <p className="text-amber-800">
                Your account has full access without an active paid subscription, so there&apos;s nothing to cancel here.
                If you believe this is wrong or want to upgrade to a paid plan,{' '}
                <a href="mailto:support@foundersprime.com?subject=Subscription%20Question" className="underline font-semibold">
                  email support
                </a>.
              </p>
            </div>
          </div>
        </div>
      )}

      {isPro && subscription && cancelPending && (
        <div className="mt-4 md:mt-5 bg-white border-2 border-black shadow-[3px_3px_0px_#111] rounded-sm p-5 md:p-6">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-gray-500 mb-3 inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-amber-500" />
            Renewal Cancelled
          </p>
          <p className="text-[12.5px] text-gray-700 leading-relaxed mb-3">
            Want to keep your access? Re-subscribe before {renewalDate} and your access continues uninterrupted.
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

      {/* Cancel modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={closeModal} aria-hidden="true" />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-modal-title"
            className="relative w-full max-w-md bg-white border-2 border-black shadow-[6px_6px_0px_#111] rounded-sm overflow-hidden cancel-modal-pop"
          >
            <div className="bg-red-50 px-5 py-3.5 border-b-2 border-black flex justify-between items-center">
              <h2 id="cancel-modal-title" className="font-mono text-[13px] font-black uppercase tracking-[0.1em] text-black inline-flex items-center gap-2">
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

            <div className="p-5 md:p-6">
              <p className="text-[13px] text-gray-700 leading-relaxed mb-4">
                You&apos;ll keep full access until{' '}
                <span className="font-bold text-black">{renewalDate || 'your current period ends'}</span>. After that, your account moves to the Free plan.
              </p>

              <ul className="bg-gray-50 border-2 border-black border-dashed rounded-sm p-3.5 space-y-2 mb-5">
                <li className="flex items-start gap-2 text-[12px] text-gray-800">
                  <span className="material-symbols-outlined !text-[14px] text-emerald-600 flex-shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>You keep access until {renewalDate || 'period end'}</span>
                </li>
                <li className="flex items-start gap-2 text-[12px] text-gray-800">
                  <span className="material-symbols-outlined !text-[14px] text-emerald-600 flex-shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>No further charges to your card</span>
                </li>
                <li className="flex items-start gap-2 text-[12px] text-gray-800">
                  <span className="material-symbols-outlined !text-[14px] text-emerald-600 flex-shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
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
    </section>
  )
}
