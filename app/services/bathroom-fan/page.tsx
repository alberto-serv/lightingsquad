"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Sun, Phone } from "lucide-react"

export default function SpecializedLightingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Specialized Lighting Systems</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                From landscape and outdoor pathway lighting to under-cabinet LEDs, garage hex grids, and permanent exterior LED systems—we design and install it all.
              </p>
              <div className="bg-yellow-50 border-2 border-[#FFCB00] rounded-lg p-4">
                <p className="text-3xl font-bold text-[#112337]">Starting at $300</p>
                <p className="text-sm text-muted-foreground mt-1">Custom systems available</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#FFCB00] hover:bg-[#FFCB00]/90 text-black" asChild>
                  <Link href="/estimate/services">
                    Book Service
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:6158806701">
                    <Phone className="mr-2 h-5 w-5" />
                    (615) 880-6701
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative bg-yellow-50 rounded-2xl p-12 flex items-center justify-center">
              <Sun className="h-48 w-48 text-[#FFCB00]" />
            </div>
          </div>

          {/* Services & Pricing */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Specialized Lighting Options</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-[#FFCB00]">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Landscape & Outdoor</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#FFCB00] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Basic pathway (5-8 lights): $500-$1,200</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#FFCB00] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Larger custom systems: $1,500-$3,500+</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-2 border-[#FFCB00]">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Cabinet Lighting</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#FFCB00] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Standard kitchen: $300-$800</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#FFCB00] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">High-end/custom: $800-$1,500</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-2 border-[#FFCB00]">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Garage Hex Lighting</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#FFCB00] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">1-car garage: $500-$900</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#FFCB00] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">2-car garage: $800-$1,500</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-2 border-[#FFCB00]">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Permanent LED & Conversions</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#FFCB00] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Exterior LED: $20-$35/ft (typical home $2,500-$6,000)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#FFCB00] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Whole-home LED conversion: $200-$600</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-[#FFCB00] text-black rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Transform Your Space with Light</h2>
            <p className="text-lg mb-8 text-black/80">Custom lighting solutions designed and installed by professionals</p>
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
                className="bg-transparent border-black text-black hover:bg-black hover:text-[#FFCB00]"
                asChild
              >
                <a href="tel:6158806701">
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
