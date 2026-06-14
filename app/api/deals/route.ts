import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { Deal } from '@/lib/deals-database'
import fs from 'fs'
import path from 'path'

// Defensive upper bound on how many rows a single list request will ever
// load/serialize. The /deals UI fetches the whole catalog (client-side
// search/sort/pagination), so there is intentionally no offset pagination —
// but this cap guarantees the route degrades gracefully (bounded memory +
// payload) instead of crashing if the table ever grows unexpectedly large.
const LIST_HARD_CAP = 5000

// Priority brands marked as "recommended". Hoisted to module scope so it is
// allocated once per process instead of rebuilt on every request.
const RECOMMENDED_KEYWORDS = [
  'github', 'airtable', 'aws', 'google for startups', 'microsoft for startups',
  'microsoft founders hub', 'linear', 'stripe', 'notion', 'webflow',
  'alibaba', 'algolia', 'auth0', 'cloudflare', 'customer.io', 'datadog',
  'databricks', 'devrev', 'digitalocean', 'document360', 'elevenlabs', 'eleven labs',
  'flippa', 'framer', 'gitlab', 'heroku', 'instatus', 'intercom', 'linkedin ads'
] as const

// Check if Supabase is properly configured (not placeholder values)
function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!(
    url && key &&
    url !== 'http://localhost:54321' &&
    key !== 'placeholder-anon-key' &&
    key.length > 20
  )
}

// Load deals from local JSON file
let jsonDealsCache: any[] | null = null
let jsonCacheTime = 0
const JSON_CACHE_TTL = 1000 * 60 * 5 // 5 minutes

function loadLocalDeals(): any[] {
  const now = Date.now()
  if (jsonDealsCache && (now - jsonCacheTime < JSON_CACHE_TTL)) {
    return jsonDealsCache
  }
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'all-deals.json')
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8')
      jsonDealsCache = JSON.parse(content)
      jsonCacheTime = now
      return jsonDealsCache || []
    }
  } catch (error) {
    console.error('Error loading local deals:', error)
  }
  return []
}

// Helper: verify caller is an active admin
async function assertAdmin(): Promise<NextResponse | null> {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, error: 'Admin not available in local mode' }, { status: 403 })
  }
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('role')
    .eq('email', user.email)
    .eq('is_active', true)
    .single()
  if (!adminUser) {
    console.error(`🚨 Unauthorized write attempt on /api/deals by ${user.email}`)
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  }
  return null // authorised
}

// Flush ISR cache for affected deal pages after a write so admin edits go live
// immediately instead of waiting for the hourly `revalidate` window. Always
// refreshes the deals listing; refreshes specific deal detail pages when slugs
// are known. Never throws — revalidation is best-effort.
function revalidateDeals(slugs: (string | undefined)[] = []) {
  try {
    revalidatePath('/deals')
    const unique = Array.from(new Set(slugs.filter((s): s is string => !!s)))
    for (const slug of unique) {
      revalidatePath(`/deals/${slug}`)
    }
  } catch (err) {
    console.error('Deal revalidation failed (non-fatal):', err)
  }
}

// GET - Fetch all deals (from Supabase if configured, otherwise from local JSON)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');
    const featured = searchParams.get('featured');
    const recommended = searchParams.get('recommended');
    const limit = searchParams.get('limit');

    let deals: Deal[];

    if (isSupabaseConfigured()) {
      // Use Supabase
      const supabase = createClient();
      const isSingleLookup = !!(slug || id);

      let query = supabase.from('deals').select(
        isSingleLookup
          ? '*'
          : 'id,slug,title,provider,category,subcategory,shortDescription,short_description,value,status,featured,recommended,verified,difficulty,timeToApply,time_to_apply,tags,logoUrl,logo_url,applicationUrl,application_url,expiryDate,expiry_date'
      );

      if (slug) query = query.eq('slug', slug);
      if (id) query = query.eq('id', id);
      if (status && status !== 'all') query = query.eq('status', status);
      if (featured === 'true') query = query.eq('featured', true);
      if (recommended === 'true') query = query.eq('recommended', true);

      if (category && category !== 'all') {
        if (category === 'ai') {
          query = query.eq('category', 'ai');
        } else {
          query = query.or(`category.eq.${category},subcategory.eq.${category}`);
        }
      }

      if (limit) {
        query = query.limit(parseInt(limit))
      } else if (!isSingleLookup) {
        // No explicit limit on a list query — apply the defensive cap so the
        // response stays bounded under heavy growth.
        query = query.limit(LIST_HARD_CAP)
      }

      const { data: rawDeals, error } = await query;
      if (error) throw error;
      deals = (rawDeals || []).map(formatDealFromDB);
    } else {
      // Use local JSON fallback
      let allDeals = loadLocalDeals();

      // Apply filters on local data
      if (slug) {
        allDeals = allDeals.filter((d: any) => d.slug === slug);
      }
      if (id) {
        allDeals = allDeals.filter((d: any) => d.id === id);
      }
      if (status && status !== 'all') {
        allDeals = allDeals.filter((d: any) => d.status === status);
      }
      if (featured === 'true') {
        allDeals = allDeals.filter((d: any) => d.featured === true);
      }
      if (recommended === 'true') {
        allDeals = allDeals.filter((d: any) => d.recommended === true);
      }
      if (category && category !== 'all') {
        if (category === 'ai') {
          allDeals = allDeals.filter((d: any) => d.category === 'ai');
        } else {
          allDeals = allDeals.filter((d: any) => d.category === category || d.subcategory === category);
        }
      }
      if (limit) {
        allDeals = allDeals.slice(0, parseInt(limit));
      } else if (!slug && !id) {
        allDeals = allDeals.slice(0, LIST_HARD_CAP);
      }

      deals = allDeals as Deal[];
    }

    // Apply search filter (works for both sources)
    if (search) {
      const searchLower = search.toLowerCase();
      deals = deals.filter(d =>
        d.title?.toLowerCase().includes(searchLower) ||
        d.provider?.toLowerCase().includes(searchLower) ||
        d.description?.toLowerCase().includes(searchLower) ||
        d.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Override: no deals are featured, mark priority deals as recommended
    deals = deals.map(d => {
      const titleLower = (d.title || '').toLowerCase();
      const providerLower = (d.provider || '').toLowerCase();
      const isRecommended = RECOMMENDED_KEYWORDS.some(kw => titleLower.includes(kw) || providerLower.includes(kw));
      return { ...d, featured: false, recommended: isRecommended } as Deal;
    });

    // Single deal lookup return
    if (slug || id) {
      if (deals.length > 0) {
        return NextResponse.json(
          { success: true, deal: deals[0] },
          { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } }
        );
      }
      return NextResponse.json({ success: false, error: 'Deal not found' }, { status: 404 });
    }

    // Stats
    const stats = {
      total: deals.length,
      active: deals.filter(d => d.status === 'active').length,
      expired: deals.filter(d => d.status === 'expired').length,
      featured: deals.filter(d => d.featured).length,
      recommended: deals.filter((d: any) => d.recommended).length,
      byCategory: deals.reduce((acc: Record<string, number>, d) => {
        acc[d.category] = (acc[d.category] || 0) + 1;
        return acc;
      }, {})
    }

    return NextResponse.json(
      { success: true, deals, count: deals.length, stats },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
          'CDN-Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
          'Vary': 'Accept-Encoding',
        }
      }
    );
  } catch (error) {
    console.error('Error fetching deals:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to load deals'
    }, { status: 500 });
  }
}


// POST - Create new deal(s)
export async function POST(request: NextRequest) {
  const authError = await assertAdmin();
  if (authError) return authError;

  const supabase = createClient();

  try {
    const body = await request.json();

    if (body.deals && Array.isArray(body.deals)) {
      const newDeals = body.deals.map((deal: any) => formatDealToDB(normalizeDeal(deal, 'import')));
      
      const { error, data } = await supabase.from('deals').upsert(newDeals, { onConflict: 'slug' }).select();
      if (error) throw error;

      revalidateDeals(newDeals.map((d: any) => d.slug));

      return NextResponse.json({
        success: true,
        message: `Processed bulk import of ${newDeals.length} deals`,
        totalDeals: data?.length || 0,
        added: newDeals.length,
      });
    }

    // Single deal
    const deal = normalizeDeal(body, 'manual');
    const { data, error } = await supabase.from('deals').insert(formatDealToDB(deal)).select().single();

    if (error) {
      if (error.code === '23505') { // unique violation
        return NextResponse.json({ success: false, error: 'Deal slug already exists' }, { status: 400 });
      }
      throw error;
    }

    revalidateDeals([data?.slug]);

    return NextResponse.json({
      success: true,
      deal: formatDealFromDB(data),
      message: 'Deal created successfully'
    });
  } catch (error: any) {
    console.error('Error creating deal:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create deal'
    }, { status: 500 });
  }
}

// PUT - Update existing deal
export async function PUT(request: NextRequest) {
  const authError = await assertAdmin();
  if (authError) return authError;

  const supabase = createClient();

  try {
    const body = await request.json();
    const { id, slug, ...updates } = body;

    if (!id && !slug) {
      return NextResponse.json({ success: false, error: 'Deal ID or slug is required' }, { status: 400 });
    }

    const dbUpdates = formatDealToDB({ ...updates, updatedAt: new Date().toISOString() }, true);
    
    let query = supabase.from('deals').update(dbUpdates);
    if (id) query = query.eq('id', id);
    else if (slug) query = query.eq('slug', slug);

    const { data: updatedDeal, error } = await query.select().single();

    if (error) throw error;

    revalidateDeals([updatedDeal?.slug, slug])

    return NextResponse.json({
      success: true,
      deal: formatDealFromDB(updatedDeal),
      message: 'Deal updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating deal:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to update deal' }, { status: 500 });
  }
}

// DELETE - Delete deal(s)
export async function DELETE(request: NextRequest) {
  const authError = await assertAdmin();
  if (authError) return authError;

  const supabase = createClient();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const ids = searchParams.get('ids'); 

    if (ids) {
      const idsToDelete = ids.split(',');
      // Capture slugs before deletion so we can flush their detail pages.
      const { data: toDelete } = await supabase.from('deals').select('slug').in('id', idsToDelete);
      const { error } = await supabase.from('deals').delete().in('id', idsToDelete);
      if (error) throw error;

      revalidateDeals((toDelete || []).map((d: any) => d.slug));

      return NextResponse.json({ success: true, message: `Deleted ${idsToDelete.length} deals` });
    }

    if (!id && !slug) {
      return NextResponse.json({ success: false, error: 'Deal ID or slug is required' }, { status: 400 });
    }

    // Resolve the slug (for revalidation) when only an id was provided.
    let deletedSlug: string | undefined = slug || undefined
    if (!deletedSlug && id) {
      const { data: found } = await supabase.from('deals').select('slug').eq('id', id).single()
      deletedSlug = found?.slug
    }

    let query = supabase.from('deals').delete();
    if (id) query = query.eq('id', id);
    else if (slug) query = query.eq('slug', slug);

    const { error } = await query;
    if (error) throw error;

    revalidateDeals([deletedSlug])

    return NextResponse.json({ success: true, message: 'Deal deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting deal:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to delete deal' }, { status: 500 });
  }
}

// -------------------------------------------------------------------------------------------------
// Data Formatting Helpers (Mapping between Frontend CamelCase and DB SnakeCase+CamelCase mixture)
// -------------------------------------------------------------------------------------------------

function cleanText(text: string | null | undefined): string {
  if (!text) return '';
  return text.replace(/\b(in|for\s+)?(Q[1-4]|Quarter [1-4])\s*202\d\b/gi, '')
             .replace(/\b(in|for\s+)?202\d\b/gi, '')
             .replace(/\s+/g, ' ')
             .trim();
}

function formatDealFromDB(d: any): Deal {
  return {
    id: d.id,
    slug: d.slug,
    title: cleanText(d.title),
    provider: cleanText(d.provider),
    category: d.category,
    subcategory: d.subcategory,
    description: cleanText(d.description),
    shortDescription: cleanText(d.shortDescription || d.short_description || ''),
    value: d.value,
    originalPrice: d.originalPrice || d.original_price || '',
    discountedPrice: d.discountedPrice || d.discounted_price || '',
    savings: d.savings || '',
    eligibility: d.eligibility || [],
    requirements: d.requirements || [],
    applicationProcess: d.applicationProcess || d.application_process || [],
    proTips: d.proTips || d.pro_tips || [],
    tags: d.tags || [],
    status: d.status,
    expiryDate: d.expiryDate || d.expiry_date || '',
    applicationUrl: d.applicationUrl || d.application_url || '',
    providerWebsite: d.providerWebsite || d.provider_website || '',
    logoUrl: d.logoUrl || d.logo_url || '',
    featured: d.featured,
    recommended: d.recommended,
    verified: d.verified,
    difficulty: d.difficulty,
    timeToApply: d.timeToApply || d.time_to_apply || '',
    successRate: d.successRate || d.success_rate || '',
    lastUpdated: d.lastUpdated || d.last_updated || d.updated_at || '',
    createdAt: d.createdAt || d.created_at || '',
    updatedAt: d.updatedAt || d.updated_at || '',
    sourceVerified: d.sourceVerified || d.source_verified || true,
    dataSource: d.dataSource || d.data_source || 'supabase'
  } as Deal;
}

function formatDealToDB(d: Partial<Deal>, isPartial = false): any {
  const dbData: any = {};
  
  // Safely map values back to their expected database column names 
  // (both the old snake_case ones and the newly added ones)
  if (d.id !== undefined) dbData.id = d.id;
  if (d.slug !== undefined) dbData.slug = d.slug;
  if (d.title !== undefined) dbData.title = d.title;
  if (d.provider !== undefined) dbData.provider = d.provider;
  if (d.category !== undefined) dbData.category = d.category || '';
  if (d.subcategory !== undefined) dbData.subcategory = d.subcategory || '';
  if (d.description !== undefined) dbData.description = d.description || '';
  if (d.shortDescription !== undefined) {
    dbData.short_description = d.shortDescription || '';
    dbData.shortDescription = d.shortDescription || '';
  }
  if (d.value !== undefined) dbData.value = d.value || '';
  if (d.originalPrice !== undefined) {
    dbData.original_price = d.originalPrice || '';
    dbData.originalPrice = d.originalPrice || '';
  }
  if (d.discountedPrice !== undefined) dbData.discountedPrice = d.discountedPrice || '';
  if (d.savings !== undefined) dbData.savings = d.savings || '';
  if (d.eligibility !== undefined) dbData.eligibility = d.eligibility || [];
  if (d.requirements !== undefined) dbData.requirements = d.requirements || [];
  if (d.applicationProcess !== undefined) {
    dbData.application_process = d.applicationProcess || [];
    dbData.applicationProcess = d.applicationProcess || [];
  }
  if (d.proTips !== undefined) {
    dbData.pro_tips = d.proTips || [];
    dbData.proTips = d.proTips || [];
  }
  if (d.tags !== undefined) dbData.tags = d.tags || [];
  if (d.status !== undefined) dbData.status = d.status || 'active';
  if (d.expiryDate !== undefined) {
    dbData.expiry_date = d.expiryDate || '';
    dbData.expiryDate = d.expiryDate || '';
  }
  if (d.applicationUrl !== undefined) {
    dbData.application_url = d.applicationUrl || '';
    dbData.applicationUrl = d.applicationUrl || '';
  }
  if (d.providerWebsite !== undefined) {
    dbData.provider_website = d.providerWebsite || '';
    dbData.providerWebsite = d.providerWebsite || '';
  }
  if (d.logoUrl !== undefined) {
    dbData.logo_url = d.logoUrl || '';
    dbData.logoUrl = d.logoUrl || '';
  }
  if (d.featured !== undefined) dbData.featured = d.featured || false;
  if (d.recommended !== undefined) dbData.recommended = d.recommended || false;
  if (d.verified !== undefined) dbData.verified = d.verified !== false;
  if (d.difficulty !== undefined) dbData.difficulty = d.difficulty || 'medium';
  if (d.timeToApply !== undefined) {
    dbData.time_to_apply = d.timeToApply || '15 minutes';
    dbData.timeToApply = d.timeToApply || '15 minutes';
  }
  if (d.successRate !== undefined) {
    dbData.success_rate = d.successRate || '';
    dbData.successRate = d.successRate || '';
  }
  if (d.lastUpdated !== undefined) dbData.lastUpdated = d.lastUpdated;
  if (d.createdAt !== undefined) dbData.created_at = d.createdAt;
  if (d.updatedAt !== undefined) dbData.updated_at = d.updatedAt;
  if (d.sourceVerified !== undefined) {
    dbData.sourceVerified = d.sourceVerified !== false;
  }
  if (d.dataSource !== undefined) {
    dbData.data_source = d.dataSource || 'supabase';
    dbData.dataSource = d.dataSource || 'supabase';
  }

  // Remove ID if empty on creation so postgres can generate it
  if (!isPartial && !dbData.id) {
    delete dbData.id;
  }

  return dbData;
}

// Helper to normalize deal missing fields
function normalizeDeal(deal: any, source: string): any {
  const now = new Date().toISOString()
  const title = deal.title || deal.name || deal.dealName || 'Untitled Deal'
  const description = deal.description || deal.details || deal.about || deal.summary || ''
  const url = deal.applicationUrl || deal.url || deal.link || deal.applyUrl || deal.website || ''
  
  return {
    ...deal,
    slug: deal.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').substring(0, 100),
    title,
    provider: deal.provider || deal.company || deal.vendor || deal.brand || 'Unknown Provider',
    description,
    shortDescription: deal.shortDescription || description.substring(0, 150),
    applicationUrl: url,
    providerWebsite: deal.providerWebsite || url,
    category: deal.category || 'saas-discounts',
    status: deal.status || 'active',
    dataSource: source,
  }
}
