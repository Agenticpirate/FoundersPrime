import { redirect } from 'next/navigation'

// Billing is now a tab inside the Dashboard so users can manage everything
// from one place. Redirect any inbound /billing traffic.
export default function BillingPage() {
  redirect('/dashboard?tab=billing')
}
