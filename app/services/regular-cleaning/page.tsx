"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Lightbulb, Shield, Award, Phone } from "lucide-react"

export default function LightFixturePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Light Fixture Installation & Replacement</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Whether you need a new chandelier hung, recessed lights installed, or an old fixture swapped out, our skilled electricians handle it all with precision.
              </p>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-[#FFCB00]">$150</div>
                <div className="text-sm text-muted-foreground">
                  Per fixture
                  <br />
                  installation
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
              <Lightbulb className="h-48 w-48 text-[#FFCB00]" />
            </div>
          </div>

          {/* What's Included */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">What's Included</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#FFCB00]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-[#FFCB00]" />
                  </div>
                  <h3 className="font-bold text-lg">Any Fixture Type</h3>
                  <p className="text-sm text-muted-foreground">
                    Chandeliers, pendants, recessed lights, sconces, flush mounts, and more
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#FFCB00]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-[#FFCB00]" />
                  </div>
                  <h3 className="font-bold text-lg">Clean Installation</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional wiring, secure mounting, and a clean workspace when we leave
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#FFCB00]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-[#FFCB00]" />
                  </div>
                  <h3 className="font-bold text-lg">Safety First</h3>
                  <p className="text-sm text-muted-foreground">
                    All work done to code by licensed and insured electricians
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#FFCB00]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-[#FFCB00]" />
                  </div>
                  <h3 className="font-bold text-lg">Satisfaction Guaranteed</h3>
                  <p className="text-sm text-muted-foreground">
                    We stand behind our work—if you're not happy, we'll make it right
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-[#FFCB00] text-black rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Lighting?</h2>
            <p className="text-lg mb-8 text-black/80">
              Transform any room with a new light fixture—professional installation included
            </p>
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
