-- Add the FireTail for Startups deal.
-- Source: https://aws.amazon.com/startups/offers/firetail
--   • 80% discount on AWS Marketplace: $10K, not $50K, for 12 months
--   • Concierge onboarding + enterprise-level support
--   • Estimated offer value: $40,000
--
-- The live /deals list and /deals/[slug] detail pages read from this table,
-- so this INSERT is what makes the deal appear in production.
-- Idempotent: ON CONFLICT (slug) updates the existing row, so it is re-run-safe.

INSERT INTO public.deals (
  id, slug, title, provider, category, subcategory,
  value, description, short_description, "shortDescription",
  eligibility, "applicationProcess",
  tags, status, application_url, "applicationUrl",
  "providerWebsite", logo_url, "logoUrl",
  featured, recommended, verified, difficulty,
  time_to_apply, "timeToApply", savings,
  "sourceVerified", "dataSource",
  created_at, updated_at, "lastUpdated"
) VALUES (
  'firetail-for-startups',
  'firetail-for-startups',
  'FireTail for Startups (80% Discount on AWS Marketplace)',
  'FireTail',
  'saas-discounts',
  'ai-tools',
  '80% off AWS Marketplace ($10K, not $50K)',
  'FireTail is one platform to discover, assess, and protect all AI usage across your organization, giving you complete coverage across every employee, browser, device, application, and agent. Through the AWS Global Startup Program, qualifying startups get an 80% discount on AWS Marketplace — $10,000 instead of $50,000 for complete enterprise access for the first 12 months — with an estimated offer value of $40,000.',
  'Qualifying startups get an 80% discount on FireTail via AWS Marketplace — $10K instead of $50K for complete enterprise access for 12 months. Estimated offer value $40,000.',
  'Qualifying startups get an 80% discount on FireTail via AWS Marketplace — $10K instead of $50K for complete enterprise access for 12 months. Estimated offer value $40,000.',
  ARRAY[
    'Qualifying startups in the AWS Global Startup Program',
    'New FireTail customers purchasing via AWS Marketplace',
    'Available globally'
  ],
  ARRAY[
    'Visit the FireTail offer on AWS Startups: https://aws.amazon.com/startups/offers/firetail',
    'Click ''Claim Offer'' to open the AWS Marketplace private offer',
    'Subscribe via AWS Marketplace to activate the 80% discount',
    'Get concierge onboarding and deployment from the FireTail team'
  ],
  ARRAY['security','compliance','ai-security','aws-marketplace','firetail','startups','saas'],
  'active',
  'https://aws.amazon.com/startups/offers/firetail',
  'https://aws.amazon.com/startups/offers/firetail',
  'https://www.firetail.ai',
  'https://d22k7geae6sy8h.cloudfront.net/files/6a0e210fa78a55000b626c32/FireTail_AWSSEAOLogo.png',
  'https://d22k7geae6sy8h.cloudfront.net/files/6a0e210fa78a55000b626c32/FireTail_AWSSEAOLogo.png',
  true, true, true, 'easy',
  '10 minutes', '10 minutes',
  'Save up to $40,000',
  true, 'manual-update',
  NOW(), NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  provider = EXCLUDED.provider,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  value = EXCLUDED.value,
  description = EXCLUDED.description,
  short_description = EXCLUDED.short_description,
  "shortDescription" = EXCLUDED."shortDescription",
  eligibility = EXCLUDED.eligibility,
  "applicationProcess" = EXCLUDED."applicationProcess",
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  application_url = EXCLUDED.application_url,
  "applicationUrl" = EXCLUDED."applicationUrl",
  "providerWebsite" = EXCLUDED."providerWebsite",
  logo_url = EXCLUDED.logo_url,
  "logoUrl" = EXCLUDED."logoUrl",
  featured = EXCLUDED.featured,
  recommended = EXCLUDED.recommended,
  verified = EXCLUDED.verified,
  savings = EXCLUDED.savings,
  updated_at = NOW(),
  "lastUpdated" = NOW();

NOTIFY pgrst, 'reload schema';
