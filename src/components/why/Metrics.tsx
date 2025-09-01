'use client'

export function Metrics() {
  const metrics = [
    {
      number: "12,847",
      label: "Monthly searches",
      suffix: "+"
    },
    {
      number: "4.8",
      label: "Average rating",
      suffix: "★"
    },
    {
      number: "127",
      label: "Partner restaurants",
      suffix: "+"
    },
    {
      number: "UK-wide",
      label: "Discovery",
      suffix: ""
    }
  ]

  return (
    <section className="bg-gradient-to-r from-charcoal via-gray-800 to-charcoal text-white">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Trusted by restaurants across the UK
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            Join the growing community of successful halal restaurants
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center group">
              <div className="mb-3">
                <span className="text-4xl md:text-6xl font-extrabold text-white group-hover:text-primary transition-colors duration-300">
                  {metric.number}
                </span>
                <span className="text-2xl md:text-4xl font-bold text-primary ml-1">
                  {metric.suffix}
                </span>
              </div>
              <p className="text-base md:text-lg text-gray-300 font-medium">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* Brand Strip */}
        <div className="mt-16 pt-12 border-t border-gray-700">
          <p className="text-center text-gray-400 mb-8">
            As discovered by foodies in
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-gray-500">
            <span className="text-lg font-semibold hover:text-white transition-colors">London</span>
            <span className="text-lg font-semibold hover:text-white transition-colors">Birmingham</span>
            <span className="text-lg font-semibold hover:text-white transition-colors">Manchester</span>
            <span className="text-lg font-semibold hover:text-white transition-colors">Leeds</span>
            <span className="text-lg font-semibold hover:text-white transition-colors">Bradford</span>
            <span className="text-lg font-semibold hover:text-white transition-colors">Leicester</span>
          </div>
        </div>
      </div>
    </section>
  )
} 