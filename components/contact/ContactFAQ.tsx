'use client'

import { useState } from 'react'

export default function ContactFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

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
    <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] p-5">
      <h2 className="font-mono text-base font-bold text-black mb-4 uppercase">
        FAQ
      </h2>
      
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="border-2 border-black overflow-hidden">
            <button
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
            >
              <h3 className="font-mono text-xs font-bold text-black pr-2">
                {faq.q}
              </h3>
              <span className="material-symbols-outlined text-black text-base flex-shrink-0">
                {openFAQ === index ? 'remove' : 'add'}
              </span>
            </button>
            
            {openFAQ === index && (
              <div className="p-3 bg-white border-t-2 border-black">
                <p className="font-mono text-[10px] text-gray-700 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}