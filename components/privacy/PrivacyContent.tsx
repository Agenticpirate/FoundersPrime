'use client'

export default function PrivacyContent() {
  const sections = [
    {
      id: 'information-we-collect',
      title: '1. Information We Collect',
      content: `
        <h3>Personal Information</h3>
        <p>When you create an account or use our services, we may collect:</p>
        <ul>
          <li><strong>Account Information:</strong> Name, email address, password, and profile information</li>
          <li><strong>Company Information:</strong> Company name, role, industry, and startup details</li>
          <li><strong>Contact Information:</strong> Phone number, address, and communication preferences</li>
          <li><strong>Payment Information:</strong> Billing address and payment method details (processed securely by Stripe)</li>
        </ul>

        <h3>Usage Information</h3>
        <p>We automatically collect information about how you use our platform:</p>
        <ul>
          <li><strong>Activity Data:</strong> Pages visited, features used, deals viewed, and time spent</li>
          <li><strong>Device Information:</strong> Browser type, operating system, IP address, and device identifiers</li>
          <li><strong>Log Data:</strong> Server logs, error reports, and performance metrics</li>
          <li><strong>Cookies and Tracking:</strong> Session data, preferences, and analytics information</li>
        </ul>

        <h3>Content and Communications</h3>
        <ul>
          <li><strong>User Content:</strong> Comments, reviews, forum posts, and uploaded files</li>
          <li><strong>Communications:</strong> Support tickets, feedback, and correspondence with our team</li>
          <li><strong>Social Media:</strong> Information from connected social media accounts (with your permission)</li>
        </ul>
      `
    },
    {
      id: 'how-we-use-information',
      title: '2. How We Use Your Information',
      content: `
        <h3>Service Provision</h3>
        <ul>
          <li>Create and manage your account</li>
          <li>Provide access to deals, resources, and platform features</li>
          <li>Process payments and manage subscriptions</li>
          <li>Deliver customer support and respond to inquiries</li>
          <li>Send important service updates and notifications</li>
        </ul>

        <h3>Personalization and Improvement</h3>
        <ul>
          <li>Customize content and recommendations based on your interests</li>
          <li>Analyze usage patterns to improve our platform</li>
          <li>Develop new features and services</li>
          <li>Conduct research and analytics</li>
          <li>A/B test new functionality and user experiences</li>
        </ul>

        <h3>Communication and Marketing</h3>
        <ul>
          <li>Send newsletters and product updates (with your consent)</li>
          <li>Notify you about relevant deals and opportunities</li>
          <li>Invite you to events, webinars, and community activities</li>
          <li>Share educational content and startup resources</li>
        </ul>

        <h3>Legal and Security</h3>
        <ul>
          <li>Comply with legal obligations and regulatory requirements</li>
          <li>Protect against fraud, abuse, and security threats</li>
          <li>Enforce our Terms of Service and community guidelines</li>
          <li>Resolve disputes and investigate violations</li>
        </ul>
      `
    },
    {
      id: 'information-sharing',
      title: '3. Information Sharing and Disclosure',
      content: `
        <h3>We Do Not Sell Your Data</h3>
        <p>We never sell, rent, or trade your personal information to third parties for marketing purposes.</p>

        <h3>Service Providers</h3>
        <p>We share information with trusted service providers who help us operate our platform:</p>
        <ul>
          <li><strong>Payment Processing:</strong> Stripe for secure payment processing</li>
          <li><strong>Email Services:</strong> SendGrid for transactional and marketing emails</li>
          <li><strong>Analytics:</strong> Google Analytics for usage analytics (anonymized)</li>
          <li><strong>Cloud Storage:</strong> AWS for secure data storage and hosting</li>
          <li><strong>Customer Support:</strong> Intercom for customer service and support</li>
        </ul>

        <h3>Business Transfers</h3>
        <p>If we're involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We'll notify you before your information becomes subject to a different privacy policy.</p>

        <h3>Legal Requirements</h3>
        <p>We may disclose your information when required by law or to:</p>
        <ul>
          <li>Comply with legal process or government requests</li>
          <li>Protect our rights, property, or safety</li>
          <li>Protect the rights, property, or safety of our users</li>
          <li>Investigate potential violations of our terms</li>
        </ul>

        <h3>Aggregated and Anonymized Data</h3>
        <p>We may share aggregated, anonymized data that cannot identify you personally for research, analytics, and business purposes.</p>
      `
    },
    {
      id: 'data-security',
      title: '4. Data Security',
      content: `
        <h3>Security Measures</h3>
        <p>We implement industry-standard security measures to protect your information:</p>
        <ul>
          <li><strong>Encryption:</strong> All data is encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
          <li><strong>Access Controls:</strong> Strict access controls and authentication requirements</li>
          <li><strong>Regular Audits:</strong> Security audits and penetration testing</li>
          <li><strong>Monitoring:</strong> 24/7 security monitoring and threat detection</li>
          <li><strong>Backup and Recovery:</strong> Regular backups and disaster recovery procedures</li>
        </ul>

        <h3>Data Centers</h3>
        <p>Our data is stored in secure, SOC 2 Type II certified data centers with:</p>
        <ul>
          <li>Physical security controls and access restrictions</li>
          <li>Environmental controls and redundant power systems</li>
          <li>Network security and DDoS protection</li>
          <li>Regular security assessments and compliance audits</li>
        </ul>

        <h3>Employee Access</h3>
        <p>Access to personal information is limited to employees who need it to perform their job functions. All employees undergo background checks and sign confidentiality agreements.</p>

        <h3>Incident Response</h3>
        <p>In the unlikely event of a data breach, we will:</p>
        <ul>
          <li>Notify affected users within 72 hours</li>
          <li>Report to relevant authorities as required by law</li>
          <li>Take immediate steps to secure the breach</li>
          <li>Provide regular updates on our investigation</li>
        </ul>
      `
    },
    {
      id: 'your-rights',
      title: '5. Your Privacy Rights',
      content: `
        <h3>Access and Portability</h3>
        <ul>
          <li><strong>Access:</strong> Request a copy of all personal information we have about you</li>
          <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
          <li><strong>Transparency:</strong> Understand how your data is being used</li>
        </ul>

        <h3>Control and Correction</h3>
        <ul>
          <li><strong>Update:</strong> Modify your account information and preferences</li>
          <li><strong>Correct:</strong> Fix any inaccurate or incomplete information</li>
          <li><strong>Restrict:</strong> Limit how we process your information</li>
        </ul>

        <h3>Deletion and Opt-Out</h3>
        <ul>
          <li><strong>Delete Account:</strong> Permanently delete your account and associated data</li>
          <li><strong>Selective Deletion:</strong> Remove specific pieces of information</li>
          <li><strong>Marketing Opt-Out:</strong> Unsubscribe from marketing communications</li>
          <li><strong>Cookie Control:</strong> Manage cookie preferences and tracking</li>
        </ul>

        <h3>How to Exercise Your Rights</h3>
        <p>To exercise any of these rights:</p>
        <ul>
          <li>Log into your account settings to make changes directly</li>
          <li>Email us at support@foundersprime.com</li>
          <li>Use our privacy request form</li>
          <li>Contact our support team</li>
        </ul>

        <p>We'll respond to your request within 30 days and may ask you to verify your identity for security purposes.</p>
      `
    },
    {
      id: 'cookies-tracking',
      title: '6. Cookies and Tracking Technologies',
      content: `
        <h3>Types of Cookies We Use</h3>
        <ul>
          <li><strong>Essential Cookies:</strong> Required for basic site functionality and security</li>
          <li><strong>Performance Cookies:</strong> Help us understand how you use our site</li>
          <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
          <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
        </ul>

        <h3>Third-Party Tracking</h3>
        <p>We use the following third-party services that may collect information:</p>
        <ul>
          <li><strong>Google Analytics:</strong> Website usage analytics (anonymized)</li>
          <li><strong>Hotjar:</strong> User behavior analysis and heatmaps</li>
          <li><strong>Facebook Pixel:</strong> Advertising and conversion tracking</li>
          <li><strong>LinkedIn Insight:</strong> Professional audience analytics</li>
        </ul>

        <h3>Managing Cookies</h3>
        <p>You can control cookies through:</p>
        <ul>
          <li>Your browser settings (disable, delete, or block cookies)</li>
          <li>Our cookie preference center</li>
          <li>Third-party opt-out tools</li>
          <li>Do Not Track browser settings</li>
        </ul>

        <p><strong>Note:</strong> Disabling essential cookies may affect site functionality.</p>
      `
    },
    {
      id: 'international-transfers',
      title: '7. International Data Transfers',
      content: `
        <h3>Global Operations</h3>
        <p>FoundersPrime operates globally, and your information may be transferred to and processed in countries other than your own, including the United States.</p>

        <h3>Safeguards</h3>
        <p>When we transfer your information internationally, we ensure appropriate safeguards:</p>
        <ul>
          <li><strong>Adequacy Decisions:</strong> Transfers to countries with adequate privacy laws</li>
          <li><strong>Standard Contractual Clauses:</strong> EU-approved contract terms for data protection</li>
          <li><strong>Binding Corporate Rules:</strong> Internal policies ensuring consistent protection</li>
          <li><strong>Certification Programs:</strong> Privacy Shield and similar frameworks</li>
        </ul>

        <h3>Your Rights</h3>
        <p>Regardless of where your data is processed, you retain all privacy rights outlined in this policy.</p>
      `
    },
    {
      id: 'data-retention',
      title: '8. Data Retention',
      content: `
        <h3>Retention Periods</h3>
        <ul>
          <li><strong>Account Data:</strong> Retained while your account is active</li>
          <li><strong>Usage Data:</strong> Typically retained for 2 years for analytics</li>
          <li><strong>Communication Records:</strong> Kept for 3 years for support purposes</li>
          <li><strong>Financial Records:</strong> Retained for 7 years for tax and legal compliance</li>
          <li><strong>Marketing Data:</strong> Deleted immediately upon opt-out</li>
        </ul>

        <h3>Deletion Process</h3>
        <p>When you delete your account:</p>
        <ul>
          <li>Personal information is deleted within 30 days</li>
          <li>Some data may be retained for legal or security purposes</li>
          <li>Anonymized data may be retained for analytics</li>
          <li>Backup systems are purged within 90 days</li>
        </ul>

        <h3>Legal Holds</h3>
        <p>We may retain information longer if required by law, legal proceedings, or regulatory investigations.</p>
      `
    },
    {
      id: 'children-privacy',
      title: '9. Children\'s Privacy',
      content: `
        <h3>Age Restrictions</h3>
        <p>FoundersPrime is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16.</p>

        <h3>Parental Rights</h3>
        <p>If we learn that we have collected information from a child under 16:</p>
        <ul>
          <li>We will delete the information immediately</li>
          <li>We will terminate the account</li>
          <li>We will notify the parents if possible</li>
          <li>We will not use the information for any purpose</li>
        </ul>

        <p>If you believe we have collected information from a child under 16, please contact us immediately at support@foundersprime.com.</p>
      `
    },
    {
      id: 'policy-changes',
      title: '10. Changes to This Policy',
      content: `
        <h3>Updates and Notifications</h3>
        <p>We may update this privacy policy from time to time. When we do:</p>
        <ul>
          <li>We'll post the updated policy on this page</li>
          <li>We'll update the "Last Modified" date</li>
          <li>We'll notify you via email for significant changes</li>
          <li>We'll provide a summary of key changes</li>
        </ul>

        <h3>Your Continued Use</h3>
        <p>Your continued use of our services after policy changes constitutes acceptance of the updated terms. If you don't agree with changes, you may delete your account.</p>

        <h3>Version History</h3>
        <p>Previous versions of this policy are available upon request.</p>
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
          Contact Us About Privacy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-mono text-base font-bold text-black mb-2">Privacy Officer</h3>
            <div className="space-y-1">
              <p className="font-sans text-sm text-gray-800">
                <strong>Email:</strong> support@foundersprime.com
              </p>
              <p className="font-sans text-sm text-gray-800">
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p className="font-sans text-sm text-gray-800">
                <strong>Address:</strong> 123 Startup Street, Suite 456<br />
                San Francisco, CA 94105, United States
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-mono text-base font-bold text-black mb-2">EU Representative</h3>
            <div className="space-y-1">
              <p className="font-sans text-sm text-gray-800">
                <strong>Email:</strong> support@foundersprime.com
              </p>
              <p className="font-sans text-sm text-gray-800">
                <strong>Address:</strong> FoundersPrime EU Privacy<br />
                123 European Street<br />
                Dublin, Ireland
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t-2 border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-5 py-2.5 bg-accent-yellow hover:bg-black hover:text-white border-2 border-black text-black font-mono text-sm font-bold rounded-sm transition-all shadow-[2px_2px_0px_0px_#1a1a1a] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
              Submit Privacy Request
            </button>
            <button className="px-5 py-2.5 bg-white hover:bg-gray-100 border-2 border-black text-black font-mono text-sm font-bold rounded-sm transition-all shadow-[2px_2px_0px_0px_#1a1a1a] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
              Download Your Data
            </button>
            <button className="px-5 py-2.5 bg-white hover:bg-gray-100 border-2 border-black text-black font-mono text-sm font-bold rounded-sm transition-all shadow-[2px_2px_0px_0px_#1a1a1a] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}