-- Migration to add cancellation feedback columns to user_subscriptions
-- Run this in the Supabase SQL Editor.

ALTER TABLE public.user_subscriptions
  ADD COLUMN IF NOT EXISTS cancel_reason TEXT,
  ADD COLUMN IF NOT EXISTS cancel_feedback TEXT;

COMMENT ON COLUMN public.user_subscriptions.cancel_reason IS 'Selected reason for auto-renewal cancellation';
COMMENT ON COLUMN public.user_subscriptions.cancel_feedback IS 'Detailed feedback comments provided by the user during cancellation';
