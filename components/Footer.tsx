'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from 'react'
import { m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import GoogleTranslate from './GoogleTranslate'
import { premiumEase } from '@/lib/premium-motion-variants'

function footerLinkActive(pathname: string, search: string, href: string): boolean {
  if (!href || href === '#') return false
  try {
    const url = new URL(href, 'http://local')
    if (url.pathname !== pathname) return false
    if (!url.search) return !search || search === '?'
    const have = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
    for (const [k, v] of url.searchParams.entries()) {
      if (have.get(k) !== v) return false
    }
    return true
  } catch {
    return pathname === href
  }
}

const BRAND = 'FoundersPrime'
const BRAND_CHARS = BRAND.split('').map((char, position) => ({
  char,
  position,
  key: `brand-letter-${position}`,
}))

/** Short rotating lines under the wordmark — founder-energy, scannable. */
const FOOTER_QUOTES = [
  'Ship before you are ready.',
  'Runway is oxygen. Guard it.',
  'Customers beat opinions.',
  'Small teams. Sharp focus.',
  'Build. Charge. Learn. Repeat.',
  'Distribution is half the product.',
  'Default alive > default dead.',
  'Talk to users every week.',
  'Momentum compounds.',
  'Stay scrappy. Stay shipping.',
  'Proof beats pitch decks.',
  'Speed is a feature.',
]

/**
 * Bright $ pour through the wordmark — full-stage fall via `top` (not transform %).
 * Deterministic so SSR/client match.
 */
const DOLLAR_DROPS = Array.from({ length: 70 }, (_, i) => {
  const left = 2 + ((i * 37.1) % 96)
  const depth = i % 5
  const sizeRem =
    depth === 0
      ? 1.1 + (i % 4) * 0.2
      : depth === 1
        ? 0.9 + (i % 3) * 0.15
        : depth === 2
          ? 0.72 + (i % 3) * 0.12
          : 0.55 + (i % 4) * 0.1
  const duration = 4.2 + (i % 8) * 0.65 + depth * 0.25
  const delay = (i * 0.31) % 6.8
  const opacity =
    depth === 0
      ? 0.78 + (i % 3) * 0.05
      : depth === 1
        ? 0.6 + (i % 3) * 0.05
        : depth === 2
          ? 0.42 + (i % 2) * 0.06
          : 0.28 + (i % 3) * 0.04
  const drift = ((i * 17) % 56) - 28
  const rotStart = ((i * 23) % 36) - 18
  const rotEnd = rotStart + (((i * 9) % 28) - 10)
  const blur = depth >= 3 ? 0.8 + (i % 2) * 0.3 : 0
  // Stagger spawn above stage; end below tagline so path crosses brand
  const from = -14 - (i % 6) * 5
  const to = 102 + (i % 5) * 4
  const staticY = 28 + ((i * 19) % 45)
  // More front drops so $ visibly land on the letters
  const front = depth <= 1 && i % 2 === 0
  return {
    id: i,
    left: `${left.toFixed(2)}%`,
    sizeRem,
    duration,
    delay,
    opacity: Math.min(0.9, opacity),
    drift,
    rotStart,
    rotEnd,
    blur,
    from,
    to,
    staticY,
    far: depth >= 3,
    front,
  }
})

function DollarRain({ layer }: { layer: 'back' | 'front' }) {
  const drops = DOLLAR_DROPS.filter((d) => (layer === 'front' ? d.front : !d.front))
  return (
    <div className={`footer-dollar-rain footer-dollar-rain--${layer}`} aria-hidden>
      {drops.map((d) => (
        <span
          key={d.id}
          className={`footer-dollar${d.far ? ' footer-dollar--far' : ''}${d.front ? ' footer-dollar--front' : ''}`}
          style={
            {
              left: d.left,
              fontSize: `clamp(0.6rem, ${d.sizeRem * 0.5}rem + 0.65vw, ${d.sizeRem}rem)`,
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`,
              filter: d.blur ? `blur(${d.blur}px)` : undefined,
              '--dollar-opacity': String(d.opacity),
              '--dollar-drift': `${d.drift}px`,
              '--dollar-rot-start': `${d.rotStart}deg`,
              '--dollar-rot-end': `${d.rotEnd}deg`,
              '--dollar-static-y': `${d.staticY}%`,
              '--dollar-from': `${d.from}%`,
              '--dollar-to': `${d.to}%`,
            } as CSSProperties
          }
        >
          $
        </span>
      ))}
    </div>
  )
}

/** Yellow + charcoal sparks — modern “energy field” without clutter. */
const SPARKS = Array.from({ length: 36 }, (_, i) => {
  const left = 4 + ((i * 29.7) % 92)
  const top = 8 + ((i * 41.3) % 78)
  const size = 1.5 + (i % 4) * 0.9
  const yellow = i % 3 !== 0
  const rise = i % 4 === 0
  return {
    id: i,
    left: `${left.toFixed(1)}%`,
    top: `${top.toFixed(1)}%`,
    size,
    yellow,
    rise,
    delay: `${((i * 0.37) % 4.5).toFixed(2)}s`,
    dur: `${(2.2 + (i % 6) * 0.45).toFixed(2)}s`,
    dx: `${((i * 13) % 40) - 20}px`,
    dy: `${-28 - (i % 5) * 10}px`,
    opacity: yellow ? 0.55 + (i % 3) * 0.12 : 0.35 + (i % 2) * 0.1,
  }
})

function SparkField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {SPARKS.map((s) => (
        <span
          key={s.id}
          className={`footer-spark ${s.yellow ? 'footer-spark--yellow' : 'footer-spark--dark'}${
            s.rise ? ' footer-spark--rise' : ''
          }`}
          style={
            {
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              '--spark-dur': s.dur,
              '--spark-dx': s.dx,
              '--spark-dy': s.dy,
              '--spark-opacity': String(s.opacity),
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}

function RotatingFooterQuote({ reduce }: { reduce: boolean | null }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % FOOTER_QUOTES.length)
    }, 3800)
    return () => window.clearInterval(id)
  }, [reduce])

  const quote = FOOTER_QUOTES[idx]

  return (
    <div className="relative h-6 md:h-7 flex items-center justify-center w-full max-w-lg px-4">
      <p
        key={quote}
        className={`font-mono text-[11px] md:text-[12px] text-zinc-400 tracking-wide text-center ${
          reduce ? '' : 'footer-rotating-quote'
        }`}
      >
        <span className="text-accent-yellow/80 mr-1.5">//</span>
        {quote}
      </p>
    </div>
  )
}

function BrandWordmark() {
  const reduce = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)
  const springX = useSpring(mouseX, { stiffness: 70, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 70, damping: 22 })
  const glow = useMotionTemplate`radial-gradient(520px circle at ${springX}% ${springY}%, rgba(255,215,0,0.1), transparent 62%)`

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduce || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(((e.clientX - rect.left) / rect.width) * 100)
      mouseY.set(((e.clientY - rect.top) / rect.height) * 100)
    },
    [mouseX, mouseY, reduce]
  )

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={() => {
        setHovered(null)
        mouseX.set(50)
        mouseY.set(50)
      }}
      className="relative select-none w-full py-10 sm:py-14 md:py-20 lg:py-24"
      aria-label="FoundersPrime"
    >
      {/*
        Open glass stage — pure soft radials only.
        No overflow-hidden (clips into a box). No solid slab. No bordered panel.
      */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Wide soft amber glass bloom — fades fully to transparent */}
        <div className="footer-glass-bloom" />
        {/* Cool secondary haze for depth */}
        <div className="footer-glass-haze" />
        {!reduce && (
          <m.div
            className="absolute inset-0 mix-blend-soft-light opacity-80"
            style={{ background: glow }}
          />
        )}
        {!reduce && (
          <>
            <div className="footer-pulse-ring" />
            <div className="footer-pulse-ring footer-pulse-ring--delay" />
            <SparkField />
            {/* Soft diagonal flash — not a rectangular bar */}
            <div className="footer-strike-beam" />
            <DollarRain layer="back" />
          </>
        )}
      </div>

      {/* Front $ fall ON TOP of the brand letters */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 z-[3]" aria-hidden>
          <DollarRain layer="front" />
        </div>
      )}

      <div className="relative z-[1] flex flex-col items-center gap-5 md:gap-6 px-4">
        <p className="font-mono text-[10px] md:text-[11px] font-bold tracking-[0.38em] uppercase text-zinc-500">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-yellow opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-yellow" />
            </span>
            Built for the underdogs
          </span>
        </p>

        <Link
          href="/"
          className="group relative z-[1] no-underline outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent-yellow/40"
          aria-label="FoundersPrime home"
        >
          <h2
            className="relative flex flex-wrap justify-center items-baseline font-mono font-black leading-none tracking-[-0.04em] md:tracking-[-0.05em]"
            style={{ fontSize: 'clamp(2.75rem, 12vw, 8.75rem)' }}
          >
            {BRAND_CHARS.map(({ char, position, key }) => {
              const isPrime = position >= 8
              const isHover = hovered === position
              const near = hovered !== null && Math.abs(hovered - position) === 1
              const lift = reduce ? 0 : isHover ? -10 : near ? -4 : 0
              const scale = reduce ? 1 : isHover ? 1.06 : 1

              return (
                <m.span
                  key={key}
                  className="relative inline-block will-change-transform"
                  onMouseEnter={() => setHovered(position)}
                  onMouseLeave={() => setHovered(null)}
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.55,
                    delay: reduce ? 0 : position * 0.028,
                    ease: premiumEase,
                  }}
                >
                  <span
                    className={`inline-block transition-[transform,color,text-shadow] duration-200 ease-out ${
                      isPrime
                        ? isHover
                          ? 'text-yellow-200'
                          : 'text-accent-yellow'
                        : isHover
                          ? 'text-white'
                          : 'text-white'
                    }`}
                    style={{
                      transform: `translateY(${lift}px) scale(${scale})`,
                      textShadow: isHover
                        ? isPrime
                          ? '0 0 36px rgba(255,215,0,0.55), 0 0 72px rgba(255,215,0,0.2)'
                          : '0 0 28px rgba(255,255,255,0.28)'
                        : isPrime
                          ? '0 0 40px rgba(255,215,0,0.22), 0 0 80px rgba(255,215,0,0.08)'
                          : '0 2px 24px rgba(0,0,0,0.35)',
                    }}
                  >
                    {char}
                  </span>
                </m.span>
              )
            })}
          </h2>

          {!reduce && (
            <span className="footer-brand-sheen" aria-hidden>
              {BRAND}
            </span>
          )}
        </Link>

        <p className="font-sans text-xs md:text-sm text-zinc-500 tracking-wide text-center max-w-md">
          The intelligence terminal for bootstrapped founders.
        </p>

        <RotatingFooterQuote reduce={reduce} />
      </div>
    </div>
  )
}

const footerSections = [
  {
    title: 'Deals',
    summary: 'Startup credits, SaaS deals & more',
    icon: 'local_offer',
    links: [
      { text: 'All deals', href: '/deals' },
      { text: 'Flash Deals', href: '/flash-deals', highlight: true },
      { text: 'Cloud Credits', href: '/deals?category=cloud-credits' },
      { text: 'SaaS & Tools', href: '/deals?category=saas-discounts' },
      { text: 'Grants', href: '/programs?type=grants' },
      { text: 'Ad Credits', href: '/deals?category=ad-credits' },
    ],
  },
  {
    title: 'Programs',
    summary: 'Grants, incentives & founder perks',
    icon: 'redeem',
    links: [
      { text: 'All Programs', href: '/programs' },
      { text: 'Accelerators', href: '/programs?type=accelerators' },
      { text: 'Incubators', href: '/programs?type=incubators' },
      { text: 'Grants', href: '/programs?type=grants' },
    ],
  },
  {
    title: 'Student Benefits',
    summary: 'Exclusive benefits for students',
    icon: 'school',
    links: [
      { text: 'Credits & Savings', href: '/student-benefits?type=credits-savings' },
      { text: 'Campus Edge', href: '/student-benefits?type=free-access' },
      { text: 'Funding & Opps', href: '/student-benefits?type=funding' },
    ],
  },
  {
    title: 'Discover',
    summary: 'Explore resources & opportunities',
    icon: 'explore',
    links: [
      { text: 'Startup Ideas', href: '/ideas' },
      { text: 'Founder Vault', href: '/resources' },
      { text: 'Search', href: '/search' },
    ],
  },
  {
    title: 'Company',
    summary: 'About us, careers & press',
    icon: 'domain',
    links: [
      { text: 'About', href: '/about' },
      { text: 'Pricing', href: '/pricing' },
      { text: 'Contact', href: '/contact' },
      { text: 'Submit a Deal', href: '/submit-deal' },
    ],
  },
  {
    title: 'Legal',
    summary: 'Terms, privacy & policies',
    icon: 'gavel',
    links: [
      { text: 'Privacy Policy', href: '/privacy' },
      { text: 'Terms of Service', href: '/terms' },
      { text: 'Cookie Policy', href: '/cookie-policy' },
      { text: 'Refund Policy', href: '/refund-policy' },
    ],
  },
]

const socials = [
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/foundersprime',
    bg: 'hover:bg-white/10 hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    iconColor: 'text-white',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/foundersprime',
    bg: 'hover:bg-[#0A66C2]/10 hover:border-[#0A66C2] hover:shadow-[0_0_15px_rgba(10,102,194,0.25)]',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    iconColor: 'text-[#0A66C2]',
  },
  {
    label: 'Discord',
    href: '#',
    bg: 'hover:bg-[#5865F2]/10 hover:border-[#5865F2] hover:shadow-[0_0_15px_rgba(88,101,242,0.25)]',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" aria-hidden>
        <path d="M20.317 4.37a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.74 19.74 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
    iconColor: 'text-[#5865F2]',
  },
  {
    label: 'Email',
    href: 'mailto:hello@foundersprime.com',
    bg: 'hover:bg-accent-yellow/10 hover:border-accent-yellow hover:shadow-[0_0_15px_rgba(255,215,0,0.25)]',
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" aria-hidden>
        <path d="M2 4h20a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V6a2 2 0 012-2zm10 7L2.5 5h19zM2 8.236V18h20V8.236l-9.445 5.667a2 2 0 01-2.11 0z" />
      </svg>
    ),
    iconColor: 'text-accent-yellow',
  },
]

export default function Footer() {
  const pathname = usePathname() || '/'
  const [search, setSearch] = useState('')
  const [pressedHref, setPressedHref] = useState<string | null>(null)

  useEffect(() => {
    const sync = () => setSearch(typeof window !== 'undefined' ? window.location.search : '')
    sync()
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [pathname])

  const markPress = (href: string) => {
    setPressedHref(href)
    window.setTimeout(() => setPressedHref((h) => (h === href ? null : h)), 320)
  }

  const footerLinkClass = (href: string, highlight?: boolean) => {
    const active = footerLinkActive(pathname, search, href)
    const pressed = pressedHref === href
    if (highlight) {
      return [
        'font-sans text-[13px] no-underline inline-flex items-center gap-1 transition-all duration-150',
        'text-accent-yellow font-bold hover:text-yellow-300',
        'active:scale-[0.97] active:text-yellow-200',
        pressed ? 'text-yellow-200 underline decoration-accent-yellow/60 underline-offset-4' : '',
        active ? 'underline decoration-accent-yellow underline-offset-4' : '',
      ]
        .filter(Boolean)
        .join(' ')
    }
    return [
      'font-sans text-[13px] no-underline inline-flex items-center gap-1 transition-all duration-150',
      'text-zinc-400 hover:text-white',
      'active:scale-[0.97] active:text-accent-yellow',
      pressed ? 'text-accent-yellow' : '',
      active ? 'text-white font-semibold' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }



  return (
    <footer className="relative bg-black text-white border-t border-white/[0.08] overflow-hidden grid-bg-dark transition-colors duration-300">
      {/* Ambient glow */}
      <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] bg-accent-yellow/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[28rem] h-[28rem] bg-accent-yellow/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-[35rem] h-[35rem] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* ── Main grid ── */}
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-6 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-5 relative">
            <Link href="/" className="inline-flex items-center gap-2.5 no-underline w-fit group">
              <Image
                src="/logo-icon.png"
                alt="FoundersPrime"
                width={48}
                height={48}
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-mono font-black text-xl md:text-2xl tracking-[0.18em] text-white uppercase whitespace-nowrap">
                FOUNDERS<span className="text-accent-yellow">[</span>PRIME<span className="text-accent-yellow">]</span>
              </span>
            </Link>

            <p className="font-sans text-sm text-zinc-400 leading-relaxed pr-4">
              The intelligence terminal for bootstrapped founders. Save runway, skip the dilution, and scale your startup faster.
            </p>

            {/* Trust cards */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 mt-1.5">
              <div className="flex items-center gap-3.5 bg-zinc-900/30 border border-white/[0.06] rounded-xl p-3.5 hover:bg-zinc-900/50 hover:border-accent-yellow/20 transition-colors">
                <span className="material-symbols-outlined text-accent-yellow !text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[10px] font-black uppercase text-white tracking-wider leading-none">Verified Deals</span>
                  <span className="font-sans text-[9px] text-zinc-400 mt-1.5 leading-tight">Handpicked &amp; founder-verified</span>
                </div>
              </div>
              <div className="flex items-center gap-3.5 bg-zinc-900/30 border border-white/[0.06] rounded-xl p-3.5 hover:bg-zinc-900/50 hover:border-accent-yellow/20 transition-colors">
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#C6FE1E]">
                  <Image
                    src="/logos/dodo-favicon.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                    unoptimized
                  />
                </span>
                <div className="flex flex-col text-left min-w-0">
                  <span className="font-mono text-[10px] font-black uppercase text-white tracking-wider leading-none">
                    Secure Checkout
                  </span>
                  <span className="font-sans text-[9px] text-zinc-400 mt-1.5 leading-tight">
                    Powered by Dodo Payments
                  </span>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-2 w-full">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex-1 h-12 bg-zinc-900/40 border border-white/[0.08] rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 active:scale-95 active:translate-y-0 ${s.bg}`}
                >
                  <span className={`transition-colors duration-300 ${s.iconColor}`}>{s.svg}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Grid — desktop */}
          <div className="lg:col-span-8 hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
            {footerSections.map((section, index) => (
              <div key={section.title} className="flex flex-col gap-4">
                <p className="font-mono text-[10.5px] font-black tracking-widest uppercase text-accent-yellow">
                  {section.title}
                </p>
                <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        onClick={() => markPress(link.href)}
                        aria-current={footerLinkActive(pathname, search, link.href) ? 'page' : undefined}
                        className={footerLinkClass(link.href, (link as { highlight?: boolean }).highlight)}
                      >
                        {link.text}
                        {pressedHref === link.href && (
                          <span className="material-symbols-outlined !text-[12px] text-accent-yellow animate-pulse" aria-hidden>
                            arrow_forward
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile accordion */}
          <div className="md:hidden flex flex-col w-full border border-white/[0.08] rounded-2xl bg-zinc-900/10 overflow-hidden mt-4">
            {footerSections.map((section) => (
              <details key={section.title} className="group border-b border-white/[0.06] last:border-b-0">
                <summary className="flex justify-between items-center cursor-pointer list-none p-3 outline-none transition-colors select-none">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-zinc-900/50 border border-white/[0.08] flex items-center justify-center flex-shrink-0 text-accent-yellow group-open:bg-accent-yellow group-open:text-black group-open:border-accent-yellow transition-all duration-300">
                      <span className="material-symbols-outlined !text-[16px]">{section.icon}</span>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-mono text-[11px] font-black tracking-wider uppercase text-gray-200 group-open:text-accent-yellow transition-colors leading-tight">
                        {section.title}
                      </span>
                      <span className="font-sans text-[8.5px] text-zinc-400 leading-normal mt-1 font-medium">
                        {section.summary}
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-base text-zinc-500 group-open:text-accent-yellow transition-all duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <ul className="flex flex-col gap-1 px-4 pb-3.5 pt-1.5 list-none m-0 bg-zinc-950/40 border-t border-white/[0.03]">
                  {section.links.map((link, linkIndex) => {
                    const active = footerLinkActive(pathname, search, link.href)
                    const highlight = (link as { highlight?: boolean }).highlight
                    return (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        onClick={() => markPress(link.href)}
                        aria-current={active ? 'page' : undefined}
                        className={`block font-sans text-xs no-underline py-2 px-2 rounded-md transition-all active:scale-[0.98] ${
                          highlight
                            ? `text-accent-yellow font-bold active:bg-accent-yellow/10 ${active || pressedHref === link.href ? 'bg-accent-yellow/10' : ''}`
                            : `active:bg-white/10 ${
                                active || pressedHref === link.href
                                  ? 'text-white bg-white/5'
                                  : 'text-zinc-400 active:text-white'
                              }`
                        }`}
                      >
                        {link.text}
                      </Link>
                    </li>
                    )
                  })}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* ── Independent recognition ── */}
      <section
        aria-labelledby="footer-recognition-title"
        className="relative mx-auto w-full max-w-[1280px] px-4 pb-6 sm:px-6 md:pb-8 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0a0a0a] via-[#070707] to-black shadow-[0_20px_64px_rgba(0,0,0,0.32)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/60 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-28 h-56 w-56 rounded-full bg-accent-yellow/[0.055] blur-3xl"
          />

          <div className="relative grid items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.72fr)]">
            <div className="flex min-h-[10.5rem] items-center p-5 sm:p-6 lg:px-8 lg:py-7">
              <div className="flex items-start gap-4 sm:gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-yellow/20 bg-accent-yellow/[0.08] text-accent-yellow shadow-[0_0_28px_rgba(255,213,0,0.07)] sm:h-12 sm:w-12">
                  <span
                    className="material-symbols-outlined !text-[21px] sm:!text-[23px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    workspace_premium
                  </span>
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-accent-yellow/80">
                    Independent recognition
                  </p>
                  <h2
                    id="footer-recognition-title"
                    className="mt-2 max-w-2xl font-mono text-lg font-black uppercase leading-tight tracking-[-0.02em] text-white sm:text-xl lg:text-2xl"
                  >
                    Featured &amp; listed beyond our platform.
                  </h2>
                  <p className="mt-2.5 max-w-xl text-[11.5px] leading-relaxed text-zinc-400 sm:text-[13px]">
                    Recognized by independent founder communities helping builders discover products worth knowing.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative border-t border-white/[0.07] bg-white/[0.015] lg:border-l lg:border-t-0">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,213,0,0.045),transparent_68%)]"
              />
              <ul
                className="relative grid min-h-[8.5rem] grid-cols-1 items-center gap-3 p-4 sm:grid-cols-2 sm:p-5"
                aria-label="Platforms featuring FoundersPrime"
              >
                <li className="flex min-h-[96px] min-w-0 items-center justify-center rounded-xl border border-black/10 bg-white p-3 shadow-[0_14px_40px_rgba(0,0,0,0.26)]">
                  <Image
                    src="https://www.foundrlist.com/api/badge/foundersprime-2"
                    alt="Featured on FoundrList"
                    width={150}
                    height={48}
                    className="h-auto w-[165px] max-w-full object-contain"
                    unoptimized
                  />
                </li>
                <li className="min-w-0">
                  <a
                    href="https://peerlist.io/ravitejapro/project/foundersprime"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="FoundersPrime on Peerlist (opens in a new tab)"
                    className="group flex min-h-[96px] items-center justify-center overflow-hidden rounded-xl border border-white/[0.09] bg-[#111111] p-2.5 no-underline shadow-[0_14px_40px_rgba(0,0,0,0.26)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-yellow/30 hover:shadow-[0_18px_46px_rgba(0,0,0,0.34)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://peerlist.io/api/v1/projects/embed/PRJH9OBR8GERQEODL1A7BKNBBPKAPM?showUpvote=false&theme=dark"
                      alt="FoundersPrime on Peerlist"
                      className="h-[72px] w-auto max-w-full rounded-lg object-contain"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Giant brand wordmark — full-bleed, no boxed container ── */}
      <div className="relative w-full">
        <BrandWordmark />
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-white/[0.08] bg-zinc-950/60 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
            <span className="font-mono text-[10px] md:text-[11px] text-zinc-400 text-center sm:text-left">
              © 2026 FoundersPrime · Built by founders, for founders.
            </span>
            <span className="hidden sm:inline text-zinc-700">·</span>
            <span className="font-mono text-[10px] md:text-[11px] text-zinc-400">
              Made with <span className="text-red-500">♥</span> for the underdogs.
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <GoogleTranslate />
            <a
              href="#"
              className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-400 hover:text-accent-yellow transition-colors"
            >
              Status
            </a>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-300 px-3 py-1.5 bg-zinc-900/40 border border-white/[0.08] rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow animate-pulse" />
              Operational
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}
