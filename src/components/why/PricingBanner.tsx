'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight } from 'lucide-react'

export function PricingBanner() {
  return (
    <section id="pricing-banner" className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="rounded-3xl bg-gradient-to-br from-primary/5 via-white to-accent/5 border-2 border-primary/20 p-8 md:p-12 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Pricing Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="Halal Food Club"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-4 py-2 border border-emerald-100">
                <span className="text-3xl md:text-4xl font-extrabold">£69</span>
                <span className="text-lg">/year</span>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-charcoal mb-4">
                Join today for <span className="text-primary">£69/year</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                Everything you need to get discovered by hungry halal food lovers
              </p>
            </div>

            <div className="space-y-4">
              {[
                'Verified halal badge',
                'Featured on map & search',
                'Best sellers + menu + socials',
                'Photo & video gallery',
                'Reviews & ratings'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-base md:text-lg text-gray-700 font-medium">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <Link href="/register">
                <Button className="inline-flex items-center justify-center rounded-2xl bg-primary text-white px-8 py-4 text-lg md:text-xl font-bold shadow-lg hover:shadow-xl hover:bg-emerald-600 transition-all duration-200 hover:scale-105 w-full sm:w-auto">
                  Register your restaurant — £69/year
                  <ArrowRight className="h-6 w-6 ml-2" />
                </Button>
              </Link>
              
              <p className="text-sm text-gray-500">
                Cancel anytime. No hidden commissions.
              </p>
            </div>
          </div>

          {/* Right: Visual Benefits */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl bg-white p-4 shadow-lg border border-primary/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-semibold text-primary">HALAL VERIFIED</span>
                  </div>
                  <p className="text-sm text-gray-600">Instant trust badge</p>
                </div>
                
                <div className="rounded-2xl bg-white p-4 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🗺️</span>
                    <span className="font-semibold text-charcoal">Map Placement</span>
                  </div>
                  <p className="text-sm text-gray-600">Prime visibility</p>
                </div>
              </div>
              
              <div className="space-y-4 mt-8">
                <div className="rounded-2xl bg-white p-4 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">⭐</span>
                    <span className="font-semibold text-charcoal">4.8 Rating</span>
                  </div>
                  <p className="text-sm text-gray-600">Customer reviews</p>
                </div>
                
                <div className="rounded-2xl bg-white p-4 shadow-lg border border-accent/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">📸</span>
                    <span className="font-semibold text-charcoal">Gallery</span>
                  </div>
                  <p className="text-sm text-gray-600">Mouth-watering photos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 