"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Fan, CheckCircle2, Wind, Home, Phone } from "lucide-react"

export default function BathroomFanPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Bathroom Fan Cleaning</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Professional cleaning of bathroom exhaust fans to improve ventilation, reduce noise, and prevent
                moisture problems. Keep your bathroom fresh and mold-free.
              </p>
              <div className="bg-blue-50 border-2 border-[#2A75AE] rounded-lg p-4">
                <p className="text-3xl font-bold text-[#2A75AE]">$175</p>
                <p className="text-sm text-muted-foreground mt-1">Per bathroom fan</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#2A75AE] hover:bg-[#2A75AE]/90" asChild>
                  <Link href="/estimate/services">
                    Book Service
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:6156322980">
                    <Phone className="mr-2 h-5 w-5" />
                    (615) 632-2980
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Bathroom fan cleaning service"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl bg-gray-200"
              />
            </div>
          </div>

          {/* Why Clean Your Bathroom Fan */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Clean Your Bathroom Fan?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Wind className="h-6 w-6 text-[#2A75AE]" />
                  </div>
                  <h3 className="font-bold text-lg">Better Ventilation</h3>
                  <p className="text-sm text-muted-foreground">
                    Remove dust and debris that blocks airflow and reduces fan effectiveness
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Home className="h-6 w-6 text-[#2A75AE]" />
                  </div>
                  <h3 className="font-bold text-lg">Prevent Mold</h3>
                  <p className="text-sm text-muted-foreground">
                    Proper ventilation prevents moisture buildup that leads to mold and mildew
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Fan className="h-6 w-6 text-[#2A75AE]" />
                  </div>
                  <h3 className="font-bold text-lg">Quieter Operation</h3>
                  <p className="text-sm text-muted-foreground">
                    Clean fans run more smoothly and quietly without the rattle of accumulated debris
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* What's Included */}
          <div className="mb-16 bg-gradient-to-b from-blue-50 to-white rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Bathroom Fan Cleaning Service</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2A75AE] text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Fan Cover Removal</h3>
                    <p className="text-muted-foreground">Carefully remove and clean the fan cover and grille</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2A75AE] text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Deep Cleaning</h3>
                    <p className="text-muted-foreground">Thoroughly clean fan blades, motor housing, and ductwork</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2A75AE] text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Performance Check</h3>
                    <p className="text-muted-foreground">
                      Test fan operation and airflow to ensure optimal performance
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2A75AE] text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Reassembly</h3>
                    <p className="text-muted-foreground">Reinstall all components and verify proper operation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Photos */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Professional Fan Cleaning</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Dirty bathroom fan before cleaning"
                width={600}
                height={400}
                className="rounded-xl shadow-lg w-full h-80 object-cover bg-gray-200"
              />
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Clean bathroom fan after service"
                width={600}
                height={400}
                className="rounded-xl shadow-lg w-full h-80 object-cover bg-gray-200"
              />
            </div>
          </div>

          {/* Signs You Need Service */}
          <Card className="mb-16 border-2 border-[#2A75AE]">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Signs Your Bathroom Fan Needs Cleaning</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#D3331D] flex-shrink-0 mt-0.5" />
                  <span>Fan is noticeably louder than usual</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#D3331D] flex-shrink-0 mt-0.5" />
                  <span>Reduced airflow or suction</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#D3331D] flex-shrink-0 mt-0.5" />
                  <span>Visible dust on fan cover</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#D3331D] flex-shrink-0 mt-0.5" />
                  <span>Bathroom stays humid after showers</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#D3331D] flex-shrink-0 mt-0.5" />
                  <span>Mold or mildew growth in bathroom</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#D3331D] flex-shrink-0 mt-0.5" />
                  <span>Fan hasn't been cleaned in over a year</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center bg-[#2A75AE] text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Keep Your Bathroom Fresh</h2>
            <p className="text-lg mb-8 text-white/90">Professional bathroom fan cleaning for just $175</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/estimate/services">
                  Book Service
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-[#2A75AE]"
                asChild
              >
                <a href="tel:6156322980">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
