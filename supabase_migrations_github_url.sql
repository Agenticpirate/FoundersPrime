-- Update GitHub for Startups deal application URL.
-- Old: https://resources.github.com/startups/  (marketing/resources page)
-- New: https://github.com/enterprise/startups   (program landing/apply page)

UPDATE public.deals
SET application_url = 'https://github.com/enterprise/startups',
    updated_at = NOW()
WHERE slug = 'github-for-startups';

-- Verify
SELECT slug, title, application_url
FROM public.deals
WHERE slug = 'github-for-startups';
