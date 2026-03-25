"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Shield, Award, CheckCircle2, Star, ArrowRight, Phone, Lightbulb, Tv, Plug } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-[#FFCB00] text-black hover:bg-[#FFCB00]/90">Your Electrical Handyman</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                Professional Lighting & Electrical Services
              </h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                From light fixture installation to smart home setup, The Lighting Squad handles all your lighting and electrical needs across Nashville and Middle Tennessee.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#FFCB00] hover:bg-[#FFCB00]/90 text-black" asChild>
                  <Link href="/estimate/services">
                    Get Free Estimate
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
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#FFCB00]" />
                  <span className="text-sm font-medium">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#FFCB00]" />
                  <span className="text-sm font-medium">Satisfaction Guaranteed</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/professional-pressure-washing-cleaning-house-exter.jpg"
                alt="Professional lighting installation service"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose The Lighting Squad?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're not just handymen—we're lighting and electrical specialists who get the job done right.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-[#FFCB00] transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="bg-[#FFCB00]/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-[#FFCB00]" />
                </div>
                <h3 className="text-xl font-bold">Expert Installation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  From chandeliers to recessed lighting, our skilled technicians handle every installation with precision and care.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-[#FFCB00] transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="bg-[#FFCB00]/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Tv className="h-6 w-6 text-[#FFCB00]" />
                </div>
                <h3 className="text-xl font-bold">Smart Home Ready</h3>
                <p className="text-muted-foreground leading-relaxed">
                  TV mounting, surround sound, Ring cameras, smart switches—we bring your home into the modern age with clean, concealed wiring.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-[#FFCB00] transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="bg-[#FFCB00]/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Plug className="h-6 w-6 text-[#FFCB00]" />
                </div>
                <h3 className="text-xl font-bold">Full Electrical Service</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Outlet upgrades, dimmer switches, LED conversions, landscape lighting—no job is too big or too small for our team.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-16 px-4 bg-gradient-to-b from-white to-yellow-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything from simple bulb swaps to full outdoor lighting systems
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#FFCB00] overflow-hidden group">
              <CardContent className="p-6 space-y-3">
                <div className="bg-[#FFCB00]/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <Lightbulb className="h-6 w-6 text-[#FFCB00]" />
                </div>
                <h3 className="text-lg font-bold">Light Fixtures</h3>
                <p className="text-sm text-muted-foreground">
                  Install or replace any light fixture, ceiling fan, or chandelier
                </p>
                <p className="text-[#112337] font-bold">Starting at $150</p>
              </CardContent>
            </Card>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#FFCB00] overflow-hidden group">
              <CardContent className="p-6 space-y-3">
                <div className="bg-[#FFCB00]/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <Tv className="h-6 w-6 text-[#FFCB00]" />
                </div>
                <h3 className="text-lg font-bold">TV & Audio</h3>
                <p className="text-sm text-muted-foreground">
                  TV mounting, soundbar install, and full surround sound systems
                </p>
                <p className="text-[#112337] font-bold">Starting at $150</p>
              </CardContent>
            </Card>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#FFCB00] overflow-hidden group">
              <CardContent className="p-6 space-y-3">
                <div className="bg-[#FFCB00]/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <Shield className="h-6 w-6 text-[#FFCB00]" />
                </div>
                <h3 className="text-lg font-bold">Security & Smart Home</h3>
                <p className="text-sm text-muted-foreground">
                  Ring doorbell, cameras, smart switches, and dimmer installs
                </p>
                <p className="text-[#112337] font-bold">Starting at $75</p>
              </CardContent>
            </Card>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#FFCB00] overflow-hidden group">
              <CardContent className="p-6 space-y-3">
                <div className="bg-[#FFCB00]/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-6 w-6 text-[#FFCB00]" />
                </div>
                <h3 className="text-lg font-bold">Specialized Lighting</h3>
                <p className="text-sm text-muted-foreground">
                  Landscape, cabinet, garage hex, and permanent LED lighting
                </p>
                <p className="text-[#112337] font-bold">Starting at $300</p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button size="lg" className="bg-[#FFCB00] hover:bg-[#FFCB00]/90 text-black" asChild>
              <Link href="/estimate/services">
                Browse All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section id="reviews" className="py-16 px-4 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mb-8">
            <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            <h2 className="text-2xl md:text-3xl font-bold">What Our Customers Say</h2>
          </div>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="columns-1 md:columns-2 gap-4 space-y-4">
                <Card className="break-inside-avoid mb-4 border shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold text-sm">
                        M
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Mike T.</p>
                        <p className="text-xs text-muted-foreground">Nashville, TN</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Had 4 new light fixtures installed and a ceiling fan replaced. The team showed up on time and did excellent work. Very professional and clean.
                    </p>
                  </CardContent>
                </Card>

                <Card className="break-inside-avoid mb-4 border shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                        S
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Sarah K.</p>
                        <p className="text-xs text-muted-foreground">Franklin, TN</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      They mounted our 75" TV and set up a full surround sound system with all wires concealed. The living room looks amazing! Highly recommend.
                    </p>
                  </CardContent>
                </Card>

                <Card className="break-inside-avoid mb-4 border shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold text-sm">
                        J
                      </div>
                      <div>
                        <p className="font-semibold text-sm">James R.</p>
                        <p className="text-xs text-muted-foreground">Murfreesboro, TN</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Had landscape lighting installed in our backyard and it looks incredible. Great response time and fair pricing. Will definitely use again.
                    </p>
                  </CardContent>
                </Card>

                <Card className="break-inside-avoid mb-4 border shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                        L
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Lisa M.</p>
                        <p className="text-xs text-muted-foreground">Brentwood, TN</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Installed Ring doorbell and 4 security cameras. Everything works perfectly and the wiring is completely hidden. Great value for the price.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#FFCB00] text-black">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">Ready to Light Up Your Home?</h2>
          <p className="text-lg text-black/80 text-pretty">
            Get your free estimate today and join hundreds of satisfied customers who trust The Lighting Squad for their lighting and electrical needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
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
                (615) 880-6701
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
