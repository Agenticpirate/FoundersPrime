'use client'

import Mandala from '@/components/ui/Mandala'
import { ContactCardDecor } from '@/components/contact/ContactAmbientDecor'

const STANDARDS = [
  { value: '24–48 hrs', label: 'Avg response', icon: 'bolt' },
  { value: 'Mon–Fri', label: '9AM–6PM PST', icon: 'schedule' },
  { value: 'Global', label: '43+ countries', icon: 'public' },
]

/** Social icons as inline SVGs — Threads uses Meta’s official mark path */
const SOCIALS = [
  {
    platform: 'X (Twitter)',
    handle: '@FoundersPrime',
    url: 'https://x.com/foundersprime',
    iconClass: 'text-white',
    hoverClass: 'hover:border-white/30 hover:bg-white/[0.06]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    platform: 'LinkedIn',
    handle: 'foundersprime',
    url: 'https://linkedin.com/company/foundersprime',
    iconClass: 'text-[#0A66C2]',
    hoverClass: 'hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    platform: 'Instagram',
    handle: '@FoundersPrime',
    url: 'https://instagram.com/foundersprime',
    iconClass: 'text-[#E1306C]',
    hoverClass: 'hover:border-[#E1306C]/40 hover:bg-[#E1306C]/10',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    platform: 'Threads',
    handle: '@FoundersPrime',
    url: 'https://www.threads.net/@foundersprime',
    iconClass: 'text-white',
    hoverClass: 'hover:border-white/30 hover:bg-white/[0.06]',
    // Official Meta Threads mark (local asset — reliable fill on dark UI)
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/brand-logos/threads.svg"
        alt=""
        width={18}
        height={18}
        className="w-[18px] h-[18px] object-contain"
        draggable={false}
      />
    ),
  },
]

export default function ContactInfo() {
  return (
    <div className="space-y-4 lg:sticky lg:top-24">
      {/* Live desk */}
      <div className="relative overflow-hidden rounded-2xl border border-accent-yellow/25 bg-gradient-to-br from-[#141414] to-[#0a0a0a] p-5">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/45 to-transparent"
        />
        <Mandala
          variant="rings"
          colorClass="text-accent-yellow"
          opacity={0.06}
          speed={90}
          className="absolute -top-10 -right-10 w-32 h-32"
        />
        <ContactCardDecor variant="desk" />
        <div className="relative">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent-yellow/15 border border-accent-yellow/30 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow animate-pulse" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-accent-yellow">
              Desk online
            </span>
          </div>
          <h3 className="font-mono text-[13px] font-black uppercase tracking-wide text-white mb-1.5">
            Support desk
          </h3>
          <p className="text-[12px] text-gray-400 leading-relaxed">
            Questions about deals, billing, or partnerships — send a message and we&apos;ll get back within 24–48 hours.
          </p>
        </div>
      </div>

      {/* Standards */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-5">
        <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500 mb-3.5 flex items-center gap-2">
          <span className="material-symbols-outlined !text-[14px] text-accent-yellow">verified</span>
          Service standards
        </h3>
        <div className="space-y-2.5">
          {STANDARDS.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5"
            >
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-yellow/10 text-accent-yellow">
                <span className="material-symbols-outlined !text-[16px]">{s.icon}</span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[13px] font-black text-white leading-none">{s.value}</p>
                <p className="font-mono text-[9px] uppercase tracking-wider text-gray-500 mt-0.5">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct email */}
      <a
        href="mailto:support@foundersprime.com"
        className="group flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-4 hover:border-accent-yellow/30 transition-colors"
      >
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-yellow text-black">
          <span className="material-symbols-outlined !text-[20px]">mail</span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500">
            Direct email
          </p>
          <p className="font-mono text-[12px] font-bold text-white truncate group-hover:text-accent-yellow transition-colors">
            support@foundersprime.com
          </p>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="shrink-0 text-accent-yellow transition-transform group-hover:translate-x-0.5"
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
      </a>

      {/* Social channels — X, LinkedIn, Instagram, Threads */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-5">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-8 -left-6 w-24 h-24 rounded-full bg-accent-yellow/[0.04] blur-2xl"
        />
        <h3 className="relative font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500 mb-3.5 flex items-center gap-2">
          <span className="material-symbols-outlined !text-[14px] text-accent-yellow">hub</span>
          Social channels
        </h3>
        <div className="relative grid grid-cols-2 gap-2.5">
          {SOCIALS.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 transition-all duration-200 ${social.hoverClass}`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-lg bg-black/40 border border-white/10 ${social.iconClass}`}
                >
                  {social.icon}
                </span>
                <span className="material-symbols-outlined !text-[14px] text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                  arrow_outward
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[8px] font-bold uppercase tracking-wider text-gray-500">
                  {social.platform}
                </p>
                <p className="font-mono text-[11px] font-bold text-white truncate mt-0.5">
                  {social.handle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
