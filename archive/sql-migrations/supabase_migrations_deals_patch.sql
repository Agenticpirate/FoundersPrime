-- Add missing columns to your existing deals table
ALTER TABLE public.deals 
ADD COLUMN IF NOT EXISTS recommended BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS "discountedPrice" TEXT,
ADD COLUMN IF NOT EXISTS "lastUpdated" TIMESTAMPTZ DEFAULT NOW();

-- Because your old table used snake_case for several arrays, 
-- but the new code uses camelCase for a few others, let's just 
-- safely ensure these exist too so the migration doesn't crash:
ALTER TABLE public.deals 
ADD COLUMN IF NOT EXISTS "applicationProcess" TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS "proTips" TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS "shortDescription" TEXT,
ADD COLUMN IF NOT EXISTS "originalPrice" TEXT,
ADD COLUMN IF NOT EXISTS "expiryDate" TEXT,
ADD COLUMN IF NOT EXISTS "applicationUrl" TEXT,
ADD COLUMN IF NOT EXISTS "providerWebsite" TEXT,
ADD COLUMN IF NOT EXISTS "logoUrl" TEXT,
ADD COLUMN IF NOT EXISTS "timeToApply" TEXT DEFAULT '15 minutes',
ADD COLUMN IF NOT EXISTS "successRate" TEXT,
ADD COLUMN IF NOT EXISTS "sourceVerified" BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS "dataSource" TEXT DEFAULT 'supabase';

NOTIFY pgrst, 'reload schema';
