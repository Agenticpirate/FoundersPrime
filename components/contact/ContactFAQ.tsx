'use client'

import { useState } from 'react'
import Mandala from '@/components/ui/Mandala'

export default function ContactFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const faqs = [
    {
      q: 'How fast do you respond?',
      a: 'General inquiries: 24hrs. Technical support: 4hrs. Urgent issues: 1hr. Live chat: Instant (Mon-Fri, 9AM-6PM PST).'
    },
    {
      q: 'What should I include in my request?',
      a: 'Account email, detailed description, steps to reproduce, browser/device info, error messages, and screenshots if possible.'
    },
    {
      q: 'Do you offer phone support?',
      a: 'Email and live chat are primary. Phone support available for enterprise customers and emergencies.'
    },
    {
      q: 'Can I schedule a demo?',
      a: 'Yes! Use the "Book Call" option above to schedule a personalized demo or consultation.'
    },
    {
      q: 'How do I report a bug?',
      a: 'Use the contact form with "Bug Report" category. Include reproduction steps, device info, and screenshots.'
    },
    {
      q: 'Support outside business hours?',
      a: 'Submit via contact form or email anytime. We monitor urgent issues 24/7.'
    }
  ]

  return (
    <div className="relative bg-white border-2 border-black shadow-[6px_6px_0px_#111] p-5 md:p-7 overflow-hidden fp-fade-up">
      <Mandala
        variant="rings"
        colorClass="text-gray-900"
        opacity={0.04}
        speed={100}
        className="absolute -top-16 -right-16 w-64 h-64 hidden md:block"
      />

      <div className="relative mb-5 flex items-center gap-2.5">
        <div className="size-9 bg-accent-yellow border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#111]">
          <span className="material-symbols-outlined !text-[18px] text-black">quiz</span>
        </div>
        <div>
          <h2 className="font-mono text-base md:text-lg font-black text-black uppercase leading-none">
            Frequently Asked
          </h2>
          <p className="font-sans text-[11px] text-gray-500 mt-0.5">Answers to the most common questions</p>
        </div>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {faqs.map((faq, index) => {
          const open = openFAQ === index
          return (
            <div
              key={index}
              className={`border-2 border-black overflow-hidden transition-shadow ${open ? 'shadow-[3px_3px_0px_#111]' : ''}`}
            >
              <button
                onClick={() => setOpenFAQ(open ? null : index)}
                aria-expanded={open}
                className={`w-full p-3 text-left flex items-center justify-between gap-2 transition-colors ${
                  open ? 'bg-primary/10' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <h3 className="font-mono text-xs font-bold text-black pr-1">
                  {faq.q}
                </h3>
                <span className={`material-symbols-outlined !text-[18px] flex-shrink-0 border-2 border-black flex items-center justify-center transition-all ${
                  open ? 'bg-black text-accent-yellow rotate-180' : 'bg-white text-black'
                }`}>
                  {open ? 'remove' : 'add'}
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-out ${
                  open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
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
      <div className="relative mt-5 border-2 border-black bg-gradient-to-br from-gray-900 via-gray-900 to-black p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 overflow-hidden shadow-[4px_4px_0px_#ffd700]">
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
