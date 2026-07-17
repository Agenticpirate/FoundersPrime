'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { premiumEase } from '@/components/ui/premium-motion'

const CATEGORIES = [
  { value: 'general', label: 'General', icon: 'chat_bubble' },
  { value: 'support', label: 'Support', icon: 'support_agent' },
  { value: 'billing', label: 'Billing', icon: 'credit_card' },
  { value: 'partnership', label: 'Partnership', icon: 'handshake' },
  { value: 'bug', label: 'Bug report', icon: 'bug_report' },
  { value: 'feature', label: 'Feature', icon: 'lightbulb' },
]

const inputClass =
  'w-full h-11 pl-10 pr-4 text-[13px] bg-gray-50 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-yellow/35 focus:border-accent-yellow hover:border-accent-yellow/25 transition-colors'

export default function ContactForm() {
  const reduce = useReducedMotion()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1100))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (submitted) {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: premiumEase }}
        className="relative overflow-hidden rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] p-8 md:p-12 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/50 to-transparent"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-accent-yellow/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-yellow/15 border border-accent-yellow/30 text-accent-yellow mb-5">
          <span className="material-symbols-outlined !text-[32px]">check_circle</span>
        </div>
        <h3 className="relative font-mono text-xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
          Message received
        </h3>
        <p className="relative text-[13px] text-gray-500 dark:text-gray-400 mb-7 max-w-sm mx-auto leading-relaxed">
          Thanks for writing in. The FoundersPrime team will reply within 24–48 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false)
            setFormData({
              name: '',
              email: '',
              subject: '',
              category: 'general',
              message: '',
            })
          }}
          className="relative inline-flex h-11 items-center justify-center gap-2 px-6 rounded-xl bg-accent-yellow text-black font-mono text-[11px] font-black uppercase tracking-[0.08em] hover:bg-amber-300 transition-colors leading-none"
        >
          <span className="leading-none">Send another</span>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="block shrink-0" aria-hidden>
            <path
              d="M2.5 7h9M7.5 3.5 11 7l-3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </motion.div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] p-5 md:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/40 to-transparent"
      />

      <div className="relative mb-6 flex items-center gap-3.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-yellow/15 border border-accent-yellow/25 text-accent-yellow">
          <span className="material-symbols-outlined !text-[22px]">contact_support</span>
        </div>
        <div>
          <h2 className="font-mono text-[14px] font-black uppercase tracking-[0.1em] text-gray-900 dark:text-white">
            Send a message
          </h2>
          <p className="font-mono text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-0.5">
            We reply within 24–48 hours
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-[0.12em]">
              Full name
            </label>
            <div className="relative group">
              <span className="material-symbols-outlined !text-[16px] text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-accent-yellow transition-colors">
                person
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className={inputClass}
                placeholder="Jane Founder"
              />
            </div>
          </div>
          <div>
            <label className="block font-mono text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-[0.12em]">
              Email
            </label>
            <div className="relative group">
              <span className="material-symbols-outlined !text-[16px] text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-accent-yellow transition-colors">
                alternate_email
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className={inputClass}
                placeholder="you@company.com"
              />
            </div>
          </div>
        </div>

        {/* Category chips */}
        <div>
          <label className="block font-mono text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-2.5 uppercase tracking-[0.12em]">
            Topic
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CATEGORIES.map((category) => {
              const active = formData.category === category.value
              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: category.value })}
                  aria-pressed={active}
                  className={`inline-flex h-10 items-center justify-center gap-1.5 px-2.5 border rounded-xl font-mono text-[11px] font-bold transition-all leading-none ${
                    active
                      ? 'bg-accent-yellow border-accent-yellow text-black shadow-sm'
                      : 'bg-gray-50 dark:bg-white/[0.03] border-black/[0.08] dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-accent-yellow/30 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined !text-[15px] !leading-none">
                    {category.icon}
                  </span>
                  <span className="leading-none">{category.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label className="block font-mono text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-[0.12em]">
            Subject
          </label>
          <div className="relative group">
            <span className="material-symbols-outlined !text-[16px] text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-accent-yellow transition-colors">
              topic
            </span>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Brief summary of your inquiry"
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-[0.12em]">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 text-[13px] bg-gray-50 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-yellow/35 focus:border-accent-yellow hover:border-accent-yellow/25 transition-colors resize-none leading-relaxed"
            placeholder="Share context, account email, and any screenshots details so we can resolve it on the first reply…"
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={reduce || isSubmitting ? undefined : { y: -1 }}
          whileTap={reduce || isSubmitting ? undefined : { scale: 0.99 }}
          className="group w-full inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent-yellow text-black font-mono text-[12px] font-black uppercase tracking-[0.08em] border border-black/10 shadow-[0_4px_16px_rgba(245,158,11,0.25)] hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors leading-none"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined !text-[18px] animate-spin">progress_activity</span>
              <span className="leading-none">Sending…</span>
            </>
          ) : (
            <>
              <span className="leading-none">Send message</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="block shrink-0 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              >
                <path
                  d="M2.5 7h9M7.5 3.5 11 7l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </motion.button>

        <p className="text-center font-mono text-[10px] text-gray-400 dark:text-gray-500">
          Prefer email?{' '}
          <a
            href="mailto:support@foundersprime.com"
            className="text-accent-yellow font-semibold hover:underline"
          >
            support@foundersprime.com
          </a>
        </p>
      </form>
    </div>
  )
}
