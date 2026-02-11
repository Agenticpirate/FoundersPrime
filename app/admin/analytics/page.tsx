'use client'

import { useState } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminAuthGuard from '@/components/admin/AdminAuthGuard'

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')

  const stats = {
    pageViews: '45,234',
    uniqueVisitors: '12,847',
    avgSessionDuration: '4m 32s',
    bounceRate: '34.2%',
    dealsViewed: '8,923',
    applicationsStarted: '1,234',
    applicationsCompleted: '892',
    conversionRate: '72.3%'
  }

  const topDeals = [
    { name: 'AWS Activate', views: 2345, applications: 234 },
    { name: 'Google Cloud Credits', views: 1987, applications: 198 },
    { name: 'Microsoft Azure', views: 1654, applications: 165 },
    { name: 'Stripe Atlas', views: 1432, applications: 143 },
    { name: 'Notion for Startups', views: 1234, applications: 123 }
  ]

  const trafficSources = [
    { source: 'Organic Search', percentage: 45, color: 'bg-blue-500' },
    { source: 'Direct', percentage: 25, color: 'bg-green-500' },
    { source: 'Social Media', percentage: 15, color: 'bg-purple-500' },
    { source: 'Referral', percentage: 10, color: 'bg-yellow-500' },
    { source: 'Email', percentage: 5, color: 'bg-red-500' }
  ]

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-paper antialiased flex flex-col md:flex-row overflow-x-hidden">
        <AdminSidebar />
        <main className="flex-1 flex flex-col min-h-screen">
          <AdminHeader />
          <div className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
                <p className="text-gray-600">Track platform performance and user engagement</p>
              </div>
              <div className="flex gap-2">
                {['24h', '7d', '30d', '90d'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 border-3 border-black font-bold text-sm uppercase ${
                      timeRange === range 
                        ? 'bg-primary shadow-hard' 
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Traffic Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white border-3 border-black shadow-hard p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="material-symbols-outlined text-blue-600 text-2xl">visibility</span>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1">+12.5%</span>
                </div>
                <p className="text-sm font-medium text-gray-600">Page Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pageViews}</p>
              </div>
              <div className="bg-white border-3 border-black shadow-hard p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="material-symbols-outlined text-green-600 text-2xl">person</span>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1">+8.3%</span>
                </div>
                <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
                <p className="text-2xl font-bold text-gray-900">{stats.uniqueVisitors}</p>
              </div>
              <div className="bg-white border-3 border-black shadow-hard p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="material-symbols-outlined text-purple-600 text-2xl">schedule</span>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1">+5.2%</span>
                </div>
                <p className="text-sm font-medium text-gray-600">Avg. Session</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgSessionDuration}</p>
              </div>
              <div className="bg-white border-3 border-black shadow-hard p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="material-symbols-outlined text-red-600 text-2xl">trending_down</span>
                  <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1">-2.1%</span>
                </div>
                <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.bounceRate}</p>
              </div>
            </div>

            {/* Conversion Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white border-3 border-black shadow-hard p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="material-symbols-outlined text-primary text-2xl">local_offer</span>
                </div>
                <p className="text-sm font-medium text-gray-600">Deals Viewed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.dealsViewed}</p>
              </div>
              <div className="bg-white border-3 border-black shadow-hard p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="material-symbols-outlined text-yellow-600 text-2xl">edit_note</span>
                </div>
                <p className="text-sm font-medium text-gray-600">Applications Started</p>
                <p className="text-2xl font-bold text-gray-900">{stats.applicationsStarted}</p>
              </div>
              <div className="bg-white border-3 border-black shadow-hard p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="material-symbols-outlined text-green-600 text-2xl">task_alt</span>
                </div>
                <p className="text-sm font-medium text-gray-600">Applications Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.applicationsCompleted}</p>
              </div>
              <div className="bg-white border-3 border-black shadow-hard p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="material-symbols-outlined text-blue-600 text-2xl">trending_up</span>
                </div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Deals */}
              <div className="bg-white border-3 border-black shadow-hard p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined">trending_up</span>
                  Top Performing Deals
                </h3>
                <div className="space-y-4">
                  {topDeals.map((deal, index) => (
                    <div key={deal.name} className="flex items-center justify-between p-3 bg-gray-50 border-2 border-gray-200">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-gray-400">#{index + 1}</span>
                        <span className="font-bold">{deal.name}</span>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <span className="text-gray-600">{deal.views} views</span>
                        <span className="text-green-600 font-bold">{deal.applications} apps</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traffic Sources */}
              <div className="bg-white border-3 border-black shadow-hard p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined">pie_chart</span>
                  Traffic Sources
                </h3>
                <div className="space-y-4">
                  {trafficSources.map((source) => (
                    <div key={source.source}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{source.source}</span>
                        <span className="font-bold">{source.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-3 border border-black">
                        <div 
                          className={`h-full ${source.color}`} 
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity Chart Placeholder */}
            <div className="mt-8 bg-white border-3 border-black shadow-hard p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">show_chart</span>
                Activity Over Time
              </h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500">
                  <span className="material-symbols-outlined text-4xl mb-2">insert_chart</span>
                  <p className="font-mono text-sm">Chart visualization would go here</p>
                  <p className="text-xs">Integrate with Chart.js or Recharts</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminAuthGuard>
  )
}
