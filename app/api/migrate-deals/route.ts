import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
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

// ... (skipping up to the GET function)

export async function GET(request: Request) {
  // 🔒 SECURITY VULNERABILITY PATCH: Prevent unauthorized access to destructive migration endpoints
  if (process.env.NODE_ENV === 'production') {
    const authHeader = request.headers.get('authorization')
    // We check against the service role key as a secure secret (do NOT pass this in URL query params)
    if (!authHeader || authHeader !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
      return NextResponse.json({ error: 'Forbidden: Migration endpoint is locked in production.' }, { status: 403 })
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  let allDeals: Deal[] = [];

  // 1. Get manually added deals from JSON
  const PUBLIC_DEALS_PATH = path.join(process.cwd(), 'public', 'data', 'all-deals.json');
  if (fs.existsSync(PUBLIC_DEALS_PATH)) {
    const data = fs.readFileSync(PUBLIC_DEALS_PATH, 'utf8');
    try {
      const jsonDeals = JSON.parse(data);
      if (Array.isArray(jsonDeals)) {
        allDeals = [...allDeals, ...jsonDeals];
      }
    } catch (e) {
      console.error('Error parsing public deals JSON:', e);
    }
  }

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

  // 3. Upsert them into Supabase
  for (const deal of allDeals) {
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
    }, { onConflict: 'slug' });

    if (error) {
      console.error(`Error migrating deal ${deal.slug}:`, error.message);
      errors.push({ slug: deal.slug, error: error.message });
      errorCount++;
    } else {
      successCount++;
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
