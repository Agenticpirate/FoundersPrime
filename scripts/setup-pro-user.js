#!/usr/bin/env node

/**
 * Setup Pro User Script
 * 
 * Grants Pro access to specified users
 * 
 * Usage: node scripts/setup-pro-user.js
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Pro users list
const PRO_USERS = [
  {
    email: 'raviteja.journal@gmail.com',
    name: 'Ravi Teja',
    plan: 'pro-plus'
  }
]

async function setupProUsers() {
  console.log('\n🌟 Setting up Pro Users\n')
  console.log('=' .repeat(50))

  try {
    // Check if user_profiles table exists, if not create it
    console.log('\n📋 Checking user_profiles table...')
    
    const { error: tableError } = await supabase
      .from('user_profiles')
      .select('id')
      .limit(1)

    if (tableError && tableError.code === '42P01') {
      console.log('⚠️  user_profiles table does not exist, creating...')
      
      // Create the table
      const { error: createError } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS user_profiles (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
            email VARCHAR(255) UNIQUE NOT NULL,
            name VARCHAR(255),
            plan VARCHAR(50) DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'pro-plus')),
            status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
          );
          
          CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
          CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
          
          ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
          
          CREATE POLICY "Users can view their own profile" ON user_profiles
            FOR SELECT
            USING (auth.email() = email);
          
          CREATE POLICY "Service role has full access" ON user_profiles
            FOR ALL
            USING (auth.role() = 'service_role');
        `
      })

      if (createError) {
        console.log('⚠️  Could not create table via RPC, table might already exist')
      } else {
        console.log('✅ user_profiles table created')
      }
    }

    // Add Pro users
    for (const proUser of PRO_USERS) {
      console.log(`\n👤 Processing: ${proUser.email}`)
      
      // Check if user exists
      const { data: existing } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('email', proUser.email)
        .single()

      if (existing) {
        console.log('  ✓ User already exists, updating...')
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({
            name: proUser.name,
            plan: proUser.plan,
            status: 'active',
            updated_at: new Date().toISOString()
          })
          .eq('email', proUser.email)

        if (updateError) {
          console.log(`  ❌ Error updating: ${updateError.message}`)
        } else {
          console.log(`  ✅ Updated to ${proUser.plan.toUpperCase()} plan`)
        }
      } else {
        console.log('  ✓ Creating new Pro user...')
        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert({
            email: proUser.email,
            name: proUser.name,
            plan: proUser.plan,
            status: 'active'
          })

        if (insertError) {
          console.log(`  ❌ Error creating: ${insertError.message}`)
        } else {
          console.log(`  ✅ Created with ${proUser.plan.toUpperCase()} plan`)
        }
      }
    }

    console.log('\n' + '='.repeat(50))
    console.log('\n🎉 Pro user setup complete!\n')
    console.log('Pro Users:')
    PRO_USERS.forEach(user => {
      console.log(`  • ${user.email} (${user.plan.toUpperCase()})`)
    })
    console.log('\nThese users now have full access to:')
    console.log('  ✓ All deal details (no "Unlock Pro" restrictions)')
    console.log('  ✓ Pro tips and insights')
    console.log('  ✓ Premium resources')
    console.log('  ✓ Advanced features')
    console.log('\nNote: Users are identified by email in the code.')
    console.log('See: lib/auth/user-context.ts\n')

  } catch (error) {
    console.error('\n❌ Error setting up Pro users:', error.message)
    process.exit(1)
  }
}

// Run the setup
setupProUsers()
