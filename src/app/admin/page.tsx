'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Star, MapPin, Search, Plus, Edit2, Trash2, Shield, Lock, Clock, CheckCircle, XCircle, Users, Eye } from 'lucide-react'
import { Restaurant, Submission } from '@/types'
import { Header } from '@/components/Header'
import { db, collection, getDocs, doc, updateDoc, query, where, orderBy, addDoc, serverTimestamp } from '@/lib/firebase'
import { QueryDocumentSnapshot } from 'firebase/firestore'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const ADMIN_PIN = '123'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'live'>('pending')
  const queryClient = useQueryClient()

  // Check if already authenticated from localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem('admin-auth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true)
      localStorage.setItem('admin-auth', 'true')
      toast.success('Welcome, Admin!')
    } else {
      toast.error('Invalid PIN')
      setPin('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin-auth')
    setPin('')
    toast.success('Logged out successfully')
  }

  const handlePinInput = (digit: string) => {
    if (pin.length < 3) {
      setPin(pin + digit)
    }
  }

  const clearPin = () => {
    setPin('')
  }

  // Fetch submissions from Firebase
  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ['submissions'],
    queryFn: async () => {
      try {
        if (db) {
          // Get from Firebase
          const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'))
          const snapshot = await getDocs(q)
          const submissions: Submission[] = []
          snapshot.forEach((doc: QueryDocumentSnapshot) => {
            submissions.push({ id: doc.id, ...doc.data() } as Submission)
          })
          return submissions
        } else {
          // Fallback to localStorage
          await new Promise(resolve => setTimeout(resolve, 500))
          const storedSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]')
          return storedSubmissions.sort((a: any, b: any) => b.createdAt.seconds - a.createdAt.seconds)
        }
      } catch (error) {
        console.error('Error fetching submissions:', error)
        // Fallback to localStorage on error
        const storedSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]')
        return storedSubmissions.sort((a: any, b: any) => b.createdAt.seconds - a.createdAt.seconds)
      }
    },
    enabled: isAuthenticated,
  })

  // Fetch live restaurants from Firebase
  const { data: liveRestaurants = [] } = useQuery({
    queryKey: ['live-restaurants'],
    queryFn: async () => {
      try {
        if (db) {
          // Get from Firebase restaurants collection
          const q = query(collection(db, 'restaurants'), orderBy('createdAt', 'desc'))
          const snapshot = await getDocs(q)
          const restaurants: Restaurant[] = []
          snapshot.forEach((doc: QueryDocumentSnapshot) => {
            restaurants.push({ id: doc.id, ...doc.data() } as Restaurant)
          })
          return restaurants
        } else {
          // Fallback to localStorage
          await new Promise(resolve => setTimeout(resolve, 300))
          const storedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]')
          return storedRestaurants.sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
        }
      } catch (error) {
        console.error('Error fetching live restaurants:', error)
        const storedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]')
        return storedRestaurants.sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
      }
    },
    enabled: isAuthenticated,
  })

  // Update submission status with Firebase
  const updateSubmissionMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'approved' | 'rejected' }) => {
      try {
        if (db) {
          // Update in Firebase
          await updateDoc(doc(db, 'submissions', id), {
            status,
            updatedAt: serverTimestamp(),
          })
          
          // If approved, add to restaurants collection
          if (status === 'approved') {
            // Get the submission data
            const submissionDoc = await getDocs(query(collection(db, 'submissions'), where('__name__', '==', id)))
            if (!submissionDoc.empty) {
              const submissionData = submissionDoc.docs[0].data()
              
              // Create restaurant document
              const restaurant = {
                name: submissionData.name,
                cuisines: submissionData.cuisines,
                address: submissionData.address,
                postcode: submissionData.postcode,
                location: submissionData.location,
                phone: submissionData.phone,
                website: submissionData.website,
                halalCertified: submissionData.halalCertified,
                hygieneRating: submissionData.hygieneRating,
                openingHours: submissionData.openingHours,
                bestItems: submissionData.bestItems,
                menu: submissionData.menu,
                socials: submissionData.socials,
                gallery: submissionData.gallery,
                videos: submissionData.videos,
                certificates: submissionData.certificates,
                ratingAvg: 0,
                ratingCount: 0,
                verified: true,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                ownerUid: submissionData.ownerUid,
                verified: true,
              }
              
              // Add to restaurants collection
              await addDoc(collection(db, 'restaurants'), restaurant)
            }
          }
        } else {
          // Fallback to localStorage
          const storedSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]')
          const updatedSubmissions = storedSubmissions.map((sub: any) => 
            sub.id === id 
              ? { ...sub, status, updatedAt: { seconds: Math.floor(Date.now() / 1000) } }
              : sub
          )
          localStorage.setItem('submissions', JSON.stringify(updatedSubmissions))
          
          if (status === 'approved') {
            const approvedSubmission = storedSubmissions.find((sub: any) => sub.id === id)
            if (approvedSubmission) {
              const existingRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]')
              existingRestaurants.push({
                ...approvedSubmission,
                id: `restaurant_${Date.now()}`,
                ratingAvg: 0,
                ratingCount: 0,
                verified: true,
              })
              localStorage.setItem('restaurants', JSON.stringify(existingRestaurants))
            }
          }
        }
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))
      } catch (error) {
        console.error('Error updating submission:', error)
        throw error
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] })
      queryClient.invalidateQueries({ queryKey: ['restaurants'] }) // Refresh homepage data
      setSelectedSubmission(null)
      
      if (variables.status === 'approved') {
        toast.success('🎉 Restaurant approved and published to homepage!')
      } else {
        toast.success('❌ Submission rejected')
      }
    },
    onError: () => {
      toast.error('Failed to update submission')
    },
  })

  // PIN Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-display font-bold text-charcoal">
              Admin Access
            </CardTitle>
            <p className="text-base text-gray-600">
              Enter your PIN to access the admin dashboard
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handlePinSubmit} className="space-y-6">
              {/* PIN Display */}
              <div className="text-center">
                <div className="flex justify-center gap-3 mb-6">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center"
                    >
                      {pin[index] && (
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* PIN Keypad */}
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                  <Button
                    key={digit}
                    type="button"
                    variant="outline"
                    onClick={() => handlePinInput(digit.toString())}
                    className="h-14 text-xl font-semibold rounded-2xl hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    {digit}
                  </Button>
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={clearPin}
                  className="h-14 text-base font-medium rounded-2xl text-gray-500 hover:text-gray-700"
                >
                  Clear
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handlePinInput('0')}
                  className="h-14 text-xl font-semibold rounded-2xl hover:bg-primary hover:text-white transition-all duration-200"
                >
                  0
                </Button>
                <Button
                  type="submit"
                  disabled={pin.length !== 3}
                  className="h-14 text-base font-semibold rounded-2xl bg-primary text-white hover:bg-emerald-600 disabled:bg-gray-300 disabled:text-gray-500"
                >
                  <Lock className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-lg font-semibold text-charcoal">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  const pendingSubmissions = submissions.filter((s: Submission) => s.status === 'pending')
  const approvedSubmissions = submissions.filter((s: Submission) => s.status === 'approved')
  const rejectedSubmissions = submissions.filter((s: Submission) => s.status === 'rejected')

  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-charcoal">
              Admin Dashboard
            </h1>
            <p className="text-base md:text-lg text-gray-600 mt-2">
              Manage restaurant submissions and listings
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="foody-button-secondary"
          >
            <Lock className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          <div className="card-shell p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
                <p className="text-3xl md:text-4xl font-bold text-charcoal">{pendingSubmissions.length}</p>
              </div>
              <Clock className="h-12 w-12 text-yellow-500" />
            </div>
          </div>

          <div className="card-shell p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Approved</p>
                <p className="text-3xl md:text-4xl font-bold text-charcoal">{approvedSubmissions.length}</p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </div>

          <div className="card-shell p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Rejected</p>
                <p className="text-3xl md:text-4xl font-bold text-charcoal">{rejectedSubmissions.length}</p>
              </div>
              <XCircle className="h-12 w-12 text-red-500" />
            </div>
          </div>

          <div className="card-shell p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total</p>
                <p className="text-3xl md:text-4xl font-bold text-charcoal">{submissions.length}</p>
              </div>
              <Users className="h-12 w-12 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="card-shell">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-6">
              Restaurant Submissions
            </h2>
            
            <div className="w-full">
              <div className="inline-flex rounded-xl bg-gray-100 p-1 mb-6">
                <button 
                  onClick={() => setActiveTab('pending')}
                  className={`px-4 py-2 rounded-lg text-sm md:text-base transition-all duration-200 ${
                    activeTab === 'pending' ? 'bg-white shadow text-charcoal font-semibold' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Pending ({pendingSubmissions.length})
                </button>
                <button 
                  onClick={() => setActiveTab('approved')}
                  className={`px-4 py-2 rounded-lg text-sm md:text-base transition-all duration-200 ${
                    activeTab === 'approved' ? 'bg-white shadow text-charcoal font-semibold' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Approved ({approvedSubmissions.length})
                </button>
                <button 
                  onClick={() => setActiveTab('rejected')}
                  className={`px-4 py-2 rounded-lg text-sm md:text-base transition-all duration-200 ${
                    activeTab === 'rejected' ? 'bg-white shadow text-charcoal font-semibold' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Rejected ({rejectedSubmissions.length})
                </button>
                <button 
                  onClick={() => setActiveTab('live')}
                  className={`px-4 py-2 rounded-lg text-sm md:text-base transition-all duration-200 ${
                    activeTab === 'live' ? 'bg-white shadow text-charcoal font-semibold' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Live ({liveRestaurants.length})
                </button>
              </div>

              {activeTab === 'pending' && (
                <SubmissionsTable 
                  submissions={pendingSubmissions}
                  onView={setSelectedSubmission}
                  onApprove={(id) => updateSubmissionMutation.mutate({ id, status: 'approved' })}
                  onReject={(id) => updateSubmissionMutation.mutate({ id, status: 'rejected' })}
                />
              )}
              
              {activeTab === 'approved' && (
                <SubmissionsTable 
                  submissions={approvedSubmissions}
                  onView={setSelectedSubmission}
                />
              )}
              
              {activeTab === 'rejected' && (
                <SubmissionsTable 
                  submissions={rejectedSubmissions}
                  onView={setSelectedSubmission}
                />
              )}
              
              {activeTab === 'live' && (
                <div className="space-y-4">
                  {liveRestaurants.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-2xl">🍽️</span>
                      </div>
                      <h3 className="text-lg font-semibold text-charcoal mb-2">No Live Restaurants</h3>
                      <p className="text-base text-gray-600">No restaurants are currently live on the homepage</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {liveRestaurants.map((restaurant) => (
                        <div key={restaurant.id} className="card-shell p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-xl">🍽️</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-charcoal flex items-center gap-2">
                                {restaurant.name}
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </h3>
                              <p className="text-sm text-gray-600">{restaurant.address}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {restaurant.cuisines.map((cuisine) => (
                              <span key={cuisine} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                {cuisine}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              {restaurant.ratingCount} reviews
                            </span>
                            <span className="text-sm font-medium text-charcoal">
                              ⭐ {restaurant.ratingAvg.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto rounded-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                {selectedSubmission.name}
                <Badge variant={
                  selectedSubmission.status === 'approved' ? 'default' :
                  selectedSubmission.status === 'rejected' ? 'destructive' : 'secondary'
                }>
                  {selectedSubmission.status}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card-shell p-4">
                  <h4 className="font-bold text-charcoal mb-3">📍 Contact Information</h4>
                  <div className="space-y-2 text-sm md:text-base">
                    <p><strong>Address:</strong> {selectedSubmission.address}</p>
                    <p><strong>Postcode:</strong> {selectedSubmission.postcode}</p>
                    <p><strong>Phone:</strong> {selectedSubmission.phone}</p>
                    <p><strong>Email:</strong> {selectedSubmission.email}</p>
                    {selectedSubmission.website && (
                      <p><strong>Website:</strong> <a href={selectedSubmission.website} target="_blank" className="text-primary hover:underline">{selectedSubmission.website}</a></p>
                    )}
                    {selectedSubmission.openingHours && (
                      <p><strong>Hours:</strong> {selectedSubmission.openingHours}</p>
                    )}
                  </div>
                </div>
                
                <div className="card-shell p-4">
                  <h4 className="font-bold text-charcoal mb-3">🏷️ Restaurant Details</h4>
                  <div className="space-y-2 text-sm md:text-base">
                    <p><strong>Cuisines:</strong> {selectedSubmission.cuisines.join(', ')}</p>
                    <p><strong>Halal Certified:</strong> {selectedSubmission.halalCertified ? '✅ Yes' : '❌ No'}</p>
                    <p><strong>Hygiene Rating:</strong> {'⭐'.repeat(parseInt(selectedSubmission.hygieneRating || '0'))} ({selectedSubmission.hygieneRating}/5)</p>
                    <p><strong>Payment Status:</strong> {selectedSubmission.paid ? '💳 Paid' : '⏳ Pending'}</p>
                  </div>
                </div>

                <div className="card-shell p-4">
                  <h4 className="font-bold text-charcoal mb-3">📄 Certificates & Documents</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">📜</span>
                      <span className="text-sm">
                        <strong>Halal Certificate:</strong> {selectedSubmission.certificates?.halal || '❌ Not uploaded'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-accent">🏥</span>
                      <span className="text-sm">
                        <strong>Hygiene Certificate:</strong> {selectedSubmission.certificates?.hygiene || '❌ Not uploaded'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">📋</span>
                      <span className="text-sm">
                        <strong>Menu PDF:</strong> {selectedSubmission.certificates?.menuPdf || '❌ Not uploaded'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedSubmission.whyUs && (
                <div className="card-shell p-4">
                  <h4 className="font-bold text-charcoal mb-3">💬 Why Us</h4>
                  <p className="text-sm md:text-base text-gray-700">{selectedSubmission.whyUs}</p>
                </div>
              )}

              {/* Menu Items */}
              <div className="card-shell p-4">
                <h4 className="font-bold text-charcoal mb-3">🍽️ Menu Items</h4>
                <div className="space-y-4">
                  {selectedSubmission.menu.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h5 className="font-semibold text-primary mb-2">{section.section}</h5>
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex justify-between items-start p-3 bg-gray-50 rounded-xl">
                            <div>
                              <p className="font-medium text-charcoal">{item.name}</p>
                              <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                            <span className="font-bold text-primary">£{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Items */}
              <div className="card-shell p-4">
                <h4 className="font-bold text-charcoal mb-3">🔥 Best Selling Items</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedSubmission.bestItems.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🍽️</span>
                        </div>
                        <div>
                          <h6 className="font-semibold text-charcoal">{item.name}</h6>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          <p className="font-bold text-primary">£{item.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Uploaded Files */}
              {(selectedSubmission.uploadedFiles?.gallery.length > 0 || selectedSubmission.uploadedFiles?.bestItems.length > 0) && (
                <div className="card-shell p-4">
                  <h4 className="font-bold text-charcoal mb-3">📸 Uploaded Files</h4>
                  <div className="space-y-3">
                    {selectedSubmission.uploadedFiles?.gallery.length > 0 && (
                      <div>
                        <p className="font-medium text-charcoal mb-2">Gallery Images:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedSubmission.uploadedFiles.gallery.map((filename, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              📷 {filename}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedSubmission.uploadedFiles?.bestItems.length > 0 && (
                      <div>
                        <p className="font-medium text-charcoal mb-2">Best Item Images:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedSubmission.uploadedFiles.bestItems.map((filename, index) => (
                            <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              🍽️ {filename}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedSubmission.status === 'pending' && (
                <div className="flex gap-3">
                  <Button
                    onClick={() => updateSubmissionMutation.mutate({ 
                      id: selectedSubmission.id, 
                      status: 'approved' 
                    })}
                    disabled={updateSubmissionMutation.isPending}
                    className="foody-button-primary"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Approve Restaurant
                  </Button>
                  <Button
                    onClick={() => updateSubmissionMutation.mutate({ 
                      id: selectedSubmission.id, 
                      status: 'rejected' 
                    })}
                    disabled={updateSubmissionMutation.isPending}
                    className="foody-button-secondary text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

interface SubmissionsTableProps {
  submissions: Submission[]
  onView: (submission: Submission) => void
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
}

function SubmissionsTable({ submissions, onView, onApprove, onReject }: SubmissionsTableProps) {
  if (submissions.length === 0) {
    return (
      <div className="card-shell p-8 md:p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-2xl">📋</span>
        </div>
        <h3 className="text-xl font-bold text-charcoal mb-2">No Submissions</h3>
        <p className="text-base text-gray-600">No restaurant submissions found</p>
      </div>
    )
  }

  return (
    <div className="card-shell overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-100">
            <TableHead className="font-semibold text-charcoal">Restaurant</TableHead>
            <TableHead className="font-semibold text-charcoal">Location</TableHead>
            <TableHead className="font-semibold text-charcoal">Cuisines</TableHead>
            <TableHead className="font-semibold text-charcoal">Payment</TableHead>
            <TableHead className="font-semibold text-charcoal">Submitted</TableHead>
            <TableHead className="font-semibold text-charcoal">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission.id} className="border-gray-100 hover:bg-gray-50">
              <TableCell>
                <div>
                  <p className="font-semibold text-charcoal">{submission.name}</p>
                  <p className="text-sm text-gray-600">{submission.email}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">{submission.postcode}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {submission.cuisines.slice(0, 2).map((cuisine) => (
                    <span key={cuisine} className="cuisine-chip text-xs">
                      {cuisine}
                    </span>
                  ))}
                  {submission.cuisines.length > 2 && (
                    <span className="cuisine-chip text-xs">
                      +{submission.cuisines.length - 2}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={submission.paid ? 'halal-badge' : 'trending-badge'}>
                  {submission.paid ? '💳 Paid' : '⏳ Pending'}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">
                  {new Date(submission.createdAt.seconds * 1000).toLocaleDateString()}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(submission)}
                    className="h-10 w-10 rounded-xl hover:bg-gray-100"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {onApprove && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onApprove(submission.id)}
                      className="h-10 w-10 rounded-xl hover:bg-green-50"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </Button>
                  )}
                  {onReject && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onReject(submission.id)}
                      className="h-10 w-10 rounded-xl hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 