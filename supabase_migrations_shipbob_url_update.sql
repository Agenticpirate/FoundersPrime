-- Update the ShipBob deal (slug: shipbob-704) application link.
-- Was a placeholder Google search URL; set it to the official partner link.
--
-- The live /deals list and /deals/[slug] detail pages read from this table,
-- so this UPDATE is what makes the change visible in production.
-- Safe + reversible: scoped to a single slug; re-run-safe (idempotent).

UPDATE public.deals
SET
  application_url = 'https://product.shipbob.com/partners/secret',
  "applicationUrl" = 'https://product.shipbob.com/partners/secret',
  updated_at = NOW(),
  "lastUpdated" = NOW()
WHERE slug = 'shipbob-704';

NOTIFY pgrst, 'reload schema';
