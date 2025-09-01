import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Hero } from '@/components/why/Hero'
import { ValuePillars } from '@/components/why/ValuePillars'
import { Metrics } from '@/components/why/Metrics'
import { Showcase } from '@/components/why/Showcase'
import { HowItWorks } from '@/components/why/HowItWorks'
import { PricingBanner } from '@/components/why/PricingBanner'
import { FAQ } from '@/components/why/FAQ'
import { FinalCTA } from '@/components/why/FinalCTA'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Why Us — Halal Food Club (UK)',
  description: 'Get your halal restaurant discovered. Verified badge, menus, best sellers, galleries — all for £69/year.',
  keywords: ['halal restaurant marketing', 'uk halal directory', 'restaurant listing', 'halal certification'],
  openGraph: {
    title: 'Why Choose Halal Food Club for Your Restaurant',
    description: 'Join the UK\'s premier halal restaurant directory. Get discovered by thousands of hungry customers.',
    type: 'website',
  },
}

export default function WhyUsPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Halal Food Club",
            url: "https://halalfoodclub.uk",
            logo: "https://halalfoodclub.uk/logo.png",
            description: "UK's premier halal restaurant discovery platform",
            sameAs: [
              "https://instagram.com/halalfoodclub",
              "https://tiktok.com/@halalfoodclub"
            ],
            offers: {
              "@type": "Offer",
              name: "Restaurant Listing Membership",
              price: "69",
              priceCurrency: "GBP",
              description: "Annual restaurant listing with verified halal badge"
            }
          })
        }}
      />

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <Hero />
          <ValuePillars />
          <Metrics />
          <Showcase />
          <HowItWorks />
          <PricingBanner />
          <FAQ />
          <FinalCTA />
        </main>

        {/* Simple Footer */}
        <footer className="bg-charcoal text-white py-6">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-300 text-sm md:text-base">
                &copy; 2024 Halal Food Club. All rights reserved.
              </p>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <a href="mailto:hello@halalfoodclub.uk" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </a>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors text-xs">
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
} 