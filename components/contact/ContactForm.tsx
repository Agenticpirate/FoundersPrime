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
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'support', label: 'Support' },
    { value: 'billing', label: 'Billing' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' }
  ]

  if (submitted) {
    return (
      <div className="bg-green-400 border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] p-6">
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-black mb-2 block">check_circle</span>
          <h3 className="font-mono text-lg font-bold text-black mb-2">
            MESSAGE SENT!
          </h3>
          <p className="font-mono text-xs text-black mb-4">
            We'll respond within 24 hours.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-4 py-2 bg-black text-white border-2 border-black font-mono text-xs font-bold hover:bg-white hover:text-black transition-all"
          >
            SEND ANOTHER
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] p-5">
      <h2 className="font-mono text-base font-bold text-black mb-4 uppercase">
        Send Message
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block font-mono text-[10px] font-bold text-black mb-1 uppercase">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-xs border-2 border-black font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#1a1a1a] transition-shadow bg-white"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] font-bold text-black mb-1 uppercase">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-xs border-2 border-black font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#1a1a1a] transition-shadow bg-white"
              placeholder="you@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block font-mono text-[10px] font-bold text-black mb-1 uppercase">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-xs border-2 border-black font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#1a1a1a] transition-shadow bg-white"
              placeholder="What's this about?"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] font-bold text-black mb-1 uppercase">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-xs border-2 border-black font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#1a1a1a] transition-shadow bg-white"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-mono text-[10px] font-bold text-black mb-1 uppercase">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-3 py-2 text-xs border-2 border-black font-mono resize-none focus:outline-none focus:shadow-[4px_4px_0px_0px_#1a1a1a] transition-shadow bg-white"
            placeholder="Tell us what you need..."
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-primary hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none border-3 border-black text-black font-mono text-sm font-bold shadow-[4px_4px_0px_0px_#1a1a1a] transition-all uppercase"
        >
          Send Message →
        </button>
      </form>
    </div>
  )
}