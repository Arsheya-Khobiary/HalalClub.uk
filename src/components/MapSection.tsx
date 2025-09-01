import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Slider } from "./ui/slider"
import { Search, MapPin, Navigation } from "lucide-react"
import { useState } from "react"

export function MapSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [radius, setRadius] = useState([5])

  return (
    <section className="relative">
      {/* Map Container */}
      <div className="h-[500px] md:h-[600px] bg-gray-100 relative overflow-hidden">
        {/* Placeholder Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50">
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
          <div className="absolute top-20 left-20">
            <div className="w-8 h-8 bg-[#009f3c] rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#009f3c] rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-32 right-24">
            <div className="w-8 h-8 bg-[#009f3c] rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#009f3c] rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-24 left-32">
            <div className="w-8 h-8 bg-[#009f3c] rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#009f3c] rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-40 left-1/2">
            <div className="w-8 h-8 bg-[#009f3c] rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#009f3c] rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-32 right-20">
            <div className="w-8 h-8 bg-[#009f3c] rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#009f3c] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Search Controls Overlay */}
        <div className="absolute top-4 left-4 right-4 z-10 hidden md:block">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto">
            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Enter postcode or area..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-[#009f3c] hover:bg-[#008a35] text-white px-6">
                Find Halal Near Me
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button 
                variant="outline" 
                className="border-[#009f3c] text-[#009f3c] hover:bg-[#009f3c] hover:text-white flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Use My Location
              </Button>
              
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm text-gray-600 whitespace-nowrap">Radius:</span>
                <div className="flex-1 min-w-0">
                  <Slider
                    value={radius}
                    onValueChange={setRadius}
                    max={25}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 whitespace-nowrap">{radius[0]} miles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="absolute top-4 left-4 right-4 z-10 md:hidden">
          <div className="bg-white rounded-lg shadow-lg p-3">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Find halal food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>
              <Button size="sm" className="bg-[#009f3c] hover:bg-[#008a35] text-white px-4">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Floating Action Buttons */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 md:hidden">
          <Button 
            className="w-12 h-12 rounded-full bg-[#009f3c] hover:bg-[#008a35] text-white shadow-lg p-0"
            title="Use My Location"
          >
            <Navigation className="w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            className="w-12 h-12 rounded-full bg-white shadow-lg p-0"
            title="Reset View"
          >
            <MapPin className="w-5 h-5" />
          </Button>
        </div>

        {/* Desktop Map Controls */}
        <div className="absolute bottom-4 right-4 hidden md:flex flex-col gap-2">
          <Button size="sm" variant="outline" className="bg-white w-10 h-10 p-0">+</Button>
          <Button size="sm" variant="outline" className="bg-white w-10 h-10 p-0">-</Button>
        </div>
      </div>
    </section>
  )
}