// Helper script to generate slugs for student benefits
// Run this to add slugs to all benefits that don't have them

import { studentBenefits2026 } from '../data/student-benefits-2026'
import fs from 'fs'
import path from 'path'

function generateSlug(title: string, company: string): string {
    // Create slug from title, fallback to company name if needed
    const baseSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-|-$/g, '') // Remove leading/trailing hyphens

    return baseSlug || company.toLowerCase().replace(/\s+/g, '-')
}

function addSlugsToData() {
    const updatedBenefits = studentBenefits2026.map(benefit => {
        if (!benefit.slug) {
            return {
                ...benefit,
                slug: generateSlug(benefit.title, benefit.company)
            }
        }
        return benefit
    })

    // Check for duplicate slugs
    const slugCounts = new Map<string, number>()
    updatedBenefits.forEach(benefit => {
        if (benefit.slug) {
            const count = slugCounts.get(benefit.slug) || 0
            slugCounts.set(benefit.slug, count + 1)
        }
    })

    // Report duplicates
    const duplicates = Array.from(slugCounts.entries())
        .filter(([_, count]) => count > 1)
        .map(([slug, count]) => `${slug} (${count} times)`)

    if (duplicates.length > 0) {
        console.log('⚠️  Duplicate slugs found:')
        duplicates.forEach(dup => console.log(`  - ${dup}`))
        console.log('\nYou may need to manually adjust these to be unique.')
    }

    // Generate statistics
    const withSlugs = updatedBenefits.filter(b => b.slug).length
    const withoutSlugs = updatedBenefits.length - withSlugs
    const withDescription = updatedBenefits.filter(b => b.description).length
    const withFAQ = updatedBenefits.filter(b => b.faq && b.faq.length > 0).length
    const withStats = updatedBenefits.filter(b => b.stats).length

    console.log('\n📊 Student Benefits Data Statistics:')
    console.log(`Total benefits: ${updatedBenefits.length}`)
    console.log(`With slugs: ${withSlugs} (${((withSlugs / updatedBenefits.length) * 100).toFixed(1)}%)`)
    console.log(`Without slugs: ${withoutSlugs}`)
    console.log(`With full descriptions: ${withDescription} (${((withDescription / updatedBenefits.length) * 100).toFixed(1)}%)`)
    console.log(`With FAQs: ${withFAQ} (${((withFAQ / updatedBenefits.length) * 100).toFixed(1)}%)`)
    console.log(`With stats: ${withStats} (${((withStats / updatedBenefits.length) * 100).toFixed(1)}%)`)

    // Show sample slugs
    console.log('\n📝 Sample generated slugs:')
    updatedBenefits.slice(0, 10).forEach(b => {
        console.log(`  ${b.title} → ${b.slug}`)
    })

    return updatedBenefits
}

// Run the function
console.log('🚀 Generating slugs for student benefits...\n')
const result = addSlugsToData()
console.log('\n✅ Slug generation complete!')
console.log('\nNext steps:')
console.log('1. Review the generated slugs above')
console.log('2. Check for any duplicates that need manual fixing')
console.log('3. Update the data file with slugs')
console.log('4. Add detailed descriptions, FAQs, and stats to remaining benefits')
