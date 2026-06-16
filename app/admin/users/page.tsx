'use client'

import { useEffect, useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'

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
}

const roleBadge: Record<string, string> = {
  'legend': 'bg-yellow-100 text-yellow-800',
  'founder': 'bg-purple-100 text-purple-800',
  'nextfounder': 'bg-blue-100 text-blue-800',
  'admin': 'bg-red-100 text-red-800',
  'free': 'bg-gray-100 text-gray-800',
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
  const weeks = Math.floor(days / 7)
  if (weeks < 5) return `${weeks}w ago`
  return new Date(iso).toLocaleDateString()
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users')
        const json = await res.json()
        if (res.ok) {
          setUsers(json.users || [])
        } else {
          setError(json.error || 'Failed to load users')
        }
      } catch (e) {
        setError('Failed to load users')
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    return matchSearch && matchRole
  })

  if (loading) return (
    <>
      <AdminHeader />
      <div className="p-6 font-mono text-sm animate-pulse">Loading users...</div>
    </>
  )

  return (
    <>
      <AdminHeader />
      <div className="p-3 md:p-6">
        {error && (
          <div className="mb-3 border-2 border-red-500 bg-red-50 text-red-700 font-mono text-xs p-2">{error}</div>
        )}
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-mono text-lg md:text-xl font-black uppercase">Users</h1>
          <span className="font-mono text-[10px] text-gray-500">{users.length} total</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { label: 'Total', value: users.length },
            { label: 'Active', value: users.filter(u => u.status === 'active').length },
            { label: 'Paid', value: users.filter(u => ['nextfounder', 'founder', 'legend'].includes(u.role)).length },
            { label: 'Lifetime', value: users.filter(u => u.role === 'legend').length },
          ].map(s => (
            <div key={s.label} className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] p-2">
              <span className="text-[8px] md:text-[10px] font-mono font-bold text-gray-400 uppercase block">{s.label}</span>
              <span className="text-lg font-black font-mono">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-1.5 border-2 border-black font-mono text-xs focus:outline-none"
          />
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-2 py-1.5 border-2 border-black font-mono text-xs bg-white">
            <option value="all">All Roles</option>
            <option value="free">Free</option>
            <option value="nextfounder">Next'Founder</option>
            <option value="founder">Founder</option>
            <option value="legend">Legend</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] overflow-x-auto">
          <table className="w-full font-mono text-[11px] md:text-xs">
            <thead className="bg-gray-50 border-b-2 border-black">
              <tr>
                <th className="px-3 py-2 text-left font-bold uppercase">User</th>
                <th className="px-3 py-2 text-left font-bold uppercase">Role</th>
                <th className="px-3 py-2 text-left font-bold uppercase hidden sm:table-cell">Saved</th>
                <th className="px-3 py-2 text-left font-bold uppercase hidden sm:table-cell">Joined</th>
                <th className="px-3 py-2 text-left font-bold uppercase hidden md:table-cell">Last Active</th>
                <th className="px-3 py-2 text-left font-bold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-primary border border-black flex items-center justify-center font-bold text-[10px] rounded-full flex-shrink-0">
                        {u.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold truncate">{u.name}</div>
                        <div className="text-gray-400 truncate text-[10px]">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex px-1.5 py-0.5 text-[9px] font-bold border border-black uppercase ${roleBadge[u.role] || roleBadge.free}`}>{roleLabel[u.role] || u.role}</span>
                  </td>
                  <td className="px-3 py-2 font-bold hidden sm:table-cell">{u.dealsApplied}</td>
                  <td className="px-3 py-2 text-gray-400 hidden sm:table-cell">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                  <td className="px-3 py-2 text-gray-400 hidden md:table-cell">{timeAgo(u.lastActive)}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <button className="text-blue-600 hover:text-blue-900"><span className="material-symbols-outlined text-sm">edit</span></button>
                      <button className="text-red-600 hover:text-red-900"><span className="material-symbols-outlined text-sm">block</span></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-gray-400 font-bold">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
