'use client'

import { useEffect, useMemo, useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminStatCard from '@/components/admin/ui/AdminStatCard'
import { RefreshCw, Crown, Search } from 'lucide-react'

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
  const [editUser, setEditUser] = useState<AdminUser | null>(null)
  const [editPlan, setEditPlan] = useState('free')
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    try {
      const r = new URLSearchParams(window.location.search).get('role')
      if (r && ['free', 'nextfounder', 'founder', 'legend', 'admin', 'paid'].includes(r)) {
        setRoleFilter(r)
      }
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

  const paidUsers = useMemo(
    () => users.filter((u) => ['nextfounder', 'founder', 'legend'].includes(u.role)),
    [users]
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

  return (
    <>
      <AdminHeader title="Users" subtitle="Plans, bans & member activity · live from Supabase Auth" />
      <div className="p-4 md:p-6 flex-1 bg-[#090a0f] text-white">
        {error && (
          <div className="mb-3 rounded-lg border border-red-500/40 bg-red-500/10 text-red-300 font-mono text-xs p-3">
            {error}
          </div>
        )}
        {toast && (
          <div className="mb-3 rounded-lg border border-accent-yellow/30 bg-accent-yellow/10 text-accent-yellow font-mono text-xs p-3">
            {toast}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <AdminStatCard label="Total" value={loading ? '—' : users.length} />
          <AdminStatCard
            label="Active (30d)"
            value={loading ? '—' : users.filter((u) => u.status === 'active').length}
            accent="emerald"
          />
          <AdminStatCard
            label="Paid"
            value={loading ? '—' : paidUsers.length}
            hint="Active subscriptions"
            accent="yellow"
          />
          <AdminStatCard
            label="Admins"
            value={loading ? '—' : users.filter((u) => u.role === 'admin').length}
            accent="sky"
          />
        </div>

        {/* Paid highlight */}
        {!loading && paidUsers.length > 0 && roleFilter === 'all' && !searchQuery && (
          <section className="mb-4 rounded-xl border border-accent-yellow/25 bg-accent-yellow/[0.06] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-4 h-4 text-accent-yellow" />
              <h3 className="font-mono text-[11px] font-black uppercase tracking-wider text-accent-yellow">
                Paid members ({paidUsers.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {paidUsers.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-[#0d0e12]"
                >
                  <div className="w-9 h-9 rounded-full bg-accent-yellow/15 border border-accent-yellow/30 flex items-center justify-center font-mono text-xs font-black text-accent-yellow uppercase">
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
                    onClick={() => {
                      setEditUser(u)
                      setEditPlan(u.role)
                    }}
                    className="shrink-0 px-2.5 py-1.5 rounded-md border border-accent-yellow/30 text-accent-yellow font-mono text-[9px] font-bold uppercase hover:bg-accent-yellow/10"
                  >
                    Plan
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <label className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="search"
              placeholder="Search name or email…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 min-h-[44px] rounded-lg border border-white/10 bg-[#0d0e12] text-white font-mono text-sm focus:outline-none focus:border-accent-yellow/40"
            />
          </label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2.5 min-h-[44px] rounded-lg border border-white/10 bg-[#0d0e12] text-white font-mono text-sm"
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
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 rounded-lg border border-white/10 text-zinc-400 font-mono text-[10px] font-bold uppercase hover:text-accent-yellow disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <p className="font-mono text-[10px] text-zinc-500 mb-3">
          Showing <span className="text-white font-bold">{filtered.length}</span> of {users.length}
        </p>

        {loading ? (
          <p className="font-mono text-sm text-zinc-500 animate-pulse p-6">Loading users…</p>
        ) : (
          <>
            <div className="hidden md:block rounded-xl border border-white/10 bg-[#0d0e12] overflow-x-auto">
              <table className="w-full font-mono text-xs">
                <thead className="border-b border-white/10 text-zinc-500">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold uppercase">User</th>
                    <th className="px-4 py-3 text-left font-bold uppercase">Role</th>
                    <th className="px-4 py-3 text-left font-bold uppercase">Saved</th>
                    <th className="px-4 py-3 text-left font-bold uppercase">Joined</th>
                    <th className="px-4 py-3 text-left font-bold uppercase">Last active</th>
                    <th className="px-4 py-3 text-right font-bold uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((u) => (
                    <tr
                      key={u.id}
                      className={`hover:bg-white/[0.02] ${
                        u.isPaid || ['founder', 'legend', 'nextfounder'].includes(u.role)
                          ? 'bg-accent-yellow/[0.03]'
                          : ''
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-zinc-400 uppercase">
                            {(u.name || u.email || '?')[0]}
                          </div>
                          <div>
                            <div className="font-bold text-white flex items-center gap-1.5">
                              {u.name}
                              {u.banned && (
                                <span className="text-[8px] text-red-400 border border-red-500/30 px-1 rounded">
                                  BANNED
                                </span>
                              )}
                            </div>
                            <div className="text-zinc-500 text-[10px]">{u.email}</div>
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
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-0.5 text-[9px] font-bold border rounded uppercase ${roleBadge[u.role] || roleBadge.free}`}
                        >
                          {roleLabel[u.role] || u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-zinc-400 tabular-nums">{u.dealsApplied}</td>
                      <td className="px-4 py-3 text-zinc-500">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-4 py-3 text-zinc-500">{timeAgo(u.lastActive)}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex gap-1.5">
                          {u.role !== 'admin' && (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditUser(u)
                                  setEditPlan(
                                    ['nextfounder', 'founder', 'legend'].includes(u.role)
                                      ? u.role
                                      : 'free'
                                  )
                                }}
                                className="px-2.5 py-1.5 rounded-md border border-white/15 text-sky-300 hover:border-sky-400/40 font-bold text-[10px] uppercase"
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
                                className={`px-2.5 py-1.5 rounded-md border font-bold text-[10px] uppercase ${
                                  u.banned
                                    ? 'border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10'
                                    : 'border-red-500/30 text-red-300 hover:bg-red-500/10'
                                }`}
                              >
                                {u.banned ? 'Unban' : 'Ban'}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-zinc-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-2">
              {filtered.map((u) => (
                <div
                  key={u.id}
                  className="rounded-xl border border-white/10 bg-[#0d0e12] p-3.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-mono text-sm font-bold text-white truncate">{u.name}</p>
                      <p className="font-mono text-[10px] text-zinc-500 truncate">{u.email}</p>
                    </div>
                    <span
                      className={`shrink-0 inline-flex px-2 py-0.5 text-[9px] font-bold border rounded uppercase ${roleBadge[u.role] || roleBadge.free}`}
                    >
                      {roleLabel[u.role] || u.role}
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-[10px] text-zinc-500">
                    Active {timeAgo(u.lastActive)} · Saved {u.dealsApplied}
                    {u.periodEnd
                      ? ` · until ${new Date(u.periodEnd).toLocaleDateString()}`
                      : ''}
                  </p>
                  {u.role !== 'admin' && (
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditUser(u)
                          setEditPlan(
                            ['nextfounder', 'founder', 'legend'].includes(u.role)
                              ? u.role
                              : 'free'
                          )
                        }}
                        className="flex-1 min-h-[40px] rounded-lg border border-white/15 text-sky-300 font-mono text-[10px] font-bold uppercase"
                      >
                        Change plan
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => {
                          if (confirm(`Ban ${u.email}?`)) patch(u.id, 'ban')
                        }}
                        className="flex-1 min-h-[40px] rounded-lg border border-red-500/30 text-red-300 font-mono text-[10px] font-bold uppercase"
                      >
                        Ban
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {editUser && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d0e12] p-5 shadow-2xl">
            <h3 className="font-mono text-sm font-black uppercase text-white mb-1">Set plan</h3>
            <p className="font-mono text-[11px] text-zinc-500 mb-4 truncate">{editUser.email}</p>
            <select
              value={editPlan}
              onChange={(e) => setEditPlan(e.target.value)}
              className="w-full mb-4 px-3 py-2.5 rounded-lg border border-white/10 bg-[#121318] text-white font-mono text-sm"
            >
              <option value="free">Free</option>
              <option value="nextfounder">Next&apos;Founder ($1/yr)</option>
              <option value="founder">Founder ($48/yr)</option>
              <option value="legend">Legend ($99 once)</option>
            </select>
            <p className="font-mono text-[10px] text-zinc-600 mb-4">
              Soft-cancels any existing active subscription row, then inserts the new plan.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={() => setEditUser(null)}
                className="flex-1 min-h-[44px] rounded-lg border border-white/15 text-zinc-300 font-mono text-xs font-bold uppercase"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => patch(editUser.id, 'set_plan', editPlan)}
                className="flex-1 min-h-[44px] rounded-lg bg-accent-yellow text-black font-mono text-xs font-black uppercase disabled:opacity-60"
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
