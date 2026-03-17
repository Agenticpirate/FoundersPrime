'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ProgramsPage() {
    const router = useRouter()

    useEffect(() => {
        // Redirect to grants page as the default programs page
        router.push('/programs/grants')
    }, [router])

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
            <Header />
            <main className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent mb-4"></div>
                    <p className="font-mono text-sm text-gray-600">Redirecting to Programs...</p>
                </div>
            </main>
            <Footer />
        </div>
    )
}
