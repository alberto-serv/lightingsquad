"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Tv, CheckCircle2, Phone } from "lucide-react"

export default function TVInstallationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">TV & Sound System Installation</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Professional TV wall mounting with concealed wiring, soundbar installation, and full surround sound system setup. Make your entertainment space look and sound amazing.
              </p>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-[#FFCB00]">$200</div>
                <div className="text-sm text-muted-foreground">
                  TVs up to 55"
                  <br />
                  Larger TVs from $350
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#FFCB00] hover:bg-[#FFCB00]/90 text-black" asChild>
                  <Link href="/estimate/services">
                    Book Now
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
              <Tv className="h-48 w-48 text-[#FFCB00]" />
            </div>
          </div>

          {/* What We Offer */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our TV & Audio Services</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-[#FFCB00]">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">TV Wall Mounting</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#FFCB00] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Up to 55": $200</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#FFCB00] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">65" and larger: $350</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#FFCB00] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Cable management included</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-2 border-[#FFCB00]">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Sound Systems</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#FFCB00] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Soundbar with concealed wiring: $150-$250</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#FFCB00] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Full surround system (5.1/7.1): $400-$800</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#FFCB00] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">All wiring concealed in walls</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-[#FFCB00] text-black rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Upgrade Your Entertainment Space</h2>
            <p className="text-lg mb-8 text-black/80">Professional TV and sound system installation with clean, concealed wiring</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/estimate/services">
                  Get Free Estimate
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
