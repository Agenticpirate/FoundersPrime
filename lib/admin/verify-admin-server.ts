import { createClient } from '@/lib/supabase/server'

/**
 * Server-side admin verification (single source of truth).
 *
 * SECURITY: authenticates with getUser() (revalidates the token against Supabase
 * Auth — not getSession(), which only decodes the cookie) and requires the
 * admin_users row to be is_active = true. A soft-removed admin (is_active=false)
 * must NOT pass this check.
 */
export interface AdminVerifyResult {
  ok: boolean
  email?: string
  role?: string
  error?: string
  status?: number
}

export async function verifyAdminServer(): Promise<AdminVerifyResult> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Unauthorized: Login required', status: 401 }

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('role, is_active')
    .eq('email', user.email)
    .eq('is_active', true)
    .maybeSingle()

  if (!adminUser) {
    console.error(`🚨 Unauthorized admin access attempt by ${user.email}`)
    return { ok: false, error: 'Forbidden: Admin access required', status: 403 }
  }

  return { ok: true, email: user.email ?? undefined, role: adminUser.role }
}
