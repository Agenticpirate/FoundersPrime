export default function ContactHero() {
  return (
    <div className="mb-4 md:mb-6">
      {/* Page heading */}
      <div className="mb-3 md:mb-4">
        <div className="inline-block border-2 border-black bg-accent-yellow px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-2">
          CONTACT
        </div>
        <h1 className="font-mono text-2xl md:text-4xl font-bold tracking-tight text-black mb-1 leading-tight">Get In Touch</h1>
        <p className="font-sans text-xs md:text-sm text-gray-500">Questions? We respond within 24 hours.</p>
      </div>

      {/* Prominent Email Contact Card */}
      <div className="bg-white border-2 md:border-4 border-black shadow-[3px_3px_0px_0px_#1a1a1a] md:shadow-[6px_6px_0px_0px_#1a1a1a] p-3 md:p-8">
        <div className="flex items-start gap-3 md:gap-6">
          {/* Icon */}
          <div className="size-10 md:size-16 bg-accent-yellow border-2 md:border-3 border-black flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-xl md:text-3xl text-black">email</span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-mono text-xs md:text-sm font-bold text-black mb-1 uppercase tracking-wide">
              Email Us
            </h3>
            <a
              href="mailto:support@foundersprime.com"
              className="font-mono text-base md:text-2xl lg:text-3xl font-bold text-primary hover:text-black transition-colors break-all block mb-1"
            >
              support@foundersprime.com
            </a>
            <p className="font-mono text-xs md:text-sm text-gray-600">
              We typically respond within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}