-- Persist scheduled cancellation state after Dodo accepts a request to stop
-- renewal at the next billing date. Application writes remain server-side via
-- the service-role client; existing SELECT-only user RLS stays unchanged.

BEGIN;

ALTER TABLE public.user_subscriptions
  ADD COLUMN IF NOT EXISTS cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS cancel_reason TEXT,
  ADD COLUMN IF NOT EXISTS cancel_feedback TEXT;

COMMENT ON COLUMN public.user_subscriptions.cancel_at_period_end IS
  'TRUE after Dodo schedules cancellation at the next billing date; access remains active through period_end.';

COMMENT ON COLUMN public.user_subscriptions.cancel_reason IS
  'Optional cancellation reason selected by the subscriber.';

COMMENT ON COLUMN public.user_subscriptions.cancel_feedback IS
  'Optional cancellation feedback supplied by the subscriber.';

COMMIT;
