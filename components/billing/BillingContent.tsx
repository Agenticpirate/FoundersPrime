'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function BillingContent() {
  const [user, setUser] = useState<any>(null)
  const [isPro, setIsPro] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      setUser(user)

      const { data: adminData } = await supabase
        .from('admin_users')
        .select('role')
        .eq('email', user.email)
        .single()

      const PRO_USERS = ['raviteja.journal@gmail.com']
      const proFromList = PRO_USERS.includes(user.email || '')
      setIsAdmin(!!adminData)
      setIsPro(!!adminData || proFromList)
      setLoading(false)
    }
    init()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-6 md:py-8 md:py-8 md:py-6 md:py-8">
        <div className="animate-spin h-10 w-10 border-b-3 border-black" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 border-2 border-black mb-6">
           <span className="material-symbols-outlined text-4xl text-black">lock</span>
        </div>
        <p className="font-mono font-bold text-xl mb-6 uppercase">You must be logged in to view billing.</p>
        <Link href="/login" className="inline-block bg-primary text-black font-black py-4 px-10 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
          LOG IN TO ACCOUNT
        </Link>
      </div>
    )
  }

  const planLabel = isAdmin ? 'Admin (Full Access)' : isPro ? 'Pro Member' : 'Free Plan'
  const planColor = isAdmin ? 'bg-black text-white' : isPro ? 'bg-accent-yellow text-black' : 'bg-gray-100 text-gray-800'

  return (
    <div className="space-y-6 md:space-y-8">

      {/* Current Plan */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold font-mono text-black mb-6 flex items-center gap-3">
          <span className="bg-[#13b6ec] text-white px-3 py-1 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">01</span>
          CURRENT SUBSCRIPTION
        </h2>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className={`inline-flex items-center gap-3 px-5 py-3 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-mono font-bold text-lg ${planColor}`}>
            <span className="material-symbols-outlined">{isPro ? 'workspace_premium' : 'person'}</span>
            {planLabel}
          </div>

          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1 font-mono">Account Email</p>
            <p className="font-bold font-mono text-black">{user.email}</p>
          </div>
        </div>

        {!isPro && (
          <div className="mt-6 border-3 border-black bg-gradient-to-r from-primary to-cyan-300 p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="font-mono font-black text-black text-lg uppercase">Upgrade to Pro</p>
              <p className="text-sm text-black/70">Unlock exclusive deals, grants, and accelerators.</p>
            </div>
            <Link
              href="/pricing"
              className="bg-black text-primary font-mono font-bold uppercase px-6 py-3 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">bolt</span>
              View Plans
            </Link>
          </div>
        )}

        {isPro && (
          <div className="mt-6 p-4 bg-green-50 border-3 border-green-500 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
            <p className="font-mono font-bold text-green-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-green-600">check_circle</span>
              You have full Pro access — all deals, grants, and premium features are unlocked.
            </p>
          </div>
        )}
      </section>

      {/* Manage Subscription */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold font-mono text-black mb-6 flex items-center gap-3">
          <span className="bg-[#13b6ec] text-white px-3 py-1 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">02</span>
          MANAGE SUBSCRIPTION
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/pricing"
            className="flex items-center gap-4 p-5 border-3 border-black bg-white hover:bg-accent-yellow hover:translate-x-[-2px] hover:translate-y-[-2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all group"
          >
            <span className="material-symbols-outlined text-3xl text-primary">upgrade</span>
            <div>
              <p className="font-mono font-bold text-black uppercase">Change Plan</p>
              <p className="text-sm text-gray-600">View all available plans and pricing.</p>
            </div>
          </Link>

          <a
            href="mailto:support@foundersprime.com?subject=Cancel%20Subscription"
            className="flex items-center gap-4 p-5 border-3 border-black bg-white hover:bg-red-50 hover:border-red-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] transition-all"
          >
            <span className="material-symbols-outlined text-3xl text-red-500">cancel</span>
            <div>
              <p className="font-mono font-bold text-black uppercase">Cancel Subscription</p>
              <p className="text-sm text-gray-600">Email us to cancel — we'll process it same day.</p>
            </div>
          </a>
        </div>

        <p className="text-xs text-gray-500 font-mono mt-4">
          * Payment and invoice management is handled securely by Dodo Payments. For receipts or invoice history, contact{' '}
          <a href="mailto:support@foundersprime.com" className="underline hover:text-black">support@foundersprime.com</a>.
        </p>
      </section>

      {/* Account Settings quick links */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold font-mono text-black mb-6 flex items-center gap-3">
          <span className="bg-[#13b6ec] text-white px-3 py-1 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">03</span>
          ACCOUNT
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border-3 border-black bg-gray-50">
            <p className="text-xs font-mono font-bold uppercase text-gray-500 mb-1">Email Address</p>
            <p className="font-mono font-bold text-black break-all">{user.email}</p>
          </div>
          <div className="p-4 border-3 border-black bg-gray-50">
            <p className="text-xs font-mono font-bold uppercase text-gray-500 mb-1">Account Created</p>
            <p className="font-mono font-bold text-black">
              {user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:support@foundersprime.com?subject=Update%20Account%20Details"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-black text-white font-mono font-bold text-sm uppercase border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-primary hover:text-black transition-colors"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            Update Details
          </a>
          <a
            href="mailto:support@foundersprime.com?subject=Delete%20My%20Account"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-red-600 font-mono font-bold text-sm uppercase border-3 border-red-500 shadow-[3px_3px_0px_0px_rgba(239,68,68,1)] hover:bg-red-50 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
            Delete Account
          </a>
        </div>
      </section>
    </div>
  )
}