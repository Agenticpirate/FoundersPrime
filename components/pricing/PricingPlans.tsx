'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Currency } from '@/utils/currency'
import { useAuth } from '@/lib/auth/hooks'
import DodoPaymentsBadge from '@/components/ui/DodoPaymentsBadge'
import PricingPlanNext from './PricingPlanNext'
import PricingPlanFounder from './PricingPlanFounder'
import PricingPlanLegend from './PricingPlanLegend'

interface PricingPlansProps {
  currency: Currency
}

type PlanId = 'nextfounder' | 'founder' | 'legend'

/**
 * 'trial'  — paid trial first, then the annual price renews automatically.
 * 'annual' — skip the trial and buy the full year immediately.
 */
type PurchaseMode = 'trial' | 'annual'

export default function PricingPlans({ currency }: PricingPlansProps) {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<Record<PlanId, boolean>>({
    nextfounder: false,
    founder: false,
    legend: false,
  })

  const toggleExpand = (plan: PlanId) => {
    setExpanded((prev) => ({ ...prev, [plan]: !prev[plan] }))
  }

  const handleCheckout = async (plan: PlanId, mode: PurchaseMode = 'trial') => {
    if (authLoading) return

    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const currentUser = session?.user || user

    if (!currentUser) {
      router.push('/login?redirect=/pricing')
      return
    }

    // Track the specific button pressed so only that one shows a spinner.
    setLoadingPlan(`${plan}:${mode}`)
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`
      }

      const res = await fetch('/api/payment/create-link', {
        method: 'POST',
        headers,
        body: JSON.stringify({ plan, mode }),
      })

      const contentType = res.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        alert(`Payment blocked (HTTP ${res.status}). Please contact support@foundersprime.com`)
        return
      }

      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url
      } else if (res.status === 401) {
        router.push('/login?redirect=/pricing')
      } else {
        alert(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Payment fetch error:', err)
      alert(
        'Unable to reach payment server. This may be a network issue. Please try again or contact support@foundersprime.com'
      )
    } finally {
      setLoadingPlan(null)
    }
  }

  void currency

  return (
    <section className="relative py-3 md:py-10 px-3 sm:px-6 max-w-6xl mx-auto overflow-visible" id="plans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-5 lg:gap-6 items-stretch pt-2 md:pt-10 overflow-visible">
        <PricingPlanNext
          expanded={expanded.nextfounder}
          loadingPlan={loadingPlan}
          onToggle={() => toggleExpand('nextfounder')}
          onCheckout={(mode) => handleCheckout('nextfounder', mode)}
        />
        <PricingPlanFounder
          expanded={expanded.founder}
          loadingPlan={loadingPlan}
          onToggle={() => toggleExpand('founder')}
          onCheckout={(mode) => handleCheckout('founder', mode)}
        />
        <PricingPlanLegend
          expanded={expanded.legend}
          loadingPlan={loadingPlan}
          onToggle={() => toggleExpand('legend')}
          onCheckout={() => handleCheckout('legend', 'annual')}
        />
      </div>

      <div className="mt-4 md:mt-10 flex flex-col items-center gap-2.5 md:gap-4">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 md:gap-x-6 md:gap-y-2 text-[9px] md:text-[11px] font-mono text-gray-500 dark:text-gray-500">
          {['Secure checkout', 'Instant access', 'Cancel anytime'].map((t) => (
            <span key={t} className="inline-flex items-center gap-1 md:gap-1.5">
              <span className="material-symbols-outlined !text-[12px] md:!text-[14px] text-accent-yellow">
                verified
              </span>
              {t}
            </span>
          ))}
        </div>

        <div className="scale-90 md:scale-100 origin-center">
          <DodoPaymentsBadge />
        </div>
      </div>
    </section>
  )
}
