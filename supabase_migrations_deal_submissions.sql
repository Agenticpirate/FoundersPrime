-- ============================================================================
-- deal_submissions table
-- Stores public deal submissions awaiting admin review.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.deal_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Provider details
  company_name TEXT NOT NULL,
  website_url TEXT NOT NULL,
  logo_url TEXT,

  -- Deal details
  benefit_description TEXT NOT NULL,
  category TEXT NOT NULL,
  deal_value TEXT NOT NULL,
  redemption_method TEXT NOT NULL DEFAULT 'link',
  redemption_link TEXT NOT NULL,
  is_exclusive BOOLEAN NOT NULL DEFAULT false,

  -- Submitter
  submitter_email TEXT,
  submitter_ip TEXT,
  user_agent TEXT,

  -- Workflow
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam')),
  admin_notes TEXT,
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast admin queries
CREATE INDEX IF NOT EXISTS deal_submissions_status_idx
  ON public.deal_submissions (status, created_at DESC);

CREATE INDEX IF NOT EXISTS deal_submissions_created_idx
  ON public.deal_submissions (created_at DESC);

-- Enable RLS
ALTER TABLE public.deal_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: nobody can read submissions via the anon/auth client.
-- The API uses the service role key (bypasses RLS) for all reads/writes.
-- This prevents anyone from listing submissions or reading other people's data.

-- Optional: allow anyone to INSERT (since the form is public and we use anon key).
-- The API already validates+sanitizes input.
DROP POLICY IF EXISTS "Anyone can submit a deal" ON public.deal_submissions;
CREATE POLICY "Anyone can submit a deal"
  ON public.deal_submissions
  FOR INSERT
  WITH CHECK (true);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_deal_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS deal_submissions_set_updated_at ON public.deal_submissions;
CREATE TRIGGER deal_submissions_set_updated_at
  BEFORE UPDATE ON public.deal_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.set_deal_submissions_updated_at();

NOTIFY pgrst, 'reload schema';
