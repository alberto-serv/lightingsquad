"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles, CheckCircle2, Zap, DollarSign, Phone } from "lucide-react"

export default function CoilCleaningPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">AC Coil Cleaning Service</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Professional deep cleaning of your air conditioning coils to maximize cooling efficiency, reduce energy
                costs, and extend the life of your AC system.
              </p>
              <div className="bg-blue-50 border-2 border-[#2A75AE] rounded-lg p-4">
                <p className="text-3xl font-bold text-[#2A75AE]">$385</p>
                <p className="text-sm text-muted-foreground mt-1">Professional coil cleaning service</p>
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
                alt="Professional AC coil cleaning"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl bg-gray-200"
              />
            </div>
          </div>

          {/* Why Clean Your Coils */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Clean Your AC Coils?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Zap className="h-6 w-6 text-[#2A75AE]" />
                  </div>
                  <h3 className="font-bold text-lg">Maximum Efficiency</h3>
                  <p className="text-sm text-muted-foreground">
                    Dirty coils force your AC to work harder, increasing energy consumption by up to 30%
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-[#2A75AE]" />
                  </div>
                  <h3 className="font-bold text-lg">Lower Energy Bills</h3>
                  <p className="text-sm text-muted-foreground">
                    Clean coils mean better heat transfer and significantly reduced cooling costs
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-[#2A75AE]" />
                  </div>
                  <h3 className="font-bold text-lg">Extended Lifespan</h3>
                  <p className="text-sm text-muted-foreground">
                    Regular coil cleaning prevents premature system failure and costly repairs
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* What We Clean */}
          <div className="mb-16 bg-gradient-to-b from-blue-50 to-white rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">What We Clean</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Evaporator Coils (Indoor)</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#2A75AE] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Remove dust, dirt, and biological growth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#2A75AE] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Improve air quality and cooling performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#2A75AE] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Prevent frozen coils and system damage</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Condenser Coils (Outdoor)</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#2A75AE] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Clear debris, leaves, and environmental buildup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#2A75AE] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Restore proper heat dissipation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#2A75AE] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Reduce strain on compressor</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Service Photos */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Professional Coil Cleaning</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="AC coil before cleaning"
                width={600}
                height={400}
                className="rounded-xl shadow-lg w-full h-80 object-cover bg-gray-200"
              />
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="AC coil after cleaning"
                width={600}
                height={400}
                className="rounded-xl shadow-lg w-full h-80 object-cover bg-gray-200"
              />
            </div>
          </div>

          {/* Signs You Need Coil Cleaning */}
          <Card className="mb-16 border-2 border-[#2A75AE]">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Signs You Need Coil Cleaning</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#D3331D] flex-shrink-0 mt-0.5" />
                  <span>Higher than normal energy bills</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#D3331D] flex-shrink-0 mt-0.5" />
                  <span>Reduced cooling performance</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#D3331D] flex-shrink-0 mt-0.5" />
                  <span>AC running longer than usual</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#D3331D] flex-shrink-0 mt-0.5" />
                  <span>Visible dirt or debris on coils</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#D3331D] flex-shrink-0 mt-0.5" />
                  <span>Ice forming on indoor unit</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#D3331D] flex-shrink-0 mt-0.5" />
                  <span>Musty odors from vents</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center bg-[#2A75AE] text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Maximize Your AC Efficiency</h2>
            <p className="text-lg mb-8 text-white/90">Professional coil cleaning for just $385</p>
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
