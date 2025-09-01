import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Search, MapPin, Navigation, Grid, List } from "lucide-react"
import { useState } from "react"
import { RestaurantCard } from "./RestaurantCard"
import { EnhancedRestaurantModal } from "./EnhancedRestaurantModal"

// Mock data for restaurants
const mockRestaurants = [
  {
    id: "1",
    name: "Al-Madina Turkish Grill",
    image: "https://images.unsplash.com/photo-1633040243825-9163576e47fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHN0dXJraXNoJTIwa2ViYWIlMjBmb29kfGVufDF8fHx8MTc1NjQ2MDI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    cuisine: "Turkish Grill",
    rating: 4.8,
    reviewCount: 156,
    distance: "0.3 miles",
    location: "Birmingham City Centre",
    phone: "+44 121 123 4567",
    website: "https://almadina-grill.co.uk",
    hours: "11:00 AM - 11:00 PM",
    isOpen: true,
    hygieneRating: 5,
    bestSellers: [
      { 
        name: "Mixed Grill Platter", 
        price: "£18.99", 
        image: "https://images.unsplash.com/photo-1633040243825-9163576e47fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHN0dXJraXNoJTIwa2ViYWIlMjBmb29kfGVufDF8fHx8MTc1NjQ2MDI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Chicken, lamb, and kofta with rice and salad"
      },
      { 
        name: "Chicken Shish", 
        price: "£12.99", 
        image: "https://images.unsplash.com/photo-1633040243825-9163576e47fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHN0dXJraXNoJTIwa2ViYWIlMjBmb29kfGVufDF8fHx8MTc1NjQ2MDI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Tender chicken cubes with vegetables"
      },
      { 
        name: "Lamb Doner", 
        price: "£9.99", 
        image: "https://images.unsplash.com/photo-1633040243825-9163576e47fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHN0dXJraXNoJTIwa2ViYWIlMjBmb29kfGVufDF8fHx8MTc1NjQ2MDI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Succulent lamb in warm pita bread"
      }
    ],
    reviews: [
      { name: "Ahmed K.", rating: 5, comment: "Amazing food and great service! The mixed grill is incredible.", date: "2 days ago" },
      { name: "Sarah M.", rating: 4, comment: "Fresh ingredients and authentic flavors. Highly recommended!", date: "1 week ago" }
    ],
    menu: [
      {
        category: "Starters",
        items: [
          { name: "Hummus with Pita", description: "Creamy chickpea dip with warm pita bread", price: "£4.99" },
          { name: "Mixed Mezze", description: "Selection of traditional Turkish appetizers", price: "£8.99" }
        ]
      },
      {
        category: "Grills",
        items: [
          { name: "Mixed Grill Platter", description: "Chicken, lamb, and kofta with rice and salad", price: "£18.99" },
          { name: "Chicken Shish", description: "Tender chicken cubes with vegetables", price: "£12.99" }
        ]
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1633040243825-9163576e47fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHN0dXJraXNoJTIwa2ViYWIlMjBmb29kfGVufDF8fHx8MTc1NjQ2MDI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1712488070215-d22e012314ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJraXNoJTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc1NjQ2MTU5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1552740017-6659c20b89f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWxhbCUyMGZvb2QlMjBwcmVwYXJhdGlvbnxlbnwxfHx8fDE3NTY0NjE1OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1708401395376-048193c297ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwa2l0Y2hlbiUyMHN0YWZmfGVufDF8fHx8MTc1NjQ2MTU5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    social: {
      instagram: "https://instagram.com/almadina_grill"
    }
  },
  {
    id: "2",
    name: "Halal Burger House",
    image: "https://images.unsplash.com/photo-1600555379885-08a02224726d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxoYWxhbCUyMGJ1cmdlciUyMGZvb2R8ZW58MXx8fHwxNzU2NDYwMzAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    cuisine: "Halal Burgers",
    rating: 4.6,
    reviewCount: 89,
    distance: "0.8 miles",
    location: "London Bridge",
    phone: "+44 207 123 4567",
    hours: "12:00 PM - 10:00 PM",
    isOpen: true,
    hygieneRating: 4,
    bestSellers: [
      { 
        name: "The Big Halal", 
        price: "£12.99", 
        image: "https://images.unsplash.com/photo-1600555379885-08a02224726d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxoYWxhbCUyMGJ1cmdlciUyMGZvb2R8ZW58MXx8fHwxNzU2NDYwMzAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Double beef patty with special sauce"
      }
    ],
    reviews: [
      { name: "Fatima S.", rating: 5, comment: "Best halal burgers in London!", date: "3 days ago" }
    ],
    menu: [
      {
        category: "Burgers",
        items: [
          { name: "The Big Halal", description: "Double beef patty with special sauce", price: "£12.99" }
        ]
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600555379885-08a02224726d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxoYWxhbCUyMGJ1cmdlciUyMGZvb2R8ZW58MXx8fHwxNzU2NDYwMzAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    social: {}
  },
  {
    id: "3",
    name: "Spice Garden",
    image: "https://images.unsplash.com/photo-1640542509430-f529fdfce835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaWRkbGUlMjBlYXN0ZXJuJTIwZm9vZCUyMGN1cnJ5fGVufDF8fHx8MTc1NjQ2MDMwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    cuisine: "Middle Eastern",
    rating: 4.7,
    reviewCount: 203,
    distance: "1.2 miles",
    location: "Manchester",
    phone: "+44 161 123 4567",
    hours: "5:00 PM - 11:00 PM",
    isOpen: false,
    hygieneRating: 5,
    bestSellers: [
      { 
        name: "Lamb Biryani", 
        price: "£14.99", 
        image: "https://images.unsplash.com/photo-1640542509430-f529fdfce835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaWRkbGUlMjBlYXN0ZXJuJTIwZm9vZCUyMGN1cnJ5fGVufDF8fHx8MTc1NjQ2MDMwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Fragrant basmati rice with tender lamb"
      }
    ],
    reviews: [
      { name: "Omar R.", rating: 5, comment: "Authentic flavors and generous portions", date: "5 days ago" }
    ],
    menu: [
      {
        category: "Curries",
        items: [
          { name: "Lamb Biryani", description: "Fragrant basmati rice with tender lamb", price: "£14.99" }
        ]
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1640542509430-f529fdfce835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaWRkbGUlMjBlYXN0ZXJuJTIwZm9vZCUyMGN1cnJ5fGVufDF8fHx8MTc1NjQ2MDMwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    social: {}
  },
  {
    id: "4",
    name: "Kebab Express",
    image: "https://images.unsplash.com/photo-1633040243825-9163576e47fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHN0dXJraXNoJTIwa2ViYWIlMjBmb29kfGVufDF8fHx8MTc1NjQ2MDI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    cuisine: "Turkish",
    rating: 4.5,
    reviewCount: 67,
    distance: "2.1 miles",
    location: "Leeds",
    phone: "+44 113 123 4567",
    hours: "11:00 AM - 12:00 AM",
    isOpen: true,
    hygieneRating: 4,
    bestSellers: [
      { 
        name: "Doner Wrap", 
        price: "£7.99", 
        image: "https://images.unsplash.com/photo-1633040243825-9163576e47fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHN0dXJraXNoJTIwa2ViYWIlMjBmb29kfGVufDF8fHx8MTc1NjQ2MDI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Fresh doner meat in warm flatbread"
      }
    ],
    reviews: [
      { name: "Ali M.", rating: 4, comment: "Quick service and tasty food", date: "1 week ago" }
    ],
    menu: [
      {
        category: "Wraps",
        items: [
          { name: "Doner Wrap", description: "Fresh doner meat in warm flatbread", price: "£7.99" }
        ]
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1633040243825-9163576e47fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHN0dXJraXNoJTIwa2ViYWIlMjBmb29kfGVufDF8fHx8MTc1NjQ2MDI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    social: {}
  }
]

export function MapDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedRestaurant, setSelectedRestaurant] = useState<typeof mockRestaurants[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRestaurantClick = (restaurant: typeof mockRestaurants[0]) => {
    setSelectedRestaurant(restaurant)
    setIsModalOpen(true)
  }

  const handlePinClick = (restaurantId: string) => {
    const restaurant = mockRestaurants.find(r => r.id === restaurantId)
    if (restaurant) {
      handleRestaurantClick(restaurant)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedRestaurant(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Map Section */}
      <section className="relative">
        <div className="h-[400px] md:h-[500px] bg-gray-100 relative overflow-hidden">
          {/* Placeholder Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-gray-50">
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                {/* Road lines */}
                <path d="M0 150 L400 150" stroke="#cbd5e1" strokeWidth="2" />
                <path d="M200 0 L200 300" stroke="#cbd5e1" strokeWidth="2" />
                <path d="M0 75 L400 75" stroke="#e2e8f0" strokeWidth="1" />
                <path d="M0 225 L400 225" stroke="#e2e8f0" strokeWidth="1" />
                <path d="M100 0 L100 300" stroke="#e2e8f0" strokeWidth="1" />
                <path d="M300 0 L300 300" stroke="#e2e8f0" strokeWidth="1" />
              </svg>
            </div>
            
            {/* Restaurant Pins */}
            {mockRestaurants.map((restaurant, index) => {
              const positions = [
                { top: "20%", left: "20%" },
                { top: "32%", right: "24%" },
                { bottom: "24%", left: "32%" },
                { top: "40%", left: "50%" },
              ]
              const position = positions[index] || positions[0]
              
              return (
                <div 
                  key={restaurant.id}
                  className="absolute cursor-pointer"
                  style={position}
                  onClick={() => handlePinClick(restaurant.id)}
                >
                  <div className="w-8 h-8 bg-[#dc2626] rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                    <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Search Overlay */}
          <div className="absolute top-4 left-4 right-4 z-10">
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Enter postcode or use GPS..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-4 md:px-6">
                  <Navigation className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Find</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <Button size="sm" variant="outline" className="bg-white w-10 h-10 p-0">+</Button>
            <Button size="sm" variant="outline" className="bg-white w-10 h-10 p-0">-</Button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-6 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{mockRestaurants.length} Halal Restaurants</h2>
            <p className="text-gray-600 text-sm">Near your location</p>
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-[#dc2626] text-white" : ""}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-[#dc2626] text-white" : ""}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Results Grid */}
        <div className={`${
          viewMode === "grid" 
            ? "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" 
            : "space-y-3"
        }`}>
          {mockRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              {...restaurant}
              onClick={() => handleRestaurantClick(restaurant)}
            />
          ))}
        </div>
      </section>

      {/* Enhanced Restaurant Modal */}
      <EnhancedRestaurantModal
        restaurant={selectedRestaurant}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}