#!/usr/bin/env node

/**
 * Import Deals from Downloads Directory
 * 
 * This script loads all JSON files from the specified directory,
 * transforms them into the proper format, and saves them to the database.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DEALS_DIR = '/Users/ravitejapulligella/Downloads/Deals Data';
const OUTPUT_FILE = path.join(process.cwd(), 'public/data/all-deals.json');
const BACKUP_FILE = path.join(process.cwd(), 'public/data/all-deals.backup.json');

// Category mapping from file names to our category system
const CATEGORY_MAP = {
  'AI Agents': { category: 'ai', subcategory: 'ai-agents' },
  'AI Automations': { category: 'ai', subcategory: 'ai-automation' },
  'AI CUstomer Support': { category: 'ai', subcategory: 'ai-customer-support' },
  'AI Data Analysis': { category: 'ai', subcategory: 'ai-data-analysis' },
  'AIDev(1)': { category: 'ai', subcategory: 'ai-development' },
  'AIDev(2)': { category: 'ai', subcategory: 'ai-development' },
  'AI Productivity': { category: 'ai', subcategory: 'ai-productivity' },
  'AI Writing': { category: 'ai', subcategory: 'ai-writing' },
  'Ai Design': { category: 'ai', subcategory: 'ai-design' },
  'Ai HR': { category: 'human-resources', subcategory: 'recruitment' },
  'Ai Marketing': { category: 'ai', subcategory: 'ai-marketing' },
  'Ai Sales & Business': { category: 'ai', subcategory: 'ai-sales-business' }
};

// Helper function to create a slug from a string
function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper function to generate a unique ID
function generateId() {
  return `deal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper function to extract value from discount/savings
function extractValue(discount, savings) {
  if (savings && savings.includes('$')) {
    return savings;
  }
  if (discount) {
    return discount;
  }
  return 'Contact for pricing';
}

// Helper function to parse instructions into steps
function parseInstructions(instructions, features, allParagraphs) {
  const steps = [];
  
  // First try to get instructions from the instructions field
  if (instructions && instructions.trim()) {
    const lines = instructions.split('\n').filter(line => line.trim());
    lines.forEach((line) => {
      steps.push(line.trim());
    });
  }
  
  // If no instructions, try to extract from paragraphs that look like instructions
  if (steps.length === 0 && allParagraphs && Array.isArray(allParagraphs)) {
    const instructionParagraphs = allParagraphs.filter(p => 
      p && (
        p.toLowerCase().includes('how to') ||
        p.toLowerCase().includes('step') ||
        p.toLowerCase().includes('apply') ||
        p.toLowerCase().includes('sign up') ||
        p.toLowerCase().includes('register') ||
        p.toLowerCase().includes('visit') ||
        p.toLowerCase().includes('create account')
      )
    ).slice(0, 5);
    
    instructionParagraphs.forEach(p => {
      if (p.length < 300) { // Only short, instruction-like paragraphs
        steps.push(p.trim());
      }
    });
  }
  
  // If still no instructions, create generic steps
  if (steps.length === 0) {
    steps.push('Visit the provider website using the link above');
    steps.push('Review the eligibility requirements and ensure you qualify');
    steps.push('Complete the application form with accurate information');
    steps.push('Submit your application and wait for approval');
  }
  
  return steps;
}

// Helper function to extract eligibility from features
function extractEligibility(features) {
  if (!features || !Array.isArray(features)) {
    return ['Startups and early-stage companies', 'Active business operations'];
  }
  
  // Look for eligibility-related features
  const eligibility = features
    .filter(f => 
      f.toLowerCase().includes('eligib') || 
      f.toLowerCase().includes('require') ||
      f.toLowerCase().includes('must be') ||
      f.toLowerCase().includes('need to')
    )
    .slice(0, 5);
  
  if (eligibility.length === 0) {
    return ['Startups and early-stage companies', 'Active business operations'];
  }
  
  return eligibility;
}

// Transform a deal from the source format to our format
function transformDeal(sourceDeal, categoryInfo, fileName) {
  const slug = createSlug(sourceDeal.name || 'untitled-deal');
  const value = extractValue(sourceDeal.discount, sourceDeal.savings);
  const description = sourceDeal.metaDescription || sourceDeal.description || 'No description available';
  
  return {
    id: generateId(),
    slug: slug,
    title: sourceDeal.name || 'Untitled Deal',
    provider: sourceDeal.name ? sourceDeal.name.split(' ')[0] : 'Unknown',
    category: categoryInfo.category,
    subcategory: categoryInfo.subcategory,
    description: description,
    shortDescription: description.substring(0, 150) + (description.length > 150 ? '...' : ''),
    value: value,
    savings: sourceDeal.savings || value,
    eligibility: extractEligibility(sourceDeal.features),
    requirements: ['Valid business registration', 'Active website or product'],
    applicationProcess: parseInstructions(sourceDeal.instructions, sourceDeal.features, sourceDeal.allParagraphs),
    proTips: [],
    tags: [
      categoryInfo.category,
      categoryInfo.subcategory,
      ...(sourceDeal.category ? [sourceDeal.category] : [])
    ].filter(Boolean),
    status: 'active',
    applicationUrl: sourceDeal.dealUrl || sourceDeal.affiliateLink || '#',
    providerWebsite: sourceDeal.dealUrl || sourceDeal.affiliateLink || '#',
    logoUrl: sourceDeal.logoUrl || '',
    featured: false,
    verified: true,
    difficulty: 'medium',
    timeToApply: '15-30 minutes',
    successRate: '70%',
    lastUpdated: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    sourceVerified: true,
    dataSource: 'import'
  };
}

// Main import function
async function importDeals() {
  console.log('🚀 Starting deal import process...\n');
  
  let allDeals = [];
  let stats = {
    filesProcessed: 0,
    dealsImported: 0,
    errors: 0
  };
  
  try {
    // Backup existing deals
    if (fs.existsSync(OUTPUT_FILE)) {
      console.log('📦 Creating backup of existing deals...');
      fs.copyFileSync(OUTPUT_FILE, BACKUP_FILE);
      console.log(`✅ Backup created: ${BACKUP_FILE}\n`);
      
      // Load existing deals to merge
      const existingData = fs.readFileSync(OUTPUT_FILE, 'utf8');
      allDeals = JSON.parse(existingData);
      console.log(`📊 Found ${allDeals.length} existing deals\n`);
    }
    
    // Get all JSON files from the directory
    const files = [];
    
    // Read main directory
    const mainFiles = fs.readdirSync(DEALS_DIR)
      .filter(file => file.endsWith('.json'))
      .map(file => ({ path: path.join(DEALS_DIR, file), name: file }));
    files.push(...mainFiles);
    
    // Read AI Dev subdirectory
    const aiDevDir = path.join(DEALS_DIR, 'AI Dev');
    if (fs.existsSync(aiDevDir)) {
      const aiDevFiles = fs.readdirSync(aiDevDir)
        .filter(file => file.endsWith('.json'))
        .map(file => ({ path: path.join(aiDevDir, file), name: file }));
      files.push(...aiDevFiles);
    }
    
    console.log(`📁 Found ${files.length} JSON files to process\n`);
    
    // Process each file
    for (const file of files) {
      try {
        console.log(`📄 Processing: ${file.name}`);
        
        // Read and parse JSON
        const fileContent = fs.readFileSync(file.path, 'utf8');
        const sourceDeals = JSON.parse(fileContent);
        
        if (!Array.isArray(sourceDeals)) {
          console.log(`⚠️  Skipping ${file.name}: Not an array`);
          continue;
        }
        
        // Determine category from filename
        const fileBaseName = path.basename(file.name, '.json');
        const categoryInfo = CATEGORY_MAP[fileBaseName] || { category: 'saas-discounts', subcategory: '' };
        
        console.log(`   Category: ${categoryInfo.category}${categoryInfo.subcategory ? ` > ${categoryInfo.subcategory}` : ''}`);
        console.log(`   Deals in file: ${sourceDeals.length}`);
        
        // Transform each deal
        let imported = 0;
        for (const sourceDeal of sourceDeals) {
          try {
            const transformedDeal = transformDeal(sourceDeal, categoryInfo, file.name);
            
            // Check for duplicates by slug
            const existingIndex = allDeals.findIndex(d => d.slug === transformedDeal.slug);
            if (existingIndex >= 0) {
              // Update existing deal
              allDeals[existingIndex] = transformedDeal;
            } else {
              // Add new deal
              allDeals.push(transformedDeal);
              imported++;
            }
          } catch (err) {
            console.log(`   ⚠️  Error transforming deal: ${err.message}`);
            stats.errors++;
          }
        }
        
        console.log(`   ✅ Imported ${imported} new deals\n`);
        stats.filesProcessed++;
        stats.dealsImported += imported;
        
      } catch (err) {
        console.log(`   ❌ Error processing ${file.name}: ${err.message}\n`);
        stats.errors++;
      }
    }
    
    // Save all deals
    console.log('💾 Saving deals to database...');
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allDeals, null, 2));
    console.log(`✅ Saved ${allDeals.length} total deals to ${OUTPUT_FILE}\n`);
    
    // Print summary
    console.log('📊 Import Summary:');
    console.log('═══════════════════════════════════════');
    console.log(`Files Processed:    ${stats.filesProcessed}`);
    console.log(`New Deals Imported: ${stats.dealsImported}`);
    console.log(`Total Deals:        ${allDeals.length}`);
    console.log(`Errors:             ${stats.errors}`);
    console.log('═══════════════════════════════════════\n');
    
    // Category breakdown
    const categoryBreakdown = {};
    allDeals.forEach(deal => {
      const cat = deal.category;
      categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + 1;
    });
    
    console.log('📈 Deals by Category:');
    console.log('═══════════════════════════════════════');
    Object.entries(categoryBreakdown)
      .sort((a, b) => b[1] - a[1])
      .forEach(([cat, count]) => {
        console.log(`${cat.padEnd(25)} ${count}`);
      });
    console.log('═══════════════════════════════════════\n');
    
    console.log('✨ Import completed successfully!');
    
  } catch (err) {
    console.error('❌ Fatal error during import:', err);
    process.exit(1);
  }
}

// Run the import
importDeals();
