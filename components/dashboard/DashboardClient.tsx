'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import ProfileManager from './ProfileManager'
import SavedDealsSection from './SavedDealsSection'
import DashboardMandala from './DashboardMandala'
import BillingPanel from './BillingPanel'

type Tab = 'overview' | 'billing' | 'account'

interface DashboardClientProps {
  userName: string
  userEmail: string
  memberSince: string
  memberSinceFull: string
  avatarUrl: string | null
  isPro: boolean
  isAdmin: boolean
  savedDealSlugs: string[]
  subscription: any
  initialTab: Tab
}

export default function DashboardClient({
  userName,
  userEmail,
  memberSince,
  memberSinceFull,
  avatarUrl,
  isPro,
  isAdmin,
  savedDealSlugs,
  subscription,
  initialTab,
}: DashboardClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<Tab>(initialTab)

  const firstName = userName.split(' ')[0]
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const planLabel = isAdmin ? 'Admin' : isPro ? 'Founder' : 'Free'

  // Sync tab to URL without full reload
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (tab === 'overview') {
      params.delete('tab')
    } else {
      params.set('tab', tab)
    }
    const qs = params.toString()
    const url = qs ? `/dashboard?${qs}` : '/dashboard'
    window.history.replaceState(null, '', url)
  }, [tab, searchParams])

  const handleTabChange = useCallback((newTab: Tab) => {
    setTab(newTab)
    // Scroll to tab content area on mobile for clarity
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      const el = document.getElementById('dashboard-tab-content')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'billing', label: 'Billing', icon: 'credit_card' },
    { id: 'account', label: 'Account', icon: 'person' },
  ]

  return (
    <>
      {/* ── Premium dark hero ── */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white border-b-2 border-accent-yellow overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-accent-yellow/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <DashboardMandala />

        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] text-accent-yellow inline-flex items-center gap-1.5 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow animate-pulse" />
                {greeting}
              </p>
              <h1 className="font-mono text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight">
                Hey, <span className="text-accent-yellow">{firstName}</span>
              </h1>
              <p className="text-gray-400 text-[12px] md:text-[13px] mt-2 font-mono truncate inline-flex items-center gap-1.5 flex-wrap">
                <span className="material-symbols-outlined !text-[14px] text-gray-500">mail</span>
                {userEmail}
                <span className="text-gray-600">·</span>
                <span className="material-symbols-outlined !text-[14px] text-gray-500">calendar_today</span>
                Member since {memberSince}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border-2 border-white/15 hover:border-accent-yellow rounded-sm font-mono text-[10px] font-black uppercase tracking-[0.12em] text-white transition-colors"
                >
                  <span className="material-symbols-outlined !text-[12px]">admin_panel_settings</span>
                  Admin Panel
                </Link>
              )}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-mono text-[10px] font-black uppercase tracking-[0.12em] border-2 ${
                  isPro
                    ? 'bg-accent-yellow text-black border-black shadow-[2px_2px_0px_rgba(255,221,0,0.4)]'
                    : 'bg-white/5 text-white border-white/20'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isPro ? 'bg-black' : 'bg-emerald-500 animate-pulse'}`} />
                {planLabel}
              </div>
            </div>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3 mt-6">
            {[
              { label: 'Deals Claimed', value: '0', icon: 'rocket_launch', color: 'text-accent-yellow' },
              { label: 'Estimated Savings', value: '$0', icon: 'savings', color: 'text-emerald-400' },
              { label: 'Saved for Later', value: String(savedDealSlugs.length), icon: 'bookmark', color: 'text-sky-400' },
              { label: 'Active Plan', value: planLabel, icon: 'workspace_premium', color: 'text-pink-400' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2.5 px-3 py-2.5 bg-white/5 backdrop-blur-sm border border-white/15 rounded-sm hover:bg-white/10 transition-colors"
              >
                <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className={`material-symbols-outlined !text-[16px] ${stat.color}`}>{stat.icon}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[8.5px] font-bold uppercase tracking-[0.12em] text-gray-400 truncate">
                    {stat.label}
                  </p>
                  <p className={`font-mono text-base font-black leading-none mt-0.5 tabular-nums ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tab navigation — sticky right under hero ── */}
      <div className="sticky top-14 md:top-16 z-30 bg-[#fafafa] border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex gap-1 md:gap-2 overflow-x-auto mobile-scroll-hide" role="tablist">
            {tabs.map((t) => {
              const active = tab === t.id
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleTabChange(t.id)}
                  className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-3 md:py-3.5 font-mono text-[11px] md:text-[12px] font-black uppercase tracking-[0.08em] whitespace-nowrap transition-all border-b-[3px] ${
                    active
                      ? 'text-black border-accent-yellow'
                      : 'text-gray-500 border-transparent hover:text-black hover:border-gray-300'
                  }`}
                >
                  <span className={`material-symbols-outlined !text-[16px] ${active ? 'text-accent-yellow' : ''}`}>
                    {t.icon}
                  </span>
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Tab content ── */}
      <div id="dashboard-tab-content" className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10 space-y-6 md:space-y-8">
        {tab === 'overview' && (
          <OverviewTab
            isPro={isPro}
            savedDealSlugs={savedDealSlugs}
            onChangeTab={handleTabChange}
          />
        )}

        {tab === 'billing' && (
          <BillingPanel
            isPro={isPro}
            isAdmin={isAdmin}
            subscription={subscription}
            userName={userName}
            userEmail={userEmail}
            memberSinceFull={memberSinceFull}
          />
        )}

        {tab === 'account' && (
          <AccountTab
            userName={userName}
            userEmail={userEmail}
            memberSince={memberSince}
            avatarUrl={avatarUrl}
          />
        )}
      </div>
    </>
  )
}

/* ─── Overview Tab ─────────────────────────────────────── */
function OverviewTab({
  isPro,
  savedDealSlugs,
  onChangeTab,
}: {
  isPro: boolean
  savedDealSlugs: string[]
  onChangeTab: (tab: Tab) => void
}) {
  return (
    <>
      {/* Upgrade banner — free users */}
      {!isPro && (
        <section className="relative bg-white border-2 border-black shadow-[4px_4px_0px_#111,7px_7px_0px_#FFD500] overflow-hidden rounded-sm">
          <div className="absolute -top-10 -right-10 w-40 h-40 pointer-events-none opacity-[0.10]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 dashboard-upgrade-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
              <circle cx="100" cy="100" r="40" />
              <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
              <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <g key={deg} transform={`rotate(${deg} 100 100)`}>
                  <line x1="100" y1="40" x2="100" y2="20" />
                  <circle cx="100" cy="20" r="2" fill="currentColor" />
                </g>
              ))}
              <circle cx="100" cy="100" r="3" fill="currentColor" />
            </svg>
          </div>
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 md:p-6">
            <div className="flex items-start gap-3.5 md:gap-4 flex-1 min-w-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent-yellow border-2 border-black rounded-sm flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_#111]">
                <span className="material-symbols-outlined !text-[20px] md:!text-[22px] text-black">bolt</span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.12em] text-gray-500 mb-1">
                  You&apos;re on the Free preview
                </p>
                <h2 className="font-mono text-base md:text-xl font-black uppercase text-black leading-tight mb-1">
                  Unlock the full catalog.
                </h2>
                <p className="text-[12px] md:text-[13px] text-gray-600 leading-relaxed">
                  Cloud credits, SaaS deals, grants, and accelerator programs — all in one founder dashboard.
                </p>
              </div>
            </div>
            <Link
              href="/pricing"
              className="group/cta inline-flex items-center gap-2 bg-accent-yellow text-black font-mono font-black text-[12px] uppercase tracking-[0.1em] px-5 py-3 border-2 border-black rounded-sm shadow-[3px_3px_0px_#111] hover:bg-amber-300 hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all flex-shrink-0 self-stretch md:self-auto"
            >
              Scale as a Founder
              <span className="material-symbols-outlined !text-[16px] group-hover/cta:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </section>
      )}

      {/* Saved Deals */}
      {savedDealSlugs.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.16em] text-gray-700 inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow" />
              Your Saved Deals
            </h2>
            <Link
              href="/deals"
              className="font-mono text-[10px] font-bold uppercase tracking-wide text-gray-500 hover:text-black inline-flex items-center gap-1 transition-colors"
            >
              Browse all
              <span className="material-symbols-outlined !text-[12px]">arrow_forward</span>
            </Link>
          </div>
          <SavedDealsSection savedDealSlugs={savedDealSlugs} />
        </section>
      )}

      {/* Explore Catalog */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.16em] text-gray-700 inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow" />
            Explore the Catalog
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { href: '/deals', icon: 'local_offer', label: 'All Deals', sub: 'Cloud, SaaS, Ad credits', color: 'bg-accent-yellow', tag: 'Browse' },
            { href: '/deals/grants', icon: 'payments', label: 'Grants', sub: 'Non-dilutive funding', color: 'bg-emerald-200', tag: 'Funding' },
            { href: '/deals/accelerators', icon: 'rocket_launch', label: 'Accelerators', sub: 'Top global programs', color: 'bg-orange-200', tag: 'Programs' },
            { href: '/startups', icon: 'verified', label: 'Verified Startups', sub: 'Funded companies', color: 'bg-sky-200', tag: 'Research' },
            { href: '/ideas', icon: 'emoji_objects', label: 'Startup Ideas', sub: 'Validated opportunities', color: 'bg-yellow-200', tag: 'Inspiration' },
            { href: '/resources', icon: 'folder_open', label: 'Resources', sub: 'Templates & guides', color: 'bg-purple-200', tag: 'Library' },
            { href: '/deals/saas-discounts', icon: 'apps', label: 'SaaS Stack', sub: 'Tools at founder rates', color: 'bg-pink-200', tag: 'Stack' },
            { href: '/submit-deal', icon: 'add_circle', label: 'Submit Deal', sub: 'Share with founders', color: 'bg-gray-200', tag: 'Contribute' },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group relative bg-white border-2 border-black shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all rounded-sm p-3.5 md:p-4 flex flex-col gap-2.5 overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 ${a.color} border-2 border-black rounded-sm flex items-center justify-center flex-shrink-0 shadow-[1px_1px_0px_#111]`}>
                  <span className="material-symbols-outlined !text-[18px] text-black">{a.icon}</span>
                </div>
                <span className="font-mono text-[8.5px] font-black uppercase tracking-[0.1em] text-gray-500 bg-white border border-gray-200 px-1.5 py-0.5 rounded-sm">
                  {a.tag}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[12px] md:text-[12.5px] font-black uppercase text-black leading-tight tracking-tight">{a.label}</p>
                <p className="text-[10.5px] md:text-[11px] text-gray-500 leading-snug mt-0.5">{a.sub}</p>
              </div>
              <div className="mt-auto pt-2 border-t border-dashed border-gray-200 flex items-center justify-between">
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-gray-500">Open</span>
                <span className="material-symbols-outlined !text-[14px] text-gray-500 group-hover:translate-x-0.5 group-hover:text-black transition-all">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tip + Community */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div className="relative bg-white border-2 border-black shadow-[3px_3px_0px_#111] rounded-sm p-5 overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-32 h-32 pointer-events-none opacity-[0.07]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 dashboard-tip-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
              {[20, 35, 50, 65].map((r, i) => (
                <ellipse key={i} cx="100" cy="100" rx={r} ry={r / 1.8} transform={`rotate(${i * 30} 100 100)`} />
              ))}
              <circle cx="100" cy="100" r="2" fill="currentColor" />
            </svg>
          </div>
          <div className="relative">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-gray-500 mb-2 inline-flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-accent-yellow" />
              Founder Tip
            </p>
            <h3 className="font-mono text-base font-black uppercase text-black leading-tight mb-2">
              Apply with your work email.
            </h3>
            <p className="text-[12.5px] text-gray-700 leading-relaxed">
              Most providers approve faster when the application email matches your domain. Set up{' '}
              <span className="font-bold text-black">name@yourstartup.com</span> before you claim deals.
            </p>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-gray-900 to-black text-white border-2 border-black shadow-[3px_3px_0px_#FFD500] rounded-sm p-5 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 pointer-events-none opacity-[0.18]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow dashboard-community-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
              <circle cx="100" cy="100" r="40" />
              <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <g key={deg} transform={`rotate(${deg} 100 100)`}>
                  <line x1="100" y1="40" x2="100" y2="20" />
                  <circle cx="100" cy="20" r="2" fill="currentColor" />
                </g>
              ))}
              <circle cx="100" cy="100" r="3" fill="currentColor" />
            </svg>
          </div>
          <div className="relative">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-accent-yellow mb-2 inline-flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-accent-yellow animate-pulse" />
              Founder Community
            </p>
            <h3 className="font-mono text-base font-black uppercase leading-tight mb-2">
              Build alongside other founders.
            </h3>
            <p className="text-[12.5px] text-gray-300 leading-relaxed mb-3.5">
              Private Discord for Founder &amp; Legend members. Share what&apos;s working, ask for feedback, ship faster.
            </p>
            <Link
              href={isPro ? '/community' : '/pricing'}
              className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono font-black text-[10.5px] uppercase tracking-[0.1em] px-3 py-1.5 border-2 border-black rounded-sm shadow-[2px_2px_0px_#111] hover:bg-amber-300 hover:shadow-[3px_3px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all"
            >
              {isPro ? 'Open Discord' : 'Unlock Access'}
              <span className="material-symbols-outlined !text-[12px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

/* ─── Account Tab ─────────────────────────────────────── */
function AccountTab({
  userName,
  userEmail,
  memberSince,
  avatarUrl,
}: {
  userName: string
  userEmail: string
  memberSince: string
  avatarUrl: string | null
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.16em] text-gray-700 inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow" />
          Account &amp; Settings
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        <div className="lg:col-span-2">
          <ProfileManager
            initialName={userName}
            initialEmail={userEmail}
            initialAvatar={avatarUrl}
            memberSince={memberSince}
          />
        </div>

        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] rounded-sm overflow-hidden divide-y-2 divide-black divide-dashed">
          {[
            { href: '/auth/reset-password', icon: 'lock_reset', iconBg: 'bg-rose-100', label: 'Password & Security', sub: 'Update credentials' },
            { href: '#notifications', icon: 'notifications', iconBg: 'bg-amber-100', label: 'Notifications', sub: 'Email & app preferences' },
            { href: '/contact', icon: 'support_agent', iconBg: 'bg-purple-100', label: 'Help & Support', sub: 'Talk to our team' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-9 h-9 ${item.iconBg} border-2 border-black rounded-sm flex items-center justify-center flex-shrink-0 shadow-[1px_1px_0px_#111]`}>
                  <span className="material-symbols-outlined !text-[16px] text-black">{item.icon}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11.5px] font-black uppercase tracking-[0.04em] text-black leading-tight">{item.label}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5 truncate">{item.sub}</p>
                </div>
              </div>
              <span className="material-symbols-outlined !text-[16px] text-gray-400 group-hover:translate-x-0.5 group-hover:text-black transition-all flex-shrink-0">chevron_right</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
