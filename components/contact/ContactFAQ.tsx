'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { premiumEase } from '@/components/ui/premium-motion'

const FAQS = [
  {
    q: "Who's eligible for these deals?",
    a: "Eligibility is set by each provider, not by us. Most cloud, SaaS, and credit programs target early-stage startups (roughly pre-seed to Series A) that haven't used the provider before — some also ask for a company email, a live website, or incorporation. Open any deal to see its exact requirements before you apply.",
  },
  {
    q: 'Are the deals free, or do I need a membership?',
    a: (
      <>
        Browsing is free and the first page of every category is open to everyone. Unlocking the full
        catalog needs a{' '}
        <a
          href="/pricing"
          className="font-bold text-accent-yellow underline decoration-accent-yellow/40 underline-offset-2 hover:decoration-accent-yellow"
        >
          membership
        </a>
        . The deals themselves are always free to claim — we never take a cut.
      </>
    ),
  },
  {
    q: 'What do “Limited” and “Coming soon” mean?',
    a: 'A Limited deal has capped seats or a provider deadline and can close without notice — apply early. A Coming soon deal is confirmed and being finalized; it will go live shortly.',
  },
  {
    q: "What's your refund & cancellation policy?",
    a: (
      <>
        Memberships are sold under a strict no-refund policy — all sales are final. You can cancel
        anytime to stop the next renewal and keep access until the period ends. Full details on our{' '}
        <a
          href="/refund-policy"
          className="font-bold text-accent-yellow underline decoration-accent-yellow/40 underline-offset-2 hover:decoration-accent-yellow"
        >
          Refund Policy
        </a>
        .
      </>
    ),
  },
  {
    q: 'How do you verify the deals?',
    a: 'Every deal is reviewed by our team before listing, re-checked regularly, and removed once it expires or changes. Spot a broken link? Tell us via the form above and we will fix it fast.',
  },
  {
    q: 'How fast will I hear back?',
    a: 'We reply to every message within 24–48 hours (Mon–Fri, 9AM–6PM PST). Include your account email and any screenshots so we can resolve it on the first reply.',
  },
]

export default function ContactFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)
  const [hoverFAQ, setHoverFAQ] = useState<number | null>(null)
  const reduce = useReducedMotion()

  // Hover expands on desktop; click still works (and on mobile)
  const isOpen = (index: number) => openFAQ === index || hoverFAQ === index

  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] p-5 md:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/40 to-transparent"
      />

      <div className="relative mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-yellow/15 border border-accent-yellow/25 text-accent-yellow">
            <span className="material-symbols-outlined !text-[22px]">question_answer</span>
          </div>
          <div>
            <h2 className="font-mono text-[14px] font-black uppercase tracking-[0.1em] text-gray-900 dark:text-white">
              FAQ
            </h2>
            <p className="font-mono text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-0.5">
              Hover or click a question to expand
            </p>
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        {FAQS.map((faq, index) => {
          const open = isOpen(index)
          return (
            <motion.div
              key={index}
              layout
              onMouseEnter={() => {
                if (!reduce) setHoverFAQ(index)
              }}
              onMouseLeave={() => setHoverFAQ(null)}
              className={`rounded-xl border overflow-hidden transition-colors duration-200 ${
                open
                  ? 'border-accent-yellow/40 bg-accent-yellow/[0.05] dark:bg-accent-yellow/[0.06] shadow-[0_0_0_1px_rgba(255,221,0,0.08)]'
                  : 'border-black/[0.06] dark:border-white/[0.08] bg-gray-50/80 dark:bg-white/[0.02] hover:border-accent-yellow/25'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                aria-expanded={open}
                className="w-full p-4 text-left flex items-start justify-between gap-3"
              >
                <h3 className="font-mono text-[12.5px] font-bold text-gray-900 dark:text-white pr-1 leading-snug">
                  {faq.q}
                </h3>
                <motion.span
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: premiumEase }}
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border ${
                    open
                      ? 'bg-accent-yellow border-accent-yellow text-black'
                      : 'border-black/10 dark:border-white/15 text-gray-400 bg-white dark:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined !text-[14px]">add</span>
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="panel"
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: premiumEase }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={reduce ? false : { y: -6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={reduce ? undefined : { y: -4, opacity: 0 }}
                      transition={{ duration: 0.28, ease: premiumEase, delay: 0.04 }}
                      className="px-4 pb-4 border-t border-black/[0.05] dark:border-white/[0.06]"
                    >
                      <p className="pt-3 text-[12.5px] text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Still stuck */}
      <div className="relative mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.03] p-4 md:p-5 overflow-hidden">
        <div
          aria-hidden
          className="absolute -right-16 -bottom-16 w-40 h-40 bg-accent-yellow/10 rounded-full blur-3xl pointer-events-none"
        />
        <div className="relative flex items-start sm:items-center gap-3 min-w-0">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-yellow/15 text-accent-yellow border border-accent-yellow/25">
            <span className="material-symbols-outlined !text-[20px]">help_center</span>
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[12px] font-black uppercase tracking-wide text-gray-900 dark:text-white">
              Still stuck?
            </p>
            <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-snug">
              Email the desk directly — include your account email for faster routing.
            </p>
          </div>
        </div>
        <a
          href="mailto:support@foundersprime.com"
          className="relative shrink-0 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent-yellow text-black font-mono text-[11px] font-black uppercase tracking-[0.08em] px-5 hover:bg-amber-300 transition-colors leading-none"
        >
          <span className="leading-none">Email support</span>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="block shrink-0" aria-hidden>
            <path
              d="M2.5 7h9M7.5 3.5 11 7l-3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}
