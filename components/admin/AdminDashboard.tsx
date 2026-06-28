'use client'

import { useEffect, useState } from 'react'
import {
  Handshake, FileText, Users, BarChart3,
  CheckCircle, Clock, Calendar, Award, ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

type PlanRow = { plan: string; label: string; subscribers: number; revenue: number }
type Stats = {
  totalSubscribers: number
  revenue: number
  planBreakdown: PlanRow[]
  recentSubscribers: { plan: string; label: string; price: number; createdAt: string | null }[]
}

export default function AdminDashboard() {
  const [deals, setDeals] = useState({ total: 0, active: 0, expired: 0 })
  const [subs, setSubs] = useState({ total: 0, pending: 0, approved: 0 })
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    const load = async () => {
      const [dealsRes, subRes, statsRes] = await Promise.allSettled([
        fetch('/api/deals').then((r) => r.json()),
        fetch('/api/admin/submissions').then((r) => r.json()),
        fetch('/api/admin/stats').then((r) => r.json()),
      ])
      if (!alive) return

      if (dealsRes.status === 'fulfilled' && Array.isArray(dealsRes.value?.deals)) {
        const d = dealsRes.value.deals as { status?: string }[]
        setDeals({
          total: d.length,
          active: d.filter((x) => x.status === 'active').length,
          expired: d.filter((x) => x.status === 'expired').length,
        })
      }
      if (subRes.status === 'fulfilled' && Array.isArray(subRes.value?.submissions)) {
        const s = subRes.value.submissions as { status?: string }[]
        setSubs({
          total: s.length,
          pending: s.filter((x) => x.status === 'pending').length,
          approved: s.filter((x) => x.status === 'approved').length,
        })
      }
      if (statsRes.status === 'fulfilled' && statsRes.value && !statsRes.value.error) {
        setStats(statsRes.value as Stats)
      }
      setLoading(false)
    }
    load()
    return () => { alive = false }
  }, [])

  const fmt = (n: number) => (loading ? '—' : String(n))
  const money = (n: number) => (loading ? '—' : `$${n.toLocaleString('en-US')}`)

  const overview = [
    { label: 'Paid Subscribers', value: fmt(stats?.totalSubscribers ?? 0), change: 'Active', accent: 'bg-primary' },
    { label: 'Revenue', value: money(stats?.revenue ?? 0), change: 'USD excl. tax', accent: 'bg-accent-yellow' },
    { label: 'Active Deals', value: fmt(deals.active), change: `${deals.total} total`, accent: 'bg-blue-500' },
    { label: 'Pending Review', value: fmt(subs.pending), change: 'Submissions', accent: 'bg-black', dark: true },
  ]

  const quickStats = [
    { label: 'Total Deals', value: fmt(deals.total), Icon: CheckCircle, bg: 'bg-white', text: 'text-black' },
    { label: 'Pending Subs', value: fmt(subs.pending), Icon: Clock, bg: 'bg-accent-yellow', text: 'text-black' },
    { label: 'Expired Deals', value: fmt(deals.expired), Icon: Calendar, bg: 'bg-white', text: 'text-black' },
    { label: 'Approved Subs', value: fmt(subs.approved), Icon: Award, bg: 'bg-green-500', text: 'text-white' },
  ]

  const actions = [
    { label: 'Manage Deals', href: '/admin/deals', icon: Handshake, bgClass: 'bg-emerald-950/30 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/50' },
    { label: 'Review Submissions', href: '/admin/submissions', icon: FileText, bgClass: 'bg-amber-950/30 text-accent-yellow border border-amber-500/20 hover:border-accent-yellow/50', badge: subs.pending },
    { label: 'Users', href: '/admin/users', icon: Users, bgClass: 'bg-zinc-900 text-zinc-300 border border-white/10 hover:border-white/30' },
    { label: 'Analytics', href: '/admin/analytics', icon: BarChart3, bgClass: 'bg-[#121318] text-purple-400 border border-purple-500/20 hover:border-purple-500/50' },
  ]

  return (
    <div className="p-4 md:p-8 flex-1 bg-[#090a0f] text-white">
      {/* Quick Actions — all link to real pages */}
      <div className="mb-6 flex flex-wrap gap-2.5">
        {actions.map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className={`${a.bgClass} relative px-4.5 py-2.5 font-mono font-bold text-[10px] md:text-xs rounded hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 shadow-[2px_2px_0px_rgba(0,0,0,0.2)]`}
          >
            <a.icon className="w-4.5 h-4.5" />
            {a.label.toUpperCase()}
            {!!a.badge && a.badge > 0 && (
              <span className="ml-1.5 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded border border-black">{a.badge}</span>
            )}
          </Link>
        ))}
      </div>

      {/* Stats Overview — real data */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {overview.map((s) => (
          <div key={s.label} className="bg-[#0d0e12]/90 p-4 border border-white/10 rounded relative overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
            <div className={`absolute -right-4 -top-4 w-12 h-12 ${s.accent} rounded-full border border-white/10 opacity-20 blur-sm`} />
            <p className="font-mono font-bold text-[9px] md:text-[10px] text-zinc-500 uppercase mb-1 relative z-10">{s.label}</p>
            <div className="flex items-end justify-between relative z-10">
              <span className="font-black text-xl md:text-2xl font-mono text-white">{s.value}</span>
              <span className="font-mono text-[9px] font-bold text-accent-yellow">{s.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {quickStats.map((s) => (
          <div key={s.label} className={`${s.bg} p-3.5 border rounded shadow-[4px_4px_0px_rgba(0,0,0,0.3)]`}>
            <div className="flex justify-between items-start mb-1.5">
              <span className="font-mono text-[9px] md:text-[10px] font-bold uppercase opacity-85">{s.label}</span>
              <s.Icon className="w-4 h-4 opacity-50" />
            </div>
            <p className="font-black text-lg md:text-2xl font-mono leading-none">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
          {/* Revenue by plan — real data */}
          <section className="bg-[#0d0e12]/90 border border-white/10 rounded shadow-[4px_4px_0px_rgba(0,0,0,0.3)] p-4 md:p-6">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
              <h3 className="font-mono font-bold text-sm md:text-base uppercase tracking-wider text-white">Revenue by Plan</h3>
              <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase">Active subs</span>
            </div>

            <div className="w-full bg-[#121318] border border-dashed border-white/10 rounded mb-4 p-5 text-center">
              <p className="font-mono text-[9px] text-zinc-500 uppercase mb-1">Realized Revenue</p>
              <p className="font-black text-3xl md:text-4xl font-mono text-emerald-400">{money(stats?.revenue ?? 0)}</p>
              <p className="font-mono text-[10px] text-zinc-400 mt-1">{fmt(stats?.totalSubscribers ?? 0)} active subscriber(s), excl. tax</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px] md:text-xs">
                <thead className="border-b border-white/10 bg-[#121318] text-zinc-400">
                  <tr>
                    <th className="p-3 font-bold uppercase tracking-wider">Plan</th>
                    <th className="p-3 font-bold uppercase tracking-wider">Subscribers</th>
                    <th className="p-3 font-bold uppercase tracking-wider">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(stats?.planBreakdown ?? []).map((r) => (
                    <tr key={r.plan} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 font-bold text-zinc-200">{r.label}</td>
                      <td className="p-3 text-zinc-300">{r.subscribers}</td>
                      <td className="p-3 font-bold text-emerald-400">${r.revenue.toLocaleString('en-US')}</td>
                    </tr>
                  ))}
                  {!loading && (stats?.planBreakdown ?? []).length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-5 text-center text-zinc-500 font-bold uppercase">No subscription data.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Submissions snapshot — real data */}
          <section className="bg-[#0d0e12]/90 border border-white/10 rounded shadow-[4px_4px_0px_rgba(0,0,0,0.3)] p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-mono font-bold text-sm md:text-base uppercase tracking-wider text-white">Submissions</h3>
              <Link href="/admin/submissions" className="font-mono text-[9px] font-bold uppercase inline-flex items-center gap-1.5 text-accent-yellow hover:text-yellow-400 transition-colors">
                Open <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Pending', value: fmt(subs.pending), bg: 'bg-amber-950/20 border-amber-500/20 text-accent-yellow' },
                { label: 'Approved', value: fmt(subs.approved), bg: 'bg-emerald-950/20 border-emerald-500/20 text-emerald-400' },
                { label: 'Total', value: fmt(subs.total), bg: 'bg-zinc-900 border-white/10 text-zinc-300' },
              ].map((s) => (
                <div key={s.label} className={`${s.bg} border rounded p-4 text-center`}>
                  <p className="font-black text-xl font-mono leading-none mb-1">{s.value}</p>
                  <p className="font-mono text-[9px] font-bold uppercase opacity-75">{s.label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Recent subscribers — real data */}
        <div className="lg:col-span-1">
          <section className="bg-[#0d0e12]/90 border border-white/10 rounded shadow-[4px_4px_0px_rgba(0,0,0,0.3)] p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-white">Recent Subscriptions</h3>
            </div>
            <div className="flex flex-col gap-3">
              {(stats?.recentSubscribers ?? []).map((sub, i) => (
                <div key={i} className="flex gap-3 items-center p-2 rounded hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                  <div className="w-8 h-8 shrink-0 bg-accent-yellow/15 border border-accent-yellow/20 text-accent-yellow flex items-center justify-center rounded">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[11px] leading-tight text-zinc-100">{sub.label} · ${sub.price}</p>
                    <p className="font-mono text-[9px] text-zinc-500 mt-0.5">
                      {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                    </p>
                  </div>
                </div>
              ))}
              {!loading && (stats?.recentSubscribers ?? []).length === 0 && (
                <p className="text-center text-[10px] font-mono text-zinc-600 uppercase py-6 border border-dashed border-white/10 rounded">
                  No paid subscriptions yet
                </p>
              )}
              {loading && (
                <p className="text-center text-[10px] font-mono text-zinc-600 uppercase py-6">Loading…</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
