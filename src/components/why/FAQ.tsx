'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function FAQ() {
  const faqs = [
    {
      question: "Is Halal Food Club only for the UK?",
      answer: "Yes, we're UK-first and expanding. We focus on serving the UK halal community with the best local restaurants and authentic cuisine experiences."
    },
    {
      question: "How do you verify halal?",
      answer: "We confirm via documentation and spot checks. Badge shown on approval. Our verification process includes checking halal certificates, supplier documentation, and conducting periodic reviews to ensure ongoing compliance."
    },
    {
      question: "Can I update my menu/photos anytime?",
      answer: "Yes, edits reflect after approval. You can update your menu items, prices, photos, and restaurant information through your dashboard. Changes are reviewed and go live within 24-48 hours."
    },
    {
      question: "Do you take a commission on orders?",
      answer: "No. Flat £69/year. Unlike delivery platforms that take 15-30% commission, we believe in transparent, fair pricing. Pay once annually and keep 100% of your revenue."
    },
    {
      question: "How long does approval take?",
      answer: "Typically 1–3 business days. Our team reviews your restaurant details, verifies halal certification, and ensures all information is accurate before your listing goes live."
    },
    {
      question: "What happens after I register?",
      answer: "After payment, your restaurant enters our review queue. Once approved, you'll appear on our map, in search results, and customers can view your full profile with menu, photos, and contact details."
    },
    {
      question: "Can customers leave reviews?",
      answer: "Yes! Customers can leave star ratings and written reviews. This builds trust and helps other halal food lovers discover your restaurant. You can respond to reviews to engage with your community."
    }
  ]

  return (
    <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-charcoal mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl md:text-2xl text-gray-600">
            Everything you need to know about joining Halal Food Club
          </p>
        </div>

        <div className="rounded-3xl border border-black/5 bg-white shadow-soft overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-100">
                <AccordionTrigger className="px-6 md:px-8 py-6 text-left hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-200">
                  <span className="text-lg md:text-xl font-bold text-charcoal pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 md:px-8 pb-6">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Trust Note */}
        <div className="mt-12 text-center">
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
            We support small businesses. Your data is protected and only used to power your listing.
          </p>
        </div>
      </div>
    </section>
  )
} 