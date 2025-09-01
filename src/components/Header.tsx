'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-black/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Halal Food Club"
              width={48}
              height={48}
              className="h-12 w-auto md:h-14"
            />
            <span className="font-display font-bold text-xl md:text-2xl tracking-tight text-charcoal">
              Halal Food Club
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link 
              href="/" 
              className="text-sm md:text-base font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              Home
            </Link>
            <Link 
              href="/why-us" 
              className="text-sm md:text-base font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              Why Us
            </Link>
          </nav>

          {/* Primary CTA */}
          <div className="hidden md:block">
            <Link href="/register">
              <Button className="foody-button-primary">
                Register Business – £69/yr
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden rounded-xl p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-black/5 bg-white/95 backdrop-blur">
            <nav className="container px-4 py-6 space-y-1">
              <Link 
                href="/" 
                className="block py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl px-4 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/why-us" 
                className="block py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl px-4 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Why Us
              </Link>
              
              <div className="pt-4">
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="foody-button-primary w-full">
                    Register Business – £69/yr
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}