'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Star, Phone, Globe, MapPin, Clock, Heart, Share2, X } from 'lucide-react'
import { Restaurant } from '@/types'
import { formatPrice, formatRating, cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { useMobile } from '@/components/ui/use-mobile'
import Image from 'next/image'

interface RestaurantModalProps {
  restaurant: Restaurant
  open: boolean
  onClose: () => void
}

export function RestaurantModal({ restaurant, open, onClose }: RestaurantModalProps) {
  const isMobile = useMobile()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('menu')

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: restaurant.name,
        text: `Check out ${restaurant.name} on Halal Food Club`,
        url: window.location.href,
      })
    }
  }

  const ModalContent = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-black/5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-charcoal">
              {restaurant.name}
            </h1>
            <p className="text-base md:text-lg text-gray-600 mt-1">{restaurant.address}</p>
            <div className="flex items-center gap-2 mt-3">
              {restaurant.halalCertified && (
                <span className="halal-badge">
                  ✓ Halal Certified
                </span>
              )}
              {restaurant.cuisines.map((cuisine) => (
                <span key={cuisine} className="rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-sm md:text-base font-medium">
                  {cuisine}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              onClick={handleShare}
              className="h-11 rounded-xl px-4 hover:bg-gray-100 transition-all duration-200"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            {user && (
              <Button 
                variant="ghost"
                className="h-11 rounded-xl px-4 hover:bg-gray-100 transition-all duration-200"
              >
                <Heart className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Top 3-Panel Grid (Desktop) / Stacked (Mobile) */}
      <div className={cn(
        "p-5 md:p-6 border-b border-black/5",
        isMobile ? "space-y-6" : "grid grid-cols-3 gap-4 md:gap-6"
      )}>
        {/* Best Sellers */}
        <div className="rounded-2xl bg-white border border-black/5 shadow-soft p-4">
          <h3 className="text-lg md:text-xl font-bold text-charcoal mb-4">🔥 Best Sellers</h3>
          <Carousel className="w-full">
            <CarouselContent>
              {restaurant.bestItems.map((item) => (
                <CarouselItem key={item.id}>
                  <div className="space-y-3">
                    <div className="aspect-[16/10] rounded-xl overflow-hidden ring-1 ring-black/5">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-base md:text-lg text-charcoal">{item.name}</h4>
                        <p className="text-sm md:text-base text-gray-600">{item.description}</p>
                      </div>
                      <p className="font-bold text-lg md:text-xl text-primary">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Reviews */}
        <div className="rounded-2xl bg-white border border-black/5 shadow-soft p-4">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg md:text-xl font-bold text-charcoal">⭐ Reviews</h3>
            <div className="flex items-center gap-1 text-amber-500 text-xl md:text-2xl">
              <Star className="h-5 w-5 md:h-6 md:w-6 fill-current" />
              <span className="text-base md:text-lg font-bold text-charcoal">
                {formatRating(restaurant.ratingAvg)}
              </span>
              <span className="text-sm md:text-base text-gray-500">
                ({restaurant.ratingCount})
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            {/* Mock reviews - in real app, fetch from subcollection */}
            <div className="rounded-xl bg-gray-50 p-3 md:p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-4 w-4",
                        star <= 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm md:text-base font-semibold text-charcoal">Sarah M.</span>
              </div>
              <p className="text-sm md:text-base text-gray-700">
                Amazing food and great service! The lamb biryani was exceptional.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Info & Actions */}
        <div className="rounded-2xl bg-white border border-black/5 shadow-soft p-4">
          <h3 className="text-lg md:text-xl font-bold text-charcoal mb-4">📍 Quick Info</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="text-sm md:text-base text-gray-700">Open until 10:00 PM</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <span className="text-sm md:text-base text-gray-700">{restaurant.phone}</span>
            </div>
            {restaurant.website && (
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-gray-500" />
                <a 
                  href={restaurant.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm md:text-base text-primary hover:underline font-medium"
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <Button className="h-11 rounded-xl w-full bg-primary text-white hover:bg-emerald-600 font-semibold">
              <MapPin className="h-5 w-5 mr-2" />
              Get Directions
            </Button>
            <Button className="h-11 rounded-xl w-full bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 font-semibold">
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Tabs */}
      <div className="flex-1 px-5 md:px-6 pb-5 md:pb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="rounded-2xl bg-gray-100 p-1 inline-flex gap-1 mb-4">
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-4 py-2 text-sm md:text-base rounded-xl transition-all duration-200 ${
                activeTab === 'menu' ? 'bg-white shadow text-charcoal font-semibold' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Menu
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2 text-sm md:text-base rounded-xl transition-all duration-200 ${
                activeTab === 'gallery' ? 'bg-white shadow text-charcoal font-semibold' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => setActiveTab('offers')}
              className={`px-4 py-2 text-sm md:text-base rounded-xl transition-all duration-200 ${
                activeTab === 'offers' ? 'bg-white shadow text-charcoal font-semibold' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Offers
            </button>
          </div>
          
          <div className="rounded-2xl border border-black/5 bg-white shadow-soft p-4 md:p-6 max-h-[28vh] overflow-y-auto">
            {activeTab === 'menu' && (
              <div className="space-y-6">
                {restaurant.menu.map((section) => (
                  <div key={section.section}>
                    <h3 className="text-lg md:text-xl font-bold text-charcoal mb-4">{section.section}</h3>
                    <div className="space-y-3">
                      {section.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0">
                          <div>
                            <h4 className="font-semibold text-base md:text-lg text-charcoal">{item.name}</h4>
                            {item.description && (
                              <p className="text-sm md:text-base text-gray-600 mt-1">{item.description}</p>
                            )}
                          </div>
                          <span className="font-bold text-lg md:text-xl text-primary ml-4">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          
            {activeTab === 'gallery' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {restaurant.gallery.map((image, index) => (
                  <div key={index} className="aspect-square relative rounded-2xl overflow-hidden ring-1 ring-black/5">
                    <Image
                      src={image}
                      alt={`${restaurant.name} gallery ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'offers' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl">🎉</span>
                </div>
                <h4 className="text-lg md:text-xl font-bold text-charcoal mb-2">No Current Offers</h4>
                <p className="text-base md:text-lg text-gray-600">Check back soon for special deals!</p>
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-3xl">
          <div className="sticky top-0 bg-white border-b border-black/5 p-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-charcoal">{restaurant.name}</h2>
            <Button
              variant="ghost"
              onClick={onClose}
              className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="overflow-y-auto">
            <ModalContent />
          </div>
          {/* Mobile Sticky Bottom CTA */}
          <div className="fixed bottom-4 inset-x-4 rounded-2xl bg-primary text-white h-12 md:h-14 flex items-center justify-center font-semibold shadow-lg">
            Book Now
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
        <div className="w-[70vw] h-[70vh] max-w-none rounded-3xl overflow-hidden bg-white shadow-2xl relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-white shadow-md p-2 hover:bg-gray-50 transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
          <ModalContent />
        </div>
      </div>
    </Dialog>
  )
}