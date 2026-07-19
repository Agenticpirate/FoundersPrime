import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FlashHero from '@/components/flash/FlashHero'
import FlashDealsBrowse from '@/components/flash/FlashDealsBrowse'
import FlashPremiumCTA from '@/components/flash/FlashPremiumCTA'
import PageBreadcrumb from '@/components/ui/PageBreadcrumb'
import { flashDeals } from '@/data/flash-deals'

export const metadata = {
  title: 'Flash Deals — Limited-Time Startup Offers',
  description:
    'Limited-time flash deals on top startup tools and credits. Membership not required — sign up free and claim. New drops every Monday & Thursday.',
  alternates: {
    canonical: 'https://www.foundersprime.com/flash-deals',
  },
}

// Render per-request (no full-route CDN cache). Flash deals are time-sensitive.
export const dynamic = 'force-dynamic'

const FEATURES = [
  {
    icon: 'lock_open',
    title: 'No membership needed',
    sub: 'Sign up free & claim deals',
    color: 'rgba(34,197,94,0.15)',
    glow: 'rgba(34,197,94,0.35)',
    iconColor: '#22c55e',
  },
  {
    icon: 'schedule',
    title: 'Limited time only',
    sub: "Timers don't lie — claim fast",
    color: 'rgba(255,215,0,0.15)',
    glow: 'rgba(255,215,0,0.35)',
    iconColor: '#FFD700',
  },
  {
    icon: 'verified_user',
    title: 'Handpicked offers',
    sub: 'Vetted by founders, not spam',
    color: 'rgba(59,130,246,0.15)',
    glow: 'rgba(59,130,246,0.3)',
    iconColor: '#3b82f6',
  },
  {
    icon: 'autorenew',
    title: 'New drops weekly',
    sub: 'Monday & Thursday refresh',
    color: 'rgba(168,85,247,0.15)',
    glow: 'rgba(168,85,247,0.3)',
    iconColor: '#a855f7',
  },
]

const STATS = [
  { icon: 'group', value: '10,000+', sub: 'Founders saving big', color: '#FFD700' },
  { icon: 'savings', value: '$20M+', sub: 'Saved by our community', color: '#22c55e' },
  { icon: 'bolt', value: String(flashDeals.length), sub: 'Live flash deals now', color: '#f97316' },
  { icon: 'support_agent', value: '24/7', sub: "We're here to help", color: '#a855f7' },
]

export default function FlashDealsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-[#000000] text-gray-900 dark:text-white transition-colors duration-300 overflow-x-hidden">
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] dark:opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden
      />

      <Header />

      <main className="flex-1 relative z-10">
        <div className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 md:pt-5">
          <PageBreadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Flash Deals', icon: 'bolt' },
            ]}
          />
        </div>

        <FlashHero />

        {/* Feature strip — denser on mobile */}
        <section className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8 pb-1 sm:pb-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#080808] overflow-hidden divide-y divide-x divide-gray-200 dark:divide-white/[0.07] lg:divide-y-0 shadow-sm">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group relative flex items-center gap-2 sm:gap-3 px-2.5 py-2.5 sm:px-4 sm:py-4 md:px-5 hover:bg-gray-50 dark:hover:bg-white/[0.025] transition-colors"
              >
                <span
                  className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 flex items-center justify-center rounded-lg sm:rounded-xl border transition-transform group-hover:scale-105"
                  style={{
                    background: f.color,
                    borderColor: f.glow,
                    boxShadow: `0 0 14px ${f.glow}`,
                  }}
                >
                  <span
                    className="material-symbols-outlined text-[15px] sm:text-[18px]"
                    style={{
                      color: f.iconColor,
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    {f.icon}
                  </span>
                </span>
                <div className="min-w-0">
                  <p className="font-mono font-black text-[9px] sm:text-[10px] uppercase tracking-[0.08em] text-gray-900 dark:text-white leading-tight">
                    {f.title}
                  </p>
                  <p className="font-sans text-[10px] sm:text-[11px] text-gray-600 dark:text-gray-500 leading-tight mt-0.5 line-clamp-1">
                    {f.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <FlashDealsBrowse />

        <FlashPremiumCTA />

        {/* How it works */}
        <section className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className="rounded-xl sm:rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-gray-50 dark:bg-[#0a0a0a] p-3.5 sm:p-5 md:p-8">
            <div className="flex items-center gap-2 mb-3.5 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow" />
              <h2 className="font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-[0.14em] text-gray-600 dark:text-gray-400">
                How flash deals work
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6">
              {[
                {
                  step: '01',
                  icon: 'visibility',
                  title: 'Spot a deal',
                  body: 'Browse live offers with countdowns. Hot = high demand.',
                },
                {
                  step: '02',
                  icon: 'login',
                  title: 'Sign up free',
                  body: 'No membership needed for flash. Sign in and claim.',
                },
                {
                  step: '03',
                  icon: 'redeem',
                  title: 'Claim before zero',
                  body: 'Follow deal steps. When the timer ends, it’s gone.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] p-3 sm:p-4 md:p-5"
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-accent-yellow/12 border border-accent-yellow/25 text-amber-700 dark:text-accent-yellow">
                      <span className="material-symbols-outlined !text-[16px] sm:!text-[18px]">
                        {item.icon}
                      </span>
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] font-black text-gray-300 dark:text-zinc-700">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-mono text-[11px] sm:text-[12px] font-black uppercase tracking-wide text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[11.5px] sm:text-[12.5px] text-gray-600 dark:text-zinc-400 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-t border-gray-200 dark:border-white/[0.07] bg-gray-50 dark:bg-[#080808]">
          <div className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y divide-x divide-gray-200 dark:divide-white/[0.07] lg:divide-y-0">
            {STATS.map((s) => (
              <div
                key={s.sub}
                className="flex items-center gap-2 sm:gap-3.5 py-2.5 sm:py-4 lg:py-0 px-2.5 sm:px-4 lg:px-6 first:pl-0 last:pr-0"
              >
                <span
                  className="material-symbols-outlined text-[20px] sm:text-[26px] flex-shrink-0"
                  style={{
                    color: s.color,
                    fontVariationSettings: "'FILL' 1",
                    filter: `drop-shadow(0 0 6px ${s.color}55)`,
                  }}
                >
                  {s.icon}
                </span>
                <div className="min-w-0">
                  <p className="font-mono font-black text-base sm:text-xl text-gray-900 dark:text-white leading-none tabular-nums">
                    {s.value}
                  </p>
                  <p className="font-sans text-[10px] sm:text-[11px] text-gray-600 dark:text-gray-500 mt-0.5 sm:mt-1 leading-tight line-clamp-1">
                    {s.sub}
                  </p>
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
