export default function AboutStats() {
  const stats = [
    {
      number: '50K+',
      label: 'Active Founders',
      description: 'Founders using our platform monthly',
      icon: 'group'
    },
    {
      number: 'Hundreds',
      label: 'Verified Deals',
      description: 'Curated and verified opportunities',
      icon: 'verified'
    },
    {
      number: '$2.8B',
      label: 'Value Unlocked',
      description: 'Total value of deals accessed by users',
      icon: 'trending_up'
    },
    {
      number: '12,847',
      label: 'Startups Tracked',
      description: 'Companies in our database',
      icon: 'business'
    },
    {
      number: '2,847',
      label: 'Ideas Validated',
      description: 'Startup ideas with market research',
      icon: 'lightbulb'
    },
    {
      number: '95%',
      label: 'User Satisfaction',
      description: 'Users who would recommend us',
      icon: 'thumb_up'
    }
  ]

  return (
    <div className="mb-10 md:mb-14">
      <div className="text-center mb-6 md:mb-4 md:mb-6">
        <h2 className="font-mono text-4xl font-bold text-black mb-6">
          Impact by the Numbers
        </h2>
        <p className="font-sans text-lg text-gray-600 max-w-3xl mx-auto">
          Our platform has helped thousands of founders save time, money, and accelerate their startup journey. Here's the impact we've made together.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8 text-center hover:translate-y-[-2px] transition-transform">
            <div className="size-16 bg-primary border-2 border-black rounded-sm flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-2xl text-black">{stat.icon}</span>
            </div>
            <div className="font-mono text-4xl font-bold text-black mb-2">
              {stat.number}
            </div>
            <h3 className="font-mono text-lg font-bold text-black mb-2">
              {stat.label}
            </h3>
            <p className="font-sans text-sm text-gray-600">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
      
      {/* Additional Context */}
      <div className="mt-12 bg-gray-50 border-2 border-gray-300 rounded-sm p-8 text-center">
        <h3 className="font-mono text-xl font-bold text-black mb-4">
          Growing Every Day
        </h3>
        <p className="font-sans text-gray-700 max-w-2xl mx-auto">
          We add new deals, startup profiles, and validated ideas to our platform every week. Our community grows steadily, creating a network effect that benefits everyone.
        </p>
      </div>
    </div>
  )
}