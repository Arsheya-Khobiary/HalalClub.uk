'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, MapPin } from 'lucide-react'

export function Hero() {
  const handlePrimaryCTA = () => {
    // Analytics: fire whyus_hero_cta_clicked
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whyus_hero_cta_clicked', {
        event_category: 'conversion',
        event_label: 'hero_register_button'
      })
    }
    
    // Scroll to pricing banner
    const pricingSection = document.getElementById('pricing-banner')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Halal Food Club"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
              <span className="text-lg font-medium text-gray-600">The home of halal made easy</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-charcoal">
                Why Halal Food Club?
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                We bring <strong className="text-primary">verified halal</strong> restaurants across the UK into one beautiful, shoppable map — with reviews, menus, and best sellers that make people hungry.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <p className="text-lg text-gray-700">Show up where hungry people search</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <p className="text-lg text-gray-700">Look premium with gorgeous menus & galleries</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <p className="text-lg text-gray-700">Verified halal badge for instant trust</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handlePrimaryCTA}
                className="inline-flex items-center justify-center rounded-2xl bg-primary text-white px-8 py-4 text-lg md:text-xl font-bold shadow-lg hover:shadow-xl hover:bg-emerald-600 transition-all duration-200 hover:scale-105"
              >
                Register your restaurant — £69/year
                <ArrowRight className="h-6 w-6 ml-2" />
              </Button>
              
              <Link href="/">
                <Button 
                  variant="outline"
                  className="inline-flex items-center justify-center rounded-2xl border-2 border-gray-200 bg-white px-8 py-4 text-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Explore halal spots
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Food Collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-4 md:space-y-6">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg ring-1 ring-black/5 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <Image
                    src="/placeholder-restaurant.jpg"
                    alt="Delicious halal biryani"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square rounded-3xl overflow-hidden shadow-lg ring-1 ring-black/5 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <Image
                    src="/placeholder-restaurant.jpg"
                    alt="Grilled halal meat"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-4 md:space-y-6 mt-8">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-lg ring-1 ring-black/5 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <Image
                    src="/placeholder-restaurant.jpg"
                    alt="Traditional halal curry"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg ring-1 ring-black/5 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <Image
                    src="/placeholder-restaurant.jpg"
                    alt="Fresh halal ingredients"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-primary/20 transform rotate-12 hover:rotate-6 transition-transform duration-300">
              <div className="text-center">
                <div className="text-2xl mb-1">✅</div>
                <p className="text-xs font-bold text-primary">HALAL</p>
                <p className="text-xs font-bold text-primary">VERIFIED</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 