'use client'

import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { Reveal } from '@/components/ui/premium-motion'
import { premiumEase } from '@/lib/premium-motion-variants'

type Faq = { question: string; answer: string }

/** Identical FAQ accordion from SingleDealContent */
export default function SingleDealFaq({
  faqs,
  openFaqIndex,
  setOpenFaqIndex,
}: {
  faqs: Faq[]
  openFaqIndex: number | null
  setOpenFaqIndex: (i: number | null) => void
}) {
  const reduceMotion = useReducedMotion()
  if (!faqs || faqs.length === 0) return null

  return (
    <Reveal>
      <section className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] p-5 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <h2 className="mb-3 flex items-center gap-2.5 font-mono text-[13px] md:text-sm font-black uppercase tracking-[0.08em] text-black dark:text-white pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-accent-yellow/90 shadow-sm">
            <span className="material-symbols-outlined text-black !text-[16px]">help</span>
          </span>
          FAQ
        </h2>
        <div className="space-y-2">
          {faqs.map((faqItem, index) => {
            const open = openFaqIndex === index
            return (
              <div
                key={faqItem.question}
                className="rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-white/[0.02] overflow-hidden transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              >
                <button type="button"
                  onClick={() => setOpenFaqIndex(open ? null : index)}
                  className={`flex items-center justify-between gap-3 px-3.5 py-3 w-full text-left transition-colors ${
                    open ? 'bg-accent-yellow/10 dark:bg-white/5' : 'hover:bg-gray-50 dark:hover:bg-white/[0.03]'
                  }`}
                >
                  <span className="text-[12.5px] font-bold font-mono text-black dark:text-white pr-2">{faqItem.question}</span>
                  <m.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: premiumEase }}
                    className="material-symbols-outlined !text-[18px] text-gray-500 dark:text-gray-400 flex-shrink-0"
                  >
                    expand_more
                  </m.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <m.div
                      key="content"
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: premiumEase }}
                      className="overflow-hidden"
                    >
                      <div className="px-3.5 pb-3.5 pt-1 text-[12.5px] text-gray-600 dark:text-gray-300 leading-relaxed border-t border-black/[0.04] dark:border-white/[0.06]">
                        {faqItem.answer}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>
    </Reveal>
  )
}
