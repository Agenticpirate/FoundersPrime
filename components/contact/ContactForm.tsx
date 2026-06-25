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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
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
    { value: 'feature', label: 'Feature', icon: 'lightbulb' }
  ]

  if (submitted) {
    return (
      <div className="relative bg-white dark:bg-[#0d0d0d] border border-gray-200 dark:border-zinc-800 rounded-xl p-8 md:p-12 text-center transition-all duration-300">
        <div className="inline-flex size-16 bg-green-500/10 border border-green-500/20 text-green-400 items-center justify-center rounded-full mb-4">
          <span className="material-symbols-outlined text-4xl">check_circle</span>
        </div>
        <h3 className="font-sans text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
          Message Sent
        </h3>
        <p className="font-sans text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
          Thanks for reaching out. A real human will reply within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-sans text-xs font-bold uppercase rounded-md transition-all"
        >
          Send Another
        </button>
      </div>
    )
  }

  return (
    <div className="relative bg-white dark:bg-[#0d0d0d] border border-gray-200 dark:border-zinc-800 rounded-xl p-6 md:p-8 transition-all duration-300">
      <div className="relative mb-6 flex items-center gap-3">
        <div className="size-10 bg-yellow-400 flex items-center justify-center rounded-md">
          <span className="material-symbols-outlined !text-[20px] text-black">mail</span>
        </div>
        <div>
          <h2 className="font-mono text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Send Us a Message
          </h2>
          <p className="font-sans text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">All fields marked * are required</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[10px] font-bold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
              Full Name *
            </label>
            <div className="relative">
              <span className="material-symbols-outlined !text-[16px] text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">person</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 dark:bg-[#131316] border border-gray-200 dark:border-zinc-800 rounded-md text-gray-900 dark:text-white font-sans focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                placeholder="John Doe"
              />
            </div>
          </div>
          <div>
            <label className="block font-mono text-[10px] font-bold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
              Email *
            </label>
            <div className="relative">
              <span className="material-symbols-outlined !text-[16px] text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">mail</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 dark:bg-[#131316] border border-gray-200 dark:border-zinc-800 rounded-md text-gray-900 dark:text-white font-sans focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                placeholder="you@email.com"
              />
            </div>
          </div>
        </div>

        {/* Category pills */}
        <div>
          <label className="block font-mono text-[10px] font-bold text-gray-600 dark:text-gray-400 mb-2.5 uppercase tracking-wider">
            Category *
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const active = formData.category === category.value
              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: category.value })}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 border font-sans text-[11px] font-medium rounded-full transition-all ${
                    active
                      ? 'bg-yellow-400 border-yellow-400 text-black shadow-md'
                      : 'bg-gray-50 dark:bg-[#131316] border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <span className="material-symbols-outlined !text-[13px]">{category.icon}</span>
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label className="block font-mono text-[10px] font-bold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
            Subject *
          </label>
          <div className="relative">
            <span className="material-symbols-outlined !text-[16px] text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">subject</span>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 dark:bg-[#131316] border border-gray-200 dark:border-zinc-800 rounded-md text-gray-900 dark:text-white font-sans focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
              placeholder="What's this about?"
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-[10px] font-bold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-3 py-2.5 text-xs bg-gray-50 dark:bg-[#131316] border border-gray-200 dark:border-zinc-800 rounded-md text-gray-900 dark:text-white font-sans resize-none focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
            placeholder="Tell us what you need..."
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-sans text-xs font-bold uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2"
        >
          Send Message
          <span className="material-symbols-outlined !text-[16px] text-black">send</span>
        </button>
      </form>
    </div>
  )
}
