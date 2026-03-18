-- Create deals table
CREATE TABLE IF NOT EXISTS public.deals (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    provider TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    description TEXT,
    "shortDescription" TEXT,
    value TEXT,
    "originalPrice" TEXT,
    "discountedPrice" TEXT,
    savings TEXT,
    eligibility TEXT[] DEFAULT '{}',
    requirements TEXT[] DEFAULT '{}',
    "applicationProcess" TEXT[] DEFAULT '{}',
    "proTips" TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'active',
    "expiryDate" TEXT,
    "applicationUrl" TEXT,
    "providerWebsite" TEXT,
    "logoUrl" TEXT,
    featured BOOLEAN DEFAULT false,
    recommended BOOLEAN DEFAULT false,
    verified BOOLEAN DEFAULT true,
    difficulty TEXT DEFAULT 'medium',
    "timeToApply" TEXT DEFAULT '15 minutes',
    "successRate" TEXT,
    "lastUpdated" TIMESTAMPTZ DEFAULT NOW(),
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
    "sourceVerified" BOOLEAN DEFAULT true,
    "dataSource" TEXT DEFAULT 'supabase'
);

-- Protect table with RLS
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

-- 1. Anyone can read deals
CREATE POLICY "Anyone can view deals"
ON public.deals FOR SELECT
USING (true);

-- 2. Only authenticated admins can insert/update/delete deals
-- (We use the admin_users table you already have setup)
CREATE POLICY "Admins can manage deals"
ON public.deals FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.email = (SELECT auth.jwt()->>'email')
    AND admin_users.is_active = true
  )
);
