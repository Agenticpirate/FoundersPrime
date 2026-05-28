-- Remove duplicate deal entries from production.
-- Each removed slug has a richer non-duplicate counterpart that stays.
--
-- KEPT vs REMOVED:
--   google-ads-startup-credits      ← keep (10 benefits, 6 FAQs)
--   google-ads                      ← REMOVE (bare placeholder, 0 benefits)
--
--   google-for-startups-cloud       ← keep (12 benefits)
--   google-for-startups-cloud-program ← REMOVE (8 benefits, dup entry)
--
--   alibaba-cloud-startup           ← keep
--   alibaba-cloud-162               ← REMOVE (same URL, sparse data)
--
--   linkedin-ads-b2b-credits        ← keep (9 benefits)
--   linkedin-ads                    ← REMOVE (bare placeholder, 0 benefits)
--
-- Run once in Supabase SQL editor.

BEGIN;

DELETE FROM public.deals
WHERE slug IN (
  'google-ads',
  'google-for-startups-cloud-program',
  'alibaba-cloud-162',
  'linkedin-ads'
);

COMMIT;

-- Verification: should return 0 rows
SELECT slug, title
FROM public.deals
WHERE slug IN (
  'google-ads',
  'google-for-startups-cloud-program',
  'alibaba-cloud-162',
  'linkedin-ads'
);

-- Sanity check the kept counterparts still exist
SELECT slug, title, application_url
FROM public.deals
WHERE slug IN (
  'google-ads-startup-credits',
  'google-for-startups-cloud',
  'alibaba-cloud-startup',
  'linkedin-ads-b2b-credits'
)
ORDER BY slug;
