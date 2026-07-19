/** Static billing plan labels/features for dashboard BillingPanel. */

export const PLAN_LABELS: Record<string, string> = {
  nextfounder: "Next'Founder",
  founder: 'Founder',
  legend: 'Legend (Lifetime)',
}

export const PLAN_PRICES: Record<string, string> = {
  nextfounder: '$1/year',
  founder: '$48/year',
  legend: '$99 one-time',
}

export const PLAN_ICONS: Record<string, string> = {
  nextfounder: 'rocket_launch',
  founder: 'workspace_premium',
  legend: 'diamond',
  free: 'person',
  admin: 'admin_panel_settings',
}

export const PLAN_FEATURES: Record<string, string[]> = {
  nextfounder: [
    '1,000+ student discounts',
    'AI & SaaS credits for builders',
    'Hackathons & early grants',
    'Opportunity Hub access',
  ],
  founder: [
    'Full cloud & SaaS catalog',
    'Unlimited deal claims',
    'Grants & accelerators',
    'Founder Vault resources',
  ],
  legend: [
    'Everything in Founder forever',
    'No renewals ever',
    'Future catalog updates included',
    'Launch-locked lifetime rate',
  ],
  free: [
    'Browse public previews',
    'Limited catalog access',
    'Upgrade anytime',
  ],
}
