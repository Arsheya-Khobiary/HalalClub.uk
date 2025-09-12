'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Star } from 'lucide-react'
import { db, collection, addDoc, serverTimestamp, isDemoMode } from '@/lib/firebase'
import { toast } from 'sonner'

interface ReviewFormProps {
  restaurantId: string
  onReviewSubmitted: () => void
}

export function ReviewForm({ restaurantId, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [reviewerName, setReviewerName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!rating || !reviewText.trim() || !reviewerName.trim()) {
      toast.error('Please fill in all fields and select a rating')
      return
    }

    setIsSubmitting(true)
    try {
      // Save to Firebase (works in both demo and real mode)
      await addDoc(collection(db, 'restaurants', restaurantId, 'reviews'), {
        rating,
        text: reviewText.trim(),
        reviewerName: reviewerName.trim(),
        createdAt: serverTimestamp(),
      })
      
      toast.success(isDemoMode ? '✅ Review submitted (demo mode)!' : '✅ Review submitted successfully!')
      
      // Reset form
      setRating(0)
      setReviewText('')
      setReviewerName('')
      onReviewSubmitted()
      
    } catch (error) {
      console.error('Error submitting review:', error)
      toast.error('Failed to submit review. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="card-shell p-6">
      <h4 className="text-lg font-bold text-charcoal mb-4">✍️ Write a Review</h4>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Rating *</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 hover:scale-110 transition-transform"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Reviewer Name */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Your Name *</label>
          <input
            type="text"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            placeholder="Enter your name"
            className="foody-input w-full"
          />
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Your Review *</label>
          <Textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your experience at this restaurant..."
            className="foody-input min-h-[100px] resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !rating || !reviewText.trim() || !reviewerName.trim()}
          className="foody-button-primary w-full"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </div>
  )
} 
 