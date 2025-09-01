'use client'

import { Restaurant, SearchFilters } from "@/types"
import { RestaurantCard } from "./RestaurantCard"
import { Button } from "./ui/button"
import { Grid, List, SlidersHorizontal, Filter } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Badge } from "./ui/badge"
import { Slider } from "./ui/slider"
import { Checkbox } from "./ui/checkbox"

interface RestaurantResultsProps {
  restaurants: Restaurant[]
  loading: boolean
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  onRestaurantSelect: (restaurant: Restaurant) => void
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
}

const cuisineOptions = [
  'Pakistani', 'Indian', 'Turkish', 'Lebanese', 'Moroccan', 'Persian',
  'Egyptian', 'Syrian', 'Bangladeshi', 'Malaysian', 'Indonesian'
]

export function RestaurantResults({ 
  restaurants, 
  loading, 
  viewMode, 
  onViewModeChange, 
  onRestaurantSelect,
  filters,
  onFiltersChange
}: RestaurantResultsProps) {
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'name'>('distance')

  const sortedRestaurants = [...restaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.ratingAvg - a.ratingAvg
      case 'name':
        return a.name.localeCompare(b.name)
      case 'distance':
      default:
        return 0 // Distance sorting handled in hook
    }
  })

  const handleCuisineFilter = (cuisine: string, checked: boolean) => {
    const newCuisines = checked
      ? [...filters.cuisines, cuisine]
      : filters.cuisines.filter(c => c !== cuisine)
    
    onFiltersChange({ ...filters, cuisines: newCuisines })
  }

  const clearFilters = () => {
    onFiltersChange({
      cuisines: [],
      rating: 0,
      priceRange: [0, 100],
      distance: 25,
    })
  }

  if (loading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="restaurant-card animate-pulse">
              <div className="aspect-[16/11] bg-gray-100 rounded-t-3xl" />
              <div className="p-5 md:p-6 space-y-3">
                <div className="h-5 bg-gray-100 rounded-xl w-3/4" />
                <div className="h-4 bg-gray-100 rounded-lg w-1/2" />
                <div className="h-4 bg-gray-100 rounded-lg w-2/3" />
                <div className="h-12 bg-gray-100 rounded-2xl w-full mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-charcoal">
            {restaurants.length} Restaurant{restaurants.length !== 1 ? 's' : ''} Found
          </h2>
          <p className="text-base md:text-lg text-gray-600 mt-2">
            Showing halal restaurants near you
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Filters */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {(filters.cuisines.length > 0 || filters.rating > 0) && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                    {filters.cuisines.length + (filters.rating > 0 ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              
              <div className="space-y-6 mt-6">
                {/* Cuisines */}
                <div>
                  <h4 className="font-medium mb-3">Cuisine Types</h4>
                  <div className="space-y-2">
                    {cuisineOptions.map((cuisine) => (
                      <div key={cuisine} className="flex items-center space-x-2">
                        <Checkbox
                          id={cuisine}
                          checked={filters.cuisines.includes(cuisine)}
                          onCheckedChange={(checked) => 
                            handleCuisineFilter(cuisine, checked as boolean)
                          }
                        />
                        <label htmlFor={cuisine} className="text-sm">
                          {cuisine}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-medium mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    <Slider
                      value={[filters.rating]}
                      onValueChange={(value) => 
                        onFiltersChange({ ...filters, rating: value[0] })
                      }
                      max={5}
                      min={0}
                      step={0.5}
                    />
                    <p className="text-sm text-muted-foreground">
                      {filters.rating > 0 ? `${filters.rating}+ stars` : 'Any rating'}
                    </p>
                  </div>
                </div>

                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Clear All Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Sort by {sortBy}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy('distance')}>
                Distance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('rating')}>
                Rating
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('name')}>
                Name
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Toggle */}
          <div className="inline-flex rounded-xl bg-gray-100 p-1">
            <Button
              variant="ghost"
              onClick={() => onViewModeChange('grid')}
              className={`px-4 py-2 rounded-lg text-sm md:text-base transition-all duration-200 ${
                viewMode === 'grid' ? 'bg-white shadow text-charcoal' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid className="h-5 w-5 mr-2" />
              Grid
            </Button>
            <Button
              variant="ghost"
              onClick={() => onViewModeChange('list')}
              className={`px-4 py-2 rounded-lg text-sm md:text-base transition-all duration-200 ${
                viewMode === 'list' ? 'bg-white shadow text-charcoal' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="h-5 w-5 mr-2" />
              List
            </Button>
          </div>
        </div>
      </div>

      {/* Results Grid/List */}
      {restaurants.length === 0 ? (
        <div className="card-shell p-8 md:p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-3xl md:text-4xl">🍽️</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-charcoal mb-3">
              No restaurants found in this area
            </h3>
            <p className="text-base md:text-lg text-gray-600 mb-6">
              Try expanding your search radius or changing your location
            </p>
            <Button className="foody-button-primary">
              Widen Search Radius
            </Button>
          </div>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-6" 
          : "divide-y divide-gray-100 rounded-3xl border border-black/5 bg-white shadow-soft mt-6"
        }>
          {sortedRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              viewMode={viewMode}
              onClick={() => onRestaurantSelect(restaurant)}
            />
          ))}
        </div>
      )}
    </div>
  )
}