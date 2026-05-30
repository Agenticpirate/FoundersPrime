import { Metadata } from 'next'
import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'
import ContactFAQ from '@/components/contact/ContactFAQ'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the FoundersPrime team. Questions about deals, partnerships, or your account — we respond within 24 hours.',
  alternates: {
    canonical: 'https://www.foundersprime.com/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      <Header />
      <main className="flex-1 pattern-grid-lg">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <ContactHero />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div className="lg:col-span-1">
              <ContactInfo />
            </div>
          </div>
          <ContactFAQ />
        </div>
      </main>
      <Footer />
    </div>
  )
}