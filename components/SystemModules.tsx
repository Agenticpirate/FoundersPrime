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
    <section className="relative overflow-hidden bg-black grid-bg-dark py-12 md:py-16 border-y border-white/5">
      {/* ─── Ambient ornaments (subtle, dark layout) ─── */}
      <Mandala
        variant="rings"
        colorClass="text-white"
        opacity={0.03}
        speed={130}
        direction="cw"
        className="hidden md:block absolute -top-32 -left-28 w-[26rem] h-[26rem]"
      />
      <Mandala
        variant="orbital"
        colorClass="text-accent-yellow"
        opacity={0.06}
        speed={150}
        direction="ccw"
        className="hidden md:block absolute -bottom-40 -right-28 w-[30rem] h-[30rem]"
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Header ─── */}
        <div className="flex items-end justify-between gap-4 mb-8 fp-fade-up">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-accent-yellow font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-[3px] mb-3">
              <span className="material-symbols-outlined !text-[12px]">bolt</span>
              Everything you need
            </span>
            <h2 className="font-mono font-black uppercase text-white tracking-tight leading-[1.05] text-2xl sm:text-3xl lg:text-[34px]">
              Every category. Every advantage.
            </h2>
            <p className="mt-2.5 font-mono text-[10.5px] md:text-[11px] uppercase tracking-[0.2em] text-gray-400">
              <span className="text-accent-yellow/90">//</span> Six curated tracks. One terminal for the entire founder stack.
            </p>
          </div>
          <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400 flex-shrink-0 pb-1">
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
                className="group fp-fade-up relative flex flex-col overflow-hidden rounded-2xl p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 bg-[#0d0d0d] border border-white/10 hover:border-accent-yellow/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
              >
                {/* index tick */}
                <span className="absolute top-3.5 right-3.5 font-mono text-[9px] font-bold tracking-widest text-white/20">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* icon + name */}
                <div className="relative flex items-center gap-2.5 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <span className={`material-symbols-outlined !text-[16px] ${brandCol}`}>{c.icon}</span>
                  </span>
                  <h3 className="font-sans font-bold text-[13.5px] text-white leading-tight">
                    {c.name}
                  </h3>
                </div>

                {/* value */}
                <p className={`relative font-mono font-black text-sm md:text-base my-1.5 ${brandCol}`}>{c.value}</p>

                {/* description */}
                <p className="relative font-sans text-[12px] text-gray-400 leading-snug mb-4">{c.desc}</p>

                {/* explore */}
                <Link
                  href={c.href}
                  aria-label={`Explore ${c.name}`}
                  className="relative mt-auto inline-flex items-center gap-1 self-start rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 font-mono text-[9.5px] font-black uppercase tracking-wider text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                >
                  Explore
                  <span className="material-symbols-outlined !text-[12px] transition-transform group-hover:translate-x-0.5">arrow_forward</span>
                </Link>
              </div>
            )
          })}
        </div>

        {/* ─── Bottom CTA banner — premium dark ─── */}
        <div className="hidden md:flex fp-fade-up relative mt-6 overflow-hidden rounded-2xl bg-black border-2 border-white/10 shadow-[4px_4px_0px_rgba(255,215,0,0.15)] px-5 md:px-7 py-4.5 flex-col sm:flex-row items-center justify-between gap-3" style={{ animationDelay: '0.5s' }}>
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

