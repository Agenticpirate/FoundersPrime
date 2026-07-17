'use client'

import { useEffect, useState } from 'react'
import {
  Handshake,
  FileText,
  Users,
  BarChart3,
  ArrowRight,
  Plus,
  Download,
  Lightbulb,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react'
import Link from 'next/link'
import AdminStatCard from '@/components/admin/ui/AdminStatCard'

type PlanRow = { plan: string; label: string; subscribers: number; revenue: number }
type Stats = {
  totalSubscribers: number
  revenue: number
  totalUsers?: number
  activeUsers30d?: number
  pendingSubmissions?: number
  planBreakdown: PlanRow[]
  recentSubscribers: {
    plan: string
    label: string
    price: number
    createdAt: string | null
    email?: string | null
    periodEnd?: string | null
  }[]
}
type SubRow = {
  id: string
  company_name?: string
  status?: string
  category?: string
  deal_value?: string | number
  featured_requested?: boolean
  created_at?: string
  submitter_email?: string | null
}

const fetchJson = async (url: string) => {
  const res = await fetch(url, { credentials: 'include', cache: 'no-store' })
  const json = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, json }
}

export default function AdminDashboard() {
  const [deals, setDeals] = useState({ total: 0, active: 0, expired: 0, featured: 0 })
  const [subs, setSubs] = useState({ total: 0, pending: 0, approved: 0 })
  const [pendingList, setPendingList] = useState<SubRow[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<{ label: string; detail: string }[]>([])
  const [refreshing, setRefreshing] = useState(false)

  const load = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)
    const errs: { label: string; detail: string }[] = []

    const [dealsRes, subRes, statsRes] = await Promise.allSettled([
      fetchJson('/api/deals'),
      fetchJson('/api/admin/submissions'),
      fetchJson('/api/admin/stats'),
    ])

    if (dealsRes.status === 'fulfilled' && Array.isArray(dealsRes.value.json?.deals)) {
      const d = dealsRes.value.json.deals as { status?: string; featured?: boolean }[]
      setDeals({
        total: d.length,
        active: d.filter((x) => x.status === 'active').length,
        expired: d.filter((x) => x.status === 'expired').length,
        featured: d.filter((x) => x.featured).length,
      })
    } else {
      errs.push({
        label: 'Deals',
        detail:
          dealsRes.status === 'fulfilled'
            ? dealsRes.value.json?.error || `HTTP ${dealsRes.value.status}`
            : 'Network error',
      })
    }

    if (
      subRes.status === 'fulfilled' &&
      subRes.value.ok &&
      Array.isArray(subRes.value.json?.submissions)
    ) {
      const s = subRes.value.json.submissions as SubRow[]
      setSubs({
        total: s.length,
        pending: s.filter((x) => x.status === 'pending').length,
        approved: s.filter((x) => x.status === 'approved').length,
      })
      setPendingList(
        s
          .filter((x) => x.status === 'pending')
          .sort(
            (a, b) =>
              new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
          )
          .slice(0, 6)
      )
    } else {
      const detail =
        subRes.status === 'fulfilled'
          ? subRes.value.json?.error || `HTTP ${subRes.value.status}`
          : 'Network error'
      errs.push({ label: 'Submissions', detail })
      setSubs({ total: 0, pending: 0, approved: 0 })
      setPendingList([])
    }

    if (statsRes.status === 'fulfilled' && statsRes.value.ok && statsRes.value.json && !statsRes.value.json.error) {
      setStats(statsRes.value.json as Stats)
    } else {
      const detail =
        statsRes.status === 'fulfilled'
          ? statsRes.value.json?.error || `HTTP ${statsRes.value.status}`
          : 'Network error'
      errs.push({ label: 'Revenue', detail })
      setStats(null)
    }

    setErrors(errs)
    setLoading(false)
    setRefreshing(false)
  }

  useEffect(() => {
    load()
  }, [])

  const fmt = (n: number) => (loading ? '—' : String(n))
  const money = (n: number) =>
    loading ? '—' : `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`

  const actions = [
    {
      label: 'Add / manage deals',
      href: '/admin/deals',
      icon: Handshake,
      className: 'border-emerald-500/25 text-emerald-400 hover:border-emerald-400/50',
    },
    {
      label: 'Review submissions',
      href: '/admin/submissions',
      icon: FileText,
      className: 'border-amber-500/25 text-accent-yellow hover:border-accent-yellow/50',
      badge: subs.pending,
    },
    {
      label: 'Users & plans',
      href: '/admin/users',
      icon: Users,
      className: 'border-white/15 text-zinc-300 hover:border-white/30',
    },
    {
      label: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
      className: 'border-purple-500/25 text-purple-400 hover:border-purple-400/50',
    },
  ]

  return (
    <div className="p-4 md:p-8 flex-1 bg-[#090a0f] text-white">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">
            Command center
          </p>
          <h2 className="font-mono text-lg md:text-xl font-black text-white mt-0.5">
            Ops overview
          </h2>
        </div>
        <button
          type="button"
          onClick={() => load(true)}
          disabled={loading || refreshing}
          className="inline-flex items-center gap-2 min-h-[40px] px-3.5 rounded-lg border border-white/10 bg-[#0d0e12] font-mono text-[10px] font-bold uppercase text-zinc-300 hover:border-accent-yellow/40 hover:text-accent-yellow disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {errors.length > 0 && (
        <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[11px] font-bold text-amber-200 uppercase tracking-wide">
                Partial load
              </p>
              <ul className="mt-1.5 space-y-1">
                {errors.map((e) => (
                  <li key={e.label} className="font-mono text-[11px] text-amber-100/90">
                    <span className="font-black">{e.label}:</span> {e.detail}
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-mono text-[10px] text-amber-200/70">
                Confirm you&apos;re signed in as an admin and SUPABASE_SERVICE_ROLE_KEY is set.
              </p>
            </div>
            <button
              type="button"
              onClick={() => load(true)}
              className="shrink-0 font-mono text-[10px] font-bold uppercase text-amber-200 underline"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="mb-6 flex flex-wrap gap-2">
        {actions.map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className={`relative inline-flex items-center gap-2 rounded-lg border bg-[#0d0e12] px-3.5 py-2.5 min-h-[44px] font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-wide transition-colors ${a.className}`}
          >
            <a.icon className="w-4 h-4" />
            {a.label}
            {!!a.badge && a.badge > 0 && (
              <span className="ml-0.5 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                {a.badge}
              </span>
            )}
          </Link>
        ))}
        <Link
          href="/admin/deals"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-accent-yellow text-black px-3.5 py-2.5 min-h-[44px] font-mono text-[10px] md:text-[11px] font-black uppercase tracking-wide"
        >
          <Plus className="w-4 h-4" />
          New deal
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <AdminStatCard
          label="Paid subscribers"
          value={fmt(stats?.totalSubscribers ?? 0)}
          hint="Active plans"
          accent="yellow"
        />
        <AdminStatCard
          label="Revenue"
          value={money(stats?.revenue ?? 0)}
          hint="USD excl. tax · list price"
          accent="emerald"
        />
        <AdminStatCard
          label="Registered users"
          value={fmt(stats?.totalUsers ?? 0)}
          hint={`${stats?.activeUsers30d ?? 0} active · 30d`}
          accent="sky"
        />
        <AdminStatCard
          label="Pending review"
          value={fmt(subs.pending || stats?.pendingSubmissions || 0)}
          hint={`${subs.approved} approved · ${subs.total} total`}
          accent="red"
        />
      </div>

      {/* Secondary deal strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {[
          { label: 'Catalog deals', value: deals.total },
          { label: 'Active deals', value: deals.active },
          { label: 'Featured', value: deals.featured },
          { label: 'Expired', value: deals.expired },
        ].map((x) => (
          <div
            key={x.label}
            className="rounded-lg border border-white/10 bg-[#0d0e12] px-3 py-2.5"
          >
            <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">{x.label}</p>
            <p className="font-mono text-lg font-black text-white tabular-nums mt-0.5">
              {loading ? '—' : x.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
          {/* Attention queue */}
          <section className="rounded-xl border border-white/10 bg-[#0d0e12] p-4 md:p-5">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-white">
                Attention queue
              </h3>
              <Link
                href="/admin/submissions"
                className="font-mono text-[10px] font-bold uppercase text-accent-yellow inline-flex items-center gap-1 hover:text-yellow-300"
              >
                All submissions <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {loading && (
              <p className="font-mono text-[11px] text-zinc-500 py-6 text-center">Loading…</p>
            )}
            {!loading && pendingList.length === 0 && (
              <div className="py-8 text-center border border-dashed border-white/10 rounded-lg">
                <p className="font-mono text-[11px] text-zinc-500">
                  No pending submissions — queue clear
                </p>
                <Link
                  href="/submit-deal"
                  className="inline-block mt-2 font-mono text-[10px] text-accent-yellow hover:underline"
                >
                  Open public submit form →
                </Link>
              </div>
            )}
            <div className="space-y-2">
              {pendingList.map((s) => (
                <Link
                  key={s.id}
                  href={`/admin/submissions/${s.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:border-accent-yellow/30 hover:bg-white/[0.03] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs font-bold text-white truncate">
                      {s.company_name || 'Untitled'}
                      {s.featured_requested && (
                        <span className="ml-2 text-[9px] text-accent-yellow">★ Featured</span>
                      )}
                    </p>
                    <p className="font-mono text-[10px] text-zinc-500 mt-0.5 truncate">
                      {s.category || '—'}
                      {s.deal_value != null && s.deal_value !== ''
                        ? ` · $${s.deal_value}`
                        : ''}
                      {s.submitter_email ? ` · ${s.submitter_email}` : ''}
                      {s.created_at
                        ? ` · ${new Date(s.created_at).toLocaleDateString()}`
                        : ''}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] font-bold uppercase text-black bg-accent-yellow px-2.5 py-1.5 rounded-md">
                    Review
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Revenue by plan */}
          <section className="rounded-xl border border-white/10 bg-[#0d0e12] p-4 md:p-5">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
              <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-white">
                Revenue by plan
              </h3>
              <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase">
                Active subs
              </span>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#121318] p-4 mb-4 text-center">
              <p className="font-mono text-[9px] text-zinc-500 uppercase mb-1">Realized revenue</p>
              <p className="font-black text-3xl font-mono text-emerald-400">
                {money(stats?.revenue ?? 0)}
              </p>
              <p className="font-mono text-[10px] text-zinc-500 mt-1">
                {fmt(stats?.totalSubscribers ?? 0)} subscriber(s) · excl. tax · list-price fallback
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px] md:text-xs">
                <thead className="border-b border-white/10 text-zinc-500">
                  <tr>
                    <th className="p-2.5 font-bold uppercase">Plan</th>
                    <th className="p-2.5 font-bold uppercase">Subs</th>
                    <th className="p-2.5 font-bold uppercase">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(stats?.planBreakdown ?? []).map((r) => (
                    <tr key={r.plan} className="hover:bg-white/[0.03]">
                      <td className="p-2.5 font-bold text-zinc-200">{r.label}</td>
                      <td className="p-2.5 text-zinc-400 tabular-nums">{r.subscribers}</td>
                      <td className="p-2.5 font-bold text-emerald-400 tabular-nums">
                        ${r.revenue.toLocaleString('en-US')}
                      </td>
                    </tr>
                  ))}
                  {!loading && (stats?.planBreakdown ?? []).length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-5 text-center text-zinc-500">
                        No subscription data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-4">
          <section className="rounded-xl border border-white/10 bg-[#0d0e12] p-4 md:p-5">
            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-white">
                Recent paid
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              {(stats?.recentSubscribers ?? []).map((sub, i) => (
                <div
                  key={`${sub.email || sub.plan}-${i}`}
                  className="flex gap-3 items-center p-2.5 rounded-lg border border-white/5 bg-white/[0.02]"
                >
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-accent-yellow/15 border border-accent-yellow/20 text-accent-yellow flex items-center justify-center font-mono text-[10px] font-black">
                    $
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[11px] text-zinc-100 truncate">
                      {sub.label} · ${sub.price}
                    </p>
                    <p className="font-mono text-[9px] text-zinc-400 mt-0.5 truncate">
                      {sub.email || '—'}
                    </p>
                    <p className="font-mono text-[9px] text-zinc-600 mt-0.5">
                      {sub.createdAt
                        ? new Date(sub.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : '—'}
                      {sub.periodEnd
                        ? ` · ends ${new Date(sub.periodEnd).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric',
                          })}`
                        : ''}
                    </p>
                  </div>
                </div>
              ))}
              {!loading && (stats?.recentSubscribers ?? []).length === 0 && (
                <p className="text-center text-[10px] font-mono text-zinc-600 py-6 border border-dashed border-white/10 rounded-lg">
                  No paid subscriptions yet
                </p>
              )}
            </div>
            <Link
              href="/admin/users?role=founder"
              className="mt-3 flex items-center justify-center gap-1 min-h-[40px] rounded-lg border border-white/10 font-mono text-[10px] font-bold uppercase text-zinc-400 hover:text-accent-yellow hover:border-accent-yellow/30 transition-colors"
            >
              View all users <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>

          <section className="rounded-xl border border-white/10 bg-[#0d0e12] p-4 md:p-5">
            <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-white mb-3">
              Shortcuts
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                { href: '/deals', label: 'Live deals catalog', icon: Handshake },
                { href: '/ideas', label: 'Ideas hub', icon: Lightbulb },
                { href: '/pricing', label: 'Pricing page', icon: Download },
                { href: '/admin/ideas', label: 'Manage ideas list', icon: Lightbulb },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg border border-white/10 text-zinc-300 hover:border-accent-yellow/30 hover:text-white font-mono text-[11px] transition-colors"
                >
                  <l.icon className="w-3.5 h-3.5 text-zinc-500" />
                  {l.label}
                  <ArrowRight className="w-3 h-3 ml-auto text-zinc-600" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
