-- Update the Mollie Startup Program deal (slug: mollie-startup-program)
-- to the joinsecret.com partner offer terms:
--   • Savings: Save up to $500
--   • Offer: Waived fees on your next €25,000 in payment processing
--   • UK- and EU-based companies only; open to funded and bootstrapped startups
--   • Activation: sign up + onboard at mollie.com, then 'Join our program' and
--     enter "Here from joinsecret.com" under funding verification
--
-- The live /deals list and /deals/[slug] detail pages read from this table,
-- so this UPDATE is what makes the change visible in production.
-- Safe + reversible: scoped to a single slug; re-run-safe (idempotent).

UPDATE public.deals
SET
  value = 'Waived fees on your next €25,000 in payment processing',
  savings = 'Save up to $500',
  short_description = 'Waived fees on your next €25,000 in payment processing (save up to $500) for UK- and EU-based startups, on a European payments platform with priority support and no lock-in contracts.',
  "shortDescription" = 'Waived fees on your next €25,000 in payment processing (save up to $500) for UK- and EU-based startups, on a European payments platform with priority support and no lock-in contracts.',
  description = 'The Mollie Startup Program gives UK- and EU-based startups waived fees on their next €25,000 in payment processing — saving up to $500 — on a European payments platform built to scale, with priority human-led support and no lock-in contracts.

What''s Included:
• Waived fees on your next €25,000 in payment processing
• Priority support: skip the main queue for fast-tracked human responses from Mollie''s Europe-based experts
• No lock-in contracts — stay on standard transparent pricing and leave anytime
• Access to a curated founder community and events across Europe
• Local European payment methods (iDEAL, Bancontact, and more) plus guidance on multi-country expansion and compliance

How to claim:
Sign up at mollie.com and complete your onboarding. Then follow the program link, click ''Join our program'', and fill in the form. For the last question, ''Are you funded?'', select ''Yes'' (even if you''re a bootstrapped startup) and choose ''Under €200k funding'' as your funding amount. Under funding verification, type: ''Here from joinsecret.com''.

Note: This offer is only available to UK- and EU-based companies.',
  eligibility = ARRAY[
    'UK- or EU-based companies only',
    'New to Mollie (no existing Mollie account)',
    'Open to both funded and bootstrapped startups (via the joinsecret.com offer)'
  ],
  application_process = ARRAY[
    'Sign up at mollie.com and complete your onboarding',
    'Follow the program link and click ''Join our program''',
    'Fill in the form. For the last question, ''Are you funded?'', select ''Yes'' (even if you''re a bootstrapped startup)',
    'Choose ''Under €200k funding'' as your funding amount',
    'Under funding verification, type: ''Here from joinsecret.com''',
    'Submit your application — this offer is only available to UK- and EU-based companies'
  ],
  "applicationProcess" = ARRAY[
    'Sign up at mollie.com and complete your onboarding',
    'Follow the program link and click ''Join our program''',
    'Fill in the form. For the last question, ''Are you funded?'', select ''Yes'' (even if you''re a bootstrapped startup)',
    'Choose ''Under €200k funding'' as your funding amount',
    'Under funding verification, type: ''Here from joinsecret.com''',
    'Submit your application — this offer is only available to UK- and EU-based companies'
  ],
  application_url = 'https://www.mollie.com/solutions/payments-for-startups',
  "applicationUrl" = 'https://www.mollie.com/solutions/payments-for-startups',
  updated_at = NOW(),
  "lastUpdated" = NOW()
WHERE slug = 'mollie-startup-program';

NOTIFY pgrst, 'reload schema';
