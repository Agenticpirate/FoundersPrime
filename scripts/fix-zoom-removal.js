const fs = require('fs');
const path = require('path');

const dealsFilePath = path.join(__dirname, '..', 'public', 'data', 'all-deals.json');

// Read current deals
const deals = JSON.parse(fs.readFileSync(dealsFilePath, 'utf8'));

// Deals that were incorrectly removed - need to restore them
const legalZoomDeal = {
  id: 'legalzoom-284',
  slug: 'legalzoom-284',
  title: 'LegalZoom',
  provider: 'LegalZoom',
  category: 'business',
  subcategory: 'legal',
  description: 'Online legal services for businesses',
  shortDescription: 'Online legal services for businesses',
  value: '20% off business formation',
  savings: 'Save up to $100',
  savingsAmount: 100,
  tags: ['business', 'legal', 'LegalZoom'],
  status: 'active',
  applicationUrl: 'https://www.legalzoom.com/',
  logoUrl: 'https://www.legalzoom.com/favicon.ico',
  featured: false,
  verified: true,
  lastUpdated: '2026-01-20',
  createdAt: '2026-01-20',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '⚖️',
  brandIcon: 'https://www.legalzoom.com/favicon.ico'
};

const zoomInfoDeal = {
  id: 'zoominfo-356',
  slug: 'zoominfo-356',
  title: 'ZoomInfo',
  provider: 'ZoomInfo',
  category: 'sales',
  subcategory: 'sales-intelligence',
  description: 'B2B contact database and sales intelligence platform',
  shortDescription: 'B2B contact database and sales intelligence platform',
  value: 'Free trial + startup discounts',
  savings: 'Save up to $500',
  savingsAmount: 500,
  tags: ['sales', 'sales-intelligence', 'ZoomInfo'],
  status: 'active',
  applicationUrl: 'https://www.zoominfo.com/',
  logoUrl: 'https://www.zoominfo.com/favicon.ico',
  featured: false,
  verified: true,
  lastUpdated: '2026-01-20',
  createdAt: '2026-01-20',
  updatedAt: '2026-01-27',
  sourceVerified: true,
  dataSource: 'manual-update',
  icon: '📊',
  brandIcon: 'https://www.zoominfo.com/favicon.ico'
};

// Add back the incorrectly removed deals
deals.push(legalZoomDeal);
deals.push(zoomInfoDeal);

// Save updated deals
fs.writeFileSync(dealsFilePath, JSON.stringify(deals, null, 2));

console.log('✅ Restored LegalZoom and ZoomInfo deals');
console.log(`Total deals: ${deals.length}`);
