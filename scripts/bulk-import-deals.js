#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const DEALS_DATA_PATH = '/Users/ravitejapulligella/Downloads/Deals Data';
const OUTPUT_PATH = './data/imported-deals';

// Category mapping based on file names
const CATEGORY_MAPPING = {
  'AI Agents': { category: 'ai', subcategory: 'ai-agents' },
  'AI Automations': { category: 'ai', subcategory: 'ai-automation' },
  'AI CUstomer Support': { category: 'ai', subcategory: 'ai-customer-support' },
  'AI Data Analysis': { category: 'ai', subcategory: 'ai-data-analysis' },
  'AIDev': { category: 'ai', subcategory: 'ai-development' },
  'AI Productivity': { category: 'ai', subcategory: 'ai-productivity' },
  'AI Writing': { category: 'ai', subcategory: 'ai-writing' },
  'Ai Design': { category: 'ai', subcategory: 'ai-design' },
  'Ai HR': { category: 'human-resources', subcategory: 'recruitment' },
  'Ai Marketing': { category: 'ai', subcategory: 'ai-marketing' },
  'Ai Sales & Business': { category: 'ai', subcategory: 'ai-sales-business' }
};

// Utility functions
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractValue(text) {
  if (!text) return 'Free';
  
  // Look for common value patterns
  const patterns = [
    /\$[\d,]+(?:\.\d{2})?/g,
    /[\d,]+\s*(?:credits?|months?|years?)/gi,
    /\d+%\s*(?:off|discount)/gi,
    /free/gi
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[0];
  }
  
  return 'Varies';
}

function cleanText(text) {
  if (!text) return '';
  return text.replace(/\s+/g, ' ').trim();
}

function convertDeal(rawDeal, categoryInfo, index) {
  const now = new Date().toISOString().split('T')[0];
  
  // Extract basic info
  const title = cleanText(rawDeal.title || rawDeal.name || rawDeal.company || 'Unknown Deal');
  const provider = cleanText(rawDeal.company || rawDeal.provider || rawDeal.brand || title.split(' ')[0]);
  const description = cleanText(rawDeal.description || rawDeal.details || rawDeal.offer || 'No description available');
  
  return {
    id: `bulk-${Date.now()}-${index}`,
    slug: generateSlug(title),
    title: title,
    provider: provider,
    category: categoryInfo.category,
    subcategory: categoryInfo.subcategory,
    description: description,
    shortDescription: description.substring(0, 120) + (description.length > 120 ? '...' : ''),
    value: extractValue(rawDeal.value || rawDeal.offer || rawDeal.discount || description),
    originalPrice: rawDeal.originalPrice,
    discountedPrice: rawDeal.discountedPrice,
    savings: rawDeal.savings,
    eligibility: Array.isArray(rawDeal.eligibility) ? rawDeal.eligibility : 
                 rawDeal.eligibility ? [rawDeal.eligibility] : ['Startups'],
    requirements: Array.isArray(rawDeal.requirements) ? rawDeal.requirements :
                  rawDeal.requirements ? [rawDeal.requirements] : ['Valid business email'],
    applicationProcess: Array.isArray(rawDeal.applicationProcess) ? rawDeal.applicationProcess :
                       ['Visit provider website', 'Complete application', 'Await approval'],
    proTips: Array.isArray(rawDeal.proTips) ? rawDeal.proTips : [],
    tags: Array.isArray(rawDeal.tags) ? rawDeal.tags : 
          rawDeal.tags ? rawDeal.tags.split(',').map(t => t.trim()) : 
          [categoryInfo.category, provider],
    status: rawDeal.status || 'active',
    expiryDate: rawDeal.expiryDate || rawDeal.expires,
    applicationUrl: rawDeal.applicationUrl || rawDeal.link || rawDeal.url || `https://google.com/search?q=${encodeURIComponent(provider + ' startup program')}`,
    providerWebsite: rawDeal.providerWebsite || rawDeal.website || rawDeal.applicationUrl || rawDeal.link,
    logoUrl: rawDeal.logoUrl || rawDeal.logo,
    featured: rawDeal.featured || false,
    verified: rawDeal.verified !== false, // Default to true unless explicitly false
    difficulty: rawDeal.difficulty || 'medium',
    timeToApply: rawDeal.timeToApply || '15 minutes',
    successRate: rawDeal.successRate,
    lastUpdated: now,
    createdAt: now,
    updatedAt: now,
    sourceVerified: true,
    dataSource: 'bulk-import'
  };
}

function processFile(filePath, categoryInfo) {
  console.log(`Processing: ${filePath}`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    // Handle both single objects and arrays
    const deals = Array.isArray(data) ? data : [data];
    
    const convertedDeals = deals.map((deal, index) => {
      try {
        return convertDeal(deal, categoryInfo, index);
      } catch (error) {
        console.warn(`Warning: Failed to convert deal ${index} in ${filePath}:`, error.message);
        return null;
      }
    }).filter(Boolean);
    
    console.log(`  ✅ Converted ${convertedDeals.length} deals from ${deals.length} raw entries`);
    return convertedDeals;
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return [];
  }
}

function getCategoryFromFileName(fileName) {
  // Remove file extension and numbers in parentheses
  const cleanName = fileName.replace(/\.[^.]+$/, '').replace(/\(\d+\)$/, '');
  
  // Check direct mapping first
  if (CATEGORY_MAPPING[cleanName]) {
    return CATEGORY_MAPPING[cleanName];
  }
  
  // Check partial matches
  for (const [key, value] of Object.entries(CATEGORY_MAPPING)) {
    if (cleanName.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(cleanName.toLowerCase())) {
      return value;
    }
  }
  
  // Default fallback
  return { category: 'ai', subcategory: 'ai-development' };
}

function processDirectory(dirPath) {
  const allDeals = [];
  
  function walkDirectory(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
      if (item.startsWith('.')) continue; // Skip hidden files
      
      const itemPath = path.join(currentPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        console.log(`📁 Entering directory: ${item}`);
        walkDirectory(itemPath);
      } else if (item.endsWith('.json')) {
        const categoryInfo = getCategoryFromFileName(item);
        const deals = processFile(itemPath, categoryInfo);
        allDeals.push(...deals);
      }
    }
  }
  
  walkDirectory(dirPath);
  return allDeals;
}

function main() {
  console.log('🚀 Starting bulk import of deals...');
  console.log(`📂 Source directory: ${DEALS_DATA_PATH}`);
  
  // Check if source directory exists
  if (!fs.existsSync(DEALS_DATA_PATH)) {
    console.error(`❌ Source directory not found: ${DEALS_DATA_PATH}`);
    process.exit(1);
  }
  
  // Create output directory
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH, { recursive: true });
  }
  
  // Process all files
  const allDeals = processDirectory(DEALS_DATA_PATH);
  
  // Group deals by category for easier management
  const dealsByCategory = {};
  allDeals.forEach(deal => {
    const key = `${deal.category}-${deal.subcategory || 'general'}`;
    if (!dealsByCategory[key]) {
      dealsByCategory[key] = [];
    }
    dealsByCategory[key].push(deal);
  });
  
  // Save results
  console.log('\n📊 Import Summary:');
  console.log(`Total deals processed: ${allDeals.length}`);
  
  // Save all deals in one file
  const allDealsFile = path.join(OUTPUT_PATH, 'all-deals.json');
  fs.writeFileSync(allDealsFile, JSON.stringify(allDeals, null, 2));
  console.log(`💾 Saved all deals to: ${allDealsFile}`);
  
  // Save by category
  Object.entries(dealsByCategory).forEach(([category, deals]) => {
    const categoryFile = path.join(OUTPUT_PATH, `${category}.json`);
    fs.writeFileSync(categoryFile, JSON.stringify(deals, null, 2));
    console.log(`📁 ${category}: ${deals.length} deals → ${categoryFile}`);
  });
  
  // Create import summary
  const summary = {
    totalDeals: allDeals.length,
    importDate: new Date().toISOString(),
    categories: Object.keys(dealsByCategory).map(key => ({
      category: key,
      count: dealsByCategory[key].length
    })),
    sourceDirectory: DEALS_DATA_PATH
  };
  
  const summaryFile = path.join(OUTPUT_PATH, 'import-summary.json');
  fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
  
  console.log('\n✅ Bulk import completed successfully!');
  console.log(`📋 Import summary saved to: ${summaryFile}`);
  console.log('\n🔄 Next steps:');
  console.log('1. Review the converted deals in the data/imported-deals directory');
  console.log('2. Use the web interface to import the JSON files');
  console.log('3. Or use the all-deals.json file for a single bulk import');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { processDirectory, convertDeal, getCategoryFromFileName };