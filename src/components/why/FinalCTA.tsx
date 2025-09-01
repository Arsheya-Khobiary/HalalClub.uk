'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="bg-gradient-to-r from-primary via-emerald-600 to-primary">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            Ready to get found by halal food lovers?
          </h2>
          
          <Link href="/register">
            <Button className="inline-flex items-center justify-center rounded-2xl bg-white text-primary px-8 py-4 text-lg md:text-xl font-bold shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105">
              Register for £69/year
              <ArrowRight className="h-6 w-6 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
} 