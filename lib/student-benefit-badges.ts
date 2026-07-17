/**
 * Student benefit card badges — aligned with commercial deals:
 * Popular / Recommended for high-value offers, not raw "Discount".
 */

import type { StudentBenefit } from '@/data/student-benefits-2026'

export type StudentBadge = {
  label: string
  color: string // tailwind bg-* class
}

const PRIORITY_BRANDS = [
  'github',
  'figma',
  'microsoft',
  'adobe',
  'google',
  'aws',
  'amazon',
  'notion',
  'spotify',
  'apple',
  'jetbrains',
  'autodesk',
  'canva',
  'unity',
  'slack',
  'linkedin',
  'openai',
  'cursor',
  'framer',
  'gitlab',
  'miro',
  'dashlane',
  '1password',
  'dropbox',
  'zoom',
  'linkedin',
  'nytimes',
  'new york times',
  'wall street journal',
  'economist',
  'github student',
  'azure',
  'digitalocean',
  'heroku',
  'mongodb',
  'jetbrains',
]

function offerBlob(b: StudentBenefit): string {
  return [b.title, b.company, b.value, b.benefitType, b.offerSummary]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function isPriorityBrand(b: StudentBenefit): boolean {
  const name = `${b.company} ${b.title}`.toLowerCase()
  return PRIORITY_BRANDS.some((p) => name.includes(p))
}

/** Largest dollar amount mentioned ($480, 200+, etc.) */
function extractDollarValue(text: string): number {
  if (!text) return 0
  let max = 0
  const re = /\$\s*([\d,]+(?:\.\d+)?)\s*([kmb])?/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    let n = parseFloat(m[1].replace(/,/g, ''))
    if (!Number.isFinite(n)) continue
    const s = (m[2] || '').toLowerCase()
    if (s === 'k') n *= 1_000
    else if (s === 'm') n *= 1_000_000
    if (n > max) max = n
  }
  // bare "480/yr savings" without $ is rare; also "10,000 credits"
  const credits = text.match(/([\d,]+)\s*credits?/i)
  if (credits) {
    const n = parseInt(credits[1].replace(/,/g, ''), 10)
    if (n > max) max = n
  }
  return max
}

function extractPercentOff(text: string): number {
  const m = text.match(/(\d{1,3})\s*%\s*off/i)
  if (!m) return 0
  return parseInt(m[1], 10) || 0
}

function isFullyFree(b: StudentBenefit, blob: string): boolean {
  const type = (b.benefitType || '').toLowerCase()
  const value = (b.value || '').toLowerCase().trim()
  if (type === 'free' || type.includes('free license') || type.includes('free pro')) return true
  if (value === 'free' || value === 'free forever') return true
  if (/100%\s*off/i.test(blob)) return true
  if (/free\s+(for\s+)?(1|one)\s+year|12\s+months?\s+free|1\s+year\s+free/i.test(blob)) {
    return true
  }
  if (/free\s+(pro|team|premium|student)\s+(plan|license|tier)/i.test(blob)) return true
  return false
}

function isCreditsOffer(b: StudentBenefit, blob: string): boolean {
  const type = (b.benefitType || '').toLowerCase()
  if (type.includes('credit')) return true
  if (/\bcredits?\b/i.test(blob) && !/credit card/i.test(blob)) return true
  return false
}

function isFundingOffer(b: StudentBenefit): boolean {
  const type = (b.benefitType || '').toLowerCase()
  const cat = (b.appCategory || '').toLowerCase()
  return (
    type.includes('grant') ||
    type.includes('scholarship') ||
    type.includes('fellowship') ||
    type.includes('funding') ||
    type.includes('prize') ||
    cat.includes('funding') ||
    cat.includes('venture')
  )
}

function isProgramOffer(b: StudentBenefit): boolean {
  const type = (b.benefitType || '').toLowerCase()
  const cat = (b.appCategory || '').toLowerCase()
  return type === 'program' || cat === 'programs' || cat.includes('incubator')
}

/**
 * Badge for student benefit cards — Popular / Recommended for standout offers.
 */
export function getStudentBenefitBadge(b: StudentBenefit): StudentBadge | null {
  const blob = offerBlob(b)
  const dollars = extractDollarValue(`${b.value} ${b.title} ${b.offerSummary}`)
  const pct = extractPercentOff(blob)
  const free = isFullyFree(b, blob)
  const priority = isPriorityBrand(b)
  const credits = isCreditsOffer(b, blob)
  const funding = isFundingOffer(b)
  const program = isProgramOffer(b)

  // ── Popular: flagship free / mega savings / top brands with real value ──
  if (
    (free && (priority || dollars >= 50)) ||
    (priority && dollars >= 100) ||
    dollars >= 200 ||
    pct >= 80 ||
    (free && /1\s*year|12\s*months|forever|pro license/i.test(blob)) ||
    (credits && dollars >= 1000)
  ) {
    return { label: 'Popular', color: 'bg-orange-500' }
  }

  // ── Recommended: solid student value ──
  if (
    priority ||
    free ||
    dollars >= 50 ||
    pct >= 40 ||
    (credits && dollars >= 100) ||
    (funding && dollars >= 1000)
  ) {
    return { label: 'Recommended', color: 'bg-orange-500' }
  }

  // ── Category-specific clean labels (never raw "Discount") ──
  if (funding) {
    const t = (b.benefitType || '').toLowerCase()
    if (t.includes('scholarship')) return { label: 'Scholarship', color: 'bg-violet-500' }
    if (t.includes('grant')) return { label: 'Grant', color: 'bg-violet-500' }
    if (t.includes('fellowship')) return { label: 'Fellowship', color: 'bg-violet-500' }
    return { label: 'Funding', color: 'bg-violet-500' }
  }

  if (program) {
    return { label: 'Program', color: 'bg-indigo-500' }
  }

  if (credits) {
    return { label: 'Credits', color: 'bg-sky-500' }
  }

  if (free) {
    return { label: 'Free', color: 'bg-sky-500' }
  }

  // Credits & savings / lifestyle discounts
  if (
    (b.appCategory || '').includes('Credits') ||
    (b.appCategory || '').includes('Lifestyle') ||
    (b.benefitType || '').toLowerCase().includes('discount') ||
    pct > 0 ||
    dollars > 0
  ) {
    if (pct >= 25 || dollars >= 25) {
      return { label: 'Savings', color: 'bg-sky-500' }
    }
    return { label: 'Student deal', color: 'bg-sky-600' }
  }

  // Software subscriptions / licenses with modest value
  if ((b.benefitType || '').toLowerCase().includes('subscription')) {
    return { label: 'Student plan', color: 'bg-violet-500' }
  }
  if ((b.benefitType || '').toLowerCase().includes('license')) {
    return { label: 'License', color: 'bg-violet-500' }
  }
  if ((b.benefitType || '').toLowerCase().includes('trial')) {
    return { label: 'Trial', color: 'bg-blue-500' }
  }

  return { label: 'Student deal', color: 'bg-gray-600' }
}
