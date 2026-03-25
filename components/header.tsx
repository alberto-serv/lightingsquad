"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 w-full bg-transparent z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <Link
            href="/estimate/services"
            className={`hover:opacity-80 transition-opacity duration-300 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
          >
            <Image
              src="/lighting-squad-logo.webp"
              alt="The Lighting Squad - Your Electrical Handyman"
              width={360}
              height={80}
              className="h-16 w-auto"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}
