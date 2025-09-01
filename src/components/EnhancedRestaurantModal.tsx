import { Dialog, DialogContent } from "./ui/dialog"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Star, MapPin, Clock, Phone, Globe, Navigation, Instagram, X, Plus, ChevronRight } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { ImageLightbox } from "./ImageLightbox"
import { ReviewForm } from "./ReviewForm"
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
    description?: string
  }>
  reviews: Array<{
    name: string
    rating: number
    comment: string
    date: string
    image?: string
  }>
  menu: Array<{
    category: string
    items: Array<{
      name: string
      description: string
      price: string
      image?: string
    }>
  }>
  gallery: string[]
  social: {
    instagram?: string
  }
}

interface EnhancedRestaurantModalProps {
  restaurant: Restaurant | null
  isOpen: boolean
  onClose: () => void
}

export function EnhancedRestaurantModal({ restaurant, isOpen, onClose }: EnhancedRestaurantModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [userReviews, setUserReviews] = useState<Restaurant['reviews']>([])

  if (!restaurant) return null

  const allImages = [restaurant.image, ...restaurant.gallery]
  const allReviews = [...restaurant.reviews, ...userReviews]

  const handleImageClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const handleAddReview = (review: {
    name: string
    rating: number
    comment: string
    image?: string
  }) => {
    const newReview = {
      ...review,
      date: "Just now"
    }
    setUserReviews(prev => [newReview, ...prev])
    setShowReviewForm(false)
  }

  const handleCall = () => {
    window.open(`tel:${restaurant.phone}`, '_self')
  }

  const handleDirections = () => {
    const query = encodeURIComponent(restaurant.location)
    window.open(`https://maps.google.com/?q=${query}`, '_blank')
  }

  const averageRating = allReviews.length > 0
    ? allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length
    : restaurant.rating

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="
          restaurant-modal 
          p-0 
          w-[100vw] 
          h-[100dvh] 
          lg:w-[min(90vw,1200px)] 
          lg:h-[min(90vh,860px)] 
          !max-w-[100vw] 
          !max-h-[100dvh] 
          lg:!max-w-[90vw] 
          lg:!max-h-[90vh] 
          lg:rounded-2xl 
          rounded-none
          overflow-hidden 
          gap-0 
          flex 
          flex-col 
          transition-all 
          duration-300 
          ease-out
          [&>button]:hidden
          lg:shadow-2xl
          border-0
          lg:border
        ">
          {/* Mobile Header - Sticky */}
          <div className="lg:hidden sticky top-0 z-50 bg-white border-b px-4 py-4 flex items-center justify-between shadow-sm">
            <h2 className="font-semibold text-lg truncate">{restaurant.name}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Desktop Close Button */}
          <Button
            variant="outline"
            size="lg"
            className="hidden lg:flex absolute top-6 right-6 z-50 bg-white/95 hover:bg-white shadow-lg border-2 w-12 h-12 items-center justify-center"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            {/* Desktop Two-Column Layout */}
            <div className="hidden lg:flex h-full">
              {/* Left Column - Images & Menu */}
              <div className="w-[56%] flex flex-col border-r">
                {/* Image Gallery */}
                <div className="h-[45%] relative">
                  <div 
                    className="h-full cursor-pointer relative overflow-hidden"
                    onClick={() => handleImageClick(0)}
                  >
                    <ImageWithFallback
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-[#dc2626] text-white">
                        ✓ Halal Certified
                      </Badge>
                      <Badge variant="outline" className="bg-white/90">
                        Hygiene: {restaurant.hygieneRating}/5
                      </Badge>
                    </div>
                    
                    {/* Status */}
                    <div className="absolute bottom-4 right-4">
                      <Badge 
                        variant={restaurant.isOpen ? "default" : "destructive"}
                        className={`${restaurant.isOpen ? "bg-green-500" : "bg-red-500"} text-white`}
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {restaurant.isOpen ? "Open" : "Closed"}
                      </Badge>
                    </div>

                    {/* Gallery Indicator */}
                    {allImages.length > 1 && (
                      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                        +{allImages.length - 1} photos
                      </div>
                    )}
                  </div>
                </div>

                {/* Menu Section */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <h3 className="font-semibold text-lg mb-4 text-[#dc2626]">🔥 Top Sellers</h3>
                  <div className="space-y-3">
                    {restaurant.bestSellers.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="font-semibold text-[#dc2626] text-sm mt-1">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white"
                    onClick={() => setActiveTab("menu")}
                  >
                    View Full Menu
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Right Column - Info & Reviews */}
              <div className="w-[44%] flex flex-col">
                {/* Restaurant Info */}
                <div className="p-6 border-b">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
                  <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(averageRating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{averageRating.toFixed(1)}</span>
                    <span className="text-gray-500">({allReviews.length} reviews)</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button onClick={handleCall} className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button onClick={handleDirections} variant="outline" className="border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white">
                      <Navigation className="w-4 h-4 mr-2" />
                      Directions
                    </Button>
                  </div>
                </div>

                {/* Reviews Section */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Reviews ({allReviews.length})</h3>
                    <Button
                      onClick={() => setShowReviewForm(true)}
                      size="sm"
                      className="bg-[#dc2626] hover:bg-[#b91c1c] text-white"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Review
                    </Button>
                  </div>

                  {showReviewForm ? (
                    <ReviewForm
                      restaurantName={restaurant.name}
                      onSubmit={handleAddReview}
                      onCancel={() => setShowReviewForm(false)}
                    />
                  ) : (
                    <div className="space-y-4">
                      {allReviews.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <p>No reviews yet. Be the first to review!</p>
                        </div>
                      ) : (
                        allReviews.slice(0, 5).map((review, index) => (
                          <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
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
                            <p className="text-gray-600 text-sm mb-1">{review.comment}</p>
                            {review.image && (
                              <div className="mt-2">
                                <img
                                  src={review.image}
                                  alt="Review photo"
                                  className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-90"
                                  onClick={() => {
                                    // Add review image to lightbox if needed
                                  }}
                                />
                              </div>
                            )}
                            <p className="text-xs text-gray-400 mt-2">{review.date}</p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Contact Info */}
                <div className="p-6 border-t bg-gray-50">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{restaurant.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{restaurant.hours}</span>
                    </div>
                    {restaurant.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <a href={restaurant.website} className="text-[#dc2626] hover:underline">
                          Visit Website
                        </a>
                      </div>
                    )}
                    {restaurant.social.instagram && (
                      <div className="flex items-center gap-2">
                        <Instagram className="w-4 h-4 text-gray-500" />
                        <a href={restaurant.social.instagram} className="text-[#dc2626] hover:underline">
                          Follow on Instagram
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Single Column Layout */}
            <div className="lg:hidden h-full overflow-y-auto">
              {/* Hero Image */}
              <div 
                className="h-48 relative cursor-pointer"
                onClick={() => handleImageClick(0)}
              >
                <ImageWithFallback
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-[#dc2626] text-white text-xs">
                    ✓ Halal
                  </Badge>
                  <Badge variant="outline" className="bg-white/90 text-xs">
                    {restaurant.hygieneRating}/5
                  </Badge>
                </div>
                
                <div className="absolute bottom-4 right-4">
                  <Badge 
                    variant={restaurant.isOpen ? "default" : "destructive"}
                    className={`${restaurant.isOpen ? "bg-green-500" : "bg-red-500"} text-white text-xs`}
                  >
                    {restaurant.isOpen ? "Open" : "Closed"}
                  </Badge>
                </div>

                {allImages.length > 1 && (
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    +{allImages.length - 1} photos
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex-1 overflow-y-auto">
                {/* Restaurant Info */}
                <div className="mb-4">
                  <h1 className="text-xl font-bold text-gray-900 mb-1">{restaurant.name}</h1>
                  <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(averageRating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{averageRating.toFixed(1)}</span>
                    <span className="text-gray-500 text-sm">({allReviews.length})</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <Button onClick={handleCall} className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button onClick={handleDirections} variant="outline" className="border-[#dc2626] text-[#dc2626]">
                      <Navigation className="w-4 h-4 mr-2" />
                      Directions
                    </Button>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="menu">Menu</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-3">
                    <div className="space-y-4">
                      {/* Best Sellers */}
                      <div>
                        <h3 className="font-semibold mb-2 text-[#dc2626]">🔥 Best Sellers</h3>
                        <div className="space-y-3">
                          {restaurant.bestSellers.map((item, index) => (
                            <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                <ImageWithFallback
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="font-semibold text-[#dc2626] mt-1">{item.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div>
                        <h3 className="font-semibold mb-2">Contact</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>{restaurant.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span>{restaurant.hours}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{restaurant.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="menu" className="mt-3">
                    <div className="space-y-4">
                      {restaurant.menu.map((category, index) => (
                        <div key={index}>
                          <h3 className="font-semibold mb-2 text-[#dc2626]">{category.category}</h3>
                          <div className="space-y-3">
                            {category.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-b-0">
                                <div className="flex-1">
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                </div>
                                <p className="font-semibold text-[#dc2626] ml-4">{item.price}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="mt-3">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Reviews ({allReviews.length})</h3>
                        <Button
                          onClick={() => setShowReviewForm(true)}
                          size="sm"
                          className="bg-[#dc2626] hover:bg-[#b91c1c] text-white"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>

                      {showReviewForm ? (
                        <ReviewForm
                          restaurantName={restaurant.name}
                          onSubmit={handleAddReview}
                          onCancel={() => setShowReviewForm(false)}
                        />
                      ) : (
                        <div className="space-y-4">
                          {allReviews.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                              <p>No reviews yet. Be the first!</p>
                            </div>
                          ) : (
                            allReviews.map((review, index) => (
                              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
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
                                <p className="text-gray-600 text-sm mb-1">{review.comment}</p>
                                {review.image && (
                                  <div className="mt-2">
                                    <img
                                      src={review.image}
                                      alt="Review photo"
                                      className="w-20 h-20 object-cover rounded"
                                    />
                                  </div>
                                )}
                                <p className="text-xs text-gray-400 mt-2">{review.date}</p>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Lightbox */}
      <ImageLightbox
        images={allImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
        restaurantName={restaurant.name}
      />
    </>
  )
}