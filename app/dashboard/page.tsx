import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DashboardClient from '@/components/dashboard/DashboardClient'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your FoundersPrime dashboard - manage your account, deals, and subscription.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Local dev — no Supabase env vars set
  const isLocalDev = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!user && !isLocalDev) {
    redirect('/login')
  }

  // Admin lookup
  let adminUser = null
  if (user) {
    const { data } = await supabase
      .from('admin_users')
      .select('role')
      .eq('email', user.email)
      .single()
    adminUser = data
  }

  // Active subscription lookup (for billing tab)
  // Try with new cancel_at_period_end column first; fall back if column hasn't been migrated yet.
  let subscription: any = null
  if (user) {
    const fullQuery = await supabase
      .from('user_subscriptions')
      .select('id, plan, status, period_start, period_end, cancel_at_period_end, stripe_subscription_id, created_at')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (fullQuery.error && /cancel_at_period_end/i.test(fullQuery.error.message || '')) {
      // Column not migrated yet — fall back to legacy schema
      const { data } = await supabase
        .from('user_subscriptions')
        .select('id, plan, status, period_start, period_end, stripe_subscription_id, created_at')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
      subscription = data ? { ...data, cancel_at_period_end: false } : null
    } else {
      subscription = fullQuery.data
    }
  }

  // Normalize legacy storage aliases before passing subscription data to dashboard UI.
  // The production table historically stored Next Founder as "explorer"/"campus".
  if (subscription && ['explorer', 'campus'].includes(subscription.plan)) {
    subscription = { ...subscription, plan: 'nextfounder' }
  }

  const isPaymentSuccess = searchParams?.status === 'succeeded' || searchParams?.status === 'completed'
  const PRO_USERS = ['raviteja.journal@gmail.com', 'hello@axionxlab.com', 'pulligellaraviteja@gmail.com']
  const userEmail = user?.email || ''
  const isPro = !!adminUser || PRO_USERS.includes(userEmail) || isPaymentSuccess || isLocalDev || !!subscription
  const isAdmin = !!adminUser || isLocalDev
  const userName = user?.user_metadata?.full_name || userEmail.split('@')[0] || 'Founder'
  const savedDeals = user?.user_metadata?.saved_deals || []
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'Local Dev'
  const memberSinceFull = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Local Dev'

  // Initial tab from query string (e.g. /dashboard?tab=billing or /billing redirect)
  const rawTab = searchParams?.tab
  const initialTab = (typeof rawTab === 'string' && ['overview', 'billing', 'account'].includes(rawTab))
    ? rawTab
    : 'overview'

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 bg-[#fafafa] dark:bg-black">
        <DashboardClient
          userName={userName}
          userEmail={userEmail}
          memberSince={memberSince}
          memberSinceFull={memberSinceFull}
          avatarUrl={user?.user_metadata?.avatar_url || null}
          isPro={isPro}
          isAdmin={isAdmin}
          savedDealSlugs={savedDeals}
          subscription={subscription}
          initialTab={initialTab as 'overview' | 'billing' | 'account'}
        />
      </main>
      <Footer />
    </div>
  )
}
