import Mandala from '@/components/ui/Mandala'

export default function ContactHero() {
  const trustStats = [
    { value: '< 24h', label: 'Avg. response', icon: 'schedule' },
    { value: '7 days', label: 'We monitor', icon: 'calendar_month' },
    { value: '100%', label: 'Human replies', icon: 'support_agent' },
  ]

  return (
    <div className="relative mb-6 md:mb-8">
      {/* Page heading */}
      <div className="mb-4 md:mb-6 fp-fade-up">
        <div className="inline-flex items-center gap-1.5 border-2 border-black bg-accent-yellow px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-2.5 shadow-[2px_2px_0px_#111]">
          <span className="material-symbols-outlined !text-[12px]">mail</span>
          Contact
        </div>
        <h1 className="font-mono text-3xl md:text-5xl font-black tracking-tight text-black mb-2 leading-[1.05] uppercase">
          Get In <span className="bg-black text-primary px-2">Touch</span>
        </h1>
        <p className="font-sans text-sm md:text-base text-gray-600 max-w-xl">
          Questions about deals, partnerships, or your account? Real humans, real fast — we respond within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Prominent Email Contact Card */}
        <div
          className="lg:col-span-2 relative bg-gradient-to-br from-gray-900 via-gray-900 to-black border-2 border-black shadow-[4px_4px_0px_#ffd700] md:shadow-[6px_6px_0px_#ffd700] p-5 md:p-8 overflow-hidden fp-fade-up"
          style={{ animationDelay: '0.05s' }}
        >
          <Mandala
            variant="rings"
            colorClass="text-accent-yellow"
            opacity={0.1}
            speed={80}
            className="absolute -top-10 -right-10 w-48 h-48"
          />
          <Mandala
            variant="petal"
            colorClass="text-white"
            opacity={0.05}
            speed={110}
            direction="ccw"
            className="absolute -bottom-12 -left-12 w-40 h-40 hidden md:block"
          />
          <div className="relative flex items-start gap-3 md:gap-6">
            {/* Icon */}
            <div className="size-11 md:size-16 bg-accent-yellow border-2 md:border-[3px] border-black flex items-center justify-center flex-shrink-0 shadow-[3px_3px_0px_rgba(255,221,0,0.35)]">
              <span className="material-symbols-outlined text-2xl md:text-3xl text-black">email</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-mono text-xs md:text-sm font-bold text-gray-400 mb-1 uppercase tracking-wide">
                Email Us
              </h3>
              <a
                href="mailto:support@foundersprime.com"
                className="font-mono text-base md:text-2xl lg:text-3xl font-black text-accent-yellow hover:text-white transition-colors break-all block mb-2"
              >
                support@foundersprime.com
              </a>
              <div className="inline-flex items-center gap-1.5 font-mono text-[10px] md:text-xs text-gray-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
                Typically replies within 24 hours
              </div>
            </div>
          </div>
        </div>

        {/* Trust stats card */}
        <div
          className="relative bg-white border-2 border-black shadow-[4px_4px_0px_#111] md:shadow-[6px_6px_0px_#111] p-5 md:p-6 overflow-hidden fp-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          <Mandala
            variant="orbital"
            colorClass="text-primary"
            opacity={0.08}
            speed={70}
            strokeWidth={0.7}
            className="absolute -bottom-10 -right-10 w-36 h-36"
          />
          <p className="relative font-mono text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 md:mb-4">
            Why reach out
          </p>
          <div className="relative space-y-3">
            {trustStats.map(({ value, label, icon }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="size-8 bg-accent-yellow/15 border border-black/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined !text-[16px] text-black">{icon}</span>
                </div>
                <div className="flex items-baseline justify-between gap-2 flex-1 border-b border-dashed border-black/10 pb-2">
                  <span className="font-mono text-lg md:text-xl font-black text-black">{value}</span>
                  <span className="font-mono text-[10px] md:text-xs text-gray-500 uppercase tracking-wide">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
