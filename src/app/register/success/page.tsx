'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, Mail, ArrowRight } from 'lucide-react'
import { Header } from '@/components/Header'

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    if (sessionId) {
      // In a real app, you might want to verify the session with Stripe
      setIsVerified(true)
    }
  }, [sessionId])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-primary">
                  Payment Successful!
                </CardTitle>
                <p className="text-muted-foreground">
                  Thank you for registering with Halal Food Club
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="bg-background rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">Under Review</h3>
                      <p className="text-sm text-muted-foreground">
                        Your restaurant submission is now being reviewed by our team
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">Email Confirmation</h3>
                      <p className="text-sm text-muted-foreground">
                        You'll receive an email confirmation within 24-48 hours
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    <strong>What happens next?</strong>
                  </p>
                  <ul className="text-left space-y-1 max-w-md mx-auto">
                    <li>• Our team reviews your restaurant details</li>
                    <li>• We verify your halal certification</li>
                    <li>• Your listing goes live on our platform</li>
                    <li>• You start receiving customer inquiries</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Browse Restaurants
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button className="w-full sm:w-auto">
                      Contact Support
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                {sessionId && (
                  <div className="text-xs text-muted-foreground border-t pt-4">
                    <p>Payment ID: {sessionId}</p>
                    <p>Keep this for your records</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  )
} 