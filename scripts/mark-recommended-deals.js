#!/usr/bin/env node

/**
 * Script to mark specific deals as recommended
 * Usage: node scripts/mark-recommended-deals.js
 */

const fs = require('fs')
const path = require('path')

// Paths to check for deals
const PUBLIC_DEALS_PATH = path.join(process.cwd(), 'public', 'data', 'all-deals.json')
const PROCESSED_DEALS_PATH = path.join(process.cwd(), 'data', 'processed-deals', 'all-deals.json')
const IMPORTED_DEALS_PATH = path.join(process.cwd(), 'data', 'imported-deals', 'all-deals.json')

// List of deal providers/titles to mark as recommended (from your screenshots)
const RECOMMENDED_DEALS = [
  // Page 1
  'Galaxy', 'Cloudflare', 'Confluent', 'Every', 'ProdCamp', 'Content Beta',
  'Producter', 'AppHud', 'Pixely', 'Tomorro', 'Zenduty', 'Blue',
  'UseCSV', 'AdOpt', 'Datasplits', 'Mux', 'Mainstreet', 'Instatus',
  'Stripe Atlas', 'MongoDB', 'Indeed', 'Jaspto', 'Strdata', 'Array',
  'Scalingo', 'E-goi', 'Make',
  
  // Page 2
  'Harver', 'CrowdView', 'Snapshot Ads', 'Fullstitch', 'Engati', 'GitHub',
  'ActiveCampaign', 'GoCardless', 'Systems.io', 'Google Ads', 'DevRev', 'CustomGPT.ai',
  'Godaddy', 'WECODEs.com', 'ModernEMS', 'Deel', 'Clay', 'Elastic EC2',
  'Revolut Business', 'ONcloud', 'MailerLite', 'Simplystack', 'Databox', 'Agency',
  'Ripple', 'Quicknode', 'LinkedIn', 'Zoho', 'Screencast360', 'Netsuite Cloud',
  'Verge', 'Crisp.chat', 'Algolia',
  
  // Page 3 - Most Popular Deals
  'Notion', 'Stripe', 'Google Cloud (GCP)', 'Xero', 'Google Workspace', 'Zendesk',
  'Airtable', 'Auth0', 'Eleven Labs', 'AWS Activate', 'Lytho', 'SurveySparrow',
  'Mailrise', 'Microsoft Azure', 'Propensity AI', 'Helping Face', 'Asana.io', 'Clusterly.io',
  'Wise', 'HEY Google', 'Mixpanel', 'Google AI Studio', 'Gemini API', 'Reddit Ads',
  'Intro', 'Reweb', 'Verity', 'Postling', 'Lemlist', 'Freelancermap'
]

// Helper to read deals from file
function readDeals() {
  try {
    if (fs.existsSync(PUBLIC_DEALS_PATH)) {
      const data = fs.readFileSync(PUBLIC_DEALS_PATH, 'utf8')
      return { deals: JSON.parse(data), path: PUBLIC_DEALS_PATH }
    }
    
    if (fs.existsSync(PROCESSED_DEALS_PATH)) {
      const data = fs.readFileSync(PROCESSED_DEALS_PATH, 'utf8')
      return { deals: JSON.parse(data), path: PROCESSED_DEALS_PATH }
    }
    
    if (fs.existsSync(IMPORTED_DEALS_PATH)) {
      const data = fs.readFileSync(IMPORTED_DEALS_PATH, 'utf8')
      return { deals: JSON.parse(data), path: IMPORTED_DEALS_PATH }
    }
  } catch (error) {
    console.error('Error reading deals:', error)
  }
  return { deals: [], path: null }
}

// Helper to write deals to file
function writeDeals(deals, filePath) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, JSON.stringify(deals, null, 2))
  
  // Also write to public folder for runtime access
  const publicDir = path.dirname(PUBLIC_DEALS_PATH)
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  fs.writeFileSync(PUBLIC_DEALS_PATH, JSON.stringify(deals, null, 2))
}

// Main function
async function markRecommendedDeals() {
  console.log('🔍 Reading deals...')
  const { deals, path: dealsPath } = readDeals()
  
  if (!deals || deals.length === 0) {
    console.error('❌ No deals found!')
    return
  }
  
  console.log(`📊 Found ${deals.length} deals`)
  
  let markedCount = 0
  let alreadyMarkedCount = 0
  
  // Mark deals as recommended
  deals.forEach(deal => {
    const matchesRecommended = RECOMMENDED_DEALS.some(name => {
      const dealTitle = (deal.title || '').toLowerCase()
      const dealProvider = (deal.provider || '').toLowerCase()
      const searchName = name.toLowerCase()
      
      return dealTitle.includes(searchName) || 
             dealProvider.includes(searchName) ||
             searchName.includes(dealTitle) ||
             searchName.includes(dealProvider)
    })
    
    if (matchesRecommended) {
      if (deal.recommended) {
        alreadyMarkedCount++
      } else {
        deal.recommended = true
        markedCount++
        console.log(`✅ Marked as recommended: ${deal.title} (${deal.provider})`)
      }
    } else if (!deal.recommended) {
      deal.recommended = false
    }
  })
  
  // Write updated deals
  console.log('\n💾 Saving deals...')
  writeDeals(deals, dealsPath || PUBLIC_DEALS_PATH)
  
  console.log('\n✨ Done!')
  console.log(`📈 Marked ${markedCount} new deals as recommended`)
  console.log(`✓ ${alreadyMarkedCount} deals were already marked as recommended`)
  console.log(`📊 Total recommended deals: ${markedCount + alreadyMarkedCount}`)
}

// Run the script
markRecommendedDeals().catch(console.error)
