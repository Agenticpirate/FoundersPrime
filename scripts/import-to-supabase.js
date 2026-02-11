#!/usr/bin/env node

/**
 * Import Deals from JSON to Supabase
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

async function importDeals() {
  console.log('📦 Importing deals to Supabase...\n');

  try {
    // Read deals from JSON
    const dealsPath = path.join(process.cwd(), 'public/data/all-deals.json');
    const deals = JSON.parse(fs.readFileSync(dealsPath, 'utf8'));
    
    console.log(`📊 Found ${deals.length} deals to import\n`);

    let imported = 0;
    let updated = 0;
    let errors = 0;

    // Import deals in batches
    const batchSize = 10;
    for (let i = 0; i < deals.length; i += batchSize) {
      const batch = deals.slice(i, i + batchSize);
      
      for (const deal of batch) {
        try {
          // Transform deal to match Supabase schema
          const supabaseDeal = {
            slug: deal.slug || deal.id,
            title: deal.title,
            provider: deal.provider,
            category: deal.category || 'other',
            subcategory: deal.subcategory,
            description: deal.description,
            short_description: deal.shortDescription,
            value: deal.value,
            original_price: deal.originalPrice,
            savings: deal.savings,
            eligibility: deal.eligibility || [],
            requirements: deal.requirements || [],
            application_process: deal.applicationProcess || [],
            pro_tips: deal.proTips || [],
            tags: deal.tags || [],
            status: deal.status || 'active',
            application_url: deal.applicationUrl,
            provider_website: deal.providerWebsite,
            logo_url: deal.logoUrl,
            featured: deal.featured || false,
            verified: deal.verified || false,
            difficulty: deal.difficulty || 'medium',
            time_to_apply: deal.timeToApply,
            success_rate: deal.successRate,
            expiry_date: deal.expiryDate,
            view_count: deal.viewCount || 0,
            apply_count: deal.appliedCount || 0,
            data_source: deal.dataSource || 'json-import',
            source_verified: deal.sourceVerified !== false
          };

          // Try to insert (upsert)
          const response = await fetch(`${SUPABASE_URL}/rest/v1/deals`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': SERVICE_ROLE_KEY,
              'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
              'Prefer': 'resolution=merge-duplicates'
            },
            body: JSON.stringify(supabaseDeal)
          });

          if (response.ok || response.status === 201) {
            imported++;
            process.stdout.write('.');
          } else if (response.status === 409) {
            // Conflict - update instead
            const updateResponse = await fetch(
              `${SUPABASE_URL}/rest/v1/deals?slug=eq.${supabaseDeal.slug}`,
              {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'apikey': SERVICE_ROLE_KEY,
                  'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
                },
                body: JSON.stringify(supabaseDeal)
              }
            );
            
            if (updateResponse.ok) {
              updated++;
              process.stdout.write('u');
            } else {
              errors++;
              process.stdout.write('x');
            }
          } else {
            errors++;
            process.stdout.write('x');
          }
        } catch (error) {
          errors++;
          process.stdout.write('x');
        }
      }

      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log('\n');
    console.log('\n✅ Import completed!');
    console.log(`   Imported: ${imported} deals`);
    console.log(`   Updated: ${updated} deals`);
    if (errors > 0) {
      console.log(`   Errors: ${errors} deals`);
    }
    console.log('\n🔄 Refresh your browser to see the deals\n');

  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
    process.exit(1);
  }
}

importDeals();
