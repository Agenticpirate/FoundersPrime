import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProfileManager from '@/components/dashboard/ProfileManager'
import { createClient } from '@/lib/supabase/server'
import SavedDealsSection from '@/components/dashboard/SavedDealsSection'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your FoundersPrime dashboard - manage your account, deals, and subscription.',
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // In local dev without Supabase env vars, show dashboard with mock data
  const isLocalDev = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!user && !isLocalDev) { redirect('/login') }

  let adminUser = null
  if (user) {
    const { data } = await supabase
      .from('admin_users').select('role').eq('email', user.email).single()
    adminUser = data
  }

  const isPaymentSuccess = searchParams?.status === 'succeeded' || searchParams?.status === 'completed'
  const PRO_USERS = ['raviteja.journal@gmail.com', 'hello@axionxlab.com']
  const userEmail = user?.email || 'dev@localhost'
  const isPro = !!adminUser || PRO_USERS.includes(userEmail) || isPaymentSuccess || isLocalDev
  const isAdmin = !!adminUser || isLocalDev
  const userName = user?.user_metadata?.full_name || userEmail.split('@')[0] || 'Founder'
  const savedDeals = user?.user_metadata?.saved_deals || []
  const memberSince = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Local Dev'

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 bg-[#fafafa]">
        {/* Dark hero header */}
        <div className="bg-black text-white border-b-4 border-accent-yellow">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 md:py-8">
            <div className="flex justify-between items-start gap-3">
              <div className="min-w-0">
                <h1 className="text-lg md:text-3xl font-black uppercase font-mono truncate">
                  Hey, <span className="text-accent-yellow">{userName}</span>
                </h1>
                <p className="text-gray-500 text-[10px] md:text-sm mt-0.5 font-mono truncate">{userEmail}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {isAdmin && (
                  <Link href="/admin" className="px-2 py-1 bg-white/10 border border-white/20 text-[10px] font-mono font-bold uppercase text-gray-300 hover:bg-white/20 transition-colors">
                    Admin
                  </Link>
                )}
                <div className={`flex items-center gap-1.5 px-2 py-1 font-mono font-bold text-[10px] uppercase tracking-wider ${isPro ? 'bg-accent-yellow text-black border border-black' : 'bg-white/10 border border-white/20 text-gray-300'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isPro ? 'bg-black' : 'bg-green-500 animate-pulse'}`} />
                  {isAdmin ? 'Admin' : isPro ? 'Founder' : 'Free'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 md:py-8">
          {/* Stats row */}
          <div className="grid grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] p-2 md:p-4">
              <span className="text-[8px] md:text-[10px] font-mono font-bold text-gray-400 uppercase block">Claimed</span>
              <p className="text-lg md:text-2xl font-black font-mono">0</p>
            </div>
            <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] p-2 md:p-4">
              <span className="text-[8px] md:text-[10px] font-mono font-bold text-gray-400 uppercase block">Savings</span>
              <p className="text-lg md:text-2xl font-black font-mono text-green-600">$0</p>
            </div>
            <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] p-2 md:p-4">
              <span className="text-[8px] md:text-[10px] font-mono font-bold text-gray-400 uppercase block">Saved</span>
              <p className="text-lg md:text-2xl font-black font-mono">{savedDeals.length}</p>
            </div>
            <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] p-2 md:p-4">
              <span className="text-[8px] md:text-[10px] font-mono font-bold text-gray-400 uppercase block">Since</span>
              <p className="text-sm md:text-lg font-black font-mono">{memberSince}</p>
            </div>
          </div>

          {/* Upgrade banner for free users */}
          {!isPro && (
            <div className="bg-black text-white border-2 border-black shadow-[2px_2px_0px_#111] p-4 mb-4 md:mb-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex items-center justify-between gap-3 relative z-10">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="material-symbols-outlined text-accent-yellow text-base">bolt</span>
                    <h2 className="text-sm font-black uppercase font-mono">Unlock Full Access</h2>
                  </div>
                  <p className="text-gray-400 text-[11px] line-clamp-2">Unlimited claims, private community, every credit & grant.</p>
                </div>
                <Link href="/pricing" className="bg-accent-yellow text-black font-mono font-bold text-[10px] uppercase px-4 py-2 border border-black hover:bg-white transition-all flex-shrink-0">
                  Upgrade
                </Link>
              </div>
            </div>
          )}

          {/* Saved Deals */}
          {savedDeals.length > 0 && (
            <div className="mb-4 md:mb-6">
              <SavedDealsSection savedDealSlugs={savedDeals} />
            </div>
          )}

          {/* Quick actions — clean list style */}
          <div className="mb-2">
            <h2 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Explore</h2>
          </div>
          <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] divide-y divide-gray-100 mb-6">
            {[
              { href: '/deals', icon: 'local_offer', label: 'Deals', cta: 'Explore →', color: 'bg-accent-yellow' },
              { href: '/startups', icon: 'verified', label: 'Verified Startups', cta: 'Browse →', color: 'bg-green-400' },
              { href: '/ideas', icon: 'emoji_objects', label: 'Startup Ideas', cta: 'Discover →', color: 'bg-orange-400' },
              { href: '/resources', icon: 'folder_open', label: 'Resources & Guides', cta: 'Access →', color: 'bg-blue-400' },
            ].map((a) => (
              <Link key={a.href} href={a.href} className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-2.5">
                  <span className={`w-8 h-8 ${a.color} border border-black/10 rounded-md flex items-center justify-center shadow-[1px_1px_0px_rgba(0,0,0,0.1)]`}>
                    <span className="material-symbols-outlined text-black text-base">{a.icon}</span>
                  </span>
                  <span className="font-mono font-bold text-xs uppercase">{a.label}</span>
                </div>
                <span className="font-mono text-[10px] font-bold text-primary group-hover:underline">{a.cta}</span>
              </Link>
            ))}
          </div>

          {/* Account section */}
          <div className="mb-2">
            <h2 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
            {/* Profile card — editable */}
            <div className="lg:col-span-2">
              <ProfileManager
                initialName={userName}
                initialEmail={userEmail}
                initialAvatar={user?.user_metadata?.avatar_url || null}
                memberSince={memberSince}
              />
            </div>

            {/* Quick links */}
            <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] divide-y divide-gray-100">
              <Link href="/billing" className="p-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-400 text-base">credit_card</span>
                  <div>
                    <p className="font-mono font-bold text-[11px] uppercase">Billing</p>
                    <p className="text-[9px] text-gray-400">{isPro ? 'Founder Plan' : 'Free Plan'}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-300 text-sm">chevron_right</span>
              </Link>
              <Link href="/submit-deal" className="p-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-400 text-base">add_circle</span>
                  <div>
                    <p className="font-mono font-bold text-[11px] uppercase">Submit Deal</p>
                    <p className="text-[9px] text-gray-400">Share with founders</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-300 text-sm">chevron_right</span>
              </Link>
              <Link href="/contact" className="p-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-400 text-base">support_agent</span>
                  <div>
                    <p className="font-mono font-bold text-[11px] uppercase">Support</p>
                    <p className="text-[9px] text-gray-400">Get help</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-300 text-sm">chevron_right</span>
              </Link>
              <Link href="/auth/reset-password" className="p-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-400 text-base">lock_reset</span>
                  <div>
                    <p className="font-mono font-bold text-[11px] uppercase">Password</p>
                    <p className="text-[9px] text-gray-400">Update credentials</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-300 text-sm">chevron_right</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
