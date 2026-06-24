/**
 * Mail Service
 * Handles sending proof emails for dofollow backlinks and other system notifications.
 */

export interface ProofEmailPayload {
  toEmail: string;
  companyName: string;
  websiteUrl: string;
  dealSlug: string;
}

export async function sendDofollowProofEmail(payload: ProofEmailPayload): Promise<{ success: boolean; message: string }> {
  const { toEmail, companyName, websiteUrl, dealSlug } = payload;
  const dealUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.foundersprime.com'}/deals/${dealSlug}`;
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.foundersprime.com'}/api/deals/${dealSlug}/verify-dofollow`;

  const emailSubject = `🚀 Verified: Your Do-Follow SEO Backlink is Live on FoundersPrime!`;
  
  const emailHtml = `
    <div style="font-family: monospace, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #000; background-color: #ffffff; color: #000000;">
      <h2 style="text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 10px; margin-top: 0;">FoundersPrime SEO Dispatch</h2>
      <p>Hello Founder,</p>
      <p>Great news! Your deal for <strong>${companyName}</strong> has been approved, and your premium <strong>do-follow backlink</strong> is now live on our website.</p>
      
      <div style="background-color: #f5f5f5; padding: 15px; border: 1px dashed #000; margin: 20px 0;">
        <p style="margin: 0 0 10px 0;"><strong>⚡ SEO Backlink Proof & Details:</strong></p>
        <ul style="margin: 0; padding-left: 20px;">
          <li><strong>Target Website:</strong> <a href="${websiteUrl}" style="color: #0066cc;">${websiteUrl}</a></li>
          <li><strong>Link Type:</strong> <code>dofollow</code> (rel="noopener")</li>
          <li><strong>Live Deal Page:</strong> <a href="${dealUrl}" style="color: #0066cc;">${dealUrl}</a></li>
          <li><strong>API Verification:</strong> <a href="${verificationUrl}" style="color: #0066cc;">${verificationUrl}</a></li>
        </ul>
      </div>

      <p>Search engines like Google will now crawl this page and pass valuable SEO authority (link juice) to your domain.</p>
      
      <div style="margin-top: 30px; border-top: 2px solid #000; padding-top: 15px; font-size: 11px; color: #555;">
        <p>This is an automated delivery. No manual action is required. Thank you for listing with FoundersPrime.</p>
      </div>
    </div>
  `;

  console.log('================================================================================');
  console.log(`✉️ [AUTOMATED PROOF EMAIL] Dispatching to ${toEmail}`);
  console.log(`Subject: ${emailSubject}`);
  console.log(`Deal URL: ${dealUrl}`);
  console.log(`Verification: ${verificationUrl}`);
  console.log('================================================================================');

  // If a Resend API key is available in environment, attempt to send via Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'FoundersPrime Deals <deals@foundersprime.com>',
          to: toEmail,
          subject: emailSubject,
          html: emailHtml
        })
      });

      if (response.ok) {
        return { success: true, message: 'Email sent successfully via Resend' };
      } else {
        const errText = await response.text();
        console.error('Failed to send email via Resend:', errText);
        return { success: false, message: `Resend API error: ${errText}` };
      }
    } catch (e: any) {
      console.error('Exception sending email via Resend:', e);
      return { success: false, message: e.message || 'Exception during Resend fetch' };
    }
  }

  return { success: true, message: 'Email simulated and printed to server console logs' };
}
