import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CheckoutContent from '@/components/checkout/CheckoutContent'

export default function CheckoutPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1 bg-gray-50 flex items-center justify-center min-h-[60vh]">
                <Suspense fallback={<div>Loading checkout...</div>}>
                    <CheckoutContent />
                </Suspense>
            </main>
            <Footer />
        </div>
    )
}
