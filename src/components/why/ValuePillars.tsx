'use client'

import { Map, Star, BadgeCheck, Rocket } from 'lucide-react'

export function ValuePillars() {
  const pillars = [
    {
      icon: Map,
      title: "Be found, beautifully.",
      description: "Appear on a map that feels like Google, but made for halal lovers. Pin, preview, and one-tap directions.",
      gradient: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: BadgeCheck,
      title: "Win trust, win bookings.",
      description: "Halal verification badge and real reviews reduce doubt and boost bookings.",
      gradient: "from-primary/10 to-primary/20",
      iconColor: "text-primary"
    },
    {
      icon: Star,
      title: "Show your best sellers.",
      description: "Lead with the dishes people crave — with prices, photos, and drool-worthy galleries.",
      gradient: "from-amber-50 to-amber-100",
      iconColor: "text-amber-600"
    },
    {
      icon: Rocket,
      title: "Simple, fair pricing.",
      description: "One flat fee: £69/year. No hidden commissions.",
      gradient: "from-purple-50 to-purple-100",
      iconColor: "text-purple-600"
    }
  ]

  return (
    <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-charcoal mb-6">
          Everything you need to succeed
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
          Join hundreds of halal restaurants already growing their customer base
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pillars.map((pillar, index) => {
          const IconComponent = pillar.icon
          return (
            <div
              key={index}
              className={`group rounded-3xl border border-black/5 bg-gradient-to-br ${pillar.gradient} p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer`}
            >
              <div className="space-y-6">
                <div className={`w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`h-8 w-8 ${pillar.iconColor}`} />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-charcoal leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
} 