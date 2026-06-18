import Mandala from '@/components/ui/Mandala'

export default function ContactInfo() {
  const infoItems = [
    { icon: 'bolt', label: 'Response Time', value: '< 24 hours', accent: 'bg-accent-yellow/20 text-yellow-700' },
    { icon: 'schedule', label: 'Hours', value: 'Mon–Fri · 9AM–6PM PST', accent: 'bg-accent-yellow/20 text-yellow-700' },
    { icon: 'public', label: 'Coverage', value: 'Global · 43+ countries', accent: 'bg-green-100 text-green-700' },
  ]

  const socials = [
    {
      platform: 'X',
      handle: '@FoundersPrime',
      url: 'https://x.com/foundersprime',
      bg: 'bg-black',
      svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
    },
    {
      platform: 'LinkedIn',
      handle: '/foundersprime',
      url: 'https://linkedin.com/company/foundersprime',
      bg: 'bg-[#0A66C2]',
      svg: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
    },
    {
      platform: 'Instagram',
      handle: '@FoundersPrime',
      url: 'https://instagram.com/foundersprime',
      bg: 'bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5]',
      svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />,
    },
    {
      platform: 'Threads',
      handle: '@FoundersPrime',
      url: 'https://www.threads.net/@foundersprime',
      bg: 'bg-black',
      svg: <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 013.02.142c-.126-.742-.375-1.332-.74-1.756-.5-.582-1.274-.88-2.3-.886h-.027c-.824 0-1.942.227-2.656 1.298l-1.687-1.135c.954-1.41 2.503-2.187 4.354-2.187h.04c3.087.018 4.924 1.911 5.108 5.214.105.043.21.088.31.135 1.4.66 2.426 1.658 2.967 2.886.752 1.708.823 4.494-1.444 6.722-1.732 1.703-3.835 2.474-6.802 2.493zm1.327-9.469c-.235 0-.474.007-.717.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.272 10.272 0 00-2.237-.221z" />,
    }
  ]

  return (
    <div className="space-y-3">
      {/* Response promise — dark card */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black border-2 border-black shadow-[5px_5px_0px_#ffd700] p-4 overflow-hidden fp-fade-up">
        <Mandala
          variant="orbital"
          colorClass="text-accent-yellow"
          opacity={0.12}
          speed={70}
          strokeWidth={0.7}
          className="absolute -top-10 -right-10 w-40 h-40"
        />
        <span
          className="material-symbols-outlined pointer-events-none absolute -bottom-4 -right-2 !text-[120px] text-white/[0.06] select-none"
          aria-hidden="true"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          headset_mic
        </span>
        <div className="relative">
          <div className="inline-flex items-center gap-1.5 border border-accent-yellow/40 bg-accent-yellow/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-accent-yellow mb-3">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
            Online now
          </div>
          <h3 className="font-mono text-lg font-black text-white uppercase leading-tight mb-1.5">
            We Reply to Everyone
          </h3>
          <p className="font-sans text-xs text-gray-400 leading-relaxed">
            No bots, no canned tickets. Every message lands with a real person.
          </p>
        </div>
      </div>

      {/* Quick Info */}
      <div className="bg-white border-2 border-black shadow-[5px_5px_0px_#111] p-4 fp-fade-up" style={{ animationDelay: '0.05s' }}>
        <h3 className="font-mono text-sm font-black text-black mb-3 uppercase tracking-wide flex items-center gap-2">
          <span className="material-symbols-outlined !text-[18px]">info</span>
          Quick Info
        </h3>
        <div className="space-y-3">
          {infoItems.map(({ icon, label, value, accent }) => (
            <div key={label} className="flex items-center gap-3 border-b border-dashed border-black/10 pb-3 last:border-0 last:pb-0">
              <div className={`size-9 ${accent} border border-black/20 flex items-center justify-center flex-shrink-0`}>
                <span className="material-symbols-outlined !text-[18px]">{icon}</span>
              </div>
              <div>
                <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wide">{label}</p>
                <p className="font-mono text-sm text-gray-800 font-bold">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social */}
      <div className="bg-white border-2 border-black shadow-[5px_5px_0px_#111] p-4 fp-fade-up" style={{ animationDelay: '0.1s' }}>
        <h3 className="font-mono text-sm font-black text-black mb-3 uppercase tracking-wide flex items-center gap-2">
          <span className="material-symbols-outlined !text-[18px]">share</span>
          Follow Us
        </h3>
        <div className="space-y-2">
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 border-2 border-black bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#111] shadow-[2px_2px_0px_#111] transition-all group"
            >
              <div className={`size-9 ${social.bg} border-2 border-black flex items-center justify-center flex-shrink-0`}>
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor" aria-hidden="true">
                  {social.svg}
                </svg>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-sm font-bold text-black leading-none">{social.platform}</p>
                <p className="font-mono text-[10px] text-gray-500 truncate">{social.handle}</p>
              </div>
              <span className="material-symbols-outlined !text-[16px] text-gray-300 ml-auto group-hover:text-black transition-colors">arrow_outward</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
