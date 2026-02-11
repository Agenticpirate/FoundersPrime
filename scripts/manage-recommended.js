#!/usr/bin/env node

/**
 * Interactive script to manage recommended deals
 * Usage: node scripts/manage-recommended.js [command] [args]
 * 
 * Commands:
 *   list                    - List all recommended deals
 *   add <slug>              - Mark a deal as recommended
 *   remove <slug>           - Remove recommended status
 *   count                   - Count recommended deals
 *   search <term>           - Search for deals to mark
 */

const fs = require('fs')
const path = require('path')

const PUBLIC_DEALS_PATH = path.join(process.cwd(), 'public', 'data', 'all-deals.json')
const PROCESSED_DEALS_PATH = path.join(process.cwd(), 'data', 'processed-deals', 'all-deals.json')
const IMPORTED_DEALS_PATH = path.join(process.cwd(), 'data', 'imported-deals', 'all-deals.json')

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

function writeDeals(deals, filePath) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, JSON.stringify(deals, null, 2))
  
  const publicDir = path.dirname(PUBLIC_DEALS_PATH)
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  fs.writeFileSync(PUBLIC_DEALS_PATH, JSON.stringify(deals, null, 2))
}

function listRecommended() {
  const { deals } = readDeals()
  const recommended = deals.filter(d => d.recommended)
  
  console.log(`\n📋 Recommended Deals (${recommended.length} total)\n`)
  console.log('─'.repeat(80))
  
  recommended.forEach((deal, index) => {
    console.log(`${index + 1}. ${deal.title}`)
    console.log(`   Provider: ${deal.provider}`)
    console.log(`   Slug: ${deal.slug}`)
    console.log(`   Category: ${deal.category}${deal.subcategory ? ` > ${deal.subcategory}` : ''}`)
    console.log('─'.repeat(80))
  })
}

function countRecommended() {
  const { deals } = readDeals()
  const recommended = deals.filter(d => d.recommended)
  const byCategory = {}
  
  recommended.forEach(deal => {
    byCategory[deal.category] = (byCategory[deal.category] || 0) + 1
  })
  
  console.log(`\n📊 Recommended Deals Statistics\n`)
  console.log(`Total: ${recommended.length} out of ${deals.length} deals`)
  console.log(`\nBy Category:`)
  Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count}`)
    })
}

function addRecommended(slug) {
  const { deals, path: dealsPath } = readDeals()
  const deal = deals.find(d => d.slug === slug)
  
  if (!deal) {
    console.error(`❌ Deal not found: ${slug}`)
    return
  }
  
  if (deal.recommended) {
    console.log(`ℹ️  Deal already recommended: ${deal.title}`)
    return
  }
  
  deal.recommended = true
  writeDeals(deals, dealsPath)
  console.log(`✅ Marked as recommended: ${deal.title}`)
}

function removeRecommended(slug) {
  const { deals, path: dealsPath } = readDeals()
  const deal = deals.find(d => d.slug === slug)
  
  if (!deal) {
    console.error(`❌ Deal not found: ${slug}`)
    return
  }
  
  if (!deal.recommended) {
    console.log(`ℹ️  Deal is not recommended: ${deal.title}`)
    return
  }
  
  deal.recommended = false
  writeDeals(deals, dealsPath)
  console.log(`✅ Removed recommended status: ${deal.title}`)
}

function searchDeals(term) {
  const { deals } = readDeals()
  const searchTerm = term.toLowerCase()
  const results = deals.filter(d => 
    d.title.toLowerCase().includes(searchTerm) ||
    d.provider.toLowerCase().includes(searchTerm) ||
    d.slug.toLowerCase().includes(searchTerm)
  )
  
  console.log(`\n🔍 Search Results for "${term}" (${results.length} found)\n`)
  console.log('─'.repeat(80))
  
  results.slice(0, 20).forEach((deal, index) => {
    const badge = deal.recommended ? '⭐ RECOMMENDED' : ''
    console.log(`${index + 1}. ${deal.title} ${badge}`)
    console.log(`   Provider: ${deal.provider}`)
    console.log(`   Slug: ${deal.slug}`)
    console.log(`   Category: ${deal.category}`)
    console.log('─'.repeat(80))
  })
  
  if (results.length > 20) {
    console.log(`\n... and ${results.length - 20} more results`)
  }
}

// Main CLI
const command = process.argv[2]
const arg = process.argv[3]

switch (command) {
  case 'list':
    listRecommended()
    break
  case 'count':
    countRecommended()
    break
  case 'add':
    if (!arg) {
      console.error('❌ Please provide a deal slug')
      console.log('Usage: node scripts/manage-recommended.js add <slug>')
    } else {
      addRecommended(arg)
    }
    break
  case 'remove':
    if (!arg) {
      console.error('❌ Please provide a deal slug')
      console.log('Usage: node scripts/manage-recommended.js remove <slug>')
    } else {
      removeRecommended(arg)
    }
    break
  case 'search':
    if (!arg) {
      console.error('❌ Please provide a search term')
      console.log('Usage: node scripts/manage-recommended.js search <term>')
    } else {
      searchDeals(arg)
    }
    break
  default:
    console.log(`
📝 Manage Recommended Deals

Usage: node scripts/manage-recommended.js [command] [args]

Commands:
  list                    List all recommended deals
  count                   Count recommended deals by category
  add <slug>              Mark a deal as recommended
  remove <slug>           Remove recommended status
  search <term>           Search for deals

Examples:
  node scripts/manage-recommended.js list
  node scripts/manage-recommended.js count
  node scripts/manage-recommended.js add stripe-atlas
  node scripts/manage-recommended.js remove stripe-atlas
  node scripts/manage-recommended.js search github
    `)
}
