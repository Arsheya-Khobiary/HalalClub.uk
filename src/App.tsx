import { useState } from "react"
import { SimplifiedHeader } from "./components/SimplifiedHeader"
import { MapDashboard } from "./components/MapDashboard"
import { RestaurantSignup } from "./components/RestaurantSignup"

export default function App() {
  const [currentPage, setCurrentPage] = useState<"dashboard" | "signup">("dashboard")

  const handleNavigation = (page: "dashboard" | "signup") => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-white">
      <SimplifiedHeader currentPage={currentPage} onNavigate={handleNavigation} />
      
      {currentPage === "dashboard" && <MapDashboard />}
      {currentPage === "signup" && <RestaurantSignup />}

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-[#dc2626] rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold">🍽️</span>
            </div>
            <span className="text-lg font-bold">HalalClub.uk</span>
          </div>
          <p className="text-gray-400 mb-4 text-sm">
            The UK's fastest halal food discovery platform
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <button 
              onClick={() => handleNavigation("dashboard")}
              className="text-gray-400 hover:text-[#dc2626] transition-colors"
            >
              Find Restaurants
            </button>
            <button 
              onClick={() => handleNavigation("signup")}
              className="text-gray-400 hover:text-[#dc2626] transition-colors"
            >
              List Restaurant
            </button>
            <a href="#" className="text-gray-400 hover:text-[#dc2626] transition-colors">Contact</a>
            <a href="#" className="text-gray-400 hover:text-[#dc2626] transition-colors">Privacy</a>
          </div>
          <div className="border-t border-gray-800 pt-4 mt-4">
            <p className="text-gray-500 text-xs">
              © 2024 HalalClub.uk. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}