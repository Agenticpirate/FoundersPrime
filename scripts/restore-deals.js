#!/usr/bin/env node

/**
 * Restore Deals from Backup
 * 
 * Usage: node scripts/restore-deals.js <backup-directory>
 * Example: node scripts/restore-deals.js backups/deals-backup-2026-01-21T01-32-07
 */

const fs = require('fs')
const path = require('path')

const backupDir = process.argv[2]

if (!backupDir) {
  console.error('\n❌ Error: Please provide a backup directory\n')
  console.log('Usage: node scripts/restore-deals.js <backup-directory>\n')
  console.log('Example: node scripts/restore-deals.js backups/deals-backup-2026-01-21T01-32-07\n')
  
  // List available backups
  const backupsDir = path.join(process.cwd(), 'backups')
  if (fs.existsSync(backupsDir)) {
    const backups = fs.readdirSync(backupsDir).filter(f => f.startsWith('deals-backup-'))
    if (backups.length > 0) {
      console.log('Available backups:')
      backups.forEach(backup => {
        console.log(`  - backups/${backup}`)
      })
      console.log('')
    }
  }
  
  process.exit(1)
}

const fullBackupPath = path.isAbsolute(backupDir) 
  ? backupDir 
  : path.join(process.cwd(), backupDir)

if (!fs.existsSync(fullBackupPath)) {
  console.error(`\n❌ Error: Backup directory not found: ${fullBackupPath}\n`)
  process.exit(1)
}

console.log('\n' + '='.repeat(60))
console.log('  RESTORE DEALS FROM BACKUP')
console.log('='.repeat(60))
console.log(`\n📦 Restoring from: ${fullBackupPath}\n`)

let restoredCount = 0

// Restore all-deals.json
const dealsBackupPath = path.join(fullBackupPath, 'all-deals.json')
const dealsDestPath = path.join(process.cwd(), 'public/data/all-deals.json')

if (fs.existsSync(dealsBackupPath)) {
  const destDir = path.dirname(dealsDestPath)
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }
  fs.copyFileSync(dealsBackupPath, dealsDestPath)
  
  const deals = JSON.parse(fs.readFileSync(dealsDestPath, 'utf8'))
  console.log(`✅ Restored public/data/all-deals.json (${deals.length} deals)`)
  restoredCount++
} else {
  console.log('⚠️  all-deals.json not found in backup')
}

// Restore processed-deals directory
const processedBackupPath = path.join(fullBackupPath, 'processed-deals')
const processedDestPath = path.join(process.cwd(), 'data/processed-deals')

if (fs.existsSync(processedBackupPath)) {
  if (fs.existsSync(processedDestPath)) {
    fs.rmSync(processedDestPath, { recursive: true, force: true })
  }
  copyDirRecursive(processedBackupPath, processedDestPath)
  console.log('✅ Restored data/processed-deals')
  restoredCount++
} else {
  console.log('⚠️  processed-deals directory not found in backup')
}

// Restore imported-deals directory
const importedBackupPath = path.join(fullBackupPath, 'imported-deals')
const importedDestPath = path.join(process.cwd(), 'data/imported-deals')

if (fs.existsSync(importedBackupPath)) {
  if (fs.existsSync(importedDestPath)) {
    fs.rmSync(importedDestPath, { recursive: true, force: true })
  }
  copyDirRecursive(importedBackupPath, importedDestPath)
  console.log('✅ Restored data/imported-deals')
  restoredCount++
} else {
  console.log('⚠️  imported-deals directory not found in backup')
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true })
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

console.log('\n' + '='.repeat(60))
console.log('✅ RESTORE COMPLETE')
console.log('='.repeat(60))
console.log(`\n📊 Restored ${restoredCount} items\n`)
console.log('🔍 To verify, run:')
console.log('   cat public/data/all-deals.json | jq "length"')
console.log('   node scripts/manage-recommended.js count\n')
