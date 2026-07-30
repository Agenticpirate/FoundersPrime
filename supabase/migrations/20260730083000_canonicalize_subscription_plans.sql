-- Canonicalize historical Next Founder plan identifiers without changing any
-- entitlement, billing, identity, status, or audit fields.

BEGIN;

-- Never queue checkout/webhook writes behind an unbounded schema lock. If the
-- brief constraint swap cannot acquire its lock promptly, abort and retry the
-- entire transaction later; no partial backfill can commit.
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '30s';

UPDATE public.user_subscriptions
SET plan = 'nextfounder'
WHERE plan IN ('explorer', 'campus');

ALTER TABLE public.user_subscriptions
  ADD CONSTRAINT user_subscriptions_plan_canonical_check
  CHECK (plan IN ('free', 'nextfounder', 'founder', 'legend'))
  NOT VALID;

ALTER TABLE public.user_subscriptions
  VALIDATE CONSTRAINT user_subscriptions_plan_canonical_check;

-- Replace only the known historical plan constraint. Any unrelated check that
-- also references plan remains untouched.
ALTER TABLE public.user_subscriptions
  DROP CONSTRAINT IF EXISTS user_subscriptions_plan_check;

ALTER TABLE public.user_subscriptions
  RENAME CONSTRAINT user_subscriptions_plan_canonical_check
  TO user_subscriptions_plan_check;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM public.user_subscriptions
    WHERE plan IN ('explorer', 'campus')
  ) THEN
    RAISE EXCEPTION 'Legacy subscription plans remain after canonicalization';
  END IF;
END
$$;

COMMIT;
