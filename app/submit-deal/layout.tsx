import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submit a Deal — FoundersPrime',
  description: 'Reach thousands of verified founders by listing your high-value, exclusive startup deal, cloud credits, or SaaS discount on FoundersPrime.',
  alternates: {
    canonical: 'https://www.foundersprime.com/submit-deal',
  },
}

export default function SubmitDealLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
