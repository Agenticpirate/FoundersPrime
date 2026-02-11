/**
 * JSON File Adapter
 * 
 * Database adapter that uses JSON files for storage.
 * This is the fallback adapter when no database is configured.
 * Useful for development and small-scale deployments.
 */

import fs from 'fs';
import path from 'path';
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
  DealStatus,
} from '../types';

const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'all-deals.json');

export class JsonAdapter extends BaseAdapter {
  private deals: Deal[] = [];
  private dataLoaded: boolean = false;

  async connect(): Promise<void> {
    await this.loadData();
    this.connected = true;
    console.log('✅ JSON adapter connected');
  }

  async disconnect(): Promise<void> {
    this.connected = false;
    console.log('📤 JSON adapter disconnected');
  }

  private async loadData(): Promise<void> {
    if (this.dataLoaded) return;
    
    try {
      if (fs.existsSync(DATA_FILE)) {
        const content = fs.readFileSync(DATA_FILE, 'utf8');
        this.deals = JSON.parse(content);
        console.log(`📂 Loaded ${this.deals.length} deals from JSON`);
      } else {
        this.deals = [];
        console.log('📂 No existing deals file, starting fresh');
      }
      this.dataLoaded = true;
    } catch (error) {
      console.error('Error loading deals:', error);
      this.deals = [];
      this.dataLoaded = true;
    }
  }

  private async saveData(): Promise<void> {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.deals, null, 2));
    } catch (error) {
      console.error('Error saving deals:', error);
      throw error;
    }
  }

  async createDeal(input: DealInput): Promise<Deal> {
    await this.loadData();
    
    const slug = await this.generateUniqueSlug(input.title);
    const now = this.now();
    const today = this.today();
    
    const deal: Deal = {
      id: this.generateId(),
      slug,
      title: input.title,
      provider: input.provider,
      category: input.category,
      subcategory: input.subcategory,
      description: input.description,
      shortDescription: input.shortDescription || input.description.substring(0, 150),
      value: input.value,
      originalPrice: input.originalPrice,
      savings: input.savings,
      eligibility: input.eligibility || ['Startups'],
      requirements: input.requirements || ['Valid business email'],
      applicationProcess: input.applicationProcess || [
        'Visit provider website',
        'Complete application',
        'Await approval'
      ],
      proTips: input.proTips || [],
      tags: input.tags || [input.category, input.provider],
      status: input.status || 'active',
      applicationUrl: input.applicationUrl,
      providerWebsite: input.providerWebsite,
      logoUrl: input.logoUrl,
      featured: input.featured || false,
      verified: input.verified || false,
      difficulty: input.difficulty || 'medium',
      timeToApply: input.timeToApply || '15 minutes',
      successRate: input.successRate,
      expiryDate: input.expiryDate,
      lastUpdated: today,
      createdAt: now,
      updatedAt: now,
      viewCount: 0,
      applyCount: 0,
      dataSource: input.dataSource || 'manual',
      sourceVerified: true,
    };

    this.deals.push(deal);
    await this.saveData();
    
    return deal;
  }

  async getDealBySlug(slug: string): Promise<Deal | null> {
    await this.loadData();
    return this.deals.find(d => d.slug === slug && !d.deletedAt) || null;
  }

  async getDealById(id: string): Promise<Deal | null> {
    await this.loadData();
    return this.deals.find(d => d.id === id && !d.deletedAt) || null;
  }

  async updateDeal(id: string, update: DealUpdate): Promise<Deal> {
    await this.loadData();
    
    const index = this.deals.findIndex(d => d.id === id);
    if (index === -1) {
      throw new DealNotFoundError(id);
    }

    const deal = this.deals[index];
    const updatedDeal: Deal = {
      ...deal,
      ...update,
      id: deal.id, // Preserve ID
      slug: deal.slug, // Preserve slug unless explicitly changed
      createdAt: deal.createdAt, // Preserve creation date
      updatedAt: this.now(),
      lastUpdated: this.today(),
    };

    this.deals[index] = updatedDeal;
    await this.saveData();
    
    return updatedDeal;
  }

  async deleteDeal(id: string): Promise<void> {
    await this.loadData();
    
    const index = this.deals.findIndex(d => d.id === id);
    if (index === -1) {
      throw new DealNotFoundError(id);
    }

    this.deals[index].deletedAt = this.now();
    this.deals[index].updatedAt = this.now();
    await this.saveData();
  }

  async hardDeleteDeal(id: string): Promise<void> {
    await this.loadData();
    
    const index = this.deals.findIndex(d => d.id === id);
    if (index === -1) {
      throw new DealNotFoundError(id);
    }

    this.deals.splice(index, 1);
    await this.saveData();
  }

  async restoreDeal(id: string): Promise<Deal> {
    await this.loadData();
    
    const index = this.deals.findIndex(d => d.id === id);
    if (index === -1) {
      throw new DealNotFoundError(id);
    }

    delete this.deals[index].deletedAt;
    this.deals[index].updatedAt = this.now();
    await this.saveData();
    
    return this.deals[index];
  }

  async listDeals(
    filters?: DealFilters,
    sort?: DealSort,
    pagination?: PaginationOptions
  ): Promise<PaginatedDeals> {
    await this.loadData();
    
    let filtered = this.applyFilters(this.deals, filters);
    filtered = this.applySort(filtered, sort);
    
    const total = filtered.length;
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 20;
    const totalPages = Math.ceil(total / pageSize);
    
    const start = (page - 1) * pageSize;
    const deals = filtered.slice(start, start + pageSize);
    
    return {
      deals,
      total,
      page,
      pageSize,
      totalPages,
      hasMore: page < totalPages,
    };
  }

  async searchDeals(
    query: string,
    filters?: DealFilters,
    pagination?: PaginationOptions
  ): Promise<PaginatedDeals> {
    await this.loadData();
    
    const searchLower = query.toLowerCase();
    let filtered = this.deals.filter(d => {
      if (d.deletedAt && !filters?.includeDeleted) return false;
      
      return (
        d.title.toLowerCase().includes(searchLower) ||
        d.provider.toLowerCase().includes(searchLower) ||
        d.description.toLowerCase().includes(searchLower) ||
        d.tags.some(t => t.toLowerCase().includes(searchLower))
      );
    });
    
    filtered = this.applyFilters(filtered, filters);
    
    const total = filtered.length;
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 20;
    const totalPages = Math.ceil(total / pageSize);
    
    const start = (page - 1) * pageSize;
    const deals = filtered.slice(start, start + pageSize);
    
    return {
      deals,
      total,
      page,
      pageSize,
      totalPages,
      hasMore: page < totalPages,
    };
  }

  async getAllDeals(filters?: DealFilters): Promise<Deal[]> {
    await this.loadData();
    return this.applyFilters(this.deals, filters);
  }

  async bulkCreateDeals(inputs: DealInput[]): Promise<BulkImportResult> {
    await this.loadData();
    
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
    let count = 0;
    for (const id of ids) {
      try {
        await this.deleteDeal(id);
        count++;
      } catch {
        // Skip failed deletes
      }
    }
    return count;
  }

  async generateUniqueSlug(title: string): Promise<string> {
    await this.loadData();
    
    let baseSlug = this.slugify(title);
    let slug = baseSlug;
    let counter = 2;
    
    while (await this.slugExists(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
      
      // Safety limit
      if (counter > 1000) {
        slug = `${baseSlug}-${Date.now()}`;
        break;
      }
    }
    
    return slug;
  }

  async slugExists(slug: string): Promise<boolean> {
    await this.loadData();
    return this.deals.some(d => d.slug === slug);
  }

  async getStats(): Promise<DealStats> {
    await this.loadData();
    
    const activeDeals = this.deals.filter(d => !d.deletedAt);
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const byCategory: Record<string, number> = {};
    activeDeals.forEach(d => {
      byCategory[d.category] = (byCategory[d.category] || 0) + 1;
    });
    
    return {
      total: activeDeals.length,
      active: activeDeals.filter(d => d.status === 'active').length,
      expired: activeDeals.filter(d => d.status === 'expired').length,
      comingSoon: activeDeals.filter(d => d.status === 'coming-soon').length,
      limited: activeDeals.filter(d => d.status === 'limited').length,
      paused: activeDeals.filter(d => d.status === 'paused').length,
      featured: activeDeals.filter(d => d.featured).length,
      verified: activeDeals.filter(d => d.verified).length,
      byCategory,
      recentlyAdded: activeDeals.filter(d => new Date(d.createdAt) > sevenDaysAgo).length,
      expiringSoon: activeDeals.filter(d => {
        if (!d.expiryDate) return false;
        const expiry = new Date(d.expiryDate);
        return expiry > now && expiry < sevenDaysFromNow;
      }).length,
    };
  }

  async incrementViewCount(id: string): Promise<void> {
    await this.loadData();
    
    const deal = this.deals.find(d => d.id === id);
    if (deal) {
      deal.viewCount = (deal.viewCount || 0) + 1;
      await this.saveData();
    }
  }

  async incrementApplyCount(id: string): Promise<void> {
    await this.loadData();
    
    const deal = this.deals.find(d => d.id === id);
    if (deal) {
      deal.applyCount = (deal.applyCount || 0) + 1;
      await this.saveData();
    }
  }

  async updateExpiredDeals(): Promise<number> {
    await this.loadData();
    
    const now = new Date();
    let count = 0;
    
    for (const deal of this.deals) {
      if (deal.expiryDate && deal.status !== 'expired') {
        const expiry = new Date(deal.expiryDate);
        if (expiry < now) {
          deal.status = 'expired';
          deal.updatedAt = this.now();
          count++;
        }
      }
    }
    
    if (count > 0) {
      await this.saveData();
    }
    
    return count;
  }

  async getExpiringSoon(days: number): Promise<Deal[]> {
    await this.loadData();
    
    const now = new Date();
    const future = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    
    return this.deals.filter(d => {
      if (d.deletedAt || !d.expiryDate) return false;
      const expiry = new Date(d.expiryDate);
      return expiry > now && expiry < future;
    });
  }

  private applyFilters(deals: Deal[], filters?: DealFilters): Deal[] {
    if (!filters) {
      return deals.filter(d => !d.deletedAt);
    }

    return deals.filter(d => {
      // Exclude deleted unless explicitly included
      if (d.deletedAt && !filters.includeDeleted) return false;
      
      if (filters.category && d.category !== filters.category) return false;
      if (filters.subcategory && d.subcategory !== filters.subcategory) return false;
      if (filters.provider && d.provider !== filters.provider) return false;
      if (filters.featured !== undefined && d.featured !== filters.featured) return false;
      if (filters.verified !== undefined && d.verified !== filters.verified) return false;
      if (filters.difficulty && d.difficulty !== filters.difficulty) return false;
      
      if (filters.status) {
        const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
        if (!statuses.includes(d.status)) return false;
      }
      
      if (filters.tags && filters.tags.length > 0) {
        if (!filters.tags.some(t => d.tags.includes(t))) return false;
      }
      
      return true;
    });
  }

  private applySort(deals: Deal[], sort?: DealSort): Deal[] {
    if (!sort) {
      return deals.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return deals.sort((a, b) => {
      let aVal: any = a[sort.field];
      let bVal: any = b[sort.field];
      
      // Handle dates
      if (sort.field === 'createdAt' || sort.field === 'updatedAt' || sort.field === 'expiryDate') {
        aVal = aVal ? new Date(aVal).getTime() : 0;
        bVal = bVal ? new Date(bVal).getTime() : 0;
      }
      
      // Handle numbers
      if (sort.field === 'viewCount') {
        aVal = aVal || 0;
        bVal = bVal || 0;
      }
      
      if (sort.direction === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }
}
