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
import { useMobile } from '@/components/ui/use-mobile'
import { ReviewForm } from '@/components/ReviewForm'
import { db, collection, getDocs, query, orderBy } from '@/lib/firebase'
import { QueryDocumentSnapshot } from 'firebase/firestore'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

interface RestaurantModalProps {
  restaurant: Restaurant
  open: boolean
  onClose: () => void
}

export function RestaurantModal({ restaurant, open, onClose }: RestaurantModalProps) {
  const isMobile = useMobile()
  const [activeTab, setActiveTab] = useState('menu')

  // Fetch reviews from Firebase
  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ['reviews', restaurant.id],
    queryFn: async () => {
      if (!db) return []
      
      try {
        const q = query(
          collection(db, 'restaurants', restaurant.id, 'reviews'),
          orderBy('createdAt', 'desc')
        )
        const snapshot = await getDocs(q)
        const reviews: any[] = []
        snapshot.forEach((doc: QueryDocumentSnapshot) => {
          reviews.push({ id: doc.id, ...doc.data() })
        })
        return reviews
      } catch (error) {
        console.error('Error fetching reviews:', error)
        return []
      }
    },
    enabled: open,
  })

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
            <Button 
              variant="ghost"
              className="h-11 rounded-xl px-4 hover:bg-gray-100 transition-all duration-200"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-4 rounded-none border-b bg-transparent p-0">
            <TabsTrigger value="menu" className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:text-primary">
              Menu
            </TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:text-primary">
              Gallery
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:text-primary">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="offers" className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:text-primary">
              Offers
            </TabsTrigger>
          </TabsList>

          <div className="p-5 md:p-6">
            {activeTab === 'menu' && (
              <div className="space-y-6">
                {/* Restaurant Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-semibold text-charcoal">Address</p>
                        <p className="text-gray-600">{restaurant.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-semibold text-charcoal">Phone</p>
                        <a href={`tel:${restaurant.phone}`} className="text-primary hover:underline">
                          {restaurant.phone}
                        </a>
                      </div>
                    </div>
                    {restaurant.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-semibold text-charcoal">Website</p>
                          <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Visit Website
                          </a>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-semibold text-charcoal">Opening Hours</p>
                        <p className="text-gray-600">{restaurant.openingHours || 'Contact for hours'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-semibold text-charcoal">Rating</p>
                        <p className="text-gray-600">{formatRating(restaurant.ratingAvg)}</p>
                      </div>
                    </div>
                                          <div>
                        <p className="font-semibold text-charcoal">Price Range</p>
                        <p className="text-gray-600">Contact for pricing</p>
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal">Best Items</p>
                        <p className="text-gray-600">{restaurant.bestItems.length} items available</p>
                      </div>
                  </div>
                </div>

                {/* Certificates */}
                {(restaurant as any).certificates && (
                  <div>
                    <h4 className="text-lg font-bold text-charcoal mb-4">📄 Certificates</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(restaurant as any).certificates.halal && (
                        <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">✅</span>
                            <div>
                              <h5 className="font-semibold text-primary">Halal Certificate</h5>
                              <p className="text-sm text-gray-600">{(restaurant as any).certificates.halal}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {(restaurant as any).certificates.hygiene && (
                        <div className="p-4 rounded-2xl border border-accent/20 bg-accent/5">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🏥</span>
                            <div>
                              <h5 className="font-semibold text-accent">Hygiene Certificate</h5>
                              <p className="text-sm text-gray-600">{(restaurant as any).certificates.hygiene}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Hygiene Rating */}
                {(restaurant as any).hygieneRating && (
                  <div>
                    <h4 className="text-lg font-bold text-charcoal mb-4">🏥 Food Hygiene Rating</h4>
                    <div className="p-4 rounded-2xl bg-white border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">
                          {'⭐'.repeat(parseInt((restaurant as any).hygieneRating || '0'))}
                        </div>
                        <div>
                          <p className="font-bold text-xl text-charcoal">{(restaurant as any).hygieneRating}/5</p>
                          <p className="text-sm text-gray-600">Food Standards Agency Rating</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-charcoal">Photo Gallery</h3>
                {restaurant.gallery && restaurant.gallery.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {restaurant.gallery.map((image, index) => (
                      <div key={index} className="aspect-square rounded-xl overflow-hidden">
                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No gallery images available
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-charcoal">Reviews</h3>
                  <ReviewForm restaurantId={restaurant.id} onReviewSubmitted={refetchReviews} />
                </div>
                
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review: any) => (
                      <div key={review.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < review.rating ? "fill-current" : "fill-none"
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{review.rating}/5</span>
                        </div>
                        <p className="text-gray-800 mb-2">{review.comment}</p>
                        <p className="text-sm text-gray-500">
                          {review.userName} • {new Date(review.createdAt?.toDate() || review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No reviews yet. Be the first to review!
                  </div>
                )}
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
        <div className="w-[85vw] h-[85vh] max-w-none rounded-3xl overflow-hidden bg-white shadow-2xl relative">
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

