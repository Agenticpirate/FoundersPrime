-- Update Microsoft Advertising deal application URL
-- The previous link (en-us/get-started/sign-up) was the generic ads signup
-- form. The correct entry point for the agency-credit program is the
-- agency-center contact form.
--
-- Run once in Supabase SQL editor.

UPDATE public.deals
SET
  application_url = 'https://about.ads.microsoft.com/en/forms/agency-center-contact',
  updated_at = NOW()
WHERE slug = 'microsoft-ads';

-- Sanity check (optional — read back the row)
SELECT slug, title, application_url
FROM public.deals
WHERE slug = 'microsoft-ads';
