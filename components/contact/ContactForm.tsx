'use client'

import { useState } from 'react'
import Mandala from '@/components/ui/Mandala'

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
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black border-2 border-black shadow-[6px_6px_0px_#ffd700] p-8 md:p-12 overflow-hidden fp-fade-up">
        <Mandala
          variant="rings"
          colorClass="text-accent-yellow"
          opacity={0.12}
          speed={70}
          className="absolute -top-12 -right-12 w-56 h-56"
        />
        <div className="relative text-center">
          <div className="inline-flex size-16 bg-green-400 border-[3px] border-black items-center justify-center shadow-[4px_4px_0px_rgba(255,221,0,0.4)] mb-4">
            <span className="material-symbols-outlined text-4xl text-black">check_circle</span>
          </div>
          <h3 className="font-mono text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-tight">
            Message Sent
          </h3>
          <p className="font-mono text-xs md:text-sm text-gray-400 mb-6 max-w-sm mx-auto">
            Thanks for reaching out. A real human will reply within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-5 py-2.5 bg-accent-yellow text-black border-2 border-black font-mono text-xs font-bold uppercase shadow-[3px_3px_0px_rgba(255,221,0,0.4)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            Send Another →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-white border-2 border-black shadow-[6px_6px_0px_#111] p-5 md:p-7 overflow-hidden fp-fade-up">
      <Mandala
        variant="radial"
        colorClass="text-gray-900"
        opacity={0.04}
        speed={120}
        className="absolute -bottom-16 -right-16 w-56 h-56 hidden md:block"
      />

      <div className="relative mb-5 flex items-center gap-2.5">
        <div className="size-9 bg-accent-yellow border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#111]">
          <span className="material-symbols-outlined !text-[18px] text-black">edit_note</span>
        </div>
        <div>
          <h2 className="font-mono text-base md:text-lg font-black text-black uppercase leading-none">
            Send a Message
          </h2>
          <p className="font-sans text-[11px] text-gray-500 mt-0.5">Fields marked * are required</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[10px] font-bold text-black mb-1.5 uppercase tracking-wide">
              Name *
            </label>
            <div className="relative">
              <span className="material-symbols-outlined !text-[16px] text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">person</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-8 pr-3 py-2.5 text-xs border-2 border-black font-mono focus:outline-none focus:shadow-[4px_4px_0px_#111] focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all bg-white placeholder:text-gray-400"
                placeholder="John Doe"
              />
            </div>
          </div>
          <div>
            <label className="block font-mono text-[10px] font-bold text-black mb-1.5 uppercase tracking-wide">
              Email *
            </label>
            <div className="relative">
              <span className="material-symbols-outlined !text-[16px] text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">mail</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-8 pr-3 py-2.5 text-xs border-2 border-black font-mono focus:outline-none focus:shadow-[4px_4px_0px_#111] focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all bg-white placeholder:text-gray-400"
                placeholder="you@email.com"
              />
            </div>
          </div>
        </div>

        {/* Category pills */}
        <div>
          <label className="block font-mono text-[10px] font-bold text-black mb-1.5 uppercase tracking-wide">
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
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-black font-mono text-[10px] font-bold uppercase tracking-wide transition-all ${
                    active
                      ? 'bg-primary text-black shadow-[3px_3px_0px_#111] -translate-x-0.5 -translate-y-0.5'
                      : 'bg-white text-gray-600 hover:bg-gray-50 shadow-[2px_2px_0px_#111]'
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
          <label className="block font-mono text-[10px] font-bold text-black mb-1.5 uppercase tracking-wide">
            Subject *
          </label>
          <div className="relative">
            <span className="material-symbols-outlined !text-[16px] text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">subject</span>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full pl-8 pr-3 py-2.5 text-xs border-2 border-black font-mono focus:outline-none focus:shadow-[4px_4px_0px_#111] focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all bg-white placeholder:text-gray-400"
              placeholder="What's this about?"
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-[10px] font-bold text-black mb-1.5 uppercase tracking-wide">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-3 py-2.5 text-xs border-2 border-black font-mono resize-none focus:outline-none focus:shadow-[4px_4px_0px_#111] focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all bg-white placeholder:text-gray-400"
            placeholder="Tell us what you need..."
          />
        </div>

        <button
          type="submit"
          className="group w-full px-6 py-3.5 bg-primary hover:bg-accent-yellow border-2 border-black text-black font-mono text-sm font-black uppercase tracking-wide shadow-[4px_4px_0px_#111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2"
        >
          Send Message
          <span className="material-symbols-outlined !text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </form>
    </div>
  )
}
