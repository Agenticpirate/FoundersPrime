import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { safeSecretEqual, getBearerToken } from '@/lib/auth/secret-compare';
import { accelerators2026 } from '@/data/accelerators-2026';
import { grants2026 } from '@/data/grants-2026';
import { incubators2026 } from '@/data/incubators-2026';
import { Deal } from '@/lib/deals-database';

// Helper to normalize the static typescript files
function normalizeLocalDeal(deal: any, category: string, subCategory: string): Deal {
  return {
    id: deal.id,
    slug: deal.slug,
    title: deal.name,
    provider: deal.organization || deal.name,
    category: category,
    subcategory: subCategory,
    description: deal.description,
    shortDescription: deal.description?.substring(0, 150) + '...',
    value: deal.fundingAmount || deal.investment || deal.support || 'Varies',
    eligibility: [deal.eligibility || deal.founderStage, deal.focusArea].filter(Boolean),
    requirements: [],
    applicationProcess: ['Visit website to apply'],
    tags: [subCategory, deal.type, ...(deal.features || [])].filter(Boolean) as string[],
    status: deal.applicationStatus === 'Active' ? 'active' : 'expired',
    applicationUrl: deal.applicationLink || deal.website,
    providerWebsite: deal.website,
    logoUrl: deal.logo || '',
    featured: false,
    recommended: false,
    verified: true,
    difficulty: 'medium',
    timeToApply: 'Varies',
    lastUpdated: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sourceVerified: true,
    dataSource: 'import',
    // fields for Deal interface
    originalPrice: '',
    discountedPrice: '',
    savings: '',
    proTips: [],
    expiryDate: '',
    successRate: ''
  };
}

import { createClient } from '@supabase/supabase-js';

/** Module-scoped path — avoid re-resolving + re-reading string path on every request */
const PUBLIC_DEALS_PATH = path.join(process.cwd(), 'public', 'data', 'all-deals.json')

function loadPublicDealsJson(): Deal[] {
  if (!fs.existsSync(PUBLIC_DEALS_PATH)) return []
  try {
    const data = fs.readFileSync(PUBLIC_DEALS_PATH, 'utf8')
    const jsonDeals = JSON.parse(data)
    return Array.isArray(jsonDeals) ? jsonDeals : []
  } catch (e) {
    console.error('Error parsing public deals JSON:', e)
    return []
  }
}

// ... (skipping up to the GET function)

/**
 * Destructive migration — POST only (GET is CSRF/prefetch-prone).
 * Auth: Bearer MIGRATION_SECRET. Disabled in production unless ALLOW_MIGRATE_DEALS=true.
 */
export async function GET() {
  return NextResponse.json(
    {
      error: 'Method not allowed. Use POST with Authorization: Bearer <MIGRATION_SECRET>.',
    },
    { status: 405, headers: { Allow: 'POST' } }
  )
}

export async function POST(request: Request) {
  // Hard-disable in production. One-off migration tooling must not stay live
  // on the public origin even when a secret is configured.
  if (process.env.NODE_ENV === 'production' && process.env.ALLOW_MIGRATE_DEALS !== 'true') {
    return NextResponse.json(
      {
        error:
          'Migration endpoint is disabled in production. Set ALLOW_MIGRATE_DEALS=true only for a controlled one-off run, then remove it.',
      },
      { status: 404 }
    )
  }

  // 🔒 Destructive endpoint: requires a dedicated secret in ALL environments.
  // MIGRATION_SECRET must be set; the service role key is intentionally NOT
  // accepted (it bypasses RLS and must never travel in request headers).
  const expected = process.env.MIGRATION_SECRET
  const token = getBearerToken(request.headers.get('authorization'))
  if (!expected || !safeSecretEqual(token, expected)) {
    return NextResponse.json(
      { error: 'Forbidden: migration endpoint requires a valid MIGRATION_SECRET bearer token.' },
      { status: 403 }
    )
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  let allDeals: Deal[] = loadPublicDealsJson();

  // 2. Aggregate from TypeScript data files
  const acceleratedDeals = accelerators2026.map(d => normalizeLocalDeal(d, 'startup-programs', 'accelerators'));
  const grantDeals = grants2026.map(d => normalizeLocalDeal(d, 'startup-programs', 'grants'));
  const incubatorDeals = incubators2026.map(d => normalizeLocalDeal(d, 'startup-programs', 'incubators'));

  // Merge them (no slug collisions)
  const existingSlugs = new Set(allDeals.map(d => d.slug));
  const newDeals = [...acceleratedDeals, ...grantDeals, ...incubatorDeals].filter(d => !existingSlugs.has(d.slug));
  allDeals = [...allDeals, ...newDeals];

  let successCount = 0;
  let errorCount = 0;
  let errors: any[] = [];

  console.log(`🚀 Starting migration of ${allDeals.length} deals to Supabase...`);

  // 3. Upsert into Supabase in parallel chunks (same writes, less sequential wait)
  const CHUNK = 20
  for (let i = 0; i < allDeals.length; i += CHUNK) {
    const chunk = allDeals.slice(i, i + CHUNK)
    const results = await Promise.all(
      chunk.map(async (deal) => {
        const { error } = await supabase.from('deals').upsert({
          slug: deal.slug,
          title: deal.title || deal.provider,
          provider: deal.provider,
          category: deal.category || '',
          subcategory: deal.subcategory || '',
          description: deal.description || '',
          shortDescription: deal.shortDescription || '',
          value: deal.value || '',
          originalPrice: deal.originalPrice || '',
          discountedPrice: deal.discountedPrice || '',
          savings: deal.savings || '',
          eligibility: deal.eligibility || [],
          requirements: deal.requirements || [],
          applicationProcess: deal.applicationProcess || [],
          proTips: deal.proTips || [],
          tags: deal.tags || [],
          status: deal.status || 'active',
          expiryDate: deal.expiryDate || '',
          applicationUrl: deal.applicationUrl || '',
          application_url: deal.applicationUrl || '',
          providerWebsite: deal.providerWebsite || '',
          provider_website: deal.providerWebsite || '',
          logoUrl: deal.logoUrl || '',
          logo_url: deal.logoUrl || '',
          featured: deal.featured || false,
          recommended: deal.recommended || false,
          verified: deal.verified !== false,
          difficulty: deal.difficulty || 'medium',
          timeToApply: deal.timeToApply || '15 minutes',
          successRate: deal.successRate || '',
          lastUpdated: deal.lastUpdated || new Date().toISOString(),
          created_at: deal.createdAt || new Date().toISOString(),
          updated_at: new Date().toISOString(),
          sourceVerified: deal.sourceVerified !== false,
          dataSource: deal.dataSource || 'supabase'
        }, { onConflict: 'slug' })
        return { slug: deal.slug, error }
      })
    )
    for (const r of results) {
      if (r.error) {
        console.error(`Error migrating deal ${r.slug}:`, r.error.message)
        errors.push({ slug: r.slug, error: r.error.message })
        errorCount++
      } else {
        successCount++
      }
    }
  }

  return NextResponse.json({
    message: 'Migration complete',
    attempted: allDeals.length,
    successes: successCount,
    failures: errorCount,
    errors
  });
}
