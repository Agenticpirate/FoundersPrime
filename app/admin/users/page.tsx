'use client'

import { useState } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminAuthGuard from '@/components/admin/AdminAuthGuard'

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@techflow.io',
    role: 'pro+',
    status: 'active',
    joinedDate: '2023-03-15',
    lastActive: '2 hours ago',
    dealsApplied: 23,
    creditsSecured: '$247k'
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    email: 'mike@datasync.co',
    role: 'pro',
    status: 'active',
    joinedDate: '2023-06-20',
    lastActive: '1 day ago',
    dealsApplied: 15,
    creditsSecured: '$89k'
  },
  {
    id: '3',
    name: 'Emily Watson',
    email: 'emily@startup.com',
    role: 'free',
    status: 'active',
    joinedDate: '2024-01-10',
    lastActive: '3 days ago',
    dealsApplied: 5,
    creditsSecured: '$12k'
  },
  {
    id: '4',
    name: 'James Park',
    email: 'james@venture.io',
    role: 'lifetime',
    status: 'active',
    joinedDate: '2022-11-05',
    lastActive: '5 hours ago',
    dealsApplied: 45,
    creditsSecured: '$520k'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa@example.com',
    role: 'free',
    status: 'inactive',
    joinedDate: '2023-09-01',
    lastActive: '2 weeks ago',
    dealsApplied: 2,
    creditsSecured: '$0'
  }
]

export default function AdminUsersPage() {
  const [users] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    proUsers: users.filter(u => u.role === 'pro' || u.role === 'pro+').length,
    lifetimeUsers: users.filter(u => u.role === 'lifetime').length
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'pro+': return 'bg-purple-100 text-purple-800'
      case 'pro': return 'bg-blue-100 text-blue-800'
      case 'lifetime': return 'bg-yellow-100 text-yellow-800'
      case 'admin': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-paper antialiased flex flex-col md:flex-row overflow-x-hidden">
        <AdminSidebar />
        <main className="flex-1 flex flex-col min-h-screen">
          <AdminHeader />
          <div className="p-6">
            {/* Header */}
            <div className="mb-4 md:mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
              <p className="text-gray-600">Manage platform users, roles, and permissions</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4 md:mb-6">
              <div className="bg-white border-3 border-black shadow-hard p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                  <span className="material-symbols-outlined text-blue-600 text-2xl">group</span>
                </div>
              </div>
              <div className="bg-white border-3 border-black shadow-hard p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
                  </div>
                  <span className="material-symbols-outlined text-green-600 text-2xl">check_circle</span>
                </div>
              </div>
              <div className="bg-white border-3 border-black shadow-hard p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pro Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.proUsers}</p>
                  </div>
                  <span className="material-symbols-outlined text-purple-600 text-2xl">star</span>
                </div>
              </div>
              <div className="bg-white border-3 border-black shadow-hard p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Lifetime Members</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.lifetimeUsers}</p>
                  </div>
                  <span className="material-symbols-outlined text-yellow-600 text-2xl">workspace_premium</span>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white border-3 border-black shadow-hard p-6 mb-4 md:mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">search</span>
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border-3 border-black focus:outline-none focus:shadow-hard"
                    />
                  </div>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-4 py-2 border-3 border-black focus:outline-none focus:shadow-hard bg-white"
                  >
                    <option value="all">All Roles</option>
                    <option value="free">Free</option>
                    <option value="pro">Pro</option>
                    <option value="pro+">Pro+</option>
                    <option value="lifetime">Lifetime</option>
                    <option value="admin">Admin</option>
                  </select>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border-3 border-black focus:outline-none focus:shadow-hard bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button className="bg-primary border-3 border-black shadow-hard px-6 py-2 font-bold hover:shadow-hard-hover hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                    <span className="material-symbols-outlined mr-2">person_add</span>
                    Add User
                  </button>
                  <button className="bg-gray-100 border-3 border-black shadow-hard px-6 py-2 font-bold hover:shadow-hard-hover hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                    <span className="material-symbols-outlined mr-2">file_export</span>
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white border-3 border-black shadow-hard">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-3 border-black">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700">User</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Role</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Deals Applied</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Credits Secured</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Last Active</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 bg-primary border-2 border-black flex items-center justify-center font-bold text-sm rounded-full">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-bold text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-bold border border-black uppercase ${getRoleBadgeColor(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-bold border border-black ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{user.dealsApplied}</td>
                        <td className="px-6 py-4 text-sm font-bold text-green-600">{user.creditsSecured}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{user.lastActive}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-900 font-bold text-sm">
                              <span className="material-symbols-outlined text-lg">edit</span>
                            </button>
                            <button className="text-green-600 hover:text-green-900 font-bold text-sm">
                              <span className="material-symbols-outlined text-lg">visibility</span>
                            </button>
                            <button className="text-red-600 hover:text-red-900 font-bold text-sm">
                              <span className="material-symbols-outlined text-lg">block</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminAuthGuard>
  )
}
