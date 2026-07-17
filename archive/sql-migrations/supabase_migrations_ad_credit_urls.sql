-- Bulk update of application URLs for ad-credit category deals.
-- Run once in Supabase SQL editor (production).
--
-- Each WHERE uses slug because Postgres folds unquoted identifiers to
-- lowercase and the deals table only has snake_case column names.
--
-- Source of truth: public/data/all-deals.json + data/processed-deals/all-deals.json
-- Validation script: scripts/validate-ad-credit-urls.js

BEGIN;

-- Snapchat Ads (matched-credit promo) — official Snapchat Business credit page
UPDATE public.deals
SET application_url = 'https://forbusiness.snapchat.com/en-US/get-snapchat-advertising-credits',
    updated_at = NOW()
WHERE slug = 'snapchat-ads-matched-credit';

-- TikTok for Business (TTAM partner program) — new advertiser offer page
UPDATE public.deals
SET application_url = 'https://ads.tiktok.com/business/en-US/new-advertiser-offer',
    updated_at = NOW()
WHERE slug = 'tiktok-for-business-ttam';

-- TikTok Ads (generic) — same new advertiser offer page
UPDATE public.deals
SET application_url = 'https://ads.tiktok.com/business/en-US/new-advertiser-offer',
    updated_at = NOW()
WHERE slug = 'tiktok-ads';

-- Search Ads (Google Ads management plan) — Google Ads landing page
UPDATE public.deals
SET application_url = 'https://business.google.com/us/google-ads/',
    updated_at = NOW()
WHERE slug = 'search-ads-924';

-- Apple Search Ads — root Apple Ads page (the deeper /app-store path
-- redirects through marketing pages; the root page surfaces the $100 promo).
UPDATE public.deals
SET application_url = 'https://ads.apple.com/',
    updated_at = NOW()
WHERE slug = 'apple-search-ads';

-- Spotify Ads — book-a-call page that also surfaces the $500 credit offer
UPDATE public.deals
SET application_url = 'https://ads.spotify.com/en-US/book-a-call-linkedin/',
    updated_at = NOW()
WHERE slug = 'spotify-ads';

-- Quora Ads — getting started page (homepage was a generic root redirect)
UPDATE public.deals
SET application_url = 'https://business.quora.com/advertising/getting-started/',
    updated_at = NOW()
WHERE slug = 'quora-ads';

-- Reddit Ads (generic) — point at the same ad-credit-offer page used by
-- reddit-ads-500-credit so users land on the actual claim page
UPDATE public.deals
SET application_url = 'https://www.business.reddit.com/marketing/ad-credit-offer',
    updated_at = NOW()
WHERE slug = 'reddit-ads';

COMMIT;

-- Sanity check — verify all updates applied
SELECT slug, title, application_url, updated_at
FROM public.deals
WHERE slug IN (
  'snapchat-ads-matched-credit',
  'tiktok-for-business-ttam',
  'tiktok-ads',
  'search-ads-924',
  'apple-search-ads',
  'spotify-ads',
  'quora-ads',
  'reddit-ads'
)
ORDER BY slug;
