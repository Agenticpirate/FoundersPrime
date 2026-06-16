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
    { label: 'Manage Deals', href: '/admin/deals', icon: Handshake, bg: 'bg-primary' },
    { label: 'Review Submissions', href: '/admin/submissions', icon: FileText, bg: 'bg-accent-yellow', badge: subs.pending },
    { label: 'Users', href: '/admin/users', icon: Users, bg: 'bg-white' },
    { label: 'Analytics', href: '/admin/analytics', icon: BarChart3, bg: 'bg-black text-white' },
  ]

  return (
    <div className="p-3 md:p-6 flex-1 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]">
      {/* Quick Actions — all link to real pages */}
      <div className="mb-4 md:mb-6 flex flex-wrap gap-2">
        {actions.map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className={`${a.bg} relative px-3 py-2 font-mono font-bold text-[10px] md:text-xs border-2 border-black shadow-[2px_2px_0px_#111] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-1.5`}
          >
            <a.icon className="w-3.5 h-3.5" />
            {a.label.toUpperCase()}
            {!!a.badge && a.badge > 0 && (
              <span className="ml-1 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 border border-black">{a.badge}</span>
            )}
          </Link>
        ))}
      </div>

      {/* Stats Overview — real data */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6">
        {overview.map((s) => (
          <div key={s.label} className={`${s.dark ? 'bg-black text-white' : 'bg-white'} p-3 border-2 border-black shadow-[2px_2px_0px_#111] relative overflow-hidden`}>
            <div className={`absolute -right-4 -top-4 w-12 h-12 ${s.accent} rounded-full ${s.dark ? 'border-white/20' : 'border-black'} border opacity-30`} />
            <p className={`font-mono font-bold text-[9px] md:text-[10px] ${s.dark ? 'text-white/60' : 'text-black/50'} uppercase mb-0.5 relative z-10`}>{s.label}</p>
            <div className="flex items-end justify-between relative z-10">
              <span className="font-black text-xl md:text-2xl font-mono">{s.value}</span>
              <span className={`font-mono text-[9px] font-bold ${s.dark ? 'text-primary' : 'text-green-600'}`}>{s.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-2 mb-4 md:mb-6">
        {quickStats.map((s) => (
          <div key={s.label} className={`${s.bg} ${s.text} p-2 md:p-3 border-2 border-black shadow-[2px_2px_0px_#111]`}>
            <div className="flex justify-between items-start mb-1">
              <span className="font-mono text-[8px] md:text-[10px] font-bold uppercase">{s.label}</span>
              <s.Icon className="w-3.5 h-3.5 opacity-50" />
            </div>
            <p className="font-black text-lg md:text-2xl font-mono">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-3 md:gap-6">
          {/* Revenue by plan — real data */}
          <section className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] p-3 md:p-5">
            <div className="flex justify-between items-center mb-3 border-b-2 border-black pb-2">
              <h3 className="font-mono font-bold text-sm md:text-lg uppercase">Revenue by Plan</h3>
              <span className="font-mono text-[10px] font-bold text-gray-400 uppercase">Active subs</span>
            </div>

            <div className="w-full bg-gray-50 border-2 border-dashed border-gray-300 mb-3 p-4 md:p-6 text-center">
              <p className="font-mono text-[10px] text-gray-400 uppercase mb-1">Realized Revenue</p>
              <p className="font-black text-3xl md:text-4xl font-mono text-green-700">{money(stats?.revenue ?? 0)}</p>
              <p className="font-mono text-[10px] text-gray-500 mt-1">{fmt(stats?.totalSubscribers ?? 0)} active subscriber(s), excl. tax</p>
            </div>

            <table className="w-full text-left font-mono text-[11px] md:text-xs">
              <thead className="border-b-2 border-black bg-gray-50">
                <tr>
                  <th className="p-2 font-bold uppercase">Plan</th>
                  <th className="p-2 font-bold uppercase">Subscribers</th>
                  <th className="p-2 font-bold uppercase">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {(stats?.planBreakdown ?? []).map((r) => (
                  <tr key={r.plan} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-2 font-bold">{r.label}</td>
                    <td className="p-2">{r.subscribers}</td>
                    <td className="p-2 font-bold text-green-700">${r.revenue.toLocaleString('en-US')}</td>
                  </tr>
                ))}
                {!loading && (stats?.planBreakdown ?? []).length === 0 && (
                  <tr><td colSpan={3} className="p-4 text-center text-gray-400 font-bold">No subscription data.</td></tr>
                )}
              </tbody>
            </table>
          </section>

          {/* Submissions snapshot — real data */}
          <section className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] p-3 md:p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-mono font-bold text-sm md:text-lg uppercase">Submissions</h3>
              <Link href="/admin/submissions" className="font-mono text-[10px] font-bold uppercase inline-flex items-center gap-1 hover:text-primary">
                Open <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Pending', value: fmt(subs.pending), bg: 'bg-accent-yellow' },
                { label: 'Approved', value: fmt(subs.approved), bg: 'bg-green-100' },
                { label: 'Total', value: fmt(subs.total), bg: 'bg-gray-100' },
              ].map((s) => (
                <div key={s.label} className={`${s.bg} border border-black p-3 text-center`}>
                  <p className="font-black text-xl font-mono">{s.value}</p>
                  <p className="font-mono text-[9px] font-bold uppercase text-black/60">{s.label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Recent subscribers — real data */}
        <div className="lg:col-span-1">
          <section className="bg-black text-white border-2 border-black shadow-[3px_3px_0px_#111] p-3 md:p-5">
            <div className="flex items-center gap-2 mb-3 border-b border-white/20 pb-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <h3 className="font-mono font-bold text-sm uppercase">Recent Subscriptions</h3>
            </div>
            <div className="flex flex-col gap-3">
              {(stats?.recentSubscribers ?? []).map((sub, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <div className="w-8 h-8 shrink-0 bg-accent-yellow text-black border border-white/30 flex items-center justify-center">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[11px] leading-tight">{sub.label} · ${sub.price}</p>
                    <p className="font-mono text-[9px] text-primary">
                      {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                    </p>
                  </div>
                </div>
              ))}
              {!loading && (stats?.recentSubscribers ?? []).length === 0 && (
                <p className="text-center text-[10px] font-mono text-white/40 uppercase py-4">
                  No paid subscriptions yet
                </p>
              )}
              {loading && (
                <p className="text-center text-[10px] font-mono text-white/40 uppercase py-4">Loading…</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
