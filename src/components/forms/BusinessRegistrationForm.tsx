'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Upload, X, Plus, ArrowLeft, ArrowRight, CreditCard } from 'lucide-react'
import { toast } from 'sonner'
import { generateSearchStats, getAreaFromPostcode, isValidUKPostcode } from '@/lib/searchStats'

const cuisineOptions = [
  'Pakistani', 'Indian', 'Turkish', 'Lebanese', 'Moroccan', 'Persian',
  'Egyptian', 'Syrian', 'Bangladeshi', 'Malaysian', 'Indonesian', 'Other'
]

const submissionSchema = z.object({
  name: z.string().min(2, 'Restaurant name is required'),
  cuisines: z.array(z.string()).min(1, 'Select at least one cuisine'),
  address: z.string().min(5, 'Full address is required'),
  postcode: z.string().min(5, 'Valid postcode is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  website: z.string().url().optional().or(z.literal('')),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
  facebook: z.string().optional(),
  whyUs: z.string().min(20, 'Tell us why you should be featured (min 20 characters)'),
  halalCertified: z.boolean().refine(val => val === true, 'You must confirm halal certification'),
  hygieneRating: z.string().min(1, 'Hygiene rating is required'),
  openingHours: z.string().optional(),
})

type SubmissionData = z.infer<typeof submissionSchema>

const steps = [
  { id: 1, title: 'Basic Info', description: 'Restaurant details' },
  { id: 2, title: 'Menu & Items', description: 'Upload your offerings' },
  { id: 3, title: 'Media & Social', description: 'Photos and social links' },
  { id: 4, title: 'Payment', description: 'Complete registration' },
]

export function BusinessRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [bestItems, setBestItems] = useState<Array<{ name: string; price: string; description: string; file?: File }>>([])
  const [menuFile, setMenuFile] = useState<File | null>(null)
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])
  const [halalCertificateFile, setHalalCertificateFile] = useState<File | null>(null)
  const [hygieneCertificateFile, setHygieneCertificateFile] = useState<File | null>(null)
  const [menuItems, setMenuItems] = useState<Array<{ section: string; name: string; price: string; description: string }>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [postcodeStats, setPostcodeStats] = useState<{ searches: number; area: string } | null>(null)

  const form = useForm<SubmissionData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      cuisines: [],
      halalCertified: false,
    },
  })

  const progress = (currentStep / steps.length) * 100

  const addBestItem = () => {
    setBestItems([...bestItems, { name: '', price: '', description: '' }])
  }

  const removeBestItem = (index: number) => {
    setBestItems(bestItems.filter((_, i) => i !== index))
  }

  const updateBestItem = (index: number, field: string, value: string | File) => {
    const updated = [...bestItems]
    updated[index] = { ...updated[index], [field]: value }
    setBestItems(updated)
  }

  const addMenuItem = () => {
    setMenuItems([...menuItems, { section: 'Main Course', name: '', price: '', description: '' }])
  }

  const removeMenuItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index))
  }

  const updateMenuItem = (index: number, field: string, value: string) => {
    const updated = [...menuItems]
    updated[index] = { ...updated[index], [field]: value }
    setMenuItems(updated)
  }

  const handleCuisineToggle = (cuisine: string) => {
    const updated = selectedCuisines.includes(cuisine)
      ? selectedCuisines.filter(c => c !== cuisine)
      : [...selectedCuisines, cuisine]
    setSelectedCuisines(updated)
    form.setValue('cuisines', updated)
  }

  const handlePostcodeChange = (value: string) => {
    form.setValue('postcode', value)
    
    // Only generate stats for valid UK postcodes
    if (isValidUKPostcode(value)) {
      const searches = generateSearchStats(value)
      const area = getAreaFromPostcode(value)
      setPostcodeStats({ searches, area })
    } else {
      setPostcodeStats(null)
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: SubmissionData) => {
    setIsSubmitting(true)
    try {
      // Create submission ID
      const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substring(2)}`
      
      // Create submission data with defaults for demo
      const submissionData = {
        id: submissionId,
        name: data.name || 'Demo Restaurant',
        cuisines: selectedCuisines.length > 0 ? selectedCuisines : ['Pakistani'],
        address: data.address || '123 Demo Street, Birmingham',
        postcode: data.postcode || 'B1 1AA',
        phone: data.phone || '0121 123 4567',
        email: data.email || 'demo@restaurant.com',
        website: data.website || '',
        instagram: data.instagram || '',
        tiktok: data.tiktok || '',
        youtube: data.youtube || '',
        facebook: data.facebook || '',
        whyUs: data.whyUs || 'We serve amazing halal food!',
        halalCertified: data.halalCertified !== false, // Default to true for demo
        hygieneRating: data.hygieneRating || '5',
        openingHours: data.openingHours || 'Mon-Sun: 12:00-22:00',
        status: 'pending' as const,
        paid: false,
        bestItems: bestItems.length > 0 ? bestItems.map((item, index) => ({
          id: `item_${index}`,
          name: item.name || `Best Item ${index + 1}`,
          price: parseFloat(item.price) || 12.99,
          imageUrl: '/placeholder-restaurant.jpg', // In real app, upload files
          description: item.description || 'Delicious halal dish',
        })) : [
          {
            id: 'demo_item_1',
            name: 'Signature Dish',
            price: 15.99,
            imageUrl: '/placeholder-restaurant.jpg',
            description: 'Our most popular halal dish'
          }
        ],
        menu: menuItems.length > 0 ? 
          // Group menu items by section
          Object.entries(
            menuItems.reduce((acc, item) => {
              if (!acc[item.section]) acc[item.section] = []
              acc[item.section].push({
                name: item.name || 'Menu Item',
                price: parseFloat(item.price) || 10.99,
                description: item.description || 'Delicious halal dish'
              })
              return acc
            }, {} as Record<string, any[]>)
          ).map(([section, items]) => ({ section, items }))
        : [
          {
            section: 'Main Course',
            items: [
              { name: 'Chicken Biryani', price: 12.99, description: 'Aromatic rice with tender chicken' },
              { name: 'Lamb Karahi', price: 14.99, description: 'Traditional curry with fresh herbs' }
            ]
          }
        ],
        certificates: {
          halal: halalCertificateFile?.name || null,
          hygiene: hygieneCertificateFile?.name || null,
          menuPdf: menuFile?.name || null,
        },
        uploadedFiles: {
          gallery: galleryFiles.map(f => f.name),
          bestItems: bestItems.map(item => item.file?.name).filter(Boolean),
        },
        socials: {
          instagram: data.instagram,
          tiktok: data.tiktok,
          youtube: data.youtube,
          facebook: data.facebook,
        },
        gallery: ['/placeholder-restaurant.jpg'], // In real app, upload files
        videos: [],
        location: { latitude: 52.5074, longitude: -1.1278 }, // Default to Birmingham
        ownerUid: `owner_${Date.now()}`,
        createdAt: { seconds: Math.floor(Date.now() / 1000) } as any,
        updatedAt: { seconds: Math.floor(Date.now() / 1000) } as any,
      }

      // Store in localStorage for demo (in real app, save to Firestore)
      const existingSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]')
      
      // Mark as paid for demo purposes (simulate Stripe success)
      submissionData.paid = true
      
      existingSubmissions.push(submissionData)
      localStorage.setItem('submissions', JSON.stringify(existingSubmissions))

      // Simulate payment success and redirect
      toast.success('✅ Payment completed! Registration submitted for review.')
      
      // Wait a moment then redirect to success page
      setTimeout(() => {
        window.location.href = '/register/success?session_id=demo_session_' + submissionId
      }, 1000)
      
    } catch (error) {
      console.error('Submission error:', error)
      toast.error('Failed to process registration. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restaurant Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Al-Madina Restaurant" className="foody-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel className="text-base md:text-lg font-semibold text-charcoal">Cuisine Types *</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                {cuisineOptions.map((cuisine) => (
                  <button
                    key={cuisine}
                    type="button"
                    className={`cuisine-chip text-center py-3 ${
                      selectedCuisines.includes(cuisine) ? 'cuisine-chip-active' : ''
                    }`}
                    onClick={() => handleCuisineToggle(cuisine)}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
              {form.formState.errors.cuisines && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.cuisines.message}
                </p>
              )}
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Address *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="123 High Street, Birmingham"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="postcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postcode *</FormLabel>
                    <FormControl>
                      <div>
                        <div className="relative">
                          <Input 
                            placeholder="B1 1AA" 
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              handlePostcodeChange(e.target.value)
                            }}
                            className={`foody-input ${
                              field.value && isValidUKPostcode(field.value) 
                                ? 'border-green-300 focus:border-green-500 focus:ring-green-200' 
                                : field.value && field.value.length > 2
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                : ''
                            }`}
                          />
                          {field.value && isValidUKPostcode(field.value) && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <span className="text-green-500 text-lg">✅</span>
                            </div>
                          )}
                        </div>
                        
                        {postcodeStats && (
                          <div className="mt-3 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20 animate-in slide-in-from-top-2 duration-300">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xl">🔥</span>
                              <p className="text-sm font-bold text-primary">
                                High Demand Area!
                              </p>
                            </div>
                            <p className="text-sm md:text-base text-charcoal font-medium">
                              <strong className="text-primary">{postcodeStats.searches.toLocaleString()}</strong> halal food searches from <strong className="text-charcoal">{postcodeStats.area}</strong> in the last 30 days
                            </p>
                            <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                              <span>💡</span>
                              <span>Don't miss out on these hungry customers!</span>
                            </p>
                          </div>
                        )}
                        
                        {field.value && field.value.length > 2 && !isValidUKPostcode(field.value) && (
                          <p className="text-xs text-gray-500 mt-2">
                            Please enter a valid UK postcode (e.g., B1 1AA, M1 2AB, E7 8JF)
                          </p>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="0121 123 4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="info@restaurant.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://restaurant.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hygieneRating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Hygiene Rating *</FormLabel>
                    <FormControl>
                      <select {...field} className="foody-input">
                        <option value="">Select rating</option>
                        <option value="5">⭐⭐⭐⭐⭐ (5 - Very Good)</option>
                        <option value="4">⭐⭐⭐⭐ (4 - Good)</option>
                        <option value="3">⭐⭐⭐ (3 - Generally Satisfactory)</option>
                        <option value="2">⭐⭐ (2 - Improvement Necessary)</option>
                        <option value="1">⭐ (1 - Major Improvement Necessary)</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="openingHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opening Hours</FormLabel>
                    <FormControl>
                      <Input placeholder="Mon-Sun: 12:00-22:00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <FormLabel>Menu Upload</FormLabel>
              <div className="mt-2">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {menuFile ? menuFile.name : 'Upload your menu (PDF)'}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={(e) => setMenuFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <FormLabel>Best Selling Items</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={addBestItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
              
              <div className="space-y-4">
                {bestItems.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Item {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBestItem(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Item name"
                          value={item.name}
                          onChange={(e) => updateBestItem(index, 'name', e.target.value)}
                        />
                        <Input
                          placeholder="Price (£)"
                          value={item.price}
                          onChange={(e) => updateBestItem(index, 'price', e.target.value)}
                        />
                      </div>
                      
                      <Textarea
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateBestItem(index, 'description', e.target.value)}
                        className="mt-4"
                      />
                      
                      <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-primary/30 rounded-2xl cursor-pointer hover:bg-primary/5 transition-all duration-200 mt-4">
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="h-6 w-6 mb-1 text-primary" />
                          <p className="text-xs text-charcoal font-medium">
                            {item.file ? `📷 ${item.file.name}` : 'Upload image'}
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => updateBestItem(index, 'file', e.target.files?.[0] || '')}
                        />
                      </label>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Detailed Menu Items */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <FormLabel className="text-base md:text-lg font-semibold text-charcoal">Menu Items</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={addMenuItem} className="foody-button-secondary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Menu Item
                </Button>
              </div>
              
              <div className="space-y-4">
                {menuItems.map((item, index) => (
                  <div key={index} className="card-shell p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-charcoal">Menu Item {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMenuItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                        value={item.section}
                        onChange={(e) => updateMenuItem(index, 'section', e.target.value)}
                        className="foody-input"
                      >
                        <option value="Starters">🥗 Starters</option>
                        <option value="Main Course">🍽️ Main Course</option>
                        <option value="Desserts">🍰 Desserts</option>
                        <option value="Drinks">🥤 Drinks</option>
                        <option value="Specials">⭐ Specials</option>
                      </select>
                      
                      <Input
                        placeholder="Item name"
                        value={item.name}
                        onChange={(e) => updateMenuItem(index, 'name', e.target.value)}
                        className="foody-input"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <Input
                        placeholder="Price (£)"
                        value={item.price}
                        onChange={(e) => updateMenuItem(index, 'price', e.target.value)}
                        className="foody-input"
                      />
                      
                      <Input
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateMenuItem(index, 'description', e.target.value)}
                        className="foody-input"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormLabel className="text-base font-semibold text-charcoal">Halal Certificate *</FormLabel>
                <div className="mt-2">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/30 rounded-2xl cursor-pointer hover:bg-primary/5 transition-all duration-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 mb-2 text-primary" />
                      <p className="text-sm text-charcoal font-medium">
                        {halalCertificateFile ? halalCertificateFile.name : 'Upload Halal Certificate'}
                      </p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setHalalCertificateFile(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
              </div>

              <div>
                <FormLabel className="text-base font-semibold text-charcoal">Food Hygiene Certificate</FormLabel>
                <div className="mt-2">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-accent/30 rounded-2xl cursor-pointer hover:bg-accent/5 transition-all duration-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 mb-2 text-accent" />
                      <p className="text-sm text-charcoal font-medium">
                        {hygieneCertificateFile ? hygieneCertificateFile.name : 'Upload Hygiene Certificate'}
                      </p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setHygieneCertificateFile(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <FormLabel>Gallery Images</FormLabel>
              <div className="mt-2">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Upload restaurant photos (multiple files)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={(e) => setGalleryFiles(Array.from(e.target.files || []))}
                  />
                </label>
              </div>
              {galleryFiles.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-charcoal mb-2">
                    📷 {galleryFiles.length} image{galleryFiles.length !== 1 ? 's' : ''} selected:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {galleryFiles.map((file, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {file.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input placeholder="@restaurant_name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tiktok"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TikTok</FormLabel>
                    <FormControl>
                      <Input placeholder="@restaurant_name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="youtube"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube</FormLabel>
                    <FormControl>
                      <Input placeholder="Channel URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input placeholder="Page URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="whyUs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why should we feature your restaurant? *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us what makes your restaurant special..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Annual Membership - £69/year
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Halal Food Club Business Listing</span>
                    <span className="font-bold">£69.00</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>✓ Featured on interactive map</p>
                    <p>✓ Full restaurant profile</p>
                    <p>✓ Menu and gallery display</p>
                    <p>✓ Customer reviews system</p>
                    <p>✓ Social media integration</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <FormField
              control={form.control}
              name="halalCertified"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium">
                      I confirm this restaurant is halal certified *
                    </FormLabel>
                    <p className="text-xs text-muted-foreground">
                      By checking this box, you certify that your restaurant serves only halal food
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Step Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-sm md:text-base">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-3">
                <div className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                  step.id <= currentStep ? 'bg-primary' : 'bg-gray-300'
                }`} />
                <span className={`font-medium ${
                  step.id <= currentStep ? 'text-primary' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className="h-px w-8 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2 bg-gray-100" />
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="foody-button-secondary"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button type="button" onClick={nextStep} className="foody-button-primary">
              Next Step
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="foody-button-primary text-lg font-bold shadow-lg min-w-[200px]"
            >
              {isSubmitting ? 'Processing...' : '💳 Pay £69 & Submit'}
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
} 