-- Update logo URLs for ad-credit deals.
-- All URLs verified to return image content (HEAD/GET 200).
--
-- Run once in Supabase SQL editor.

BEGIN;

UPDATE public.deals SET logo_url = 'https://www.leadsquared.com/favicon.ico', updated_at = NOW()
WHERE slug = 'leadsquared-750';

UPDATE public.deals SET logo_url = 'https://www.gstatic.com/images/branding/product/2x/ads_48dp.png', updated_at = NOW()
WHERE slug = 'search-ads-924';

UPDATE public.deals SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg', updated_at = NOW()
WHERE slug = 'tiktok-for-business-ttam';

UPDATE public.deals SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg', updated_at = NOW()
WHERE slug = 'tiktok-ads';

UPDATE public.deals SET logo_url = 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', updated_at = NOW()
WHERE slug = 'microsoft-ads';

UPDATE public.deals SET logo_url = 'https://www.yelp.com/favicon.ico', updated_at = NOW()
WHERE slug = 'yelp-ads';

UPDATE public.deals SET logo_url = 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', updated_at = NOW()
WHERE slug = 'apple-search-ads';

UPDATE public.deals SET logo_url = 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png', updated_at = NOW()
WHERE slug = 'pinterest-ads';

UPDATE public.deals SET logo_url = 'https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png', updated_at = NOW()
WHERE slug = 'reddit-ads';

UPDATE public.deals SET logo_url = 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg', updated_at = NOW()
WHERE slug = 'spotify-ads';

UPDATE public.deals SET logo_url = 'https://upload.wikimedia.org/wikipedia/commons/9/91/Quora_logo_2015.svg', updated_at = NOW()
WHERE slug = 'quora-ads';

UPDATE public.deals SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg', updated_at = NOW()
WHERE slug = 'snapchat-ads-matched-credit';

COMMIT;

-- Verification — should show all 12 updated rows with new URLs
SELECT slug, title, logo_url
FROM public.deals
WHERE slug IN (
  'leadsquared-750',
  'search-ads-924',
  'tiktok-for-business-ttam',
  'tiktok-ads',
  'microsoft-ads',
  'yelp-ads',
  'apple-search-ads',
  'pinterest-ads',
  'reddit-ads',
  'spotify-ads',
  'quora-ads',
  'snapchat-ads-matched-credit'
)
ORDER BY slug;
