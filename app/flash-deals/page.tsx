import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FlashHero from '@/components/flash/FlashHero'
import FlashDealsBrowse from '@/components/flash/FlashDealsBrowse'
import FlashPremiumCTA from '@/components/flash/FlashPremiumCTA'


export const metadata = {
  title: 'Flash Deals — Limited-Time Startup Offers',
  description:
    'Limited-time flash deals on top startup tools and credits. New deals drop every Monday & Thursday — gone when the timer hits zero.',
  alternates: {
    canonical: 'https://www.foundersprime.com/flash-deals',
  },
}

// Render per-request (no full-route CDN cache). Flash deals are time-sensitive.
export const dynamic = 'force-dynamic'

const FEATURES = [
  {
    icon: 'schedule',
    title: 'Limited Time Only',
    sub: "Deals won't last forever",
    color: 'rgba(255,215,0,0.15)',
    glow: 'rgba(255,215,0,0.3)',
  },
  {
    icon: 'verified_user',
    title: 'Handpicked Offers',
    sub: 'Vetted by founders',
    color: 'rgba(59,130,246,0.15)',
    glow: 'rgba(59,130,246,0.3)',
  },
  {
    icon: 'local_offer',
    title: 'Massive Savings',
    sub: 'Up to 90% off',
    color: 'rgba(34,197,94,0.15)',
    glow: 'rgba(34,197,94,0.3)',
  },
  {
    icon: 'autorenew',
    title: 'New Deals Weekly',
    sub: 'Fresh drops every week',
    color: 'rgba(168,85,247,0.15)',
    glow: 'rgba(168,85,247,0.3)',
  },
]

const STATS = [
  { icon: 'group', value: '10,000+', sub: 'Founders saving big', color: '#FFD700' },
  { icon: 'savings', value: '$20M+', sub: 'Saved by our community', color: '#22c55e' },
  { icon: 'calendar_month', value: '1,000+', sub: 'Deals & programs', color: '#3b82f6' },
  { icon: 'support_agent', value: '24/7', sub: "We're here to help", color: '#a855f7' },
]

export default function FlashDealsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-[#000000] text-gray-900 dark:text-white transition-colors duration-300 overflow-x-hidden">
      {/* Subtle grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <Header />

      <main className="flex-1 relative z-10">
        {/* Breadcrumb */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <nav className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-gray-500">
            <Link href="/" className="hover:text-accent-yellow transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[13px] text-gray-400">chevron_right</span>
            <span className="text-gray-450 dark:text-gray-400">Flash Deals</span>
          </nav>
        </div>

        <FlashHero />

        {/* ── Feature strip ── */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-[#080808] divide-y divide-x divide-gray-200 dark:divide-white/[0.07] lg:divide-y-0 overflow-hidden">
            {FEATURES.map((f) => (
              <div key={f.title} className="group relative flex items-center gap-3 px-4 py-4 md:px-5 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                {/* Icon */}
                <span
                  className="w-9 h-9 flex-shrink-0 flex items-center justify-center border"
                  style={{
                    background: f.color,
                    borderColor: f.glow.replace('0.3', '0.4'),
                    boxShadow: `0 0 10px ${f.glow}`,
                  }}
                >
                  <span
                    className="material-symbols-outlined text-[17px]"
                    style={{
                      color: f.glow.replace('0.3)', '1)').replace('rgba(', 'rgb('),
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    {f.icon}
                  </span>
                </span>
                <div className="min-w-0">
                  <p className="font-mono font-black text-[10px] uppercase tracking-[0.1em] text-gray-900 dark:text-white leading-tight">
                    {f.title}
                  </p>
                  <p className="font-sans text-[11px] text-gray-600 dark:text-gray-500 leading-tight mt-0.5">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>



        <FlashDealsBrowse />

        <FlashPremiumCTA />

        {/* ── Stats strip ── */}
        <section className="border-t border-gray-200 dark:border-white/[0.07] bg-gray-50 dark:bg-[#080808]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 divide-y divide-x divide-gray-200 dark:divide-white/[0.07] lg:divide-y-0">
            {STATS.map((s) => (
              <div key={s.sub} className="flex items-center gap-3.5 py-4 lg:py-0 px-4 lg:px-6 first:pl-0 last:pr-0">
                <span
                  className="material-symbols-outlined text-[28px] flex-shrink-0"
                  style={{
                    color: s.color,
                    fontVariationSettings: "'FILL' 1",
                    filter: `drop-shadow(0 0 6px ${s.color}60)`,
                  }}
                >
                  {s.icon}
                </span>
                <div>
                  <p className="font-mono font-black text-xl text-gray-900 dark:text-white leading-none">{s.value}</p>
                  <p className="font-sans text-[11px] text-gray-600 dark:text-gray-500 mt-1 leading-none">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
