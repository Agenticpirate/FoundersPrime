-- Deal application URL updates.
-- Append more updates as we find them.

BEGIN;

-- Visible.vc — proper partners landing page
UPDATE public.deals
SET application_url = 'https://visible.vc/partners/',
    updated_at = NOW()
WHERE slug = 'visible-vc-846';

-- SuperProfile — referral link
UPDATE public.deals
SET application_url = 'https://superprofile.bio?referralCode=hIkbqc&referralType=creatorReferral&source=referralPage',
    updated_at = NOW()
WHERE slug = 'superprofile-196';

-- Apple Search Ads — official $100 promo credit help page
UPDATE public.deals
SET application_url = 'https://ads.apple.com/app-store/help/billing/0032-apple-ads-promo-credit',
    updated_at = NOW()
WHERE slug = 'apple-search-ads';

COMMIT;

-- Verify
SELECT slug, title, application_url
FROM public.deals
WHERE slug IN ('visible-vc-846', 'superprofile-196', 'apple-search-ads')
ORDER BY slug;
