import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Checkbox } from "./ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Upload, MapPin, Star, Users, TrendingUp } from "lucide-react"
import { useState } from "react"

export function BusinessRegistration() {
  const [formData, setFormData] = useState({
    restaurantName: "",
    cuisineType: "",
    address: "",
    postcode: "",
    phone: "",
    email: "",
    website: "",
    whySpecial: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    facebook: "",
    halalCertified: false
  })

  const cuisineTypes = [
    "Turkish", "Middle Eastern", "Pakistani", "Indian", "Bangladeshi", 
    "Arabic", "Mediterranean", "Fast Food", "Pizza", "Chinese", "Other"
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <section id="business-registration" className="py-16 px-4 bg-gradient-to-br from-green-50 to-yellow-50">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Grow Your Business with Halal Food Club
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Get featured on the UK's #1 halal food discovery hub. Only £69/year.
          </p>
          
          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <MapPin className="w-8 h-8 text-[#009f3c] mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Get Discovered</h3>
              <p className="text-sm text-gray-600">Appear on our interactive map and search results</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Users className="w-8 h-8 text-[#f5b301] mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Reach More Customers</h3>
              <p className="text-sm text-gray-600">Connect with halal food enthusiasts nationwide</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <TrendingUp className="w-8 h-8 text-[#009f3c] mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Boost Reviews</h3>
              <p className="text-sm text-gray-600">Build trust with authentic customer reviews</p>
            </div>
          </div>

          <Button className="bg-gradient-to-r from-[#009f3c] to-[#00b444] hover:from-[#008a35] hover:to-[#009f3c] text-white px-8 py-3 rounded-full text-lg">
            Register Your Restaurant
          </Button>
        </div>

        {/* Registration Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-[#009f3c] text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">Restaurant Registration Form</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="restaurantName">Restaurant Name *</Label>
                  <Input
                    id="restaurantName"
                    placeholder="e.g., Al-Madina Turkish Grill"
                    value={formData.restaurantName}
                    onChange={(e) => handleInputChange("restaurantName", e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="cuisineType">Cuisine Type *</Label>
                  <Select onValueChange={(value) => handleInputChange("cuisineType", value)}>
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
                <h3 className="font-semibold text-lg text-[#009f3c]">Location Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Full Address *</Label>
                    <Input
                      id="address"
                      placeholder="123 High Street, Birmingham"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="mt-1"
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
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-[#009f3c]">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="+44 121 123 4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="mt-1"
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
              </div>

              {/* Menu Upload */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-[#009f3c]">Menu & Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Upload Menu (PDF or Images)</Label>
                    <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#009f3c] transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Upload Food Photos</Label>
                    <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#009f3c] transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Upload your best dishes</p>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB each</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Special */}
              <div>
                <Label htmlFor="whySpecial">Why is your restaurant special? *</Label>
                <Textarea
                  id="whySpecial"
                  placeholder="Tell us what makes your restaurant unique - authentic recipes, family traditions, special ingredients, atmosphere, etc."
                  value={formData.whySpecial}
                  onChange={(e) => handleInputChange("whySpecial", e.target.value)}
                  className="mt-1 min-h-[100px]"
                />
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-[#009f3c]">Social Media Links (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      placeholder="@yourrestaurant"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange("instagram", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tiktok">TikTok</Label>
                    <Input
                      id="tiktok"
                      placeholder="@yourrestaurant"
                      value={formData.tiktok}
                      onChange={(e) => handleInputChange("tiktok", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input
                      id="youtube"
                      placeholder="Your Channel Name"
                      value={formData.youtube}
                      onChange={(e) => handleInputChange("youtube", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      placeholder="Your Page Name"
                      value={formData.facebook}
                      onChange={(e) => handleInputChange("facebook", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Halal Certification */}
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="halalCertified"
                    checked={formData.halalCertified}
                    onCheckedChange={(checked) => handleInputChange("halalCertified", checked as boolean)}
                    className="mt-1"
                  />
                  <div>
                    <Label htmlFor="halalCertified" className="font-semibold text-[#009f3c]">
                      ✅ I confirm this restaurant is halal certified *
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      By checking this box, you confirm that your restaurant serves only halal food according to Islamic dietary laws.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-gradient-to-r from-[#009f3c] to-[#00b444] rounded-lg p-6 text-white">
                <h3 className="font-semibold text-xl mb-4">Complete Your Registration</h3>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-lg">Annual Listing Fee</p>
                    <p className="text-sm opacity-90">Includes full profile, map listing, and review system</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">£69</p>
                    <p className="text-sm opacity-90">/year</p>
                  </div>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-white text-[#009f3c] hover:bg-gray-100 font-semibold py-3 text-lg"
                  disabled={!formData.halalCertified}
                >
                  💳 Pay & Submit Application
                </Button>
                
                <p className="text-center text-sm mt-3 opacity-90">
                  Secure payment via Stripe. Your listing will be reviewed within 24 hours.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Admin Dashboard Info */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-3">What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#009f3c] text-white rounded-full flex items-center justify-center text-xs font-semibold">1</div>
              <div>
                <p className="font-medium">Application Review</p>
                <p className="text-gray-600">Our team reviews your submission within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#f5b301] text-white rounded-full flex items-center justify-center text-xs font-semibold">2</div>
              <div>
                <p className="font-medium">Profile Setup</p>
                <p className="text-gray-600">We create your restaurant profile and add it to our map</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#009f3c] text-white rounded-full flex items-center justify-center text-xs font-semibold">3</div>
              <div>
                <p className="font-medium">Go Live!</p>
                <p className="text-gray-600">Your restaurant appears in search results and starts receiving customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}