import { Metadata } from 'next'
import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'
import ContactFAQ from '@/components/contact/ContactFAQ'
import { ContactPageField } from '@/components/contact/ContactAmbientDecor'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact the FoundersPrime team — deals, billing, partnerships, and support. Replies within 24–48 hours.',
  alternates: {
    canonical: 'https://www.foundersprime.com/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-[#000000] text-[#1a1a1a] dark:text-white transition-colors duration-300">
      <ContactPageField />
      <Header />
      <main className="relative flex-1">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-5 lg:py-7">
          <ContactHero />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 mb-8">
            <div className="lg:col-span-8 min-w-0">
              <ContactForm />
            </div>
            <div className="lg:col-span-4 min-w-0">
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
