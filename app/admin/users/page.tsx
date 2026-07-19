'use client'

import { useEffect, useMemo, useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminStatCard from '@/components/admin/ui/AdminStatCard'
import Pagination from '@/components/Pagination'
import {
  RefreshCw,
  Crown,
  Search,
  Mail,
  Calendar,
  Activity,
  ShieldBan,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react'

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  lastActive: string | null
  createdAt: string | null
  dealsApplied: number
  emailConfirmed: boolean
  banned?: boolean
  periodEnd?: string | null
  periodStart?: string | null
  isPaid?: boolean
}

const PAGE_SIZE = 20

const roleBadge: Record<string, string> = {
  legend: 'bg-accent-yellow/15 text-accent-yellow border-accent-yellow/30',
  founder: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  nextfounder: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  admin: 'bg-red-500/15 text-red-300 border-red-500/30',
  free: 'bg-white/5 text-zinc-400 border-white/10',
}

const roleLabel: Record<string, string> = {
  legend: 'Legend',
  founder: 'Founder',
  nextfounder: "Next'Founder",
  admin: 'Admin',
  free: 'Free',
}

function timeAgo(iso: string | null): string {
  if (!iso) return 'never'
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString()
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [editUser, setEditUser] = useState<AdminUser | null>(null)
  const [editPlan, setEditPlan] = useState('free')
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const r = params.get('role')
      if (r && ['free', 'nextfounder', 'founder', 'legend', 'admin', 'paid'].includes(r)) {
        setRoleFilter(r)
      }
      const q = params.get('q')
      if (q) setSearchQuery(q)
    } catch {
      // ignore
    }
  }, [])

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/users', {
        credentials: 'include',
        cache: 'no-store',
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok) {
        const list = Array.isArray(json.users) ? json.users : []
        setUsers(list)
        if (list.length === 0) {
          setError(
            json.error ||
              'No users returned from Supabase Auth. Confirm SUPABASE_SERVICE_ROLE_KEY and that accounts exist.'
          )
        }
      } else {
        setError(json.error || `Failed to load users (HTTP ${res.status})`)
        setUsers([])
      }
    } catch (e: any) {
      setError(e?.message || 'Network error loading users')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1)
  }, [searchQuery, roleFilter])

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const q = searchQuery.toLowerCase()
      const matchSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      let matchRole = true
      if (roleFilter === 'paid') {
        matchRole = ['nextfounder', 'founder', 'legend'].includes(u.role)
      } else if (roleFilter !== 'all') {
        matchRole = u.role === roleFilter
      }
      return matchSearch && matchRole
    })
  }, [users, searchQuery, roleFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageSlice = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, safePage])

  const paidUsers = useMemo(
    () => users.filter((u) => ['nextfounder', 'founder', 'legend'].includes(u.role)),
    [users]
  )

  const stats = useMemo(
    () => ({
      total: users.length,
      active: users.filter((u) => u.status === 'active').length,
      paid: paidUsers.length,
      admins: users.filter((u) => u.role === 'admin').length,
      banned: users.filter((u) => u.banned).length,
    }),
    [users, paidUsers]
  )

  const patch = async (userId: string, action: string, plan?: string) => {
    setBusy(true)
    setToast('')
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action, plan }),
      })
      const json = await res.json()
      if (!res.ok) {
        setToast(json.error || 'Action failed')
        return
      }
      setToast(
        action === 'set_plan'
          ? `Plan set to ${plan}`
          : action === 'ban'
            ? 'User banned'
            : 'User unbanned'
      )
      setEditUser(null)
      await load()
    } catch {
      setToast('Network error')
    } finally {
      setBusy(false)
    }
  }

  const openPlan = (u: AdminUser) => {
    setEditUser(u)
    setEditPlan(
      ['nextfounder', 'founder', 'legend'].includes(u.role) ? u.role : 'free'
    )
  }

  return (
    <>
      <AdminHeader
        title="Users"
        subtitle="Plans, bans & member activity · live from Supabase Auth"
      />
      <div className="p-4 md:p-6 lg:p-8 flex-1 bg-[#090a0f] text-white min-w-0">
        {error && (
          <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-300 font-mono text-xs p-3.5">
            {error}
          </div>
        )}
        {toast && (
          <div className="mb-4 rounded-xl border border-accent-yellow/30 bg-accent-yellow/10 text-accent-yellow font-mono text-xs p-3.5 flex items-center justify-between gap-3">
            <span>{toast}</span>
            <button
              type="button"
              onClick={() => setToast('')}
              className="text-zinc-500 hover:text-white"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3 mb-5">
          <AdminStatCard label="Total" value={loading ? '—' : stats.total} />
          <AdminStatCard
            label="Active (30d)"
            value={loading ? '—' : stats.active}
            accent="emerald"
          />
          <AdminStatCard
            label="Paid"
            value={loading ? '—' : stats.paid}
            hint="Active subscriptions"
            accent="yellow"
          />
          <AdminStatCard
            label="Admins"
            value={loading ? '—' : stats.admins}
            accent="sky"
          />
        </div>

        {/* Paid members strip — limited, not entire page */}
        {!loading && paidUsers.length > 0 && roleFilter === 'all' && !searchQuery && (
          <section className="mb-5 rounded-2xl border border-accent-yellow/25 bg-gradient-to-br from-accent-yellow/[0.07] via-transparent to-transparent p-4 md:p-5 overflow-hidden">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <Crown className="w-4 h-4 text-accent-yellow shrink-0" />
                <h3 className="font-mono text-[11px] font-black uppercase tracking-wider text-accent-yellow">
                  Paid members ({paidUsers.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRoleFilter('paid')
                  setPage(1)
                }}
                className="shrink-0 inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wide text-zinc-400 hover:text-accent-yellow transition-colors"
              >
                View all
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
              {paidUsers.slice(0, 6).map((u) => (
                <div
                  key={u.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-[#0d0e12]/90 hover:border-accent-yellow/25 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-accent-yellow/15 border border-accent-yellow/30 flex items-center justify-center font-mono text-xs font-black text-accent-yellow uppercase shrink-0">
                    {(u.name || u.email || '?')[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[12px] font-bold text-white truncate">{u.name}</p>
                    <p className="font-mono text-[10px] text-zinc-500 truncate">{u.email}</p>
                    <p className="font-mono text-[9px] text-zinc-600 mt-0.5">
                      {roleLabel[u.role]}
                      {u.periodEnd
                        ? ` · until ${new Date(u.periodEnd).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}`
                        : ''}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openPlan(u)}
                    className="shrink-0 px-2.5 py-1.5 rounded-lg border border-accent-yellow/30 text-accent-yellow font-mono text-[9px] font-bold uppercase hover:bg-accent-yellow/10"
                  >
                    Plan
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Toolbar */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#0d0e12] p-3 md:p-4 mb-4">
          <div className="flex flex-col lg:flex-row gap-2.5">
            <label className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
              <input
                type="search"
                placeholder="Search name or email…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 min-h-[44px] rounded-xl border border-white/10 bg-[#121318] text-white font-mono text-sm focus:outline-none focus:border-accent-yellow/40 placeholder:text-zinc-600"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <select
                aria-label="Filter users by role"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="flex-1 sm:flex-none min-w-[140px] px-3 py-2.5 min-h-[44px] rounded-xl border border-white/10 bg-[#121318] text-white font-mono text-sm focus:outline-none focus:border-accent-yellow/40"
              >
                <option value="all">All roles</option>
                <option value="paid">Paid only</option>
                <option value="free">Free</option>
                <option value="nextfounder">Next&apos;Founder</option>
                <option value="founder">Founder</option>
                <option value="legend">Legend</option>
                <option value="admin">Admin</option>
              </select>
              <button
                type="button"
                onClick={load}
                disabled={loading}
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 rounded-xl border border-white/10 text-zinc-400 font-mono text-[10px] font-bold uppercase hover:text-accent-yellow hover:border-accent-yellow/30 disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Role chips */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All' },
              { id: 'paid', label: 'Paid' },
              { id: 'free', label: 'Free' },
              { id: 'founder', label: 'Founder' },
              { id: 'nextfounder', label: "Next'F" },
              { id: 'legend', label: 'Legend' },
              { id: 'admin', label: 'Admin' },
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setRoleFilter(chip.id)}
                className={`inline-flex h-7 items-center rounded-full border px-2.5 font-mono text-[9px] font-bold uppercase tracking-wide transition-colors ${
                  roleFilter === chip.id
                    ? 'bg-accent-yellow border-accent-yellow text-black'
                    : 'border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <p className="font-mono text-[10px] md:text-[11px] text-zinc-500">
            Showing{' '}
            <span className="text-white font-bold">
              {filtered.length === 0
                ? 0
                : `${(safePage - 1) * PAGE_SIZE + 1}–${Math.min(safePage * PAGE_SIZE, filtered.length)}`}
            </span>{' '}
            of <span className="text-white font-bold">{filtered.length}</span>
            {filtered.length !== users.length && (
              <span className="text-zinc-600"> · {users.length} total</span>
            )}
            {totalPages > 1 && (
              <span className="text-zinc-600">
                {' '}
                · Page {safePage}/{totalPages}
              </span>
            )}
          </p>
          {stats.banned > 0 && (
            <span className="font-mono text-[9px] font-bold uppercase tracking-wide text-red-400/80">
              {stats.banned} banned
            </span>
          )}
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-[#0d0e12] p-10 text-center">
            <p className="font-mono text-sm text-zinc-500 animate-pulse">Loading users…</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block rounded-2xl border border-white/[0.08] bg-[#0d0e12] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full font-mono text-xs min-w-[720px]">
                  <thead className="border-b border-white/10 text-zinc-500 bg-white/[0.02]">
                    <tr>
                      <th className="px-4 py-3.5 text-left font-bold uppercase tracking-wider text-[10px]">
                        User
                      </th>
                      <th className="px-4 py-3.5 text-left font-bold uppercase tracking-wider text-[10px]">
                        Role
                      </th>
                      <th className="px-4 py-3.5 text-left font-bold uppercase tracking-wider text-[10px]">
                        Saved
                      </th>
                      <th className="px-4 py-3.5 text-left font-bold uppercase tracking-wider text-[10px]">
                        Joined
                      </th>
                      <th className="px-4 py-3.5 text-left font-bold uppercase tracking-wider text-[10px]">
                        Last active
                      </th>
                      <th className="px-4 py-3.5 text-right font-bold uppercase tracking-wider text-[10px]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    {pageSlice.map((u) => (
                      <tr
                        key={u.id}
                        className={`hover:bg-white/[0.025] transition-colors ${
                          u.isPaid ||
                          ['founder', 'legend', 'nextfounder'].includes(u.role)
                            ? 'bg-accent-yellow/[0.025]'
                            : ''
                        }`}
                      >
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-black uppercase shrink-0 ${
                                u.banned
                                  ? 'bg-red-500/15 border-red-500/30 text-red-300'
                                  : 'bg-white/5 border-white/10 text-zinc-400'
                              }`}
                            >
                              {(u.name || u.email || '?')[0]}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-white flex items-center gap-1.5 flex-wrap">
                                <span className="truncate max-w-[180px]">{u.name}</span>
                                {u.banned && (
                                  <span className="text-[8px] text-red-400 border border-red-500/30 px-1 rounded">
                                    BANNED
                                  </span>
                                )}
                                {!u.emailConfirmed && (
                                  <span className="text-[8px] text-zinc-500 border border-white/10 px-1 rounded">
                                    UNVERIFIED
                                  </span>
                                )}
                              </div>
                              <div className="text-zinc-500 text-[10px] truncate flex items-center gap-1">
                                <Mail className="w-3 h-3 shrink-0 opacity-50" />
                                {u.email}
                              </div>
                              {u.periodEnd && (
                                <div className="text-zinc-600 text-[9px] mt-0.5">
                                  Access until{' '}
                                  {new Date(u.periodEnd).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex px-2 py-0.5 text-[9px] font-bold border rounded-md uppercase ${roleBadge[u.role] || roleBadge.free}`}
                          >
                            {roleLabel[u.role] || u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-zinc-400 tabular-nums">{u.dealsApplied}</td>
                        <td className="px-4 py-3.5 text-zinc-500">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3 opacity-40" />
                            {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-zinc-500">
                          <span className="inline-flex items-center gap-1">
                            <Activity className="w-3 h-3 opacity-40" />
                            {timeAgo(u.lastActive)}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <div className="inline-flex gap-1.5">
                            {u.role !== 'admin' && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => openPlan(u)}
                                  className="px-2.5 py-1.5 rounded-lg border border-white/15 text-sky-300 hover:border-sky-400/40 hover:bg-sky-500/10 font-bold text-[10px] uppercase transition-colors"
                                >
                                  Plan
                                </button>
                                <button
                                  type="button"
                                  disabled={busy}
                                  onClick={() => {
                                    if (u.banned) {
                                      patch(u.id, 'unban')
                                      return
                                    }
                                    if (
                                      confirm(
                                        `Ban ${u.email}? They will be flagged banned in metadata.`
                                      )
                                    ) {
                                      patch(u.id, 'ban')
                                    }
                                  }}
                                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border font-bold text-[10px] uppercase transition-colors ${
                                    u.banned
                                      ? 'border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10'
                                      : 'border-red-500/30 text-red-300 hover:bg-red-500/10'
                                  }`}
                                >
                                  {u.banned ? (
                                    <>
                                      <ShieldCheck className="w-3 h-3" /> Unban
                                    </>
                                  ) : (
                                    <>
                                      <ShieldBan className="w-3 h-3" /> Ban
                                    </>
                                  )}
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {pageSlice.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-10 text-center text-zinc-500">
                          No users found on this page
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-2">
              {pageSlice.map((u) => (
                <div
                  key={u.id}
                  className={`rounded-xl border bg-[#0d0e12] p-3.5 ${
                    u.isPaid || ['founder', 'legend', 'nextfounder'].includes(u.role)
                      ? 'border-accent-yellow/20'
                      : 'border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[11px] font-black text-zinc-400 uppercase shrink-0">
                        {(u.name || u.email || '?')[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="font-mono text-sm font-bold text-white truncate">{u.name}</p>
                        <p className="font-mono text-[10px] text-zinc-500 truncate">{u.email}</p>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 inline-flex px-2 py-0.5 text-[9px] font-bold border rounded-md uppercase ${roleBadge[u.role] || roleBadge.free}`}
                    >
                      {roleLabel[u.role] || u.role}
                    </span>
                  </div>
                  <p className="mt-2.5 font-mono text-[10px] text-zinc-500">
                    Active {timeAgo(u.lastActive)} · Saved {u.dealsApplied}
                    {u.periodEnd
                      ? ` · until ${new Date(u.periodEnd).toLocaleDateString()}`
                      : ''}
                  </p>
                  {u.role !== 'admin' && (
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => openPlan(u)}
                        className="flex-1 min-h-[40px] rounded-lg border border-white/15 text-sky-300 font-mono text-[10px] font-bold uppercase"
                      >
                        Change plan
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => {
                          if (u.banned) patch(u.id, 'unban')
                          else if (confirm(`Ban ${u.email}?`)) patch(u.id, 'ban')
                        }}
                        className={`flex-1 min-h-[40px] rounded-lg border font-mono text-[10px] font-bold uppercase ${
                          u.banned
                            ? 'border-emerald-500/30 text-emerald-300'
                            : 'border-red-500/30 text-red-300'
                        }`}
                      >
                        {u.banned ? 'Unban' : 'Ban'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {pageSlice.length === 0 && (
                <div className="rounded-xl border border-dashed border-white/10 p-8 text-center font-mono text-sm text-zinc-500">
                  No users found
                </div>
              )}
            </div>

            {/* Pagination */}
            <Pagination
              tone="dark"
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={(p) => {
                setPage(p)
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
              className="!mt-4 md:!mt-6"
            />
          </>
        )}
      </div>

      {/* Plan modal */}
      {editUser && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d0e12] p-5 md:p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="set-plan-title"
          >
            <div
              aria-hidden
              className="h-px w-full bg-gradient-to-r from-transparent via-accent-yellow/50 to-transparent mb-4 -mt-1"
            />
            <h3
              id="set-plan-title"
              className="font-mono text-sm font-black uppercase text-white mb-1"
            >
              Set plan
            </h3>
            <p className="font-mono text-[11px] text-zinc-500 mb-4 truncate">{editUser.email}</p>
            <select
              aria-label="Select plan"
              value={editPlan}
              onChange={(e) => setEditPlan(e.target.value)}
              className="w-full mb-3 px-3 py-2.5 rounded-xl border border-white/10 bg-[#121318] text-white font-mono text-sm focus:outline-none focus:border-accent-yellow/40"
            >
              <option value="free">Free</option>
              <option value="nextfounder">Next&apos;Founder ($1/yr)</option>
              <option value="founder">Founder ($48/yr)</option>
              <option value="legend">Legend ($99 once)</option>
            </select>
            <p className="font-mono text-[10px] text-zinc-600 mb-5 leading-relaxed">
              Soft-cancels any existing active subscription, then inserts the new plan.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={() => setEditUser(null)}
                className="flex-1 min-h-[44px] rounded-xl border border-white/15 text-zinc-300 font-mono text-xs font-bold uppercase hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => patch(editUser.id, 'set_plan', editPlan)}
                className="flex-1 min-h-[44px] rounded-xl bg-accent-yellow text-black font-mono text-xs font-black uppercase disabled:opacity-60 hover:bg-yellow-300 transition-colors"
              >
                {busy ? 'Saving…' : 'Save plan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
