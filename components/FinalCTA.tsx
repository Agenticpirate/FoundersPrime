'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FinalCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    // TODO: wire to email provider
    setSubmitted(true)
  }

  return (
    <section className="relative bg-black text-white py-7 md:py-16 border-t-4 border-accent-yellow overflow-hidden grid-bg-dark">
      {/* Animated gradient blobs */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-accent-yellow/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 md:gap-8 lg:gap-12 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-3">
            <span className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border border-black mb-2.5 md:mb-3 shadow-[2px_2px_0px_#fff]">
              <span className="material-symbols-outlined text-[12px]">campaign</span>
              The Founder Brief · Free
            </span>
            <h2 className="text-xl md:text-4xl lg:text-5xl font-black font-mono uppercase tracking-tight leading-[1.1] md:leading-[1.05] mb-2 md:mb-3">
              Don't miss the next{' '}
              <span className="bg-gradient-to-r from-accent-yellow via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                $50K deal again.
              </span>
            </h2>
            <p className="text-[12.5px] md:text-base text-gray-400 font-sans mb-3 md:mb-4 max-w-md leading-snug">
              Every Monday: the freshest credits, accelerator deadlines, and grants &mdash; curated for founders who actually ship. No filler.
            </p>

            {/* Trust — mobile: single minimal line */}
            <div className="flex md:hidden items-center gap-2 text-[9px] text-gray-500 font-mono uppercase tracking-[0.15em]">
              <span className="material-symbols-outlined !text-[12px] text-green-400">verified</span>
              <span>1 email / week</span>
              <span className="text-gray-700">·</span>
              <span>Unsubscribe anytime</span>
            </div>

            {/* Trust — desktop: pills */}
            <div className="hidden md:flex flex-wrap gap-3 text-xs text-gray-500 font-mono uppercase tracking-widest">
              {['1 email/wk', 'Unsubscribe anytime', 'Curated by founders'].map((t) => (
                <span key={t} className="flex items-center gap-1">
                  <span className="material-symbols-outlined !text-sm text-green-400">check_circle</span>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-2 w-full">
            {submitted ? (
              <div className="bg-white/5 border-2 border-green-400 backdrop-blur-sm p-4 md:p-6 flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-400 border-2 border-black flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined !text-xl md:!text-2xl text-black">mark_email_read</span>
                </div>
                <div className="min-w-0">
                  <p className="font-mono font-black text-sm md:text-base uppercase tracking-tight">You're in.</p>
                  <p className="font-sans text-xs md:text-sm text-gray-400">Check your inbox &mdash; first drop coming this week.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@yourstartup.com"
                  className="w-full bg-white/5 border-2 border-white/15 px-3 md:px-4 py-2.5 md:py-3.5 font-mono text-[12.5px] md:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-yellow transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-accent-yellow text-black font-mono font-black text-[12px] md:text-base uppercase tracking-wider px-4 md:px-6 py-2.5 md:py-3.5 border-2 border-accent-yellow hover:bg-white hover:border-white hover:-translate-y-0.5 transition-all shadow-[3px_3px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined !text-[14px] md:!text-base">bolt</span>
                  Send me the Brief
                  <span className="material-symbols-outlined !text-[14px] md:!text-base">arrow_forward</span>
                </button>
                <Link
                  href="/pricing"
                  className="w-full text-center font-mono text-[10px] md:text-xs uppercase tracking-widest text-gray-400 hover:text-accent-yellow transition-colors py-0.5 md:py-1"
                >
                  Or skip the wait &mdash; see plans &rarr;
                </Link>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
