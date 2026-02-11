'use client'

import { useState } from 'react'
import { 
  Plus, 
  Rocket, 
  Lightbulb, 
  Mail, 
  BarChart3,
  CheckCircle,
  Clock,
  Calendar,
  AlertTriangle,
  UserPlus,
  Award,
  Flag,
  MessageCircle
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('MRR')

  return (
    <div className="p-6 md:p-10 flex-1 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]">
      {/* Quick Actions */}
      <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <button className="bg-primary hover:bg-primary/80 text-black px-4 py-3 font-mono font-bold text-sm border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 group">
          <Plus className="w-4 h-4" />
          ADD NEW DEAL
        </button>
        <button className="bg-accent-yellow hover:bg-accent-yellow/80 text-black px-4 py-3 font-mono font-bold text-sm border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 group">
          <Rocket className="w-4 h-4" />
          ADD STARTUP
        </button>
        <button className="bg-white hover:bg-gray-50 text-black px-4 py-3 font-mono font-bold text-sm border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 group">
          <Lightbulb className="w-4 h-4" />
          ADD NEW IDEA
        </button>
        <button className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-3 font-mono font-bold text-sm border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 group">
          <Mail className="w-4 h-4" />
          NEWSLETTER
        </button>
        <button className="bg-black text-white hover:bg-gray-800 px-4 py-3 font-mono font-bold text-sm border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 group">
          <BarChart3 className="w-4 h-4" />
          FULL ANALYTICS
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Total Users */}
        <div className="bg-white p-5 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-20 h-20 bg-primary rounded-full border-3 border-black group-hover:scale-110 transition-transform"></div>
          <p className="font-mono font-bold text-sm text-black/70 uppercase mb-2 relative z-10">Total Users</p>
          <div className="flex items-end justify-between relative z-10">
            <h3 className="font-display font-bold text-4xl">12,847</h3>
            <span className="font-mono text-sm font-bold text-green-600 bg-green-100 border-2 border-black px-1.5 py-0.5 mb-1">+12%</span>
          </div>
        </div>

        {/* Pro Subscribers */}
        <div className="bg-white p-5 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-20 h-20 bg-accent-yellow rounded-full border-3 border-black group-hover:scale-110 transition-transform"></div>
          <p className="font-mono font-bold text-sm text-black/70 uppercase mb-2 relative z-10">Pro Subscribers</p>
          <div className="flex items-end justify-between relative z-10">
            <h3 className="font-display font-bold text-4xl">2,341</h3>
            <span className="font-mono text-sm font-bold text-green-600 bg-green-100 border-2 border-black px-1.5 py-0.5 mb-1">+5%</span>
          </div>
        </div>

        {/* Lifetime Members */}
        <div className="bg-white p-5 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-20 h-20 bg-blue-500 rounded-full border-3 border-black group-hover:scale-110 transition-transform"></div>
          <p className="font-mono font-bold text-sm text-black/70 uppercase mb-2 relative z-10">Lifetime Members</p>
          <div className="flex items-end justify-between relative z-10">
            <h3 className="font-display font-bold text-4xl">847</h3>
            <span className="font-mono text-sm font-bold text-green-600 bg-green-100 border-2 border-black px-1.5 py-0.5 mb-1">+1%</span>
          </div>
        </div>

        {/* MRR */}
        <div className="bg-black p-5 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-20 h-20 bg-white/20 rounded-full border-3 border-white group-hover:scale-110 transition-transform"></div>
          <p className="font-mono font-bold text-sm text-white/70 uppercase mb-2 relative z-10">Monthly Recurring</p>
          <div className="flex items-end justify-between relative z-10">
            <h3 className="font-display font-bold text-4xl text-white">$18,420</h3>
            <span className="font-mono text-sm font-bold text-primary bg-black border-2 border-white px-1.5 py-0.5 mb-1">+8%</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-white p-4 border-3 border-black flex flex-col justify-between h-32 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs font-bold uppercase">Active Deals</span>
            <CheckCircle className="w-5 h-5 text-black" />
          </div>
          <p className="font-display font-black text-3xl">523</p>
        </div>
        <div className="bg-accent-yellow p-4 border-3 border-black flex flex-col justify-between h-32 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs font-bold uppercase text-black">Pending Review</span>
            <Clock className="w-5 h-5 text-black" />
          </div>
          <p className="font-display font-black text-3xl text-black">12</p>
        </div>
        <div className="bg-white p-4 border-3 border-black flex flex-col justify-between h-32 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs font-bold uppercase">Expiring Wk</span>
            <Calendar className="w-5 h-5 text-black" />
          </div>
          <p className="font-display font-black text-3xl">8</p>
        </div>
        <div className="bg-accent-red p-4 border-3 border-black flex flex-col justify-between h-32 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs font-bold uppercase text-white">Issues</span>
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <p className="font-display font-black text-3xl text-white">3</p>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Revenue & Tasks (2/3 width on LG) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Revenue Section */}
          <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <div className="flex flex-wrap justify-between items-center mb-6 border-b-3 border-black pb-4">
              <h3 className="font-display font-bold text-2xl uppercase">Revenue Overview</h3>
              <div className="flex gap-2">
                <button className={`px-3 py-1 font-mono text-xs font-bold border-3 border-black ${timeRange === 'MRR' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100 text-black'}`}>
                  MRR
                </button>
                <button className={`px-3 py-1 font-mono text-xs font-bold border-3 border-black ${timeRange === 'YTD' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100 text-black'}`}>
                  YTD
                </button>
              </div>
            </div>
            
            {/* Chart Mockup */}
            <div className="w-full h-64 bg-paper border-3 border-black border-dashed mb-6 relative overflow-hidden flex items-end justify-between px-4 pb-0 pt-10">
              {/* Bars mockup */}
              <div className="w-[8%] h-[40%] bg-gray-300 border-x-3 border-t-3 border-black"></div>
              <div className="w-[8%] h-[55%] bg-gray-300 border-x-3 border-t-3 border-black"></div>
              <div className="w-[8%] h-[45%] bg-gray-300 border-x-3 border-t-3 border-black"></div>
              <div className="w-[8%] h-[60%] bg-gray-300 border-x-3 border-t-3 border-black"></div>
              <div className="w-[8%] h-[70%] bg-primary border-x-3 border-t-3 border-black"></div>
              <div className="w-[8%] h-[65%] bg-gray-300 border-x-3 border-t-3 border-black"></div>
              <div className="w-[8%] h-[80%] bg-primary border-x-3 border-t-3 border-black"></div>
              <div className="w-[8%] h-[75%] bg-gray-300 border-x-3 border-t-3 border-black"></div>
              <div className="w-[8%] h-[90%] bg-accent-yellow border-x-3 border-t-3 border-black"></div>
            </div>
            
            {/* Breakdown Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-sm">
                <thead className="border-b-3 border-black bg-paper">
                  <tr>
                    <th className="p-3 font-bold uppercase text-black">Source</th>
                    <th className="p-3 font-bold uppercase text-black">Users</th>
                    <th className="p-3 font-bold uppercase text-black">Revenue</th>
                    <th className="p-3 font-bold uppercase text-black">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b-2 border-black/10 hover:bg-paper">
                    <td className="p-3 font-bold">Pro Monthly</td>
                    <td className="p-3">1,842</td>
                    <td className="p-3 font-bold text-green-700">$9,210</td>
                    <td className="p-3">
                      <span className="w-3 h-3 inline-block bg-green-500 border border-black mr-2"></span>
                      Stable
                    </td>
                  </tr>
                  <tr className="border-b-2 border-black/10 hover:bg-paper">
                    <td className="p-3 font-bold">Pro Annual</td>
                    <td className="p-3">499</td>
                    <td className="p-3 font-bold text-green-700">$5,489</td>
                    <td className="p-3">
                      <span className="w-3 h-3 inline-block bg-green-500 border border-black mr-2"></span>
                      Growing
                    </td>
                  </tr>
                  <tr className="hover:bg-paper">
                    <td className="p-3 font-bold">Lifetime Access</td>
                    <td className="p-3">847</td>
                    <td className="p-3 font-bold text-green-700">$3,721</td>
                    <td className="p-3">
                      <span className="w-3 h-3 inline-block bg-yellow-400 border border-black mr-2"></span>
                      Review
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Tasks Section */}
          <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display font-bold text-2xl uppercase">This Week's Tasks</h3>
              <button className="text-sm font-mono underline decoration-2 decoration-primary underline-offset-4 hover:text-primary">
                View All
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-4 p-3 border-2 border-black hover:bg-paper cursor-pointer group transition-colors">
                <input 
                  className="w-6 h-6 border-2 border-black text-black focus:ring-0 rounded-none bg-white checked:bg-primary checked:border-black" 
                  type="checkbox"
                />
                <span className="flex-1 font-mono text-sm group-hover:font-bold">Verify 5 new grant applications</span>
                <span className="bg-accent-yellow text-black text-xs font-bold px-2 py-1 border border-black">HIGH</span>
              </label>
              <label className="flex items-center gap-4 p-3 border-2 border-black hover:bg-paper cursor-pointer group transition-colors">
                <input 
                  className="w-6 h-6 border-2 border-black text-black focus:ring-0 rounded-none bg-white checked:bg-primary checked:border-black" 
                  type="checkbox"
                />
                <span className="flex-1 font-mono text-sm group-hover:font-bold">Approve 2 incubator listings for YC S24</span>
                <span className="bg-primary text-black text-xs font-bold px-2 py-1 border border-black">MED</span>
              </label>
              <label className="flex items-center gap-4 p-3 border-2 border-black hover:bg-paper cursor-pointer group transition-colors">
                <input 
                  checked 
                  className="w-6 h-6 border-2 border-black text-black focus:ring-0 rounded-none bg-white checked:bg-black checked:border-black" 
                  type="checkbox"
                />
                <span className="flex-1 font-mono text-sm line-through opacity-50">Review Q3 Financial Report</span>
                <span className="bg-gray-200 text-black text-xs font-bold px-2 py-1 border border-black">DONE</span>
              </label>
              <label className="flex items-center gap-4 p-3 border-2 border-black hover:bg-paper cursor-pointer group transition-colors">
                <input 
                  className="w-6 h-6 border-2 border-black text-black focus:ring-0 rounded-none bg-white checked:bg-primary checked:border-black" 
                  type="checkbox"
                />
                <span className="flex-1 font-mono text-sm group-hover:font-bold">Update Startup Credits Database</span>
                <span className="bg-primary text-black text-xs font-bold px-2 py-1 border border-black">MED</span>
              </label>
            </div>
          </section>
        </div>

        {/* Right Column: Activity Feed (1/3 width on LG) */}
        <div className="lg:col-span-1">
          <section className="bg-black text-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 h-full min-h-[500px]">
            <div className="flex items-center gap-2 mb-6 border-b-2 border-white/20 pb-4">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              <h3 className="font-display font-bold text-xl uppercase">Live Activity</h3>
            </div>
            <div className="flex flex-col gap-6 relative">
              {/* Vertical Line */}
              <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-white/20"></div>
              
              {/* Activity Items */}
              <div className="flex gap-4 relative">
                <div className="w-10 h-10 shrink-0 bg-white border-2 border-white text-black flex items-center justify-center font-bold z-10">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div className="pt-1">
                  <p className="font-mono text-xs text-primary mb-1">10:42 AM</p>
                  <p className="font-bold text-sm leading-tight">New user signed up: <span className="text-gray-400">sarah@tech.co</span></p>
                </div>
              </div>

              <div className="flex gap-4 relative">
                <div className="w-10 h-10 shrink-0 bg-primary border-2 border-white text-black flex items-center justify-center font-bold z-10">
                  <Award className="w-5 h-5" />
                </div>
                <div className="pt-1">
                  <p className="font-mono text-xs text-primary mb-1">10:28 AM</p>
                  <p className="font-bold text-sm leading-tight">Pro Upgrade: <span className="text-gray-400">Annual Plan ($299)</span></p>
                </div>
              </div>

              <div className="flex gap-4 relative">
                <div className="w-10 h-10 shrink-0 bg-accent-red border-2 border-white text-white flex items-center justify-center font-bold z-10">
                  <Flag className="w-5 h-5" />
                </div>
                <div className="pt-1">
                  <p className="font-mono text-xs text-primary mb-1">09:15 AM</p>
                  <p className="font-bold text-sm leading-tight">Deal Reported: <span className="text-gray-400">Broken link on AWS Credits</span></p>
                </div>
              </div>

              <div className="flex gap-4 relative">
                <div className="w-10 h-10 shrink-0 bg-black border-2 border-white text-white flex items-center justify-center font-bold z-10">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="pt-1">
                  <p className="font-mono text-xs text-primary mb-1">08:45 AM</p>
                  <p className="font-bold text-sm leading-tight">New comment flagged for review on "Idea #420"</p>
                </div>
              </div>

              <div className="flex gap-4 relative">
                <div className="w-10 h-10 shrink-0 bg-white border-2 border-white text-black flex items-center justify-center font-bold z-10">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div className="pt-1">
                  <p className="font-mono text-xs text-primary mb-1">08:30 AM</p>
                  <p className="font-bold text-sm leading-tight">New user signed up: <span className="text-gray-400">mike@build.io</span></p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/20">
              <Link 
                href="/admin/logs"
                className="block w-full text-center py-2 bg-white/10 hover:bg-white/20 border border-white/30 text-xs font-mono uppercase tracking-wider transition-colors"
              >
                View Full Log
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}