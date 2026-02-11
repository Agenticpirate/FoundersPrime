'use client'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
                <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center font-mono">
                    <div className="mb-8">
                        <h1 className="text-6xl font-black text-black mb-4">CRITICAL ERROR</h1>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            A critical system error occurred that prevented the application from loading.
                        </p>
                        <button
                            onClick={() => reset()}
                            className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-all"
                        >
                            System Reset
                        </button>
                    </div>
                    <div className="bg-gray-100 p-4 border border-gray-300 rounded text-xs text-left max-w-lg overflow-auto">
                        <p className="font-bold mb-2">Error Details:</p>
                        <pre className="whitespace-pre-wrap text-red-600">{error.message}</pre>
                        {error.digest && <p className="mt-2 text-gray-400">Digest: {error.digest}</p>}
                    </div>
                </div>
            </body>
        </html>
    )
}
