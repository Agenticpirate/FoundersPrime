'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import ProfileManager from './ProfileManager'
import SavedDealsSection from './SavedDealsSection'
import DashboardMandala from './DashboardMandala'
import BillingPanel from './BillingPanel'
import { createClient } from '@/lib/supabase/client'


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
        {/* Grid background removed */}
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

          {/* Stat strip — actionable quick-glance cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-3 mt-6">
            {[
              {
                label: 'Saved for Later',
                value: String(savedDealSlugs.length),
                icon: 'bookmark',
                color: 'text-sky-400',
                hint: savedDealSlugs.length > 0 ? 'View saved' : 'Start saving',
                onClick: () => handleTabChange('overview'),
              },
              {
                label: 'Active Plan',
                value: planLabel,
                icon: 'workspace_premium',
                color: 'text-pink-400',
                hint: 'Manage billing',
                onClick: () => handleTabChange('billing'),
              },
              {
                label: 'Member Since',
                value: memberSince,
                icon: 'calendar_today',
                color: 'text-accent-yellow',
                hint: null,
                onClick: null,
              },
            ].map((stat) => {
              const interactive = !!stat.onClick
              const Tag: any = interactive ? 'button' : 'div'
              return (
                <Tag
                  key={stat.label}
                  {...(interactive ? { onClick: stat.onClick, type: 'button' } : {})}
                  className={`group/stat flex items-center gap-2.5 px-3 py-2.5 bg-white/5 backdrop-blur-sm border border-white/15 rounded-sm text-left transition-colors ${
                    interactive ? 'hover:bg-white/10 hover:border-white/30 cursor-pointer' : ''
                  } ${stat.label === 'Member Since' ? 'col-span-2 md:col-span-1' : ''}`}
                >
                  <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-sm flex items-center justify-center flex-shrink-0">
                    <span className={`material-symbols-outlined !text-[16px] ${stat.color}`}>{stat.icon}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[8.5px] font-bold uppercase tracking-[0.12em] text-gray-400 truncate">
                      {stat.label}
                    </p>
                    <p className={`font-mono text-base font-black leading-none mt-0.5 tabular-nums ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                  {stat.hint && (
                    <span className="hidden md:inline-flex items-center gap-0.5 font-mono text-[8.5px] font-bold uppercase tracking-[0.1em] text-gray-500 group-hover/stat:text-white transition-colors flex-shrink-0">
                      {stat.hint}
                      <span className="material-symbols-outlined !text-[12px] group-hover/stat:translate-x-0.5 transition-transform">arrow_forward</span>
                    </span>
                  )}
                </Tag>
              )
            })}
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
      {savedDealSlugs.length > 0 ? (
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
      ) : (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.16em] text-gray-700 inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow" />
              Your Saved Deals
            </h2>
          </div>
          <div className="relative bg-white border-2 border-dashed border-gray-300 rounded-sm p-6 md:p-7 flex flex-col md:flex-row items-center gap-4 md:gap-5 text-center md:text-left">
            <div className="w-12 h-12 bg-sky-100 border-2 border-black rounded-sm flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_#111]">
              <span className="material-symbols-outlined !text-[22px] text-black">bookmark_add</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-mono text-sm md:text-base font-black uppercase text-black leading-tight">
                No saved deals yet
              </h3>
              <p className="text-[12px] md:text-[13px] text-gray-600 leading-relaxed mt-1">
                Tap the bookmark on any deal to pin it here for quick access later.
              </p>
            </div>
            <Link
              href="/deals"
              className="group/cta inline-flex items-center gap-2 bg-black text-white font-mono font-black text-[11px] uppercase tracking-[0.1em] px-4 py-2.5 border-2 border-black rounded-sm hover:bg-accent-yellow hover:text-black transition-colors flex-shrink-0"
            >
              Browse Deals
              <span className="material-symbols-outlined !text-[15px] group-hover/cta:translate-x-0.5 transition-transform">arrow_forward</span>
            </Link>
          </div>
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
            { href: '/programs?type=grants', icon: 'payments', label: 'Grants', sub: 'Non-dilutive funding', color: 'bg-emerald-200', tag: 'Funding' },
            { href: '/programs?type=accelerators', icon: 'rocket_launch', label: 'Accelerators', sub: 'Top global programs', color: 'bg-orange-200', tag: 'Programs' },
            { href: '/startups', icon: 'verified', label: 'Verified Startups', sub: 'Funded companies', color: 'bg-sky-200', tag: 'Research' },
            { href: '/ideas', icon: 'emoji_objects', label: 'Startup Ideas', sub: 'Validated opportunities', color: 'bg-yellow-200', tag: 'Inspiration' },
            { href: '/resources', icon: 'folder_open', label: 'Resources', sub: 'Templates & guides', color: 'bg-purple-200', tag: 'Library' },
            { href: '/deals?category=saas-discounts', icon: 'apps', label: 'SaaS Stack', sub: 'Tools at founder rates', color: 'bg-pink-200', tag: 'Stack' },
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

      {/* Tip */}
      <section>
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
  const [mfaEnabled, setMfaEnabled] = useState(false)
  const [showEnroll, setShowEnroll] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [mfaSecret, setMfaSecret] = useState<string | null>(null)
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null)
  const [verificationCode, setVerificationCode] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [enrollError, setEnrollError] = useState<string | null>(null)
  const [enrollSuccess, setEnrollSuccess] = useState<string | null>(null)

  useEffect(() => {
    checkMfaStatus()
  }, [])

  const checkMfaStatus = async () => {
    try {
      const supabase = createClient()
      const isStub = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (isStub) {
        const isMockMfa = localStorage.getItem('foundersprime_mock_mfa_enabled_' + userEmail.toLowerCase()) === 'true'
        setMfaEnabled(isMockMfa)
      } else {
        const { data: factors, error } = await supabase.auth.mfa.listFactors()
        if (factors && !error) {
          const verified = factors.all.some(f => f.status === 'verified')
          setMfaEnabled(verified)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const startEnrollment = async () => {
    setEnrollError(null)
    setEnrollSuccess(null)
    try {
      const supabase = createClient()
      const isStub = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (isStub) {
        const mockSecret = 'JBSWY3DPEHPK3PXP'
        setMfaSecret(mockSecret)
        setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/FoundersPrime:${userEmail}?secret=${mockSecret}&issuer=FoundersPrime`)
        setShowEnroll(true)
      } else {
        const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp' })
        if (error) {
          setEnrollError(error.message)
          return
        }
        setMfaFactorId(data.id)
        setMfaSecret(data.totp.secret)
        setQrCode(data.totp.qr_code)
        setShowEnroll(true)
      }
    } catch {
      setEnrollError('Failed to initiate Two-Step verification setup.')
    }
  }

  const verifyEnrollment = async () => {
    setEnrollError(null)
    setEnrollSuccess(null)
    if (verificationCode.length !== 6) {
      setEnrollError('Please enter a 6-digit verification code')
      return
    }
    setVerifying(true)
    try {
      const supabase = createClient()
      const isStub = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (isStub) {
        if (verificationCode !== '123456') {
          setEnrollError('Invalid code. For testing in local dev, enter "123456".')
          setVerifying(false)
          return
        }
        localStorage.setItem('foundersprime_mock_mfa_enabled_' + userEmail.toLowerCase(), 'true')
        setMfaEnabled(true)
        setEnrollSuccess('Two-Step Verification successfully enabled!')
        setTimeout(() => {
          setShowEnroll(false)
          setVerificationCode('')
        }, 2000)
      } else {
        if (!mfaFactorId) return
        const { data: challenge, error: challengeErr } = await supabase.auth.mfa.challenge({ factorId: mfaFactorId })
        if (challengeErr) {
          setEnrollError(challengeErr.message)
          setVerifying(false)
          return
        }
        const { error: verifyErr } = await supabase.auth.mfa.verify({
          factorId: mfaFactorId,
          challengeId: challenge.id,
          code: verificationCode,
        })
        if (verifyErr) {
          setEnrollError(verifyErr.message)
          setVerifying(false)
          return
        }
        setMfaEnabled(true)
        setEnrollSuccess('Two-Step Verification successfully enabled!')
        setTimeout(() => {
          setShowEnroll(false)
          setVerificationCode('')
        }, 2000)
      }
    } catch {
      setEnrollError('Verification failed. Please try again.')
    } finally {
      setVerifying(false)
    }
  }

  const disableMfa = async () => {
    if (!confirm('Are you sure you want to disable Two-Step Verification?')) return
    setEnrollError(null)
    try {
      const supabase = createClient()
      const isStub = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (isStub) {
        localStorage.removeItem('foundersprime_mock_mfa_enabled_' + userEmail.toLowerCase())
        setMfaEnabled(false)
        alert('Two-Step Verification has been disabled.')
      } else {
        const { data: factors } = await supabase.auth.mfa.listFactors()
        const verifiedFactor = factors?.all?.find(f => f.status === 'verified')
        if (verifiedFactor) {
          const { error } = await supabase.auth.mfa.unenroll({ factorId: verifiedFactor.id })
          if (error) {
            alert(error.message)
            return
          }
          setMfaEnabled(false)
          alert('Two-Step Verification has been disabled.')
        }
      }
    } catch {
      alert('Failed to disable Two-Step Verification.')
    }
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.16em] text-gray-700 inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow" />
          Account &amp; Settings
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        <div className="lg:col-span-2 space-y-4">
          <ProfileManager
            initialName={userName}
            initialEmail={userEmail}
            initialAvatar={avatarUrl}
            memberSince={memberSince}
          />

          {/* Two-Step Verification enrollment UI */}
          <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] p-5 md:p-6">
            <div className="flex items-center justify-between mb-4 border-b-2 border-black border-dashed pb-3">
              <div>
                <h3 className="font-mono font-black uppercase text-sm text-black">Two-Step Verification</h3>
                <p className="text-[11px] text-gray-500 font-mono mt-0.5">Secure your terminal with a 2FA passcode</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[9px] font-black uppercase tracking-wider ${
                mfaEnabled 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${mfaEnabled ? 'bg-emerald-600' : 'bg-rose-600 animate-pulse'}`} />
                {mfaEnabled ? 'Protected' : 'Unprotected'}
              </span>
            </div>

            {!showEnroll ? (
              <div className="space-y-4">
                <p className="text-xs text-gray-600 leading-relaxed">
                  Protect your FoundersPrime account from unauthorized access. When enabled, signing in will require both your password and a verification code generated by your authenticator app (such as Google Authenticator, Duo, or 1Password).
                </p>
                {mfaEnabled ? (
                  <button
                    onClick={disableMfa}
                    className="h-10 px-4 bg-rose-600 hover:bg-rose-700 text-white font-mono font-black uppercase text-xs tracking-wider rounded-sm border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] transition-all"
                  >
                    Disable Two-Step
                  </button>
                ) : (
                  <button
                    onClick={startEnrollment}
                    className="h-10 px-4 bg-accent-yellow hover:bg-yellow-400 text-black font-mono font-black uppercase text-xs tracking-wider rounded-sm border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] transition-all"
                  >
                    Enable Two-Step
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-5">
                {enrollError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">error</span>
                    {enrollError}
                  </div>
                )}
                {enrollSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs font-mono font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    {enrollSuccess}
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-5 items-center md:items-start bg-gray-50 border border-gray-200 p-4">
                  <div className="bg-white p-2 border-2 border-black shadow-[2px_2px_0px_#000] flex-shrink-0">
                    {qrCode ? (
                      <img src={qrCode} alt="TOTP QR Code" className="w-36 h-36" />
                    ) : (
                      <div className="w-36 h-36 bg-gray-100 flex items-center justify-center font-mono text-[10px] text-gray-400">Loading QR...</div>
                    )}
                  </div>
                  <div className="space-y-3 flex-1 min-w-0">
                    <h4 className="font-mono font-bold text-xs uppercase text-gray-700">1. Scan the QR Code</h4>
                    <p className="text-[11px] text-gray-600 leading-normal">
                      Scan this code with your authenticator app. If you cannot scan it, enter the manual secret key below:
                    </p>
                    <div className="bg-black/5 border border-black/10 rounded px-2.5 py-1.5 font-mono text-[10.5px] select-all break-all text-gray-800 font-bold">
                      {mfaSecret}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-mono font-bold text-xs uppercase text-gray-700">2. Verify Verification Code</h4>
                  <p className="text-[11px] text-gray-600 leading-normal">
                    Enter the 6-digit verification code generated by your authenticator app below to confirm setup.
                  </p>
                  
                  {/* Test note */}
                  <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-[10.5px] font-mono leading-normal">
                    <span className="font-black">TESTING DIRECTIVE:</span> For quick demonstration in local development without scanning the code, enter <span className="font-black text-black underline">123456</span> to successfully verify.
                  </div>

                  <div className="flex gap-2.5 max-w-[280px]">
                    <input
                      type="text"
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="000000"
                      className="w-full h-10 px-3 border-2 border-black font-mono text-center text-sm font-bold placeholder:text-gray-400 focus:shadow-[2px_2px_0px_#000] outline-none transition-all"
                      disabled={verifying}
                    />
                    <button
                      onClick={verifyEnrollment}
                      disabled={verifying}
                      className="h-10 px-4 bg-black text-white hover:bg-gray-800 font-mono font-black uppercase text-xs tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] transition-all disabled:opacity-50"
                    >
                      {verifying ? 'Verifying...' : 'Verify'}
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <button
                    onClick={() => { setShowEnroll(false); setVerificationCode(''); setEnrollError(null); }}
                    className="font-mono text-xs text-gray-400 hover:text-black uppercase font-bold"
                  >
                    Cancel Setup
                  </button>
                </div>
              </div>
            )}
          </div>
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
