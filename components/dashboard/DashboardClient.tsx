'use client'

import { useState, useEffect, useCallback, type ReactNode } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import ProfileManager from './ProfileManager'
import SavedDealsSection from './SavedDealsSection'
import DashboardMandala from './DashboardMandala'
import BillingPanel from './BillingPanel'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'


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
  const [currentName, setCurrentName] = useState(userName)
  const [isEditingName, setIsEditingName] = useState(false)
  const [savingName, setSavingName] = useState(false)
  const [tempName, setTempName] = useState(userName)

  useEffect(() => {
    setCurrentName(userName)
    setTempName(userName)
  }, [userName])

  const firstName = currentName.split(' ')[0]
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const planFromSub =
    subscription?.plan === 'nextfounder'
      ? "Next'Founder"
      : subscription?.plan === 'legend'
        ? 'Legend'
        : subscription?.plan === 'founder'
          ? 'Founder'
          : null
  const planLabel = isAdmin ? 'Admin' : planFromSub || (isPro ? 'Founder' : 'Free')
  const cancelPending = subscription?.cancel_at_period_end === true

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

  const handleSaveName = async () => {
    if (!tempName.trim() || tempName.trim().length < 2) {
      alert('Name must be at least 2 characters')
      return
    }
    setSavingName(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        data: { full_name: tempName.trim() }
      })
      if (error) throw error
      setCurrentName(tempName.trim())
      setIsEditingName(false)
      router.refresh()
    } catch (err: any) {
      alert(err.message || 'Failed to update name')
    } finally {
      setSavingName(false)
    }
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'billing', label: 'Billing', icon: 'credit_card' },
    { id: 'account', label: 'Account', icon: 'person' },
  ]

  return (
    <>
      {/* ── Premium dark hero ── */}
      <section className="relative bg-[#050505] text-white overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/60 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,215,0,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.35) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at 30% 20%, black 0%, transparent 70%)',
          }}
        />
        <div className="absolute -top-28 -left-20 w-80 h-80 bg-accent-yellow/[0.12] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-16 w-96 h-96 bg-amber-500/[0.06] rounded-full blur-3xl pointer-events-none" />
        <DashboardMandala />

        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 pt-7 md:pt-10 pb-6 md:pb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 lg:gap-8">
            <div className="min-w-0 flex-1">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-accent-yellow inline-flex items-center gap-2 mb-3"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent-yellow opacity-60 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-yellow" />
                </span>
                {greeting} · Your HQ
              </motion.p>

              {isEditingName ? (
                <div className="flex items-center gap-2 max-w-full md:max-w-md mt-1">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    maxLength={50}
                    className="bg-white/5 text-white font-mono text-xl md:text-3xl font-black border border-accent-yellow/50 rounded-xl outline-none px-3 py-2 w-full"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveName()
                      if (e.key === 'Escape') setIsEditingName(false)
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleSaveName}
                    disabled={savingName}
                    className="p-2 min-h-[44px] min-w-[44px] bg-accent-yellow text-black rounded-xl font-mono disabled:opacity-50 flex items-center justify-center flex-shrink-0"
                    title="Save name"
                  >
                    {savingName ? (
                      <span className="material-symbols-outlined !text-[18px] animate-spin">
                        progress_activity
                      </span>
                    ) : (
                      <span className="material-symbols-outlined !text-[18px]">check</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingName(false)}
                    disabled={savingName}
                    className="p-2 min-h-[44px] min-w-[44px] bg-white/10 text-white border border-white/15 rounded-xl flex-shrink-0 flex items-center justify-center"
                    title="Cancel"
                  >
                    <span className="material-symbols-outlined !text-[18px]">close</span>
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="flex items-center gap-2.5 flex-wrap"
                >
                  <h1 className="font-mono text-[1.75rem] sm:text-3xl md:text-4xl font-black tracking-tight leading-[1.1]">
                    Hey, <span className="text-accent-yellow">{firstName}</span>
                  </h1>
                  <button
                    type="button"
                    onClick={() => {
                      setTempName(currentName)
                      setIsEditingName(true)
                    }}
                    className="p-2 rounded-lg text-zinc-500 hover:text-accent-yellow hover:bg-white/5 transition-colors inline-flex items-center"
                    title="Customize display name"
                  >
                    <span className="material-symbols-outlined !text-[18px] md:!text-[20px]">
                      edit
                    </span>
                  </button>
                </motion.div>
              )}

              <p className="text-zinc-400 text-[12px] md:text-[13px] mt-2.5 font-mono inline-flex items-center gap-2 flex-wrap max-w-full">
                <span className="inline-flex items-center gap-1.5 truncate max-w-[min(100%,280px)]">
                  <span className="material-symbols-outlined !text-[14px] text-zinc-600 shrink-0">
                    mail
                  </span>
                  <span className="truncate">{userEmail}</span>
                </span>
                <span className="text-zinc-700 hidden sm:inline">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="material-symbols-outlined !text-[14px] text-zinc-600">
                    calendar_today
                  </span>
                  Member since {memberSince}
                </span>
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-2 flex-shrink-0"
            >
              {isAdmin && (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 bg-white/[0.04] border border-white/15 hover:border-accent-yellow/50 rounded-xl font-mono text-[10px] font-black uppercase tracking-[0.12em] text-white transition-colors"
                >
                  <span className="material-symbols-outlined !text-[14px]">admin_panel_settings</span>
                  Admin
                </Link>
              )}
              <div
                className={`inline-flex items-center gap-2 min-h-[40px] px-3.5 py-2 rounded-xl font-mono text-[10px] font-black uppercase tracking-[0.12em] border ${
                  cancelPending
                    ? 'bg-amber-500/15 text-amber-200 border-amber-500/35'
                    : isPro
                      ? 'bg-accent-yellow text-black border-accent-yellow shadow-[0_0_24px_rgba(255,215,0,0.25)]'
                      : 'bg-white/[0.04] text-white border-white/15'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    cancelPending ? 'bg-amber-400' : isPro ? 'bg-black' : 'bg-accent-yellow animate-pulse'
                  }`}
                />
                {cancelPending ? 'Cancels soon' : planLabel}
              </div>
            </motion.div>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-3 mt-7">
            {[
              {
                label: 'Saved for later',
                value: String(savedDealSlugs.length),
                icon: 'bookmark',
                iconBg: 'bg-sky-500/15 text-sky-400 border-sky-500/25',
                valueColor: 'text-sky-300',
                hint: savedDealSlugs.length > 0 ? 'View saved' : 'Browse deals',
                onClick: () => handleTabChange('overview'),
              },
              {
                label: 'Active plan',
                value: planLabel,
                icon: 'workspace_premium',
                iconBg: 'bg-accent-yellow/15 text-accent-yellow border-accent-yellow/30',
                valueColor: 'text-accent-yellow',
                hint: cancelPending ? 'Renewal off' : 'Manage billing',
                onClick: () => handleTabChange('billing'),
              },
              {
                label: 'Member since',
                value: memberSince,
                icon: 'calendar_month',
                iconBg: 'bg-white/10 text-zinc-300 border-white/15',
                valueColor: 'text-white',
                hint: null as string | null,
                onClick: null as (() => void) | null,
              },
            ].map((stat, i) => {
              const interactive = !!stat.onClick
              const Tag: 'button' | 'div' = interactive ? 'button' : 'div'
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                >
                  <Tag
                    {...(interactive ? { onClick: stat.onClick!, type: 'button' as const } : {})}
                    className={`group/stat w-full flex items-center gap-3 px-3.5 py-3.5 min-h-[72px] rounded-2xl text-left border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all ${
                      interactive
                        ? 'hover:bg-white/[0.06] hover:border-accent-yellow/30 cursor-pointer active:scale-[0.99]'
                        : ''
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 ${stat.iconBg}`}
                    >
                      <span className="material-symbols-outlined !text-[20px]">{stat.icon}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-500 truncate">
                        {stat.label}
                      </p>
                      <p
                        className={`font-mono text-lg md:text-xl font-black leading-none mt-1 tabular-nums truncate ${stat.valueColor}`}
                      >
                        {stat.value}
                      </p>
                    </div>
                    {stat.hint && (
                      <span className="hidden sm:inline-flex items-center gap-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-zinc-500 group-hover/stat:text-accent-yellow transition-colors flex-shrink-0">
                        {stat.hint}
                        <span className="material-symbols-outlined !text-[14px] group-hover/stat:translate-x-0.5 transition-transform">
                          arrow_forward
                        </span>
                      </span>
                    )}
                  </Tag>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Tabs integrated into hero bottom */}
        <div className="relative border-t border-white/[0.07] bg-black/40 backdrop-blur-md">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <div
              className="flex gap-1 overflow-x-auto mobile-scroll-hide"
              role="tablist"
              aria-label="Dashboard sections"
            >
              {tabs.map((t) => {
                const active = tab === t.id
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleTabChange(t.id)}
                    className={`relative flex items-center gap-2 px-4 md:px-5 py-3.5 min-h-[48px] font-mono text-[11px] md:text-[12px] font-black uppercase tracking-[0.1em] whitespace-nowrap transition-colors ${
                      active
                        ? 'text-white'
                        : 'text-zinc-500 hover:text-zinc-200'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined !text-[18px] ${
                        active ? 'text-accent-yellow' : ''
                      }`}
                    >
                      {t.icon}
                    </span>
                    {t.label}
                    {active && (
                      <motion.span
                        layoutId="dash-tab-underline"
                        className="absolute left-2 right-2 bottom-0 h-0.5 rounded-full bg-accent-yellow"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tab content ── */}
      <div
        id="dashboard-tab-content"
        className="relative bg-[#f7f7f5] dark:bg-[#050505] overflow-hidden"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 py-7 md:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="space-y-6 md:space-y-8"
          >
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
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const EXPLORE_LINKS = [
  {
    href: '/deals',
    icon: 'local_offer',
    label: 'All Deals',
    sub: 'Cloud, SaaS & ad credits',
  },
  {
    href: '/flash-deals',
    icon: 'bolt',
    label: 'Flash Deals',
    sub: 'Limited-time drops',
  },
  {
    href: '/programs?type=grants',
    icon: 'payments',
    label: 'Grants',
    sub: 'Non-dilutive funding',
  },
  {
    href: '/programs?type=accelerators',
    icon: 'rocket_launch',
    label: 'Accelerators',
    sub: 'Top global programs',
  },
  {
    href: '/student-benefits',
    icon: 'school',
    label: 'Student Benefits',
    sub: 'Credits, tools & funding',
  },
  {
    href: '/ideas',
    icon: 'lightbulb',
    label: 'Startup Ideas',
    sub: 'Validated opportunities',
  },
  {
    href: '/resources',
    icon: 'lock',
    label: 'Founder Vault',
    sub: 'Guides & playbooks',
  },
  {
    href: '/deals?category=saas-discounts',
    icon: 'apps',
    label: 'SaaS Stack',
    sub: 'Tools at founder rates',
  },
  {
    href: '/submit-deal',
    icon: 'add_circle',
    label: 'Submit Deal',
    sub: 'Share with founders',
  },
] as const

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.16em] text-gray-600 dark:text-zinc-400 inline-flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow shadow-[0_0_8px_rgba(255,215,0,0.55)]" />
      {children}
    </h2>
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
  const reduce = useReducedMotion()

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 md:space-y-8"
    >
      {/* Upgrade banner — free users */}
      {!isPro && (
        <motion.section
          variants={itemVariants}
          className="relative overflow-hidden rounded-2xl border border-accent-yellow/35 bg-gradient-to-br from-[#1a1710] via-[#0c0c0c] to-black p-5 md:p-6"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-yellow/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/50 to-transparent"
          />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5 md:gap-4 flex-1 min-w-0">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-accent-yellow text-black border border-accent-yellow/50 flex items-center justify-center flex-shrink-0 shadow-[0_0_24px_rgba(255,215,0,0.25)]">
                <span className="material-symbols-outlined !text-[22px]">bolt</span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-accent-yellow mb-1">
                  Free preview
                </p>
                <h2 className="font-mono text-base md:text-xl font-black text-white tracking-tight leading-tight mb-1">
                  Unlock the full catalog
                </h2>
                <p className="text-[12px] md:text-[13px] text-zinc-400 leading-relaxed max-w-xl">
                  Cloud credits, SaaS deals, grants, and accelerator programs — all in one founder
                  dashboard.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0 self-stretch md:self-auto">
              <Link
                href="/pricing"
                className="group/cta inline-flex items-center justify-center gap-2 min-h-[48px] bg-accent-yellow text-black font-mono font-black text-[11px] uppercase tracking-[0.1em] px-5 rounded-xl hover:bg-yellow-300 transition-colors shadow-[0_0_28px_rgba(255,215,0,0.2)]"
              >
                View plans
                <span className="material-symbols-outlined !text-[16px] group-hover/cta:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </Link>
              <button
                type="button"
                onClick={() => onChangeTab('billing')}
                className="inline-flex items-center justify-center min-h-[48px] px-4 rounded-xl border border-white/15 text-white font-mono text-[11px] font-bold uppercase hover:border-accent-yellow/40 transition-colors"
              >
                Billing
              </button>
            </div>
          </div>
        </motion.section>
      )}

      {/* Academic Perks — site theme (black / gold) */}
      <motion.section variants={itemVariants}>
        <div className="relative overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-[#0a0a0a]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-yellow/[0.07] via-transparent to-transparent dark:from-accent-yellow/[0.09]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-accent-yellow/10 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-yellow/60 to-transparent"
          />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5 p-5 md:p-6">
            <div className="flex items-start gap-3.5 md:gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-accent-yellow/15 border border-accent-yellow/35 text-amber-700 dark:text-accent-yellow flex items-center justify-center flex-shrink-0">
                <span
                  className="material-symbols-outlined !text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  school
                </span>
              </div>
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-black uppercase tracking-[0.16em] text-accent-yellow bg-accent-yellow/10 border border-accent-yellow/25 px-2.5 py-1 rounded-full">
                  <span className="w-1 h-1 rounded-full bg-accent-yellow" />
                  Academic perks
                </span>
                <h3 className="font-mono text-base md:text-xl font-black text-gray-900 dark:text-white tracking-tight mt-2 leading-tight">
                  900+ student benefits &amp; funding
                </h3>
                <p className="text-[12.5px] text-gray-600 dark:text-zinc-400 leading-relaxed mt-1.5 max-w-xl">
                  Free pro tools, student cloud credits (Figma, GitHub, Notion…), and non-dilutive
                  funding matched for students — claim in minutes.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {['Figma', 'GitHub', 'Notion', 'Cloud credits'].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] font-bold uppercase tracking-wide text-gray-500 dark:text-zinc-500 border border-black/[0.06] dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/student-benefits"
              className="group/btn shrink-0 inline-flex items-center justify-center gap-2 min-h-[48px] px-5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-mono font-black text-[11px] uppercase tracking-[0.1em] hover:bg-accent-yellow hover:text-black dark:hover:bg-accent-yellow transition-colors self-stretch md:self-auto"
            >
              Access student perks
              <span className="material-symbols-outlined !text-[15px] group-hover/btn:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Quick actions strip */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {[
            {
              href: '/deals',
              icon: 'local_offer',
              label: 'Browse deals',
              sub: 'Full catalog',
            },
            {
              href: '/flash-deals',
              icon: 'bolt',
              label: 'Flash deals',
              sub: 'Live countdowns',
            },
            {
              href: '/ideas',
              icon: 'lightbulb',
              label: 'Ideas hub',
              sub: 'Find problems',
            },
            {
              action: () => onChangeTab('billing'),
              icon: 'credit_card',
              label: 'Billing',
              sub: 'Plan & renewals',
            },
          ].map((item) => {
            const className =
              'group flex items-center gap-3 p-3.5 min-h-[72px] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0a0a0a] hover:border-accent-yellow/40 hover:bg-accent-yellow/[0.04] transition-all text-left w-full'
            const inner = (
              <>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-yellow/10 border border-accent-yellow/20 text-amber-700 dark:text-accent-yellow group-hover:bg-accent-yellow/20 transition-colors">
                  <span className="material-symbols-outlined !text-[18px]">{item.icon}</span>
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] font-black uppercase tracking-wide text-gray-900 dark:text-white">
                    {item.label}
                  </span>
                  <span className="block text-[11px] text-gray-500 dark:text-zinc-500 mt-0.5">
                    {item.sub}
                  </span>
                </span>
              </>
            )
            if ('href' in item && item.href) {
              return (
                <Link key={item.label} href={item.href} className={className}>
                  {inner}
                </Link>
              )
            }
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className={className}
              >
                {inner}
              </button>
            )
          })}
        </div>
      </motion.section>

      {/* Saved Deals */}
      {savedDealSlugs.length > 0 ? (
        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-3.5">
            <SectionLabel>Your saved deals</SectionLabel>
            <Link
              href="/deals"
              className="font-mono text-[10px] font-bold uppercase tracking-wide text-gray-500 hover:text-accent-yellow inline-flex items-center gap-1 transition-colors"
            >
              Browse all
              <span className="material-symbols-outlined !text-[12px]">arrow_forward</span>
            </Link>
          </div>
          <SavedDealsSection savedDealSlugs={savedDealSlugs} />
        </motion.section>
      ) : (
        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-3.5">
            <SectionLabel>Your saved deals</SectionLabel>
          </div>
          <div className="relative rounded-2xl border border-dashed border-black/10 dark:border-white/12 bg-white dark:bg-[#0a0a0a] p-6 md:p-7 flex flex-col md:flex-row items-center gap-4 md:gap-5 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-accent-yellow/12 border border-accent-yellow/25 flex items-center justify-center flex-shrink-0 text-amber-700 dark:text-accent-yellow">
              <span className="material-symbols-outlined !text-[22px]">bookmark_add</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-mono text-sm md:text-base font-black text-gray-900 dark:text-white tracking-tight">
                No saved deals yet
              </h3>
              <p className="text-[12px] md:text-[13px] text-gray-600 dark:text-zinc-400 leading-relaxed mt-1">
                Tap the bookmark on any deal to pin it here for quick access later.
              </p>
            </div>
            <Link
              href="/deals"
              className="group/cta inline-flex items-center gap-2 min-h-[44px] bg-gray-900 dark:bg-white text-white dark:text-black font-mono font-black text-[11px] uppercase tracking-[0.1em] px-4 rounded-xl hover:bg-accent-yellow hover:text-black transition-colors flex-shrink-0"
            >
              Browse deals
              <span className="material-symbols-outlined !text-[15px] group-hover/cta:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </motion.section>
      )}

      {/* Explore Catalog */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-3.5">
          <SectionLabel>Explore the catalog</SectionLabel>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-3.5">
          {EXPLORE_LINKS.map((a, i) => (
            <motion.div
              key={a.href + a.label}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 + i * 0.03, duration: 0.3 }}
              className="h-full"
            >
              <Link
                href={a.href}
                className="group relative h-full flex flex-col rounded-2xl border border-black/[0.07] dark:border-white/[0.09] bg-white dark:bg-[#0a0a0a] p-4 md:p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent-yellow/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-accent-yellow/0 group-hover:bg-accent-yellow/[0.08] blur-2xl transition-colors duration-500"
                />
                <div className="relative flex items-start justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-yellow/10 border border-accent-yellow/20 text-amber-700 dark:text-accent-yellow flex items-center justify-center group-hover:bg-accent-yellow/18 transition-colors">
                    <span className="material-symbols-outlined !text-[20px]">{a.icon}</span>
                  </div>
                  <span className="material-symbols-outlined !text-[16px] text-gray-300 dark:text-zinc-600 group-hover:text-accent-yellow group-hover:translate-x-0.5 transition-all">
                    arrow_forward
                  </span>
                </div>
                <p className="relative font-mono text-[12px] md:text-[13px] font-black uppercase tracking-wide text-gray-900 dark:text-white group-hover:text-accent-yellow transition-colors">
                  {a.label}
                </p>
                <p className="relative text-[11px] text-gray-500 dark:text-zinc-500 mt-1 leading-snug">
                  {a.sub}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tip */}
      <motion.section variants={itemVariants}>
        <div className="relative overflow-hidden rounded-2xl border border-black/[0.07] dark:border-white/[0.09] bg-white dark:bg-[#0a0a0a] p-5 md:p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-accent-yellow/[0.06] blur-2xl"
          />
          <div className="relative flex items-start gap-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-yellow/12 border border-accent-yellow/25 text-accent-yellow">
              <span className="material-symbols-outlined !text-[18px]">tips_and_updates</span>
            </span>
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-gray-500 dark:text-zinc-500 mb-1.5">
                Founder tip
              </p>
              <h3 className="font-mono text-[15px] font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-1.5">
                Apply with your work email
              </h3>
              <p className="text-[12.5px] text-gray-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                Most providers approve faster when the application email matches your domain. Set up{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  name@yourstartup.com
                </span>{' '}
                before you claim deals.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
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
        <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.16em] text-gray-700 dark:text-gray-300 inline-flex items-center gap-1.5">
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
          <div className="bg-white dark:bg-[#0d0d0d] border-2 border-black dark:border-white/10 shadow-[3px_3px_0px_#111] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.06)] p-5 md:p-6">
            <div className="flex items-center justify-between mb-4 border-b-2 border-black dark:border-white/10 border-dashed pb-3">
              <div>
                <h3 className="font-mono font-black uppercase text-sm text-black dark:text-white">Two-Step Verification</h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-mono mt-0.5">Secure your terminal with a 2FA passcode</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[9px] font-black uppercase tracking-wider ${
                mfaEnabled 
                  ? 'bg-amber-100 dark:bg-accent-yellow/15 text-amber-900 dark:text-accent-yellow border border-amber-300 dark:border-accent-yellow/30' 
                  : 'bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${mfaEnabled ? 'bg-emerald-600' : 'bg-rose-600 animate-pulse'}`} />
                {mfaEnabled ? 'Protected' : 'Unprotected'}
              </span>
            </div>

            {!showEnroll ? (
              <div className="space-y-4">
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
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
                  <div className="p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-700 text-rose-700 dark:text-rose-300 text-xs font-mono font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">error</span>
                    {enrollError}
                  </div>
                )}
                {enrollSuccess && (
                  <div className="p-3 bg-amber-50 dark:bg-accent-yellow/10 border border-amber-200 dark:border-amber-700 text-amber-800 dark:text-accent-yellow text-xs font-mono font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    {enrollSuccess}
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-5 items-center md:items-start bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-4">
                  <div className="bg-white p-2 border-2 border-black dark:border-white/20 shadow-[2px_2px_0px_#000] flex-shrink-0">
                    {qrCode ? (
                      <img src={qrCode} alt="TOTP QR Code" className="w-36 h-36" />
                    ) : (
                      <div className="w-36 h-36 bg-gray-100 dark:bg-white/5 flex items-center justify-center font-mono text-[10px] text-gray-400">Loading QR...</div>
                    )}
                  </div>
                  <div className="space-y-3 flex-1 min-w-0">
                    <h4 className="font-mono font-bold text-xs uppercase text-gray-700 dark:text-gray-300">1. Scan the QR Code</h4>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-normal">
                      Scan this code with your authenticator app. If you cannot scan it, enter the manual secret key below:
                    </p>
                    <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded px-2.5 py-1.5 font-mono text-[10.5px] select-all break-all text-gray-800 dark:text-gray-200 font-bold">
                      {mfaSecret}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-mono font-bold text-xs uppercase text-gray-700 dark:text-gray-300">2. Verify Verification Code</h4>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-normal">
                    Enter the 6-digit verification code generated by your authenticator app below to confirm setup.
                  </p>
                  
                  {/* Test note */}
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-300 text-[10.5px] font-mono leading-normal">
                    <span className="font-black">TESTING DIRECTIVE:</span> For quick demonstration in local development without scanning the code, enter <span className="font-black text-black dark:text-white underline">123456</span> to successfully verify.
                  </div>

                  <div className="flex gap-2.5 max-w-[280px]">
                    <input
                      type="text"
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="000000"
                      className="w-full h-10 px-3 border-2 border-black dark:border-white/20 bg-white dark:bg-white/5 text-black dark:text-white font-mono text-center text-sm font-bold placeholder:text-gray-400 focus:shadow-[2px_2px_0px_#000] dark:focus:shadow-[2px_2px_0px_rgba(255,255,255,0.2)] outline-none transition-all"
                      disabled={verifying}
                    />
                    <button
                      onClick={verifyEnrollment}
                      disabled={verifying}
                      className="h-10 px-4 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 font-mono font-black uppercase text-xs tracking-wider border-2 border-black dark:border-white/20 shadow-[2px_2px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] transition-all disabled:opacity-50"
                    >
                      {verifying ? 'Verifying...' : 'Verify'}
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-white/10">
                  <button
                    onClick={() => { setShowEnroll(false); setVerificationCode(''); setEnrollError(null); }}
                    className="font-mono text-xs text-gray-400 hover:text-black dark:hover:text-white uppercase font-bold"
                  >
                    Cancel Setup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-[#0d0d0d] border-2 border-black dark:border-white/10 shadow-[3px_3px_0px_#111] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.06)] rounded-sm overflow-hidden divide-y-2 divide-black dark:divide-white/10 divide-dashed">
          {[
            { href: '/auth/reset-password', icon: 'lock_reset', iconBg: 'bg-rose-100 dark:bg-rose-900/30', label: 'Password & Security', sub: 'Update credentials' },
            { href: '#notifications', icon: 'notifications', iconBg: 'bg-amber-100 dark:bg-amber-900/30', label: 'Notifications', sub: 'Email & app preferences' },
            { href: '/contact', icon: 'support_agent', iconBg: 'bg-purple-100 dark:bg-purple-900/30', label: 'Help & Support', sub: 'Talk to our team' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-9 h-9 ${item.iconBg} border-2 border-black dark:border-white/20 rounded-sm flex items-center justify-center flex-shrink-0 shadow-[1px_1px_0px_#111] dark:shadow-[1px_1px_0px_rgba(255,255,255,0.06)]`}>
                  <span className="material-symbols-outlined !text-[16px] text-black dark:text-white">{item.icon}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11.5px] font-black uppercase tracking-[0.04em] text-black dark:text-white leading-tight">{item.label}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">{item.sub}</p>
                </div>
              </div>
              <span className="material-symbols-outlined !text-[16px] text-gray-400 group-hover:translate-x-0.5 group-hover:text-black dark:group-hover:text-white transition-all flex-shrink-0">chevron_right</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
