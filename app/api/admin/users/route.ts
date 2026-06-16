import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// ─── Helper: verify admin access ──────────────────────────────────────────────
async function verifyAdmin(): Promise<{ ok: boolean; error?: string; status?: number }> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Unauthorized: Login required', status: 401 }

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('role')
    .eq('email', user.email)
    .single()

  if (!adminUser) {
    console.error(`🚨 Unauthorized admin users access attempt by ${user.email}`)
    return { ok: false, error: 'Forbidden: Admin access required', status: 403 }
  }
  return { ok: true }
}

// ─── Helper: service-role client (bypasses RLS, can list auth users) ──────────
function getServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createServiceClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

// Map a stored subscription plan to the canonical plan name used in the UI.
function normalizePlan(p: string): 'nextfounder' | 'founder' | 'legend' | string {
  if (p === 'explorer' || p === 'campus') return 'nextfounder'
  return p
}

// ─── GET: list real, registered users (admin only) ────────────────────────────
export async function GET() {
  try {
    const auth = await verifyAdmin()
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })

    const svc = getServiceRoleClient()
    if (!svc) {
      return NextResponse.json(
        { error: 'Service role not configured. Set SUPABASE_SERVICE_ROLE_KEY.' },
        { status: 503 }
      )
    }

    // 1. Pull every auth user (paginated through the admin API).
    const authUsers: any[] = []
    let page = 1
    const perPage = 1000
    while (true) {
      const { data, error } = await svc.auth.admin.listUsers({ page, perPage })
      if (error) {
        console.error('❌ Admin listUsers error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      const batch = data?.users || []
      authUsers.push(...batch)
      if (batch.length < perPage) break
      page += 1
    }

    // 2. Active subscriptions, to determine each user's plan.
    const { data: subs } = await svc
      .from('user_subscriptions')
      .select('user_id, plan, status, created_at')
      .eq('status', 'active')

    const planByUser = new Map<string, string>()
    for (const row of subs || []) {
      // Keep the most relevant plan if a user somehow has multiple rows.
      if (!planByUser.has(row.user_id)) {
        planByUser.set(row.user_id, normalizePlan(String(row.plan)))
      }
    }

    // 3. Admin users get the "admin" role badge.
    const { data: admins } = await svc.from('admin_users').select('email')
    const adminEmails = new Set((admins || []).map((a: any) => (a.email || '').toLowerCase()))

    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000
    const now = Date.now()

    const users = authUsers
      .map((u) => {
        const email = u.email || ''
        const isAdmin = adminEmails.has(email.toLowerCase())
        const role = isAdmin ? 'admin' : (planByUser.get(u.id) || 'free')
        const lastSignIn = u.last_sign_in_at || u.last_sign_in || null
        const lastActiveMs = lastSignIn ? new Date(lastSignIn).getTime() : 0
        const savedDeals = Array.isArray(u.user_metadata?.saved_deals)
          ? u.user_metadata.saved_deals.length
          : 0

        return {
          id: u.id,
          name: u.user_metadata?.name || u.user_metadata?.full_name || email.split('@')[0] || 'Unknown',
          email,
          role,
          status: lastActiveMs && now - lastActiveMs < THIRTY_DAYS ? 'active' : 'inactive',
          lastActive: lastSignIn,
          createdAt: u.created_at || null,
          dealsApplied: savedDeals,
          emailConfirmed: !!(u.email_confirmed_at || u.confirmed_at),
        }
      })
      .sort((a, b) => {
        const at = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return bt - at
      })

    return NextResponse.json({ users })
  } catch (error: any) {
    console.error('❌ Admin GET users error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
