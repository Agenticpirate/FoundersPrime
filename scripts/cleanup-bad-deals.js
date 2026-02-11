#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

console.log('\n🔍 Analyzing Deals for Issues...\n');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

console.log(`📊 Total deals: ${deals.length}\n`);

// Identify problematic deals
const problematicDeals = [];

deals.forEach(deal => {
  const issues = [];
  
  // Check for missing or invalid logo
  if (!deal.logoUrl || deal.logoUrl.includes('ui-avatars.com')) {
    issues.push('No valid logo');
  }
  
  // Check for very short or generic titles
  if (!deal.title || deal.title.length < 10) {
    issues.push('Invalid title');
  }
  
  // Check for missing description
  if (!deal.description || deal.description.length < 50) {
    issues.push('Poor description');
  }
  
  // Check for missing application URL
  if (!deal.applicationUrl || deal.applicationUrl === '') {
    issues.push('No application URL');
  }
  
  // Check for promo code deals (often low quality)
  if (deal.title?.toLowerCase().includes('promo code') || 
      deal.slug?.includes('promo-code')) {
    issues.push('Promo code deal');
  }
  
  if (issues.length > 0) {
    problematicDeals.push({
      slug: deal.slug,
      title: deal.title,
      provider: deal.provider,
      issues: issues
    });
  }
});

console.log(`⚠️  Found ${problematicDeals.length} problematic deals:\n`);

// Group by issue type
const byIssue = {};
problematicDeals.forEach(deal => {
  deal.issues.forEach(issue => {
    if (!byIssue[issue]) byIssue[issue] = [];
    byIssue[issue].push(deal);
  });
});

Object.keys(byIssue).forEach(issue => {
  console.log(`\n${issue}: ${byIssue[issue].length} deals`);
  byIssue[issue].slice(0, 10).forEach(deal => {
    console.log(`   • ${deal.title} (${deal.slug})`);
  });
  if (byIssue[issue].length > 10) {
    console.log(`   ... and ${byIssue[issue].length - 10} more`);
  }
});

console.log('\n\n❓ Do you want to delete these deals? (y/n)');
console.log('   This will remove all deals with:');
console.log('   - Missing/invalid logos');
console.log('   - Poor descriptions');
console.log('   - Missing application URLs');
console.log('   - Promo code deals\n');

// For now, just show the analysis
// To actually delete, uncomment below:

/*
const cleanDeals = deals.filter(deal => {
  return !problematicDeals.some(p => p.slug === deal.slug);
});

fs.writeFileSync(dealsFilePath, JSON.stringify(cleanDeals, null, 2));
console.log(`\n✅ Deleted ${problematicDeals.length} deals`);
console.log(`📊 Remaining deals: ${cleanDeals.length}\n`);
*/

console.log('💡 To delete these deals, edit the script and uncomment the deletion code.\n');
