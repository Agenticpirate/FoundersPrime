/**
 * Supabase Schema Setup Script
 * 
 * This script creates the deals table and related objects in Supabase.
 * Run with: node scripts/setup-supabase-schema.js
 */

const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const schema = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create deals table
CREATE TABLE IF NOT EXISTS deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  subcategory VARCHAR(100),
  description TEXT NOT NULL,
  short_description VARCHAR(500),
  value VARCHAR(255) NOT NULL,
  original_price VARCHAR(100),
  savings VARCHAR(255),
  eligibility TEXT[] DEFAULT ARRAY['Startups'],
  requirements TEXT[] DEFAULT ARRAY['Valid business email'],
  application_process TEXT[] DEFAULT ARRAY['Visit provider website', 'Complete application', 'Await approval'],
  pro_tips TEXT[] DEFAULT ARRAY[]::TEXT[],
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'expired', 'coming-soon', 'limited', 'paused')),
  application_url TEXT NOT NULL,
  provider_website TEXT,
  logo_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  difficulty VARCHAR(20) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  time_to_apply VARCHAR(100) DEFAULT '15 minutes',
  success_rate VARCHAR(50),
  expiry_date TIMESTAMPTZ,
  view_count INTEGER DEFAULT 0,
  apply_count INTEGER DEFAULT 0,
  data_source VARCHAR(100) DEFAULT 'manual',
  source_verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_deals_slug ON deals(slug);
CREATE INDEX IF NOT EXISTS idx_deals_category ON deals(category);
CREATE INDEX IF NOT EXISTS idx_deals_status ON deals(status);
CREATE INDEX IF NOT EXISTS idx_deals_provider ON deals(provider);
CREATE INDEX IF NOT EXISTS idx_deals_featured ON deals(featured) WHERE deleted_at IS NULL AND featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_deals_created_at ON deals(created_at DESC);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  color VARCHAR(50),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (id, name, description, icon, sort_order) VALUES
  ('cloud-credits', 'Cloud Credits', 'Cloud infrastructure credits from major providers', 'cloud', 1),
  ('saas-discounts', 'SaaS Discounts', 'Discounts on popular SaaS tools', 'apps', 2),
  ('ai', 'AI & ML', 'AI and machine learning tools and credits', 'smart_toy', 3),
  ('grants', 'Grants', 'Non-dilutive funding opportunities', 'payments', 4),
  ('accelerators', 'Accelerators', 'Startup accelerator programs', 'rocket_launch', 5),
  ('incubators', 'Incubators', 'Startup incubator programs', 'science', 6),
  ('ad-credits', 'Ad Credits', 'Advertising credits for marketing', 'campaign', 7),
  ('other', 'Other', 'Other startup resources and deals', 'category', 8)
ON CONFLICT (id) DO NOTHING;
`;

async function setupSchema() {
  console.log('🚀 Setting up Supabase schema...');
  console.log(`📍 Project URL: ${supabaseUrl}`);
  
  try {
    // Execute the schema SQL
    const { error } = await supabase.rpc('exec_sql', { sql: schema });
    
    if (error) {
      // If exec_sql doesn't exist, we need to run SQL directly via REST API
      console.log('⚠️  exec_sql not available, trying direct approach...');
      
      // Test connection by checking if deals table exists
      const { data, error: testError } = await supabase
        .from('deals')
        .select('count')
        .limit(1);
      
      if (testError && testError.code === '42P01') {
        // Table doesn't exist - need to create via SQL Editor
        console.log('\n❌ The deals table does not exist yet.');
        console.log('\n📋 Please run the following SQL in your Supabase SQL Editor:');
        console.log('   1. Go to: https://supabase.com/dashboard/project/gxwmhcaevcsexhzdcyrj/sql');
        console.log('   2. Copy the contents of: docs/supabase-schema.sql');
        console.log('   3. Click "Run" to execute the SQL\n');
        return false;
      } else if (testError) {
        throw testError;
      } else {
        console.log('✅ Deals table already exists!');
        return true;
      }
    }
    
    console.log('✅ Schema created successfully!');
    return true;
  } catch (err) {
    console.error('❌ Error:', err.message);
    return false;
  }
}

async function testConnection() {
  console.log('\n🔍 Testing database connection...');
  
  try {
    const { data, error } = await supabase
      .from('deals')
      .select('count')
      .limit(1);
    
    if (error) {
      if (error.code === '42P01') {
        console.log('⚠️  Deals table not found - schema needs to be created');
        return false;
      }
      throw error;
    }
    
    console.log('✅ Connection successful! Deals table exists.');
    return true;
  } catch (err) {
    console.error('❌ Connection test failed:', err.message);
    return false;
  }
}

async function main() {
  const connected = await testConnection();
  
  if (!connected) {
    console.log('\n📋 NEXT STEP: Run the SQL schema in Supabase Dashboard');
    console.log('   URL: https://supabase.com/dashboard/project/gxwmhcaevcsexhzdcyrj/sql');
    console.log('   File: docs/supabase-schema.sql\n');
  }
}

main();
