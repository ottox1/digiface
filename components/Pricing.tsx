const tiers = [
  {
    name: 'Refresh',
    price: '$500',
    description: 'Already have a site? We\'ll give it new life.',
    features: [
      'Bug fixes & updates',
      'Visual modernization',
      'Performance improvements',
      'Mobile responsiveness',
    ],
    cta: 'Get a quote',
    color: 'coral',
    accent: 'bg-coral',
  },
  {
    name: 'Starter',
    price: '$1,000',
    description: 'Starting fresh? We\'ll build it with you.',
    features: [
      'Up to 5 pages',
      'Fully responsive design',
      'Ready in 3 days',
      'SEO fundamentals',
      'Contact form setup',
    ],
    cta: 'Let\'s build together',
    featured: true,
    color: 'teal',
    accent: 'bg-teal',
  },
  {
    name: 'Growth',
    price: '$2,000',
    description: 'Need more? We\'ll scale with you.',
    features: [
      'Up to 10 pages',
      'Custom animations',
      'Advanced integrations',
      'Analytics setup',
      'Priority support',
      'Ongoing maintenance available',
    ],
    cta: 'Talk to us',
    color: 'golden',
    accent: 'bg-golden',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-stone/30 relative overflow-hidden">
      {/* Tetris decorative blocks */}
      <div className="absolute top-20 left-12 w-14 h-20 bg-coral/10 rounded-lg" />
      <div className="absolute top-40 right-16 w-20 h-12 bg-teal/10 rounded-lg" />
      <div className="absolute bottom-32 left-24 w-10 h-16 bg-golden/15 rounded-lg" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-6 h-2 bg-coral rounded-lg" />
            <div className="w-6 h-2 bg-golden rounded-lg" />
            <div className="w-6 h-2 bg-teal rounded-lg" />
          </div>
          <p className="font-serif italic text-slate/60 mb-3">What it costs</p>
          <h2 className="text-3xl md:text-4xl font-medium text-slate mb-4">
            Honest pricing, no surprises
          </h2>
          <p className="text-slate/60 max-w-xl mx-auto">
            We keep things simple. Pick what fits, and we&apos;ll handle the rest.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all ${
                tier.featured
                  ? 'bg-slate text-white shadow-xl scale-105 md:scale-110'
                  : 'bg-white hover:shadow-lg'
              }`}
            >
              {/* Colored top accent */}
              <div className={`absolute top-0 left-6 right-6 h-1 ${tier.accent} rounded-b-full`} />

              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-coral text-white text-xs font-medium px-4 py-1.5 rounded-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6 pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-6 ${tier.accent} rounded-sm ${tier.featured ? 'opacity-80' : 'opacity-60'}`} />
                  <h3
                    className={`text-xl font-medium ${
                      tier.featured ? 'text-white' : 'text-slate'
                    }`}
                  >
                    {tier.name}
                  </h3>
                </div>
                <p
                  className={`text-sm ${
                    tier.featured ? 'text-white/70' : 'text-slate/60'
                  }`}
                >
                  {tier.description}
                </p>
              </div>

              <div className="mb-6">
                <span
                  className={`text-4xl font-medium ${
                    tier.featured ? 'text-white' : 'text-slate'
                  }`}
                >
                  {tier.price}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className={`flex items-start gap-3 text-sm ${
                      tier.featured ? 'text-white/80' : 'text-slate/70'
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 flex-shrink-0 ${
                        tier.featured ? 'text-coral' : `text-${tier.color}`
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: tier.featured ? '#E07A5F' : index === 0 ? '#E07A5F' : index === 2 ? '#E9C46A' : '#2A6F7C' }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#inquiry"
                className={`block w-full text-center py-3 rounded-lg font-medium transition-all ${
                  tier.featured
                    ? 'bg-coral text-white hover:bg-coral/90 hover:shadow-lg'
                    : 'bg-stone text-slate hover:bg-slate hover:text-white'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Add-on callout */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white rounded-lg px-6 py-3 shadow-sm">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-coral rounded-sm" />
              <div className="w-2 h-2 bg-golden rounded-sm" />
              <div className="w-2 h-2 bg-teal rounded-sm" />
            </div>
            <p className="text-slate/60 text-sm">
              Need help keeping things running?{' '}
              <a href="#faq" className="text-coral hover:text-coral/80 transition-colors font-medium">
                Ask about our monthly maintenance plans
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
