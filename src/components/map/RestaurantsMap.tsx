'use client'

import React, { useState, useCallback, useRef } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'
import { MapPin, Locate, Search } from 'lucide-react'
import { Restaurant, Location } from '@/types'
import { calculateDistance } from '@/lib/utils'

interface RestaurantsMapProps {
  restaurants: Restaurant[]
  center: Location
  onCenterChange: (center: Location) => void
  radius: number
  onRadiusChange: (radius: number) => void
  onRestaurantSelect: (restaurant: Restaurant) => void
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
}

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
}

const libraries: ("places")[] = ['places']

export function RestaurantsMap({
  restaurants,
  center,
  onCenterChange,
  radius,
  onRadiusChange,
  onRestaurantSelect,
}: RestaurantsMapProps) {
  const [postcode, setPostcode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userLocation, setUserLocation] = useState<Location | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  })

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
  }, [])

  const handleSearch = async () => {
    if (!postcode.trim() || !isLoaded) return
    
    setIsLoading(true)
    try {
      const geocoder = new google.maps.Geocoder()
      const result = await geocoder.geocode({ address: postcode + ', UK' })
      
      if (result.results[0]) {
        const location = result.results[0].geometry.location
        const newCenter = { lat: location.lat(), lng: location.lng() }
        onCenterChange(newCenter)
        
        if (mapRef.current) {
          mapRef.current.panTo(newCenter)
          mapRef.current.setZoom(12)
        }
      }
    } catch (error) {
      console.error('Geocoding error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLocateMe = () => {
    if (!navigator.geolocation) return
    
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setUserLocation(newCenter)
        onCenterChange(newCenter)
        
        if (mapRef.current) {
          mapRef.current.panTo(newCenter)
          mapRef.current.setZoom(14)
        }
        setIsLoading(false)
      },
      (error) => {
        console.error('Geolocation error:', error)
        setIsLoading(false)
      }
    )
  }

  const handleMapDragEnd = () => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter()
      if (newCenter) {
        onCenterChange({
          lat: newCenter.lat(),
          lng: newCenter.lng(),
        })
      }
    }
  }

  // Filter restaurants within radius
  const nearbyRestaurants = restaurants.filter((restaurant) => {
    const distance = calculateDistance(
      center,
      { lat: restaurant.location.latitude, lng: restaurant.location.longitude }
    )
    return distance <= radius
  })

  // Show map placeholder while loading
  if (!isLoaded) {
    return (
      <div className="relative h-full bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="text-base font-semibold text-charcoal mb-1">Loading Map</h3>
          <p className="text-sm text-gray-600">Just a moment...</p>
        </div>
        
        {/* Show controls even while loading */}
        <div className="absolute left-4 top-4 md:left-6 md:top-6 z-10">
          <div className="flex flex-wrap gap-3 md:gap-4">
            <div className="map-control p-3 md:p-4 flex items-center gap-3 opacity-50">
              <Input
                placeholder="Enter postcode (e.g., B1 1AA)"
                disabled
                className="foody-input w-48 md:w-64"
              />
              <Button 
                disabled
                className="h-12 px-5 rounded-xl bg-gray-300 text-gray-500"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={11}
        options={mapOptions}
        onLoad={onMapLoad}
        onDragEnd={handleMapDragEnd}
      >
        {/* User Location - Animated GPS Dot (Google Style) */}
        {userLocation && (
          <>
            {/* Pulsing Accuracy Circle */}
            <Marker
              position={userLocation}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="pulseGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style="stop-color:#4285F4;stop-opacity:0.2"/>
                        <stop offset="70%" style="stop-color:#4285F4;stop-opacity:0.1"/>
                        <stop offset="100%" style="stop-color:#4285F4;stop-opacity:0"/>
                      </radialGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" fill="url(#pulseGradient)">
                      <animate attributeName="r" values="20;45;20" dur="2s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(100, 100),
                anchor: new window.google.maps.Point(50, 50),
              }}
              zIndex={999}
            />
            
            {/* Static Accuracy Circle */}
            <Marker
              position={userLocation}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="25" fill="#4285F4" fill-opacity="0.15" stroke="#4285F4" stroke-width="1" stroke-opacity="0.4"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(60, 60),
                anchor: new window.google.maps.Point(30, 30),
              }}
              zIndex={1000}
            />
            
            {/* GPS Location Dot */}
            <Marker
              position={userLocation}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="9" r="7" fill="#4285F4" stroke="white" stroke-width="2"/>
                    <circle cx="9" cy="9" r="2.5" fill="white"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(18, 18),
                anchor: new window.google.maps.Point(9, 9),
              }}
              title="📍 Your Location"
              zIndex={1001}
            />
          </>
        )}

        {/* Restaurant Markers */}
        {nearbyRestaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={{
              lat: restaurant.location.latitude,
              lng: restaurant.location.longitude,
            }}
            onClick={() => onRestaurantSelect(restaurant)}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="12" fill="#0FA958" stroke="white" stroke-width="3"/>
                  <text x="16" y="20" font-family="Arial" font-size="16" fill="white" text-anchor="middle">🍽️</text>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(32, 32),
            }}
            title={restaurant.name}
          />
        ))}
      </GoogleMap>

      {/* Map Controls Overlay */}
      <div className="absolute left-4 top-4 md:left-6 md:top-6 z-10">
        <div className="flex flex-wrap gap-3 md:gap-4">
          {/* Control Group Card */}
          <div className="map-control p-3 md:p-4 flex items-center gap-3">
            <Input
              placeholder="Enter postcode (e.g., B1 1AA)"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="foody-input w-48 md:w-64"
            />
            <Button 
              onClick={handleSearch} 
              disabled={isLoading || !postcode.trim()}
              className="h-12 px-5 rounded-xl bg-primary text-white hover:bg-emerald-600 transition-all duration-200"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Locate Me Button */}
          <div className="map-control p-3 md:p-4">
            <Button
              onClick={handleLocateMe}
              disabled={isLoading}
              className="h-12 px-5 rounded-xl bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 transition-all duration-200"
            >
              <Locate className="h-5 w-5 mr-2" />
              Use My Location
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Controls - Bottom */}
      <div className="absolute bottom-4 left-4 right-4 md:hidden z-10">
        <div className="map-control p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm md:text-base font-semibold">Search Radius</label>
              <span className="text-sm md:text-base text-gray-600 font-medium">{radius} miles</span>
            </div>
            <Slider
              value={[radius]}
              onValueChange={(value) => onRadiusChange(value[0])}
              max={25}
              min={1}
              step={1}
              className="w-full h-2 rounded-full bg-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Desktop Radius Control */}
      <div className="hidden md:block absolute left-6 bottom-6 z-10">
        <div className="map-control p-4 min-w-64">
          <div className="flex items-center justify-between mb-3">
            <label className="text-base font-semibold">Search Radius</label>
            <span className="text-base text-gray-600 font-medium">{radius} miles</span>
          </div>
          <Slider
            value={[radius]}
            onValueChange={(value) => onRadiusChange(value[0])}
            max={25}
            min={1}
            step={1}
            className="w-full h-2 rounded-full bg-gray-200"
          />
        </div>
      </div>

      {/* Results Count - Desktop */}
      <div className="hidden md:block absolute bottom-6 right-6 z-10">
        <div className="map-control px-4 py-3">
          <p className="text-base font-semibold text-charcoal">
            {nearbyRestaurants.length} restaurant{nearbyRestaurants.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>
    </div>
  )
} 