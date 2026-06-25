'use client'

import { useState } from 'react'

export default function ContactFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      q: "Who's eligible for these deals?",
      a: "Eligibility is set by each provider, not by us. Most cloud, SaaS, and credit programs target early-stage startups (roughly pre-seed to Series A) that haven't used the provider before — some also ask for a company email, a live website, or incorporation. Open any deal to see its exact requirements before you apply.",
    },
    {
      q: 'Are the deals free, or do I need a membership?',
      a: (
        <>
          Browsing is free and the first page of every category is open to everyone. Unlocking the full catalog — every cloud credit, SaaS discount and grant — needs a{' '}
          <a href="/pricing" className="font-bold underline decoration-2 underline-offset-2 text-yellow-400 hover:text-yellow-300">membership</a>. The deals themselves are always free to claim; we never take a cut.
        </>
      ),
    },
    {
      q: 'What do "Limited" and "Coming soon" tags mean?',
      a: 'A Limited deal has capped seats or a provider deadline and can close without notice, so apply early. A Coming soon deal is confirmed and being finalized — it will go live shortly.',
    },
    {
      q: "What's your refund & cancellation policy?",
      a: (
        <>
          Memberships are sold under a strict no-refund policy — all sales are final. You can cancel anytime to stop the next renewal and keep access until the period ends (no pro-rated refunds). Exceptions: a proven double-charge, or if we discontinue the service. Full details on our{' '}
          <a href="/refund-policy" className="font-bold underline decoration-2 underline-offset-2 text-yellow-400 hover:text-yellow-300">Refund Policy</a>.
        </>
      ),
    },
    {
      q: 'How do you verify the deals?',
      a: 'Every deal is reviewed by our team before listing, re-checked regularly, and removed once it expires or changes. Spot a broken link or an offer that no longer matches? Tell us via the form above and we will fix it fast.',
    },
    {
      q: 'How fast will I hear back?',
      a: 'We reply to every message — usually within 24 hours, and often much sooner during business hours (Mon–Fri, 9AM–6PM PST). Include your account email and any screenshots so we can resolve it on the first reply.',
    },
  ]

  return (
    <div className="relative bg-white dark:bg-[#0d0d0d] border border-gray-200 dark:border-zinc-800 rounded-xl p-6 md:p-8 overflow-hidden transition-all duration-300">
      <div className="relative mb-6 flex items-center gap-3">
        <div className="size-10 bg-yellow-400 flex items-center justify-center rounded-md">
          <span className="material-symbols-outlined !text-[20px] text-black">quiz</span>
        </div>
        <div>
          <h2 className="font-mono text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Answers to the most common questions</p>
        </div>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        {faqs.map((faq, index) => {
          const open = openFAQ === index
          return (
            <div
              key={index}
              className={`border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-[#131316] rounded-lg overflow-hidden transition-all duration-300 ${open ? 'border-zinc-700 ring-1 ring-zinc-700 dark:border-zinc-700 dark:ring-zinc-700' : ''}`}
            >
              <button
                onClick={() => setOpenFAQ(open ? null : index)}
                aria-expanded={open}
                className="w-full p-4 text-left flex items-center justify-between gap-3 transition-colors bg-gray-50 dark:bg-[#131316] hover:bg-gray-100 dark:hover:bg-zinc-800/30"
              >
                <h3 className="font-sans text-xs font-bold text-gray-900 dark:text-white pr-1">
                  {faq.q}
                </h3>
                <span
                  className={`material-symbols-outlined !text-[16px] size-5 flex-shrink-0 border border-gray-200 dark:border-zinc-800 flex items-center justify-center rounded-full bg-white dark:bg-black text-gray-500 dark:text-gray-400 transition-all duration-350 ${
                    open ? 'rotate-45 text-yellow-400 border-yellow-400/30' : ''
                  }`}
                >
                  add
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="p-4 bg-white dark:bg-[#0e0e10] border-t border-gray-200 dark:border-zinc-800 font-sans text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Still have questions */}
      <div className="relative mt-8 border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-[#131316] p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden">
        <div className="relative text-center sm:text-left flex flex-col sm:flex-row items-center gap-4">
          <div className="size-10 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 flex items-center justify-center rounded-full">
            <span className="material-symbols-outlined !text-[20px]">help_outline</span>
          </div>
          <div>
            <p className="font-mono text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Still have questions?</p>
            <p className="font-sans text-xs text-gray-600 dark:text-gray-400 mt-1">Drop us a line — we read every message.</p>
          </div>
        </div>
        <a
          href="mailto:support@foundersprime.com"
          className="relative shrink-0 inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-sans font-bold text-xs uppercase px-5 py-2.5 rounded-md transition-all shadow-md"
        >
          <span className="material-symbols-outlined !text-[16px]">mail</span>
          Email Support
        </a>
      </div>
    </div>
  )
}
