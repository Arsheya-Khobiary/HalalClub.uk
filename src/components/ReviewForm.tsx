import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Star, Camera, X } from "lucide-react"
import { useState } from "react"

interface ReviewFormProps {
  restaurantName: string
  onSubmit: (review: {
    name: string
    rating: number
    comment: string
    image?: string
  }) => void
  onCancel: () => void
}

export function ReviewForm({ restaurantName, onSubmit, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [image, setImage] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0 || !name.trim() || !comment.trim()) return

    onSubmit({
      name: name.trim(),
      rating,
      comment: comment.trim(),
      image: image || undefined
    })

    // Reset form
    setRating(0)
    setHoveredRating(0)
    setName("")
    setComment("")
    setImage(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
  }

  const isValid = rating > 0 && name.trim() && comment.trim()

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span>Write a Review for {restaurantName}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <Label className="text-base font-medium mb-2 block">Your Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="reviewerName">Your Name</Label>
            <Input
              id="reviewerName"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
              maxLength={50}
            />
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="reviewComment">Your Review</Label>
            <Textarea
              id="reviewComment"
              placeholder="Tell others about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-1 min-h-[100px]"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {comment.length}/500 characters
            </p>
          </div>

          {/* Photo Upload */}
          <div>
            <Label>Add a Photo (Optional)</Label>
            {!image ? (
              <div className="mt-1">
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#dc2626] transition-colors cursor-pointer">
                    <Camera className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to add a photo</p>
                  </div>
                </label>
              </div>
            ) : (
              <div className="mt-1 relative inline-block">
                <img
                  src={image}
                  alt="Review photo"
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              className="flex-1 bg-[#dc2626] hover:bg-[#b91c1c] text-white"
            >
              Submit Review
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}