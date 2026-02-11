#!/usr/bin/env node

/**
 * Grant Admin Access Script
 * 
 * This script grants admin privileges to a user in the Supabase database.
 * 
 * Usage:
 *   node scripts/grant-admin-access.js <email> [role]
 * 
 * Examples:
 *   node scripts/grant-admin-access.js raviteja.journal@gmail.com super_admin
 *   node scripts/grant-admin-access.js newadmin@example.com admin
 * 
 * Roles:
 *   - super_admin: Full access to everything
 *   - admin: Deals, Analytics (no user management)
 *   - editor: Deals only
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing Supabase credentials in .env.local')
  console.error('   Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function grantAdminAccess(email, role = 'super_admin') {
  console.log('\n🔐 FoundersPrime Admin Access Grant\n')
  console.log(`Email: ${email}`)
  console.log(`Role: ${role}\n`)

  // Validate role
  const validRoles = ['super_admin', 'admin', 'editor']
  if (!validRoles.includes(role)) {
    console.error(`❌ Invalid role: ${role}`)
    console.error(`   Valid roles: ${validRoles.join(', ')}`)
    process.exit(1)
  }

  // Set permissions based on role
  const permissions = {
    super_admin: { deals: true, users: true, analytics: true, settings: true },
    admin: { deals: true, users: false, analytics: true, settings: false },
    editor: { deals: true, users: false, analytics: false, settings: false }
  }

  try {
    // Check if admin_users table exists
    console.log('📋 Checking admin_users table...')
    const { data: tableCheck, error: tableError } = await supabase
      .from('admin_users')
      .select('id')
      .limit(1)

    if (tableError && tableError.code === '42P01') {
      console.log('⚠️  admin_users table does not exist')
      console.log('   Please run the SQL setup first:')
      console.log('   1. Go to https://app.supabase.com/project/gxwmhcaevcsexhzdcyrj/sql')
      console.log('   2. Copy contents from docs/admin-setup.sql')
      console.log('   3. Paste and run in SQL Editor\n')
      process.exit(1)
    }

    // Check if user already exists
    console.log('🔍 Checking existing admin status...')
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single()

    if (existingAdmin) {
      console.log('✓ User already exists in admin_users table')
      console.log(`  Current role: ${existingAdmin.role}`)
      console.log(`  Active: ${existingAdmin.is_active}`)
      
      // Update existing admin
      console.log('\n📝 Updating admin privileges...')
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({
          role,
          permissions: permissions[role],
          is_active: true,
          updated_at: new Date().toISOString()
        })
        .eq('email', email)

      if (updateError) throw updateError

      console.log('✅ Admin privileges updated successfully!')
    } else {
      // Insert new admin
      console.log('📝 Creating new admin user...')
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert({
          email,
          name: email.split('@')[0],
          role,
          permissions: permissions[role],
          is_active: true
        })

      if (insertError) throw insertError

      console.log('✅ Admin user created successfully!')
    }

    console.log('\n🎉 Success! Admin access granted.\n')
    console.log('Next steps:')
    console.log('1. Make sure the user logs in at: http://localhost:3000/login')
    console.log('2. After login, they can access: http://localhost:3000/admin')
    console.log('\nAdmin Dashboard URLs:')
    console.log('  • Dashboard: http://localhost:3000/admin')
    console.log('  • Deals: http://localhost:3000/admin/deals')
    console.log('  • Users: http://localhost:3000/admin/users')
    console.log('  • Analytics: http://localhost:3000/admin/analytics\n')

  } catch (error) {
    console.error('\n❌ Error granting admin access:', error.message)
    process.exit(1)
  }
}

// Parse command line arguments
const args = process.argv.slice(2)
const email = args[0]
const role = args[1] || 'super_admin'

if (!email) {
  console.error('❌ Error: Email address required')
  console.error('\nUsage:')
  console.error('  node scripts/grant-admin-access.js <email> [role]')
  console.error('\nExamples:')
  console.error('  node scripts/grant-admin-access.js raviteja.journal@gmail.com super_admin')
  console.error('  node scripts/grant-admin-access.js newadmin@example.com admin')
  console.error('\nRoles:')
  console.error('  • super_admin - Full access to everything')
  console.error('  • admin - Deals, Analytics (no user management)')
  console.error('  • editor - Deals only\n')
  process.exit(1)
}

// Run the script
grantAdminAccess(email, role)
