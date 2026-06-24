import React from 'react'

export default function ContactHero() {
  return (
    <div className="relative mb-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="inline-flex items-center gap-1 font-mono text-[11px] text-gray-500">
          <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
          <li aria-hidden="true"><span className="text-gray-700">/</span></li>
          <li className="text-gray-400">Contact Us</li>
        </ol>
      </nav>

      <div className="relative max-w-3xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-full mb-4">
          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-yellow-400">
            We're here to help
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Let's build something <span className="text-yellow-400">great</span> together.
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-sm md:text-base text-gray-400 max-w-xl leading-relaxed">
          Questions about deals, partnerships, or your account? Real humans, real fast — we respond within 24 hours.
        </p>

        {/* Decorative plane in background or top right */}
        <div className="absolute top-0 right-0 hidden lg:block w-[200px] h-[100px] pointer-events-none opacity-80 translate-x-12 -translate-y-8">
          <svg viewBox="0 0 320 110" className="w-full h-full" fill="none">
            <path
              d="M6 90 C 70 48, 120 104, 184 62 S 248 30, 256 44"
              stroke="#ffd700"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1 7"
            />
            <path d="M128 26 l2.5 5 l5 2.5 l-5 2.5 l-2.5 5 l-2.5 -5 l-5 -2.5 l5 -2.5 z" fill="#ffd700" opacity="0.75" />
            <path d="M70 70 l2 4 l4 2 l-4 2 l-2 4 l-2 -4 l-4 -2 l4 -2 z" fill="#ffd700" opacity="0.55" />
            <g transform="translate(258 12) rotate(-15)">
              <path d="M2 20 L52 2 L35 47 L26 31 Z" fill="#ffd700" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}

