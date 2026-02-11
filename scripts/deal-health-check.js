#!/usr/bin/env node

/**
 * Deal Health Check Script
 * 
 * Runs daily to check the health of your deals database
 * Identifies issues and provides actionable recommendations
 * 
 * Usage: node scripts/deal-health-check.js
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkDealHealth() {
  console.log('\n🏥 Deal Health Check Report')
  console.log('=' .repeat(50))
  console.log(`Generated: ${new Date().toLocaleString()}\n`)

  try {
    // Get all deals
    const { data: deals, error } = await supabase
      .from('deals')
      .select('*')
      .is('deleted_at', null)

    if (error) throw error

    // Calculate metrics
    const metrics = {
      total: deals.length,
      active: deals.filter(d => d.status === 'active').length,
      expired: deals.filter(d => d.status === 'expired').length,
      comingSoon: deals.filter(d => d.status === 'coming-soon').length,
      featured: deals.filter(d => d.featured).length,
      verified: deals.filter(d => d.verified).length,
      
      // Issues
      expiringSoon: deals.filter(d => {
        if (!d.expiry_date) return false
        const daysUntilExpiry = Math.floor((new Date(d.expiry_date) - new Date()) / (1000 * 60 * 60 * 24))
        return daysUntilExpiry > 0 && daysUntilExpiry <= 30
      }).length,
      
      needsReview: deals.filter(d => {
        const daysSinceUpdate = Math.floor((new Date() - new Date(d.updated_at)) / (1000 * 60 * 60 * 24))
        return daysSinceUpdate > 90 && d.status === 'active'
      }).length,
      
      missingDescription: deals.filter(d => !d.description || d.description.length < 50).length,
      missingLogo: deals.filter(d => !d.logo_url).length,
      noTags: deals.filter(d => !d.tags || d.tags.length === 0).length,
    }

    // Display metrics
    console.log('📊 Overall Statistics')
    console.log('-'.repeat(50))
    console.log(`Total Deals: ${metrics.total}`)
    console.log(`Active: ${metrics.active} (${((metrics.active/metrics.total)*100).toFixed(1)}%)`)
    console.log(`Expired: ${metrics.expired}`)
    console.log(`Coming Soon: ${metrics.comingSoon}`)
    console.log(`Featured: ${metrics.featured}`)
    console.log(`Verified: ${metrics.verified}\n`)

    // Issues
    console.log('⚠️  Issues Requiring Attention')
    console.log('-'.repeat(50))
    
    if (metrics.expiringSoon > 0) {
      console.log(`🔴 ${metrics.expiringSoon} deals expiring in next 30 days`)
    }
    
    if (metrics.needsReview > 0) {
      console.log(`🟡 ${metrics.needsReview} deals not updated in 90+ days`)
    }
    
    if (metrics.missingDescription > 0) {
      console.log(`🟡 ${metrics.missingDescription} deals with short/missing descriptions`)
    }
    
    if (metrics.missingLogo > 0) {
      console.log(`🟡 ${metrics.missingLogo} deals missing logos`)
    }
    
    if (metrics.noTags > 0) {
      console.log(`🟡 ${metrics.noTags} deals without tags`)
    }

    if (metrics.expiringSoon === 0 && metrics.needsReview === 0) {
      console.log('✅ No critical issues found!')
    }

    // Category breakdown
    console.log('\n📁 Category Breakdown')
    console.log('-'.repeat(50))
    const categoryStats = {}
    deals.forEach(deal => {
      if (!categoryStats[deal.category]) {
        categoryStats[deal.category] = { total: 0, active: 0 }
      }
      categoryStats[deal.category].total++
      if (deal.status === 'active') {
        categoryStats[deal.category].active++
      }
    })

    Object.entries(categoryStats)
      .sort((a, b) => b[1].total - a[1].total)
      .forEach(([category, stats]) => {
        console.log(`${category}: ${stats.active}/${stats.total} active`)
      })

    // Recommendations
    console.log('\n💡 Recommendations')
    console.log('-'.repeat(50))
    
    if (metrics.expiringSoon > 0) {
      console.log('• Review and update expiring deals')
      console.log('  Run: node scripts/update-expiring-deals.js')
    }
    
    if (metrics.needsReview > 0) {
      console.log('• Review stale deals (90+ days old)')
      console.log('  Consider updating or archiving')
    }
    
    if (metrics.missingDescription > 0) {
      console.log('• Add detailed descriptions to improve SEO')
    }
    
    if (metrics.missingLogo > 0) {
      console.log('• Add company logos for better visual appeal')
    }
    
    if (metrics.active < metrics.total * 0.7) {
      console.log('• Consider cleaning up expired deals')
      console.log('  Run: node scripts/cleanup-deals.js')
    }

    // Health score
    const healthScore = calculateHealthScore(metrics)
    console.log('\n🎯 Overall Health Score')
    console.log('-'.repeat(50))
    console.log(`${healthScore}/100 ${getHealthEmoji(healthScore)}`)
    console.log(getHealthMessage(healthScore))

    console.log('\n' + '='.repeat(50) + '\n')

  } catch (error) {
    console.error('\n❌ Error running health check:', error.message)
    process.exit(1)
  }
}

function calculateHealthScore(metrics) {
  let score = 100

  // Deduct points for issues
  if (metrics.total === 0) return 0
  
  const activeRatio = metrics.active / metrics.total
  if (activeRatio < 0.5) score -= 20
  else if (activeRatio < 0.7) score -= 10

  if (metrics.expiringSoon > 0) score -= Math.min(15, metrics.expiringSoon * 3)
  if (metrics.needsReview > 0) score -= Math.min(15, metrics.needsReview * 2)
  if (metrics.missingDescription > 0) score -= Math.min(10, metrics.missingDescription)
  if (metrics.missingLogo > 0) score -= Math.min(10, metrics.missingLogo * 0.5)
  if (metrics.noTags > 0) score -= Math.min(10, metrics.noTags * 0.5)

  return Math.max(0, Math.round(score))
}

function getHealthEmoji(score) {
  if (score >= 90) return '🟢 Excellent'
  if (score >= 75) return '🟡 Good'
  if (score >= 60) return '🟠 Fair'
  return '🔴 Needs Attention'
}

function getHealthMessage(score) {
  if (score >= 90) return 'Your deals database is in excellent shape!'
  if (score >= 75) return 'Good health, minor improvements recommended'
  if (score >= 60) return 'Some issues need attention'
  return 'Critical issues require immediate attention'
}

// Run the health check
checkDealHealth()
