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

  if (!user) { redirect('/login') }

  const { data: adminUser } = await supabase
    .from('admin_users').select('role').eq('email', user.email).single()

  const isPaymentSuccess = searchParams?.status === 'succeeded' || searchParams?.status === 'completed'
  const PRO_USERS = ['raviteja.journal@gmail.com']
  const isPro = !!adminUser || PRO_USERS.includes(user.email || '') || isPaymentSuccess
  const isAdmin = !!adminUser
  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Founder'
  const savedDeals = user.user_metadata?.saved_deals || []
  const memberSince = user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 bg-[#fafafa]">
        {/* Dark hero header */}
        <div className="bg-black text-white border-b-4 border-accent-yellow">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-1">Dashboard</p>
                <h1 className="text-2xl md:text-3xl font-black uppercase font-mono">
                  Welcome back, <span className="text-accent-yellow">{userName}</span>
                </h1>
                <p className="text-gray-400 text-sm mt-1 font-mono">{user.email}</p>
              </div>
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link href="/admin" className="px-3 py-1.5 bg-white/10 border border-white/20 text-xs font-mono font-bold uppercase text-gray-300 hover:bg-white/20 transition-colors">
                    Admin Panel
                  </Link>
                )}
                <div className={`flex items-center gap-2 px-3 py-1.5 font-mono font-bold text-xs uppercase tracking-wider ${isPro ? 'bg-accent-yellow text-black border border-black' : 'bg-white/10 border border-white/20 text-gray-300'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isPro ? 'bg-black' : 'bg-green-500 animate-pulse'}`} />
                  {isAdmin ? 'Admin' : isPro ? 'Founder Plan' : 'Free'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-8">
          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
            <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Deals Claimed</span>
                <span className="material-symbols-outlined text-base text-gray-300">local_offer</span>
              </div>
              <p className="text-2xl font-black font-mono">0</p>
            </div>
            <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Est. Savings</span>
                <span className="material-symbols-outlined text-base text-gray-300">savings</span>
              </div>
              <p className="text-2xl font-black font-mono text-green-600">$0</p>
            </div>
            <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Saved Deals</span>
                <span className="material-symbols-outlined text-base text-gray-300">bookmark</span>
              </div>
              <p className="text-2xl font-black font-mono">{savedDeals.length}</p>
            </div>
            <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Member Since</span>
                <span className="material-symbols-outlined text-base text-gray-300">calendar_month</span>
              </div>
              <p className="text-lg font-black font-mono">{memberSince}</p>
            </div>
          </div>

          {/* Upgrade banner for free users */}
          {!isPro && (
            <div className="bg-black text-white border-2 border-black shadow-[3px_3px_0px_#111] p-5 md:p-6 mb-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-accent-yellow text-xl">bolt</span>
                    <h2 className="text-lg font-black uppercase font-mono">Unlock Full Access</h2>
                  </div>
                  <p className="text-gray-400 text-sm max-w-md">Get unlimited deal claims, private founder community, and access to every credit, grant, and program on the platform.</p>
                </div>
                <Link href="/pricing" className="bg-accent-yellow text-black font-mono font-bold text-sm uppercase px-6 py-3 border-2 border-accent-yellow hover:bg-white hover:border-black transition-all flex items-center gap-2 flex-shrink-0">
                  View Plans <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </div>
          )}

          {/* Saved Deals */}
          {savedDeals.length > 0 && (
            <div className="mb-6">
              <SavedDealsSection savedDealSlugs={savedDeals} />
            </div>
          )}

          {/* Quick actions — uniform grid */}
          <div className="mb-3">
            <h2 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">Explore</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { href: '/deals', icon: 'local_offer', label: 'Browse Deals', desc: 'Cloud credits, SaaS discounts, grants, ad credits — all verified weekly.', cta: 'Explore deals', color: 'bg-accent-yellow' },
              { href: '/startups', icon: 'verified', label: 'Verified Startups', desc: 'Funded companies from Y Combinator and top accelerators with real metrics.', cta: 'Browse startups', color: 'bg-green-400' },
              { href: '/ideas', icon: 'emoji_objects', label: 'Startup Ideas', desc: 'Validated business opportunities with market analysis and revenue potential.', cta: 'Discover ideas', color: 'bg-orange-400' },
              { href: '/resources', icon: 'folder_open', label: 'Resources', desc: 'Templates, pitch decks, guides, and checklists built for founders.', cta: 'Access resources', color: 'bg-blue-400' },
            ].map((a) => (
              <Link key={a.href} href={a.href} className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all group flex overflow-hidden">
                <div className={`${a.color} border-r-2 border-black w-14 flex-shrink-0 flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-black text-xl">{a.icon}</span>
                </div>
                <div className="p-4 flex-1">
                  <h3 className="font-mono font-bold text-sm uppercase mb-1">{a.label}</h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{a.desc}</p>
                  <span className="text-[11px] font-mono font-bold text-primary uppercase group-hover:underline">{a.cta} →</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Account section */}
          <div className="mb-3">
            <h2 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">Account</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Profile card — editable */}
            <div className="lg:col-span-2">
              <ProfileManager
                initialName={userName}
                initialEmail={user.email || ''}
                initialAvatar={user.user_metadata?.avatar_url || null}
                memberSince={memberSince}
              />
            </div>

            {/* Quick links */}
            <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#111] divide-y divide-gray-100">
              <Link href="/billing" className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400 text-lg">credit_card</span>
                  <div>
                    <p className="font-mono font-bold text-xs uppercase">Billing</p>
                    <p className="text-[10px] text-gray-400">{isPro ? 'Founder Plan' : 'Free Plan'}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-300 text-base">chevron_right</span>
              </Link>
              <Link href="/submit-deal" className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400 text-lg">add_circle</span>
                  <div>
                    <p className="font-mono font-bold text-xs uppercase">Submit Deal</p>
                    <p className="text-[10px] text-gray-400">Share with founders</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-300 text-base">chevron_right</span>
              </Link>
              <Link href="/contact" className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400 text-lg">support_agent</span>
                  <div>
                    <p className="font-mono font-bold text-xs uppercase">Support</p>
                    <p className="text-[10px] text-gray-400">Get help</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-300 text-base">chevron_right</span>
              </Link>
              <Link href="/auth/reset-password" className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400 text-lg">lock_reset</span>
                  <div>
                    <p className="font-mono font-bold text-xs uppercase">Change Password</p>
                    <p className="text-[10px] text-gray-400">Update credentials</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-300 text-base">chevron_right</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
