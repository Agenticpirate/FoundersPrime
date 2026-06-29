import React from 'react'
import Mandala from '@/components/ui/Mandala'

export default function ContactHero() {
  return (
    <div className="relative mb-12 fp-fade-up">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-gray-400 dark:text-zinc-500">
          <li>
            <a href="/" className="hover:text-yellow-400 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-zinc-700">/</li>
          <li className="text-gray-900 dark:text-white font-bold">Contact Us</li>
        </ol>
      </nav>

      <div className="relative max-w-4xl">
        {/* Glow backdrop effect */}
        <div className="absolute -top-12 -left-20 w-72 h-72 bg-yellow-400/10 dark:bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-400/10 border border-yellow-400/20 rounded-full mb-6 transition-transform hover:scale-[1.02]">
          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.15em] text-yellow-400">
            Support center active
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-none">
          Let&apos;s build something <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 animate-pulse-slow">
            extraordinary
          </span>{' '}
          together.
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-sm md:text-base text-gray-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Need assistance with deals, partnership inquiries, or custom startup credit offerings? 
          Get in touch with our team — we monitor submissions around the clock.
        </p>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 hidden lg:block w-[240px] h-[120px] pointer-events-none opacity-80 translate-x-12 -translate-y-8">
          <svg viewBox="0 0 320 110" className="w-full h-full" fill="none">
            <path
              d="M6 90 C 70 48, 120 104, 184 62 S 248 30, 256 44"
              stroke="#ffd700"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="2 8"
              className="animate-pulse"
            />
            <path d="M128 26 l2.5 5 l5 2.5 l-5 2.5 l-2.5 5 l-2.5 -5 l-5 -2.5 l5 -2.5 z" fill="#ffd700" className="animate-spin-slow" />
            <path d="M70 70 l2 4 l4 2 l-4 2 l-2 4 l-2 -4 l-4 -2 l4 -2 z" fill="#ffd700" opacity="0.6" />
            <g transform="translate(258 12) rotate(-15)">
              <path d="M2 20 L52 2 L35 47 L26 31 Z" fill="#ffd700" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}
