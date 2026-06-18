-- Update the Intercom Startups deal (slug: intercom-early-stage).
--   • Savings: Save up to $3,108
--   • Offer: 1 year free on Intercom's Advanced plan (300 monthly Fin resolutions included)
--   • How to use: Apply for the program
--   • Deal/application link: https://www.intercom.com/startups-program
--
-- The live /deals list and /deals/[slug] detail pages read from this table,
-- so this UPDATE is what makes the change visible in production.
-- Safe + reversible: scoped to a single slug; re-run-safe (idempotent).

UPDATE public.deals
SET
  value = '1 year free on Advanced plan (300 Fin resolutions/mo)',
  savings = 'Save up to $3,108',
  application_url = 'https://www.intercom.com/startups-program',
  "applicationUrl" = 'https://www.intercom.com/startups-program',
  application_process = ARRAY[
    'Apply for the program on Intercom''s Startup Partner Program page',
    'Create an Intercom account with your company email',
    'Provide company details: name, website, employee count, and funding stage',
    'Confirm eligibility (Series A or earlier, under 25 employees) and your partner referral',
    'Get approved and start using Intercom free for your first year'
  ],
  "applicationProcess" = ARRAY[
    'Apply for the program on Intercom''s Startup Partner Program page',
    'Create an Intercom account with your company email',
    'Provide company details: name, website, employee count, and funding stage',
    'Confirm eligibility (Series A or earlier, under 25 employees) and your partner referral',
    'Get approved and start using Intercom free for your first year'
  ],
  updated_at = NOW(),
  "lastUpdated" = NOW()
WHERE slug = 'intercom-early-stage';

NOTIFY pgrst, 'reload schema';
