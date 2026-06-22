'use client'

import Script from 'next/script'

const GA_MEASUREMENT_ID = 'G-X2EQLZJD8C'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <head>
                {/* Google tag (gtag.js) — also included on the global error page */}
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                    strategy="afterInteractive"
                />
                <Script id="google-analytics-global-error" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}');
                    `}
                </Script>
            </head>
            <body>
                <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF9F5] dark:bg-[#050505] text-black dark:text-white p-4 text-center font-mono transition-colors duration-300">
                    <div className="mb-4 md:mb-6">
                        <div className="inline-block border-2 border-black dark:border-accent-red/40 bg-accent-red px-6 py-2 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(239,68,68,0.2)] mb-6 rounded-md">
                            <span className="font-mono text-xs font-bold uppercase text-white tracking-wider">Critical System Error</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-black dark:text-white mb-4">CRITICAL ERROR</h1>
                        <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-4 md:mb-6 max-w-md mx-auto leading-relaxed">
                            A critical system error occurred that prevented the application from loading.
                        </p>
                        <button
                            onClick={() => reset()}
                            className="inline-flex items-center justify-center gap-2 border-2 border-black bg-accent-yellow px-8 py-3 font-mono text-xs font-black uppercase tracking-wider text-black shadow-[4px_4px_0px_#000] hover:bg-white hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-md"
                        >
                            System Reset
                        </button>
                    </div>
                    <div className="bg-gray-50 dark:bg-white/5 p-4 border border-black/10 dark:border-white/10 rounded-xl text-xs text-left max-w-lg overflow-auto">
                        <p className="font-bold mb-2">Error Details:</p>
                        <pre className="whitespace-pre-wrap text-red-500 font-mono">{error.message}</pre>
                        {error.digest && <p className="mt-2 text-gray-500">Digest: {error.digest}</p>}
                    </div>
                </div>
            </body>
        </html>
    )
}
