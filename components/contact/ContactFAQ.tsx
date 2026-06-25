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
    <div className="relative bg-white dark:bg-[#08080a] border border-gray-200 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-300 shadow-xl fp-fade-up">
      <div className="relative mb-8 flex items-center gap-4">
        <div className="size-12 bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center rounded-xl text-yellow-400">
          <span className="material-symbols-outlined !text-[24px]">question_answer</span>
        </div>
        <div>
          <h2 className="font-heading text-lg font-black text-gray-900 dark:text-white uppercase tracking-wider">
            Frequently Asked Questions
          </h2>
          <p className="font-mono text-[10px] text-gray-400 dark:text-zinc-500 uppercase tracking-widest mt-0.5">
            Quick responses to popular inquiries
          </p>
        </div>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {faqs.map((faq, index) => {
          const open = openFAQ === index
          return (
            <div
              key={index}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                open
                  ? 'border-yellow-400/40 bg-yellow-400/[0.02] dark:border-yellow-400/20 dark:bg-yellow-400/[0.01] ring-1 ring-yellow-400/20'
                  : 'border-gray-200 dark:border-zinc-800/75 bg-gray-50/50 dark:bg-zinc-900/10 hover:border-gray-300 dark:hover:border-zinc-700/50'
              }`}
            >
              <button
                onClick={() => setOpenFAQ(open ? null : index)}
                aria-expanded={open}
                className="w-full p-4.5 text-left flex items-center justify-between gap-4 transition-colors"
              >
                <h3 className="font-sans text-xs font-bold text-gray-900 dark:text-white pr-2 leading-relaxed">
                  {faq.q}
                </h3>
                <span
                  className={`material-symbols-outlined !text-[16px] size-6 flex-shrink-0 border flex items-center justify-center rounded-full bg-white dark:bg-black transition-all duration-300 ${
                    open
                      ? 'rotate-45 text-yellow-400 border-yellow-400/30 shadow-[0_0_10px_rgba(255,215,0,0.2)]'
                      : 'border-gray-200 dark:border-zinc-800 text-gray-400 dark:text-zinc-500'
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
                  <p className="p-4.5 bg-white/70 dark:bg-black/30 border-t border-gray-150 dark:border-zinc-800/60 font-sans text-[11.5px] text-gray-600 dark:text-zinc-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Still have questions */}
      <div className="relative mt-8 border border-gray-200 dark:border-zinc-800/80 bg-gray-50/80 dark:bg-zinc-900/20 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
        <div className="absolute -right-24 -bottom-24 w-48 h-48 bg-yellow-400/10 dark:bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative text-center sm:text-left flex flex-col sm:flex-row items-center gap-4">
          <div className="size-11 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 flex items-center justify-center rounded-full">
            <span className="material-symbols-outlined !text-[20px]">help_center</span>
          </div>
          <div>
            <p className="font-heading text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Still seeking answers?
            </p>
            <p className="font-sans text-xs text-gray-500 dark:text-zinc-400 mt-1">
              Contact our direct support desk — we will resolve your inquiry fast.
            </p>
          </div>
        </div>
        <a
          href="mailto:support@foundersprime.com"
          className="relative shrink-0 inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-mono font-bold text-xs uppercase px-5 py-3 rounded-xl transition-all shadow-lg hover:shadow-yellow-400/10 btn-shiny"
        >
          <span className="material-symbols-outlined !text-[16px]">mail</span>
          Email Support
        </a>
      </div>
    </div>
  )
}
