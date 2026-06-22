import Link from 'next/link'
import Mandala from '@/components/ui/Mandala'

type MandalaVariant = 'rings' | 'orbital' | 'radial' | 'petal'

/* ─── Six category cards — light, compact, pastel + premium ornament ─── */
const categories: {
  name: string
  icon: string
  value: string
  desc: string
  href: string
  bg: string
  border: string
  darkBg: string
  darkBorder: string
  iconColor: string
  darkIconColor: string
  valueColor: string
  darkValueColor: string
  mandalaVariant: MandalaVariant
  mandalaColor: string
}[] = [
  {
    name: 'Cloud Credits',
    icon: 'cloud',
    value: 'Up to $200K+',
    desc: 'AWS, Google Cloud, Azure & more.',
    href: '/deals?category=cloud-credits',
    bg: 'bg-[#EAF1FB]',
    border: 'border-[#D2E2F6]',
    darkBg: 'dark:bg-blue-950/20',
    darkBorder: 'dark:border-blue-500/15',
    iconColor: 'text-blue-600',
    darkIconColor: 'dark:text-blue-400',
    valueColor: 'text-blue-700',
    darkValueColor: 'dark:text-blue-300',
    mandalaVariant: 'rings',
    mandalaColor: 'text-blue-500',
  },
  {
    name: 'Startup Grants',
    icon: 'redeem',
    value: 'Up to $10M+',
    desc: 'Non-dilutive grants for innovative founders.',
    href: '/programs?type=grants',
    bg: 'bg-[#E7F6EC]',
    border: 'border-[#CDEBD6]',
    darkBg: 'dark:bg-green-950/20',
    darkBorder: 'dark:border-green-500/15',
    iconColor: 'text-green-600',
    darkIconColor: 'dark:text-green-400',
    valueColor: 'text-green-700',
    darkValueColor: 'dark:text-green-300',
    mandalaVariant: 'petal',
    mandalaColor: 'text-green-500',
  },
  {
    name: 'SaaS & Tools',
    icon: 'apps',
    value: '200+',
    desc: 'Top tools & platforms at founder-friendly prices.',
    href: '/deals?category=saas-discounts',
    bg: 'bg-[#F2EAFB]',
    border: 'border-[#E2D2F3]',
    darkBg: 'dark:bg-purple-950/20',
    darkBorder: 'dark:border-purple-500/15',
    iconColor: 'text-purple-600',
    darkIconColor: 'dark:text-purple-400',
    valueColor: 'text-purple-700',
    darkValueColor: 'dark:text-purple-300',
    mandalaVariant: 'radial',
    mandalaColor: 'text-purple-500',
  },
  {
    name: 'Accelerators',
    icon: 'rocket_launch',
    value: '50+',
    desc: 'Top accelerator perks & benefits.',
    href: '/programs?type=accelerators',
    bg: 'bg-[#FDF4E3]',
    border: 'border-[#F4E3C0]',
    darkBg: 'dark:bg-amber-950/20',
    darkBorder: 'dark:border-amber-500/15',
    iconColor: 'text-amber-500',
    darkIconColor: 'dark:text-amber-400',
    valueColor: 'text-amber-700',
    darkValueColor: 'dark:text-amber-300',
    mandalaVariant: 'orbital',
    mandalaColor: 'text-amber-500',
  },
  {
    name: 'Founders Resources',
    icon: 'auto_awesome',
    value: '100+',
    desc: 'Curated resources to scale your startup faster.',
    href: '/resources',
    bg: 'bg-[#FEFBEA]',
    border: 'border-[#F0E7B5]',
    darkBg: 'dark:bg-yellow-950/20',
    darkBorder: 'dark:border-yellow-500/15',
    iconColor: 'text-yellow-500',
    darkIconColor: 'dark:text-yellow-400',
    valueColor: 'text-yellow-700',
    darkValueColor: 'dark:text-yellow-300',
    mandalaVariant: 'rings',
    mandalaColor: 'text-yellow-500',
  },
  {
    name: 'Student Benefits',
    icon: 'school',
    value: 'Students Only',
    desc: 'Accelerators, incubators, grants & programs for students.',
    href: '/student-benefits',
    bg: 'bg-[#EAF1FB]',
    border: 'border-[#D2E2F6]',
    darkBg: 'dark:bg-sky-950/20',
    darkBorder: 'dark:border-sky-500/15',
    iconColor: 'text-sky-600',
    darkIconColor: 'dark:text-sky-400',
    valueColor: 'text-sky-700',
    darkValueColor: 'dark:text-sky-300',
    mandalaVariant: 'petal',
    mandalaColor: 'text-sky-500',
  },
]

export default function SystemModules() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF7] dark:bg-[#050505] grid-bg dark:grid-bg-dark py-10 md:py-14 border-y border-black/5 dark:border-white/5 transition-colors duration-300">
      {/* ─── Ambient mandala ornaments + glow (decorative) ─── */}
      <Mandala
        variant="rings"
        colorClass="text-gray-900 dark:text-white"
        opacity={0.05}
        speed={130}
        direction="cw"
        className="hidden md:block absolute -top-32 -left-28 w-[26rem] h-[26rem]"
      />
      <Mandala
        variant="orbital"
        colorClass="text-accent-yellow"
        opacity={0.12}
        speed={150}
        direction="ccw"
        className="hidden md:block absolute -bottom-40 -right-28 w-[30rem] h-[30rem]"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 opacity-60"
        style={{ background: 'radial-gradient(60% 100% at 50% 0%, rgba(255,215,0,0.08), transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Header ─── */}
        <div className="flex items-end justify-between gap-4 mb-6 md:mb-8 fp-fade-up">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-black text-accent-yellow font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-[3px] mb-3">
              <span className="material-symbols-outlined !text-[12px]">bolt</span>
              Everything you need
            </span>
            <h2 className="font-mono font-black uppercase text-black dark:text-white tracking-tight leading-[1.05] text-2xl sm:text-3xl lg:text-[34px]">
              Every category. Every advantage.
            </h2>
            <p className="mt-2.5 font-mono text-[10.5px] md:text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              <span className="text-accent-yellow/90">//</span> Six curated tracks. One terminal for the entire founder stack.
            </p>
          </div>
          <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 flex-shrink-0 pb-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
            </span>
            Updated weekly
          </span>
        </div>

        {/* ─── Category grid ─── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((c, i) => {
            const mobileColorMap: Record<string, string> = {
              'Cloud Credits': 'text-blue-400',
              'Startup Grants': 'text-green-400',
              'SaaS & Tools': 'text-purple-400',
              'Accelerators': 'text-amber-400',
              'Founders Resources': 'text-yellow-400',
              'Student Benefits': 'text-sky-400',
            }
            const brandCol = mobileColorMap[c.name] || 'text-white'

            return (
              <div
                key={c.name}
                style={{ animationDelay: `${0.08 + i * 0.06}s` }}
                className={`group fp-fade-up relative flex flex-col overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 bg-[#0d0d0d] border border-white/10 md:bg-[#FAFAF7] md:dark:bg-[#050505] md:border-t-4 md:border-x-0 md:border-b-0 md:${c.border} md:dark:${c.darkBorder} md:${c.bg} md:dark:${c.darkBg} hover:shadow-[0_14px_34px_rgba(0,0,0,0.10)] dark:hover:shadow-[0_14px_34px_rgba(255,255,255,0.03)]`}
              >
                {/* Subtle dots matrix pattern overlay */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.03] transition-opacity duration-300 group-hover:opacity-[0.12] dark:group-hover:opacity-[0.08] ${c.iconColor} ${c.darkIconColor} hidden md:block`}
                  style={{
                    backgroundImage: 'radial-gradient(currentColor 0.75px, transparent 0.75px)',
                    backgroundSize: '8px 8px',
                  }}
                />

                {/* Inset dashed ring */}
                <div className={`absolute inset-[6px] rounded-[10px] border border-dashed opacity-20 dark:opacity-[0.08] group-hover:opacity-40 transition-opacity ${c.border} ${c.darkBorder} hidden md:block`} aria-hidden="true" />

                {/* mandala watermark (decorative) */}
                <div className="pointer-events-none absolute -bottom-7 -right-7 w-24 h-24 opacity-70 transition-opacity duration-500 group-hover:opacity-100 hidden md:block">
                  <Mandala
                    variant={c.mandalaVariant}
                    colorClass={c.mandalaColor}
                    opacity={0.14}
                    speed={70 + i * 12}
                    direction={i % 2 === 0 ? 'cw' : 'ccw'}
                    className="w-full h-full"
                  />
                </div>

                {/* index tick */}
                <span className="absolute top-3 right-3 font-mono text-[9px] font-bold tracking-widest text-white/40 md:text-black/25 md:dark:text-white/20">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* icon + name */}
                <div className="relative flex items-center gap-2 mb-3">
                  <span className={`w-7 h-7 rounded-lg bg-white/5 border border-white/10 ${brandCol} md:bg-white md:dark:bg-white/5 md:border-black/5 md:dark:border-white/10 md:${c.iconColor} md:dark:${c.darkIconColor} shadow-sm flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
                    <span className="material-symbols-outlined !text-[16px]">{c.icon}</span>
                  </span>
                  <h3 className="font-mono text-[10.5px] font-black uppercase tracking-wide text-white md:text-black md:dark:text-white leading-tight">
                    {c.name}
                  </h3>
                </div>

                {/* value */}
                <p className={`relative font-mono font-black text-sm mb-1.5 ${brandCol} md:${c.valueColor} md:dark:${c.darkValueColor}`}>{c.value}</p>

                {/* description */}
                <p className="relative font-sans text-[12px] text-gray-400 md:text-gray-600 md:dark:text-gray-400 leading-snug mb-4">{c.desc}</p>

                {/* explore */}
                <Link
                  href={c.href}
                  aria-label={`Explore ${c.name}`}
                  className="relative mt-auto inline-flex items-center gap-1 self-start rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-sm hover:bg-white hover:text-black md:border-black/15 md:dark:border-white/10 md:bg-white/70 md:dark:bg-white/5 md:text-black md:dark:text-white md:hover:bg-black md:hover:text-white md:dark:hover:bg-white md:dark:hover:text-black transition-all duration-300"
                >
                  Explore
                  <span className="material-symbols-outlined !text-[13px] transition-transform group-hover:translate-x-0.5">arrow_forward</span>
                </Link>
              </div>
            )
          })}
        </div>

        {/* ─── Bottom CTA banner — premium dark ─── */}
        <div className="hidden md:flex fp-fade-up relative mt-5 md:mt-6 overflow-hidden rounded-2xl bg-black dark:bg-[#0c0c0c] border-2 border-black dark:border-white/20 shadow-[4px_4px_0px_#ffd700] dark:shadow-[4px_4px_0px_rgba(255,215,0,0.15)] px-5 md:px-7 py-4.5 flex-col sm:flex-row items-center justify-between gap-3" style={{ animationDelay: '0.5s' }}>
          {/* embedded mandalas */}
          <Mandala
            variant="orbital"
            colorClass="text-accent-yellow"
            opacity={0.16}
            speed={90}
            direction="cw"
            className="pointer-events-none absolute -right-10 -top-12 w-44 h-44"
          />
          <Mandala
            variant="rings"
            colorClass="text-white"
            opacity={0.06}
            speed={120}
            direction="ccw"
            className="pointer-events-none absolute -left-14 -bottom-16 w-48 h-48 hidden sm:block"
          />

          <p className="relative font-sans text-sm md:text-[15px] text-white text-center sm:text-left flex items-center gap-2">
            <span className="material-symbols-outlined !text-[18px] text-accent-yellow flex-shrink-0 animate-pulse-subtle">bolt</span>
            Unlock up to <span className="font-mono font-black text-accent-yellow">$500K+</span> in perks and credits.
          </p>
          <Link
            href="/pricing"
            className="group/cta relative inline-flex items-center justify-center gap-1.5 w-full sm:w-auto rounded-md bg-accent-yellow text-black font-mono font-black text-xs uppercase tracking-[0.06em] px-5 py-2.5 border border-black shadow-[2px_2px_0px_#000] hover:bg-white hover:shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all whitespace-nowrap"
          >
            Unlock full access
            <span className="material-symbols-outlined !text-[16px] transition-transform group-hover/cta:translate-x-0.5">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
