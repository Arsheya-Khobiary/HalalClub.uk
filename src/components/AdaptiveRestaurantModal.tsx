import { Dialog, DialogContent } from "./ui/dialog"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Star, MapPin, Clock, Phone, Globe, Navigation, Instagram, X } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { useState } from "react"

interface Restaurant {
  id: string
  name: string
  image: string
  cuisine: string
  rating: number
  reviewCount: number
  distance: string
  location: string
  phone: string
  website?: string
  hours: string
  isOpen: boolean
  hygieneRating: number
  bestSellers: Array<{
    name: string
    price: string
    image: string
  }>
  reviews: Array<{
    name: string
    rating: number
    comment: string
    date: string
  }>
  menu: Array<{
    category: string
    items: Array<{
      name: string
      description: string
      price: string
    }>
  }>
  gallery: string[]
  social: {
    instagram?: string
  }
}

interface AdaptiveRestaurantModalProps {
  restaurant: Restaurant | null
  isOpen: boolean
  onClose: () => void
}

export function AdaptiveRestaurantModal({ restaurant, isOpen, onClose }: AdaptiveRestaurantModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!restaurant) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[95vw] h-[95vh] md:max-h-[90vh] overflow-hidden p-0 gap-0 flex flex-col">
        {/* Header */}
        <div className="relative">
          <div className="h-48 md:h-64 overflow-hidden">
            <ImageWithFallback
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Close Button */}
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-[#dc2626] text-white">
              ✓ Halal Certified
            </Badge>
            <Badge variant="outline" className="bg-white/90">
              Food Hygiene: {restaurant.hygieneRating}/5
            </Badge>
          </div>
          
          {/* Status Badge */}
          <div className="absolute bottom-4 right-4">
            <Badge 
              variant={restaurant.isOpen ? "default" : "destructive"}
              className={`${restaurant.isOpen ? "bg-green-500" : "bg-red-500"} text-white`}
            >
              <Clock className="w-3 h-3 mr-1" />
              {restaurant.isOpen ? "Open" : "Closed"}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 flex-1 overflow-y-auto">
          {/* Restaurant Info */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
            <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
            
            {/* Rating & Location */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(restaurant.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{restaurant.rating}</span>
                <span className="text-gray-500">({restaurant.reviewCount} reviews)</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{restaurant.location} • {restaurant.distance}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" className="border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white">
                <Navigation className="w-4 h-4 mr-2" />
                Directions
              </Button>
              <Button variant="outline">
                📋 Menu
              </Button>
              <Button variant="outline">
                🍽️ Book
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <div className="space-y-6">
                {/* Best Sellers */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">🔥 Best Sellers</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {restaurant.bestSellers.map((item, index) => (
                      <div key={index} className="relative rounded-lg overflow-hidden group">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                          <div className="text-white">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs opacity-90">{item.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Info */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">📍 Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{restaurant.hours}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{restaurant.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{restaurant.location}</span>
                    </div>
                    {restaurant.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <a href={restaurant.website} className="text-[#dc2626] hover:underline">
                          Visit Website
                        </a>
                      </div>
                    )}
                    {restaurant.social.instagram && (
                      <div className="flex items-center gap-3">
                        <Instagram className="w-4 h-4 text-gray-500" />
                        <a href={restaurant.social.instagram} className="text-[#dc2626] hover:underline">
                          Follow on Instagram
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="menu" className="mt-6">
              <div className="space-y-6">
                {restaurant.menu.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-lg mb-3 text-[#dc2626]">{category.category}</h3>
                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-start border-b border-gray-100 pb-3">
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <p className="font-semibold text-[#dc2626] ml-4">{item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                {restaurant.reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.name}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-1">{review.comment}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="photos" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {restaurant.gallery.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={image}
                      alt={`${restaurant.name} photo ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}