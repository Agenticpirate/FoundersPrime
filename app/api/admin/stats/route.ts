import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { verifyAdminServer as verifyAdmin } from '@/lib/admin/verify-admin-server'

// Plan pricing used to compute realized revenue (USD, excl. tax).
// List-price fallbacks when amount_cents was not stored (matches public pricing).
const PLAN_PRICE: Record<string, number> = {
  nextfounder: 1,
  founder: 48,
  legend: 99,
}

const PLAN_LABEL: Record<string, string> = {
  nextfounder: "Next'Founder",
  founder: 'Founder',
  legend: 'Legend (Lifetime)',
}

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

  const normalizePlan = (p: string) =>
    p === 'explorer' || p === 'campus' ? 'nextfounder' : p

  const result = {
    totalSubscribers: 0,
    revenue: 0,
    totalUsers: 0,
    activeUsers30d: 0,
    pendingSubmissions: 0,
    planBreakdown: [
      { plan: 'nextfounder', label: PLAN_LABEL.nextfounder, subscribers: 0, revenue: 0 },
      { plan: 'founder', label: PLAN_LABEL.founder, subscribers: 0, revenue: 0 },
      { plan: 'legend', label: PLAN_LABEL.legend, subscribers: 0, revenue: 0 },
    ],
    recentSubscribers: [] as {
      plan: string
      label: string
      price: number
      createdAt: string | null
      email?: string | null
      userId?: string | null
      periodEnd?: string | null
    }[],
  }

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
    // Active subscriptions
    const { data: subs, error: subsError } = await svc
      .from('user_subscriptions')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (subsError) {
      console.error('Admin stats subscriptions error:', subsError.message)
    }

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

    // Resolve emails for recent paid rows
    const recent = rows.slice(0, 8)
    const emailById = new Map<string, string>()
    for (const row of recent) {
      const uid = String(row.user_id || '')
      if (!uid || emailById.has(uid)) continue
      try {
        const { data: u } = await svc.auth.admin.getUserById(uid)
        if (u?.user?.email) emailById.set(uid, u.user.email)
      } catch {
        // ignore per-user lookup failures
      }
    }

    result.recentSubscribers = recent.map((row) => {
      const plan = normalizePlan(String(row.plan))
      const uid = String(row.user_id || '')
      return {
        plan,
        label: PLAN_LABEL[plan] || plan,
        price: amountFor(row, plan),
        createdAt: row.created_at ?? null,
        email: emailById.get(uid) || null,
        userId: uid || null,
        periodEnd: row.period_end ?? null,
      }
    })

    // Auth user totals (first page count + pagination estimate)
    let totalUsers = 0
    let activeUsers30d = 0
    const now = Date.now()
    const thirty = 30 * 86400000
    let page = 1
    while (page <= 50) {
      const { data, error } = await svc.auth.admin.listUsers({ page, perPage: 200 })
      if (error) break
      const batch = data?.users || []
      totalUsers += batch.length
      for (const u of batch) {
        const last = u.last_sign_in_at ? new Date(u.last_sign_in_at).getTime() : 0
        if (last && now - last < thirty) activeUsers30d += 1
      }
      if (batch.length < 200) break
      page += 1
    }
    result.totalUsers = totalUsers
    result.activeUsers30d = activeUsers30d

    // Pending submissions count
    const { count: pendingCount } = await svc
      .from('deal_submissions')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'pending')
    result.pendingSubmissions = pendingCount || 0
  } catch (err) {
    console.error('Admin stats error:', err)
  }

  return NextResponse.json(result)
}
