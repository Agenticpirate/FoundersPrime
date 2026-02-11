#!/usr/bin/env node

/**
 * Consolidate all deals from individual category files into all-deals.json
 * This merges deals from:
 * - data/imported-deals/*.json
 * - data/processed-deals/*.json
 * Into public/data/all-deals.json
 */

const fs = require('fs')
const path = require('path')

const IMPORTED_DIR = path.join(process.cwd(), 'data', 'imported-deals')
const PROCESSED_DIR = path.join(process.cwd(), 'data', 'processed-deals')
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'data', 'all-deals.json')

function readJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message)
    return []
  }
}

function getDealsFromDirectory(dirPath) {
  const deals = []
  
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory not found: ${dirPath}`)
    return deals
  }

  const files = fs.readdirSync(dirPath)
  
  for (const file of files) {
    if (!file.endsWith('.json')) continue
    if (file === 'all-deals.json') continue
    if (file === 'import-summary.json') continue
    
    const filePath = path.join(dirPath, file)
    const fileDeals = readJsonFile(filePath)
    
    if (Array.isArray(fileDeals)) {
      console.log(`  ${file}: ${fileDeals.length} deals`)
      deals.push(...fileDeals)
    }
  }
  
  return deals
}

function consolidateDeals() {
  console.log('🔄 Consolidating deals from all sources...\n')
  
  // Collect deals from both directories
  console.log('📁 Reading from data/imported-deals:')
  const importedDeals = getDealsFromDirectory(IMPORTED_DIR)
  
  console.log('\n📁 Reading from data/processed-deals:')
  const processedDeals = getDealsFromDirectory(PROCESSED_DIR)
  
  // Merge all deals
  const allDeals = [...importedDeals, ...processedDeals]
  console.log(`\n📊 Total deals collected: ${allDeals.length}`)
  
  // Deduplicate by slug (keep the most recent version)
  const dealsMap = new Map()
  for (const deal of allDeals) {
    const key = deal.slug || deal.id
    if (!dealsMap.has(key)) {
      dealsMap.set(key, deal)
    } else {
      // Keep the one with more recent updatedAt
      const existing = dealsMap.get(key)
      if (deal.updatedAt > existing.updatedAt) {
        dealsMap.set(key, deal)
      }
    }
  }
  
  const uniqueDeals = Array.from(dealsMap.values())
  console.log(`📊 Unique deals after deduplication: ${uniqueDeals.length}`)
  
  // Read existing deals from output file
  let existingDeals = []
  if (fs.existsSync(OUTPUT_FILE)) {
    existingDeals = readJsonFile(OUTPUT_FILE)
    console.log(`📊 Existing deals in output file: ${existingDeals.length}`)
  }
  
  // Merge with existing (new deals take priority)
  const finalMap = new Map()
  for (const deal of existingDeals) {
    finalMap.set(deal.slug || deal.id, deal)
  }
  for (const deal of uniqueDeals) {
    finalMap.set(deal.slug || deal.id, deal)
  }
  
  const finalDeals = Array.from(finalMap.values())
  console.log(`📊 Final deal count: ${finalDeals.length}`)
  
  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  // Write consolidated deals
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalDeals, null, 2))
  console.log(`\n✅ Consolidated deals written to: ${OUTPUT_FILE}`)
  
  // Show category breakdown
  const categories = {}
  for (const deal of finalDeals) {
    const cat = deal.category || 'uncategorized'
    categories[cat] = (categories[cat] || 0) + 1
  }
  
  console.log('\n📈 Deals by category:')
  Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count}`)
    })
  
  // Check for Notion specifically
  const notionDeals = finalDeals.filter(d => 
    d.title?.toLowerCase().includes('notion') || 
    d.provider?.toLowerCase().includes('notion')
  )
  console.log(`\n🔍 Notion deals found: ${notionDeals.length}`)
  notionDeals.forEach(d => console.log(`  - ${d.title} (${d.category})`))
}

consolidateDeals()
