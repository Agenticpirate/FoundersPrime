-- Introduce Dodo-named provider identifier columns alongside the legacy
-- stripe_* names. FoundersPrime has always billed through Dodo Payments; only
-- the column names were inherited from an earlier schema draft.
--
-- This migration is additive and reversible: no column is dropped and no
-- identifier value is altered. A bidirectional trigger keeps both names in
-- sync so the previous deployment and the new deployment can run at the same
-- time during rollout, and so in-flight Dodo webhooks cannot lose data.

BEGIN;

-- Never queue checkout/webhook writes behind an unbounded schema lock. If the
-- lock cannot be acquired promptly, abort and retry rather than blocking
-- purchases or renewals.
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '30s';

ALTER TABLE public.user_subscriptions
  ADD COLUMN IF NOT EXISTS dodo_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS dodo_subscription_id TEXT;

COMMENT ON COLUMN public.user_subscriptions.dodo_customer_id IS
  'Dodo Payments customer identifier. Canonical replacement for stripe_customer_id.';

COMMENT ON COLUMN public.user_subscriptions.dodo_subscription_id IS
  'Dodo Payments subscription identifier used to stop auto-renewal. Canonical replacement for stripe_subscription_id.';

COMMENT ON COLUMN public.user_subscriptions.stripe_customer_id IS
  'DEPRECATED legacy name retained for rollback safety. Mirrors dodo_customer_id; FoundersPrime does not use Stripe.';

COMMENT ON COLUMN public.user_subscriptions.stripe_subscription_id IS
  'DEPRECATED legacy name retained for rollback safety. Mirrors dodo_subscription_id; FoundersPrime does not use Stripe.';

-- Backfill the canonical columns from the legacy values already stored by the
-- Dodo webhook. Only NULL targets are written.
UPDATE public.user_subscriptions
SET
  dodo_customer_id = COALESCE(dodo_customer_id, stripe_customer_id),
  dodo_subscription_id = COALESCE(dodo_subscription_id, stripe_subscription_id)
WHERE
  (dodo_customer_id IS NULL AND stripe_customer_id IS NOT NULL)
  OR (dodo_subscription_id IS NULL AND stripe_subscription_id IS NOT NULL);

-- Keep both names consistent regardless of which one a given deployment
-- writes. Whichever side changes wins; gaps are filled from the other side.
CREATE OR REPLACE FUNCTION public.sync_subscription_provider_ids()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF NEW.dodo_customer_id IS DISTINCT FROM OLD.dodo_customer_id THEN
      NEW.stripe_customer_id := NEW.dodo_customer_id;
    ELSIF NEW.stripe_customer_id IS DISTINCT FROM OLD.stripe_customer_id THEN
      NEW.dodo_customer_id := NEW.stripe_customer_id;
    END IF;

    IF NEW.dodo_subscription_id IS DISTINCT FROM OLD.dodo_subscription_id THEN
      NEW.stripe_subscription_id := NEW.dodo_subscription_id;
    ELSIF NEW.stripe_subscription_id IS DISTINCT FROM OLD.stripe_subscription_id THEN
      NEW.dodo_subscription_id := NEW.stripe_subscription_id;
    END IF;
  END IF;

  NEW.dodo_customer_id := COALESCE(NEW.dodo_customer_id, NEW.stripe_customer_id);
  NEW.stripe_customer_id := COALESCE(NEW.stripe_customer_id, NEW.dodo_customer_id);
  NEW.dodo_subscription_id := COALESCE(NEW.dodo_subscription_id, NEW.stripe_subscription_id);
  NEW.stripe_subscription_id := COALESCE(NEW.stripe_subscription_id, NEW.dodo_subscription_id);

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS sync_subscription_provider_ids ON public.user_subscriptions;

CREATE TRIGGER sync_subscription_provider_ids
  BEFORE INSERT OR UPDATE ON public.user_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_subscription_provider_ids();

-- Fail the whole migration if any row would disagree between the two names.
DO $$
DECLARE
  mismatched INTEGER;
BEGIN
  SELECT COUNT(*) INTO mismatched
  FROM public.user_subscriptions
  WHERE dodo_customer_id IS DISTINCT FROM stripe_customer_id
     OR dodo_subscription_id IS DISTINCT FROM stripe_subscription_id;

  IF mismatched > 0 THEN
    RAISE EXCEPTION
      'Provider identifier backfill left % row(s) inconsistent', mismatched;
  END IF;
END
$$;

COMMIT;
