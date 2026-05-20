import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Billing & Subscription',
  description: 'Manage your FoundersPrime subscription and account.',
}

export default async function BillingPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) { redirect('/login') }

  const { data: adminUser } = await supabase
    .from('admin_users').select('role').eq('email', user.email).single()

  const PRO_USERS = ['raviteja.journal@gmail.com', 'hello@axionxlab.com']
  const isPro = !!adminUser || PRO_USERS.includes(user.email || '')
  const isAdmin = !!adminUser
  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Founder'
  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—'

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 bg-[#fafafa]">
        <div className="max-w-[900px] mx-auto px-4 md:px-8 py-6 md:py-10">
          {/* Header */}
          <div className="mb-6">
            <Link href="/dashboard" className="text-xs font-mono text-gray-400 hover:text-black uppercase mb-2 inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">arrow_back</span> Dashboard
            </Link>
            <h1 className="font-mono text-2xl md:text-3xl font-black uppercase">Billing & Subscription</h1>
          </div>

          {/* Current Plan */}
          <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] p-5 md:p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-mono font-bold text-sm uppercase text-gray-400">Current Plan</h2>
              <div className={`flex items-center gap-2 px-3 py-1 font-mono font-bold text-xs uppercase ${isPro ? 'bg-accent-yellow text-black border border-black' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isPro ? 'bg-black' : 'bg-green-500'}`} />
                {isAdmin ? 'Admin' : isPro ? 'Founder Plan' : 'Free'}
              </div>
            </div>

            {isPro ? (
              <div className="bg-green-50 border border-green-200 p-4 rounded-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-green-600 text-lg">check_circle</span>
                  <p className="font-mono font-bold text-sm text-green-800">Full access active</p>
                </div>
                <p className="text-xs text-green-700 ml-7">All deals, grants, programs, and community features are unlocked.</p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-600 mb-4">You&apos;re on the free plan with limited access. Upgrade to unlock everything.</p>
                <Link href="/pricing" className="inline-flex items-center gap-2 bg-black text-white font-mono font-bold text-sm uppercase px-5 py-2.5 border-2 border-black shadow-[3px_3px_0px_#111] hover:bg-accent-yellow hover:text-black transition-all">
                  <span className="material-symbols-outlined text-base">bolt</span> Upgrade to Founder
                </Link>
              </div>
            )}
          </div>

          {/* Account Details */}
          <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] p-5 md:p-6 mb-4">
            <h2 className="font-mono font-bold text-sm uppercase text-gray-400 mb-4">Account Details</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Name</span>
                <span className="text-sm font-bold">{userName}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Email</span>
                <span className="text-sm font-bold font-mono">{user.email}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Member Since</span>
                <span className="text-sm font-bold">{memberSince}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-500">Status</span>
                <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Active
                </span>
              </div>
            </div>
          </div>

          {/* Manage */}
          <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] p-5 md:p-6 mb-4">
            <h2 className="font-mono font-bold text-sm uppercase text-gray-400 mb-4">Manage</h2>
            <div className="space-y-2">
              <Link href="/pricing" className="flex items-center justify-between p-3 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400 text-lg">swap_horiz</span>
                  <span className="text-sm font-medium">Change Plan</span>
                </div>
                <span className="material-symbols-outlined text-gray-300 text-base">chevron_right</span>
              </Link>
              <Link href="/auth/reset-password" className="flex items-center justify-between p-3 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400 text-lg">lock_reset</span>
                  <span className="text-sm font-medium">Change Password</span>
                </div>
                <span className="material-symbols-outlined text-gray-300 text-base">chevron_right</span>
              </Link>
              <a href="mailto:support@foundersprime.com?subject=Billing%20Support" className="flex items-center justify-between p-3 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400 text-lg">support_agent</span>
                  <span className="text-sm font-medium">Billing Support</span>
                </div>
                <span className="material-symbols-outlined text-gray-300 text-base">chevron_right</span>
              </a>
            </div>
          </div>

          {/* Danger zone */}
          <div className="bg-white border-2 border-red-200 shadow-[3px_3px_0px_rgba(239,68,68,0.3)] p-5 md:p-6">
            <h2 className="font-mono font-bold text-sm uppercase text-red-400 mb-3">Danger Zone</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Cancel Subscription</p>
                <p className="text-xs text-gray-400">Email us and we&apos;ll process it same day.</p>
              </div>
              <a href="mailto:support@foundersprime.com?subject=Cancel%20Subscription" className="text-xs font-mono font-bold text-red-500 border border-red-300 px-3 py-1.5 hover:bg-red-50 transition-colors uppercase">
                Cancel
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
