'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call with delay for professional UX feedback
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const categories = [
    { value: 'general', label: 'General', icon: 'chat_bubble' },
    { value: 'support', label: 'Support', icon: 'support_agent' },
    { value: 'billing', label: 'Billing', icon: 'credit_card' },
    { value: 'partnership', label: 'Partnership', icon: 'handshake' },
    { value: 'bug', label: 'Bug Report', icon: 'bug_report' },
    { value: 'feature', label: 'Feature Request', icon: 'lightbulb' }
  ]

  if (submitted) {
    return (
      <div className="relative bg-white dark:bg-[#08080a] border border-gray-200 dark:border-zinc-800/80 rounded-2xl p-8 md:p-12 text-center transition-all duration-300 shadow-xl overflow-hidden fp-fade-up">
        {/* Glow behind success */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex size-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 items-center justify-center rounded-full mb-6 animate-bounce">
          <span className="material-symbols-outlined text-4xl">check_circle</span>
        </div>
        <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
          Transmission Received
        </h3>
        <p className="font-sans text-xs md:text-sm text-gray-500 dark:text-zinc-400 mb-8 max-w-sm mx-auto leading-relaxed">
          Thanks for reaching out. A partner from our operations team will follow up within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg hover:shadow-yellow-400/20"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <div className="relative bg-white dark:bg-[#08080a] border border-gray-200 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 transition-all duration-300 shadow-xl fp-fade-up">
      {/* Decorative top bar */}
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />

      <div className="relative mb-8 flex items-center gap-4">
        <div className="size-12 bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center rounded-xl text-yellow-400">
          <span className="material-symbols-outlined !text-[24px]">contact_support</span>
        </div>
        <div>
          <h2 className="font-heading text-lg font-black text-gray-900 dark:text-white uppercase tracking-wider">
            Send Message
          </h2>
          <p className="font-mono text-[10px] text-gray-400 dark:text-zinc-500 uppercase tracking-widest mt-0.5">
            Encrypted secure transmission
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-mono text-[10px] font-bold text-gray-500 dark:text-zinc-400 mb-2 uppercase tracking-widest">
              Full Name
            </label>
            <div className="relative group">
              <span className="material-symbols-outlined !text-[16px] text-gray-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-yellow-400 transition-colors">
                person
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 text-xs bg-gray-50 dark:bg-zinc-900/30 hover:bg-gray-100 dark:hover:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 dark:focus:border-yellow-400/70 dark:focus:ring-yellow-400/40 text-gray-950 dark:text-white font-sans rounded-xl transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-650"
                placeholder="John Doe"
              />
            </div>
          </div>
          <div>
            <label className="block font-mono text-[10px] font-bold text-gray-500 dark:text-zinc-400 mb-2 uppercase tracking-widest">
              Email Address
            </label>
            <div className="relative group">
              <span className="material-symbols-outlined !text-[16px] text-gray-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-yellow-400 transition-colors">
                alternate_email
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 text-xs bg-gray-50 dark:bg-zinc-900/30 hover:bg-gray-100 dark:hover:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 dark:focus:border-yellow-400/70 dark:focus:ring-yellow-400/40 text-gray-950 dark:text-white font-sans rounded-xl transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-650"
                placeholder="you@email.com"
              />
            </div>
          </div>
        </div>

        {/* Category Selector */}
        <div>
          <label className="block font-mono text-[10px] font-bold text-gray-500 dark:text-zinc-400 mb-3 uppercase tracking-widest">
            Inquiry Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {categories.map((category) => {
              const active = formData.category === category.value
              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: category.value })}
                  aria-pressed={active}
                  className={`inline-flex items-center justify-center gap-2 px-3 py-2.5 border font-sans text-xs rounded-xl transition-all ${
                    active
                      ? 'bg-yellow-400 border-yellow-450 text-black font-bold shadow-md scale-[1.02]'
                      : 'bg-gray-50 dark:bg-zinc-900/20 border-gray-200 dark:border-zinc-800 text-gray-650 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <span className="material-symbols-outlined !text-[15px]">{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label className="block font-mono text-[10px] font-bold text-gray-500 dark:text-zinc-400 mb-2 uppercase tracking-widest">
            Subject
          </label>
          <div className="relative group">
            <span className="material-symbols-outlined !text-[16px] text-gray-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-yellow-400 transition-colors">
              topic
            </span>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 text-xs bg-gray-50 dark:bg-zinc-900/30 hover:bg-gray-100 dark:hover:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 dark:focus:border-yellow-400/70 dark:focus:ring-yellow-400/40 text-gray-950 dark:text-white font-sans rounded-xl transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-650"
              placeholder="Briefly describe your inquiry"
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-[10px] font-bold text-gray-500 dark:text-zinc-400 mb-2 uppercase tracking-widest">
            Detailed Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 text-xs bg-gray-50 dark:bg-zinc-900/30 hover:bg-gray-100 dark:hover:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 dark:focus:border-yellow-400/70 dark:focus:ring-yellow-400/40 text-gray-950 dark:text-white font-sans resize-none rounded-xl transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-650"
            placeholder="Please enter all relevant details so we can address your inquiry immediately..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3.5 bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-400/70 text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-yellow-400/10 btn-shiny"
        >
          <span>{isSubmitting ? 'Transmitting...' : 'Send Secure Message'}</span>
          {!isSubmitting && (
            <span className="material-symbols-outlined !text-[16px] text-black">send</span>
          )}
        </button>
      </form>
    </div>
  )
}
