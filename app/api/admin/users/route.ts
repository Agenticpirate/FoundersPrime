import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { verifyAdminServer as verifyAdmin } from '@/lib/admin/verify-admin-server'
import {
  isMissingDodoIdColumnError,
  resolveDodoSubscriptionId,
} from '@/lib/billing/provider-columns'

// ─── Helper: service-role client (bypasses RLS, can list auth users) ──────────
function getServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createServiceClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
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

    // 1. Pull every auth user via Admin API (paginated).
    // Handle both JS client shapes: data.users and nested variants.
    const authUsers: any[] = []
    let page = 1
    const perPage = 200
    let listError: string | null = null

    while (page <= 50) {
      const { data, error } = await svc.auth.admin.listUsers({ page, perPage })
      if (error) {
        console.error('❌ Admin listUsers error:', error)
        listError = error.message
        break
      }
      const batch: any[] = Array.isArray((data as any)?.users)
        ? (data as any).users
        : Array.isArray(data)
          ? (data as any)
          : []
      authUsers.push(...batch)
      if (batch.length < perPage) break
      page += 1
    }

    // Fallback: GoTrue REST if SDK list is empty but service key is valid
    if (authUsers.length === 0 && !listError) {
      try {
        const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '')
        const key = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (base && key) {
          let p = 1
          while (p <= 50) {
            const res = await fetch(
              `${base}/auth/v1/admin/users?page=${p}&per_page=${perPage}`,
              {
                headers: {
                  apikey: key,
                  Authorization: `Bearer ${key}`,
                },
                cache: 'no-store',
              }
            )
            if (!res.ok) {
              listError = `Auth admin HTTP ${res.status}`
              break
            }
            const body = await res.json()
            const batch: any[] = Array.isArray(body?.users) ? body.users : []
            authUsers.push(...batch)
            if (batch.length < perPage) break
            p += 1
          }
        }
      } catch (e: any) {
        console.error('Auth REST fallback failed:', e)
        listError = e?.message || 'Auth REST fallback failed'
      }
    }

    if (authUsers.length === 0 && listError) {
      return NextResponse.json(
        { error: `Could not list users from Supabase: ${listError}`, users: [] },
        { status: 500 }
      )
    }

    // 2. Active subscriptions → plan + period
    const selectActiveSubs = (columns: string) =>
      svc.from('user_subscriptions').select(columns).eq('status', 'active')

    let { data: subs, error: subsErr } = await selectActiveSubs(
      'user_id, plan, status, created_at, period_end, period_start, dodo_subscription_id, stripe_subscription_id'
    ) as { data: any[] | null; error: { message?: string } | null }

    if (subsErr && isMissingDodoIdColumnError(subsErr)) {
      ;({ data: subs, error: subsErr } = await selectActiveSubs(
        'user_id, plan, status, created_at, period_end, period_start, stripe_subscription_id'
      ) as { data: any[] | null; error: { message?: string } | null })
    }

    if (subsErr) console.error('user_subscriptions error:', subsErr)

    const planByUser = new Map<string, string>()
    const subMetaByUser = new Map<
      string,
      { periodEnd: string | null; periodStart: string | null; subId: string | null; createdAt: string | null }
    >()
    for (const row of subs || []) {
      const uid = String(row.user_id || '')
      if (!uid) continue
      if (!planByUser.has(uid)) {
        planByUser.set(uid, String(row.plan))
        subMetaByUser.set(uid, {
          periodEnd: row.period_end ?? null,
          periodStart: row.period_start ?? null,
          subId: resolveDodoSubscriptionId(row),
          createdAt: row.created_at ?? null,
        })
      }
    }

    // 3. Admin emails (case-insensitive)
    const { data: admins } = await svc.from('admin_users').select('email')
    const adminEmails = new Set(
      (admins || []).map((a: any) => String(a.email || '').toLowerCase().trim())
    )

    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000
    const now = Date.now()

    const users = authUsers
      .map((u) => {
        const email = String(u.email || '')
        const isAdminUser = adminEmails.has(email.toLowerCase().trim())
        const role = isAdminUser ? 'admin' : planByUser.get(String(u.id)) || 'free'
        const lastSignIn = u.last_sign_in_at || u.last_sign_in || null
        const lastActiveMs = lastSignIn ? new Date(lastSignIn).getTime() : 0
        const meta = u.user_metadata || {}
        const savedDeals = Array.isArray(meta.saved_deals)
          ? meta.saved_deals.length
          : Array.isArray(meta.saved_ideas)
            ? meta.saved_ideas.length
            : 0
        const banned = !!meta.banned
        const name =
          meta.name ||
          meta.full_name ||
          meta.fullName ||
          (email ? email.split('@')[0] : '') ||
          'Unknown'

        const uid = String(u.id)
        const subMeta = subMetaByUser.get(uid)
        const paidPlan = isAdminUser ? 'admin' : planByUser.get(uid) || 'free'
        return {
          id: uid,
          name: String(name),
          email,
          role,
          status: banned
            ? 'inactive'
            : lastActiveMs && now - lastActiveMs < THIRTY_DAYS
              ? 'active'
              : 'inactive',
          lastActive: lastSignIn,
          createdAt: u.created_at || null,
          dealsApplied: savedDeals,
          emailConfirmed: !!(u.email_confirmed_at || u.confirmed_at),
          banned,
          plan: paidPlan,
          periodEnd: subMeta?.periodEnd ?? null,
          periodStart: subMeta?.periodStart ?? null,
          subscriptionId: subMeta?.subId ?? null,
          isPaid: ['nextfounder', 'founder', 'legend'].includes(paidPlan),
        }
      })
      .sort((a, b) => {
        // Paid first, then admin, then newest join
        const rank = (r: string) =>
          r === 'legend' ? 0 : r === 'founder' ? 1 : r === 'nextfounder' ? 2 : r === 'admin' ? 3 : 4
        const rd = rank(a.role) - rank(b.role)
        if (rd !== 0) return rd
        const at = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return bt - at
      })

    return NextResponse.json({
      users,
      count: users.length,
      paidCount: users.filter((u) => u.isPaid).length,
      source: 'supabase-auth',
    })
  } catch (error: any) {
    console.error('❌ Admin GET users error:', error)
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error', users: [] },
      { status: 500 }
    )
  }
}

// ─── PATCH: set plan or ban/unban (admin only) ────────────────────────────────
export async function PATCH(request: Request) {
  try {
    const auth = await verifyAdmin()
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })

    const svc = getServiceRoleClient()
    if (!svc) {
      return NextResponse.json({ error: 'Service role not configured' }, { status: 503 })
    }

    const body = await request.json()
    const userId = String(body.userId || '')
    const action = String(body.action || '') as 'set_plan' | 'ban' | 'unban'

    if (!userId || !['set_plan', 'ban', 'unban'].includes(action)) {
      return NextResponse.json(
        { error: 'userId and action (set_plan|ban|unban) required' },
        { status: 400 }
      )
    }

    const { data: userData, error: getErr } = await svc.auth.admin.getUserById(userId)
    if (getErr || !userData?.user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    const user = userData.user
    const meta = { ...(user.user_metadata || {}) }

    if (action === 'ban' || action === 'unban') {
      meta.banned = action === 'ban'
      meta.banned_at = action === 'ban' ? new Date().toISOString() : null
      meta.banned_by = action === 'ban' ? auth.email || 'admin' : null
      const { error } = await svc.auth.admin.updateUserById(userId, {
        user_metadata: meta,
      })
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json({
        success: true,
        action,
        banned: action === 'ban',
      })
    }

    // set_plan
    const plan = String(body.plan || 'free').trim().toLowerCase()
    if (!['free', 'nextfounder', 'founder', 'legend'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Soft-cancel existing active rows for this user
    await svc
      .from('user_subscriptions')
      .update({ status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('status', 'active')

    if (plan !== 'free') {
      const { error: insErr } = await svc.from('user_subscriptions').insert({
        user_id: userId,
        plan,
        status: 'active',
        // Prefer flexible columns; ignore unknown columns via try/fallback below
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      if (insErr) {
        // Retry with minimal columns if schema is strict
        const { error: ins2 } = await svc.from('user_subscriptions').insert({
          user_id: userId,
          plan,
          status: 'active',
        })
        if (ins2) {
          console.error('Admin set_plan insert error:', ins2)
          return NextResponse.json({ error: ins2.message }, { status: 500 })
        }
      }
    }

    meta.admin_plan_override = plan
    meta.admin_plan_at = new Date().toISOString()
    await svc.auth.admin.updateUserById(userId, { user_metadata: meta })

    return NextResponse.json({ success: true, action: 'set_plan', plan })
  } catch (error: any) {
    console.error('❌ Admin PATCH users error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
