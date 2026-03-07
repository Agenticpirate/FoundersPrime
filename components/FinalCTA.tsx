'use client'

import { useState } from 'react'

export default function FinalCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <section className="py-8 md:py-10 bg-black text-white border-t-2 border-black border-b-4 border-b-accent-yellow relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">

          {/* Left */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl md:text-3xl font-black font-mono tracking-tighter text-white uppercase leading-tight mb-1">
              Stay Ahead. <span className="text-accent-yellow">Get Alerts.</span>
            </h2>
            <p className="text-sm text-gray-400 font-mono leading-relaxed">
              New deals, grants, accelerators & credits — straight to your inbox.
            </p>
          </div>

          {/* Right */}
          <div className="w-full lg:w-auto flex-shrink-0">
            {submitted ? (
              <div className="flex items-center gap-3 border-2 border-accent-yellow px-6 py-3">
                <span className="material-symbols-outlined text-accent-yellow text-xl">mark_email_read</span>
                <p className="font-mono text-sm font-bold text-white uppercase tracking-wide">You&apos;re on the list!</p>
              </div>
            ) : (
              <div>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 neo-shadow">
                  <input
                    className="w-full sm:w-64 bg-white text-black text-sm p-3 focus:ring-0 focus:outline-none font-mono rounded-none placeholder-gray-500"
                    placeholder="YOUR EMAIL ADDRESS"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-accent-yellow text-black text-sm font-black px-5 py-3 hover:bg-white transition-all whitespace-nowrap font-mono uppercase flex items-center justify-center gap-1.5 border-2 border-accent-yellow"
                  >
                    Subscribe
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </form>
                <div className="flex items-center gap-4 mt-2.5 text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                  {['No spam', 'Unsubscribe anytime'].map((t) => (
                    <span key={t} className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-green-500">check</span>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}