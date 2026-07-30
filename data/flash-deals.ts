/**
 * Flash Deals — limited-time, time-sensitive offers shown on /flash-deals.
 *
 * These are intentionally SEPARATE from the main deals catalog (Supabase /
 * all-deals.json). Flash deals are short-lived: each one counts down and is
 * meant to be swapped out frequently (new drops every week).
 *
 * ─── HOW TO ADD A FLASH DEAL ──────────────────────────────────────────
 * Add an object to `flashDeals` below.
 *   • category  — must match one of FLASH_CATEGORIES keys (drives the filter)
 *   • badge     — 'hot' | 'recommended' | 'new'
 *   • discountColor — 'violet' | 'orange' | 'red' (color of the % OFF chip)
 *   • Provide EITHER `endsAt` (absolute ISO date) OR `durationHours`
 *     (a rolling countdown computed from page load — handy for offers with
 *     no firm end date, e.g. "free until they pull it").
 *   • logo      — direct image URL; falls back to `domain` favicon, then initials.
 * ──────────────────────────────────────────────────────────────────────
 */

export type FlashBadge = 'hot' | 'recommended' | 'new'
export type FlashDiscountColor = 'violet' | 'orange' | 'red' | 'emerald'

export interface FlashDealOption {
  label: string
  url: string
}

export interface FlashDealStep {
  step: number
  title: string
  description: string
  icon: string
  url?: string
}

export interface FlashDeal {
  id: string
  /** Provider / product name shown on the card. */
  name: string
  /** One-line tagline. */
  description: string
  /** Longer description shown on detail page */
  longDescription?: string
  badge: FlashBadge
  /** Filter category key — see FLASH_CATEGORIES. */
  category: string
  /** Direct logo URL (preferred). */
  logo?: string
  /** Brand domain for favicon fallback. */
  domain?: string
  /** Headline price, e.g. '$150,000', '$29', '$0'. */
  price: string
  /** Unit after the price, e.g. 'Credits', '/ seat / month', 'Setup Fee'. */
  priceUnit: string
  /** Struck-through original price. */
  originalPrice: string
  /** Discount chip text, e.g. '90% OFF'. */
  discount: string
  discountColor: FlashDiscountColor
  /** Absolute end time (ISO). Takes priority over durationHours. */
  endsAt?: string
  /** Rolling countdown length (hours from page load) when no fixed end date. */
  durationHours?: number
  /** Where "View Deal" links (external claim URL). */
  dealUrl: string
  /** Optional deal-specific claim button label. */
  ctaLabel?: string
  /** Optional note shown beneath the claim button. */
  claimNote?: string
  /** Country/region specific promo options if available */
  options?: FlashDealOption[]
  /** Eligibility criteria shown on detail page */
  eligibility?: string[]
  /** Step-by-step instructions to claim the deal */
  steps?: FlashDealStep[]
  /** Key highlights / what you get */
  highlights?: string[]
  /** Pro tips */
  tips?: string[]
}

/** Category filter pills (order matters — 'all' first). */
export const FLASH_CATEGORIES: { key: string; label: string }[] = [
  { key: 'all', label: 'All Deals' },
  { key: 'ai-credits', label: 'AI Credits' },
  { key: 'productivity', label: 'Productivity & Design' },
]


export const flashDeals: FlashDeal[] = [
  {
    id: 'chatgpt-plus-flash',
    name: 'ChatGPT Plus',
    description: 'Get 50% off ChatGPT Plus for your first 2 months.',
    longDescription: 'ChatGPT is offering eligible users 50% off ChatGPT Plus for two months through this limited-time official campaign. Open the offer link, sign in, and review the eligibility, price, and renewal terms shown by ChatGPT before subscribing.',
    badge: 'hot',
    category: 'ai-credits',
    logo: '/logos/chatgpt.png',
    domain: 'chatgpt.com',
    price: '50% Off',
    priceUnit: 'For 2 Months',
    originalPrice: '',
    discount: '50% OFF',
    discountColor: 'emerald',
    dealUrl: 'https://chatgpt.com/?promo_campaign=plus-2-months-50-pct-off#pricing',
    ctaLabel: 'Claim 50% Off',
    claimNote: 'Eligibility and final pricing are confirmed by ChatGPT.',
    eligibility: [
      'Offer availability is determined by ChatGPT for the signed-in account',
      'The promotion applies to ChatGPT Plus for two months when shown at checkout',
      'New or returning subscriber eligibility may vary by account and region',
      'Final price, currency, taxes, and renewal terms are displayed before purchase',
    ],
    highlights: [
      '50% off ChatGPT Plus for two months',
      'Official promotion hosted directly on ChatGPT',
      'Access to the Plus features and limits displayed for your account',
      'Subscription and billing managed securely through ChatGPT',
    ],
    steps: [
      { step: 1, title: 'Open the Official Offer', description: 'Use the claim button to open the official ChatGPT campaign page with the promotion attached.', icon: 'open_in_new' },
      { step: 2, title: 'Sign In to ChatGPT', description: 'Log in with the ChatGPT account you want to use for the Plus subscription.', icon: 'account_circle' },
      { step: 3, title: 'Confirm Eligibility', description: 'Check that ChatGPT displays the 50% discount for two months on your account.', icon: 'verified_user' },
      { step: 4, title: 'Review and Subscribe', description: 'Review the final price, renewal terms, and taxes shown by ChatGPT before completing checkout.', icon: 'shopping_cart' },
    ],
    tips: [
      'Use the ChatGPT account you intend to keep for the subscription',
      'Confirm the 50% discount and two-month duration before paying',
      'Review the regular renewal price and cancellation terms shown at checkout',
    ],
  },
  {
    id: 'lovable-premium-flash',
    name: 'Lovable Premium',
    description: 'Get 1 Year of Lovable Premium free with LinkedIn Premium perks.',
    longDescription: 'Lovable is offering 1 full year of their Premium plan completely free to LinkedIn Premium subscribers. If you have or are eligible for LinkedIn Premium (especially through Airtel Thanks), you can stack this offer on top to get the AI-powered app builder at zero cost.',
    badge: 'hot',
    category: 'ai-credits',
    logo: '/logos/lovable.png',
    domain: 'lovable.dev',
    price: '1 Year',
    priceUnit: 'Free',
    originalPrice: '',
    discount: '100% FREE',
    discountColor: 'violet',
    durationHours: 72,
    dealUrl: 'https://lovable.dev/linkedin-premium-offer',
    eligibility: [
      'Must have an active LinkedIn Premium subscription',
      'Airtel users can get LinkedIn Premium free via Airtel Thanks app',
      'Valid LinkedIn account required',
      'One offer per LinkedIn account',
    ],
    highlights: [
      '1 full year of Lovable Premium — worth $240+',
      'Build full-stack web apps with AI in minutes',
      'Unlimited projects and deployments',
      'Custom domains, GitHub sync, and team collaboration',
    ],
    steps: [
      { step: 1, title: 'Get LinkedIn Premium (Free via Airtel)', description: 'If you are an Airtel user, open the My Airtel App → Rewards section → locate the Adobe deal → claim LinkedIn Premium for free.', icon: 'smartphone' },
      { step: 2, title: 'Visit the Lovable Offer Page', description: 'Go to lovable.dev/linkedin-premium-offer with your LinkedIn Premium account active.', icon: 'open_in_new' },
      { step: 3, title: 'Connect Your LinkedIn Account', description: 'Authenticate with LinkedIn on the Lovable offer page to verify your Premium status.', icon: 'link' },
      { step: 4, title: 'Activate Your Free Year', description: 'Once verified, your 1-year Lovable Premium access will be activated instantly on your account.', icon: 'check_circle' },
    ],
    tips: [
      'Airtel users: Check My Airtel App → Rewards for a FREE LinkedIn Premium offer',
      'Stack this with the Adobe Express offer available in the same Airtel Rewards section',
      'Lovable Premium lets you build and ship production apps with AI — no code needed',
    ],
  },
  {
    id: 'adobe-express-linkedin-airtel',
    name: 'Adobe Express & LinkedIn',
    description: 'Airtel Thanks users can claim 1 year of Adobe Express Premium & up to 6 months of LinkedIn Premium free.',
    longDescription: 'Airtel is offering its Thanks subscribers an incredible stacking deal: 1 year of Adobe Express Premium plus up to 6 months of LinkedIn Premium at absolutely no cost. This is accessible directly through the My Airtel App rewards section.',
    badge: 'new',
    category: 'productivity',
    logo: 'https://img.logo.dev/adobe.com?token=pk_WQ-XL0MlQ3-ODa_K0zgqEg',
    domain: 'adobe.com',
    price: '1 Year',
    priceUnit: 'Free',
    originalPrice: '$120',
    discount: '100% FREE',
    discountColor: 'red',
    durationHours: 48,
    dealUrl: 'https://adobe.com/benefits',
    eligibility: [
      'Must be an active Airtel mobile subscriber',
      'Must have the My Airtel App installed',
      'Airtel Thanks membership (any tier)',
      'Valid Indian mobile number',
    ],
    highlights: [
      '1 year Adobe Express Premium — worth ₹4,999/year',
      'Up to 6 months LinkedIn Premium through Adobe benefit',
      'Another 3-month LinkedIn Premium offer directly in Airtel Rewards',
      'Total potential: up to 9 months of LinkedIn Premium free',
    ],
    steps: [
      { step: 1, title: 'Open My Airtel App', description: 'Download or open the My Airtel App on your phone. Make sure you are logged in with your Airtel number.', icon: 'smartphone' },
      { step: 2, title: 'Go to Rewards Section', description: 'Tap the "Rewards" or "Thanks" section in the bottom navigation of the Airtel app.', icon: 'card_giftcard' },
      { step: 3, title: 'Locate the Adobe Deal', description: 'Scroll through the rewards and find the Adobe Express offer. It may appear as "Adobe Express Premium" or "Adobe Thanks Offer".', icon: 'search' },
      { step: 4, title: 'Claim Adobe Express', description: 'Tap Claim on the Adobe deal. You will be redirected to Adobe to activate your 1-year Premium subscription.', icon: 'redeem' },
      { step: 5, title: 'Activate LinkedIn via Adobe', description: 'Inside Adobe Express benefits, look for the LinkedIn Premium offer and activate it. This gives you 3 months free.', icon: 'link' },
      { step: 6, title: 'Claim LinkedIn Directly from Airtel', description: 'Return to Airtel Rewards and also claim the LinkedIn Premium deal there separately for another 3 months.', icon: 'check_circle' },
    ],
    tips: [
      'Complete both steps — Adobe route AND direct Airtel route — to stack up to 6+ months of LinkedIn Premium',
      'Adobe Express Premium includes thousands of templates, background removal, and brand kit tools',
      'Available only for Airtel India subscribers',
    ],
  },
  {
    id: 'free-profile-domain-gravatar',
    name: 'Free Profile Domain',
    description: 'Get your own custom profile domain FREE for 12 months (WordPress & Gravatar).',
    longDescription: 'Gravatar and WordPress.com are offering a free custom profile domain for 12 full months. Perfect for developers, designers, creators, and anyone building a personal brand. You get a real domain — no tricks, just complete the checkout process with a real card (charged $0).',
    badge: 'new',
    category: 'productivity',
    logo: 'https://img.logo.dev/gravatar.com?token=pk_WQ-XL0MlQ3-ODa_K0zgqEg',
    domain: 'gravatar.com',
    price: '1 Year',
    priceUnit: 'Free',
    originalPrice: '$12',
    discount: '100% FREE',
    discountColor: 'violet',
    durationHours: 72,
    dealUrl: 'https://wordpress.com/log-in/link?client_id=1854&redirect_to=https%3A%2F%2Fpublic-api.wordpress.com%2Foauth2%2Fauthorize%3Fclient_id%3D1854%26response_type%3Dcode%26blog_id%3D0%26state%3D5b50cfad4332a78ba358a3a0cd567009691bfad7a58779a463fbe85f2341655e%26redirect_uri%3Dhttps%253A%252F%252Fgravatar.com%252Fconnect%252F%253Fredirect_to%253D%25252Fprofile%2526action%253Drequest_access_token%26from-calypso%3D1',
    eligibility: [
      'Anyone can claim — no subscription required',
      'Must have or create a free Gravatar account',
      'Must have a valid payment card (charged $0)',
      'One free domain per account',
    ],
    highlights: [
      'Your own .com or profile domain FREE for 12 months',
      'Perfect for developers, designers, creators & personal branding',
      'Powered by WordPress.com infrastructure',
      'Includes a complete Gravatar profile page',
    ],
    steps: [
      { step: 1, title: 'Create a Gravatar Account', description: 'Visit and sign up for a free account. Confirm your email address after signing up.', icon: 'account_circle', url: 'https://gravatar.com/' },
      { step: 2, title: 'Claim Your Free Domain', description: 'Log in and automatically authorize the WordPress.com domain claim flow pre-configured for you.', icon: 'open_in_new', url: 'https://wordpress.com/log-in/link?client_id=1854&redirect_to=https%3A%2F%2Fpublic-api.wordpress.com%2Foauth2%2Fauthorize%3Fclient_id%3D1854%26response_type%3Dcode%26blog_id%3D0%26state%3D5b50cfad4332a78ba358a3a0cd567009691bfad7a58779a463fbe85f2341655e%26redirect_uri%3Dhttps%253A%252F%252Fgravatar.com%252Fconnect%252F%253Fredirect_to%253D%25252Fprofile%2526action%253Drequest_access_token%26from-calypso%3D1' },
      { step: 3, title: 'Choose Your Domain', description: 'Browse available domains and pick the one you want for your profile. Search your name, brand, or handle.', icon: 'search' },
      { step: 4, title: 'Complete Checkout', description: 'Add your domain to cart and complete checkout. Enter a real payment card — the total will be $0 for the first year.', icon: 'credit_card' },
      { step: 5, title: 'Finish Your Profile', description: 'Return to Gravatar and complete your profile page — add your bio, links, and profile picture.', icon: 'edit_note' },
    ],
    tips: [
      'A real card is required for checkout but you will NOT be charged for the first 12 months',
      'Cancel the auto-renewal before the year ends if you do not want to pay going forward',
      'Use a professional domain for your portfolio — it makes a huge impression',
    ],
  },
  {
    id: 'openai-codex-students',
    name: 'OpenAI Codex',
    description: '$100 in Codex credits for verified university students in the US & Canada.',
    longDescription: 'OpenAI is offering $100 in free Codex API credits to verified university students in the United States and Canada. Codex powers AI coding assistants and lets you build powerful developer tools, automated coding agents, and AI-assisted workflows.',
    badge: 'new',
    category: 'ai-credits',
    logo: '/logos/openai-codex.png',
    domain: 'openai.com',
    price: '$100',
    priceUnit: 'AI Credits',
    originalPrice: '$100',
    discount: '100% FREE',
    discountColor: 'violet',
    durationHours: 168,
    dealUrl: 'https://chatgpt.com/codex/students/',
    eligibility: [
      'Must be a currently enrolled university or college student',
      'Only available to students in the United States and Canada',
      'Must verify student status with a valid .edu email or student ID',
      'One credit grant per student account',
    ],
    highlights: [
      '$100 in free OpenAI Codex API credits',
      'Access to the same AI powering GitHub Copilot and ChatGPT Code Interpreter',
      'Build coding agents, automation scripts, and developer tools',
      'No credit card required to claim',
    ],
    steps: [
      { step: 1, title: 'Visit the Student Offer Page', description: 'Click "Claim Now" to go directly to the OpenAI Codex student program page at chatgpt.com/codex/students/', icon: 'open_in_new' },
      { step: 2, title: 'Sign In to OpenAI', description: 'Log in with your existing OpenAI/ChatGPT account or create a new one with your university email address.', icon: 'account_circle' },
      { step: 3, title: 'Verify Your Student Status', description: 'Complete student verification by providing your university email (.edu) or uploading a valid student ID document.', icon: 'school' },
      { step: 4, title: 'Receive Your Credits', description: 'Once verified, $100 in Codex API credits will be automatically credited to your OpenAI account within 24–48 hours.', icon: 'check_circle' },
    ],
    tips: [
      'Use your .edu university email for the fastest verification',
      'Credits can be used with the OpenAI API for any Codex-powered project',
      'US and Canada only — check the offer page for the latest eligibility details',
    ],
  },
  {
    id: 'lovable-pro-1month-free',
    name: 'Lovable Pro',
    description: 'Get 1 Month of Lovable Pro FREE! (New Account)',
    longDescription: 'Enjoy 1 month of Lovable Pro completely for free when you sign up for a new account. Use the promo code SIMONPRO26 during checkout on the Pro Plan ($25).',
    badge: 'new',
    category: 'productivity',
    logo: '/logos/lovable.png',
    domain: 'lovable.dev',
    price: '1 Month',
    priceUnit: 'Free',
    originalPrice: '$25',
    discount: '100% FREE',
    discountColor: 'violet',
    durationHours: 72,
    dealUrl: 'https://lovable.dev',
    eligibility: [
      'Must be a new account',
      'Valid for the Lovable Pro Plan'
    ],
    highlights: [
      '1 Month of Lovable Pro completely free',
      'Save $25 on your first month'
    ],
    steps: [
      { step: 1, title: 'Open Lovable', description: 'Go to Lovable.dev and create a new account.', icon: 'open_in_new' },
      { step: 2, title: 'Select Pro Plan', description: 'Choose the Pro Plan ($25) and proceed to checkout.', icon: 'shopping_cart' },
      { step: 3, title: 'Apply Promo Code', description: 'Apply the promo code SIMONPRO26 during checkout to get your first month free.', icon: 'local_offer' },
    ],
    tips: [
      'Promo code: SIMONPRO26'
    ],
  },
  {
    id: 'deepgram-200-credits',
    name: 'Deepgram',
    description: 'Transform your products with cutting edge voice AI. Get $200 in credit absolutely free.',
    longDescription: 'Transform your products with cutting edge voice AI. Get $200 in credit absolutely free. That can fuel a voice agent for at least 50 hours. No credit card needed.',
    badge: 'hot',
    category: 'ai-credits',
    logo: '/logos/deepgram.png',
    domain: 'deepgram.com',
    price: '$200',
    priceUnit: 'Credits',
    originalPrice: '$200',
    discount: '100% FREE',
    discountColor: 'emerald',
    durationHours: 72,
    dealUrl: 'https://console.deepgram.com/signup',
    eligibility: [
      'New account signup required',
      'No credit card needed'
    ],
    highlights: [
      '$200 in free API credits',
      'Fuel a voice agent for at least 50 hours',
      'Cutting edge voice AI'
    ],
    steps: [
      { step: 1, title: 'Visit Deepgram', description: 'Go to the Deepgram signup console.', icon: 'open_in_new' },
      { step: 2, title: 'Create Account', description: 'Sign up for a new account (no credit card required).', icon: 'account_circle' },
      { step: 3, title: 'Get Credits', description: 'Enjoy your $200 in free voice AI credits automatically.', icon: 'check_circle' },
    ],
    tips: [
      'No credit card is required to claim your free credits.'
    ],
  },
  {
    id: 'freebuff-web',
    name: 'Freebuff',
    description: 'The 100% free AI app builder. Build, preview, and deploy full-stack apps.',
    longDescription: 'Describe your idea and Freebuff builds, previews, and deploys a full-stack app. No subscription, no API keys. Freebuff is supported by unobtrusive text ads. There are no subscriptions, credit cards, or usage paywalls to build and ship your app. Includes a live preview URL and one-click deploy at no cost.',
    badge: 'hot',
    category: 'productivity',
    logo: '/logos/freebuff.png',
    domain: 'freebuff.com',
    price: '$0',
    priceUnit: 'Forever',
    originalPrice: '$600/yr',
    discount: '100% FREE',
    discountColor: 'violet',
    durationHours: 72,
    dealUrl: 'https://freebuff.com/web',
    eligibility: [
      'Available to everyone',
      'No credit card or API keys required'
    ],
    highlights: [
      '100% free AI app builder',
      'No subscription or usage paywalls',
      'Live preview URL and one-click deploy at no cost',
      'Supported by unobtrusive text ads'
    ],
    steps: [
      { step: 1, title: 'Visit Freebuff Web', description: 'Go to freebuff.com/web.', icon: 'open_in_new' },
      { step: 2, title: 'Describe Your App Idea', description: 'Type in your prompt and let the AI generate your app.', icon: 'edit_note' },
      { step: 3, title: 'Deploy for Free', description: 'Get a live preview URL and deploy with one click.', icon: 'rocket_launch' },
    ],
    tips: [
      'Save $600+/yr compared to other AI app builders'
    ],
  },
]
