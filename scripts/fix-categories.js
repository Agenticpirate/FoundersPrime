/**
 * Fix deal categorization - move no-code/low-code tools to appropriate categories
 */

const fs = require('fs');
const path = require('path');

// Specific category overrides
const CATEGORY_FIXES = {
  // No-code app builders -> AI Development
  'softr': { category: 'ai', subcategory: 'ai-development' },
  'glide': { category: 'ai', subcategory: 'ai-development' },
  'base44': { category: 'ai', subcategory: 'ai-development' },
  'make': { category: 'ai', subcategory: 'ai-automation' }, // Keep as automation
  'zapier': { category: 'ai', subcategory: 'ai-automation' }, // Keep as automation
  'n8n': { category: 'ai', subcategory: 'ai-automation' }, // Keep as automation
  'pagemaker': { category: 'ai', subcategory: 'ai-development' },
  'memberstack': { category: 'ai', subcategory: 'ai-development' },
  'pixpa': { category: 'ai', subcategory: 'ai-development' },
  'array': { category: 'ai', subcategory: 'ai-development' },
  'stackby': { category: 'ai', subcategory: 'ai-development' },
  
  // Website builders -> AI Development
  'elementor': { category: 'ai', subcategory: 'ai-development' },
  'hostinger horizons': { category: 'ai', subcategory: 'ai-development' },
  
  // Video tools -> AI Design
  'riverside': { category: 'ai', subcategory: 'ai-design' },
  'vmaker': { category: 'ai', subcategory: 'ai-design' },
  
  // Chatbot builders -> AI Agents
  'joonbot': { category: 'ai', subcategory: 'ai-agents' },
  'chatbase': { category: 'ai', subcategory: 'ai-agents' },
  
  // API tools -> AI Development
  'moesif': { category: 'ai', subcategory: 'ai-development' },
  'mux': { category: 'ai', subcategory: 'ai-development' },
  
  // Fix miscategorized
  'preply': { category: 'saas', subcategory: 'saas-discounts' }, // Language learning
  'hide.me vpn': { category: 'security', subcategory: 'security-compliance' },
};

function fixCategories() {
  const dealsPath = path.join(process.cwd(), 'public', 'data', 'all-deals.json');
  const deals = JSON.parse(fs.readFileSync(dealsPath, 'utf8'));
  
  console.log('Fixing categories for ' + deals.length + ' deals...');
  
  let fixed = 0;
  
  deals.forEach(deal => {
    const titleLower = deal.title.toLowerCase();
    
    for (const [keyword, newCat] of Object.entries(CATEGORY_FIXES)) {
      if (titleLower.includes(keyword)) {
        if (deal.category !== newCat.category || deal.subcategory !== newCat.subcategory) {
          console.log('  ' + deal.title + ': ' + deal.subcategory + ' -> ' + newCat.subcategory);
          deal.category = newCat.category;
          deal.subcategory = newCat.subcategory;
          fixed++;
        }
        break;
      }
    }
  });
  
  fs.writeFileSync(dealsPath, JSON.stringify(deals, null, 2));
  
  console.log('\nFixed ' + fixed + ' deals');
  
  // Print new counts
  const catCounts = {};
  deals.forEach(d => {
    catCounts[d.subcategory] = (catCounts[d.subcategory] || 0) + 1;
  });
  
  console.log('\n=== Updated Category Counts ===');
  Object.entries(catCounts).sort((a,b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log('  ' + cat + ': ' + count);
  });
}

fixCategories();
