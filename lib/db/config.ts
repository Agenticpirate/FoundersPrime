/**
 * Database Configuration
 * 
 * This module handles database configuration and environment validation.
 * Supports both Supabase (PostgreSQL) and MongoDB.
 */

export type DatabaseType = 'supabase' | 'mongodb' | 'json';

export interface DatabaseConfig {
  type: DatabaseType;
  supabase?: {
    url: string;
    anonKey: string;
    serviceRoleKey: string;
  };
  mongodb?: {
    uri: string;
  };
}

/**
 * Validates that required environment variables are set
 */
function validateEnvironment(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const dbType = process.env.DATABASE_TYPE as DatabaseType;

  // If no database type is set, default to JSON (file-based)
  if (!dbType || dbType === 'json') {
    return { valid: true, errors: [] };
  }

  if (dbType === 'supabase') {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      errors.push('NEXT_PUBLIC_SUPABASE_URL is required for Supabase');
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      errors.push('NEXT_PUBLIC_SUPABASE_ANON_KEY is required for Supabase');
    }
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      errors.push('SUPABASE_SERVICE_ROLE_KEY is required for Supabase (server-side operations)');
    }
  } else if (dbType === 'mongodb') {
    if (!process.env.MONGODB_URI) {
      errors.push('MONGODB_URI is required for MongoDB');
    }
  } else {
    errors.push(`Invalid DATABASE_TYPE: ${dbType}. Must be 'supabase', 'mongodb', or 'json'`);
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Gets the current database configuration
 */
export function getDatabaseConfig(): DatabaseConfig {
  const dbType = (process.env.DATABASE_TYPE as DatabaseType) || 'json';

  const config: DatabaseConfig = {
    type: dbType,
  };

  if (dbType === 'supabase') {
    config.supabase = {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    };
  } else if (dbType === 'mongodb') {
    config.mongodb = {
      uri: process.env.MONGODB_URI || '',
    };
  }

  return config;
}

/**
 * Validates the database configuration on startup
 * Call this in your app initialization
 */
export function validateDatabaseConfig(): void {
  const { valid, errors } = validateEnvironment();
  
  if (!valid) {
    console.error('❌ Database configuration errors:');
    errors.forEach(error => console.error(`   - ${error}`));
    
    // In development, warn but don't crash (allows JSON fallback)
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Database configuration invalid: ${errors.join(', ')}`);
    } else {
      console.warn('⚠️  Falling back to JSON file storage in development mode');
    }
  } else {
    const dbType = process.env.DATABASE_TYPE || 'json';
    console.log(`✅ Database configured: ${dbType}`);
  }
}

/**
 * Check if database is configured (not using JSON fallback)
 */
export function isDatabaseConfigured(): boolean {
  const dbType = process.env.DATABASE_TYPE as DatabaseType;
  return dbType === 'supabase' || dbType === 'mongodb';
}

/**
 * Get admin password for simple auth
 */
export function getAdminPassword(): string | undefined {
  return process.env.ADMIN_PASSWORD;
}
