-- Update the Rippling Startup Program deal (slug: rippling-770).
-- Source: https://view-su2.highspot.com/viewer/65a037ef14a690a1c7640e4f#1
--   • Offer: 3 months free  • Savings: Save up to $2,500
--   • Fixes placeholder Google search URL, empty application steps, and the
--     invalid "business" category; adds real details from the program sheet.
--
-- The live /deals list and /deals/[slug] detail pages read from this table,
-- so this UPDATE is what makes the change visible in production.
-- Sets both snake_case and camelCase column variants (the app reads camelCase
-- first, and the row currently has empty/null camelCase values).
-- Safe + reversible: scoped to a single slug; re-run-safe (idempotent).

UPDATE public.deals
SET
  title = 'Rippling Startup Program — 3 Months Free',
  provider = 'Rippling',
  category = 'saas-discounts',
  subcategory = 'hr-ops',
  value = '3 months free',
  savings = 'Save up to $2,500',
  short_description = '3 months free on Rippling''s all-in-one platform for payroll, benefits, IT, and spend management. Save up to $2,500. For new, VC-backed startups.',
  "shortDescription" = '3 months free on Rippling''s all-in-one platform for payroll, benefits, IT, and spend management. Save up to $2,500. For new, VC-backed startups.',
  description = 'The Rippling Startup Program gives eligible, VC-backed startups 3 months free on Rippling — the all-in-one platform to manage payroll, benefits, spend, devices, and apps for your global team.

3 free months of (products vary by country):
• HRIS
• Payroll
• Benefits Administration
• FSA, HSA, and Commuter Benefits
• Expense Management, Corporate Cards, and Bill Pay
• Recruiting
• Device Management
• App Management
• Time and Attendance
• Learning Management
• Performance Management

To redeem, contact startups@rippling.com.

Eligibility: Must be a new Rippling customer funded by one of Rippling''s preferred VC partners. Cannot be combined with other deals and must be redeemed at the time of original purchase. The discount does not extend to 3rd-party apps or native products with high fixed costs (e.g. insurance, inventory management).',
  eligibility = ARRAY[
    'New Rippling customer (cannot be combined with other deals or discounts)',
    'Must be funded by one of Rippling''s preferred Venture Capital partners (contact to confirm eligibility)',
    'Must be redeemed at the time of original purchase (cannot be added post-purchase)',
    'Discount excludes 3rd-party apps and native products with high fixed costs (e.g. insurance, inventory management)'
  ],
  application_process = ARRAY[
    'View the Rippling Startup Program offer: https://view-su2.highspot.com/viewer/65a037ef14a690a1c7640e4f#1',
    'Confirm eligibility — you must be a new Rippling customer funded by a preferred VC partner',
    'Contact startups@rippling.com to redeem the offer',
    'Redeem at the time of your original purchase (the discount cannot be applied afterwards)'
  ],
  "applicationProcess" = ARRAY[
    'View the Rippling Startup Program offer: https://view-su2.highspot.com/viewer/65a037ef14a690a1c7640e4f#1',
    'Confirm eligibility — you must be a new Rippling customer funded by a preferred VC partner',
    'Contact startups@rippling.com to redeem the offer',
    'Redeem at the time of your original purchase (the discount cannot be applied afterwards)'
  ],
  pro_tips = ARRAY[
    'Email startups@rippling.com to confirm eligibility and redeem.',
    'Redeem at the time of your original purchase — the discount can''t be added afterwards.'
  ],
  "proTips" = ARRAY[
    'Email startups@rippling.com to confirm eligibility and redeem.',
    'Redeem at the time of your original purchase — the discount can''t be added afterwards.'
  ],
  tags = ARRAY['hr','payroll','it','finance','spend-management','rippling','startups','saas'],
  application_url = 'https://view-su2.highspot.com/viewer/65a037ef14a690a1c7640e4f#1',
  "applicationUrl" = 'https://view-su2.highspot.com/viewer/65a037ef14a690a1c7640e4f#1',
  provider_website = 'https://www.rippling.com',
  "providerWebsite" = 'https://www.rippling.com',
  logo_url = 'https://www.rippling.com/favicon.ico',
  "logoUrl" = 'https://www.rippling.com/favicon.ico',
  featured = true,
  recommended = true,
  verified = true,
  updated_at = NOW(),
  "lastUpdated" = NOW()
WHERE slug = 'rippling-770';

NOTIFY pgrst, 'reload schema';
