export default function AboutValues() {
  const values = [
    {
      icon: '🎯',
      title: 'Founder-First',
      description: 'Every decision we make is filtered through one question: "Does this help founders succeed?" We\'re not just building a platform; we\'re building a movement to democratize entrepreneurship.'
    },
    {
      icon: '🔍',
      title: 'Radical Transparency',
      description: 'No hidden fees, no gatekeeping, no BS. We believe founders deserve honest, transparent access to the resources they need. What you see is what you get.'
    },
    {
      icon: '⚡',
      title: 'Speed & Execution',
      description: 'In the startup world, speed kills. We move fast, ship often, and iterate based on real founder feedback. Your time is precious, and we respect that.'
    },
    {
      icon: '🤝',
      title: 'Community Over Competition',
      description: 'The best founders lift each other up. We foster collaboration, knowledge sharing, and genuine connections within our community.'
    },
    {
      icon: '📊',
      title: 'Data-Driven Decisions',
      description: 'Every feature, every deal, every recommendation is backed by data. We use analytics and founder feedback to continuously improve our platform.'
    },
    {
      icon: '🚀',
      title: 'Relentless Innovation',
      description: 'The startup ecosystem evolves rapidly, and so do we. We\'re constantly exploring new ways to help founders access resources and build better companies.'
    }
  ]

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="font-mono text-4xl font-bold text-black mb-6">
          Our Values
        </h2>
        <p className="font-sans text-lg text-gray-600 max-w-3xl mx-auto">
          These core values guide everything we do. They're not just words on a wall – they're the principles that shape our product, our culture, and our relationships with founders.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <div key={index} className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6 hover:translate-y-[-2px] transition-transform">
            <div className="text-center mb-4">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="font-mono text-xl font-bold text-black mb-3">
                {value.title}
              </h3>
            </div>
            
            <p className="font-sans text-sm text-gray-700 leading-relaxed">
              {value.description}
            </p>
          </div>
        ))}
      </div>
      
      {/* Values in Action */}
      <div className="mt-12 bg-gray-50 border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
        <h3 className="font-mono text-2xl font-bold text-black mb-6 text-center">
          Values in Action
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="font-mono text-3xl font-bold text-primary mb-2">24h</div>
            <p className="font-sans text-sm text-gray-700">Average response time to founder feedback</p>
          </div>
          <div className="text-center">
            <div className="font-mono text-3xl font-bold text-primary mb-2">100%</div>
            <p className="font-sans text-sm text-gray-700">Transparent pricing with no hidden fees</p>
          </div>
          <div className="text-center">
            <div className="font-mono text-3xl font-bold text-primary mb-2">50+</div>
            <p className="font-sans text-sm text-gray-700">Community events hosted this year</p>
          </div>
        </div>
      </div>
    </div>
  )
}