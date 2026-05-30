'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getPaymentLink } from '@/lib/pricing/payment-links'

export default function CheckoutContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const plan = searchParams.get('plan') || 'pro'
    const period = searchParams.get('period')

    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const initiateCheckout = async () => {
            try {
                // Map frontend params to API expected keys (monthly, annual, lifetime)
                let apiPlan = plan;
                if (plan === 'pro') {
                    // Default to monthly if period is missing/invalid, usually explicitly set by pricing page
                    apiPlan = period === 'annual' ? 'annual' : 'monthly';
                }

                // Call our new API route
                const response = await fetch('/api/payment/create-link', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ plan: apiPlan, customerEmail: '' }) // user email not available here yet
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to create payment link');
                }

                // Redirect to Dodo Checkout
                window.location.href = data.url;
            } catch (err: any) {
                console.error('Checkout error:', err);
                setError(err.message);
                setIsLoading(false);
            }
        };

        if (plan) {
            initiateCheckout();
        }
    }, [plan, period])

    return (
        <div className="max-w-md w-full mx-4 bg-white border-2 md:border-[3px] border-black shadow-[4px_4px_0px_#111111] md:shadow-[6px_6px_0px_#111111] p-6 md:p-8 text-center">
            <div className="mb-5 md:mb-6">
                <span className="material-symbols-outlined text-5xl md:text-6xl text-primary animate-pulse">sync_alt</span>
            </div>

            <h1 className="text-xl md:text-2xl font-black uppercase mb-3 md:mb-4">Redirecting to Secure Checkout...</h1>

            {error ? (
                <div className="p-4 bg-red-100 border-2 border-red-600 text-red-900 rounded-sm">
                    <p className="font-bold flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">error</span>
                        Checkout Error
                    </p>
                    <p className="mt-2 text-sm">{error}</p>
                    {error.includes('Product IDs') && (
                        <p className="mt-4 text-xs font-mono bg-white p-2 border border-red-200">
                            Configuration Pending: Dodo Payment Product IDs are missing.
                        </p>
                    )}
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-black text-white px-4 py-2 font-bold hover:bg-gray-800"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center my-8">
                    <div className="animate-spin h-8 w-8 border-4 border-black border-t-transparent rounded-full mb-4"></div>
                    <p className="text-sm font-bold animate-pulse">Creating secure session...</p>
                </div>
            )}

            <p className="mt-6 text-xs text-gray-400">
                Secured by Dodo Payments.
            </p>
        </div>
    )
}
