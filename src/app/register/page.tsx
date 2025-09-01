'use client'

import { Header } from '@/components/Header'
import { BusinessRegistrationForm } from '@/components/forms/BusinessRegistrationForm'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Star, MapPin, Users } from 'lucide-react'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-amber-50 border border-black/5 p-6 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-charcoal mb-4">
                Get Featured on Halal Food Club
              </h1>
              <p className="text-base md:text-xl text-gray-600 mb-6">
                Join the UK's premier halal restaurant directory and reach thousands of hungry customers
              </p>
              
              <div className="inline-flex items-center gap-2 mt-3 rounded-full bg-white px-4 py-2 text-emerald-700 border border-emerald-100 shadow-soft">
                <span className="text-2xl md:text-3xl font-display font-bold">£69</span>
                <span className="text-base md:text-lg">/year</span>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-white shadow-soft flex items-center justify-center">
                <span className="text-6xl md:text-8xl">🍽️</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-8">
              Everything You Need to Succeed
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
              <div className="card-shell text-center p-6 md:p-8">
                <MapPin className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 text-primary" />
                <h3 className="text-lg md:text-xl font-bold text-charcoal mb-3">Prime Map Placement</h3>
                <p className="text-base md:text-lg text-gray-600">
                  Featured prominently on our interactive map with custom markers
                </p>
              </div>
              
              <div className="card-shell text-center p-6 md:p-8">
                <Users className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 text-primary" />
                <h3 className="text-lg md:text-xl font-bold text-charcoal mb-3">Reach More Customers</h3>
                <p className="text-base md:text-lg text-gray-600">
                  Connect with halal food enthusiasts across the UK
                </p>
              </div>
              
              <div className="card-shell text-center p-6 md:p-8">
                <Star className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 text-primary" />
                <h3 className="text-lg md:text-xl font-bold text-charcoal mb-3">Build Your Reputation</h3>
                <p className="text-base md:text-lg text-gray-600">
                  Showcase reviews, menu, and signature dishes
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge className="cuisine-chip cuisine-chip-active">
                <Check className="h-4 w-4 mr-2" />
                Menu Display
              </Badge>
              <Badge className="cuisine-chip cuisine-chip-active">
                <Check className="h-4 w-4 mr-2" />
                Photo Gallery
              </Badge>
              <Badge className="cuisine-chip cuisine-chip-active">
                <Check className="h-4 w-4 mr-2" />
                Customer Reviews
              </Badge>
              <Badge className="cuisine-chip cuisine-chip-active">
                <Check className="h-4 w-4 mr-2" />
                Contact Information
              </Badge>
              <Badge className="cuisine-chip cuisine-chip-active">
                <Check className="h-4 w-4 mr-2" />
                Social Media Links
              </Badge>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="section-padding">
          <div className="max-w-3xl mx-auto">
            <div className="card-shell p-6 md:p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-charcoal mb-3">
                  Register Your Restaurant
                </h2>
                <p className="text-base md:text-lg text-gray-600">
                  Complete the form below to get started. After payment, our team will review and approve your listing.
                </p>
              </div>
              
              <BusinessRegistrationForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 