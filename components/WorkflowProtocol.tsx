'use client'

/* ─── Minimalist tech mandalas — one per workflow step ─── */
const stepMandalas: Record<string, JSX.Element> = {
  '01': (
    /* See it — radar / discovery sweep */
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.7">
      <circle cx="100" cy="100" r="40" />
      <circle cx="100" cy="100" r="60" strokeDasharray="3 3" />
      <circle cx="100" cy="100" r="80" strokeDasharray="1 5" />
      <line x1="100" y1="100" x2="100" y2="20" strokeWidth="1.2" />
      <line x1="100" y1="100" x2="170" y2="80" strokeDasharray="2 4" />
      <line x1="100" y1="100" x2="60" y2="160" strokeDasharray="2 4" />
      <circle cx="100" cy="20" r="3" fill="currentColor" />
      <circle cx="170" cy="80" r="2" fill="currentColor" />
      <circle cx="60" cy="160" r="2" fill="currentColor" />
      <circle cx="135" cy="135" r="2" fill="currentColor" />
      <circle cx="100" cy="100" r="3" fill="currentColor" />
    </svg>
  ),
  '02': (
    /* Match it — funnel / filter */
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.7">
      {/* Inverted funnel shape */}
      <polygon points="40,40 160,40 120,100 120,170 80,170 80,100" />
      {/* Mesh fill lines */}
      {[50, 65, 80, 95].map((y, i) => (
        <line
          key={y}
          x1={40 + i * 8}
          y1={y}
          x2={160 - i * 8}
          y2={y}
          strokeDasharray="2 4"
        />
      ))}
      {/* Inputs */}
      {[55, 80, 105, 130, 155].map((x) => (
        <circle key={x} cx={x} cy="30" r="2.5" fill="currentColor" />
      ))}
      {/* Output */}
      <circle cx="100" cy="180" r="3" fill="currentColor" />
      <line x1="100" y1="170" x2="100" y2="180" strokeDasharray="1 3" />
    </svg>
  ),
  '03': (
    /* Claim it — bolt with energy rings */
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.7">
      <circle cx="100" cy="100" r="50" strokeDasharray="2 4" />
      <circle cx="100" cy="100" r="70" strokeDasharray="1 6" />
      {/* Lightning bolt */}
      <polygon points="105,55 80,110 100,110 92,150 130,90 110,90 115,55" strokeWidth="1.2" />
      {/* Surrounding spark dots */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <circle
          key={deg}
          cx={100 + Math.cos((deg * Math.PI) / 180) * 70}
          cy={100 + Math.sin((deg * Math.PI) / 180) * 70}
          r="2.5"
          fill="currentColor"
        />
      ))}
    </svg>
  ),
}

export default function WorkflowProtocol() {
  const steps = [
    {
      number: '01',
      icon: 'search',
      title: 'See it',
      headline: 'Every deal that matters, in one place.',
      description: '500+ verified credits, grants, and programs — sorted by category, stage, and intent. No more 40 open tabs.',
      bg: 'bg-accent-yellow',
      accent: 'bg-orange-400',
      mandalaColor: 'text-orange-700',
    },
    {
      number: '02',
      icon: 'filter_alt',
      title: 'Match it',
      headline: 'Skip what you can\'t apply to.',
      description: 'Filter by stage, geography, and eligibility. Stop wasting weeks on programs that were never going to say yes.',
      bg: 'bg-blue-100',
      accent: 'bg-blue-500',
      mandalaColor: 'text-blue-700',
    },
    {
      number: '03',
      icon: 'bolt',
      title: 'Claim it',
      headline: 'Apply before the window closes.',
      description: 'Direct apply links. Deadlines surfaced upfront. Pro tips inside every listing — so you actually get accepted.',
      bg: 'bg-green-100',
      accent: 'bg-green-500',
      mandalaColor: 'text-green-700',
    },
  ]

  return (
    <section className="relative py-8 md:py-14 border-b-2 border-black bg-gradient-to-b from-white to-gray-50 overflow-hidden grid-bg">
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <span className="inline-flex items-center gap-1.5 bg-black text-accent-yellow font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border border-black mb-3">
            <span className="material-symbols-outlined text-[12px]">route</span>
            How it works
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-black mb-2 leading-tight font-mono uppercase">
            From scrolling Twitter<br className="md:hidden" /> to closing $50K credits<br />
            <span className="bg-gradient-to-r from-accent-yellow via-yellow-300 to-orange-400 bg-clip-text text-transparent">
              in three steps.
            </span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto font-sans">
            No demos. No sales calls. No 14-day trials. Just direct apply links and deadlines you can actually hit.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
          {/* Connector dotted line on desktop */}
          <div
            className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 -z-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, #000, #000 4px, transparent 4px, transparent 10px)',
              opacity: 0.3,
            }}
          />

          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              <div
                className={`relative ${step.bg} border-2 border-black p-5 md:p-6 shadow-[4px_4px_0px_#111] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111] transition-all overflow-hidden group h-full flex flex-col`}
              >
                {/* Decorative blob */}
                <div
                  className={`absolute -top-8 -right-8 w-28 h-28 ${step.accent} opacity-20 rounded-full blur-3xl group-hover:opacity-40 transition-opacity pointer-events-none`}
                />

                {/* Minimalist tech mandala — visible, slow rotation */}
                <div
                  className={`absolute -bottom-14 -right-14 w-52 h-52 ${step.mandalaColor} opacity-[0.32] group-hover:opacity-[0.5] group-hover:rotate-[18deg] transition-all duration-700 ease-out pointer-events-none mandala-spin-workflow`}
                >
                  {stepMandalas[step.number]}
                </div>

                {/* Number + icon row */}
                <div className="relative flex items-start justify-between mb-3">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-black border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#111]">
                    <span className="material-symbols-outlined text-xl md:text-2xl text-accent-yellow">{step.icon}</span>
                  </div>
                  <span className="font-mono text-3xl md:text-5xl font-black text-black/15 leading-none">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="relative font-mono font-black text-lg md:text-2xl uppercase text-black mb-1.5">
                  {step.title}
                </h3>

                {/* Headline */}
                <p className="relative font-sans font-bold text-sm md:text-base text-black mb-2">
                  {step.headline}
                </p>

                {/* Description */}
                <p className="relative font-sans text-xs md:text-sm text-gray-700 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow connector — desktop only, between cards */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-7 h-7 bg-black border-2 border-black items-center justify-center shadow-[2px_2px_0px_#111]">
                  <span className="material-symbols-outlined text-base text-accent-yellow">arrow_forward</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes mandalaSpinWorkflow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .mandala-spin-workflow {
          animation: mandalaSpinWorkflow 70s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .mandala-spin-workflow {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
