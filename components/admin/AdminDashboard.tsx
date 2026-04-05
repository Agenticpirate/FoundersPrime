'use client'

import { useState } from 'react'
import {
  Plus, Rocket, Lightbulb, Mail, BarChart3,
  CheckCircle, Clock, Calendar, AlertTriangle,
  UserPlus, Award, Flag, MessageCircle
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('MRR')

  return (
    <div className="p-3 md:p-6 flex-1 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]">
      {/* Quick Actions */}
      <div className="mb-4 md:mb-6 flex flex-wrap gap-2">
        {[
          { label: 'Add Deal', icon: Plus, bg: 'bg-primary' },
          { label: 'Add Startup', icon: Rocket, bg: 'bg-accent-yellow' },
          { label: 'Add Idea', icon: Lightbulb, bg: 'bg-white' },
          { label: 'Newsletter', icon: Mail, bg: 'bg-blue-500 text-white' },
          { label: 'Analytics', icon: BarChart3, bg: 'bg-black text-white' },
        ].map((a) => (
          <button key={a.label} className={`${a.bg} px-3 py-2 font-mono font-bold text-[10px] md:text-xs border-2 border-black shadow-[2px_2px_0px_#111] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-1.5`}>
            <a.icon className="w-3.5 h-3.5" />
            {a.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Stats Overview — 4 col always */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6">
        {[
          { label: 'Users', value: '12,847', change: '+12%', accent: 'bg-primary' },
          { label: 'Pro Subs', value: '2,341', change: '+5%', accent: 'bg-accent-yellow' },
          { label: 'Lifetime', value: '847', change: '+1%', accent: 'bg-blue-500' },
          { label: 'MRR', value: '$18,420', change: '+8%', accent: 'bg-black', dark: true },
        ].map((s) => (
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
        {[
          { label: 'Active Deals', value: '523', Icon: CheckCircle, bg: 'bg-white', text: 'text-black' },
          { label: 'Pending', value: '12', Icon: Clock, bg: 'bg-accent-yellow', text: 'text-black' },
          { label: 'Expiring', value: '8', Icon: Calendar, bg: 'bg-white', text: 'text-black' },
          { label: 'Issues', value: '3', Icon: AlertTriangle, bg: 'bg-red-500', text: 'text-white' },
        ].map((s) => (
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
          {/* Revenue Section */}
          <section className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] p-3 md:p-5">
            <div className="flex justify-between items-center mb-3 border-b-2 border-black pb-2">
              <h3 className="font-mono font-bold text-sm md:text-lg uppercase">Revenue</h3>
              <div className="flex gap-1">
                {['MRR', 'YTD'].map((t) => (
                  <button key={t} onClick={() => setTimeRange(t)} className={`px-2 py-0.5 font-mono text-[10px] font-bold border-2 border-black ${timeRange === t ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="w-full h-32 md:h-48 bg-gray-50 border-2 border-dashed border-gray-300 mb-3 flex items-end justify-between px-2 pb-0 pt-4">
              {[40, 55, 45, 60, 70, 65, 80, 75, 90].map((h, i) => (
                <div key={i} className={`w-[9%] border-x border-t border-black ${[4, 6].includes(i) ? 'bg-primary' : i === 8 ? 'bg-accent-yellow' : 'bg-gray-200'}`} style={{ height: `${h}%` }} />
              ))}
            </div>

            {/* Table */}
            <table className="w-full text-left font-mono text-[11px] md:text-xs">
              <thead className="border-b-2 border-black bg-gray-50">
                <tr>
                  <th className="p-2 font-bold uppercase">Source</th>
                  <th className="p-2 font-bold uppercase">Users</th>
                  <th className="p-2 font-bold uppercase">Revenue</th>
                  <th className="p-2 font-bold uppercase hidden sm:table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { src: 'Pro Monthly', users: '1,842', rev: '$9,210', status: 'Stable', color: 'bg-green-500' },
                  { src: 'Pro Annual', users: '499', rev: '$5,489', status: 'Growing', color: 'bg-green-500' },
                  { src: 'Lifetime', users: '847', rev: '$3,721', status: 'Review', color: 'bg-yellow-400' },
                ].map((r) => (
                  <tr key={r.src} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-2 font-bold">{r.src}</td>
                    <td className="p-2">{r.users}</td>
                    <td className="p-2 font-bold text-green-700">{r.rev}</td>
                    <td className="p-2 hidden sm:table-cell">
                      <span className={`w-2 h-2 inline-block ${r.color} border border-black mr-1`} />{r.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Tasks */}
          <section className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] p-3 md:p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-mono font-bold text-sm md:text-lg uppercase">Tasks</h3>
              <button className="text-[10px] font-mono underline decoration-primary underline-offset-2 hover:text-primary">View All</button>
            </div>
            <div className="flex flex-col gap-1.5">
              {[
                { text: 'Verify 5 new grant applications', priority: 'HIGH', bg: 'bg-accent-yellow', done: false },
                { text: 'Approve 2 incubator listings for YC S24', priority: 'MED', bg: 'bg-primary', done: false },
                { text: 'Review Q3 Financial Report', priority: 'DONE', bg: 'bg-gray-200', done: true },
                { text: 'Update Startup Credits Database', priority: 'MED', bg: 'bg-primary', done: false },
              ].map((t, i) => (
                <label key={i} className="flex items-center gap-2 md:gap-3 p-2 border border-black hover:bg-gray-50 cursor-pointer group transition-colors">
                  <input
                    className="w-4 h-4 border-2 border-black rounded-none bg-white checked:bg-black"
                    type="checkbox"
                    defaultChecked={t.done}
                  />
                  <span className={`flex-1 font-mono text-[11px] md:text-xs ${t.done ? 'line-through opacity-40' : 'group-hover:font-bold'}`}>{t.text}</span>
                  <span className={`${t.bg} text-black text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 border border-black`}>{t.priority}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Activity */}
        <div className="lg:col-span-1">
          <section className="bg-black text-white border-2 border-black shadow-[3px_3px_0px_#111] p-3 md:p-5">
            <div className="flex items-center gap-2 mb-3 border-b border-white/20 pb-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <h3 className="font-mono font-bold text-sm uppercase">Live Activity</h3>
            </div>
            <div className="flex flex-col gap-3 relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/15" />
              {[
                { time: '10:42 AM', text: 'New user: sarah@tech.co', Icon: UserPlus, bg: 'bg-white text-black' },
                { time: '10:28 AM', text: 'Pro Upgrade: Annual ($299)', Icon: Award, bg: 'bg-primary text-black' },
                { time: '09:15 AM', text: 'Broken link: AWS Credits', Icon: Flag, bg: 'bg-red-500 text-white' },
                { time: '08:45 AM', text: 'Comment flagged: Idea #420', Icon: MessageCircle, bg: 'bg-gray-700 text-white' },
                { time: '08:30 AM', text: 'New user: mike@build.io', Icon: UserPlus, bg: 'bg-white text-black' },
              ].map((a, i) => (
                <div key={i} className="flex gap-3 relative">
                  <div className={`w-8 h-8 shrink-0 ${a.bg} border border-white/30 flex items-center justify-center z-10`}>
                    <a.Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="pt-0.5 min-w-0">
                    <p className="font-mono text-[9px] text-primary">{a.time}</p>
                    <p className="font-bold text-[11px] leading-tight truncate">{a.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-white/20">
              <Link href="/admin/logs" className="block w-full text-center py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-[10px] font-mono uppercase tracking-wider transition-colors">
                View Full Log
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
