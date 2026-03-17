'use client'

import { useState } from 'react'

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'How does the free trial work?',
      answer: 'Start with a 14-day free trial of Pro or Pro+ with full access to all features. No credit card required. You can cancel anytime during the trial period without being charged.'
    },
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you\'ll be charged the prorated difference immediately. When downgrading, the change takes effect at your next billing cycle.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. All payments are processed securely through Stripe.'
    },
    {
      question: 'Is there a discount for annual billing?',
      answer: 'Yes! Annual billing saves you 20% compared to monthly billing. For example, Pro annual is $278/year (vs $348 monthly) and Pro+ annual is $758/year (vs $948 monthly).'
    },
    {
      question: 'What happens if I cancel my subscription?',
      answer: 'You can cancel anytime with no penalties. You\'ll retain access to paid features until the end of your current billing period, then automatically switch to the Free plan.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied within 30 days of your first payment, contact us for a full refund.'
    },
    {
      question: 'Can I add more team members to Pro+?',
      answer: 'Pro+ includes up to 5 team members. Additional team members can be added for $15/month each. Contact us for custom pricing for larger teams (10+ members).'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'Free users get email support with 48-hour response time. Pro users get priority email support with 24-hour response. Pro+ users get phone, chat, and email support with same-day response.'
    },
    {
      question: 'Are there any setup fees or hidden costs?',
      answer: 'No setup fees, no hidden costs. The price you see is what you pay. All features listed in your plan are included at no extra charge.'
    },
    {
      question: 'Do you offer student or nonprofit discounts?',
      answer: 'Yes! We offer 50% discounts for students and qualifying nonprofits. Contact us with proof of eligibility to apply for the discount.'
    }
  ]

  return (
    <div className="mb-10 md:mb-14">
      <div className="text-center mb-10">
        <h2 className="font-mono text-3xl font-black text-black mb-3 uppercase tracking-tight">
          Common Questions
        </h2>
        <p className="font-sans text-base font-medium text-gray-500 max-w-xl mx-auto">
          Everything you need to know about the product and billing.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className={`bg-white border-2 border-[#111111] overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-[4px_4px_0_0_#111111] -translate-y-1' : 'shadow-none'}`}>
              <button
                className="w-full text-left p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="font-mono text-sm md:text-base font-bold text-[#111111] pr-4 uppercase tracking-wide">
                  {faq.question}
                </h3>
                <span className={`material-symbols-outlined text-xl transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-[#13b6ec]' : 'text-gray-400'
                  }`}>
                  keyboard_arrow_down
                </span>
              </button>

              <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 pt-0 border-t-2 border-transparent">
                    <p className="font-sans text-sm font-medium text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="mt-12 text-center">
        <div className="bg-[#fffbeb] border-2 border-[#111111] p-6 max-w-xl mx-auto shadow-[4px_4px_0_0_#111111]">
          <h3 className="font-mono text-base font-bold text-[#111111] mb-2 uppercase">
            Still have questions?
          </h3>
          <p className="font-sans text-sm font-medium text-gray-600 mb-4">
            Our support team is ready to help you optimize your stack.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-5 py-2.5 bg-[#111111] text-white hover:bg-gray-800 font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">mail</span>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}