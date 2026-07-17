/**
 * Database Module
 * 
 * Main entry point for database operations.
 * Provides a singleton database adapter based on configuration.
 */

import { DatabaseAdapter } from './adapter';
import { getDatabaseConfig, validateDatabaseConfig } from './config';
import { JsonAdapter } from './adapters/json-adapter';

// Re-export types
export * from './types';
export * from './adapter';
export * from './config';

// Singleton adapter instance
let adapterInstance: DatabaseAdapter | null = null;

/**
 * Get the database adapter instance
 * Creates and connects the adapter on first call
 */
export async function getDatabase(): Promise<DatabaseAdapter> {
  if (adapterInstance && adapterInstance.isConnected()) {
    return adapterInstance;
  }

  // Validate configuration
  validateDatabaseConfig();
  
  const config = getDatabaseConfig();
  
  switch (config.type) {
    case 'supabase':
      // Dynamically import Supabase adapter to avoid loading if not needed
      const { SupabaseAdapter } = await import('./adapters/supabase-adapter');
      adapterInstance = new SupabaseAdapter(config.supabase!);
      break;
      
    case 'mongodb':
      // Dynamically import MongoDB adapter to avoid loading if not needed
      const { MongoDBAdapter } = await import('./adapters/mongodb-adapter');
      adapterInstance = new MongoDBAdapter(config.mongodb!);
      break;
      
    case 'json':
    default:
      adapterInstance = new JsonAdapter();
      break;
  }

  await adapterInstance.connect();
  return adapterInstance;
}

/**
 * Get the database adapter without connecting
 * Useful for checking configuration
 */
export function getDatabaseSync(): DatabaseAdapter | null {
  return adapterInstance;
}

/**
 * Close the database connection
 */
export async function closeDatabase(): Promise<void> {
  if (adapterInstance) {
    await adapterInstance.disconnect();
    adapterInstance = null;
  }
}

/**
 * Helper function to get deals with common defaults
 */
export async function getDeals(options?: {
  category?: string;
  status?: string;
  featured?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
  sort?: 'newest' | 'oldest' | 'popular';
}) {
  const db = await getDatabase();
  
  const filters: any = {};
  if (options?.category) filters.category = options.category;
  if (options?.status) filters.status = options.status;
  if (options?.featured !== undefined) filters.featured = options.featured;
  
  const sort: any = {
    field: 'createdAt',
    direction: 'desc',
  };
  
  if (options?.sort === 'oldest') {
    sort.direction = 'asc';
  } else if (options?.sort === 'popular') {
    sort.field = 'viewCount';
  }
  
  const pagination = {
    page: options?.page || 1,
    pageSize: options?.pageSize || 20,
  };
  
  if (options?.search) {
    return db.searchDeals(options.search, filters, pagination);
  }
  
  return db.listDeals(filters, sort, pagination);
}

/**
 * Helper function to get a single deal by slug
 */
export async function getDealBySlug(slug: string) {
  const db = await getDatabase();
  return db.getDealBySlug(slug);
}

/**
 * Helper function to get deal statistics
 */
export async function getDealStats() {
  const db = await getDatabase();
  return db.getStats();
}
