#!/usr/bin/env node

/**
 * Backup and Clear Deals Script
 * 
 * This script will:
 * 1. Create a timestamped backup of all deals data
 * 2. Clear all deals from the active data files
 * 3. Preserve all design, architecture, and components
 * 4. Create a restore script for easy recovery
 */

const fs = require('fs')
const path = require('path')

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
const BACKUP_DIR = path.join(process.cwd(), 'backups', `deals-backup-${timestamp}`)

// Paths to backup
const PATHS_TO_BACKUP = [
  'public/data/all-deals.json',
  'data/processed-deals',
  'data/imported-deals'
]

// Paths to clear
const PATHS_TO_CLEAR = [
  'public/data/all-deals.json'
]

function createBackup() {
  console.log('\n🔄 Creating backup...\n')
  
  // Create backup directory
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true })
  }
  
  let backedUpCount = 0
  
  PATHS_TO_BACKUP.forEach(sourcePath => {
    const fullPath = path.join(process.cwd(), sourcePath)
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Skipping ${sourcePath} (not found)`)
      return
    }
    
    const destPath = path.join(BACKUP_DIR, path.basename(sourcePath))
    
    try {
      if (fs.statSync(fullPath).isDirectory()) {
        // Copy directory recursively
        copyDirRecursive(fullPath, destPath)
        console.log(`✅ Backed up directory: ${sourcePath}`)
      } else {
        // Copy file
        fs.copyFileSync(fullPath, destPath)
        console.log(`✅ Backed up file: ${sourcePath}`)
      }
      backedUpCount++
    } catch (error) {
      console.error(`❌ Error backing up ${sourcePath}:`, error.message)
    }
  })
  
  console.log(`\n📦 Backup created at: ${BACKUP_DIR}`)
  console.log(`📊 Backed up ${backedUpCount} items\n`)
  
  return BACKUP_DIR
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

function clearDeals() {
  console.log('🧹 Clearing deals data...\n')
  
  PATHS_TO_CLEAR.forEach(filePath => {
    const fullPath = path.join(process.cwd(), filePath)
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Skipping ${filePath} (not found)`)
      return
    }
    
    try {
      // Create empty array for deals
      fs.writeFileSync(fullPath, JSON.stringify([], null, 2))
      console.log(`✅ Cleared: ${filePath}`)
    } catch (error) {
      console.error(`❌ Error clearing ${filePath}:`, error.message)
    }
  })
  
  console.log('\n✨ Deals cleared successfully!\n')
}

function createRestoreScript(backupDir) {
  const restoreScriptPath = path.join(backupDir, 'RESTORE.sh')
  const restoreScript = `#!/bin/bash

# Restore Deals Backup
# Created: ${new Date().toISOString()}

echo "🔄 Restoring deals from backup..."
echo ""

# Get the project root (parent of backups directory)
PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

# Restore all-deals.json
if [ -f "all-deals.json" ]; then
  cp "all-deals.json" "$PROJECT_ROOT/public/data/all-deals.json"
  echo "✅ Restored public/data/all-deals.json"
else
  echo "⚠️  all-deals.json not found in backup"
fi

# Restore processed-deals directory
if [ -d "processed-deals" ]; then
  cp -r "processed-deals" "$PROJECT_ROOT/data/"
  echo "✅ Restored data/processed-deals"
else
  echo "⚠️  processed-deals directory not found in backup"
fi

# Restore imported-deals directory
if [ -d "imported-deals" ]; then
  cp -r "imported-deals" "$PROJECT_ROOT/data/"
  echo "✅ Restored data/imported-deals"
else
  echo "⚠️  imported-deals directory not found in backup"
fi

echo ""
echo "✨ Restore complete!"
echo ""
echo "📊 To verify, run:"
echo "   cat public/data/all-deals.json | jq 'length'"
`
  
  fs.writeFileSync(restoreScriptPath, restoreScript)
  fs.chmodSync(restoreScriptPath, '755')
  
  console.log(`📝 Created restore script: ${restoreScriptPath}\n`)
}

function createBackupInfo(backupDir) {
  const dealsPath = path.join(process.cwd(), 'public/data/all-deals.json')
  let dealCount = 0
  let recommendedCount = 0
  
  if (fs.existsSync(dealsPath)) {
    const deals = JSON.parse(fs.readFileSync(dealsPath, 'utf8'))
    dealCount = deals.length
    recommendedCount = deals.filter(d => d.recommended).length
  }
  
  const info = `# Deals Backup Information

## Backup Details
- **Created:** ${new Date().toISOString()}
- **Backup Directory:** ${backupDir}
- **Total Deals:** ${dealCount}
- **Recommended Deals:** ${recommendedCount}

## Backed Up Files
${PATHS_TO_BACKUP.map(p => `- ${p}`).join('\n')}

## How to Restore

### Option 1: Using the restore script (macOS/Linux)
\`\`\`bash
cd ${backupDir}
./RESTORE.sh
\`\`\`

### Option 2: Manual restore
\`\`\`bash
# Restore main deals file
cp ${backupDir}/all-deals.json public/data/all-deals.json

# Restore processed deals
cp -r ${backupDir}/processed-deals data/

# Restore imported deals
cp -r ${backupDir}/imported-deals data/
\`\`\`

### Option 3: Using Node.js
\`\`\`bash
node scripts/restore-deals.js ${backupDir}
\`\`\`

## Verification

After restoring, verify the data:

\`\`\`bash
# Check deal count
cat public/data/all-deals.json | jq 'length'

# Check recommended deals
node scripts/manage-recommended.js count
\`\`\`

## Notes

- All design components remain unchanged
- All page layouts remain unchanged
- All API routes remain unchanged
- Only the deals data has been cleared
- You can safely import new deals and they will use the same architecture
`
  
  const infoPath = path.join(backupDir, 'README.md')
  fs.writeFileSync(infoPath, info)
  
  console.log(`📄 Created backup info: ${infoPath}\n`)
}

// Main execution
console.log('\n' + '='.repeat(60))
console.log('  BACKUP AND CLEAR DEALS')
console.log('='.repeat(60))

const backupDir = createBackup()
createRestoreScript(backupDir)
createBackupInfo(backupDir)
clearDeals()

console.log('='.repeat(60))
console.log('✅ BACKUP AND CLEAR COMPLETE')
console.log('='.repeat(60))
console.log(`\n📦 Backup location: ${backupDir}`)
console.log(`\n🔄 To restore, run:`)
console.log(`   cd ${backupDir} && ./RESTORE.sh`)
console.log(`\n📝 See ${path.join(backupDir, 'README.md')} for details\n`)
