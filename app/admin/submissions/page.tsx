'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminStatCard from '@/components/admin/ui/AdminStatCard'
import { RefreshCw, Search } from 'lucide-react'

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [status, setStatus] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'changes_requested' | 'spam'>('all')
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [query, setQuery] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/submissions', {
        credentials: 'include',
        cache: 'no-store',
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok) {
        setSubmissions(json.submissions || [])
      } else {
        setError(json.error || `Failed to load (HTTP ${res.status})`)
        setSubmissions([])
      }
    } catch (e: any) {
      setError(e?.message || 'Network error')
      setSubmissions([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const pending = submissions.filter((s) => s.status === 'pending').length
  const approved = submissions.filter((s) => s.status === 'approved').length
  const rejected = submissions.filter((s) => s.status === 'rejected').length

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return submissions.filter((s) => {
      if (status !== 'all' && s.status !== status) return false
      if (featuredOnly && !s.featured_requested) return false
      if (!q) return true
      return (
        String(s.company_name || '')
          .toLowerCase()
          .includes(q) ||
        String(s.submitter_email || '')
          .toLowerCase()
          .includes(q) ||
        String(s.category || '')
          .toLowerCase()
          .includes(q)
      )
    })
  }, [submissions, status, featuredOnly, query])

  const statusChip = (st: string) => {
    if (st === 'pending') return 'bg-amber-500/15 text-accent-yellow border-amber-500/30'
    if (st === 'approved') return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
    if (st === 'changes_requested') return 'bg-sky-500/15 text-sky-300 border-sky-500/30'
    if (st === 'spam') return 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30'
    return 'bg-red-500/15 text-red-300 border-red-500/30'
  }

  return (
    <>
      <AdminHeader title="Submissions" subtitle="Featured & community deal review queue" />
      <div className="p-4 md:p-6 flex-1 bg-[#090a0f] text-white">
        {error && (
          <div className="mb-3 rounded-lg border border-red-500/40 bg-red-500/10 text-red-300 font-mono text-xs p-3 flex items-center justify-between gap-3">
            <span>{error}</span>
            <button
              type="button"
              onClick={load}
              className="shrink-0 underline font-bold uppercase text-[10px]"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <AdminStatCard label="Pending" value={loading ? '—' : pending} accent="yellow" />
          <AdminStatCard label="Approved" value={loading ? '—' : approved} accent="emerald" />
          <AdminStatCard label="Rejected" value={loading ? '—' : rejected} accent="red" />
          <AdminStatCard label="Total" value={loading ? '—' : submissions.length} />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <label className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search company, email, category…"
              className="w-full pl-10 pr-3 py-2.5 min-h-[44px] rounded-lg border border-white/10 bg-[#0d0e12] text-white font-mono text-sm focus:outline-none focus:border-accent-yellow/40"
            />
          </label>
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 rounded-lg border border-white/10 text-zinc-400 font-mono text-[10px] font-bold uppercase hover:text-accent-yellow"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {(['all', 'pending', 'approved', 'rejected', 'changes_requested', 'spam'] as const).map(
            (s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={`px-3 py-2 min-h-[40px] rounded-lg font-mono text-[10px] font-bold uppercase border ${
                  status === s
                    ? 'bg-accent-yellow text-black border-accent-yellow'
                    : 'bg-[#0d0e12] text-zinc-400 border-white/10'
                }`}
              >
                {s.replace('_', ' ')}
              </button>
            )
          )}
          <button
            type="button"
            onClick={() => setFeaturedOnly((v) => !v)}
            className={`px-3 py-2 min-h-[40px] rounded-lg font-mono text-[10px] font-bold uppercase border ${
              featuredOnly
                ? 'bg-accent-yellow/20 text-accent-yellow border-accent-yellow/40'
                : 'bg-[#0d0e12] text-zinc-400 border-white/10'
            }`}
          >
            ★ Featured only
          </button>
        </div>

        <p className="font-mono text-[10px] text-zinc-500 mb-3">
          Showing <span className="text-white font-bold">{filtered.length}</span>
        </p>

        {loading ? (
          <p className="font-mono text-sm text-zinc-500 animate-pulse p-6">Loading…</p>
        ) : (
          <>
            <div className="hidden md:block rounded-xl border border-white/10 bg-[#0d0e12] overflow-x-auto">
              <table className="w-full font-mono text-xs">
                <thead className="border-b border-white/10 text-zinc-500">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold uppercase">Company</th>
                    <th className="px-4 py-3 text-left font-bold uppercase">Category</th>
                    <th className="px-4 py-3 text-left font-bold uppercase">Value</th>
                    <th className="px-4 py-3 text-left font-bold uppercase">Submitter</th>
                    <th className="px-4 py-3 text-left font-bold uppercase">Status</th>
                    <th className="px-4 py-3 text-left font-bold uppercase">Date</th>
                    <th className="px-4 py-3 text-right font-bold uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((sub) => (
                    <tr key={sub.id} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {sub.logo_url && (
                            <div className="relative w-7 h-7 flex-shrink-0 rounded border border-white/10 overflow-hidden bg-white">
                              <Image
                                src={sub.logo_url}
                                alt=""
                                fill
                                sizes="28px"
                                className="object-contain p-0.5"
                              />
                            </div>
                          )}
                          <span className="font-bold text-white truncate">{sub.company_name}</span>
                          {sub.featured_requested && (
                            <span className="text-[9px] text-accent-yellow font-black">★</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-zinc-400">{sub.category || '—'}</td>
                      <td className="px-4 py-3 text-emerald-400 font-bold">
                        {sub.deal_value != null ? `$${sub.deal_value}` : '—'}
                      </td>
                      <td className="px-4 py-3 text-zinc-500 text-[10px] max-w-[140px] truncate">
                        {sub.submitter_email || '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 text-[9px] font-bold uppercase border rounded ${statusChip(sub.status)}`}
                        >
                          {String(sub.status || '').replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-zinc-500">
                        {sub.created_at
                          ? new Date(sub.created_at).toLocaleDateString()
                          : '—'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/admin/submissions/${sub.id}`}
                          className="inline-flex px-3 py-1.5 rounded-md bg-accent-yellow text-black text-[10px] font-black uppercase"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-zinc-500">
                        No submissions match filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-2">
              {filtered.map((sub) => (
                <div
                  key={sub.id}
                  className="rounded-xl border border-white/10 bg-[#0d0e12] p-3.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-mono text-sm font-bold text-white">
                        {sub.company_name}
                        {sub.featured_requested && (
                          <span className="ml-1 text-accent-yellow">★</span>
                        )}
                      </p>
                      <p className="font-mono text-[10px] text-zinc-500 mt-0.5">
                        {sub.category} · ${sub.deal_value}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 px-2 py-0.5 text-[9px] font-bold uppercase border rounded ${statusChip(sub.status)}`}
                    >
                      {String(sub.status || '').replace('_', ' ')}
                    </span>
                  </div>
                  <Link
                    href={`/admin/submissions/${sub.id}`}
                    className="mt-3 flex items-center justify-center min-h-[44px] rounded-lg bg-accent-yellow text-black font-mono text-[11px] font-black uppercase"
                  >
                    Review
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}
