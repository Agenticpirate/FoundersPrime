'use client'

import { useState, useRef, useEffect } from 'react'
import Header from '@/components/Header'

export default function SubmitDealPage() {
    const [logoMethod, setLogoMethod] = useState<'url' | 'upload'>('url')
    const [previewUrl, setPreviewUrl] = useState<string>('')
    const [challenge, setChallenge] = useState({ num1: 0, num2: 0, answer: '' })
    const [securityAnswer, setSecurityAnswer] = useState('')
    const [isHuman, setIsHuman] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Generate dynamic challenge on client mount
    useEffect(() => {
        const num1 = Math.floor(Math.random() * 10) + 1
        const num2 = Math.floor(Math.random() * 10) + 1
        setChallenge({
            num1,
            num2,
            answer: (num1 + num2).toString()
        })
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
        }
    }

    const checkSecurity = (val: string) => {
        setSecurityAnswer(val)
        setIsHuman(val.trim() === challenge.answer)
    }

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isHuman) {
            alert("Please complete the security check correctly.")
            return
        }

        setIsSubmitting(true)
        setSubmissionStatus('idle')

        const formData = new FormData(e.currentTarget)
        const data = {
            company_name: formData.get('company_name'),
            website_url: formData.get('website_url'),
            logo_url: logoMethod === 'url' ? formData.get('logo_url') : previewUrl, // Handle file upload properly later if needed
            benefit_description: formData.get('benefit_description'),
            category: formData.get('category'),
            deal_value: formData.get('deal_value'),
            redemption_method: formData.get('redemption'),
            redemption_link: formData.get('redemption_link'),
            is_exclusive: formData.get('is_exclusive') === 'on',
            submitter_email: formData.get('submitter_email'), // Add this field to form
        }

        try {
            const response = await fetch('/api/submit-deal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                setSubmissionStatus('success')
                e.currentTarget.reset()
                setPreviewUrl('')
                setIsHuman(false)
                setSecurityAnswer('')
                // Helper to reset security check
                const num1 = Math.floor(Math.random() * 10) + 1
                const num2 = Math.floor(Math.random() * 10) + 1
                setChallenge({ num1, num2, answer: (num1 + num2).toString() })
            } else {
                setSubmissionStatus('error')
            }
        } catch (error) {
            console.error('Submission error:', error)
            setSubmissionStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-background-light flex flex-col font-mono">
            <Header />

            <main className="flex-grow py-4 md:py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-4 md:mb-6 text-center">
                        <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 uppercase">Submit Your Deal</h1>
                        <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
                            Reach 12,000+ verified founders. We only list high-value, exclusive deals.
                            <div className="bg-accent-yellow px-2 py-0.5 mt-2 md:mt-0 md:inline-block border border-black font-bold text-black border-2 text-sm">Zero fees.</div>
                        </p>
                    </div>

                    {submissionStatus === 'success' ? (
                        <div className="bg-green-100 border-2 border-green-500 p-8 text-center shadow-[8px_8px_0px_0px_#22c55e]">
                            <span className="material-symbols-outlined text-6xl text-green-600 mb-4">check_circle</span>
                            <h2 className="text-2xl font-bold mb-2 uppercase">Submission Received!</h2>
                            <p className="mb-6">Thanks for submitting your deal. Our team will review it within 48 hours.</p>
                            <button
                                onClick={() => setSubmissionStatus('idle')}
                                className="px-6 py-2 bg-black text-white font-bold uppercase hover:bg-gray-800 transition-colors"
                            >
                                Submit Another Deal
                            </button>
                        </div>
                    ) : (
                        <form className="bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_#000] md:shadow-[8px_8px_0px_0px_#000] p-4 md:p-8 space-y-5 md:space-y-8" onSubmit={handleSubmit}>

                            {/* Section 1: Provider Info */}
                            <div className="space-y-3 md:space-y-4">
                                <h2 className="text-lg md:text-xl font-bold uppercase border-b-2 border-black pb-2 flex items-center gap-2">
                                    <span className="bg-black text-white w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs md:text-sm rounded-none">1</span>
                                    Provider Details
                               </h2>

                               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase mb-1">Company Name *</label>
                                        <input type="text" placeholder="e.g. Acme Corp" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase mb-1">Website URL *</label>
                                        <input type="url" placeholder="https://" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light" required />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-2">Logo Upload *</label>

                                    <div className="flex gap-4 mb-2 text-xs font-bold">
                                        <button
                                            type="button"
                                            onClick={() => setLogoMethod('url')}
                                            className={`px-3 py-1 border-2 border-black ${logoMethod === 'url' ? 'bg-black text-white' : 'bg-white text-black'}`}
                                        >
                                            Use URL
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setLogoMethod('upload')}
                                            className={`px-3 py-1 border-2 border-black ${logoMethod === 'upload' ? 'bg-black text-white' : 'bg-white text-black'}`}
                                        >
                                            Upload File
                                        </button>
                                    </div>

                                    {logoMethod === 'url' ? (
                                        <div className="flex gap-2">
                                            <input
                                                type="url"
                                                placeholder="https://domain.com/logo.png"
                                                className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light"
                                                required={logoMethod === 'url'}
                                                onChange={(e) => setPreviewUrl(e.target.value)}
                                            />
                                            <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-black bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                                                {previewUrl ? (
                                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                                                ) : (
                                                    <span className="material-symbols-outlined text-gray-400 text-sm">image</span>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <div className="relative w-full">
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    onChange={handleFileChange}
                                                    required={logoMethod === 'upload'}
                                                />
                                                <div className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black bg-background-light flex items-center justify-between">
                                                    <span className="text-gray-500 truncate text-xs md:text-sm">{fileInputRef.current?.files?.[0]?.name || "Select file..."}</span>
                                                    <span className="material-symbols-outlined text-sm md:text-base">upload_file</span>
                                                </div>
                                            </div>
                                            <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-black bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                                                {previewUrl ? (
                                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                                                ) : (
                                                    <span className="material-symbols-outlined text-gray-400 text-sm">image</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    <p className="text-[10px] text-gray-500 mt-1">
                                        {logoMethod === 'url' ? 'Direct link to a high-res PNG/SVG.' : 'Max 2MB. Square format recommended.'}
                                    </p>
                                </div>
                            </div>

                            {/* Section 2: Deal Info */}
                            <div className="space-y-3 md:space-y-4">
                                <h2 className="text-lg md:text-xl font-bold uppercase border-b-2 border-black pb-2 flex items-center gap-2">
                                    <span className="bg-black text-white w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs md:text-sm rounded-none">2</span>
                                    Deal Configuration
                                </h2>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Benefit Description *</label>
                                    <input type="text" placeholder="e.g. $5,000 in Credits for 12 months" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light" required />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase mb-1">Category *</label>
                                        <select className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light appearance-none" required>
                                            <option value="">Select Category...</option>
                                            <option value="cloud">Cloud Credits</option>
                                            <option value="saas">SaaS Discount</option>
                                            <option value="marketing">Marketing/Ads</option>
                                            <option value="hiring">Hiring/Payroll</option>
                                            <option value="legal">Legal/Finance</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase mb-1">Deal Value ($) *</label>
                                        <input type="number" placeholder="e.g. 5000" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light" required />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-2">Redemption Method *</label>
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer border-2 border-transparent hover:border-black p-2 -ml-2 rounded text-sm md:text-base">
                                            <input type="radio" name="redemption" value="link" className="accent-black w-3.5 h-3.5 md:w-4 md:h-4" defaultChecked />
                                            <span className="font-bold">Unique URL</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer border-2 border-transparent hover:border-black p-2 rounded text-sm md:text-base">
                                            <input type="radio" name="redemption" value="code" className="accent-black w-3.5 h-3.5 md:w-4 md:h-4" />
                                            <span className="font-bold">Coupon Code</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Redemption Link / Code *</label>
                                    <input type="text" placeholder="https://your-site.com/founders-prime OR Code: PRIME2025" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light" required />
                                </div>
                            </div>

                            {/* Section 3: Exclusivity */}
                            <div className="bg-accent-yellow/20 border-2 border-black p-3 md:p-4">
                                <label className="flex items-start gap-2 md:gap-3 cursor-pointer">
                                    <input type="checkbox" className="mt-1 w-4 h-4 md:w-5 md:h-5 accent-black border-2 border-black" required />
                                    <div>
                                        <span className="font-bold uppercase block text-xs md:text-sm">Exclusivity Confirmation *</span>
                                        <span className="text-[11px] md:text-xs text-gray-800 tracking-tight md:tracking-normal leading-snug block mt-0.5">
                                            I confirm this deal offers a <span className="font-bold underline">special benefit</span> to FoundersPrime users (e.g., extra credits, extended trial, or higher discount) compared to our public pricing. We do not list generic referral links.
                                        </span>
                                    </div>
                                </label>
                            </div>

                            {/* Section 4: Security Check */}
                            <div className="border-t-2 border-black pt-3 md:pt-4">
                                <label className="block text-xs font-bold uppercase mb-2">Security Verification *</label>
                                <div className="bg-gray-100 p-3 md:p-4 border-2 border-black flex flex-col md:flex-row items-center justify-between md:justify-start gap-3 md:gap-4">
                                    <span className="font-mono text-base md:text-lg font-bold">Please solve: {challenge.num1} + {challenge.num2} = ?</span>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            placeholder="?"
                                            className={`w-16 p-2 text-sm md:text-base border-2 border-black text-center font-bold outline-none ring-2 ${isHuman ? 'ring-green-500 border-green-500' : 'ring-transparent'}`}
                                            value={securityAnswer}
                                            onChange={(e) => checkSecurity(e.target.value)}
                                            maxLength={3}
                                        />
                                        {isHuman && (
                                            <div className="flex items-center text-green-600 font-bold gap-1 mt-0">
                                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                                <span className="text-xs md:text-sm">Verified</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 md:pt-4">
                                <button
                                    type="submit"
                                    disabled={!isHuman || isSubmitting}
                                    className={`w-full font-mono font-bold text-base md:text-lg uppercase py-3 md:py-4 border-[3px] border-[#101622] flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0px_0px_#888] md:shadow-[6px_6px_0px_0px_#888]
                                    ${isHuman && !isSubmitting
                                            ? 'bg-[#101622] text-white hover:bg-white hover:text-[#101622] cursor-pointer'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400 shadow-none'
                                        }`}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'} <span className="material-symbols-outlined text-[18px] md:text-base">send</span>
                                </button>
                                <p className="text-center text-[9px] md:text-[10px] text-gray-500 mt-3 md:mt-4 uppercase font-bold">
                                    {submissionStatus === 'error' && <span className="text-red-500 block mb-1">Error submitting deal. Please try again.</span>}
                                    Review time: ~48 Hours. You will be notified via email.
                                </p>
                            </div>

                        </form>
                    )}
                </div>
            </main>

            <footer className="bg-white border-t-2 border-black py-8 text-center">
                <div className="text-xs font-bold font-mono text-gray-400">© 2025 FoundersPrime. All rights reserved.</div>
            </footer>
        </div>
    )
}
