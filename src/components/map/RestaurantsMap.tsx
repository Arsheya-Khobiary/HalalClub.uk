'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { GoogleMap, useJsApiLoader, Marker, Circle, InfoWindow } from '@react-google-maps/api'
import { Restaurant, Location } from '@/types'
import { RestaurantModal } from '@/components/RestaurantModal'
import { Button } from '@/components/ui/button'
import { MapPin, Navigation, Crosshair } from 'lucide-react'

interface RestaurantsMapProps {
  restaurants: Restaurant[]
  center: Location
  onCenterChange: (center: Location) => void
  radius: number
  onRadiusChange: (radius: number) => void
  onRestaurantSelect: (restaurant: Restaurant | null) => void
}

const mapContainerStyle = {
  width: '100%',
  height: '100%'
}

const defaultCenter = {
  lat: 52.5074,
  lng: -1.1278
}

export function RestaurantsMap({
  restaurants,
  center,
  onCenterChange,
  radius,
  onRadiusChange,
  onRestaurantSelect
}: RestaurantsMapProps) {
  const [userLocation, setUserLocation] = useState<Location | null>(null)
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const lastCenterRef = useRef<Location>(center)
  const isInitializedRef = useRef(false)
  const mapRef = useRef<google.maps.Map | null>(null)
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)
  const isMountedRef = useRef(true)
  const circleRef = useRef<google.maps.Circle | null>(null)

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  })

  // Cleanup effect
  useEffect(() => {
    isMountedRef.current = true
    
    return () => {
      isMountedRef.current = false
      // Clean up refs
      mapRef.current = null
      infoWindowRef.current = null
      if (circleRef.current) {
        circleRef.current.setMap(null)
        circleRef.current = null
      }
    }
  }, [])

  // Update circle when radius or center changes
  useEffect(() => {
    if (circleRef.current && mapRef.current) {
      circleRef.current.setCenter(center)
      circleRef.current.setRadius(radius * 1000) // Convert km to meters
    }
  }, [center, radius])

  // Get user location
  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (!isMountedRef.current) return
          
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setUserLocation(userLoc)
          onCenterChange(userLoc)
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }, [onCenterChange])

  // Initialize map
  const onLoad = useCallback((map: google.maps.Map) => {
    if (!isMountedRef.current) return
    
    try {
      mapRef.current = map
      
      // Create info window
      if (!infoWindowRef.current) {
        infoWindowRef.current = new google.maps.InfoWindow()
      }
      
      // Create circle directly with Google Maps API
      if (!circleRef.current) {
        circleRef.current = new google.maps.Circle({
          center: center,
          radius: radius * 1000, // Convert km to meters
          fillColor: '#3B82F6',
          fillOpacity: 0.2,
          strokeColor: '#1D4ED8',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          map: map
        })
      }
      
      // Set initial center
      if (!isInitializedRef.current) {
        isInitializedRef.current = true
        lastCenterRef.current = center
      }
    } catch (error) {
      console.error('Error initializing map:', error)
    }
  }, [center, radius])

  // Cleanup on unmount
  const onUnmount = useCallback(() => {
    if (infoWindowRef.current) {
      infoWindowRef.current.close()
    }
    if (circleRef.current) {
      circleRef.current.setMap(null)
      circleRef.current = null
    }
    mapRef.current = null
    infoWindowRef.current = null
  }, [])

  // Handle drag start
  const handleDragStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    if (!mapRef.current || !isMountedRef.current) return
    
    setIsDragging(false)
    
    const newCenter = {
      lat: mapRef.current.getCenter()?.lat() || center.lat,
      lng: mapRef.current.getCenter()?.lng() || center.lng
    }
    
    // Only update if center actually changed
    if (newCenter.lat !== lastCenterRef.current.lat || newCenter.lng !== lastCenterRef.current.lng) {
      lastCenterRef.current = newCenter
      onCenterChange(newCenter)
    }
  }, [center, onCenterChange])

  // Handle radius change
  const handleRadiusChange = useCallback((newRadius: number) => {
    onRadiusChange(newRadius)
  }, [onRadiusChange])

  // Handle marker click
  const handleMarkerClick = useCallback((restaurant: Restaurant) => {
    if (!mapRef.current || !infoWindowRef.current) return
    
    setSelectedRestaurant(restaurant)
    onRestaurantSelect(restaurant)
    
    const position = {
      lat: (restaurant.location as any).lat || restaurant.location.latitude,
      lng: (restaurant.location as any).lng || restaurant.location.longitude
    }
    
    infoWindowRef.current.setContent(`
      <div class="p-2">
        <h3 class="font-semibold text-lg">${restaurant.name}</h3>
        <p class="text-gray-600">${restaurant.cuisines.join(", ")}</p>
        <p class="text-sm text-gray-500">${restaurant.address}</p>
      </div>
    `)
    
    infoWindowRef.current.setPosition(position)
    infoWindowRef.current.open(mapRef.current)
  }, [onRestaurantSelect])

  if (loadError) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error loading map</p>
          <p className="text-sm text-gray-600">Please check your internet connection</p>
        </div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <Button
          onClick={getUserLocation}
          variant="outline"
          size="sm"
          className="bg-white shadow-lg hover:bg-gray-50"
        >
          <Crosshair className="h-4 w-4 mr-2" />
          My Location
        </Button>
        
        <div className="bg-white rounded-lg shadow-lg p-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Radius: {radius}km
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={radius}
            onChange={(e) => handleRadiusChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        }}
      >
        {/* User Location Marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="white" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" fill="white"/>
                  <circle cx="12" cy="12" r="1" fill="#3B82F6"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(24, 24),
              anchor: new google.maps.Point(12, 12)
            }}
            title="Your Location"
          />
        )}

        {/* Restaurant Markers */}
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={{
              lat: (restaurant.location as any).lat || restaurant.location.latitude,
              lng: (restaurant.location as any).lng || restaurant.location.longitude
            }}
            onClick={() => handleMarkerClick(restaurant)}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 2C10.48 2 6 6.48 6 12c0 7 10 18 10 18s10-11 10-18c0-5.52-4.48-10-10-10z" fill="#EF4444"/>
                  <circle cx="16" cy="12" r="4" fill="white"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(32, 32),
              anchor: new google.maps.Point(16, 32)
            }}
            title={restaurant.name}
          />
        ))}
      </GoogleMap>

      {/* Restaurant Modal */}
      {selectedRestaurant && (
        <RestaurantModal
          restaurant={selectedRestaurant}
          open={!!selectedRestaurant}
          onClose={() => {
            setSelectedRestaurant(null)
            onRestaurantSelect(null)
          }}
        />
      )}
    </div>
  )
}
