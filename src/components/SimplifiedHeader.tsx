import { Button } from "./ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"

interface SimplifiedHeaderProps {
  currentPage: "dashboard" | "signup"
  onNavigate: (page: "dashboard" | "signup") => void
}

export function SimplifiedHeader({ currentPage, onNavigate }: SimplifiedHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate("dashboard")}
          >
            <div className="w-10 h-10 bg-[#dc2626] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🍽️</span>
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900">HalalClub.uk</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate("dashboard")}
              className={`${currentPage === "dashboard" ? "text-[#dc2626] font-semibold" : "text-gray-700"} hover:text-[#dc2626] transition-colors`}
            >
              Find Restaurants
            </button>
            <button 
              onClick={() => onNavigate("signup")}
              className={`${currentPage === "signup" ? "text-[#dc2626] font-semibold" : "text-gray-700"} hover:text-[#dc2626] transition-colors`}
            >
              List Your Restaurant
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button 
              onClick={() => onNavigate("signup")}
              className="bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-full px-6"
            >
              Add Restaurant
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  onNavigate("dashboard")
                  setIsMobileMenuOpen(false)
                }}
                className={`text-left ${currentPage === "dashboard" ? "text-[#dc2626] font-semibold" : "text-gray-700"} hover:text-[#dc2626] transition-colors`}
              >
                Find Restaurants
              </button>
              <button 
                onClick={() => {
                  onNavigate("signup")
                  setIsMobileMenuOpen(false)
                }}
                className={`text-left ${currentPage === "signup" ? "text-[#dc2626] font-semibold" : "text-gray-700"} hover:text-[#dc2626] transition-colors`}
              >
                List Your Restaurant
              </button>
              <div className="pt-4 border-t border-gray-200">
                <Button 
                  onClick={() => {
                    onNavigate("signup")
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-full"
                >
                  Add Restaurant
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}