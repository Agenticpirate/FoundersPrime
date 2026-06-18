import Mandala from '@/components/ui/Mandala'

export default function ContactHero() {
  const trustStats = [
    { value: '< 24 hrs', label: 'Avg. response time', icon: 'bolt' },
    { value: '7 days', label: 'We monitor daily', icon: 'schedule' },
    { value: '100%', label: 'Human replies', icon: 'public' },
  ]

  return (
    <div className="relative mb-4 md:mb-5">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-2.5 fp-fade-up">
        <ol className="inline-flex items-center gap-1 font-mono text-[11px] text-gray-500">
          <li><a href="/" className="hover:text-black transition-colors">Home</a></li>
          <li aria-hidden="true"><span className="material-symbols-outlined !text-[14px] text-gray-300 align-middle">chevron_right</span></li>
          <li className="font-semibold text-black">Contact Us</li>
        </ol>
      </nav>

      {/* Page heading + decorative paper-plane flight path */}
      <div className="relative mb-4 md:mb-5 fp-fade-up">
        {/* Paper-plane flight path — decorative, large screens only, fully contained */}
        <div
          className="pointer-events-none absolute top-0 right-4 lg:right-8 hidden lg:block w-[280px] h-24"
          aria-hidden="true"
        >
          <svg viewBox="0 0 320 110" className="w-full h-full" fill="none">
            <path
              d="M6 90 C 70 48, 120 104, 184 62 S 248 30, 256 44"
              stroke="#ffd700"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="1 9"
            />
            <path d="M128 26 l2.5 5 l5 2.5 l-5 2.5 l-2.5 5 l-2.5 -5 l-5 -2.5 l5 -2.5 z" fill="#ffd700" opacity="0.75" />
            <path d="M70 70 l2 4 l4 2 l-4 2 l-2 4 l-2 -4 l-4 -2 l4 -2 z" fill="#ffd700" opacity="0.55" />
            <g transform="translate(258 12) rotate(-15)">
              <path d="M2 20 L52 2 L35 47 L26 31 Z" fill="#ffd700" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M52 2 L26 31" stroke="#111" strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        <div className="relative inline-flex items-center gap-1.5 border-2 border-black bg-accent-yellow px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-2.5 shadow-[2px_2px_0px_#111]">
          <span className="material-symbols-outlined !text-[12px]">mail</span>
          Contact Us
        </div>
        <h1 className="relative font-mono text-[28px] md:text-[44px] font-black tracking-tight text-black mb-1.5 leading-[1.04] uppercase">
          Get In <span className="text-accent-yellow [-webkit-text-stroke:1px_#111]">Touch</span>
        </h1>
        <p className="relative font-sans text-[13px] md:text-sm text-gray-600 max-w-lg">
          Questions about deals, partnerships, or your account? Real humans, real fast — we respond within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* "We're here to help" intro card (links to email) */}
        <a
          href="mailto:support@foundersprime.com"
          className="group lg:col-span-2 relative block bg-gradient-to-br from-gray-900 via-gray-900 to-black border-2 border-black shadow-[4px_4px_0px_#ffd700] md:shadow-[5px_5px_0px_#ffd700] p-4 md:p-5 overflow-hidden fp-fade-up"
          style={{ animationDelay: '0.05s' }}
        >
          <Mandala
            variant="rings"
            colorClass="text-accent-yellow"
            opacity={0.1}
            speed={80}
            className="absolute -top-10 -right-10 w-40 h-40"
          />
          <div className="relative">
            <p className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-accent-yellow mb-2">
              We&apos;re here to help
            </p>
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 md:size-12 bg-accent-yellow border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_rgba(255,221,0,0.35)]">
                <span className="material-symbols-outlined text-xl md:text-2xl text-black" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
              </div>
              <h2 className="font-mono text-base md:text-xl lg:text-2xl font-black text-white leading-tight group-hover:text-accent-yellow transition-colors">
                Let&apos;s build something great together.
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-gray-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
              Typically replies within 24 hours
            </div>
          </div>
        </a>

        {/* Trust stats card */}
        <div
          className="relative bg-white border-2 border-black shadow-[4px_4px_0px_#111] md:shadow-[5px_5px_0px_#111] p-4 md:p-5 overflow-hidden fp-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          <Mandala
            variant="orbital"
            colorClass="text-accent-yellow"
            opacity={0.08}
            speed={70}
            strokeWidth={0.7}
            className="absolute -bottom-10 -right-10 w-32 h-32"
          />
          <p className="relative font-mono text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
            Why reach out
          </p>
          <div className="relative space-y-2.5">
            {trustStats.map(({ value, label, icon }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="size-7 bg-accent-yellow/15 border border-black/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined !text-[15px] text-black">{icon}</span>
                </div>
                <div className="flex items-baseline justify-between gap-2 flex-1 border-b border-dashed border-black/10 pb-2">
                  <span className="font-mono text-base md:text-lg font-black text-black">{value}</span>
                  <span className="font-mono text-[9px] md:text-[10px] text-gray-500 uppercase tracking-wide">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
