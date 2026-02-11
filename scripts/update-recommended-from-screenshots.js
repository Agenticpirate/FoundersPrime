#!/usr/bin/env node

/**
 * Update recommended deals based on screenshots
 * This script will:
 * 1. Remove all existing recommended badges
 * 2. Add recommended badges only to deals shown in the screenshots
 */

const fs = require('fs')
const path = require('path')

const PUBLIC_DEALS_PATH = path.join(process.cwd(), 'public', 'data', 'all-deals.json')
const PROCESSED_DEALS_PATH = path.join(process.cwd(), 'data', 'processed-deals', 'all-deals.json')

// Deals visible in the screenshots (extracted from the images)
// Using exact titles or close matches from the database
const SCREENSHOT_DEALS = [
  // Confirmed deals that exist in database
  'Stripe Atlas',
  'Wix',
  'Zapier',
  'Galaxy (ex. Meteor Cloud)',
  'Cloudflare',
  'Freshdesk',
  'Mux',
  'Jotform',
  'E-goi',
  'Zoom Meetings',
  'Indeed',
  'Attio',
  'Slack',
  
  // Additional deals from screenshots - will search by partial match
  'Google',
  'Microsoft',
  'AWS',
  'Amazon',
  'GitHub',
  'Notion',
  'Airtable',
  'Linear',
  'Retool',
  'Zendesk',
  'Twilio',
  'Auth0',
  'Webflow',
  'Canva',
  'Miro',
  'Clay',
  'Stripe',
  'Paddle',
  'ActiveCampaign',
  'Experian',
  'GoDaddy',
  'Deel',
  'SecureBees',
  'Snapchat',
  'CustomerGauge',
  'Richpanel',
  'MailerLite',
  'LinkedIn',
  'Hugging Face',
  'Perplexity',
  'Amity',
  'Contentrain',
  'Every',
  'Lemon',
  'KeepQo',
  'Extraspace',
  'ProdCamp',
  'Xquis',
  'Acryl',
  'Marketvent',
  'Wonderlabs',
  'Content',
  'Flowery',
  'Dub',
  'Iterable',
  'Supr',
  'Pivony',
  'Tomorro',
  'Zenduty',
  'Blue',
  'UseCSV',
  'AdOpt',
  'Datapills',
  'Mainstreet',
  'Instatus',
  'mongoDB',
  'Jepto',
  'Sirdata',
  'Array',
  'Scalingo'
]

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
  } catch (error) {
    console.error('Error reading deals:', error)
  }
  return { deals: [], path: null }
}

function writeDeals(deals, filePath) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, JSON.stringify(deals, null, 2))
  
  // Also write to public directory
  const publicDir = path.dirname(PUBLIC_DEALS_PATH)
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  fs.writeFileSync(PUBLIC_DEALS_PATH, JSON.stringify(deals, null, 2))
}

function normalizeTitle(title) {
  return title.toLowerCase().trim()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s]/g, '')
}

function updateRecommendedDeals() {
  const { deals, path: dealsPath } = readDeals()
  
  if (!deals || deals.length === 0) {
    console.error('❌ No deals found')
    return
  }
  
  console.log(`\n🔄 Updating recommended deals...`)
  console.log(`Total deals: ${deals.length}`)
  console.log(`Deals to mark as recommended: ${SCREENSHOT_DEALS.length}`)
  
  // Step 1: Remove all recommended badges
  let removedCount = 0
  deals.forEach(deal => {
    if (deal.recommended) {
      deal.recommended = false
      removedCount++
    }
  })
  console.log(`\n✅ Removed ${removedCount} existing recommended badges`)
  
  // Step 2: Add recommended badges to screenshot deals
  let addedCount = 0
  const notFound = []
  const alreadyAdded = new Set()
  
  SCREENSHOT_DEALS.forEach(screenshotDeal => {
    const normalizedScreenshot = normalizeTitle(screenshotDeal)
    
    // Find matching deals (can match multiple if it's a partial match like "Google")
    const matchingDeals = deals.filter(d => {
      if (alreadyAdded.has(d.id)) return false
      
      const normalizedDealTitle = normalizeTitle(d.title)
      const normalizedProvider = normalizeTitle(d.provider)
      
      // Exact match
      if (normalizedDealTitle === normalizedScreenshot || normalizedProvider === normalizedScreenshot) {
        return true
      }
      
      // Partial match - deal title contains screenshot term or vice versa
      if (normalizedDealTitle.includes(normalizedScreenshot) || normalizedScreenshot.includes(normalizedDealTitle)) {
        return true
      }
      
      // Provider match
      if (normalizedProvider.includes(normalizedScreenshot) || normalizedScreenshot.includes(normalizedProvider)) {
        return true
      }
      
      return false
    })
    
    if (matchingDeals.length > 0) {
      matchingDeals.forEach(deal => {
        if (!deal.recommended && !alreadyAdded.has(deal.id)) {
          deal.recommended = true
          alreadyAdded.add(deal.id)
          addedCount++
          console.log(`  ✓ ${deal.title}`)
        }
      })
    } else {
      notFound.push(screenshotDeal)
    }
  })
  
  console.log(`\n✅ Added ${addedCount} recommended badges`)
  
  if (notFound.length > 0) {
    console.log(`\n⚠️  Could not find ${notFound.length} deals:`)
    notFound.forEach(deal => console.log(`  - ${deal}`))
  }
  
  // Step 3: Save updated deals
  writeDeals(deals, dealsPath)
  console.log(`\n💾 Saved changes to ${dealsPath}`)
  console.log(`💾 Saved changes to ${PUBLIC_DEALS_PATH}`)
  
  // Summary
  const finalRecommended = deals.filter(d => d.recommended).length
  console.log(`\n📊 Final Summary:`)
  console.log(`  Total deals: ${deals.length}`)
  console.log(`  Recommended deals: ${finalRecommended}`)
  console.log(`  Percentage: ${((finalRecommended / deals.length) * 100).toFixed(1)}%`)
}

// Run the update
updateRecommendedDeals()
