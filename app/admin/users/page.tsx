'use client'

import { useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'

const mockUsers = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@techflow.io', role: 'pro+', status: 'active', lastActive: '2h ago', dealsApplied: 23, creditsSecured: '$247k' },
  { id: '2', name: 'Mike Rodriguez', email: 'mike@datasync.co', role: 'pro', status: 'active', lastActive: '1d ago', dealsApplied: 15, creditsSecured: '$89k' },
  { id: '3', name: 'Emily Watson', email: 'emily@startup.com', role: 'free', status: 'active', lastActive: '3d ago', dealsApplied: 5, creditsSecured: '$12k' },
  { id: '4', name: 'James Park', email: 'james@venture.io', role: 'lifetime', status: 'active', lastActive: '5h ago', dealsApplied: 45, creditsSecured: '$520k' },
  { id: '5', name: 'Lisa Thompson', email: 'lisa@example.com', role: 'free', status: 'inactive', lastActive: '2w ago', dealsApplied: 2, creditsSecured: '$0' },
]

const roleBadge: Record<string, string> = {
  'pro+': 'bg-purple-100 text-purple-800',
  'pro': 'bg-blue-100 text-blue-800',
  'lifetime': 'bg-yellow-100 text-yellow-800',
  'admin': 'bg-red-100 text-red-800',
  'free': 'bg-gray-100 text-gray-800',
}

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const filtered = mockUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    return matchSearch && matchRole
  })

  return (
    <>
      <AdminHeader />
      <div className="p-3 md:p-6">
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-mono text-lg md:text-xl font-black uppercase">Users</h1>
          <span className="font-mono text-[10px] text-gray-500">{mockUsers.length} total</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { label: 'Total', value: mockUsers.length },
            { label: 'Active', value: mockUsers.filter(u => u.status === 'active').length },
            { label: 'Pro', value: mockUsers.filter(u => u.role === 'pro' || u.role === 'pro+').length },
            { label: 'Lifetime', value: mockUsers.filter(u => u.role === 'lifetime').length },
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
            <option value="pro">Pro</option>
            <option value="pro+">Pro+</option>
            <option value="lifetime">Lifetime</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] overflow-x-auto">
          <table className="w-full font-mono text-[11px] md:text-xs">
            <thead className="bg-gray-50 border-b-2 border-black">
              <tr>
                <th className="px-3 py-2 text-left font-bold uppercase">User</th>
                <th className="px-3 py-2 text-left font-bold uppercase">Role</th>
                <th className="px-3 py-2 text-left font-bold uppercase hidden sm:table-cell">Deals</th>
                <th className="px-3 py-2 text-left font-bold uppercase hidden sm:table-cell">Credits</th>
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
                    <span className={`inline-flex px-1.5 py-0.5 text-[9px] font-bold border border-black uppercase ${roleBadge[u.role] || roleBadge.free}`}>{u.role}</span>
                  </td>
                  <td className="px-3 py-2 font-bold hidden sm:table-cell">{u.dealsApplied}</td>
                  <td className="px-3 py-2 font-bold text-green-600 hidden sm:table-cell">{u.creditsSecured}</td>
                  <td className="px-3 py-2 text-gray-400 hidden md:table-cell">{u.lastActive}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <button className="text-blue-600 hover:text-blue-900"><span className="material-symbols-outlined text-sm">edit</span></button>
                      <button className="text-red-600 hover:text-red-900"><span className="material-symbols-outlined text-sm">block</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
