/**
 * Database Adapter Interface
 * 
 * Defines the contract that all database adapters must implement.
 * This allows switching between Supabase, MongoDB, or JSON storage
 * without changing application code.
 */

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
} from './types';

/**
 * Database Adapter Interface
 * All database implementations must implement this interface
 */
export interface DatabaseAdapter {
  /**
   * Connection Management
   */
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;

  /**
   * CRUD Operations
   */
  
  // Create a new deal
  createDeal(input: DealInput): Promise<Deal>;
  
  // Get a deal by its unique slug
  getDealBySlug(slug: string): Promise<Deal | null>;
  
  // Get a deal by its ID
  getDealById(id: string): Promise<Deal | null>;
  
  // Update an existing deal
  updateDeal(id: string, update: DealUpdate): Promise<Deal>;
  
  // Soft delete a deal (sets deletedAt timestamp)
  deleteDeal(id: string): Promise<void>;
  
  // Permanently delete a deal
  hardDeleteDeal(id: string): Promise<void>;
  
  // Restore a soft-deleted deal
  restoreDeal(id: string): Promise<Deal>;

  /**
   * Query Operations
   */
  
  // List deals with filtering, sorting, and pagination
  listDeals(
    filters?: DealFilters,
    sort?: DealSort,
    pagination?: PaginationOptions
  ): Promise<PaginatedDeals>;
  
  // Search deals by text query
  searchDeals(
    query: string,
    filters?: DealFilters,
    pagination?: PaginationOptions
  ): Promise<PaginatedDeals>;
  
  // Get all deals (no pagination, use with caution)
  getAllDeals(filters?: DealFilters): Promise<Deal[]>;

  /**
   * Bulk Operations
   */
  
  // Import multiple deals at once
  bulkCreateDeals(inputs: DealInput[]): Promise<BulkImportResult>;
  
  // Update multiple deals
  bulkUpdateDeals(updates: Array<{ id: string; update: DealUpdate }>): Promise<number>;
  
  // Delete multiple deals
  bulkDeleteDeals(ids: string[]): Promise<number>;

  /**
   * Slug Operations
   */
  
  // Generate a unique slug from a title
  generateUniqueSlug(title: string): Promise<string>;
  
  // Check if a slug exists
  slugExists(slug: string): Promise<boolean>;

  /**
   * Statistics
   */
  
  // Get deal statistics
  getStats(): Promise<DealStats>;
  
  // Increment view count for a deal
  incrementViewCount(id: string): Promise<void>;
  
  // Increment apply count for a deal
  incrementApplyCount(id: string): Promise<void>;

  /**
   * Maintenance
   */
  
  // Update expired deals status
  updateExpiredDeals(): Promise<number>;
  
  // Get deals expiring soon (within days)
  getExpiringSoon(days: number): Promise<Deal[]>;
}

/**
 * Base adapter class with common utility methods
 */
export abstract class BaseAdapter implements DatabaseAdapter {
  protected connected: boolean = false;

  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  
  isConnected(): boolean {
    return this.connected;
  }

  abstract createDeal(input: DealInput): Promise<Deal>;
  abstract getDealBySlug(slug: string): Promise<Deal | null>;
  abstract getDealById(id: string): Promise<Deal | null>;
  abstract updateDeal(id: string, update: DealUpdate): Promise<Deal>;
  abstract deleteDeal(id: string): Promise<void>;
  abstract hardDeleteDeal(id: string): Promise<void>;
  abstract restoreDeal(id: string): Promise<Deal>;
  abstract listDeals(
    filters?: DealFilters,
    sort?: DealSort,
    pagination?: PaginationOptions
  ): Promise<PaginatedDeals>;
  abstract searchDeals(
    query: string,
    filters?: DealFilters,
    pagination?: PaginationOptions
  ): Promise<PaginatedDeals>;
  abstract getAllDeals(filters?: DealFilters): Promise<Deal[]>;
  abstract bulkCreateDeals(inputs: DealInput[]): Promise<BulkImportResult>;
  abstract bulkUpdateDeals(updates: Array<{ id: string; update: DealUpdate }>): Promise<number>;
  abstract bulkDeleteDeals(ids: string[]): Promise<number>;
  abstract generateUniqueSlug(title: string): Promise<string>;
  abstract slugExists(slug: string): Promise<boolean>;
  abstract getStats(): Promise<DealStats>;
  abstract incrementViewCount(id: string): Promise<void>;
  abstract incrementApplyCount(id: string): Promise<void>;
  abstract updateExpiredDeals(): Promise<number>;
  abstract getExpiringSoon(days: number): Promise<Deal[]>;

  /**
   * Utility: Generate a slug from a title
   */
  protected slugify(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  }

  /**
   * Utility: Generate a unique ID
   */
  protected generateId(): string {
    return `deal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Utility: Get current ISO timestamp
   */
  protected now(): string {
    return new Date().toISOString();
  }

  /**
   * Utility: Get current date string (YYYY-MM-DD)
   */
  protected today(): string {
    return new Date().toISOString().split('T')[0];
  }
}
