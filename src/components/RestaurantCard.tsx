'use client'

import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Star, MapPin, Clock, Phone } from "lucide-react"
import { Restaurant, Location } from "@/types"
import { formatPrice, formatRating, calculateDistance } from "@/lib/utils"
import Image from "next/image"

interface RestaurantCardProps {
  restaurant: Restaurant
  viewMode: 'grid' | 'list'
  onClick: () => void
  userLocation?: Location
}

export function RestaurantCard({
  restaurant,
  viewMode,
  onClick,
  userLocation
}: RestaurantCardProps) {
  const distance = userLocation 
    ? calculateDistance(
        userLocation, 
        { lat: restaurant.location.latitude, lng: restaurant.location.longitude }
      )
    : 0

  const primaryImage = restaurant.bestItems[0]?.imageUrl || restaurant.gallery[0] || '/placeholder-restaurant.jpg'

  if (viewMode === 'list') {
    return (
      <div className="p-5 md:p-6 grid grid-cols-[120px_1fr_auto] md:grid-cols-[200px_1fr_auto] gap-4 md:gap-6 items-center hover:bg-gray-50 transition-all duration-200 cursor-pointer" onClick={onClick}>
        <div className="aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-black/5">
          <Image
            src={primaryImage}
            alt={restaurant.name}
            width={200}
            height={150}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="min-w-0">
          <h3 className="text-lg md:text-xl font-bold tracking-tight text-charcoal mb-2 truncate">
            {restaurant.name}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {restaurant.halalCertified && (
              <span className="halal-badge">
                ✓ Halal
              </span>
            )}
            {restaurant.cuisines.slice(0, 2).map((cuisine) => (
              <span key={cuisine} className="rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-xs md:text-sm font-medium">
                {cuisine}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-sm md:text-base text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{formatRating(restaurant.ratingAvg)}</span>
              <span className="text-gray-500">({restaurant.ratingCount})</span>
            </div>
            {userLocation && (
              <>
                <span className="text-gray-300">•</span>
                <span>{distance.toFixed(1)} mi away</span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button className="foody-button-primary text-sm md:text-base">
            View Details
          </Button>
          <Button className="foody-button-secondary text-sm md:text-base">
            <MapPin className="h-4 w-4 mr-2" />
            Directions
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="restaurant-card group" onClick={onClick}>
      {/* Image */}
      <div className="aspect-[16/11] relative overflow-hidden">
        <Image
          src={primaryImage}
          alt={restaurant.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Halal Badge */}
        <div className="absolute left-4 top-4">
          <span className="halal-badge">
            ✓ Halal
          </span>
        </div>
        {/* Rating Badge */}
        <div className="absolute right-4 top-4">
          <span className="rounded-full bg-amber-100 text-amber-700 px-3 py-1 text-xs md:text-sm font-semibold shadow-md">
            <Star className="h-3 w-3 md:h-4 md:w-4 mr-1 fill-yellow-400 text-yellow-400 inline" />
            {formatRating(restaurant.ratingAvg)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex flex-col gap-3">
        <div>
          <h3 className="text-lg md:text-xl font-bold tracking-tight text-charcoal mb-2 line-clamp-1">
            {restaurant.name}
          </h3>
          
          {/* Meta Row - Cuisine Tags + Rating */}
          <div className="flex items-center gap-2 mb-3">
            {restaurant.cuisines.slice(0, 2).map((cuisine) => (
              <span key={cuisine} className="rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-xs md:text-sm font-medium">
                {cuisine}
              </span>
            ))}
            {restaurant.cuisines.length > 2 && (
              <span className="rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-xs md:text-sm font-medium">
                +{restaurant.cuisines.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 md:w-5 md:h-5 ${
                  i < Math.floor(restaurant.ratingAvg)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm md:text-base font-semibold text-charcoal">{formatRating(restaurant.ratingAvg)}</span>
          <span className="text-sm md:text-base text-gray-500">({restaurant.ratingCount})</span>
        </div>

        {/* Distance */}
        {userLocation && (
          <div className="text-sm md:text-base text-gray-500">
            {distance.toFixed(1)} mi away
          </div>
        )}

        {/* CTA Button */}
        <Button 
          className="mt-2 foody-button-primary w-full"
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
        >
          View Details
        </Button>
      </div>
    </div>
  )
}