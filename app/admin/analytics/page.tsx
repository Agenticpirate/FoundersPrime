'use client'

import { useEffect, useMemo, useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminStatCard from '@/components/admin/ui/AdminStatCard'

type PlanRow = { plan: string; label: string; subscribers: number; revenue: number }
type Stats = {
  totalSubscribers: number
  revenue: number
  totalUsers?: number
  activeUsers30d?: number
  planBreakdown: PlanRow[]
  recentSubscribers: {
    plan: string
    label: string
    price: number
    createdAt: string | null
    email?: string | null
  }[]
}

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d')
  const [stats, setStats] = useState<Stats | null>(null)
  const [deals, setDeals] = useState<any[]>([])
  const [subs, setSubs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    const opts = { credentials: 'include' as RequestCredentials, cache: 'no-store' as RequestCache }
    Promise.all([
      fetch('/api/admin/stats', opts).then((r) => r.json()),
      fetch('/api/deals', opts).then((r) => r.json()),
      fetch('/api/admin/submissions', opts).then((r) => r.json()),
    ]).then(([st, d, s]) => {
      if (!alive) return
      if (st && !st.error) setStats(st)
      if (Array.isArray(d?.deals)) setDeals(d.deals)
      if (Array.isArray(s?.submissions)) setSubs(s.submissions)
      setLoading(false)
    })
    return () => {
      alive = false
    }
  }, [])

  const sinceMs = useMemo(() => {
    if (timeRange === 'all') return 0
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    return Date.now() - days * 86400000
  }, [timeRange])

  const recentSubs = useMemo(() => {
    const rows = stats?.recentSubscribers || []
    if (!sinceMs) return rows
    return rows.filter((r) => r.createdAt && new Date(r.createdAt).getTime() >= sinceMs)
  }, [stats, sinceMs])

  const recentSubmissions = useMemo(() => {
    if (!sinceMs) return subs
    return subs.filter((s) => s.created_at && new Date(s.created_at).getTime() >= sinceMs)
  }, [subs, sinceMs])

  const topProviders = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const d of deals) {
      const p = d.provider || 'Unknown'
      counts[p] = (counts[p] || 0) + 1
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
  }, [deals])

  const fmt = (n: number) => (loading ? '—' : String(n))
  const money = (n: number) =>
    loading ? '—' : `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`

  const pending = subs.filter((s) => s.status === 'pending').length
  const approved = subs.filter((s) => s.status === 'approved').length
  const approvalRate =
    approved + pending === 0
      ? '—'
      : `${Math.round((approved / (approved + pending + subs.filter((s) => s.status === 'rejected').length || 1)) * 100)}%`

  return (
    <>
      <AdminHeader
        title="Analytics"
        subtitle="Platform ops metrics (live catalog + subscriptions)"
      />
      <div className="p-4 md:p-6 flex-1 bg-[#090a0f] text-white">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <p className="font-mono text-[10px] text-zinc-500 max-w-lg">
            Not product traffic analytics — derived from deals DB, paid subscriptions, and
            featured submissions. Time range filters recent activity lists.
          </p>
          <div className="flex gap-1">
            {(['7d', '30d', '90d', 'all'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setTimeRange(r)}
                className={`px-2.5 py-1.5 min-h-[36px] font-mono text-[10px] font-bold border rounded-md uppercase ${
                  timeRange === r
                    ? 'bg-accent-yellow text-black border-accent-yellow'
                    : 'bg-[#0d0e12] text-zinc-400 border-white/10'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <AdminStatCard
            label="Paid subscribers"
            value={fmt(stats?.totalSubscribers ?? 0)}
            accent="yellow"
          />
          <AdminStatCard
            label="Revenue"
            value={money(stats?.revenue ?? 0)}
            hint="Excl. tax"
            accent="emerald"
          />
          <AdminStatCard
            label="Active deals"
            value={fmt(deals.filter((d) => d.status === 'active').length)}
            hint={`${deals.length} total`}
            accent="sky"
          />
          <AdminStatCard
            label="Pending subs"
            value={fmt(pending)}
            hint={`${approved} approved`}
            accent="red"
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <AdminStatCard
            label="Registered users"
            value={fmt(stats?.totalUsers ?? 0)}
            hint={`${stats?.activeUsers30d ?? 0} active · 30d`}
          />
          <AdminStatCard
            label="Featured deals"
            value={fmt(deals.filter((d) => d.featured).length)}
            accent="yellow"
          />
          <AdminStatCard label="Submissions" value={fmt(subs.length)} />
          <AdminStatCard
            label="Approval rate"
            value={loading ? '—' : approvalRate}
            hint="Approved / decided"
            accent="emerald"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <section className="rounded-xl border border-white/10 bg-[#0d0e12] p-4">
            <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-white mb-3 border-b border-white/10 pb-2">
              Top providers (catalog)
            </h3>
            <div className="space-y-1.5">
              {topProviders.map(([name, count], i) => (
                <div
                  key={name}
                  className="flex items-center justify-between p-2 rounded-lg border border-white/5 bg-white/[0.02] font-mono text-xs"
                >
                  <span className="text-zinc-300">
                    <span className="text-zinc-600 mr-2">#{i + 1}</span>
                    {name}
                  </span>
                  <span className="text-accent-yellow font-bold tabular-nums">{count}</span>
                </div>
              ))}
              {!loading && topProviders.length === 0 && (
                <p className="text-zinc-500 text-xs font-mono py-6 text-center">No deals</p>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-white/10 bg-[#0d0e12] p-4">
            <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-white mb-3 border-b border-white/10 pb-2">
              Plan mix
            </h3>
            <div className="space-y-2">
              {(stats?.planBreakdown || []).map((p) => {
                const total = stats?.totalSubscribers || 1
                const pct = Math.round((p.subscribers / total) * 100)
                return (
                  <div key={p.plan}>
                    <div className="flex justify-between font-mono text-[11px] mb-1">
                      <span className="text-zinc-300">{p.label}</span>
                      <span className="text-zinc-500">
                        {p.subscribers} · ${p.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent-yellow/80"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="rounded-xl border border-white/10 bg-[#0d0e12] p-4">
            <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-white mb-3 border-b border-white/10 pb-2">
              Recent paid ({timeRange})
            </h3>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {recentSubs.map((r, i) => (
                <div
                  key={i}
                  className="flex justify-between gap-2 p-2 rounded-lg border border-white/5 font-mono text-[11px]"
                >
                  <div className="min-w-0">
                    <span className="text-zinc-300 block">{r.label}</span>
                    {r.email && (
                      <span className="text-zinc-600 text-[9px] truncate block">{r.email}</span>
                    )}
                  </div>
                  <span className="text-emerald-400 font-bold shrink-0">${r.price}</span>
                </div>
              ))}
              {!loading && recentSubs.length === 0 && (
                <p className="text-zinc-500 text-xs font-mono py-6 text-center">None in range</p>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-white/10 bg-[#0d0e12] p-4">
            <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-white mb-3 border-b border-white/10 pb-2">
              Submissions ({timeRange})
            </h3>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {recentSubmissions.slice(0, 12).map((s) => (
                <div
                  key={s.id}
                  className="flex justify-between gap-2 p-2 rounded-lg border border-white/5 font-mono text-[11px]"
                >
                  <span className="text-zinc-300 truncate">{s.company_name}</span>
                  <span
                    className={
                      s.status === 'pending'
                        ? 'text-accent-yellow'
                        : s.status === 'approved'
                          ? 'text-emerald-400'
                          : 'text-red-400'
                    }
                  >
                    {s.status}
                  </span>
                </div>
              ))}
              {!loading && recentSubmissions.length === 0 && (
                <p className="text-zinc-500 text-xs font-mono py-6 text-center">None in range</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
