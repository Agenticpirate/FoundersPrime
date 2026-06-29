import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { verifyAdminServer as verifyAdmin } from '@/lib/admin/verify-admin-server'

// Plan pricing used to compute realized revenue (USD, excl. tax).
const PLAN_PRICE: Record<string, number> = {
  nextfounder: 12,
  founder: 149,
  legend: 299,
}

const PLAN_LABEL: Record<string, string> = {
  nextfounder: "Next'Founder",
  founder: 'Founder',
  legend: 'Legend (Lifetime)',
}

// ─── Helper: verify admin access ──────────────────────────────────────────────
// (now centralized in lib/admin/verify-admin-server.ts, which enforces is_active)

function getServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createServiceClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

// ─── GET: real subscription + revenue stats (admin only) ──────────────────────
export async function GET() {
  const auth = await verifyAdmin()
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })

  const svc = getServiceRoleClient()
  if (!svc) {
    return NextResponse.json({ error: 'Service role not configured' }, { status: 500 })
  }

  // Normalize legacy plan names the same way checkProStatus does.
  const normalizePlan = (p: string) =>
    p === 'explorer' || p === 'campus' ? 'nextfounder' : p

  // Default shape so the UI always renders even if a query fails.
  const result = {
    totalSubscribers: 0,
    revenue: 0,
    planBreakdown: [
      { plan: 'nextfounder', label: PLAN_LABEL.nextfounder, subscribers: 0, revenue: 0 },
      { plan: 'founder', label: PLAN_LABEL.founder, subscribers: 0, revenue: 0 },
      { plan: 'legend', label: PLAN_LABEL.legend, subscribers: 0, revenue: 0 },
    ],
    recentSubscribers: [] as { plan: string; label: string; price: number; createdAt: string | null }[],
  }

  // Resolve the actual amount paid for a row. Prefers a real stored amount
  // (amount_cents or amount) so discounts are reflected; only falls back to
  // the plan's list price when no amount was recorded.
  const amountFor = (row: any, plan: string): number => {
    if (row?.amount_cents != null && !Number.isNaN(Number(row.amount_cents))) {
      return Number(row.amount_cents) / 100
    }
    if (row?.amount != null && !Number.isNaN(Number(row.amount))) {
      return Number(row.amount)
    }
    return PLAN_PRICE[plan] || 0
  }

  try {
    const { data: subs } = await svc
      .from('user_subscriptions')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    const rows = subs || []
    const counts: Record<string, number> = { nextfounder: 0, founder: 0, legend: 0 }
    const revenueByPlan: Record<string, number> = { nextfounder: 0, founder: 0, legend: 0 }

    for (const row of rows) {
      const plan = normalizePlan(String(row.plan))
      if (counts[plan] === undefined) continue
      counts[plan] += 1
      revenueByPlan[plan] += amountFor(row, plan)
    }

    result.totalSubscribers = rows.length
    result.planBreakdown = (['nextfounder', 'founder', 'legend'] as const).map((plan) => ({
      plan,
      label: PLAN_LABEL[plan],
      subscribers: counts[plan],
      revenue: revenueByPlan[plan],
    }))
    result.revenue = result.planBreakdown.reduce((sum, p) => sum + p.revenue, 0)
    result.recentSubscribers = rows.slice(0, 6).map((row) => {
      const plan = normalizePlan(String(row.plan))
      return {
        plan,
        label: PLAN_LABEL[plan] || plan,
        price: amountFor(row, plan),
        createdAt: row.created_at ?? null,
      }
    })
  } catch (err) {
    console.error('Admin stats error:', err)
    // Fall through with default zeros.
  }

  return NextResponse.json(result)
}
