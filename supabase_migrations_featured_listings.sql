-- ============================================================================
-- Featured Listings — extends deal_submissions with paid feature flags
-- ============================================================================

ALTER TABLE public.deal_submissions
  ADD COLUMN IF NOT EXISTS featured_requested BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS featured_paid BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS featured_until TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS featured_payment_id TEXT,
  ADD COLUMN IF NOT EXISTS featured_amount_cents INTEGER;

-- Optional: also add to deals table so listings remember "featured" status post-approval
ALTER TABLE public.deals
  ADD COLUMN IF NOT EXISTS featured_until TIMESTAMPTZ;

-- Index to quickly find currently-featured deals (for sort/pin)
CREATE INDEX IF NOT EXISTS deals_featured_until_idx
  ON public.deals (featured_until DESC)
  WHERE featured_until IS NOT NULL;

NOTIFY pgrst, 'reload schema';
