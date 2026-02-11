/**
 * Supabase Adapter
 * 
 * Database adapter for Supabase (PostgreSQL).
 * This is the recommended adapter for production use.
 * 
 * To use this adapter:
 * 1. Create a Supabase project at https://supabase.com
 * 2. Run the SQL schema from docs/supabase-schema.sql
 * 3. Set environment variables in .env.local
 */

import { BaseAdapter } from '../adapter';
import {
  Deal,
  DealInput,
  DealUpdate,
  DealFilters,
  DealSort,
  PaginationOptions,
  PaginatedDeals,
  BulkImportResult,
  DealStats,
  DealNotFoundError,
  DuplicateSlugError,
  DatabaseConnectionError,
} from '../types';

interface SupabaseConfig {
  url: string;
  anonKey: string;
  serviceRoleKey: string;
}

export class SupabaseAdapter extends BaseAdapter {
  private config: SupabaseConfig;
  private supabase: any = null;

  constructor(config: SupabaseConfig) {
    super();
    this.config = config;
  }

  async connect(): Promise<void> {
    try {
      // Dynamic import to avoid loading Supabase if not needed
      const { createClient } = await import('@supabase/supabase-js');
      
      this.supabase = createClient(
        this.config.url,
        this.config.serviceRoleKey, // Use service role for server-side operations
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        }
      );
      
      // Test connection
      const { error } = await this.supabase.from('deals').select('count').limit(1);
      if (error) {
        throw new Error(error.message);
      }
      
      this.connected = true;
      console.log('✅ Supabase adapter connected');
    } catch (error) {
      throw new DatabaseConnectionError(
        error instanceof Error ? error.message : 'Failed to connect to Supabase'
      );
    }
  }

  async disconnect(): Promise<void> {
    this.supabase = null;
    this.connected = false;
    console.log('📤 Supabase adapter disconnected');
  }

  private ensureConnected(): void {
    if (!this.connected || !this.supabase) {
      throw new DatabaseConnectionError('Not connected to Supabase');
    }
  }

  async createDeal(input: DealInput): Promise<Deal> {
    this.ensureConnected();
    
    const slug = await this.generateUniqueSlug(input.title);
    const now = new Date().toISOString();
    
    const dealData = {
      slug,
      title: input.title,
      provider: input.provider,
      category: input.category,
      subcategory: input.subcategory,
      description: input.description,
      short_description: input.shortDescription || input.description.substring(0, 150),
      value: input.value,
      original_price: input.originalPrice,
      savings: input.savings,
      eligibility: input.eligibility || ['Startups'],
      requirements: input.requirements || ['Valid business email'],
      application_process: input.applicationProcess || ['Visit provider website', 'Complete application', 'Await approval'],
      pro_tips: input.proTips || [],
      tags: input.tags || [input.category, input.provider],
      status: input.status || 'active',
      application_url: input.applicationUrl,
      provider_website: input.providerWebsite,
      logo_url: input.logoUrl,
      featured: input.featured || false,
      verified: input.verified || false,
      difficulty: input.difficulty || 'medium',
      time_to_apply: input.timeToApply || '15 minutes',
      success_rate: input.successRate,
      expiry_date: input.expiryDate,
      data_source: input.dataSource || 'manual',
      created_at: now,
      updated_at: now,
    };

    const { data, error } = await this.supabase
      .from('deals')
      .insert(dealData)
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique violation
        throw new DuplicateSlugError(slug);
      }
      throw new Error(error.message);
    }

    return this.mapFromDatabase(data);
  }

  async getDealBySlug(slug: string): Promise<Deal | null> {
    this.ensureConnected();
    
    const { data, error } = await this.supabase
      .from('deals')
      .select('*')
      .eq('slug', slug)
      .is('deleted_at', null)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw new Error(error.message);
    }

    return data ? this.mapFromDatabase(data) : null;
  }

  async getDealById(id: string): Promise<Deal | null> {
    this.ensureConnected();
    
    const { data, error } = await this.supabase
      .from('deals')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(error.message);
    }

    return data ? this.mapFromDatabase(data) : null;
  }

  async updateDeal(id: string, update: DealUpdate): Promise<Deal> {
    this.ensureConnected();
    
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    // Map input fields to database columns
    if (update.title !== undefined) updateData.title = update.title;
    if (update.provider !== undefined) updateData.provider = update.provider;
    if (update.category !== undefined) updateData.category = update.category;
    if (update.subcategory !== undefined) updateData.subcategory = update.subcategory;
    if (update.description !== undefined) updateData.description = update.description;
    if (update.shortDescription !== undefined) updateData.short_description = update.shortDescription;
    if (update.value !== undefined) updateData.value = update.value;
    if (update.originalPrice !== undefined) updateData.original_price = update.originalPrice;
    if (update.savings !== undefined) updateData.savings = update.savings;
    if (update.eligibility !== undefined) updateData.eligibility = update.eligibility;
    if (update.requirements !== undefined) updateData.requirements = update.requirements;
    if (update.applicationProcess !== undefined) updateData.application_process = update.applicationProcess;
    if (update.proTips !== undefined) updateData.pro_tips = update.proTips;
    if (update.tags !== undefined) updateData.tags = update.tags;
    if (update.status !== undefined) updateData.status = update.status;
    if (update.applicationUrl !== undefined) updateData.application_url = update.applicationUrl;
    if (update.providerWebsite !== undefined) updateData.provider_website = update.providerWebsite;
    if (update.logoUrl !== undefined) updateData.logo_url = update.logoUrl;
    if (update.featured !== undefined) updateData.featured = update.featured;
    if (update.verified !== undefined) updateData.verified = update.verified;
    if (update.difficulty !== undefined) updateData.difficulty = update.difficulty;
    if (update.timeToApply !== undefined) updateData.time_to_apply = update.timeToApply;
    if (update.successRate !== undefined) updateData.success_rate = update.successRate;
    if (update.expiryDate !== undefined) updateData.expiry_date = update.expiryDate;

    const { data, error } = await this.supabase
      .from('deals')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') throw new DealNotFoundError(id);
      throw new Error(error.message);
    }

    return this.mapFromDatabase(data);
  }

  async deleteDeal(id: string): Promise<void> {
    this.ensureConnected();
    
    const { error } = await this.supabase
      .from('deals')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  async hardDeleteDeal(id: string): Promise<void> {
    this.ensureConnected();
    
    const { error } = await this.supabase
      .from('deals')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  async restoreDeal(id: string): Promise<Deal> {
    this.ensureConnected();
    
    const { data, error } = await this.supabase
      .from('deals')
      .update({ deleted_at: null, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapFromDatabase(data);
  }

  async listDeals(
    filters?: DealFilters,
    sort?: DealSort,
    pagination?: PaginationOptions
  ): Promise<PaginatedDeals> {
    this.ensureConnected();
    
    let query = this.supabase.from('deals').select('*', { count: 'exact' });
    
    // Apply filters
    if (!filters?.includeDeleted) {
      query = query.is('deleted_at', null);
    }
    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.subcategory) query = query.eq('subcategory', filters.subcategory);
    if (filters?.provider) query = query.eq('provider', filters.provider);
    if (filters?.featured !== undefined) query = query.eq('featured', filters.featured);
    if (filters?.verified !== undefined) query = query.eq('verified', filters.verified);
    if (filters?.difficulty) query = query.eq('difficulty', filters.difficulty);
    if (filters?.status) {
      const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
      query = query.in('status', statuses);
    }

    // Apply sorting
    const sortField = sort?.field || 'created_at';
    const sortDir = sort?.direction === 'asc' ? true : false;
    query = query.order(this.mapSortField(sortField), { ascending: sortDir });

    // Apply pagination
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 20;
    const start = (page - 1) * pageSize;
    query = query.range(start, start + pageSize - 1);

    const { data, error, count } = await query;

    if (error) throw new Error(error.message);

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      deals: (data || []).map(this.mapFromDatabase),
      total,
      page,
      pageSize,
      totalPages,
      hasMore: page < totalPages,
    };
  }

  async searchDeals(
    searchQuery: string,
    filters?: DealFilters,
    pagination?: PaginationOptions
  ): Promise<PaginatedDeals> {
    this.ensureConnected();
    
    let query = this.supabase
      .from('deals')
      .select('*', { count: 'exact' })
      .or(`title.ilike.%${searchQuery}%,provider.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);

    if (!filters?.includeDeleted) {
      query = query.is('deleted_at', null);
    }
    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.status) {
      const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
      query = query.in('status', statuses);
    }

    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 20;
    const start = (page - 1) * pageSize;
    query = query.range(start, start + pageSize - 1);

    const { data, error, count } = await query;

    if (error) throw new Error(error.message);

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      deals: (data || []).map(this.mapFromDatabase),
      total,
      page,
      pageSize,
      totalPages,
      hasMore: page < totalPages,
    };
  }

  async getAllDeals(filters?: DealFilters): Promise<Deal[]> {
    this.ensureConnected();
    
    let query = this.supabase.from('deals').select('*');
    
    if (!filters?.includeDeleted) {
      query = query.is('deleted_at', null);
    }
    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.status) {
      const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
      query = query.in('status', statuses);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    return (data || []).map(this.mapFromDatabase);
  }

  async bulkCreateDeals(inputs: DealInput[]): Promise<BulkImportResult> {
    const result: BulkImportResult = {
      success: 0,
      failed: 0,
      errors: [],
      importedDeals: [],
    };

    for (let i = 0; i < inputs.length; i++) {
      try {
        const deal = await this.createDeal(inputs[i]);
        result.success++;
        result.importedDeals.push(deal);
      } catch (error) {
        result.failed++;
        result.errors.push({
          index: i,
          title: inputs[i].title,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return result;
  }

  async bulkUpdateDeals(updates: Array<{ id: string; update: DealUpdate }>): Promise<number> {
    let count = 0;
    for (const { id, update } of updates) {
      try {
        await this.updateDeal(id, update);
        count++;
      } catch {
        // Skip failed updates
      }
    }
    return count;
  }

  async bulkDeleteDeals(ids: string[]): Promise<number> {
    this.ensureConnected();
    
    const { error, count } = await this.supabase
      .from('deals')
      .update({ deleted_at: new Date().toISOString() })
      .in('id', ids);

    if (error) throw new Error(error.message);
    return count || 0;
  }

  async generateUniqueSlug(title: string): Promise<string> {
    this.ensureConnected();
    
    let baseSlug = this.slugify(title);
    let slug = baseSlug;
    let counter = 2;

    while (await this.slugExists(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
      if (counter > 1000) {
        slug = `${baseSlug}-${Date.now()}`;
        break;
      }
    }

    return slug;
  }

  async slugExists(slug: string): Promise<boolean> {
    this.ensureConnected();
    
    const { data } = await this.supabase
      .from('deals')
      .select('id')
      .eq('slug', slug)
      .limit(1);

    return (data?.length || 0) > 0;
  }

  async getStats(): Promise<DealStats> {
    this.ensureConnected();
    
    const { data, error } = await this.supabase
      .from('deals')
      .select('status, category, featured, verified, created_at, expiry_date')
      .is('deleted_at', null);

    if (error) throw new Error(error.message);

    const deals = data || [];
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const byCategory: Record<string, number> = {};
    deals.forEach((d: any) => {
      byCategory[d.category] = (byCategory[d.category] || 0) + 1;
    });

    return {
      total: deals.length,
      active: deals.filter((d: any) => d.status === 'active').length,
      expired: deals.filter((d: any) => d.status === 'expired').length,
      comingSoon: deals.filter((d: any) => d.status === 'coming-soon').length,
      limited: deals.filter((d: any) => d.status === 'limited').length,
      paused: deals.filter((d: any) => d.status === 'paused').length,
      featured: deals.filter((d: any) => d.featured).length,
      verified: deals.filter((d: any) => d.verified).length,
      byCategory,
      recentlyAdded: deals.filter((d: any) => new Date(d.created_at) > sevenDaysAgo).length,
      expiringSoon: deals.filter((d: any) => {
        if (!d.expiry_date) return false;
        const expiry = new Date(d.expiry_date);
        return expiry > now && expiry < sevenDaysFromNow;
      }).length,
    };
  }

  async incrementViewCount(id: string): Promise<void> {
    this.ensureConnected();
    
    await this.supabase.rpc('increment_view_count', { deal_id: id });
  }

  async incrementApplyCount(id: string): Promise<void> {
    this.ensureConnected();
    
    await this.supabase.rpc('increment_apply_count', { deal_id: id });
  }

  async updateExpiredDeals(): Promise<number> {
    this.ensureConnected();
    
    const { count } = await this.supabase
      .from('deals')
      .update({ status: 'expired', updated_at: new Date().toISOString() })
      .lt('expiry_date', new Date().toISOString())
      .neq('status', 'expired')
      .is('deleted_at', null);

    return count || 0;
  }

  async getExpiringSoon(days: number): Promise<Deal[]> {
    this.ensureConnected();
    
    const now = new Date();
    const future = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    const { data, error } = await this.supabase
      .from('deals')
      .select('*')
      .gt('expiry_date', now.toISOString())
      .lt('expiry_date', future.toISOString())
      .is('deleted_at', null);

    if (error) throw new Error(error.message);
    return (data || []).map(this.mapFromDatabase);
  }

  private mapSortField(field: string): string {
    const mapping: Record<string, string> = {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      expiryDate: 'expiry_date',
      viewCount: 'view_count',
    };
    return mapping[field] || field;
  }

  private mapFromDatabase(row: any): Deal {
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      provider: row.provider,
      category: row.category,
      subcategory: row.subcategory,
      description: row.description,
      shortDescription: row.short_description,
      value: row.value,
      originalPrice: row.original_price,
      savings: row.savings,
      eligibility: row.eligibility || [],
      requirements: row.requirements || [],
      applicationProcess: row.application_process || [],
      proTips: row.pro_tips || [],
      tags: row.tags || [],
      status: row.status,
      applicationUrl: row.application_url,
      providerWebsite: row.provider_website,
      logoUrl: row.logo_url,
      featured: row.featured,
      verified: row.verified,
      difficulty: row.difficulty,
      timeToApply: row.time_to_apply,
      successRate: row.success_rate,
      expiryDate: row.expiry_date,
      lastUpdated: row.updated_at?.split('T')[0],
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
      viewCount: row.view_count,
      applyCount: row.apply_count,
      dataSource: row.data_source,
      sourceVerified: row.source_verified,
    };
  }
}
