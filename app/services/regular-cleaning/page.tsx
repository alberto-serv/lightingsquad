"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Camera, Shield, Award, Phone } from "lucide-react"

export default function RegularCleaningPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Regular Dryer Vent Cleaning</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Our most comprehensive service includes full deep cleaning of your dryer vent with professional
                inspection camera scope and a one-year guarantee.
              </p>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-[#2A75AE]">$159</div>
                <div className="text-sm text-muted-foreground">
                  Complete service
                  <br />
                  with guarantee
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#2A75AE] hover:bg-[#2A75AE]/90" asChild>
                  <Link href="/estimate/services">
                    Book Now
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
                src="/dryer-vent-cleaning.jpg"
                alt="Professional dryer vent cleaning service"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* What's Included */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">What's Included</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Camera className="h-6 w-6 text-[#2A75AE]" />
                  </div>
                  <h3 className="font-bold text-lg">Camera Inspection</h3>
                  <p className="text-sm text-muted-foreground">
                    We use professional inspection cameras to show you exactly what's inside your vent
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-[#2A75AE]" />
                  </div>
                  <h3 className="font-bold text-lg">Deep Cleaning</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete removal of lint, debris, and blockages from your entire vent system
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-[#2A75AE]" />
                  </div>
                  <h3 className="font-bold text-lg">Safety Check</h3>
                  <p className="text-sm text-muted-foreground">
                    Thorough inspection for damage, proper venting, and fire hazards
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-[#2A75AE]" />
                  </div>
                  <h3 className="font-bold text-lg">1-Year Guarantee</h3>
                  <p className="text-sm text-muted-foreground">
                    We stand behind our work with a full one-year service guarantee
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Service Photos */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">See Our Work</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative group overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/before-and-after-house-pressure-washing-exterior-c.jpg"
                  alt="Before and after dryer vent cleaning"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <p className="text-white font-semibold">Before & After Results</p>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/professional-pressure-washing-cleaning-house-exter.jpg"
                  alt="Professional cleaning equipment"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <p className="text-white font-semibold">Professional Equipment</p>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/clean-concrete-driveway.png"
                  alt="Lint removal from dryer vent"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <p className="text-white font-semibold">Thorough Lint Removal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Why It Matters */}
          <div className="bg-gradient-to-b from-blue-50 to-white rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Why Regular Cleaning Matters</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="text-4xl font-bold text-[#D3331D]">15,000+</div>
                <h3 className="font-bold text-lg">Dryer Fires Annually</h3>
                <p className="text-muted-foreground">
                  Lint buildup is the leading cause of dryer fires in the United States
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-4xl font-bold text-[#2A75AE]">30%</div>
                <h3 className="font-bold text-lg">Energy Savings</h3>
                <p className="text-muted-foreground">Clean vents reduce drying time and lower your energy bills</p>
              </div>
              <div className="space-y-3">
                <div className="text-4xl font-bold text-[#2A75AE]">2x</div>
                <h3 className="font-bold text-lg">Dryer Lifespan</h3>
                <p className="text-muted-foreground">
                  Regular maintenance extends the life of your dryer significantly
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-[#2A75AE] text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Schedule Your Cleaning?</h2>
            <p className="text-lg mb-8 text-white/90">
              Protect your home and family with professional dryer vent cleaning
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
