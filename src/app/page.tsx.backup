'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { RestaurantsMap } from '@/components/map/RestaurantsMap'
import { RestaurantResults } from '@/components/RestaurantResults'
import { RestaurantModal } from '@/components/RestaurantModal'
import { useRestaurants } from '@/hooks/useRestaurants'
import { Location, Restaurant, SearchFilters } from '@/types'


export default function HomePage() {
  const [center, setCenter] = useState<Location>({ lat: 52.5074, lng: -1.1278 }) // Birmingham, UK
  const [radius, setRadius] = useState(10)
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState<SearchFilters>({
    cuisines: [],
    rating: 0,
    priceRange: [0, 100],
    distance: 25,
  })

  const { data: restaurants = [], isLoading } = useRestaurants({ center, radius, filters })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Full-Screen Map Canvas */}
        <section className="h-[60vh] md:h-[68vh] relative bg-gray-100">
          <RestaurantsMap
            restaurants={restaurants}
            center={center}
            onCenterChange={setCenter}
            radius={radius}
            onRadiusChange={setRadius}
            onRestaurantSelect={setSelectedRestaurant}
          />
        </section>

        {/* Results Section */}
        <section className="section-padding">
          <RestaurantResults
            restaurants={restaurants}
            loading={isLoading}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onRestaurantSelect={setSelectedRestaurant}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </section>
      </main>

      
      {/* Simple Footer with Admin Access */}
      <footer className="bg-charcoal text-white py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm md:text-base">
              &copy; 2024 Halal Food Club. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a href="mailto:hello@halalfoodclub.uk" className="text-gray-400 hover:text-white transition-colors text-sm">
                Contact
              </a>
              <Link href="/admin" className="text-gray-400 hover:text-white transition-colors text-xs">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Restaurant Modal */}
      {selectedRestaurant && (
        <RestaurantModal
          restaurant={selectedRestaurant}
          open={!!selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </div>
  )
} 