#!/usr/bin/env node

/**
 * Script to scan for and fix duplicate slugs in the deals JSON file
 * 
 * Usage:
 *   node scripts/fix-duplicate-slugs.js --scan     # Scan for duplicates only
 *   node scripts/fix-duplicate-slugs.js --fix      # Fix duplicates by appending numbers
 *   node scripts/fix-duplicate-slugs.js --backup   # Create backup before fixing
 */

const fs = require('fs')
const path = require('path')

const DEALS_FILE = path.join(process.cwd(), 'public', 'data', 'all-deals.json')
const BACKUP_FILE = path.join(process.cwd(), 'public', 'data', 'all-deals.backup.json')

function loadDeals() {
  try {
    const content = fs.readFileSync(DEALS_FILE, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    console.error('Error loading deals:', error.message)
    process.exit(1)
  }
}

function saveDeals(deals) {
  try {
    fs.writeFileSync(DEALS_FILE, JSON.stringify(deals, null, 2))
    console.log(`✅ Saved ${deals.length} deals to ${DEALS_FILE}`)
  } catch (error) {
    console.error('Error saving deals:', error.message)
    process.exit(1)
  }
}

function createBackup() {
  try {
    fs.copyFileSync(DEALS_FILE, BACKUP_FILE)
    console.log(`✅ Backup created at ${BACKUP_FILE}`)
  } catch (error) {
    console.error('Error creating backup:', error.message)
    process.exit(1)
  }
}

function scanForDuplicates(deals) {
  const slugCounts = {}
  const duplicates = []

  deals.forEach((deal, index) => {
    const slug = deal.slug
    if (!slug) {
      console.warn(`⚠️  Deal at index ${index} has no slug: ${deal.title || 'Unknown'}`)
      return
    }

    if (!slugCounts[slug]) {
      slugCounts[slug] = []
    }
    slugCounts[slug].push({ index, deal })
  })

  for (const [slug, occurrences] of Object.entries(slugCounts)) {
    if (occurrences.length > 1) {
      duplicates.push({ slug, occurrences })
    }
  }

  return duplicates
}

function generateUniqueSlug(baseSlug, existingSlugs) {
  let slug = baseSlug
  let counter = 2

  while (existingSlugs.has(slug)) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  return slug
}

function fixDuplicates(deals) {
  const existingSlugs = new Set()
  const fixedDeals = []
  let fixCount = 0

  for (const deal of deals) {
    if (!deal.slug) {
      // Generate slug from title if missing
      deal.slug = deal.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
    }

    if (existingSlugs.has(deal.slug)) {
      const originalSlug = deal.slug
      deal.slug = generateUniqueSlug(deal.slug, existingSlugs)
      console.log(`🔧 Fixed duplicate: "${originalSlug}" -> "${deal.slug}" (${deal.title})`)
      fixCount++
    }

    existingSlugs.add(deal.slug)
    fixedDeals.push(deal)
  }

  return { fixedDeals, fixCount }
}

function validateSlugs(deals) {
  const issues = []

  deals.forEach((deal, index) => {
    const slug = deal.slug

    // Check for empty slug
    if (!slug || slug.trim() === '') {
      issues.push({ index, deal, issue: 'Empty slug' })
      return
    }

    // Check for invalid characters
    if (!/^[a-z0-9-]+$/.test(slug)) {
      issues.push({ index, deal, issue: `Invalid characters in slug: "${slug}"` })
    }

    // Check for very long slugs
    if (slug.length > 200) {
      issues.push({ index, deal, issue: `Slug too long (${slug.length} chars): "${slug.substring(0, 50)}..."` })
    }

    // Check for leading/trailing hyphens
    if (slug.startsWith('-') || slug.endsWith('-')) {
      issues.push({ index, deal, issue: `Slug has leading/trailing hyphens: "${slug}"` })
    }

    // Check for consecutive hyphens
    if (/--+/.test(slug)) {
      issues.push({ index, deal, issue: `Slug has consecutive hyphens: "${slug}"` })
    }
  })

  return issues
}

function main() {
  const args = process.argv.slice(2)
  const shouldFix = args.includes('--fix')
  const shouldBackup = args.includes('--backup')
  const shouldScan = args.includes('--scan') || args.length === 0

  console.log('🔍 Loading deals...')
  const deals = loadDeals()
  console.log(`📊 Loaded ${deals.length} deals\n`)

  // Scan for duplicates
  console.log('🔍 Scanning for duplicate slugs...')
  const duplicates = scanForDuplicates(deals)

  if (duplicates.length === 0) {
    console.log('✅ No duplicate slugs found!\n')
  } else {
    console.log(`\n⚠️  Found ${duplicates.length} duplicate slug(s):\n`)
    duplicates.forEach(({ slug, occurrences }) => {
      console.log(`  "${slug}" appears ${occurrences.length} times:`)
      occurrences.forEach(({ index, deal }) => {
        console.log(`    - Index ${index}: ${deal.title} (ID: ${deal.id})`)
      })
      console.log('')
    })
  }

  // Validate slugs
  console.log('🔍 Validating slug formats...')
  const issues = validateSlugs(deals)

  if (issues.length === 0) {
    console.log('✅ All slugs are valid!\n')
  } else {
    console.log(`\n⚠️  Found ${issues.length} slug issue(s):\n`)
    issues.slice(0, 20).forEach(({ index, deal, issue }) => {
      console.log(`  - Index ${index}: ${issue} (${deal.title || 'Unknown'})`)
    })
    if (issues.length > 20) {
      console.log(`  ... and ${issues.length - 20} more issues`)
    }
    console.log('')
  }

  // Fix duplicates if requested
  if (shouldFix && duplicates.length > 0) {
    if (shouldBackup) {
      console.log('📦 Creating backup...')
      createBackup()
    }

    console.log('\n🔧 Fixing duplicate slugs...')
    const { fixedDeals, fixCount } = fixDuplicates(deals)

    if (fixCount > 0) {
      saveDeals(fixedDeals)
      console.log(`\n✅ Fixed ${fixCount} duplicate slug(s)`)
    } else {
      console.log('\n✅ No fixes needed')
    }
  } else if (shouldFix && duplicates.length === 0) {
    console.log('✅ No duplicates to fix')
  } else if (duplicates.length > 0) {
    console.log('💡 Run with --fix to automatically fix duplicates')
    console.log('💡 Run with --fix --backup to create a backup first')
  }

  // Summary
  console.log('\n📊 Summary:')
  console.log(`   Total deals: ${deals.length}`)
  console.log(`   Duplicate slugs: ${duplicates.length}`)
  console.log(`   Slug issues: ${issues.length}`)
}

main()
