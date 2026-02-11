/**
 * MongoDB Adapter
 * 
 * Database adapter for MongoDB.
 * Alternative to Supabase for those who prefer MongoDB.
 * 
 * To use this adapter:
 * 1. Create a MongoDB Atlas cluster or use local MongoDB
 * 2. Set MONGODB_URI in .env.local
 * 3. Set DATABASE_TYPE=mongodb in .env.local
 * 
 * Note: This adapter requires the 'mongoose' package.
 * Run: npm install mongoose
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

interface MongoDBConfig {
  uri: string;
}

export class MongoDBAdapter extends BaseAdapter {
  private config: MongoDBConfig;
  private mongoose: any = null;
  private DealModel: any = null;

  constructor(config: MongoDBConfig) {
    super();
    this.config = config;
  }

  async connect(): Promise<void> {
    try {
      // Dynamic import to avoid loading mongoose if not needed
      const mongoose = await import('mongoose');
      this.mongoose = mongoose.default || mongoose;
      
      await this.mongoose.connect(this.config.uri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      // Define schema
      const dealSchema = new this.mongoose.Schema({
        slug: { type: String, required: true, unique: true, index: true },
        title: { type: String, required: true },
        provider: { type: String, required: true, index: true },
        category: { type: String, required: true, index: true },
        subcategory: String,
        description: { type: String, required: true },
        shortDescription: String,
        value: { type: String, required: true },
        originalPrice: String,
        savings: String,
        eligibility: { type: [String], default: ['Startups'] },
        requirements: { type: [String], default: ['Valid business email'] },
        applicationProcess: { type: [String], default: ['Visit provider website', 'Complete application', 'Await approval'] },
        proTips: { type: [String], default: [] },
        tags: { type: [String], default: [], index: true },
        status: { type: String, enum: ['active', 'expired', 'coming-soon', 'limited', 'paused'], default: 'active', index: true },
        applicationUrl: { type: String, required: true },
        providerWebsite: String,
        logoUrl: String,
        featured: { type: Boolean, default: false, index: true },
        verified: { type: Boolean, default: false },
        difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
        timeToApply: { type: String, default: '15 minutes' },
        successRate: String,
        expiryDate: Date,
        viewCount: { type: Number, default: 0 },
        applyCount: { type: Number, default: 0 },
        dataSource: { type: String, default: 'manual' },
        sourceVerified: { type: Boolean, default: true },
        deletedAt: Date,
      }, {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
      });

      // Text index for search
      dealSchema.index({ title: 'text', provider: 'text', description: 'text' });

      // Compound indexes
      dealSchema.index({ category: 1, status: 1 });
      dealSchema.index({ createdAt: -1 });

      this.DealModel = this.mongoose.models.Deal || this.mongoose.model('Deal', dealSchema);
      
      this.connected = true;
      console.log('✅ MongoDB adapter connected');
    } catch (error) {
      throw new DatabaseConnectionError(
        error instanceof Error ? error.message : 'Failed to connect to MongoDB'
      );
    }
  }

  async disconnect(): Promise<void> {
    if (this.mongoose) {
      await this.mongoose.disconnect();
    }
    this.connected = false;
    console.log('📤 MongoDB adapter disconnected');
  }

  private ensureConnected(): void {
    if (!this.connected || !this.DealModel) {
      throw new DatabaseConnectionError('Not connected to MongoDB');
    }
  }

  async createDeal(input: DealInput): Promise<Deal> {
    this.ensureConnected();
    
    const slug = await this.generateUniqueSlug(input.title);
    
    const dealData = {
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
      applicationProcess: input.applicationProcess || ['Visit provider website', 'Complete application', 'Await approval'],
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
      expiryDate: input.expiryDate ? new Date(input.expiryDate) : undefined,
      dataSource: input.dataSource || 'manual',
    };

    try {
      const doc = await this.DealModel.create(dealData);
      return this.mapFromDocument(doc);
    } catch (error: any) {
      if (error.code === 11000) {
        throw new DuplicateSlugError(slug);
      }
      throw error;
    }
  }

  async getDealBySlug(slug: string): Promise<Deal | null> {
    this.ensureConnected();
    
    const doc = await this.DealModel.findOne({ slug, deletedAt: null });
    return doc ? this.mapFromDocument(doc) : null;
  }

  async getDealById(id: string): Promise<Deal | null> {
    this.ensureConnected();
    
    const doc = await this.DealModel.findOne({ _id: id, deletedAt: null });
    return doc ? this.mapFromDocument(doc) : null;
  }

  async updateDeal(id: string, update: DealUpdate): Promise<Deal> {
    this.ensureConnected();
    
    const doc = await this.DealModel.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );

    if (!doc) {
      throw new DealNotFoundError(id);
    }

    return this.mapFromDocument(doc);
  }

  async deleteDeal(id: string): Promise<void> {
    this.ensureConnected();
    
    const result = await this.DealModel.findByIdAndUpdate(id, {
      $set: { deletedAt: new Date() }
    });

    if (!result) {
      throw new DealNotFoundError(id);
    }
  }

  async hardDeleteDeal(id: string): Promise<void> {
    this.ensureConnected();
    
    const result = await this.DealModel.findByIdAndDelete(id);
    if (!result) {
      throw new DealNotFoundError(id);
    }
  }

  async restoreDeal(id: string): Promise<Deal> {
    this.ensureConnected();
    
    const doc = await this.DealModel.findByIdAndUpdate(
      id,
      { $unset: { deletedAt: 1 } },
      { new: true }
    );

    if (!doc) {
      throw new DealNotFoundError(id);
    }

    return this.mapFromDocument(doc);
  }

  async listDeals(
    filters?: DealFilters,
    sort?: DealSort,
    pagination?: PaginationOptions
  ): Promise<PaginatedDeals> {
    this.ensureConnected();
    
    const query = this.buildQuery(filters);
    const sortObj = this.buildSort(sort);
    
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 20;
    const skip = (page - 1) * pageSize;

    const [deals, total] = await Promise.all([
      this.DealModel.find(query).sort(sortObj).skip(skip).limit(pageSize),
      this.DealModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      deals: deals.map(this.mapFromDocument),
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
    
    const query = {
      ...this.buildQuery(filters),
      $text: { $search: searchQuery },
    };

    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 20;
    const skip = (page - 1) * pageSize;

    const [deals, total] = await Promise.all([
      this.DealModel.find(query, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(pageSize),
      this.DealModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      deals: deals.map(this.mapFromDocument),
      total,
      page,
      pageSize,
      totalPages,
      hasMore: page < totalPages,
    };
  }

  async getAllDeals(filters?: DealFilters): Promise<Deal[]> {
    this.ensureConnected();
    
    const query = this.buildQuery(filters);
    const docs = await this.DealModel.find(query).sort({ createdAt: -1 });
    return docs.map(this.mapFromDocument);
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
    
    const result = await this.DealModel.updateMany(
      { _id: { $in: ids } },
      { $set: { deletedAt: new Date() } }
    );
    return result.modifiedCount;
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
    
    const count = await this.DealModel.countDocuments({ slug });
    return count > 0;
  }

  async getStats(): Promise<DealStats> {
    this.ensureConnected();
    
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const [stats, categoryStats] = await Promise.all([
      this.DealModel.aggregate([
        { $match: { deletedAt: null } },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            active: { $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] } },
            expired: { $sum: { $cond: [{ $eq: ['$status', 'expired'] }, 1, 0] } },
            comingSoon: { $sum: { $cond: [{ $eq: ['$status', 'coming-soon'] }, 1, 0] } },
            limited: { $sum: { $cond: [{ $eq: ['$status', 'limited'] }, 1, 0] } },
            paused: { $sum: { $cond: [{ $eq: ['$status', 'paused'] }, 1, 0] } },
            featured: { $sum: { $cond: ['$featured', 1, 0] } },
            verified: { $sum: { $cond: ['$verified', 1, 0] } },
            recentlyAdded: { $sum: { $cond: [{ $gte: ['$createdAt', sevenDaysAgo] }, 1, 0] } },
            expiringSoon: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $ne: ['$expiryDate', null] },
                      { $gt: ['$expiryDate', now] },
                      { $lt: ['$expiryDate', sevenDaysFromNow] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ]),
      this.DealModel.aggregate([
        { $match: { deletedAt: null } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
      ]),
    ]);

    const byCategory: Record<string, number> = {};
    categoryStats.forEach((cat: any) => {
      byCategory[cat._id] = cat.count;
    });

    const s = stats[0] || {};
    return {
      total: s.total || 0,
      active: s.active || 0,
      expired: s.expired || 0,
      comingSoon: s.comingSoon || 0,
      limited: s.limited || 0,
      paused: s.paused || 0,
      featured: s.featured || 0,
      verified: s.verified || 0,
      byCategory,
      recentlyAdded: s.recentlyAdded || 0,
      expiringSoon: s.expiringSoon || 0,
    };
  }

  async incrementViewCount(id: string): Promise<void> {
    this.ensureConnected();
    await this.DealModel.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });
  }

  async incrementApplyCount(id: string): Promise<void> {
    this.ensureConnected();
    await this.DealModel.findByIdAndUpdate(id, { $inc: { applyCount: 1 } });
  }

  async updateExpiredDeals(): Promise<number> {
    this.ensureConnected();
    
    const result = await this.DealModel.updateMany(
      {
        expiryDate: { $lt: new Date() },
        status: { $ne: 'expired' },
        deletedAt: null,
      },
      { $set: { status: 'expired' } }
    );
    return result.modifiedCount;
  }

  async getExpiringSoon(days: number): Promise<Deal[]> {
    this.ensureConnected();
    
    const now = new Date();
    const future = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    const docs = await this.DealModel.find({
      expiryDate: { $gt: now, $lt: future },
      deletedAt: null,
    });

    return docs.map(this.mapFromDocument);
  }

  private buildQuery(filters?: DealFilters): any {
    const query: any = {};

    if (!filters?.includeDeleted) {
      query.deletedAt = null;
    }

    if (filters?.category) query.category = filters.category;
    if (filters?.subcategory) query.subcategory = filters.subcategory;
    if (filters?.provider) query.provider = filters.provider;
    if (filters?.featured !== undefined) query.featured = filters.featured;
    if (filters?.verified !== undefined) query.verified = filters.verified;
    if (filters?.difficulty) query.difficulty = filters.difficulty;

    if (filters?.status) {
      const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
      query.status = { $in: statuses };
    }

    if (filters?.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }

    return query;
  }

  private buildSort(sort?: DealSort): any {
    if (!sort) {
      return { createdAt: -1 };
    }

    const direction = sort.direction === 'asc' ? 1 : -1;
    return { [sort.field]: direction };
  }

  private mapFromDocument(doc: any): Deal {
    return {
      id: doc._id.toString(),
      slug: doc.slug,
      title: doc.title,
      provider: doc.provider,
      category: doc.category,
      subcategory: doc.subcategory,
      description: doc.description,
      shortDescription: doc.shortDescription,
      value: doc.value,
      originalPrice: doc.originalPrice,
      savings: doc.savings,
      eligibility: doc.eligibility || [],
      requirements: doc.requirements || [],
      applicationProcess: doc.applicationProcess || [],
      proTips: doc.proTips || [],
      tags: doc.tags || [],
      status: doc.status,
      applicationUrl: doc.applicationUrl,
      providerWebsite: doc.providerWebsite,
      logoUrl: doc.logoUrl,
      featured: doc.featured,
      verified: doc.verified,
      difficulty: doc.difficulty,
      timeToApply: doc.timeToApply,
      successRate: doc.successRate,
      expiryDate: doc.expiryDate?.toISOString(),
      lastUpdated: doc.updatedAt?.toISOString().split('T')[0],
      createdAt: doc.createdAt?.toISOString(),
      updatedAt: doc.updatedAt?.toISOString(),
      deletedAt: doc.deletedAt?.toISOString(),
      viewCount: doc.viewCount,
      applyCount: doc.applyCount,
      dataSource: doc.dataSource,
      sourceVerified: doc.sourceVerified,
    };
  }
}
