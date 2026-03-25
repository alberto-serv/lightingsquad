"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Wind, CheckCircle2, Home, Leaf, Phone } from "lucide-react"

export default function DuctCleaningPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">AC & HVAC Duct Cleaning</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Professional duct cleaning service to improve your home's air quality and HVAC system efficiency. Remove
                dust, allergens, and debris from your entire duct system.
              </p>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-[#2A75AE]">$500</div>
                <div className="text-sm text-muted-foreground">
                  For 8-10 ducts
                  <br />
                  Additional ducts $30 each
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
                src="/ac-duct-cleaning.png"
                alt="Professional AC and HVAC duct cleaning"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Benefits of Duct Cleaning</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-[#2A75AE]" />
                  </div>
                  <h3 className="font-bold text-lg">Better Air Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Remove dust, pollen, pet dander, and other allergens that circulate through your home
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Wind className="h-6 w-6 text-[#2A75AE]" />
                  </div>
                  <h3 className="font-bold text-lg">Improved Efficiency</h3>
                  <p className="text-sm text-muted-foreground">
                    Clean ducts allow your HVAC system to work more efficiently, reducing energy costs
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Home className="h-6 w-6 text-[#2A75AE]" />
                  </div>
                  <h3 className="font-bold text-lg">Healthier Home</h3>
                  <p className="text-sm text-muted-foreground">
                    Reduce respiratory issues and create a cleaner, healthier living environment
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Service Process */}
          <div className="mb-16 bg-gradient-to-b from-blue-50 to-white rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Duct Cleaning Process</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2A75AE] text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Inspection & Assessment</h3>
                    <p className="text-muted-foreground">
                      We inspect your duct system to identify problem areas and determine the number of ducts
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2A75AE] text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Professional Cleaning</h3>
                    <p className="text-muted-foreground">
                      Using specialized equipment, we thoroughly clean each duct, removing all dust and debris
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2A75AE] text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Sanitization</h3>
                    <p className="text-muted-foreground">
                      Optional sanitization treatment to eliminate bacteria, mold, and odors
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2A75AE] text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Final Inspection</h3>
                    <p className="text-muted-foreground">
                      We verify all ducts are clean and your system is operating at peak efficiency
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Photos */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Professional Duct Cleaning</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Image
                src="/clean-commercial-building-storefront-after-pressur.jpg"
                alt="Duct cleaning equipment"
                width={600}
                height={400}
                className="rounded-xl shadow-lg w-full h-80 object-cover"
              />
              <Image
                src="/clean-white-fence-after-pressure-washing.jpg"
                alt="Clean air ducts"
                width={600}
                height={400}
                className="rounded-xl shadow-lg w-full h-80 object-cover"
              />
            </div>
          </div>

          {/* Pricing Note */}
          <Card className="mb-16 border-2 border-[#2A75AE]">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Pricing Information</h3>
              <div className="space-y-3 text-muted-foreground">
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#2A75AE] flex-shrink-0 mt-0.5" />
                  <span>Most single-family homes (8-10 air ducts) cost $500</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#2A75AE] flex-shrink-0 mt-0.5" />
                  <span>Additional ducts are $30 each</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#2A75AE] flex-shrink-0 mt-0.5" />
                  <span>Please note the number of ducts in your home when booking</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center bg-[#2A75AE] text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Breathe Cleaner Air Today</h2>
            <p className="text-lg mb-8 text-white/90">Schedule your professional duct cleaning service</p>
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
