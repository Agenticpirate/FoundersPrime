-- Keep the subscription plan constraint aligned with the canonical plan IDs
-- written by checkout, Dodo webhooks, and the admin plan editor.
-- Legacy aliases remain valid so existing rows can be migrated separately.

BEGIN;

DO $$
DECLARE
  plan_constraint RECORD;
BEGIN
  FOR plan_constraint IN
    SELECT DISTINCT constraint_info.conname
    FROM pg_constraint AS constraint_info
    JOIN pg_attribute AS column_info
      ON column_info.attrelid = constraint_info.conrelid
     AND column_info.attnum = ANY (constraint_info.conkey)
    WHERE constraint_info.conrelid = 'public.user_subscriptions'::regclass
      AND constraint_info.contype = 'c'
      AND column_info.attname = 'plan'
  LOOP
    EXECUTE format(
      'ALTER TABLE public.user_subscriptions DROP CONSTRAINT %I',
      plan_constraint.conname
    );
  END LOOP;
END
$$;

ALTER TABLE public.user_subscriptions
  ADD CONSTRAINT user_subscriptions_plan_check
  CHECK (plan IN ('free', 'explorer', 'campus', 'nextfounder', 'founder', 'legend'))
  NOT VALID;

ALTER TABLE public.user_subscriptions
  VALIDATE CONSTRAINT user_subscriptions_plan_check;

COMMIT;
