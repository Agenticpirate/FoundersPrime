/**
 * Unified programs catalog — static TS files + founder programs rescued from
 * the student-benefits dataset + optional Supabase program rows.
 *
 * Note: when student-benefits was segregated, founder/startup-eligibility rows
 * were HIDDEN from /student-benefits but never copied elsewhere. We surface
 * those here so nothing is orphaned.
 */
import { accelerators2026, type Accelerator } from '@/data/accelerators-2026'
import { incubators2026, type Incubator } from '@/data/incubators-2026'
import { grants2026, type Grant } from '@/data/grants-2026'
import { studentBenefits2026, type StudentBenefit } from '@/data/student-benefits-2026'
import {
  classifyProgramKind,
  isStudentCatalogEligibility,
  type ProgramKind,
} from '@/lib/catalog-segregation'

export type UnifiedProgram = {
  id: string
  slug: string
  name: string
  type: ProgramKind
  logo?: string
  website?: string
  applicationLink?: string
  description: string
  region: string
  location?: string
  funding: string
  equity: string
  duration: string
  applicationStatus: string
  focusArea?: string
  founderStage?: string
  source: 'static' | 'supabase'
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function fromAccelerator(a: Accelerator): UnifiedProgram {
  return {
    id: a.id,
    slug: a.slug || slugify(a.name),
    name: a.name,
    type: 'accelerator',
    logo: a.logo,
    website: a.website,
    applicationLink: a.applicationLink || a.website,
    description: a.description || '',
    region: a.region || 'Global',
    location: a.location,
    funding: a.investment || 'N/A',
    equity: a.equity || 'N/A',
    duration: a.programDuration || 'Varies',
    applicationStatus: a.applicationStatus || 'Active',
    focusArea: a.focusArea,
    founderStage: a.founderStage,
    source: 'static',
  }
}

function fromIncubator(i: Incubator): UnifiedProgram {
  return {
    id: i.id,
    slug: i.slug || slugify(i.name),
    name: i.name,
    type: 'incubator',
    logo: i.logo,
    website: i.website,
    applicationLink: i.applicationLink || i.website,
    description: i.description || '',
    region: i.region || 'Global',
    location: i.location,
    funding: i.support || 'N/A',
    equity: i.equity || 'N/A',
    duration: i.programDuration || 'Varies',
    applicationStatus: i.applicationStatus || 'Active',
    focusArea: i.focusArea,
    founderStage: i.founderStage,
    source: 'static',
  }
}

function fromGrant(g: Grant): UnifiedProgram {
  return {
    id: g.id,
    slug: g.slug || slugify(g.name),
    name: g.name,
    type: 'grant',
    logo: g.logo,
    website: g.website,
    applicationLink: g.applicationLink || g.website,
    description: g.description || '',
    region: g.region || 'Global',
    funding: g.fundingAmount || 'N/A',
    equity: g.equity || '0%',
    duration: g.deadline || 'N/A',
    applicationStatus: g.applicationStatus || 'Active',
    source: 'static',
  }
}

/**
 * Founder/startup programs that lived in student-benefits data but are not
 * student-eligible → belong on /programs, not /student-benefits.
 */
function fromStudentBenefitProgram(b: StudentBenefit): UnifiedProgram {
  const name = (b.company || b.title || '').trim() || 'Program'
  const slug = b.slug || slugify(name)
  const blob = `${b.appCategory || ''} ${b.category || ''} ${b.title || ''} ${b.offerSummary || ''}`
  const lower = blob.toLowerCase()
  let type: ProgramKind = 'accelerator'
  if (lower.includes('incubator')) type = 'incubator'
  else if (lower.includes('grant') || lower.includes('fellowship') || b.appCategory === 'Funding & Opportunities') {
    type = 'grant'
  } else if (lower.includes('accelerator') || b.appCategory === 'Accelerators') {
    type = 'accelerator'
  } else if (b.appCategory === 'Programs' || b.appCategory === 'Incubators') {
    type = b.appCategory === 'Incubators' ? 'incubator' : 'accelerator'
  }

  return {
    id: `sb-${slug}`,
    slug,
    name,
    type,
    logo: b.logo,
    website: b.url,
    applicationLink: b.claimUrl || b.url,
    description: b.description || b.offerSummary || '',
    region: b.region || 'Global',
    funding: b.value || 'N/A',
    equity: 'N/A',
    duration: 'Varies',
    applicationStatus: 'Active',
    focusArea: (b.tags || []).slice(0, 4).join(', ') || b.category,
    founderStage: b.eligibility,
    source: 'static',
  }
}

/** Founder-only rows still sitting in the student benefits JSON */
export function getProgramsFromStudentDataset(): UnifiedProgram[] {
  return studentBenefits2026
    .filter((b) => !isStudentCatalogEligibility(b.eligibility))
    .map(fromStudentBenefitProgram)
}

/** Static baseline catalog (always available offline). */
export function getStaticPrograms(): UnifiedProgram[] {
  const core = [
    ...accelerators2026.map(fromAccelerator),
    ...incubators2026.map(fromIncubator),
    ...grants2026.map(fromGrant),
  ]
  // Merge rescued founder programs (don't overwrite richer static rows)
  return mergePrograms(core, getProgramsFromStudentDataset())
}

/** Map a Supabase deal-shaped program into UnifiedProgram */
export function fromSupabaseProgram(d: {
  id?: string
  slug?: string
  title?: string
  provider?: string
  category?: string
  subcategory?: string
  description?: string
  shortDescription?: string
  value?: string
  savings?: string
  logoUrl?: string
  applicationUrl?: string
  providerWebsite?: string
  status?: string
  tags?: string[]
  eligibility?: string[]
}): UnifiedProgram | null {
  const name = (d.title || d.provider || '').trim()
  if (!name) return null
  const slug = d.slug || slugify(name)
  const kind = classifyProgramKind({
    category: d.category,
    subcategory: d.subcategory,
    title: d.title,
    tags: d.tags,
    description: d.description,
  })
  // Map kind grant/accelerator/incubator; "program" treated as accelerator for grid tabs
  const type: ProgramKind =
    kind === 'program' ? 'accelerator' : kind

  return {
    id: String(d.id || slug),
    slug,
    name,
    type,
    logo: d.logoUrl,
    website: d.providerWebsite || d.applicationUrl,
    applicationLink: d.applicationUrl || d.providerWebsite,
    description: d.shortDescription || d.description || '',
    region: 'Global',
    funding: d.value || 'N/A',
    equity: d.savings || 'N/A',
    duration: 'Varies',
    applicationStatus: d.status === 'active' || !d.status ? 'Active' : d.status,
    focusArea: (d.tags || []).join(', ') || undefined,
    founderStage: d.eligibility?.[0],
    source: 'supabase',
  }
}

/**
 * Merge static + remote; static wins on slug collision (richer fields).
 */
export function mergePrograms(
  staticList: UnifiedProgram[],
  remoteList: UnifiedProgram[]
): UnifiedProgram[] {
  const bySlug = new Map<string, UnifiedProgram>()
  for (const p of remoteList) {
    bySlug.set(p.slug.toLowerCase(), p)
  }
  for (const p of staticList) {
    bySlug.set(p.slug.toLowerCase(), p) // static overwrites
  }
  // Also dedupe by normalized name
  const byName = new Map<string, UnifiedProgram>()
  for (const p of bySlug.values()) {
    const key = p.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    const existing = byName.get(key)
    if (!existing || (existing.source === 'supabase' && p.source === 'static')) {
      byName.set(key, p)
    }
  }
  return Array.from(byName.values()).sort((a, b) => a.name.localeCompare(b.name))
}

export function getStaticProgramCounts() {
  const all = getStaticPrograms()
  return {
    accelerators: all.filter((p) => p.type === 'accelerator').length,
    incubators: all.filter((p) => p.type === 'incubator').length,
    grants: all.filter((p) => p.type === 'grant').length,
    total: all.length,
  }
}
