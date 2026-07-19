'use client'

import Link from 'next/link'
import { m } from 'framer-motion'
import DashboardMandala from './DashboardMandala'

type Tab = 'overview' | 'billing' | 'account'

type Props = {
  greeting: string
  firstName: string
  userEmail: string
  memberSince: string
  isAdmin: boolean
  isPro: boolean
  cancelPending: boolean
  planLabel: string
  savedDealSlugs: string[]
  tab: Tab
  tabs: { id: Tab; label: string; icon: string }[]
  isEditingName: boolean
  setIsEditingName: (v: boolean) => void
  tempName: string
  setTempName: (v: string) => void
  currentName: string
  savingName: boolean
  handleSaveName: () => void
  handleTabChange: (t: Tab) => void
}

export default function DashboardHero(props: Props) {
  const {
    greeting, firstName, userEmail, memberSince, isAdmin, isPro, cancelPending, planLabel,
    savedDealSlugs, tab, tabs, isEditingName, setIsEditingName, tempName, setTempName,
    currentName, savingName, handleSaveName, handleTabChange,
  } = props

  return (
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

        <div className="relative max-w-[1400px] mx-auto px-3.5 md:px-8 pt-4 md:pt-10 pb-3.5 md:pb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-8">
            <div className="min-w-0 flex-1">
              <m.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-[9px] md:text-[11px] font-bold uppercase tracking-[0.14em] md:tracking-[0.18em] text-accent-yellow inline-flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-3"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent-yellow opacity-60 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-yellow" />
                </span>
                {greeting} · Your HQ
              </m.p>

              {isEditingName ? (
                <div className="flex items-center gap-2 max-w-full md:max-w-md mt-1">
                  <input
                    type="text"
                    aria-label="Display name"
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
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="flex items-center gap-2.5 flex-wrap"
                >
                  <h1 className="font-mono text-[1.35rem] sm:text-3xl md:text-4xl font-black tracking-tight leading-[1.1]">
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
                </m.div>
              )}

              <p className="text-zinc-400 text-[11px] md:text-[13px] mt-1.5 md:mt-2.5 font-mono inline-flex items-center gap-1.5 md:gap-2 flex-wrap max-w-full">
                <span className="inline-flex items-center gap-1 truncate max-w-[min(100%,240px)]">
                  <span className="material-symbols-outlined !text-[12px] md:!text-[14px] text-zinc-600 shrink-0">
                    mail
                  </span>
                  <span className="truncate">{userEmail}</span>
                </span>
                <span className="text-zinc-700">·</span>
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined !text-[12px] md:!text-[14px] text-zinc-600">
                    calendar_today
                  </span>
                  <span className="md:hidden">{memberSince}</span>
                  <span className="hidden md:inline">Member since {memberSince}</span>
                </span>
              </p>
            </div>

            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-1.5 md:gap-2 flex-shrink-0"
            >
              {isAdmin && (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1 min-h-[32px] md:min-h-[40px] px-2.5 md:px-3.5 py-1.5 md:py-2 bg-white/[0.04] border border-white/15 hover:border-accent-yellow/50 rounded-lg md:rounded-xl font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] text-white transition-colors"
                >
                  <span className="material-symbols-outlined !text-[13px] md:!text-[14px]">admin_panel_settings</span>
                  Admin
                </Link>
              )}
              <div
                className={`inline-flex items-center gap-1.5 min-h-[32px] md:min-h-[40px] px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-lg md:rounded-xl font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] border ${
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
            </m.div>
          </div>

          {/* Stat strip — 3-col compact on mobile */}
          <div className="grid grid-cols-3 gap-1.5 md:gap-3 mt-3.5 md:mt-7">
            {[
              {
                label: 'Saved',
                value: String(savedDealSlugs.length),
                icon: 'bookmark',
                iconBg: 'bg-sky-500/15 text-sky-400 border-sky-500/25',
                valueColor: 'text-sky-300',
                hint: savedDealSlugs.length > 0 ? 'View saved' : 'Browse deals',
                onClick: () => handleTabChange('overview'),
              },
              {
                label: 'Plan',
                value: planLabel,
                icon: 'workspace_premium',
                iconBg: 'bg-accent-yellow/15 text-accent-yellow border-accent-yellow/30',
                valueColor: 'text-accent-yellow',
                hint: cancelPending ? 'Renewal off' : 'Manage billing',
                onClick: () => handleTabChange('billing'),
              },
              {
                label: 'Since',
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
                <m.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                >
                  <Tag
                    {...(interactive ? { onClick: stat.onClick!, type: 'button' as const } : {})}
                    className={`group/stat w-full flex flex-col md:flex-row items-start md:items-center gap-1.5 md:gap-3 px-2 md:px-3.5 py-2 md:py-3.5 min-h-0 md:min-h-[72px] rounded-xl md:rounded-2xl text-left border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all ${
                      interactive
                        ? 'hover:bg-white/[0.06] hover:border-accent-yellow/30 cursor-pointer active:scale-[0.99]'
                        : ''
                    }`}
                  >
                    <div
                      className={`w-7 h-7 md:w-11 md:h-11 rounded-lg md:rounded-xl border flex items-center justify-center flex-shrink-0 ${stat.iconBg}`}
                    >
                      <span className="material-symbols-outlined !text-[14px] md:!text-[20px]">{stat.icon}</span>
                    </div>
                    <div className="min-w-0 flex-1 w-full">
                      <p className="font-mono text-[8px] md:text-[9px] font-bold uppercase tracking-[0.1em] text-zinc-500 truncate">
                        {stat.label}
                      </p>
                      <p
                        className={`font-mono text-[12px] md:text-xl font-black leading-none mt-0.5 md:mt-1 tabular-nums truncate ${stat.valueColor}`}
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
                </m.div>
              )
            })}
          </div>
        </div>

        {/* Tabs integrated into hero bottom */}
        <div className="relative border-t border-white/[0.07] bg-black/40 backdrop-blur-md">
          <div className="max-w-[1400px] mx-auto px-2 md:px-8">
            <div
              className="flex gap-0.5 md:gap-1 overflow-x-auto mobile-scroll-hide"
              role="tablist"
              aria-label="Dashboard sections"
            >
              {tabs.map((t) => {
                const active = tab === t.id
                return (
                  <button type="button"
                    key={t.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleTabChange(t.id)}
                    className={`relative flex-1 md:flex-none flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-5 py-2.5 md:py-3.5 min-h-[40px] md:min-h-[48px] font-mono text-[10px] md:text-[12px] font-black uppercase tracking-[0.08em] whitespace-nowrap transition-colors ${
                      active
                        ? 'text-white'
                        : 'text-zinc-500 hover:text-zinc-200'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined !text-[16px] md:!text-[18px] ${
                        active ? 'text-accent-yellow' : ''
                      }`}
                    >
                      {t.icon}
                    </span>
                    {t.label}
                    {active && (
                      <m.span
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

  )
}
