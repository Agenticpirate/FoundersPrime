#!/usr/bin/env node

/**
 * Database Setup Helper
 * Provides instructions and link to set up Supabase database
 */

require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('\n🗄️  FoundersPrime Database Setup\n');
console.log('═══════════════════════════════════════════════════════\n');

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase credentials in .env.local\n');
  console.error('Please ensure these are set:');
  console.error('  - NEXT_PUBLIC_SUPABASE_URL');
  console.error('  - SUPABASE_SERVICE_ROLE_KEY\n');
  process.exit(1);
}

// Extract project ID from URL
const projectId = SUPABASE_URL.replace('https://', '').split('.')[0];
const sqlEditorUrl = `https://app.supabase.com/project/${projectId}/sql/new`;

console.log('✅ Supabase credentials found!\n');
console.log('📋 Follow these steps to set up your database:\n');
console.log('1️⃣  Open the Supabase SQL Editor:');
console.log(`   ${sqlEditorUrl}\n`);
console.log('2️⃣  Copy the SQL schema from:');
console.log('   docs/supabase-schema.sql\n');
console.log('3️⃣  Paste it into the SQL Editor and click "Run"\n');
console.log('4️⃣  Restart your dev server:\n');
console.log('   npm run dev\n');
console.log('═══════════════════════════════════════════════════════\n');
console.log('💡 This will create:');
console.log('   • deals table with all fields');
console.log('   • categories table with default categories');
console.log('   • indexes for performance');
console.log('   • RLS policies for security');
console.log('   • helper functions and views\n');
console.log('🔗 Quick link: ' + sqlEditorUrl + '\n');
