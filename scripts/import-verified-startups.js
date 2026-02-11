#!/usr/bin/env node

/**
 * Import Verified Startups from TrustMRR and Acquire.com
 * 
 * This script loads startup data from both sources, transforms them into
 * a unified format, and saves them to the database.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const TRUSTMRR_FILE = '/Users/ravitejapulligella/Downloads/SAAS(NoCode)/bigideasdb-saas-sellers-analysis/trustmrr_startups.json';
const ACQUIRE_FILE = '/Users/ravitejapulligella/Downloads/SAAS(NoCode)/bigideasdb-saas-sellers-analysis/acquire_startups.json';
const OUTPUT_FILE = path.join(process.cwd(), 'public/data/verified-startups.json');
const BACKUP_FILE = path.join(process.cwd(), 'public/data/verified-startups.backup.json');

// Helper function to create a slug from a string
function createSlug(text) {
  if (!text) return 'untitled-startup';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper function to generate a unique ID
function generateId() {
  return `startup-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper function to parse revenue string to number
function parseRevenue(revenueStr) {
  if (!revenueStr) return 0;
  const cleaned = revenueStr.replace(/[$,k]/gi, '');
  const num = parseFloat(cleaned);
  if (revenueStr.toLowerCase().includes('k')) {
    return num * 1000;
  }
  if (revenueStr.toLowerCase().includes('m')) {
    return num * 1000000;
  }
  return num;
}

// Helper function to parse asking price
function parseAskingPrice(priceStr) {
  if (!priceStr) return 0;
  // Remove everything except numbers, k, m
  const cleaned = priceStr.replace(/[$,]/g, '');
  const match = cleaned.match(/([\d.]+)([km])?/i);
  if (!match) return 0;
  
  const num = parseFloat(match[1]);
  const multiplier = match[2];
  
  if (multiplier && multiplier.toLowerCase() === 'k') {
    return num * 1000;
  }
  if (multiplier && multiplier.toLowerCase() === 'm') {
    return num * 1000000;
  }
  return num;
}

// Transform TrustMRR startup to our format
function transformTrustMRRStartup(startup) {
  const revenue = parseRevenue(startup.revenue_30d);
  const askingPrice = parseAskingPrice(startup.asking_price);
  
  return {
    id: generateId(),
    slug: createSlug(startup.name),
    name: startup.name || 'Unnamed Startup',
    category: startup.category || 'Other',
    description: startup.description || startup.full_description || 'No description available',
    shortDescription: (startup.description || '').substring(0, 150) + ((startup.description || '').length > 150 ? '...' : ''),
    
    // Financial data
    revenue: revenue,
    revenueDisplay: startup.revenue_30d || '$0',
    revenueGrowth: startup.revenue_growth || '0%',
    mrr: startup.mrr_estimated || 'N/A',
    askingPrice: askingPrice,
    askingPriceDisplay: startup.asking_price || 'Contact',
    multiple: startup.multiple || 'N/A',
    
    // Business details
    website: startup.website_url || '',
    founded: startup.founded_date || 'Unknown',
    country: startup.country || 'Unknown',
    countryCode: startup.country_code || '',
    
    // Metrics
    views: parseInt(startup.views) || 0,
    offers: parseInt(startup.offers) || 0,
    buyersViewed: parseInt(startup.buyers_viewed) || 0,
    
    // Founder info
    founderName: startup.founder_name || 'Anonymous',
    founderHandle: startup.founder_handle || '',
    founderFollowers: parseInt(startup.founder_followers) || 0,
    
    // Status
    forSale: startup.for_sale !== false,
    verified: true,
    featured: revenue > 50000 || askingPrice > 500000,
    
    // Metadata
    source: 'TrustMRR',
    sourceUrl: startup.full_url || '',
    logoUrl: startup.logo_url || '',
    lastUpdated: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString().split('T')[0]
  };
}

// Transform Acquire.com startup to our format
function transformAcquireStartup(startup) {
  const revenue = parseRevenue(startup.ttm_revenue);
  const profit = parseRevenue(startup.ttm_profit);
  const askingPrice = parseAskingPrice(startup.asking_price);
  
  return {
    id: generateId(),
    slug: createSlug(startup.headline || startup.description),
    name: startup.headline || startup.description || 'Unnamed Startup',
    category: startup.type || startup.business_type || 'SaaS',
    description: startup.full_description || startup.description || 'No description available',
    shortDescription: (startup.description || '').substring(0, 150) + ((startup.description || '').length > 150 ? '...' : ''),
    
    // Financial data
    revenue: revenue,
    revenueDisplay: startup.ttm_revenue || '$0',
    profit: profit,
    profitDisplay: startup.ttm_profit || '$0',
    askingPrice: askingPrice,
    askingPriceDisplay: startup.asking_price || 'Contact',
    profitMultiple: startup.profit_multiple || 'N/A',
    revenueMultiple: startup.revenue_multiple || 'N/A',
    
    // Business details
    website: startup.full_url || '',
    founded: startup.date_founded || 'Unknown',
    country: startup.country || 'Unknown',
    teamSize: startup.team_size || 'Unknown',
    businessModel: startup.business_model || 'Unknown',
    
    // Additional details
    techStack: Array.isArray(startup.tech_stack) ? startup.tech_stack.join(', ') : startup.tech_stack || '',
    competitors: Array.isArray(startup.competitors) ? startup.competitors : [],
    growthOpportunities: Array.isArray(startup.growth_opportunities) ? startup.growth_opportunities : [],
    keyAssets: Array.isArray(startup.key_assets) ? startup.key_assets : [],
    financing: startup.financing || 'Unknown',
    
    // Selling info
    reasonForSelling: startup.reason_for_selling || '',
    
    // Status
    forSale: true,
    verified: true,
    featured: revenue > 100000 || profit > 50000 || askingPrice > 500000,
    
    // Metadata
    source: 'Acquire.com',
    sourceUrl: startup.full_url || '',
    logoUrl: '',
    lastUpdated: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString().split('T')[0]
  };
}

// Main import function
async function importStartups() {
  console.log('🚀 Starting verified startups import...\n');
  
  let allStartups = [];
  let stats = {
    trustmrrImported: 0,
    acquireImported: 0,
    totalImported: 0,
    errors: 0,
    skipped: 0
  };
  
  try {
    // Backup existing data if it exists
    if (fs.existsSync(OUTPUT_FILE)) {
      console.log('📦 Creating backup of existing startups...');
      fs.copyFileSync(OUTPUT_FILE, BACKUP_FILE);
      console.log(`✅ Backup created: ${BACKUP_FILE}\n`);
    }
    
    // Import from TrustMRR
    console.log('📄 Processing TrustMRR startups...');
    try {
      const trustmrrData = JSON.parse(fs.readFileSync(TRUSTMRR_FILE, 'utf8'));
      console.log(`   Found ${trustmrrData.startups.length} TrustMRR startups`);
      
      for (const startup of trustmrrData.startups) {
        try {
          // Skip startups with no revenue or unrealistic data
          const revenue = parseRevenue(startup.revenue_30d);
          const askingPrice = parseAskingPrice(startup.asking_price);
          
          if (revenue === 0 && askingPrice > 1000000) {
            stats.skipped++;
            continue; // Skip unrealistic listings
          }
          
          const transformed = transformTrustMRRStartup(startup);
          allStartups.push(transformed);
          stats.trustmrrImported++;
        } catch (err) {
          console.log(`   ⚠️  Error transforming TrustMRR startup: ${err.message}`);
          stats.errors++;
        }
      }
      console.log(`   ✅ Imported ${stats.trustmrrImported} TrustMRR startups\n`);
    } catch (err) {
      console.log(`   ❌ Error reading TrustMRR file: ${err.message}\n`);
    }
    
    // Import from Acquire.com
    console.log('📄 Processing Acquire.com startups...');
    try {
      const acquireData = JSON.parse(fs.readFileSync(ACQUIRE_FILE, 'utf8'));
      console.log(`   Found ${acquireData.startups.length} Acquire.com startups`);
      
      for (const startup of acquireData.startups) {
        try {
          // Skip startups with no revenue data
          const revenue = parseRevenue(startup.ttm_revenue);
          
          if (revenue < 1000) {
            stats.skipped++;
            continue; // Skip very low revenue listings
          }
          
          const transformed = transformAcquireStartup(startup);
          allStartups.push(transformed);
          stats.acquireImported++;
        } catch (err) {
          console.log(`   ⚠️  Error transforming Acquire startup: ${err.message}`);
          stats.errors++;
        }
      }
      console.log(`   ✅ Imported ${stats.acquireImported} Acquire.com startups\n`);
    } catch (err) {
      console.log(`   ❌ Error reading Acquire.com file: ${err.message}\n`);
    }
    
    // Sort by revenue (highest first)
    allStartups.sort((a, b) => b.revenue - a.revenue);
    
    stats.totalImported = allStartups.length;
    
    // Save all startups
    console.log('💾 Saving startups to database...');
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allStartups, null, 2));
    console.log(`✅ Saved ${allStartups.length} total startups to ${OUTPUT_FILE}\n`);
    
    // Print summary
    console.log('📊 Import Summary:');
    console.log('═══════════════════════════════════════');
    console.log(`TrustMRR Imported:  ${stats.trustmrrImported}`);
    console.log(`Acquire Imported:   ${stats.acquireImported}`);
    console.log(`Total Imported:     ${stats.totalImported}`);
    console.log(`Skipped:            ${stats.skipped}`);
    console.log(`Errors:             ${stats.errors}`);
    console.log('═══════════════════════════════════════\n');
    
    // Category breakdown
    const categoryBreakdown = {};
    allStartups.forEach(startup => {
      const cat = startup.category;
      categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + 1;
    });
    
    console.log('📈 Startups by Category (Top 15):');
    console.log('═══════════════════════════════════════');
    Object.entries(categoryBreakdown)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .forEach(([cat, count]) => {
        console.log(`${cat.padEnd(25)} ${count}`);
      });
    console.log('═══════════════════════════════════════\n');
    
    // Revenue breakdown
    const revenueRanges = {
      'Under $10K': 0,
      '$10K - $50K': 0,
      '$50K - $100K': 0,
      '$100K - $500K': 0,
      '$500K - $1M': 0,
      'Over $1M': 0
    };
    
    allStartups.forEach(startup => {
      const rev = startup.revenue;
      if (rev < 10000) revenueRanges['Under $10K']++;
      else if (rev < 50000) revenueRanges['$10K - $50K']++;
      else if (rev < 100000) revenueRanges['$50K - $100K']++;
      else if (rev < 500000) revenueRanges['$100K - $500K']++;
      else if (rev < 1000000) revenueRanges['$500K - $1M']++;
      else revenueRanges['Over $1M']++;
    });
    
    console.log('💰 Revenue Distribution:');
    console.log('═══════════════════════════════════════');
    Object.entries(revenueRanges).forEach(([range, count]) => {
      console.log(`${range.padEnd(25)} ${count}`);
    });
    console.log('═══════════════════════════════════════\n');
    
    console.log('✨ Import completed successfully!');
    
  } catch (err) {
    console.error('❌ Fatal error during import:', err);
    process.exit(1);
  }
}

// Run the import
importStartups();
