import { useQuery } from '@tanstack/react-query'
import { db, collection, getDocs, query, limit } from '@/lib/firebase'
import { Restaurant, Location, SearchFilters } from '@/types'
import { calculateDistance } from '@/lib/utils'

interface UseRestaurantsParams {
  center: Location
  radius: number
  filters: SearchFilters
}

// Mock data for demonstration
const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Al-Madina Restaurant",
    cuisines: ["Pakistani", "Indian"],
    address: "123 Ladypool Road, Sparkbrook, Birmingham",
    postcode: "B11 1JA",
    location: { latitude: 52.4625, longitude: -1.8848 } as any,
    phone: "0121 449 0712",
    website: "https://al-madina-birmingham.co.uk",
    halalCertified: true,
    bestItems: [
      {
        id: "1",
        name: "Lamb Biryani",
        price: 12.99,
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03246963d293?w=400",
        description: "Aromatic basmati rice with tender lamb"
      }
    ],
    menu: [
      {
        section: "Main Courses",
        items: [
          { name: "Lamb Biryani", price: 12.99, description: "Aromatic rice with tender lamb" },
          { name: "Chicken Karahi", price: 10.99, description: "Traditional Pakistani curry" }
        ]
      }
    ],
    socials: { instagram: "@almadina_birmingham" },
    gallery: ["https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400"],
    videos: [],
    ratingAvg: 4.5,
    ratingCount: 127,
    createdAt: new Date() as any,
    updatedAt: new Date() as any,
    ownerUid: "demo_owner_1"
  },
  {
    id: "2",
    name: "Istanbul Grill",
    cuisines: ["Turkish"],
    address: "45 Green Street, London",
    postcode: "E7 8JF",
    location: { latitude: 51.5385, longitude: 0.0342 } as any,
    phone: "020 8472 3456",
    halalCertified: true,
    bestItems: [
      {
        id: "1",
        name: "Mixed Grill",
        price: 18.99,
        imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400",
        description: "Assorted grilled meats with rice"
      }
    ],
    menu: [
      {
        section: "Grills",
        items: [
          { name: "Lamb Shish", price: 14.99, description: "Marinated lamb cubes" },
          { name: "Chicken Wings", price: 8.99, description: "Grilled spicy wings" }
        ]
      }
    ],
    socials: { instagram: "@istanbul_grill_london" },
    gallery: ["https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400"],
    videos: [],
    ratingAvg: 4.2,
    ratingCount: 89,
    createdAt: new Date() as any,
    updatedAt: new Date() as any,
    ownerUid: "demo_owner_2"
  }
]

export function useRestaurants({ center, radius, filters }: UseRestaurantsParams) {
  return useQuery({
    queryKey: ['restaurants', center, radius, filters],
    queryFn: async () => {
      // For demo purposes, combine mock data with approved submissions
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Get restaurants from Firebase
        let allRestaurants = [...mockRestaurants]
        
        if (db) {
          try {
            const q = query(collection(db, 'restaurants'), limit(100))
            const snapshot = await getDocs(q)
            const firebaseRestaurants: Restaurant[] = []
            snapshot.forEach((doc) => {
              const data = doc.data()
              firebaseRestaurants.push({
                id: doc.id,
                ...data,
              } as Restaurant)
            })
            allRestaurants = [...mockRestaurants, ...firebaseRestaurants]
          } catch (error) {
            console.error('Error fetching restaurants from Firebase:', error)
            // Fallback to localStorage
            const approvedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]')
            allRestaurants = [...mockRestaurants, ...approvedRestaurants]
          }
        } else {
          // Fallback to localStorage if Firebase not available
          const approvedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]')
          allRestaurants = [...mockRestaurants, ...approvedRestaurants]
        }
        
        // Filter combined data by distance and other criteria
        return allRestaurants.filter((restaurant) => {
          // Distance filter
          const distance = calculateDistance(
            center,
            { lat: restaurant.location.latitude, lng: restaurant.location.longitude }
          )
          if (distance > radius) return false

          // Cuisine filter
          if (filters.cuisines.length > 0) {
            if (!restaurant.cuisines.some((cuisine: string) => filters.cuisines.includes(cuisine))) {
              return false
            }
          }

          // Rating filter
          if (filters.rating > 0 && restaurant.ratingAvg < filters.rating) {
            return false
          }

          return true
        }).sort((a, b) => {
          // Sort by distance
          const distanceA = calculateDistance(
            center,
            { lat: a.location.latitude, lng: a.location.longitude }
          )
          const distanceB = calculateDistance(
            center,
            { lat: b.location.latitude, lng: b.location.longitude }
          )
          return distanceA - distanceB
        })
      } catch (error) {
        console.error('Error fetching restaurants:', error)
        return []
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}