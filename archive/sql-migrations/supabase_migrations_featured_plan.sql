-- ============================================================================
-- Featured Listing plan — adds the chosen duration plan to deal_submissions
-- ============================================================================
-- 'weekly'  → 7-day featured window  (~$25)
-- 'monthly' → 30-day featured window ($99)
--
-- Existing rows default to 'monthly' so historical behaviour is unchanged.
-- ============================================================================

ALTER TABLE public.deal_submissions
  ADD COLUMN IF NOT EXISTS featured_plan TEXT NOT NULL DEFAULT 'monthly';

NOTIFY pgrst, 'reload schema';
