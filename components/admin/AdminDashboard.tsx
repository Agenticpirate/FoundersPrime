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
} from 'lucide-react'
import Link from 'next/link'
import AdminStatCard from '@/components/admin/ui/AdminStatCard'
import AdminDashboardAside from '@/components/admin/AdminDashboardAside'
import AdminDashboardQueue from '@/components/admin/AdminDashboardQueue'
import AdminDashboardRevenue from '@/components/admin/AdminDashboardRevenue'
import AdminDashboardDealStrip from '@/components/admin/AdminDashboardDealStrip'
import AdminDashboardErrors from '@/components/admin/AdminDashboardErrors'

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
    {
      label: 'Ideas hub',
      href: '/admin/ideas',
      icon: Lightbulb,
      className: 'border-fuchsia-500/25 text-fuchsia-400 hover:border-fuchsia-400/50',
    },
    {
      label: 'Paid members',
      href: '/admin/users?role=paid',
      icon: Users,
      className: 'border-accent-yellow/25 text-accent-yellow hover:border-accent-yellow/50',
    },
  ]

  return (
    <div className="p-4 md:p-6 lg:p-8 flex-1 bg-[#090a0f] text-white min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="min-w-0">
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
        <AdminDashboardErrors errors={errors} onRetry={() => load(true)} />
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

      <AdminDashboardDealStrip loading={loading} deals={deals} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
          <AdminDashboardQueue loading={loading} pendingList={pendingList} />

          <AdminDashboardRevenue
            loading={loading}
            revenue={stats?.revenue ?? 0}
            totalSubscribers={stats?.totalSubscribers ?? 0}
            planBreakdown={stats?.planBreakdown ?? []}
            fmt={fmt}
            money={money}
          />
        </div>

        <AdminDashboardAside
          loading={loading}
          recentSubscribers={stats?.recentSubscribers ?? []}
        />
      </div>
    </div>
  )
}
