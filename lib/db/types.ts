/**
 * Database Types
 * 
 * Shared types for the database abstraction layer.
 * These types are used by all database adapters (Supabase, MongoDB, JSON).
 */

// Deal status enum
export type DealStatus = 'active' | 'expired' | 'coming-soon' | 'limited' | 'paused';

// Deal difficulty enum
export type DealDifficulty = 'easy' | 'medium' | 'hard';

/**
 * Core Deal interface - represents a deal in the database
 */
export interface Deal {
  id: string;
  slug: string;
  title: string;
  provider: string;
  category: string;
  subcategory?: string;
  description: string;
  shortDescription?: string;
  value: string;
  originalPrice?: string;
  savings?: string;
  eligibility: string[];
  requirements: string[];
  applicationProcess: string[];
  proTips: string[];
  tags: string[];
  status: DealStatus;
  applicationUrl: string;
  providerWebsite?: string;
  logoUrl?: string;
  featured: boolean;
  verified: boolean;
  difficulty: DealDifficulty;
  timeToApply: string;
  successRate?: string;
  expiryDate?: string;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string; // For soft delete
  viewCount?: number;
  applyCount?: number;
  dataSource?: string;
  sourceVerified?: boolean;
}

/**
 * Input type for creating a new deal
 * Omits auto-generated fields
 */
export interface DealInput {
  title: string;
  provider: string;
  category: string;
  subcategory?: string;
  description: string;
  shortDescription?: string;
  value: string;
  originalPrice?: string;
  savings?: string;
  eligibility?: string[];
  requirements?: string[];
  applicationProcess?: string[];
  proTips?: string[];
  tags?: string[];
  status?: DealStatus;
  applicationUrl: string;
  providerWebsite?: string;
  logoUrl?: string;
  featured?: boolean;
  verified?: boolean;
  difficulty?: DealDifficulty;
  timeToApply?: string;
  successRate?: string;
  expiryDate?: string;
  dataSource?: string;
}

/**
 * Input type for updating an existing deal
 * All fields are optional
 */
export type DealUpdate = Partial<DealInput>;

/**
 * Filters for querying deals
 */
export interface DealFilters {
  category?: string;
  subcategory?: string;
  status?: DealStatus | DealStatus[];
  featured?: boolean;
  verified?: boolean;
  search?: string;
  tags?: string[];
  provider?: string;
  minValue?: number;
  maxValue?: number;
  difficulty?: DealDifficulty;
  includeDeleted?: boolean;
}

/**
 * Sort options for deal queries
 */
export type DealSortField = 'createdAt' | 'updatedAt' | 'title' | 'value' | 'viewCount' | 'expiryDate';
export type SortDirection = 'asc' | 'desc';

export interface DealSort {
  field: DealSortField;
  direction: SortDirection;
}

/**
 * Pagination options
 */
export interface PaginationOptions {
  page: number;
  pageSize: number;
}

/**
 * Paginated response
 */
export interface PaginatedDeals {
  deals: Deal[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

/**
 * Bulk import result
 */
export interface BulkImportResult {
  success: number;
  failed: number;
  errors: Array<{
    index: number;
    title?: string;
    error: string;
  }>;
  importedDeals: Deal[];
}

/**
 * Deal statistics
 */
export interface DealStats {
  total: number;
  active: number;
  expired: number;
  comingSoon: number;
  limited: number;
  paused: number;
  featured: number;
  verified: number;
  byCategory: Record<string, number>;
  recentlyAdded: number; // Last 7 days
  expiringSoon: number; // Next 7 days
}

/**
 * Custom error classes
 */
export class DealNotFoundError extends Error {
  constructor(identifier: string) {
    super(`Deal not found: ${identifier}`);
    this.name = 'DealNotFoundError';
  }
}

export class DuplicateSlugError extends Error {
  constructor(slug: string) {
    super(`Slug already exists: ${slug}`);
    this.name = 'DuplicateSlugError';
  }
}

export class ValidationError extends Error {
  public fields: Record<string, string>;
  
  constructor(message: string, fields: Record<string, string> = {}) {
    super(message);
    this.name = 'ValidationError';
    this.fields = fields;
  }
}

export class DatabaseConnectionError extends Error {
  constructor(message: string) {
    super(`Database connection error: ${message}`);
    this.name = 'DatabaseConnectionError';
  }
}
