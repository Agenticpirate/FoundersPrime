#!/usr/bin/env node

/**
 * Import Sample Test Deals
 * 
 * This script imports the sample test deals for testing purposes
 * Usage: node scripts/import-sample-deals.js
 */

const fs = require('fs')
const path = require('path')

const SAMPLE_FILE = path.join(process.cwd(), 'sample-test-deals.json')
const DEST_FILE = path.join(process.cwd(), 'public/data/all-deals.json')

console.log('\n' + '='.repeat(60))
console.log('  IMPORT SAMPLE TEST DEALS')
console.log('='.repeat(60))

// Check if sample file exists
if (!fs.existsSync(SAMPLE_FILE)) {
  console.error(`\n❌ Error: Sample file not found: ${SAMPLE_FILE}\n`)
  process.exit(1)
}

// Read sample deals
const sampleDeals = JSON.parse(fs.readFileSync(SAMPLE_FILE, 'utf8'))
console.log(`\n📥 Found ${sampleDeals.length} sample deals\n`)

// Display deals
sampleDeals.forEach((deal, index) => {
  console.log(`${index + 1}. ${deal.title}`)
  console.log(`   Provider: ${deal.provider}`)
  console.log(`   Category: ${deal.category} > ${deal.subcategory}`)
  console.log(`   Value: ${deal.value}`)
  console.log(`   Recommended: ${deal.recommended ? '✅' : '❌'}`)
  console.log(`   Featured: ${deal.featured ? '✅' : '❌'}`)
  console.log('')
})

// Create destination directory if it doesn't exist
const destDir = path.dirname(DEST_FILE)
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true })
}

// Write to destination
fs.writeFileSync(DEST_FILE, JSON.stringify(sampleDeals, null, 2))

console.log('='.repeat(60))
console.log('✅ IMPORT COMPLETE')
console.log('='.repeat(60))
console.log(`\n📊 Imported ${sampleDeals.length} deals to ${DEST_FILE}`)
console.log(`\n🔍 To verify:`)
console.log(`   cat public/data/all-deals.json | jq 'length'`)
console.log(`\n🌐 To view:`)
console.log(`   npm run dev`)
console.log(`   Visit http://localhost:3000/deals\n`)
