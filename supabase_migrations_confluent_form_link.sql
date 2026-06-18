-- Add the Google Form application link to the Confluent for Startups deal
-- (slug: confluent-for-startups) as an additional item in the application
-- process. The main applicationUrl (confluent.io/startups) is left unchanged.
--
-- The live /deals list and /deals/[slug] detail pages read from this table,
-- so this UPDATE is what makes the change visible in production.
-- Safe + reversible: scoped to a single slug; re-run-safe (idempotent).

UPDATE public.deals
SET
  application_process = ARRAY[
    'Visit the application form (Google Forms): https://docs.google.com/forms/d/e/1FAIpQLSeC9O4jLRCHeUMMqItxl5cRa3gydIS57JubmCgwWbg2KeQj4g/viewform?pli=1',
    'Complete application with email, phone, name, company details',
    'Describe your product/use case and how you plan to use Confluent',
    'Submit application to Confluent for Startups team',
    'Wait for review (5-10 business days)',
    'Receive activation instructions via email',
    'Set up Confluent Cloud account with credits applied',
    'Deploy Apache Kafka clusters and build real-time data applications'
  ],
  "applicationProcess" = ARRAY[
    'Visit the application form (Google Forms): https://docs.google.com/forms/d/e/1FAIpQLSeC9O4jLRCHeUMMqItxl5cRa3gydIS57JubmCgwWbg2KeQj4g/viewform?pli=1',
    'Complete application with email, phone, name, company details',
    'Describe your product/use case and how you plan to use Confluent',
    'Submit application to Confluent for Startups team',
    'Wait for review (5-10 business days)',
    'Receive activation instructions via email',
    'Set up Confluent Cloud account with credits applied',
    'Deploy Apache Kafka clusters and build real-time data applications'
  ],
  updated_at = NOW(),
  "lastUpdated" = NOW()
WHERE slug = 'confluent-for-startups';

NOTIFY pgrst, 'reload schema';
