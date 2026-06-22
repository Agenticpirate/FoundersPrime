'use client'

import { useEffect, useRef, useState } from 'react'

// Request a small, server-cropped thumbnail directly from the source CDN so we
// never download multi-hundred-KB originals for a ~40px avatar.
function sizedAvatar(url: string): string {
  if (url.includes('googleusercontent.com')) {
    return /=s\d|=w\d/.test(url) ? url : `${url}=s96-c`
  }
  return url
}

type Testimonial = {
  quote: string
  highlight?: string
  name: string
  title: string
  tag: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    quote: 'FoundersPrime helped us save over $180K in cloud credits. That runway helped us hire our first 3 engineers.',
    highlight: '$180K',
    name: 'Arjun Patel',
    title: 'Co-founder, Trace',
    tag: 'AI Infrastructure',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5d4-Q9P1h1tTPpPXPBqpJ7J4mMLkrwRJFv9zGEo4odhwBoJ8IdoOT_UJ0gayHuB5eAafpdAxNdZ2M3bUMXrA3wEVh5xEMcbARixdAaVclLOa1b6e9HtjssMTn9iEUJQdNAOOPdYAk7LxyU9K4zmQvA7gS3gRJ45eMQ1UPya6ZmbVCNikhRc9IyIMGp0I3_c_C9WjbSI0KO50LPyaBlt0cnXXEzotw9NewrXhZPHUtj01zYTGPJ4gEbfkIRD33qXXrO9gclzUEool2',
  },
  {
    quote: "One email, and I unlocked amazing perks I didn't even know existed. Absolute game changer.",
    highlight: 'game changer',
    name: 'Sneha Reddy',
    title: 'Founder, Fundaro',
    tag: 'Fintech',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    quote: 'The best place to discover real founder perks. Everything is legit and actually useful.',
    highlight: 'legit and actually useful',
    name: 'Kevin Lin',
    title: 'Co-founder, Launchly',
    tag: 'DevTools',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBfkkSY9Pew95IzHg4YoxCh_wzyOiX0bfJeIWFQRuLfjEQLRPyPXM9I8xMrbrXz1nUtoB7G1_2Whry-XoT6ksgKbrKjoM2IjdeCcA1hy5PA9wZ7pUf_uhphHamSDCemqRoQmExLwYbPv4adfA30oj2uTRpv-DnwYfNbdPX5W5kgKXhCod_bk5JhvJSBnSGZgfbGtJAxUD9CBRefvq3vhKLeMFDCAJY3NV5QeUFUac2G4sfihNkgBuAiSwfQcc9KgqECNPl-UEWEeT6n',
  },
  {
    quote: "We got $200K in credits within a week of joining. Can't recommend it enough for early-stage teams.",
    highlight: '$200K',
    name: 'Maya Thompson',
    title: 'Founder, CrewOS',
    tag: 'Collaboration',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    quote: "Found a non-dilutive grant I didn't even know existed. We secured $15K fast, no equity given up.",
    highlight: '$15K',
    name: 'David Chen',
    title: 'Founder, BioLabs',
    tag: 'Biotech',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    quote: "The verified ideas database helped me pivot. Now we're profitable and growing.",
    highlight: 'profitable',
    name: 'Elena R.',
    title: 'CEO, MarketPulse',
    tag: 'SaaS',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDDWKOTW1Z4METWLmHRcQOqrZY_8W0vdfCfL-pcYbWkMcldNXkQTDNyoMD0pMG5KH-Y7sn68IbbpxsijgEuALAwjmzpomYSieRn06RqYVkEfdPv1Bco8tUegoNAnSbhMb4wf6G3bCQ3lbpRqs5EUBflZ3kkB9B7inbfIwPx7FNRhG8kjomp_1UkffjgH_yPZ1j_atI40hWzfLka-wORQEeYr4WEnts90LGX0r9OPtjyn20j5NmeeSGgiKWTa4u7ks4H2qjKgeZ51HTl',
  },
  {
    quote: 'Google Cloud credits alone covered our entire infrastructure for 18 months.',
    highlight: '18 months',
    name: 'Kenji T.',
    title: 'Co-founder, Volt',
    tag: 'Cloud',
    image:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    quote: "If you're bootstrapping, you need this. It stretches your budget further than you'd think.",
    highlight: 'stretches your budget',
    name: 'Lisa Wong',
    title: 'Founder, PixelForge',
    tag: 'Design',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
]

const trustStats = [
  { icon: 'card_giftcard', value: '$500K+', label: 'Perks Available' },
  { icon: 'rocket_launch', value: 'Curated', label: 'Programs & Perks' },
  { icon: 'autorenew', value: 'Weekly', label: 'Fresh Updates' },
  { icon: 'verified_user', value: '100%', label: 'Founder Verified' },
  { icon: 'do_not_disturb_on', value: 'Zero', label: 'Noise. All Value.' },
]

const ratingBreakdown = [
  { stars: 5, pct: 92 },
  { stars: 4, pct: 7 },
  { stars: 3, pct: 1 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 0 },
]

function Stars({ size = 16 }: { size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined text-[#f5c800]"
          style={{
            fontSize: size,
            fontVariationSettings: "'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 24",
          }}
        >
          star
        </span>
      ))}
    </div>
  )
}

function renderQuote(t: Testimonial) {
  if (!t.highlight || !t.quote.includes(t.highlight)) {
    return <>{t.quote}</>
  }
  const [before, after] = t.quote.split(t.highlight)
  return (
    <>
      {before}
      <strong className="font-bold text-black dark:text-white">{t.highlight}</strong>
      {after}
    </>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const [imgError, setImgError] = useState(false)
  return (
    <article className="snap-start shrink-0 w-[250px] md:w-[280px] flex flex-col bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-2xl shadow-[0_2px_14px_rgba(0,0,0,0.05)] p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] dark:hover:shadow-[0_8px_24px_rgba(255,255,255,0.03)] hover:border-gray-300 dark:hover:border-white/20">
      <span
        className="material-symbols-outlined text-accent-yellow text-2xl leading-none mb-0.5"
        style={{ fontVariationSettings: "'FILL' 1" }}
        aria-hidden
      >
        format_quote
      </span>

      <Stars size={14} />

      <p className="font-sans text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed mt-2 mb-4 flex-1">
        {renderQuote(t)}
      </p>

      <div className="flex items-center gap-2.5 border-t border-gray-100 dark:border-white/5 pt-3">
        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-gray-100 dark:bg-white/5 ring-1 ring-gray-200 dark:ring-white/10">
          {!imgError ? (
            <img
              src={sizedAvatar(t.image)}
              alt={t.name}
              width={36}
              height={36}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-white/5 text-xs font-bold text-gray-700 dark:text-gray-300">
              {t.name[0]}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-[13px] text-black dark:text-white truncate">{t.name}</p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{t.title}</p>
        </div>
      </div>

      <span className="mt-2.5 inline-flex self-start items-center bg-black dark:bg-white text-white dark:text-black font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded transition-colors duration-300">
        {t.tag}
      </span>
    </article>
  )
}

export default function FounderLogs() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  const scrollByCards = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const amount = Math.max(el.clientWidth * 0.8, 300)
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  // Gentle auto-advance for the scroller; pauses on hover/focus and respects
  // the user's reduced-motion preference.
  useEffect(() => {
    if (paused) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    const el = scrollerRef.current
    if (!el) return
    const id = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: el.clientWidth * 0.8, behavior: 'smooth' })
      }
    }, 3800)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section className="py-7 md:py-10 bg-background-light dark:bg-[#050505] border-y-2 border-black dark:border-white/10 overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: headline + rating summary */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center mb-5 md:mb-7">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-accent-yellow/20 text-black dark:text-accent-yellow font-mono text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md mb-3 transition-colors duration-300">
              <span className="material-symbols-outlined text-[13px]">forum</span>
              Trusted by founders
            </span>
            <h2 className="font-mono uppercase font-black text-black dark:text-white text-2xl md:text-[2rem] leading-[1.1] tracking-tight transition-colors duration-300">
              From &ldquo;I wish I knew&rdquo;
              <br className="hidden sm:block" /> to{' '}
              <span className="bg-accent-yellow text-black px-2 box-decoration-clone">
                &ldquo;I just claimed it.&rdquo;
              </span>
            </h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 font-sans max-w-md transition-colors duration-300">
              FoundersPrime has helped thousands of founders discover credits, grants, and perks
              that help them build faster and smarter.
            </p>
          </div>

          {/* Rating card */}
          <div className="bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-2xl shadow-[0_2px_14px_rgba(0,0,0,0.05)] p-4 md:p-5 w-full transition-colors duration-300">
            <div className="flex items-center gap-5 md:gap-8">
              <div className="shrink-0">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-mono font-black text-4xl md:text-5xl text-black dark:text-white leading-none transition-colors duration-300">4.9</span>
                  <span className="font-mono text-sm text-gray-400 dark:text-gray-500">/5</span>
                </div>
                <div className="mt-2">
                  <Stars size={18} />
                </div>
                <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 font-sans transition-colors duration-300">From founders worldwide</p>
              </div>

              <div className="flex-1 space-y-1.5 min-w-0">
                {ratingBreakdown.map((row) => (
                  <div key={row.stars} className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400 w-2.5 text-right transition-colors duration-300">{row.stars}</span>
                    <span
                      className="material-symbols-outlined text-[#f5c800] text-[12px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <div className="flex-1 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden transition-colors duration-300">
                      <div
                        className="h-full bg-[#f5c800] rounded-full"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 w-8 text-right transition-colors duration-300">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroller controls */}
        <div className="flex justify-end gap-2 mb-3">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            aria-label="Previous testimonials"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-white/20 bg-white dark:bg-[#0c0c0c] text-black dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            aria-label="Next testimonials"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-black dark:bg-white text-accent-yellow dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* Testimonial scroller */}
        <div
          ref={scrollerRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>

        {/* Trust stats bar */}
        <div className="mt-6 md:mt-7 bg-accent-yellow/[0.07] dark:bg-accent-yellow/[0.02] border border-gray-200 dark:border-white/10 rounded-2xl p-4 md:p-5 transition-colors duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
            <div className="lg:w-52 shrink-0">
              <h3 className="font-mono font-black uppercase text-base leading-tight text-black dark:text-white transition-colors duration-300">
                Founders trust
                <br />
                <span className="text-accent-yellow">the process.</span>
              </h3>
              <div className="w-8 h-0.5 bg-accent-yellow my-2" />
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-sans leading-relaxed transition-colors duration-300">
                Curated weekly &bull; Verified programs
                <br />
                Zero equity required
              </p>
            </div>

            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-3 lg:divide-x lg:divide-dashed lg:divide-gray-300 dark:lg:divide-white/10">
              {trustStats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center text-center lg:px-2">
                  <span className="w-9 h-9 flex items-center justify-center bg-black dark:bg-white/10 rounded-xl mb-2 transition-colors duration-300">
                    <span
                      className="material-symbols-outlined text-accent-yellow text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {stat.icon}
                    </span>
                  </span>
                  <span className="font-mono font-black text-base md:text-lg text-black dark:text-white leading-none whitespace-nowrap transition-colors duration-300">
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 font-sans mt-1 transition-colors duration-300">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
