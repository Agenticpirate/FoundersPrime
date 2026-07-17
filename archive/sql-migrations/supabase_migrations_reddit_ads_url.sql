-- Update Reddit Ads ($500 matched credit) deal application URL
-- The previous link (business.reddit.com root) was the generic Reddit
-- Business landing page. The dedicated promo page for the matched-credit
-- offer is /marketing/ad-credit-offer.
--
-- Run once in Supabase SQL editor.

UPDATE public.deals
SET
  application_url = 'https://www.business.reddit.com/marketing/ad-credit-offer',
  updated_at = NOW()
WHERE slug = 'reddit-ads-500-credit';

-- Sanity check
SELECT slug, title, application_url
FROM public.deals
WHERE slug = 'reddit-ads-500-credit';
