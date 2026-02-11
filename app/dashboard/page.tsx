import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/server'
import SavedDealsSection from '@/components/dashboard/SavedDealsSection'

export const metadata: Metadata = {
  title: 'Dashboard | FoundersPrime',
  description: 'Your FoundersPrime dashboard - manage your account, deals, and subscription.',
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }
  // Check if user is admin or pro
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('role')
    .eq('email', user.email)
    .single()

  // Check for successful payment redirect
  // Note: We treat `status=succeeded` as a temporary PRO verifier for visual feedback.
  const isPaymentSuccess = searchParams?.status === 'succeeded' || searchParams?.status === 'completed';

  const PRO_USERS = ['raviteja.journal@gmail.com']
  const isPro = !!adminUser || PRO_USERS.includes(user.email || '') || isPaymentSuccess
  const isAdmin = !!adminUser

  const memberStatus = isAdmin ? 'Admin' : (isPro ? 'Pro Member' : 'Free Member')
  const badgeColors = isAdmin
    ? 'bg-black text-white border-black'
    : (isPro ? 'bg-accent-yellow text-black border-black' : 'bg-green-100 text-green-800 border-green-600')

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Founder'
  const savedDeals = user.user_metadata?.saved_deals || []

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 bg-[#f8f9fa]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-2 text-sm font-bold uppercase tracking-wide mb-8">
            <Link className="text-black/60 hover:text-primary hover:underline decoration-2" href="/">Home</Link>
            <span className="text-black/60">/</span>
            <span className="text-black">Dashboard</span>
          </div>

          {/* Welcome Header */}
          <div className="border-3 border-black bg-white shadow-[6px_6px_0px_#111111] p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-black uppercase mb-2">Welcome, {userName}!</h1>
                <p className="text-gray-600">Manage your account, track deals, and explore resources.</p>
                <p className="text-sm text-gray-500 mt-2 font-mono">{user.email}</p>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 border-2 font-bold text-sm ${badgeColors}`}>
                <span className={`w-2 h-2 rounded-full ${isAdmin || isPro ? 'bg-current' : 'bg-green-500'}`}></span>
                {memberStatus}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="border-3 border-black bg-white shadow-[4px_4px_0px_#111111] p-6">
              <div className="text-xs font-bold uppercase text-gray-500 mb-1">Deals Applied</div>
              <div className="text-3xl font-black">0</div>
            </div>
            <div className="border-3 border-black bg-white shadow-[4px_4px_0px_#111111] p-6">
              <div className="text-xs font-bold uppercase text-gray-500 mb-1">Total Savings</div>
              <div className="text-3xl font-black text-primary">$0</div>
            </div>
            <div className="border-3 border-black bg-white shadow-[4px_4px_0px_#111111] p-6">
              <div className="text-xs font-bold uppercase text-gray-500 mb-1">Saved Deals</div>
              <div className="text-3xl font-black">{savedDeals.length}</div>
            </div>
            <div className="border-3 border-black bg-white shadow-[4px_4px_0px_#111111] p-6">
              <div className="text-xs font-bold uppercase text-gray-500 mb-1">Community Posts</div>
              <div className="text-3xl font-black">0</div>
            </div>
          </div>

          {/* Upgrade Banner - Only show for free members */}
          {!isPro && (
            <div className="border-3 border-black bg-gradient-to-r from-primary to-cyan-400 shadow-[6px_6px_0px_#111111] p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-black uppercase text-black mb-1">Unlock Premium Deals</h2>
                  <p className="text-black/80">Upgrade to Pro to access exclusive deals worth $100,000+</p>
                </div>
                <Link
                  href="/pricing"
                  className="bg-black text-white font-bold uppercase px-6 py-3 border-3 border-black shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] transition-all flex items-center gap-2"
                >
                  Upgrade Now
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>
          )}

          {/* Saved Deals Section */}
          {savedDeals.length > 0 && (
            <SavedDealsSection savedDealSlugs={savedDeals} />
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/deals" className="border-3 border-black bg-white shadow-[6px_6px_0px_#111111] p-6 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#111111] transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary border-2 border-black flex items-center justify-center">
                  <span className="material-symbols-outlined text-black">local_offer</span>
                </div>
                <h3 className="text-xl font-bold uppercase group-hover:text-primary">Browse Deals</h3>
              </div>
              <p className="text-gray-600 text-sm">Explore cloud credits, SaaS discounts, grants, and more.</p>
            </Link>

            <Link href="/billing" className="border-3 border-black bg-white shadow-[6px_6px_0px_#111111] p-6 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#111111] transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-amber-400 border-2 border-black flex items-center justify-center">
                  <span className="material-symbols-outlined text-black">credit_card</span>
                </div>
                <h3 className="text-xl font-bold uppercase group-hover:text-primary">Billing</h3>
              </div>
              <p className="text-gray-600 text-sm">Manage your subscription, payment methods, and invoices.</p>
            </Link>

            <Link href="/community" className="border-3 border-black bg-white shadow-[6px_6px_0px_#111111] p-6 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#111111] transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-400 border-2 border-black flex items-center justify-center">
                  <span className="material-symbols-outlined text-black">groups</span>
                </div>
                <h3 className="text-xl font-bold uppercase group-hover:text-primary">Community</h3>
              </div>
              <p className="text-gray-600 text-sm">Connect with other founders and share insights.</p>
            </Link>

            <Link href="/startups" className="border-3 border-black bg-white shadow-[6px_6px_0px_#111111] p-6 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#111111] transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-400 border-2 border-black flex items-center justify-center">
                  <span className="material-symbols-outlined text-black">database</span>
                </div>
                <h3 className="text-xl font-bold uppercase group-hover:text-primary">Startups DB</h3>
              </div>
              <p className="text-gray-600 text-sm">Browse funded startups and learn from their journeys.</p>
            </Link>

            <Link href="/ideas" className="border-3 border-black bg-white shadow-[6px_6px_0px_#111111] p-6 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#111111] transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-400 border-2 border-black flex items-center justify-center">
                  <span className="material-symbols-outlined text-black">emoji_objects</span>
                </div>
                <h3 className="text-xl font-bold uppercase group-hover:text-primary">Startup Ideas</h3>
              </div>
              <p className="text-gray-600 text-sm">Discover validated startup ideas and market opportunities.</p>
            </Link>

            <Link href="/resources" className="border-3 border-black bg-white shadow-[6px_6px_0px_#111111] p-6 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#111111] transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-400 border-2 border-black flex items-center justify-center">
                  <span className="material-symbols-outlined text-black">folder_open</span>
                </div>
                <h3 className="text-xl font-bold uppercase group-hover:text-primary">Resources</h3>
              </div>
              <p className="text-gray-600 text-sm">Access templates, guides, and checklists for founders.</p>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
