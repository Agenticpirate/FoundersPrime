'use client'

import { useState } from 'react'
import Mandala from '@/components/ui/Mandala'

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
          <a href="/pricing" className="font-bold underline decoration-2 underline-offset-2 hover:text-black">membership</a>. The deals themselves are always free to claim; we never take a cut.
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
          <a href="/refund-policy" className="font-bold underline decoration-2 underline-offset-2 hover:text-black">Refund Policy</a>.
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
    <div className="relative bg-white border-2 border-black shadow-[5px_5px_0px_#111] p-4 md:p-5 overflow-hidden fp-fade-up">
      <Mandala
        variant="rings"
        colorClass="text-gray-900"
        opacity={0.04}
        speed={100}
        className="absolute -top-16 -right-16 w-64 h-64 hidden md:block"
      />

      <div className="relative mb-4 flex items-center gap-2.5">
        <div className="size-9 bg-accent-yellow border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#111]">
          <span className="material-symbols-outlined !text-[18px] text-black">quiz</span>
        </div>
        <div>
          <h2 className="font-mono text-base md:text-lg font-black text-black uppercase leading-none">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-[11px] text-gray-500 mt-0.5">Answers to the most common questions</p>
        </div>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-2.5 items-start">
        {faqs.map((faq, index) => {
          const open = openFAQ === index
          return (
            <div
              key={index}
              className={`group border-2 border-black overflow-hidden transition-all duration-200 ${open ? 'shadow-[3px_3px_0px_#111]' : ''}`}
            >
              <button
                onClick={() => setOpenFAQ(open ? null : index)}
                aria-expanded={open}
                className={`w-full p-3 text-left flex items-center justify-between gap-2 transition-colors bg-gray-50 group-hover:bg-accent-yellow/10 ${open ? '!bg-accent-yellow/10' : ''}`}
              >
                <h3 className="font-mono text-xs font-bold text-black pr-1">
                  {faq.q}
                </h3>
                <span
                  className={`material-symbols-outlined !text-[18px] size-6 flex-shrink-0 border-2 border-black flex items-center justify-center bg-white text-black transition-all duration-300 ease-out group-hover:bg-accent-yellow group-hover:rotate-45 ${
                    open ? '!bg-accent-yellow rotate-45' : ''
                  }`}
                >
                  add
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-out grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 ${
                  open ? '!grid-rows-[1fr] !opacity-100' : ''
                }`}
              >
                <div className="overflow-hidden">
                  <p className="p-3 bg-white border-t-2 border-black font-mono text-[11px] text-gray-700 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Still have questions */}
      <div className="relative mt-4 border-2 border-black bg-gradient-to-br from-gray-900 via-gray-900 to-black p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 overflow-hidden shadow-[4px_4px_0px_#ffd700]">
        <Mandala
          variant="petal"
          colorClass="text-accent-yellow"
          opacity={0.1}
          speed={90}
          className="absolute -bottom-10 -right-8 w-32 h-32"
        />
        <div className="relative text-center sm:text-left">
          <p className="font-mono text-white font-black text-sm md:text-base uppercase">Still have questions?</p>
          <p className="font-mono text-gray-400 text-[11px] md:text-xs mt-0.5">Drop us a line — we read every message.</p>
        </div>
        <a
          href="mailto:support@foundersprime.com"
          className="relative shrink-0 inline-flex items-center gap-2 bg-accent-yellow text-black font-mono font-black text-xs uppercase px-5 py-2.5 border-2 border-black shadow-[3px_3px_0px_rgba(255,221,0,0.4)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          <span className="material-symbols-outlined !text-[16px]">mail</span>
          Email Support
        </a>
      </div>
    </div>
  )
}
