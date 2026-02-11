export default function ContactInfo() {
  return (
    <div className="space-y-4">
      {/* Quick Info */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] p-5">
        <h3 className="font-mono text-sm font-bold text-black mb-4 uppercase tracking-wide">
          Quick Info
        </h3>
        <div className="space-y-4">
          <div>
            <p className="font-mono text-xs font-bold text-gray-500 mb-1.5 uppercase">Response Time</p>
            <p className="font-mono text-sm text-gray-700 font-medium">&lt; 24 hours</p>
          </div>

          <div>
            <p className="font-mono text-xs font-bold text-gray-500 mb-1.5 uppercase">Hours</p>
            <p className="font-mono text-sm text-gray-700 font-medium">Mon-Fri: 9AM-6PM PST</p>
          </div>
        </div>
      </div>

      {/* Social */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] p-5">
        <h3 className="font-mono text-sm font-bold text-black mb-4 uppercase tracking-wide">
          Follow Us
        </h3>
        <div className="space-y-2">
          {[
            { platform: 'Twitter', icon: 'alternate_email', url: '#' },
            { platform: 'LinkedIn', icon: 'work', url: '#' },
            { platform: 'GitHub', icon: 'code', url: '#' },
            { platform: 'Discord', icon: 'forum', url: '#' }
          ].map((social, index) => (
            <a
              key={index}
              href={social.url}
              className="flex items-center gap-3 p-3 border-2 border-black bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[3px_3px_0px_0px_#1a1a1a] transition-all group"
            >
              <div className="size-8 bg-accent-yellow border-2 border-black flex items-center justify-center">
                <span className="material-symbols-outlined text-black text-lg">{social.icon}</span>
              </div>
              <p className="font-mono text-sm font-bold text-black group-hover:text-primary transition-colors">{social.platform}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
