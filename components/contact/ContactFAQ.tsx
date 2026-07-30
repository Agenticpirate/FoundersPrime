'use client'

import Link from 'next/link'
import { useMemo, useState, type ReactNode } from 'react'

type FaqCategory = 'deals' | 'membership' | 'billing' | 'support'

type FaqItem = {
  q: string
  a: ReactNode
  category: FaqCategory
  icon: string
}

const FAQS: FaqItem[] = [
  {
    category: 'deals',
    icon: 'badge',
    q: "Who's eligible for these deals?",
    a: "Eligibility is set by each provider, not by us. Most cloud, SaaS, and credit programs target early-stage startups (roughly pre-seed to Series A) that haven't used the provider before — some also ask for a company email, a live website, or incorporation. Open any deal to see its exact requirements before you apply.",
  },
  {
    category: 'membership',
    icon: 'workspace_premium',
    q: 'Are the deals free, or do I need a membership?',
    a: (
      <>
        Browsing is free and the first page of every category is open to everyone. Unlocking the full
        catalog needs a{' '}
        <Link
          href="/pricing"
          className="font-bold text-accent-yellow underline decoration-accent-yellow/40 underline-offset-2 hover:decoration-accent-yellow"
        >
          membership
        </Link>
        . The deals themselves are always free to claim — we never take a cut.
      </>
    ),
  },
  {
    category: 'deals',
    icon: 'bolt',
    q: 'Do I need a membership for Flash Deals?',
    a: 'No. Flash deals are free to claim with a free FoundersPrime account — membership is not required. Sign up, open a live flash deal, and claim before the timer hits zero. Membership unlocks the broader year-round catalog beyond flash drops.',
  },
  {
    category: 'deals',
    icon: 'timer',
    q: 'What do “Limited” and “Coming soon” mean?',
    a: 'A Limited deal has capped seats or a provider deadline and can close without notice — apply early. A Coming soon deal is confirmed and being finalized; it will go live shortly.',
  },
  {
    category: 'deals',
    icon: 'verified',
    q: 'How do you verify the deals?',
    a: 'Every deal is reviewed by our team before listing, re-checked regularly, and removed once it expires or changes. Spot a broken link? Tell us via the form above and we will fix it fast.',
  },
  {
    category: 'deals',
    icon: 'link_off',
    q: 'A claim link is broken — what should I do?',
    a: 'Use the contact form, pick Bug report, and include the deal name, page URL, and a screenshot. We prioritize broken claim links and usually fix or replace them within one business day.',
  },
  {
    category: 'deals',
    icon: 'school',
    q: 'Do you have student-only benefits?',
    a: (
      <>
        Yes — browse{' '}
        <Link
          href="/student-benefits"
          className="font-bold text-accent-yellow underline decoration-accent-yellow/40 underline-offset-2 hover:decoration-accent-yellow"
        >
          Student Benefits
        </Link>{' '}
        for free tools, campus credits, and funding. Many require a .edu or student verification
        through the provider.
      </>
    ),
  },
  {
    category: 'membership',
    icon: 'savings',
    q: 'How fast will I see savings?',
    a: 'Many founders recoup their plan from the first cloud or SaaS claim. Others stack savings over the first few weeks as they switch tools and apply to programs. Exact results depend on which deals you qualify for.',
  },
  {
    category: 'membership',
    icon: 'compare_arrows',
    q: 'What is the difference between plans?',
    a: (
      <>
        Next&apos;Founder is for students, from $1 for the first month then $14.99/yr. Founder
        (early adopter) is the main founder plan.
        Legend is lifetime access. Compare full details on our{' '}
        <Link
          href="/pricing"
          className="font-bold text-accent-yellow underline decoration-accent-yellow/40 underline-offset-2 hover:decoration-accent-yellow"
        >
          pricing page
        </Link>
        .
      </>
    ),
  },
  {
    category: 'membership',
    icon: 'lock_open',
    q: 'What do I get after I join?',
    a: 'Full catalog access (per your plan), claim links and instructions, programs & grants directories, student benefits where eligible, flash deals, and your personal dashboard to track activity.',
  },
  {
    category: 'billing',
    icon: 'receipt_long',
    q: "What's your refund & cancellation policy?",
    a: (
      <>
        Memberships are sold under a strict no-refund policy — all sales are final. You can cancel
        anytime to stop the next renewal and keep access until the period ends. Full details on our{' '}
        <Link
          href="/refund-policy"
          className="font-bold text-accent-yellow underline decoration-accent-yellow/40 underline-offset-2 hover:decoration-accent-yellow"
        >
          Refund Policy
        </Link>
        .
      </>
    ),
  },
  {
    category: 'billing',
    icon: 'credit_card',
    q: 'How do I manage or cancel billing?',
    a: (
      <>
        Sign in, open your{' '}
        <Link
          href="/dashboard"
          className="font-bold text-accent-yellow underline decoration-accent-yellow/40 underline-offset-2 hover:decoration-accent-yellow"
        >
          dashboard
        </Link>
        , and use Billing to update payment details or cancel renewal. Access continues until the end
        of your current period after cancel.
      </>
    ),
  },
  {
    category: 'billing',
    icon: 'payments',
    q: 'What payment methods do you accept?',
    a: 'Checkout is powered by Dodo Payments and supports major cards and available regional methods shown at checkout. Your receipt is emailed after a successful payment.',
  },
  {
    category: 'support',
    icon: 'schedule',
    q: 'How fast will I hear back?',
    a: 'We reply to every message within 24–48 hours (Mon–Fri, 9AM–6PM PST). Include your account email and any screenshots so we can resolve it on the first reply.',
  },
  {
    category: 'support',
    icon: 'handshake',
    q: 'How do I pitch a partnership or submit a deal?',
    a: (
      <>
        Use the contact form and pick Partnership, or submit via{' '}
        <Link
          href="/submit-deal"
          className="font-bold text-accent-yellow underline decoration-accent-yellow/40 underline-offset-2 hover:decoration-accent-yellow"
        >
          Submit a Deal
        </Link>
        . Include the offer, eligibility, claim URL, and expiry — we review within a few business
        days.
      </>
    ),
  },
  {
    category: 'support',
    icon: 'bug_report',
    q: 'Something is broken — what should I include?',
    a: 'Send the page URL, your account email, browser/device, and a screenshot or short screen recording. That usually lets us fix it on the first reply.',
  },
  {
    category: 'support',
    icon: 'mail',
    q: 'How do I change my account email?',
    a: 'Email support@foundersprime.com from your current account address with the new email you want. We will verify ownership before updating.',
  },
]

const CATEGORIES: { id: FaqCategory; label: string; icon: string }[] = [
  { id: 'deals', label: 'Deals', icon: 'local_offer' },
  { id: 'membership', label: 'Membership', icon: 'workspace_premium' },
  { id: 'billing', label: 'Billing', icon: 'credit_card' },
  { id: 'support', label: 'Support', icon: 'support_agent' },
]

export default function ContactFAQ() {
  const [openKey, setOpenKey] = useState<string | null>(FAQS[0]?.q ?? null)
  const [category, setCategory] = useState<FaqCategory>('deals')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return FAQS.filter((faq) => {
      if (faq.category !== category) return false
      if (!q) return true
      const text =
        faq.q.toLowerCase() +
        ' ' +
        (typeof faq.a === 'string' ? faq.a.toLowerCase() : '')
      return text.includes(q)
    })
  }, [category, query])

  return (
    <section
      id="faq"
      aria-labelledby="contact-faq-heading"
      className="relative rounded-xl md:rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] p-3.5 md:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/45 to-transparent"
      />

      {/* Header */}
      <div className="relative mb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="flex items-start gap-3.5 min-w-0">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-yellow/15 border border-accent-yellow/25 text-accent-yellow">
            <span className="material-symbols-outlined !text-[22px]">question_answer</span>
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2
                id="contact-faq-heading"
                className="font-mono text-[14px] font-black uppercase tracking-[0.1em] text-gray-900 dark:text-white"
              >
                FAQ
              </h2>
              <span className="inline-flex items-center rounded-full border border-black/[0.06] dark:border-white/10 bg-gray-50 dark:bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-gray-500">
                {filtered.length} answers
              </span>
            </div>
            <p className="font-mono text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Click a question to expand
            </p>
          </div>
        </div>

        <div className="relative w-full sm:w-[260px] shrink-0">
          <span className="material-symbols-outlined !text-[16px] text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            search
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            className="w-full h-10 pl-9 pr-3 rounded-xl border border-black/[0.08] dark:border-white/10 bg-gray-50 dark:bg-white/[0.04] text-[12.5px] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-yellow/35 focus:border-accent-yellow transition-colors"
            aria-label="Search FAQ"
          />
        </div>
      </div>

      {/* Category filters — static, no layout motion */}
      <div className="relative mb-5 flex flex-wrap gap-1.5">
        {CATEGORIES.map((c) => {
          const active = category === c.id
          const count = FAQS.filter((f) => f.category === c.id).length
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setCategory(c.id)
                setOpenKey(FAQS.find((faq) => faq.category === c.id)?.q ?? null)
              }}
              aria-pressed={active}
              className={`inline-flex h-8 items-center gap-1.5 rounded-full border px-3 font-mono text-[10px] font-bold uppercase tracking-wide transition-colors ${
                active
                  ? 'bg-accent-yellow border-accent-yellow text-black'
                  : 'border-black/[0.08] dark:border-white/10 bg-gray-50/80 dark:bg-white/[0.03] text-gray-600 dark:text-gray-400 hover:border-accent-yellow/30 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined !text-[13px]">{c.icon}</span>
              {c.label}
              <span className={`tabular-nums ${active ? 'text-black/50' : 'text-gray-400'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Fixed-height accordion viewport keeps the surrounding section stable. */}
      <div className="relative h-[430px] space-y-1.5 overflow-y-auto overscroll-contain pr-1 md:h-[520px] md:space-y-2.5 md:pr-2 max-w-3xl mx-auto md:max-w-none">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-black/10 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.02] p-6 md:p-8 text-center">
            <p className="font-mono text-[12px] font-bold text-gray-900 dark:text-white mb-1">
              No matching questions
            </p>
            <p className="text-[12px] text-gray-500 mb-4">
              Try another keyword, or email the desk.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setCategory('deals')
                setOpenKey(FAQS.find((faq) => faq.category === 'deals')?.q ?? null)
              }}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-accent-yellow text-black font-mono text-[10px] font-black uppercase tracking-wide px-4 hover:bg-amber-300 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filtered.map((faq) => {
            const open = openKey === faq.q
            return (
              <div
                key={faq.q}
                onMouseLeave={() => {
                  if (openKey === faq.q) setOpenKey(null)
                }}
                className={`rounded-lg md:rounded-xl border transition-colors ${
                  open
                    ? 'border-accent-yellow/40 bg-accent-yellow/[0.04] dark:bg-accent-yellow/[0.05]'
                    : 'border-black/[0.06] dark:border-white/[0.08] bg-gray-50/60 dark:bg-white/[0.02] hover:border-accent-yellow/25'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenKey(open ? null : faq.q)}
                  aria-expanded={open}
                  className="w-full p-2.5 md:p-4 text-left flex items-center gap-2 md:gap-3"
                >
                  <span
                    className={`flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-md md:rounded-lg border ${
                      open
                        ? 'bg-accent-yellow border-accent-yellow text-black'
                        : 'bg-accent-yellow/10 border-accent-yellow/20 text-accent-yellow'
                    }`}
                  >
                    <span className="material-symbols-outlined !text-[14px] md:!text-[16px]">{faq.icon}</span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[7.5px] md:text-[8px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                      {faq.category}
                    </span>
                    <h3 className="font-mono text-[11.5px] md:text-[12.5px] font-bold text-gray-900 dark:text-white leading-snug">
                      {faq.q}
                    </h3>
                  </div>
                  <span
                    className={`flex h-6 w-6 md:h-7 md:w-7 shrink-0 items-center justify-center rounded-md md:rounded-lg border ${
                      open
                        ? 'bg-accent-yellow border-accent-yellow text-black'
                        : 'border-black/10 dark:border-white/15 text-gray-400 bg-white dark:bg-white/5'
                    }`}
                  >
                    <span className="material-symbols-outlined !text-[13px] md:!text-[15px]">
                      {open ? 'remove' : 'add'}
                    </span>
                  </span>
                </button>

                {open && (
                  <div className="px-2.5 md:px-4 pb-2.5 md:pb-4 pl-[2.75rem] md:pl-[3.75rem]">
                    <div className="border-t border-black/[0.05] dark:border-white/[0.07] pt-2 md:pt-3">
                      <p className="text-[11.5px] md:text-[12.5px] text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Still stuck */}
      <div className="relative mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-accent-yellow/20 bg-accent-yellow/[0.05] dark:bg-accent-yellow/[0.04] p-4 md:p-5">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-yellow text-black">
            <span className="material-symbols-outlined !text-[20px]">support_agent</span>
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[12px] font-black uppercase tracking-wide text-gray-900 dark:text-white">
              Still stuck?
            </p>
            <p className="text-[12px] text-gray-600 dark:text-gray-400 leading-snug">
              Email the desk — include your account email for faster routing. Typical reply: 24–48h.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <a
            href="#contact-form"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/[0.04] text-gray-900 dark:text-white font-mono text-[11px] font-bold uppercase tracking-[0.08em] px-4 hover:border-accent-yellow/40 transition-colors"
          >
            Use form
          </a>
          <a
            href="mailto:support@foundersprime.com"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent-yellow text-black font-mono text-[11px] font-black uppercase tracking-[0.08em] px-5 hover:bg-amber-300 transition-colors"
          >
            Email support
            <span className="material-symbols-outlined !text-[14px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  )
}
