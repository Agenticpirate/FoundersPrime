#!/usr/bin/env node

/**
 * Logo Manager - Audit and Update Deal Logos
 * 
 * Usage:
 *   node scripts/logo-manager.js audit              - Show all deals with logo issues
 *   node scripts/logo-manager.js update <slug> <url> - Update a specific deal's logo
 *   node scripts/logo-manager.js test <slug>         - Test if a deal's logo loads
 *   node scripts/logo-manager.js list                - List all deals with their logos
 */

const fs = require('fs');
const path = require('path');

const DEALS_FILE = path.join(process.cwd(), 'public/data/all-deals.json');

// Load deals
function loadDeals() {
  try {
    const data = fs.readFileSync(DEALS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Error loading deals:', error.message);
    process.exit(1);
  }
}

// Save deals
function saveDeals(deals) {
  try {
    fs.writeFileSync(DEALS_FILE, JSON.stringify(deals, null, 2));
    console.log('✅ Deals saved successfully');
    return true;
  } catch (error) {
    console.error('❌ Error saving deals:', error.message);
    return false;
  }
}

// Check if URL is a valid image URL
function isValidImageUrl(url) {
  if (!url) return false;
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'];
  const lowerUrl = url.toLowerCase();
  return imageExtensions.some(ext => lowerUrl.includes(ext)) || 
         lowerUrl.includes('logo') || 
         lowerUrl.includes('avatar') ||
         lowerUrl.includes('image');
}

// Audit logos
function auditLogos() {
  const deals = loadDeals();
  console.log('\n🔍 LOGO AUDIT REPORT\n');
  console.log('═'.repeat(80));
  
  const issues = {
    missing: [],
    invalid: [],
    fallback: [],
    good: []
  };

  deals.forEach(deal => {
    if (!deal.logoUrl) {
      issues.missing.push(deal);
    } else if (deal.logoUrl.includes('ui-avatars.com')) {
      issues.fallback.push(deal);
    } else if (!isValidImageUrl(deal.logoUrl)) {
      issues.invalid.push(deal);
    } else {
      issues.good.push(deal);
    }
  });

  console.log(`\n📊 Summary:`);
  console.log(`   Total Deals: ${deals.length}`);
  console.log(`   ✅ Good Logos: ${issues.good.length}`);
  console.log(`   ⚠️  Fallback Logos: ${issues.fallback.length}`);
  console.log(`   ❌ Missing Logos: ${issues.missing.length}`);
  console.log(`   🔴 Invalid URLs: ${issues.invalid.length}`);

  if (issues.fallback.length > 0) {
    console.log('\n⚠️  DEALS WITH FALLBACK LOGOS (ui-avatars.com):');
    console.log('─'.repeat(80));
    issues.fallback.slice(0, 20).forEach(deal => {
      console.log(`   • ${deal.slug}`);
      console.log(`     Title: ${deal.title}`);
      console.log(`     Provider: ${deal.provider}`);
      console.log(`     Current: ${deal.logoUrl}`);
      console.log('');
    });
    if (issues.fallback.length > 20) {
      console.log(`   ... and ${issues.fallback.length - 20} more`);
    }
  }

  if (issues.missing.length > 0) {
    console.log('\n❌ DEALS WITH MISSING LOGOS:');
    console.log('─'.repeat(80));
    issues.missing.slice(0, 10).forEach(deal => {
      console.log(`   • ${deal.slug} - ${deal.title}`);
    });
    if (issues.missing.length > 10) {
      console.log(`   ... and ${issues.missing.length - 10} more`);
    }
  }

  console.log('\n💡 To fix a logo, run:');
  console.log('   node scripts/logo-manager.js update <slug> <logo-url>');
  console.log('\n');
}

// Update a specific deal's logo
function updateLogo(slug, newLogoUrl) {
  console.log(`\n🔧 Updating logo for: ${slug}\n`);
  
  const deals = loadDeals();
  const dealIndex = deals.findIndex(d => d.slug === slug);
  
  if (dealIndex === -1) {
    console.error(`❌ Deal not found: ${slug}`);
    console.log('\n💡 Available deals with similar names:');
    const similar = deals.filter(d => d.slug.includes(slug.substring(0, 5))).slice(0, 5);
    similar.forEach(d => console.log(`   • ${d.slug}`));
    return false;
  }

  const deal = deals[dealIndex];
  const oldLogo = deal.logoUrl;
  
  console.log(`📋 Deal Details:`);
  console.log(`   Title: ${deal.title}`);
  console.log(`   Provider: ${deal.provider}`);
  console.log(`   Old Logo: ${oldLogo || 'None'}`);
  console.log(`   New Logo: ${newLogoUrl}`);
  console.log('');

  // Update the logo
  deals[dealIndex].logoUrl = newLogoUrl;
  deals[dealIndex].updatedAt = new Date().toISOString();

  if (saveDeals(deals)) {
    console.log('✅ Logo updated successfully!');
    console.log('\n🔄 Next steps:');
    console.log('   1. Clear Next.js cache: rm -rf .next');
    console.log('   2. Restart dev server');
    console.log('   3. Hard refresh browser (Cmd+Shift+R)');
    console.log('');
    return true;
  }
  
  return false;
}

// Test a deal's logo
function testLogo(slug) {
  const deals = loadDeals();
  const deal = deals.find(d => d.slug === slug);
  
  if (!deal) {
    console.error(`❌ Deal not found: ${slug}`);
    return;
  }

  console.log('\n🧪 LOGO TEST RESULTS\n');
  console.log('═'.repeat(80));
  console.log(`\nDeal: ${deal.title}`);
  console.log(`Slug: ${deal.slug}`);
  console.log(`Provider: ${deal.provider}`);
  console.log(`\nLogo URL: ${deal.logoUrl || 'NOT SET'}`);
  
  if (!deal.logoUrl) {
    console.log('\n❌ Status: NO LOGO URL');
    console.log('   This will show a fallback avatar');
  } else if (deal.logoUrl.includes('ui-avatars.com')) {
    console.log('\n⚠️  Status: USING FALLBACK');
    console.log('   This is a generated avatar, not a real logo');
  } else if (isValidImageUrl(deal.logoUrl)) {
    console.log('\n✅ Status: VALID IMAGE URL');
    console.log('   URL appears to be a valid image');
  } else {
    console.log('\n🔴 Status: INVALID URL');
    console.log('   URL may not be an image');
  }
  
  console.log('\n💡 To update this logo:');
  console.log(`   node scripts/logo-manager.js update ${slug} <new-logo-url>`);
  console.log('');
}

// List all deals
function listDeals(filter = 'all') {
  const deals = loadDeals();
  console.log('\n📋 DEALS LIST\n');
  console.log('═'.repeat(80));
  
  let filtered = deals;
  if (filter === 'no-logo') {
    filtered = deals.filter(d => !d.logoUrl || d.logoUrl.includes('ui-avatars.com'));
  }
  
  console.log(`\nShowing ${filtered.length} of ${deals.length} deals:\n`);
  
  filtered.slice(0, 50).forEach((deal, i) => {
    const logoStatus = !deal.logoUrl ? '❌' : 
                      deal.logoUrl.includes('ui-avatars.com') ? '⚠️ ' : '✅';
    console.log(`${i + 1}. ${logoStatus} ${deal.slug}`);
    console.log(`   ${deal.title}`);
    console.log(`   Logo: ${deal.logoUrl || 'None'}`);
    console.log('');
  });
  
  if (filtered.length > 50) {
    console.log(`... and ${filtered.length - 50} more deals`);
  }
  console.log('');
}

// Main CLI
const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

switch (command) {
  case 'audit':
    auditLogos();
    break;
  
  case 'update':
    if (!arg1 || !arg2) {
      console.error('❌ Usage: node scripts/logo-manager.js update <slug> <logo-url>');
      process.exit(1);
    }
    updateLogo(arg1, arg2);
    break;
  
  case 'test':
    if (!arg1) {
      console.error('❌ Usage: node scripts/logo-manager.js test <slug>');
      process.exit(1);
    }
    testLogo(arg1);
    break;
  
  case 'list':
    listDeals(arg1);
    break;
  
  default:
    console.log('\n🎨 Logo Manager - Deal Logo Management Tool\n');
    console.log('Usage:');
    console.log('  node scripts/logo-manager.js audit              - Audit all logos');
    console.log('  node scripts/logo-manager.js update <slug> <url> - Update a logo');
    console.log('  node scripts/logo-manager.js test <slug>         - Test a logo');
    console.log('  node scripts/logo-manager.js list [no-logo]      - List deals');
    console.log('\nExamples:');
    console.log('  node scripts/logo-manager.js audit');
    console.log('  node scripts/logo-manager.js update intercom-early-stage https://example.com/logo.svg');
    console.log('  node scripts/logo-manager.js test intercom-early-stage');
    console.log('  node scripts/logo-manager.js list no-logo');
    console.log('');
}
