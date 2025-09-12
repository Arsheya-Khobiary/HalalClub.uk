'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export function BusinessRegistrationForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
    
    console.log('Form submitted:', data)
    alert('✅ Registration submitted successfully! (Demo Mode)')
    
    // Simple redirect
    window.location.href = '/register/success?session_id=demo_session_' + Date.now()
  }

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-charcoal mb-4">
            Register Your Restaurant
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Join the Halal Food Club community and connect with customers looking for authentic halal dining experiences
          </p>
        </div>

        {/* Simple Tip */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 text-center">
          <p className="text-yellow-800 font-medium">💡 All fields marked with * are required</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="w-full rounded-3xl overflow-hidden bg-white shadow-2xl">
            <CardHeader className="text-center pb-8">
              <div className="text-5xl mb-4">🏪</div>
              <CardTitle className="text-4xl font-display font-bold text-charcoal">
                Restaurant Information
              </CardTitle>
              <p className="text-xl text-gray-600 mt-2">
                Tell us about your restaurant
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label htmlFor="restaurantName" className="text-xl font-semibold text-charcoal flex items-center gap-2">
                    <span className="text-red-500">*</span>
                    Restaurant Name
                  </Label>
                  <Input
                    id="restaurantName"
                    name="restaurantName"
                    required
                    className="h-14 text-xl px-4 border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                    placeholder="Enter restaurant name"
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="ownerName" className="text-xl font-semibold text-charcoal flex items-center gap-2">
                    <span className="text-red-500">*</span>
                    Owner Name
                  </Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    required
                    className="h-14 text-xl px-4 border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                    placeholder="Enter owner name"
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="email" className="text-xl font-semibold text-charcoal flex items-center gap-2">
                    <span className="text-red-500">*</span>
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="h-14 text-xl px-4 border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                    placeholder="Enter email address"
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="phone" className="text-xl font-semibold text-charcoal flex items-center gap-2">
                    <span className="text-red-500">*</span>
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    required
                    className="h-14 text-xl px-4 border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="address" className="text-xl font-semibold text-charcoal flex items-center gap-2">
                    <span className="text-red-500">*</span>
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    required
                    className="h-14 text-xl px-4 border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                    placeholder="Enter full address"
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="postcode" className="text-xl font-semibold text-charcoal flex items-center gap-2">
                    <span className="text-red-500">*</span>
                    Postcode
                  </Label>
                  <Input
                    id="postcode"
                    name="postcode"
                    required
                    className="h-14 text-xl px-4 border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                    placeholder="Enter postcode"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <Label htmlFor="description" className="text-xl font-semibold text-charcoal flex items-center gap-2">
                  <span className="text-red-500">*</span>
                  Restaurant Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  className="min-h-32 text-xl px-4 py-4 border-2 border-gray-200 focus:border-emerald-500 rounded-xl resize-none"
                  placeholder="Describe your restaurant, cuisine, and what makes it special..."
                />
              </div>

              {/* Opening Hours */}
              <div className="space-y-4">
                <Label htmlFor="openingHours" className="text-xl font-semibold text-charcoal flex items-center gap-2">
                  <span className="text-red-500">*</span>
                  Opening Hours
                </Label>
                <Textarea
                  id="openingHours"
                  name="openingHours"
                  required
                  className="min-h-24 text-xl px-4 py-4 border-2 border-gray-200 focus:border-emerald-500 rounded-xl resize-none"
                  placeholder="e.g., Mon-Fri: 11:00-22:00, Sat-Sun: 12:00-23:00"
                />
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <Label htmlFor="priceRange" className="text-xl font-semibold text-charcoal flex items-center gap-2">
                  <span className="text-red-500">*</span>
                  Price Range
                </Label>
                <select
                  name="priceRange"
                  required
                  className="h-14 text-xl px-4 border-2 border-gray-200 focus:border-emerald-500 rounded-xl bg-white"
                >
                  <option value="">Select price range</option>
                  <option value="£">£ (Under £10)</option>
                  <option value="££">££ (£10-£20)</option>
                  <option value="£££">£££ (£20-£30)</option>
                  <option value="££££">££££ (Over £30)</option>
                </select>
              </div>

              {/* Hygiene Rating */}
              <div className="space-y-4">
                <Label htmlFor="hygieneRating" className="text-xl font-semibold text-charcoal flex items-center gap-2">
                  <span className="text-red-500">*</span>
                  Food Hygiene Rating
                </Label>
                <select
                  name="hygieneRating"
                  required
                  className="h-14 text-xl px-4 border-2 border-gray-200 focus:border-emerald-500 rounded-xl bg-white"
                >
                  <option value="">Select hygiene rating</option>
                  <option value="5">5 - Very Good</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Generally Satisfactory</option>
                  <option value="2">2 - Improvement Necessary</option>
                  <option value="1">1 - Major Improvement Necessary</option>
                  <option value="0">0 - Urgent Improvement Required</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-8">
                <Button
                  type="submit"
                  className="h-16 px-12 text-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Submit Registration
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}




