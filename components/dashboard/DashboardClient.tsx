'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import ProfileManager from './ProfileManager'
import SavedDealsSection from './SavedDealsSection'
import BillingPanel from './BillingPanel'
import OverviewTab from './DashboardOverviewTab'
import AccountTab from './DashboardAccountTab'
import DashboardHero from './DashboardHero'
import { createClient } from '@/lib/supabase/client'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'


type Tab = 'overview' | 'billing' | 'account'

interface DashboardClientProps {
  userName: string
  userEmail: string
  memberSince: string
  memberSinceFull: string
  avatarUrl: string | null
  isPro: boolean
  isAdmin: boolean
  savedDealSlugs: string[]
  subscription: any
  initialTab: Tab
}

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: 'dashboard' },
  { id: 'billing', label: 'Billing', icon: 'credit_card' },
  { id: 'account', label: 'Account', icon: 'person' },
]

export default function DashboardClient({
  userName,
  userEmail,
  memberSince,
  memberSinceFull,
  avatarUrl,
  isPro,
  isAdmin,
  savedDealSlugs,
  subscription,
  initialTab,
}: DashboardClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<Tab>(initialTab)
  const [currentName, setCurrentName] = useState(userName)
  const [isEditingName, setIsEditingName] = useState(false)
  const [savingName, setSavingName] = useState(false)
  const [tempName, setTempName] = useState(userName)

  useEffect(() => {
    setCurrentName(userName)
    setTempName(userName)
  }, [userName])

  const firstName = currentName.split(' ')[0]
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const planFromSub =
    subscription?.plan === 'nextfounder'
      ? "Next'Founder"
      : subscription?.plan === 'legend'
        ? 'Legend'
        : subscription?.plan === 'founder'
          ? 'Founder'
          : null
  const planLabel = isAdmin ? 'Admin' : planFromSub || (isPro ? 'Founder' : 'Free')
  const cancelPending = subscription?.cancel_at_period_end === true

  // Sync tab to URL without full reload
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (tab === 'overview') {
      params.delete('tab')
    } else {
      params.set('tab', tab)
    }
    const qs = params.toString()
    const url = qs ? `/dashboard?${qs}` : '/dashboard'
    window.history.replaceState(null, '', url)
  }, [tab, searchParams])

  const handleTabChange = useCallback((newTab: Tab) => {
    setTab(newTab)
    // Scroll to tab content area on mobile for clarity
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      const el = document.getElementById('dashboard-tab-content')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const handleSaveName = async () => {
    if (!tempName.trim() || tempName.trim().length < 2) {
      alert('Name must be at least 2 characters')
      return
    }
    setSavingName(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        data: { full_name: tempName.trim() }
      })
      if (error) throw error
      setCurrentName(tempName.trim())
      setIsEditingName(false)
      router.refresh()
    } catch (err: any) {
      alert(err.message || 'Failed to update name')
    } finally {
      setSavingName(false)
    }
  }


  return (
    <>
      <DashboardHero
        greeting={greeting}
        firstName={firstName}
        userEmail={userEmail}
        memberSince={memberSince}
        isAdmin={isAdmin}
        isPro={isPro}
        cancelPending={cancelPending}
        planLabel={planLabel}
        savedDealSlugs={savedDealSlugs}
        tab={tab}
        tabs={tabs}
        isEditingName={isEditingName}
        setIsEditingName={setIsEditingName}
        tempName={tempName}
        setTempName={setTempName}
        currentName={currentName}
        savingName={savingName}
        handleSaveName={handleSaveName}
        handleTabChange={handleTabChange}
      />

      {/* ── Tab content ── */}
      <div
        id="dashboard-tab-content"
        className="relative bg-[#f7f7f5] dark:bg-[#050505] overflow-hidden"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative max-w-[1400px] mx-auto px-3.5 md:px-8 py-4 md:py-10">
        <AnimatePresence mode="wait">
          <m.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="space-y-3.5 md:space-y-8"
          >
            {tab === 'overview' && (
              <OverviewTab
                isPro={isPro}
                savedDealSlugs={savedDealSlugs}
                onChangeTab={handleTabChange}
              />
            )}

            {tab === 'billing' && (
              <BillingPanel
                isPro={isPro}
                isAdmin={isAdmin}
                subscription={subscription}
                userName={userName}
                userEmail={userEmail}
                memberSinceFull={memberSinceFull}
              />
            )}

            {tab === 'account' && (
              <AccountTab
                userName={userName}
                userEmail={userEmail}
                memberSince={memberSince}
                avatarUrl={avatarUrl}
              />
            )}
          </m.div>
        </AnimatePresence>
        </div>
      </div>
    </>
  )
}
