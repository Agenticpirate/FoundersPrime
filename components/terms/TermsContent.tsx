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
        <p>FoundersPrime is a platform that provides:</p>
        <ul>
          <li><strong>Deal Aggregation:</strong> Curated startup deals, credits, and discounts</li>
          <li><strong>Startup Database:</strong> Information about funded startups and their metrics</li>
          <li><strong>Idea Validation:</strong> Startup ideas with market analysis and validation data</li>
          <li><strong>Resource Library:</strong> Templates, guides, and tools for entrepreneurs</li>
          <li><strong>Community Features:</strong> Forums, discussions, and networking opportunities</li>
        </ul>

        <h3>Service Availability</h3>
        <p>We strive to maintain 99.9% uptime, but we do not guarantee uninterrupted access to the Service. We may temporarily suspend the Service for maintenance, updates, or other operational reasons.</p>

        <h3>Third-Party Services</h3>
        <p>Our Service may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of third-party services.</p>
      `
    },
    {
      id: 'user-accounts',
      title: '3. User Accounts',
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
      title: '4. Acceptable Use Policy',
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
      title: '5. Subscription and Billing',
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
      title: '6. Intellectual Property Rights',
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
      title: '7. Privacy and Data Protection',
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
      title: '8. Disclaimers and Warranties',
      content: `
        <h3>Service Disclaimer</h3>
        <p>The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to:</p>
        <ul>
          <li>Merchantability and fitness for a particular purpose</li>
          <li>Non-infringement of third-party rights</li>
          <li>Accuracy, completeness, or reliability of content</li>
          <li>Uninterrupted or error-free operation</li>
        </ul>

        <h3>Third-Party Content</h3>
        <p>We do not endorse or guarantee the accuracy of third-party content, deals, or information provided through the Service. Users should verify all information independently.</p>

        <h3>Investment Disclaimer</h3>
        <p>Information provided through the Service is for educational purposes only and does not constitute investment, legal, or financial advice. Consult with qualified professionals before making business decisions.</p>

        <h3>Deal Availability</h3>
        <p>We do not guarantee the availability, terms, or conditions of any deals or offers listed on the Service. Deal terms may change without notice.</p>
      `
    },
    {
      id: 'limitation-liability',
      title: '9. Limitation of Liability',
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
      title: '10. Indemnification',
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
      title: '11. Termination',
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
      title: '12. Governing Law and Disputes',
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
    <div className="space-y-6">
      {sections.map((section, index) => (
        <div key={index} id={section.id} className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-6">
          <h2 className="font-mono text-xl font-bold text-black mb-4">
            {section.title}
          </h2>
          <div
            className="prose prose-lg max-w-none [&_h3]:font-mono [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-black [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:font-sans [&_p]:text-sm [&_p]:text-gray-800 [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:my-3 [&_ul]:pl-4 [&_li]:font-sans [&_li]:text-sm [&_li]:text-gray-800 [&_li]:mb-1 [&_li]:leading-relaxed [&_strong]:font-bold [&_strong]:text-black"
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        </div>
      ))}

      {/* Contact Information */}
      <div className="bg-accent-yellow/5 border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h2 className="font-mono text-xl font-bold text-black mb-4">
          Questions About These Terms?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-mono text-base font-bold text-black mb-2">Legal Team</h3>
            <div className="space-y-1">
              <p className="font-sans text-sm text-gray-800">
                <strong>Email:</strong> support@foundersprime.com
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-mono text-base font-bold text-black mb-2">Support Team</h3>
            <div className="space-y-1">
              <p className="font-sans text-sm text-gray-800">
                <strong>Email:</strong> support@foundersprime.com
              </p>
              <p className="font-sans text-sm text-gray-800">
                <strong>Response Time:</strong> Within 1 business day
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t-2 border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="mailto:support@foundersprime.com?subject=Legal%20Inquiry" className="px-5 py-2.5 bg-accent-yellow hover:bg-black hover:text-white border-2 border-black text-black font-mono text-sm font-bold rounded-sm transition-all shadow-[2px_2px_0px_0px_#1a1a1a] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
              Contact Legal Team
            </a>
            <a href="mailto:support@foundersprime.com" className="px-5 py-2.5 bg-white hover:bg-gray-100 border-2 border-black text-black font-mono text-sm font-bold rounded-sm transition-all shadow-[2px_2px_0px_0px_#1a1a1a] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
              Get Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}