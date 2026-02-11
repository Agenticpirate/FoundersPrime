#!/usr/bin/env node

const fs = require('fs');
const path = 'public/data/all-deals.json';
const deals = JSON.parse(fs.readFileSync(path, 'utf8'));

console.log('Total deals before cleanup:', deals.length);

// Slugs to remove (duplicates with numbered suffixes)
const slugsToRemove = [
  'google-calendar-92',
  'google-calendar-93',
  'google-drive-94',
  'google-drive-95',
  'google-gemini-96',
  'google-gemini-97',
  'google-sheets-98',
  'google-sheets-99',
  'google-docs-100',
  'google-docs-101',
  'google-meet-154',
  'google-meet-155'
];

// Filter out duplicates
const cleanedDeals = deals.filter(deal => !slugsToRemove.includes(deal.slug));

console.log('Removed', deals.length - cleanedDeals.length, 'duplicate Google deals');
console.log('Total deals after cleanup:', cleanedDeals.length);

// Show remaining Google deals
const remainingGoogle = cleanedDeals.filter(d => 
  d.provider?.toLowerCase().includes('google') ||
  d.title?.toLowerCase().includes('google')
);

console.log('\nRemaining Google deals:');
remainingGoogle.forEach((d, i) => {
  console.log(`${i+1}. ${d.title} (${d.slug})`);
});

fs.writeFileSync(path, JSON.stringify(cleanedDeals, null, 2));
console.log('\n✅ Cleanup complete!');
