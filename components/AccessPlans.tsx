import { GlowingEffect } from '@/components/ui/GlowingEffect'

export default function AccessPlans() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/mo",
      description: "For curious founders.",
      features: [
        { text: "Access to 10 Deals", included: true },
        { text: "Weekly Newsletter", included: true },
        { text: "Grants Database", included: false },
        { text: "Startup Ideas", included: false }
      ],
      buttonText: "Get Started",
      buttonStyle: "w-full py-3 font-bold border-2 border-black bg-transparent hover:bg-black hover:text-white transition-colors font-mono uppercase",
      borderColor: "border-b-8 border-gray-300"
    },
    {
      name: "Pro",
      price: "$49",
      period: "/mo",
      description: "For serious builders.",
      features: [
        { text: "Unlimited Deals Access", included: true, bold: true },
        { text: "Full Grants Database", included: true },
        { text: "Verified Startup Ideas", included: true },
        { text: "Priority Support", included: true }
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "w-full py-3 font-bold bg-primary text-white border-2 border-black hover:bg-blue-700 transition-all font-mono uppercase shadow-none",
      borderColor: "border-b-8 border-primary",
      recommended: true,
      priceColor: "text-primary"
    },
    {
      name: "Lifetime",
      price: "$399",
      period: "/once",
      description: "Pay once, save forever.",
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Lifetime Updates", included: true },
        { text: "Private Community", included: true },
        { text: "No Monthly Fees", included: true }
      ],
      buttonText: "Buy Lifetime",
      buttonStyle: "w-full py-3 font-bold border-2 border-black bg-accent-yellow hover:bg-yellow-400 transition-colors font-mono uppercase",
      borderColor: "border-b-8 border-accent-yellow"
    }
  ]

  return (
    <section className="py-4 md:py-10 bg-white border-b-2 border-black">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-4 md:mb-6 md:mb-6 md:mb-4 md:mb-6">
          <h2 className="text-xl md:text-4xl font-bold text-black mb-2 md:mb-4 font-mono">ACCESS_PLANS</h2>
          <p className="text-gray-600 font-mono text-sm uppercase">Positive ROI in &lt;48 Hours</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-start">
          {plans.map((plan, index) => (
            <div key={index} className="relative">
              <GlowingEffect
                spread={40}
                glow={false}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className={`relative bg-white neo-border p-0 h-full ${plan.recommended ? 'relative transform md:-translate-y-4 neo-shadow' : ''} ${plan.borderColor}`}>
              {plan.recommended && (
                <div className="bg-black text-white text-center py-3 font-bold text-xs font-mono uppercase tracking-widest border-b-2 border-black">Recommended</div>
              )}
              <div className="p-3 md:p-8">
                <h3 className="text-xl font-bold mb-2 font-mono uppercase">{plan.name}</h3>
                <div className={`text-2xl md:text-4xl font-bold mb-3 md:mb-6 font-mono ${plan.priceColor || ''}`}>
                  {plan.price}<span className="text-base font-normal text-gray-500 text-black">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4 md:mb-6 pb-8 border-b-2 border-black">{plan.description}</p>
                <ul className="space-y-4 mb-4 md:mb-6 text-sm font-mono">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex gap-3 items-center ${!feature.included ? 'text-gray-400' : ''}`}>
                      <span className={`material-symbols-outlined text-base ${feature.included ? (plan.recommended ? 'text-primary' : 'text-black') : 'text-base'}`}>
                        {feature.included ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                      <span className={'bold' in feature && feature.bold ? 'font-bold' : ''}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <button className={plan.buttonStyle}>{plan.buttonText}</button>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}