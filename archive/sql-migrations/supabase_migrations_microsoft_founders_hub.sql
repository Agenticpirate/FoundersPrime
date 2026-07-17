-- Update Microsoft for Startups Founders Hub deal to reflect the accurate,
-- official offer terms (https://www.microsoft.com/en-us/startups):
--   • No funding raised  -> $5,000 in Azure credits for 6 months
--       ($1,000 on signup + $4,000 after company verification)
--   • Raised via a VC + invite code -> up to $150,000 in credits for 2 years
--
-- The live /deals list and /deals/[slug] detail pages read from this table,
-- so this UPDATE is what makes the change visible in production.
-- Safe + reversible: scoped to a single slug; re-run-safe (idempotent).

UPDATE public.deals
SET
  value = '$5K for 6 months / up to $150K for 2 years',
  "shortDescription" = 'Get $5,000 in Azure credits for 6 months if you haven''t raised funds, or up to $150,000 for 2 years if you raised through a VC and have an invite code. Plus developer tools, technical support, and enterprise-grade infrastructure.',
  short_description = 'Get $5,000 in Azure credits for 6 months if you haven''t raised funds, or up to $150,000 for 2 years if you raised through a VC and have an invite code. Plus developer tools, technical support, and enterprise-grade infrastructure.',
  description = 'Microsoft for Startups Founders Hub gives startups up to $150,000 in Azure credits, plus developer tools, technical support, and enterprise-grade infrastructure. There are two pathways based on whether you''ve raised funding: if you haven''t raised funds you get $5,000 in credits for 6 months, and if you raised through a VC and have an invite code you qualify for up to $150,000 in credits for 2 years. After signing up via the official link you receive $1,000 in credits immediately and an additional $4,000 once your company is verified.',
  eligibility = ARRAY[
    'INVESTOR NETWORK PATH (up to $150K for 2 years):',
    '✓ Raised funds through a VC and have a Microsoft for Startups invite/referral code',
    '✓ Pre-seed to Series A funding stage (privately held)',
    '✓ Software-based product or service (core to business model)',
    '✓ Less than $350K in lifetime Azure credits used previously',
    '✓ Verified legal entity with domain and business email',
    '✓ Product demo video available',
    'STANDARD PATH ($5K for 6 months):',
    '✓ Software-based product development',
    '✓ Verified business entity with domain',
    '✓ Less than $10K in previous Azure credits received',
    '✓ Not raised Series D or later funding',
    '✓ For-profit private company',
    'NOT ELIGIBLE:',
    '✗ Series D+ funded companies',
    '✗ Educational institutions or government entities',
    '✗ Consultancies, agencies, or dev shops',
    '✗ Bitcoin/crypto mining businesses'
  ],
  application_process = ARRAY[
    'INVESTOR NETWORK PATH (Up to $150K for 2 years):',
    '1. Contact your investor/accelerator to obtain a Microsoft for Startups referral code',
    '2. Visit the application portal at portal.startups.microsoft.com/signup',
    '3. Enter the investor referral code during signup',
    '4. Complete verification: Provide business entity details, verified domain, business email, and product demo video',
    '5. Submit application for review (5-7 day processing time)',
    '6. Receive approval and credit activation details via email',
    '7. Set up Azure account and start consuming credits immediately',
    'STANDARD PATH (Up to $5K for 6 months):',
    '1. Sign up via the official link at portal.startups.microsoft.com/signup',
    '2. Receive $1,000 in Azure credits immediately upon signup',
    '3. Verify your company to unlock an additional $4,000 in credits ($5,000 total, valid for 6 months)',
    '4. Start your Azure free trial and access credits within 48 hours',
    '5. If you later raise funds through a VC, obtain an invite code to upgrade to the $150K / 2-year tier'
  ],
  "applicationProcess" = ARRAY[
    'INVESTOR NETWORK PATH (Up to $150K for 2 years):',
    '1. Contact your investor/accelerator to obtain a Microsoft for Startups referral code',
    '2. Visit the application portal at portal.startups.microsoft.com/signup',
    '3. Enter the investor referral code during signup',
    '4. Complete verification: Provide business entity details, verified domain, business email, and product demo video',
    '5. Submit application for review (5-7 day processing time)',
    '6. Receive approval and credit activation details via email',
    '7. Set up Azure account and start consuming credits immediately',
    'STANDARD PATH (Up to $5K for 6 months):',
    '1. Sign up via the official link at portal.startups.microsoft.com/signup',
    '2. Receive $1,000 in Azure credits immediately upon signup',
    '3. Verify your company to unlock an additional $4,000 in credits ($5,000 total, valid for 6 months)',
    '4. Start your Azure free trial and access credits within 48 hours',
    '5. If you later raise funds through a VC, obtain an invite code to upgrade to the $150K / 2-year tier'
  ],
  application_url = 'https://portal.startups.microsoft.com/signup',
  "applicationUrl" = 'https://portal.startups.microsoft.com/signup',
  updated_at = NOW(),
  "lastUpdated" = NOW()
WHERE slug = 'microsoft-for-startups-founders-hub';

NOTIFY pgrst, 'reload schema';
