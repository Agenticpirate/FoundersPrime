'use client'

import { useState } from 'react'

export default function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('sending')

    // TODO: wire to your email provider (Mailchimp, Resend, etc.)
    // For now, just simulate success
    try {
      await new Promise((r) => setTimeout(r, 600))
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:min-w-[420px]"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={status === 'success' ? '✓ You are in. Check your inbox.' : 'founder@yourstartup.com'}
        disabled={status === 'sending' || status === 'success'}
        className={`flex-1 bg-white/5 border-2 px-4 py-3 font-mono text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
          status === 'success'
            ? 'border-green-400 placeholder-green-400'
            : status === 'error'
            ? 'border-red-400'
            : 'border-white/15 focus:border-accent-yellow'
        }`}
      />
      <button
        type="submit"
        disabled={status === 'sending' || status === 'success'}
        className="bg-accent-yellow text-black font-mono font-black text-xs md:text-sm uppercase tracking-wider px-5 py-3 border-2 border-accent-yellow hover:bg-white hover:border-white hover:-translate-y-0.5 transition-all shadow-[3px_3px_0px_rgba(255,255,255,0.2)] flex items-center justify-center gap-1.5 disabled:opacity-60 disabled:translate-y-0"
      >
        {status === 'sending' ? 'Subscribing…' : status === 'success' ? 'Subscribed' : 'Subscribe'}
        <span className="material-symbols-outlined text-base">
          {status === 'success' ? 'check' : 'arrow_forward'}
        </span>
      </button>
    </form>
  )
}
