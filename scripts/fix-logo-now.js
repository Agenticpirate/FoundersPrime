#!/usr/bin/env node

/**
 * Quick Logo Fix - Updates logo and forces cache clear
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const slug = process.argv[2];
const newLogoUrl = process.argv[3];

if (!slug || !newLogoUrl) {
  console.log('\n❌ Usage: node scripts/fix-logo-now.js <slug> <logo-url>\n');
  console.log('Example:');
  console.log('  node scripts/fix-logo-now.js intercom-early-stage https://example.com/logo.svg\n');
  process.exit(1);
}

const DEALS_FILE = path.join(process.cwd(), 'public/data/all-deals.json');

console.log('\n🔧 Quick Logo Fix\n');
console.log('═'.repeat(60));

// Load deals
const deals = JSON.parse(fs.readFileSync(DEALS_FILE, 'utf8'));
const dealIndex = deals.findIndex(d => d.slug === slug);

if (dealIndex === -1) {
  console.error(`\n❌ Deal not found: ${slug}\n`);
  process.exit(1);
}

const deal = deals[dealIndex];
console.log(`\n📋 Updating: ${deal.title}`);
console.log(`   Old Logo: ${deal.logoUrl || 'None'}`);
console.log(`   New Logo: ${newLogoUrl}`);

// Update logo
deals[dealIndex].logoUrl = newLogoUrl;
deals[dealIndex].updatedAt = new Date().toISOString();

// Add cache buster
deals[dealIndex]._cacheBust = Date.now();

// Save
fs.writeFileSync(DEALS_FILE, JSON.stringify(deals, null, 2));
console.log('\n✅ Logo updated in JSON file');

// Clear Next.js cache
console.log('\n🗑️  Clearing Next.js cache...');
try {
  execSync('rm -rf .next', { stdio: 'inherit' });
  console.log('✅ Cache cleared');
} catch (error) {
  console.log('⚠️  Could not clear cache automatically');
}

console.log('\n✅ DONE! Next steps:');
console.log('   1. Restart your dev server');
console.log('   2. Open: http://localhost:3000/deals/' + slug);
console.log('   3. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+F5 (Windows)');
console.log('');
