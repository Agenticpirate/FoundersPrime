import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'

/**
 * Server-side admin verification (single source of truth).
 *
 * SECURITY:
 * 1) Authenticates with getUser() (revalidates JWT against Supabase Auth — not getSession()).
 * 2) Looks up admin_users with the service role when available so RLS cannot
 *    falsely deny a legitimate admin (common cause of "Partial load" on stats/submissions).
 * 3) Requires is_active = true.
 */

export interface AdminVerifyResult {
  ok: boolean
  email?: string
  role?: string
  error?: string
  status?: number
}

function getServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createServiceClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export async function verifyAdminServer(): Promise<AdminVerifyResult> {
  const supabase = createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { ok: false, error: 'Unauthorized: Login required', status: 401 }
  }

  const email = (user.email || '').trim().toLowerCase()
  if (!email) {
    return { ok: false, error: 'Unauthorized: No email on session', status: 401 }
  }

  // Prefer service role so RLS on admin_users cannot hide the admin row.
  const svc = getServiceRoleClient()
  const db = svc || supabase

  const { data: adminRows, error: adminError } = await db
    .from('admin_users')
    .select('role, is_active, email')
    .eq('is_active', true)

  if (adminError) {
    console.error('Admin verify: admin_users query failed:', adminError.message)
    // Fallback: session client only (may be RLS-limited)
    if (svc) {
      const { data: fallbackRows } = await supabase
        .from('admin_users')
        .select('role, is_active, email')
        .eq('is_active', true)
      const hit = (fallbackRows || []).find(
        (r: { email?: string }) => String(r.email || '').toLowerCase().trim() === email
      )
      if (hit) return { ok: true, email: user.email ?? undefined, role: hit.role }
    }
    return { ok: false, error: 'Forbidden: Could not verify admin role', status: 403 }
  }

  const adminUser = (adminRows || []).find(
    (r: { email?: string }) => String(r.email || '').toLowerCase().trim() === email
  )

  if (!adminUser) {
    console.error(`🚨 Unauthorized admin access attempt by ${user.email}`)
    return { ok: false, error: 'Forbidden: Admin access required', status: 403 }
  }

  return { ok: true, email: user.email ?? undefined, role: adminUser.role }
}
