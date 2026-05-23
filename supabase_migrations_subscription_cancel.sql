-- Add cancel_at_period_end flag to user_subscriptions so the UI can
-- show "Auto-renew off — access until [date]" before the webhook fires
-- the actual cancellation event.
--
-- Run once in Supabase SQL editor.

ALTER TABLE public.user_subscriptions
  ADD COLUMN IF NOT EXISTS cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE;

-- When the webhook receives subscription.cancelled, we already mark the row
-- status='cancelled' (see app/api/webhooks/dodo/route.ts deactivatePlan()).
-- This new column simply lets the UI show the pending state in between
-- "user clicked cancel" and "Dodo finalized at period end".

COMMENT ON COLUMN public.user_subscriptions.cancel_at_period_end IS
  'TRUE when the user requested cancellation but the subscription is still active until period_end. Reset on resume or after period_end webhook fires.';
