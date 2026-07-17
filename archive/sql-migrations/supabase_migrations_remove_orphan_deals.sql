-- Remove orphaned/broken deal entries from production.
-- Either the slug doesn't exist in our JSON catalog, or it was
-- explicitly flagged for removal during catalog cleanup.
--
-- Append more slugs to this list as we find more bad rows.

BEGIN;

DELETE FROM public.deals
WHERE slug IN (
  -- Orphans (broken/404 single-deal pages)
  '11x-ai-410',
  'adriel-418',

  -- Cleanup batch 1
  'winston-ai-280',
  'wing-assistant-544',
  'wetransact-406',
  'waalaxy-ex-prospectin-862',
  'vistaprint-452',
  'vista-social-286',

  -- Cleanup batch 2
  'starter-story-674',
  'sweet-show-888',
  'uber-for-business-218',
  'b12-io-352',
  'array-46',
  'appmysite-322',
  'artlist-216',
  'attio-648',

  -- Cleanup batch 3
  'acumbamail-522'
);

COMMIT;

-- Verification — should return 0 rows
SELECT slug, title
FROM public.deals
WHERE slug IN (
  '11x-ai-410',
  'adriel-418',
  'winston-ai-280',
  'wing-assistant-544',
  'wetransact-406',
  'waalaxy-ex-prospectin-862',
  'vistaprint-452',
  'vista-social-286',
  'starter-story-674',
  'sweet-show-888',
  'uber-for-business-218',
  'b12-io-352',
  'array-46',
  'appmysite-322',
  'artlist-216',
  'attio-648',
  'acumbamail-522'
);
