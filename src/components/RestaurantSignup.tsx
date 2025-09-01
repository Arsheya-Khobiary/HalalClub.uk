import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Checkbox } from "./ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Upload, MapPin, Star, Users, TrendingUp, Camera, FileText } from "lucide-react"
import { useState } from "react"

export function RestaurantSignup() {
  const [formData, setFormData] = useState({
    restaurantName: "",
    cuisineType: "",
    address: "",
    postcode: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    instagram: "",
    halalCertified: false,
    agreeTerms: false
  })

  const cuisineTypes = [
    "Turkish", "Middle Eastern", "Pakistani", "Indian", "Bangladeshi", 
    "Arabic", "Mediterranean", "Fast Food", "Pizza", "Chinese", "Other"
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            List Your Halal Restaurant
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Join the UK's fastest-growing halal food discovery platform
          </p>
          
          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <MapPin className="w-6 h-6 text-[#dc2626] mx-auto mb-2" />
              <h3 className="font-semibold mb-1 text-sm">Get Discovered</h3>
              <p className="text-xs text-gray-600">Appear on our map and search results</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <Users className="w-6 h-6 text-[#dc2626] mx-auto mb-2" />
              <h3 className="font-semibold mb-1 text-sm">Reach Customers</h3>
              <p className="text-xs text-gray-600">Connect with halal food lovers</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <TrendingUp className="w-6 h-6 text-[#dc2626] mx-auto mb-2" />
              <h3 className="font-semibold mb-1 text-sm">Grow Reviews</h3>
              <p className="text-xs text-gray-600">Build trust with authentic reviews</p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-[#dc2626] text-white rounded-t-lg">
            <CardTitle className="text-xl text-center">Restaurant Registration</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="restaurantName">Restaurant Name *</Label>
                  <Input
                    id="restaurantName"
                    placeholder="e.g., Al-Madina Turkish Grill"
                    value={formData.restaurantName}
                    onChange={(e) => handleInputChange("restaurantName", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="cuisineType">Cuisine Type *</Label>
                  <Select onValueChange={(value) => handleInputChange("cuisineType", value)} required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select cuisine type" />
                    </SelectTrigger>
                    <SelectContent>
                      {cuisineTypes.map((cuisine) => (
                        <SelectItem key={cuisine} value={cuisine.toLowerCase()}>
                          {cuisine}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-[#dc2626]">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Full Address *</Label>
                    <Input
                      id="address"
                      placeholder="123 High Street, Birmingham"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postcode">Postcode *</Label>
                    <Input
                      id="postcode"
                      placeholder="B1 1AA"
                      value={formData.postcode}
                      onChange={(e) => handleInputChange("postcode", e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
                
                {/* Map Pin Preview */}
                <div className="bg-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Your restaurant will appear here on the map</p>
                    <p className="text-xs text-gray-500 mt-1">Pin location will auto-populate from your address</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-[#dc2626]">Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="+44 121 123 4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="info@yourrestaurant.co.uk"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    placeholder="https://yourrestaurant.co.uk"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram (Optional)</Label>
                  <Input
                    id="instagram"
                    placeholder="@yourrestaurant"
                    value={formData.instagram}
                    onChange={(e) => handleInputChange("instagram", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Menu & Images */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-[#dc2626]">Menu & Photos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Upload Menu</Label>
                    <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#dc2626] transition-colors cursor-pointer">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Upload your menu</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Upload Food Photos</Label>
                    <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#dc2626] transition-colors cursor-pointer">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Add your best dishes</p>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB each</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Why choose your restaurant? *</Label>
                <Textarea
                  id="description"
                  placeholder="Tell customers what makes your restaurant special - authentic recipes, family traditions, atmosphere, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="mt-1 min-h-[80px]"
                  required
                />
              </div>

              {/* Certifications */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-[#dc2626]">Certifications</h3>
                
                {/* Halal Certification */}
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="halalCertified"
                      checked={formData.halalCertified}
                      onCheckedChange={(checked) => handleInputChange("halalCertified", checked as boolean)}
                      className="mt-1"
                      required
                    />
                    <div>
                      <Label htmlFor="halalCertified" className="font-semibold text-[#dc2626]">
                        ✓ I confirm this restaurant serves halal food *
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        By checking this, you confirm your restaurant serves halal food according to Islamic dietary laws.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hygiene Rating Upload */}
                <div>
                  <Label>Food Hygiene Rating Certificate</Label>
                  <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#dc2626] transition-colors cursor-pointer">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload your Food Standards Agency rating</p>
                    <p className="text-xs text-gray-500 mt-1">PDF or image format</p>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                    className="mt-1"
                    required
                  />
                  <div>
                    <Label htmlFor="agreeTerms" className="font-medium">
                      I agree to the terms and conditions *
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      By submitting, you agree to our platform terms and that all information provided is accurate.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button 
                  type="submit"
                  className="w-full md:w-auto bg-[#dc2626] hover:bg-[#b91c1c] text-white px-8 py-3 text-lg"
                  disabled={!formData.halalCertified || !formData.agreeTerms}
                >
                  Submit Restaurant for Review
                </Button>
                
                <p className="text-sm text-gray-500 mt-3">
                  We'll review your submission within 24 hours and contact you via email.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Process Steps */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4 text-center">What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="w-8 h-8 bg-[#dc2626] text-white rounded-full flex items-center justify-center text-xs font-semibold mx-auto mb-2">1</div>
              <p className="font-medium">Review</p>
              <p className="text-gray-600">We review your details within 24 hours</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-[#dc2626] text-white rounded-full flex items-center justify-center text-xs font-semibold mx-auto mb-2">2</div>
              <p className="font-medium">Setup</p>
              <p className="text-gray-600">Your restaurant appears on our map</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-[#dc2626] text-white rounded-full flex items-center justify-center text-xs font-semibold mx-auto mb-2">3</div>
              <p className="font-medium">Go Live</p>
              <p className="text-gray-600">Start receiving customers and reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}