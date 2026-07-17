// Admin Authentication Utilities
import { createClient } from '@/lib/supabase/client'

export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'super_admin' | 'admin' | 'editor'
  permissions: {
    deals: boolean
    users: boolean
    analytics: boolean
    settings: boolean
  }
  isActive: boolean
  lastLogin?: string
}

// Check if current user is an admin
export async function checkAdminStatus(): Promise<{
  isAuthenticated: boolean
  isAdmin: boolean
  adminUser: AdminUser | null
  error?: string
}> {
  try {
    const supabase = createClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return {
        isAuthenticated: false,
        isAdmin: false,
        adminUser: null,
        error: 'Not authenticated'
      }
    }

    // Check admin_users (case-insensitive email)
    const { data: adminRows, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('is_active', true)

    const adminData = (adminRows || []).find(
      (r: { email?: string }) =>
        String(r.email || '').toLowerCase().trim() ===
        String(user.email || '').toLowerCase().trim()
    )

    if (adminError || !adminData) {
      return {
        isAuthenticated: true,
        isAdmin: false,
        adminUser: null,
        error: 'Not an admin'
      }
    }

    // Update last login
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', adminData.id)

    return {
      isAuthenticated: true,
      isAdmin: true,
      adminUser: {
        id: adminData.id,
        email: adminData.email,
        name: adminData.name,
        role: adminData.role,
        permissions: adminData.permissions,
        isActive: adminData.is_active,
        lastLogin: adminData.last_login
      }
    }
  } catch (error) {
    console.error('Admin auth check error:', error)
    return {
      isAuthenticated: false,
      isAdmin: false,
      adminUser: null,
      error: 'Authentication check failed'
    }
  }
}

// Get all admin users (for super_admin only)
export async function getAdminUsers(): Promise<AdminUser[]> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map(admin => ({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      permissions: admin.permissions,
      isActive: admin.is_active,
      lastLogin: admin.last_login
    }))
  } catch (error) {
    console.error('Error fetching admin users:', error)
    return []
  }
}

// Add new admin user
export async function addAdminUser(
  email: string,
  name: string,
  role: 'admin' | 'editor' = 'admin'
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()
    
    const permissions = role === 'admin' 
      ? { deals: true, users: false, analytics: true, settings: false }
      : { deals: true, users: false, analytics: false, settings: false }

    const { error } = await supabase
      .from('admin_users')
      .insert({
        email,
        name,
        role,
        permissions,
        is_active: true
      })

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Remove admin user
export async function removeAdminUser(adminId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('admin_users')
      .update({ is_active: false })
      .eq('id', adminId)

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
