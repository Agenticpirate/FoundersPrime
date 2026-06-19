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

const FEATURES = [
  { icon: 'schedule', title: 'Limited Time Only', sub: "Deals won't last forever" },
  { icon: 'verified_user', title: 'Handpicked Offers', sub: 'Vetted by founders' },
  { icon: 'local_offer', title: 'Massive Savings', sub: 'Up to 90% off' },
  { icon: 'autorenew', title: 'New Deals Weekly', sub: 'Fresh drops every week' },
]

const STATS = [
  { icon: 'group', value: '10,000+', sub: 'Founders saving big' },
  { icon: 'savings', value: '$20M+', sub: 'Saved by our community' },
  { icon: 'calendar_month', value: '1,000+', sub: 'Deals & programs' },
  { icon: 'support_agent', value: '24/7', sub: "We're here to help" },
]

export default function FlashDealsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#050505] text-white overflow-x-hidden grid-bg-dark">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-gray-500">
            <Link href="/" className="hover:text-accent-yellow transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-gray-300">Flash Deals</span>
          </nav>
        </div>

        <FlashHero />

        {/* Feature strip */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="border border-white/10 rounded-2xl bg-white/[0.02] grid grid-cols-2 lg:grid-cols-4 divide-y divide-x divide-white/10 lg:divide-y-0 overflow-hidden">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-center gap-3 px-4 py-4 md:px-5">
                <span className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-md border border-accent-yellow/30 bg-accent-yellow/[0.06]">
                  <span className="material-symbols-outlined text-accent-yellow text-[18px]">{f.icon}</span>
                </span>
                <div className="min-w-0">
                  <p className="font-mono font-black text-[11px] uppercase tracking-[0.08em] text-white leading-tight">
                    {f.title}
                  </p>
                  <p className="font-sans text-[11px] text-gray-500 leading-tight mt-0.5">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <FlashDealsBrowse />

        <FlashPremiumCTA />

        {/* Stats strip */}
        <section className="border-t border-white/10 bg-white/[0.02]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.sub} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-accent-yellow text-[26px]">{s.icon}</span>
                <div>
                  <p className="font-mono font-black text-lg md:text-xl text-white leading-none">{s.value}</p>
                  <p className="font-sans text-[12px] text-gray-500 mt-1">{s.sub}</p>
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
