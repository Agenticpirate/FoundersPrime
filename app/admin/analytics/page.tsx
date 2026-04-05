'use client'

import { useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')

  const topDeals = [
    { name: 'AWS Activate', views: 2345, apps: 234 },
    { name: 'Google Cloud', views: 1987, apps: 198 },
    { name: 'Microsoft Azure', views: 1654, apps: 165 },
    { name: 'Stripe Atlas', views: 1432, apps: 143 },
    { name: 'Notion Startups', views: 1234, apps: 123 },
  ]

  const trafficSources = [
    { source: 'Organic', pct: 45, color: 'bg-blue-500' },
    { source: 'Direct', pct: 25, color: 'bg-green-500' },
    { source: 'Social', pct: 15, color: 'bg-purple-500' },
    { source: 'Referral', pct: 10, color: 'bg-yellow-500' },
    { source: 'Email', pct: 5, color: 'bg-red-500' },
  ]

  return (
    <>
      <AdminHeader />
      <div className="p-3 md:p-6">
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-mono text-lg md:text-xl font-black uppercase">Analytics</h1>
          <div className="flex gap-1">
            {['24h', '7d', '30d', '90d'].map(r => (
              <button key={r} onClick={() => setTimeRange(r)} className={`px-2 py-1 font-mono text-[10px] font-bold border border-black ${timeRange === r ? 'bg-black text-white' : 'bg-white'}`}>
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Traffic Stats */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { label: 'Views', value: '45.2K', change: '+12%' },
            { label: 'Visitors', value: '12.8K', change: '+8%' },
            { label: 'Avg Session', value: '4m 32s', change: '+5%' },
            { label: 'Bounce', value: '34.2%', change: '-2%', negative: true },
          ].map(s => (
            <div key={s.label} className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] p-2">
              <span className="text-[8px] md:text-[10px] font-mono font-bold text-gray-400 uppercase block">{s.label}</span>
              <span className="text-sm md:text-lg font-black font-mono block">{s.value}</span>
              <span className={`text-[9px] font-bold ${s.negative ? 'text-red-500' : 'text-green-600'}`}>{s.change}</span>
            </div>
          ))}
        </div>

        {/* Conversion Stats */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { label: 'Deals Viewed', value: '8,923' },
            { label: 'Apps Started', value: '1,234' },
            { label: 'Completed', value: '892' },
            { label: 'Conv. Rate', value: '72.3%' },
          ].map(s => (
            <div key={s.label} className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] p-2">
              <span className="text-[8px] md:text-[10px] font-mono font-bold text-gray-400 uppercase block">{s.label}</span>
              <span className="text-sm md:text-lg font-black font-mono">{s.value}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Top Deals */}
          <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] p-3">
            <h3 className="font-mono font-bold text-xs uppercase mb-2 border-b border-gray-200 pb-1.5">Top Deals</h3>
            <div className="space-y-1.5">
              {topDeals.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between p-1.5 bg-gray-50 border border-gray-200 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-gray-400 w-4">#{i + 1}</span>
                    <span className="font-bold">{d.name}</span>
                  </div>
                  <div className="flex gap-3 text-[10px]">
                    <span className="text-gray-500">{d.views}</span>
                    <span className="text-green-600 font-bold">{d.apps} apps</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] p-3">
            <h3 className="font-mono font-bold text-xs uppercase mb-2 border-b border-gray-200 pb-1.5">Traffic Sources</h3>
            <div className="space-y-2">
              {trafficSources.map(s => (
                <div key={s.source}>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="font-medium">{s.source}</span>
                    <span className="font-bold">{s.pct}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 border border-black">
                    <div className={`h-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
