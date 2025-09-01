'use client'

import { Upload, BadgeCheck, MapPin } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Upload,
      title: "List your restaurant",
      description: "Add menu, best items, photos, socials.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      number: "02", 
      icon: BadgeCheck,
      title: "We verify halal",
      description: "Badge appears on your profile.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      number: "03",
      icon: MapPin,
      title: "Get discovered",
      description: "Appear on map, get reviews, and drive bookings.",
      color: "text-accent",
      bgColor: "bg-accent/10"
    }
  ]

  return (
    <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-charcoal mb-6">
          How it works
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
          Get your halal restaurant discovered in just 3 simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {steps.map((step, index) => {
          const IconComponent = step.icon
          return (
            <div key={index} className="relative group">
              {/* Connecting Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-12 h-0.5 bg-gray-200 z-0">
                  <div className="h-full bg-gradient-to-r from-gray-300 to-transparent"></div>
                </div>
              )}
              
              <div className="relative z-10 text-center space-y-6">
                {/* Step Number */}
                <div className="relative">
                  <div className={`w-20 h-20 mx-auto rounded-2xl ${step.bgColor} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <IconComponent className={`h-10 w-10 ${step.color}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-charcoal text-white flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-charcoal">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600">
                    {step.description}
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