export default function ContactHero() {
  return (
    <div className="mb-4 md:mb-6">
      {/* Prominent Email Contact Card */}
      <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#1a1a1a] p-8 hover:shadow-[8px_8px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
        <div className="flex items-start gap-6">
          {/* Icon */}
          <div className="size-16 bg-accent-yellow border-3 border-black flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-3xl text-black">email</span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-mono text-sm font-bold text-black mb-2 uppercase tracking-wide">
              Email Us
            </h3>
            <a
              href="mailto:support@foundersprime.com"
              className="font-mono text-2xl md:text-3xl font-bold text-primary hover:text-black transition-colors break-all block mb-2"
            >
              support@foundersprime.com
            </a>
            <p className="font-mono text-sm text-gray-600">
              We typically respond within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}