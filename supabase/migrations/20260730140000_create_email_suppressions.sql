-- Address-level email suppression list.
--
-- Google, Yahoo and Microsoft all judge senders on spam-complaint and bounce
-- rates. Continuing to mail an address that hard-bounced or filed a complaint is
-- the fastest way to lose domain reputation, so every send is checked against
-- this table first.
--
-- Rows are written by the Resend webhook (bounce / complaint / suppression
-- events) and are never removed automatically: a complaint is a permanent
-- signal unless a human reverses it deliberately.

BEGIN;

SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '30s';

CREATE TABLE IF NOT EXISTS public.email_suppressions (
  email TEXT PRIMARY KEY,
  reason TEXT NOT NULL CHECK (reason IN ('hard_bounce', 'soft_bounce', 'complaint', 'provider', 'manual')),
  detail TEXT,
  source TEXT,
  suppressed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.email_suppressions IS
  'Addresses that must not be emailed. Checked before every send to protect sender reputation.';

COMMENT ON COLUMN public.email_suppressions.email IS
  'Lower-cased recipient address. Primary key so repeated events are idempotent.';

COMMENT ON COLUMN public.email_suppressions.reason IS
  'Why the address is suppressed. complaint and hard_bounce are permanent; soft_bounce is advisory.';

COMMENT ON COLUMN public.email_suppressions.detail IS
  'Provider-supplied explanation, kept for auditing a disputed suppression.';

COMMENT ON COLUMN public.email_suppressions.source IS
  'Which system recorded it, e.g. resend_webhook or admin.';

CREATE INDEX IF NOT EXISTS email_suppressions_reason_idx
  ON public.email_suppressions (reason);

CREATE OR REPLACE FUNCTION public.touch_email_suppressions_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS touch_email_suppressions_updated_at ON public.email_suppressions;

CREATE TRIGGER touch_email_suppressions_updated_at
  BEFORE UPDATE ON public.email_suppressions
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_email_suppressions_updated_at();

-- No policies are defined: with RLS enabled and no policy, anon and authenticated
-- clients are denied entirely. Only the service role (which bypasses RLS) can
-- read or write, which is correct for a deliverability control surface.
ALTER TABLE public.email_suppressions ENABLE ROW LEVEL SECURITY;

COMMIT;
