'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function Showcase() {
  const bestSellers = [
    { name: "Lamb Biryani", price: "£12.99", image: "https://images.unsplash.com/photo-1563379091339-03246963d293?w=300" },
    { name: "Mixed Grill", price: "£18.99", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300" },
    { name: "Chicken Karahi", price: "£10.99", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300" }
  ]

  const reviews = [
    { name: "Sarah M.", rating: 5, text: "Amazing food and great service! The lamb biryani was exceptional." },
    { name: "Ahmed K.", rating: 5, text: "Best halal food in Birmingham. Family-friendly atmosphere." },
    { name: "Fatima S.", rating: 4, text: "Fresh ingredients and authentic flavors. Highly recommended!" }
  ]

  return (
    <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Best Sellers Carousel */}
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal">
            Showcase your best sellers
          </h2>
          
          <div className="space-y-6">
            {bestSellers.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-soft hover:shadow-soft-lg transition-all duration-200 border border-black/5">
                <div className="w-20 h-20 rounded-xl overflow-hidden ring-1 ring-black/5">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-charcoal">{item.name}</h4>
                  <p className="text-primary font-bold text-xl">{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/">
            <Button variant="ghost" className="group">
              View sample profile
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Right: Reviews */}
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal">
            Build trust with reviews
          </h2>
          
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white shadow-soft border border-black/5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-charcoal">{review.name}</span>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 