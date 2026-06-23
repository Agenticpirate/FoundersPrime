'use client'

export default function TermsContent() {
  const sections = [
    {
      id: 'acceptance-of-terms',
      title: '1. Acceptance of Terms',
      content: `
        <h3>Agreement to Terms</h3>
        <p>By accessing or using FoundersPrime ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.</p>

        <h3>Eligibility</h3>
        <p>You must be at least 16 years old to use this Service. By using the Service, you represent and warrant that:</p>
        <ul>
          <li>You are at least 16 years of age</li>
          <li>You have the legal capacity to enter into these Terms</li>
          <li>Your use of the Service will not violate any applicable law or regulation</li>
          <li>All information you provide is accurate and complete</li>
        </ul>

        <h3>Changes to Terms</h3>
        <p>We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or through the Service. Your continued use of the Service after changes constitutes acceptance of the new Terms.</p>
      `
    },
    {
      id: 'description-of-service',
      title: '2. Description of Service',
      content: `
        <h3>What We Provide</h3>
        <p>FoundersPrime is a discovery and aggregation platform built for founders. We research, curate, and organize offers made available by third parties and present them in a single, easy-to-browse dashboard. In short, <strong>we help you find deals — we do not create or provide them.</strong> The Service includes:</p>
        <ul>
          <li><strong>Deal Aggregation:</strong> Curated startup deals, credits, discounts, grants, and perks sourced from third-party providers</li>
          <li><strong>Startup Database:</strong> Information about funded startups and their metrics</li>
          <li><strong>Idea Validation:</strong> Startup ideas with market analysis and validation data</li>
          <li><strong>Resource Library:</strong> Templates, guides, and tools for entrepreneurs</li>
          <li><strong>Community Features:</strong> Forums, discussions, and networking opportunities</li>
        </ul>

        <h3>Service Availability</h3>
        <p>We strive to maintain high availability, but we do not guarantee uninterrupted or error-free access to the Service. We may temporarily suspend the Service for maintenance, updates, or other operational reasons.</p>

        <h3>Third-Party Services</h3>
        <p>Our Service contains links to third-party websites, offers, and services. We are not responsible for the content, availability, privacy policies, or practices of any third party. See Section 3 for important details about how deals and offers work.</p>
      `
    },
    {
      id: 'deals-offers-eligibility',
      title: '3. Deals, Offers & Eligibility (Important)',
      content: `
        <h3>We Are Not the Provider</h3>
        <p>We do not own, operate, sponsor, fund, or control any of the deals, credits, grants, discounts, or offers listed on the Service. Every offer is created, owned, and administered by an independent third-party provider (for example, a cloud platform, software company, accelerator, or grant program). Any participation in an offer is a transaction strictly between you and that provider, governed by the provider's own terms.</p>

        <h3>No Guarantee of Availability, Eligibility, or Terms</h3>
        <p>We make no guarantee, representation, or warranty of any kind about any deal listed on the Service. In particular, we do <strong>not</strong> guarantee:</p>
        <ul>
          <li><strong>Availability:</strong> that any offer is currently active or will remain available.</li>
          <li><strong>Eligibility:</strong> that you or your company will qualify. Eligibility is determined solely by the provider and may depend on your location, company stage, funding, age of business, industry, or other criteria.</li>
          <li><strong>Terms &amp; Value:</strong> that the discount, credit amount, duration, pricing, or other terms are accurate, current, or will be honored. Any estimated values shown are approximate and are set by, or inferred from, the provider.</li>
          <li><strong>Approval &amp; Timing:</strong> that an application will be accepted, or processed within any particular timeframe.</li>
        </ul>
        <p>Providers may add, change, pause, or withdraw any offer at any time, without notice to us or to you. <strong>Always confirm the current terms, eligibility, and availability directly with the provider before relying on, applying for, or making any decision based on an offer.</strong></p>

        <h3>Eligibility Depends Entirely on You and the Provider</h3>
        <p>Whether you can claim any offer depends on a combination of the provider's rules and your own circumstances &mdash; not on FoundersPrime. We do not assess, pre-qualify, vet, or approve you for any offer, and listing a deal is not a statement that you are eligible for it. Each provider sets and enforces its own eligibility criteria and verification process, which may include (without limitation) your country or region, company stage, incorporation status and legal entity type, funding history, revenue, age of the business, industry, whether you are a new or existing customer, and documentation requirements. You are solely responsible for reading and meeting those criteria. If you do not qualify, are rejected, or are later disqualified by a provider, FoundersPrime has no responsibility or liability for that outcome and owes you no refund or compensation.</p>

        <h3>Limited, Capped &amp; Time-Sensitive Offers</h3>
        <p>Many offers are limited in nature. We do <strong>not</strong> promise that any limited offer will be available to you. An offer may, for example:</p>
        <ul>
          <li>Have a fixed number of slots, seats, or credits that can run out;</li>
          <li>Be offered on a first-come, first-served basis;</li>
          <li>Be restricted to a limited promotional window or expire on short notice;</li>
          <li>Be capped by budget, region, or per-applicant limits set by the provider; or</li>
          <li>Be discontinued or fully claimed before you apply.</li>
        </ul>
        <p>The fact that an offer appears on the Service does not mean any slots, credits, or capacity remain. Availability can change at any moment and is controlled entirely by the provider.</p>

        <h3>We Accept No Responsibility for Outcomes</h3>
        <p>To the fullest extent permitted by law, FoundersPrime accepts <strong>no responsibility or liability</strong> for: whether you qualify for or are granted any offer; the conduct, decisions, performance, or non-performance of any provider; any offer that is unavailable, sold out, expired, denied, delayed, reduced, or withdrawn; any change to an offer's terms, value, or conditions; or any loss, cost, or damage you incur from applying for, relying on, or using any offer. Your dealings with any provider, including any disputes, are solely between you and that provider.</p>

        <h3>Accuracy of Listings</h3>
        <p>We work to keep listings accurate and up to date, but information is gathered from third-party and public sources and may be incomplete, outdated, or contain errors. You are responsible for independently verifying every detail with the provider before acting on it.</p>

        <h3>No Affiliation or Endorsement</h3>
        <p>Listing a provider or offer does not imply any partnership, affiliation, sponsorship, or endorsement between FoundersPrime and that provider unless we explicitly state otherwise. Third-party names, logos, and trademarks are the property of their respective owners and are used for identification purposes only.</p>

        <h3>Affiliate &amp; Referral Links</h3>
        <p>Some links on the Service are affiliate or referral links. We may earn a commission or referral credit if you sign up through them, at no additional cost to you. This does not change the price or terms you receive from the provider, and it does not influence whether you qualify for an offer.</p>

        <h3>Global &amp; Regional Availability</h3>
        <p>FoundersPrime serves founders worldwide, including in the United States, United Kingdom, Australia, Canada, and other regions. Offers are made available by providers under their own rules and may not exist, or may differ, in your country or region. Some offers are restricted to specific countries, currencies, or types of legal entity. It is your responsibility to ensure that participating in any offer is permitted under, and compliant with, the laws and regulations that apply to you.</p>

        <h3>What Your Subscription Covers</h3>
        <p>Any subscription fee you pay to FoundersPrime is for access to our curated dashboard, discovery tools, and related platform features &mdash; <strong>not</strong> for the deals themselves. Your subscription does not purchase, reserve, or entitle you to any specific deal, credit, discount, or outcome, all of which remain at the sole discretion of the third-party provider.</p>
      `
    },
    {
      id: 'user-accounts',
      title: '4. User Accounts',
      content: `
        <h3>Account Creation</h3>
        <p>To access certain features, you must create an account. You agree to:</p>
        <ul>
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain and update your account information</li>
          <li>Keep your password secure and confidential</li>
          <li>Notify us immediately of any unauthorized use</li>
          <li>Accept responsibility for all activities under your account</li>
        </ul>

        <h3>Account Types</h3>
        <p>We offer different account types with varying features and limitations:</p>
        <ul>
          <li><strong>Free Account:</strong> Basic access to deals and resources</li>
          <li><strong>Pro Account:</strong> Enhanced features, priority support, and exclusive content</li>
          <li><strong>Pro+ Account:</strong> Full access to all features and premium resources</li>
        </ul>

        <h3>Account Termination</h3>
        <p>You may terminate your account at any time. We may suspend or terminate your account if you violate these Terms or engage in prohibited activities.</p>
      `
    },
    {
      id: 'acceptable-use',
      title: '5. Acceptable Use Policy',
      content: `
        <h3>Permitted Uses</h3>
        <p>You may use the Service for legitimate business and personal purposes related to entrepreneurship and startup activities.</p>

        <h3>Prohibited Activities</h3>
        <p>You agree not to:</p>
        <ul>
          <li><strong>Violate Laws:</strong> Use the Service for any illegal or unauthorized purpose</li>
          <li><strong>Spam or Abuse:</strong> Send unsolicited communications or abuse other users</li>
          <li><strong>Impersonation:</strong> Impersonate any person or entity</li>
          <li><strong>Data Mining:</strong> Use automated tools to extract data without permission</li>
          <li><strong>Security Violations:</strong> Attempt to breach security or access unauthorized areas</li>
          <li><strong>Malicious Content:</strong> Upload viruses, malware, or harmful code</li>
          <li><strong>Intellectual Property Infringement:</strong> Violate copyrights, trademarks, or other IP rights</li>
          <li><strong>False Information:</strong> Provide misleading or fraudulent information</li>
        </ul>

        <h3>Content Guidelines</h3>
        <p>User-generated content must be:</p>
        <ul>
          <li>Relevant to entrepreneurship and startups</li>
          <li>Respectful and professional</li>
          <li>Free from offensive or discriminatory language</li>
          <li>Compliant with applicable laws and regulations</li>
        </ul>
      `
    },
    {
      id: 'subscription-billing',
      title: '6. Subscription and Billing',
      content: `
        <h3>Subscription Plans</h3>
        <p>We offer various subscription plans with different features and pricing. Current plans and pricing are available on our pricing page.</p>

        <h3>Billing Terms</h3>
        <ul>
          <li><strong>Payment:</strong> Subscriptions are billed in advance on a monthly or annual basis</li>
          <li><strong>Auto-Renewal:</strong> Subscriptions automatically renew unless cancelled</li>
          <li><strong>Price Changes:</strong> We may change prices with 30 days' notice</li>
          <li><strong>Taxes:</strong> You are responsible for applicable taxes</li>
          <li><strong>Payment Methods:</strong> We accept major credit cards and PayPal</li>
        </ul>

        <h3>Refunds and Cancellations</h3>
        <p><strong>Strict No-Refund Policy.</strong> Refunds are ONLY granted if FoundersPrime terminates the service entirely or if all deals are permanently removed.</p>
        <ul>
          <li><strong>Final Sale:</strong> All purchases are final. No refunds for unused time, change of mind, or partial usage.</li>
          <li><strong>Cancellation:</strong> You may cancel your subscription at any time. Access will continue until the end of the current billing period.</li>
          <li><strong>Exception:</strong> Determining eligibility for any exceptional refund is at the sole discretion of FoundersPrime management.</li>
        </ul>

        <h3>Failed Payments</h3>
        <p>If payment fails, we will attempt to collect payment and may suspend your account until payment is received.</p>
      `
    },
    {
      id: 'intellectual-property',
      title: '7. Intellectual Property Rights',
      content: `
        <h3>Our Content</h3>
        <p>The Service and its content, including but not limited to text, graphics, logos, images, and software, are owned by FoundersPrime and protected by intellectual property laws.</p>

        <h3>License to Use</h3>
        <p>We grant you a limited, non-exclusive, non-transferable license to access and use the Service for your personal or business use, subject to these Terms.</p>

        <h3>User Content</h3>
        <p>You retain ownership of content you submit to the Service. By submitting content, you grant us a worldwide, royalty-free license to use, modify, and display your content in connection with the Service.</p>

        <h3>Restrictions</h3>
        <p>You may not:</p>
        <ul>
          <li>Copy, modify, or distribute our content without permission</li>
          <li>Use our trademarks or branding without authorization</li>
          <li>Reverse engineer or attempt to extract source code</li>
          <li>Create derivative works based on our Service</li>
        </ul>

        <h3>DMCA Policy</h3>
        <p>We respond to valid DMCA takedown notices. If you believe your copyright has been infringed, contact us at support@foundersprime.com.</p>
      `
    },
    {
      id: 'privacy-data',
      title: '8. Privacy and Data Protection',
      content: `
        <h3>Privacy Policy</h3>
        <p>Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information. By using the Service, you consent to our privacy practices.</p>

        <h3>Data Collection</h3>
        <p>We collect information you provide directly and automatically through your use of the Service, including:</p>
        <ul>
          <li>Account information and profile data</li>
          <li>Usage data and analytics</li>
          <li>Communication and support interactions</li>
          <li>Payment and billing information</li>
        </ul>

        <h3>Data Security</h3>
        <p>We implement appropriate security measures to protect your data, but cannot guarantee absolute security. You are responsible for maintaining the confidentiality of your account credentials.</p>

        <h3>Your Rights</h3>
        <p>You have the right to access, update, or delete your personal information. Contact us to exercise these rights.</p>
      `
    },
    {
      id: 'disclaimers-warranties',
      title: '9. Disclaimers and Warranties',
      content: `
        <h3>Service Disclaimer</h3>
        <p>The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to:</p>
        <ul>
          <li>Merchantability and fitness for a particular purpose</li>
          <li>Non-infringement of third-party rights</li>
          <li>Accuracy, completeness, or reliability of content</li>
          <li>Uninterrupted or error-free operation</li>
        </ul>

        <h3>Third-Party Content &amp; Deals</h3>
        <p>We do not endorse or guarantee the accuracy, availability, eligibility, or terms of any third-party content, deals, credits, grants, or offers provided through the Service. All offers belong to and are administered by independent providers and may change or be withdrawn at any time. Users must verify all information directly with the provider. See Section 3 (Deals, Offers &amp; Eligibility) for full details.</p>

        <h3>Investment Disclaimer</h3>
        <p>Information provided through the Service is for educational and informational purposes only and does not constitute investment, legal, tax, or financial advice. Consult qualified professionals before making business decisions.</p>

        <h3>Deal Availability</h3>
        <p>We do not guarantee the availability, eligibility, value, terms, or conditions of any deal or offer listed on the Service, and we are not responsible if a provider changes, denies, delays, reduces, or withdraws an offer. Many offers are limited, capped, time-sensitive, or first-come, first-served, and may be fully claimed or expire without notice &mdash; we do not promise that any such offer will be available to you. Deal terms and eligibility are set and enforced solely by the provider and depend on your individual circumstances. FoundersPrime accepts no responsibility or liability for whether you qualify for, are granted, or are able to use any offer.</p>
      `
    },
    {
      id: 'limitation-liability',
      title: '10. Limitation of Liability',
      content: `
        <h3>Liability Limits</h3>
        <p>To the maximum extent permitted by law, FoundersPrime shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:</p>
        <ul>
          <li>Loss of profits, revenue, or business opportunities</li>
          <li>Loss of data or information</li>
          <li>Business interruption or downtime</li>
          <li>Personal injury or property damage</li>
        </ul>

        <h3>Maximum Liability</h3>
        <p>Our total liability for any claims arising from or related to the Service shall not exceed the amount you paid us in the 12 months preceding the claim, or $100, whichever is greater.</p>

        <h3>Exceptions</h3>
        <p>These limitations do not apply to:</p>
        <ul>
          <li>Death or personal injury caused by our negligence</li>
          <li>Fraud or fraudulent misrepresentation</li>
          <li>Violations of applicable consumer protection laws</li>
          <li>Other liabilities that cannot be excluded by law</li>
        </ul>
      `
    },
    {
      id: 'indemnification',
      title: '11. Indemnification',
      content: `
        <h3>Your Indemnification Obligations</h3>
        <p>You agree to indemnify, defend, and hold harmless FoundersPrime, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from:</p>
        <ul>
          <li>Your use of the Service</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of any third-party rights</li>
          <li>Content you submit to the Service</li>
          <li>Your negligent or wrongful conduct</li>
        </ul>

        <h3>Defense of Claims</h3>
        <p>We reserve the right to assume the exclusive defense and control of any matter subject to indemnification, and you agree to cooperate with our defense.</p>

        <h3>Notice Requirement</h3>
        <p>We will promptly notify you of any claims for which we seek indemnification and give you reasonable opportunity to defend.</p>
      `
    },
    {
      id: 'termination',
      title: '12. Termination',
      content: `
        <h3>Termination by You</h3>
        <p>You may terminate your account and stop using the Service at any time by:</p>
        <ul>
          <li>Cancelling your subscription through account settings</li>
          <li>Contacting our support team</li>
          <li>Following the cancellation process in your account</li>
        </ul>

        <h3>Termination by Us</h3>
        <p>We may suspend or terminate your account immediately if you:</p>
        <ul>
          <li>Violate these Terms or our policies</li>
          <li>Engage in fraudulent or illegal activities</li>
          <li>Fail to pay subscription fees</li>
          <li>Abuse or harass other users or our staff</li>
        </ul>

        <h3>Effect of Termination</h3>
        <p>Upon termination:</p>
        <ul>
          <li>Your access to the Service will be immediately suspended</li>
          <li>We may delete your account and data after 30 days</li>
          <li>You remain liable for any outstanding fees</li>
          <li>Provisions that should survive termination will continue to apply</li>
        </ul>
      `
    },
    {
      id: 'governing-law',
      title: '13. Governing Law and Disputes',
      content: `
        <h3>Governing Law</h3>
        <p>These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles.</p>

        <h3>Dispute Resolution</h3>
        <p>We encourage resolving disputes through direct communication. If that fails, disputes will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.</p>

        <h3>Arbitration Agreement</h3>
        <p>By using the Service, you agree to resolve disputes through individual arbitration rather than class action lawsuits. This agreement includes:</p>
        <ul>
          <li>Individual arbitration only (no class actions)</li>
          <li>Arbitration in San Francisco, California</li>
          <li>Application of California state law</li>
          <li>Right to opt out within 30 days of account creation</li>
        </ul>

        <h3>Exceptions to Arbitration</h3>
        <p>Either party may seek injunctive relief in court for intellectual property violations or other urgent matters.</p>
      `
    }
  ]

  return (
    <div className="space-y-4 md:space-y-6">
      {sections.map((section, index) => (
        <div key={index} id={section.id} className="scroll-mt-20 bg-white dark:bg-[#09090b]/90 border border-gray-200 dark:border-neutral-900 shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-xl backdrop-blur-md p-4 md:p-6 transition-colors duration-300">
          <h2 className="font-mono text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
            {section.title}
          </h2>
          <div
            className="prose prose-sm md:prose-lg max-w-none [&_h3]:font-mono [&_h3]:text-base md:[&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 dark:[&_h3]:text-white [&_h3]:mt-4 md:[&_h3]:mt-6 [&_h3]:mb-2 md:[&_h3]:mb-3 [&_p]:font-sans [&_p]:text-sm [&_p]:text-gray-800 dark:[&_p]:text-gray-300 [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:my-3 [&_ul]:pl-4 [&_li]:font-sans [&_li]:text-sm [&_li]:text-gray-800 dark:[&_li]:text-gray-300 [&_li]:mb-1 [&_li]:leading-relaxed [&_strong]:font-bold [&_strong]:text-gray-900 dark:[&_strong]:text-white"
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        </div>
      ))}

      {/* Contact Information */}
      <div className="bg-gradient-to-r from-accent-yellow/10 to-transparent border border-accent-yellow/20 rounded-xl p-4 md:p-6">
        <h2 className="font-mono text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">
          Questions About These Terms?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-mono text-base font-bold text-gray-900 dark:text-white mb-2">Legal Team</h3>
            <div className="space-y-1">
              <p className="font-sans text-sm text-gray-800 dark:text-gray-300">
                <strong>Email:</strong> support@foundersprime.com
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-mono text-base font-bold text-gray-900 dark:text-white mb-2">Support Team</h3>
            <div className="space-y-1">
              <p className="font-sans text-sm text-gray-800 dark:text-gray-300">
                <strong>Email:</strong> support@foundersprime.com
              </p>
              <p className="font-sans text-sm text-gray-800 dark:text-gray-300">
                <strong>Response Time:</strong> Within 1 business day
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-800">
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="mailto:support@foundersprime.com?subject=Legal%20Inquiry" className="flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-[#FFD700] to-[#FDB931] hover:from-[#FDB931] hover:to-[#FFD700] text-black font-mono text-sm font-black rounded-lg transition-all shadow-[0_0_15px_rgba(255,215,0,0.25)] hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] border border-[#FFD700]/40">
              Contact Legal Team
            </a>
            <a href="mailto:support@foundersprime.com" className="flex items-center justify-center px-5 py-2.5 bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white font-mono text-sm font-bold rounded-lg transition-all">
              Get Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}