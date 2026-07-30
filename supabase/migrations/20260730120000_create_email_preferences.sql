-- Per-user email preferences.
--
-- FoundersPrime sends two classes of email:
--   transactional  — account created, membership activated, billing notices.
--                    Always delivered; not represented in this table.
--   optional       — deal alerts, membership offers, product updates.
--                    Delivered only where the matching column is TRUE.
--
-- Every optional category defaults to FALSE. Existing accounts therefore start
-- with no marketing consent, which is the correct legal position: those users
-- created a product account and never agreed to receive campaigns.

BEGIN;

SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '30s';

CREATE TABLE IF NOT EXISTS public.email_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  deal_alerts BOOLEAN NOT NULL DEFAULT FALSE,
  membership_offers BOOLEAN NOT NULL DEFAULT FALSE,
  product_updates BOOLEAN NOT NULL DEFAULT FALSE,
  opted_in_at TIMESTAMPTZ,
  unsubscribed_all_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.email_preferences IS
  'Opt-in state for optional email categories. Transactional email is not governed by this table.';

COMMENT ON COLUMN public.email_preferences.deal_alerts IS
  'TRUE when the user agreed to receive newly verified deal announcements.';

COMMENT ON COLUMN public.email_preferences.membership_offers IS
  'TRUE when the user agreed to receive membership and pricing offers.';

COMMENT ON COLUMN public.email_preferences.product_updates IS
  'TRUE when the user agreed to receive product and feature updates.';

COMMENT ON COLUMN public.email_preferences.opted_in_at IS
  'Timestamp of the first affirmative consent. Required evidence before any campaign send.';

COMMENT ON COLUMN public.email_preferences.unsubscribed_all_at IS
  'Set when the user unsubscribed from everything optional. Acts as a suppression marker.';

-- Campaign sends select on a single category flag, so index the common filters.
CREATE INDEX IF NOT EXISTS email_preferences_deal_alerts_idx
  ON public.email_preferences (deal_alerts)
  WHERE deal_alerts = TRUE;

CREATE INDEX IF NOT EXISTS email_preferences_membership_offers_idx
  ON public.email_preferences (membership_offers)
  WHERE membership_offers = TRUE;

CREATE INDEX IF NOT EXISTS email_preferences_product_updates_idx
  ON public.email_preferences (product_updates)
  WHERE product_updates = TRUE;

-- Keep updated_at honest without relying on application code.
CREATE OR REPLACE FUNCTION public.touch_email_preferences_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS touch_email_preferences_updated_at ON public.email_preferences;

CREATE TRIGGER touch_email_preferences_updated_at
  BEFORE UPDATE ON public.email_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_email_preferences_updated_at();

ALTER TABLE public.email_preferences ENABLE ROW LEVEL SECURITY;

-- Unlike the read-only subscription tables, users must be able to write their
-- own preferences from the dashboard. Each policy is pinned to auth.uid() so a
-- session can never read or modify another account's row.
DROP POLICY IF EXISTS "Users can view own email preferences." ON public.email_preferences;
CREATE POLICY "Users can view own email preferences."
  ON public.email_preferences FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own email preferences." ON public.email_preferences;
CREATE POLICY "Users can create own email preferences."
  ON public.email_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own email preferences." ON public.email_preferences;
CREATE POLICY "Users can update own email preferences."
  ON public.email_preferences FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Guard against a future default flip silently granting consent to everyone.
DO $$
DECLARE
  consented INTEGER;
BEGIN
  SELECT COUNT(*) INTO consented
  FROM public.email_preferences
  WHERE (deal_alerts OR membership_offers OR product_updates)
    AND opted_in_at IS NULL;

  IF consented > 0 THEN
    RAISE EXCEPTION
      '% preference row(s) enable a category without a recorded opt-in timestamp', consented;
  END IF;
END
$$;

COMMIT;
