#!/usr/bin/env node

/**
 * Fix Intercom Logo in Supabase
 */

require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

async function fixIntercomLogo() {
  console.log('🔧 Fixing Intercom logo...\n');

  try {
    // Update the logo URL for Intercom deal
    const response = await fetch(`${SUPABASE_URL}/rest/v1/deals?slug=eq.intercom-early-stage`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        logo_url: 'https://images.prismic.io/intercom-hp/5b7c0c0a-0c7a-4d4c-9d4e-b5b3c0c1d9af_intercom-logo.svg'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Failed to update:', error);
      process.exit(1);
    }

    const result = await response.json();
    
    if (result && result.length > 0) {
      console.log('✅ Successfully updated Intercom logo!');
      console.log(`   Deal: ${result[0].title}`);
      console.log(`   New logo: ${result[0].logo_url}\n`);
      console.log('🔄 Refresh your browser to see the change');
    } else {
      console.log('⚠️  No deal found with slug "intercom-early-stage"');
      console.log('   The deal might not exist in Supabase yet');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixIntercomLogo();
