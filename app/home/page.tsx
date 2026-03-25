"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Shield, Award, CheckCircle2, Star, ArrowRight, Phone, Flame, Wind, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-[#D3331D] text-white hover:bg-[#D3331D]/90">Clean Dryers Prevent Fires</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                Professional Dryer Vent Cleaning Services
              </h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Protect your home and family from fire hazards while improving dryer efficiency. Our expert technicians
                provide thorough cleaning with a one-year guarantee.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#2A75AE] hover:bg-[#2A75AE]/90" asChild>
                  <Link href="/estimate/services">
                    Get Free Estimate
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
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#2A75AE]" />
                  <span className="text-sm font-medium">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#2A75AE]" />
                  <span className="text-sm font-medium">1-Year Guarantee</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/professional-pressure-washing-cleaning-house-exter.jpg"
                alt="Professional dryer vent cleaning service"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Dryer Vent Superheroes?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're not just cleaning vents—we're protecting homes and saving lives.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-[#2A75AE] transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Flame className="h-6 w-6 text-[#D3331D]" />
                </div>
                <h3 className="text-xl font-bold">Fire Prevention</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dryer fires cause over $100 million in property damage annually. Our thorough cleaning removes
                  dangerous lint buildup that causes 34% of home dryer fires.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-[#2A75AE] transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Wind className="h-6 w-6 text-[#2A75AE]" />
                </div>
                <h3 className="text-xl font-bold">Improved Efficiency</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Clean vents mean faster drying times and lower energy bills. Our customers report up to 30% reduction
                  in drying time after our service.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-[#2A75AE] transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-[#2A75AE]" />
                </div>
                <h3 className="text-xl font-bold">Professional Service</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our certified technicians use professional-grade equipment including inspection cameras to ensure
                  every inch of your vent is thoroughly cleaned.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services in Action */}
      <section id="services" className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services in Action</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See the difference professional dryer vent cleaning makes
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/service-action-1.jpg"
                alt="Professional dryer vent cleaning with specialized equipment"
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
                src="/service-action-2.jpg"
                alt="Inspection camera showing inside of dryer vent"
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <p className="text-white font-semibold">Camera Inspection</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/service-action-3.jpg"
                alt="Before and after dryer vent cleaning results"
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <p className="text-white font-semibold">Dramatic Results</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Comprehensive Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From regular cleanings to specialized services, we've got you covered
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/services/regular-cleaning">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#2A75AE] overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/dryer-vent-cleaning-service.jpg"
                    alt="Professional dryer vent cleaning service"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 className="h-6 w-6 text-[#2A75AE]" />
                  </div>
                  <h3 className="text-lg font-bold">Regular Cleaning</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete dryer vent cleaning with inspection camera and 1-year guarantee
                  </p>
                  <p className="text-[#2A75AE] font-bold">Starting at $159</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/services/duct-cleaning">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#2A75AE] overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/hvac-duct-cleaning-service.jpg"
                    alt="HVAC duct cleaning service"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <Wind className="h-6 w-6 text-[#2A75AE]" />
                  </div>
                  <h3 className="text-lg font-bold">Duct Cleaning</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional AC and HVAC duct cleaning for improved air quality
                  </p>
                  <p className="text-[#2A75AE] font-bold">Starting at $500</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/services/coil-cleaning">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#2A75AE] overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="AC coil cleaning service"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 bg-gray-200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <Sparkles className="h-6 w-6 text-[#2A75AE]" />
                  </div>
                  <h3 className="text-lg font-bold">Coil Cleaning</h3>
                  <p className="text-sm text-muted-foreground">
                    Deep cleaning of AC coils for maximum efficiency and performance
                  </p>
                  <p className="text-[#2A75AE] font-bold">$385</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/services/bathroom-fan">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#2A75AE] overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Bathroom fan cleaning service"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 bg-gray-200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <Wind className="h-6 w-6 text-[#2A75AE]" />
                  </div>
                  <h3 className="text-lg font-bold">Bathroom Fan Cleaning</h3>
                  <p className="text-sm text-muted-foreground">
                    Remove dust and debris for better ventilation and air quality
                  </p>
                  <p className="text-[#2A75AE] font-bold">$175</p>
                </CardContent>
              </Card>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Button size="lg" className="bg-[#2A75AE] hover:bg-[#2A75AE]/90" asChild>
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upgrade Packages Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="bg-[#D3331D] text-white hover:bg-[#D3331D]/90 mb-4">Premium Upgrades</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upgrade Your Home Safety</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Add premium upgrades to your service for maximum protection and performance
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-2 hover:border-[#2A75AE] transition-colors">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold">Fire-Resistant Transition Hose</h3>
                <p className="text-sm text-muted-foreground">
                  Premium fire-resistant, high-flow hose for maximum safety
                </p>
                <p className="text-2xl font-bold text-[#2A75AE]">$89</p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-[#2A75AE] transition-colors">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold">Magnetic Vent Door</h3>
                <p className="text-sm text-muted-foreground">Bird-proof exterior vent with magnetic closure</p>
                <p className="text-2xl font-bold text-[#2A75AE]">$79</p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-[#2A75AE] transition-colors">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold">Braided Washer Hoses</h3>
                <p className="text-sm text-muted-foreground">Burst-resistant stainless steel hoses</p>
                <p className="text-2xl font-bold text-[#2A75AE]">$69</p>
              </CardContent>
            </Card>
          </div>
          <Card className="border-4 border-[#D3331D] bg-gradient-to-br from-white to-blue-50">
            <CardContent className="p-8 text-center space-y-4">
              <Badge className="bg-[#D3331D] text-white text-sm px-4 py-2">BEST VALUE - SAVE $150</Badge>
              <h3 className="text-2xl font-bold">Complete Upgrade Bundle</h3>
              <p className="text-muted-foreground">Get all three upgrades together and save big!</p>
              <div className="flex items-baseline justify-center gap-3">
                <span className="text-2xl text-muted-foreground line-through">$500</span>
                <span className="text-5xl font-bold text-[#2A75AE]">$350</span>
              </div>
              <Button size="lg" className="bg-[#D3331D] hover:bg-[#D3331D]/90" asChild>
                <Link href="/upgrades">
                  View All Upgrades
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Customer Reviews */}
      <section id="reviews" className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mb-8">
            <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            <h2 className="text-2xl md:text-3xl font-bold">What Our Customers Say</h2>
          </div>

          {/* Reviews Card Container */}
          <Card className="p-6">
            <CardContent className="p-0">
              {/* Powered by Review Harvest */}
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-muted-foreground">Powered by Review Harvest</span>
              </div>

              {/* Masonry-style Review Grid */}
              <div className="columns-1 md:columns-2 gap-4 space-y-4">
                {/* Review 1 */}
                <Card className="break-inside-avoid mb-4 border shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
                        <Image src="/placeholder.svg?height=40&width=40" alt="Teegs" width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Teegs</p>
                        <p className="text-xs text-muted-foreground">16 hours ago</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Great tech showed up on time, and completed work quickly. Dryer is drying better now. Builders had left screen on vent cap on roof.
                    </p>
                  </CardContent>
                </Card>

                {/* Review 2 */}
                <Card className="break-inside-avoid mb-4 border shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                        P
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Patricia Bonura</p>
                        <p className="text-xs text-muted-foreground">2 weeks ago</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Dryer vent from washroom through roof. Very happy with service. Triston was very polite and did the job. I will be happy to refer him to my neighbors and friends.
                    </p>
                  </CardContent>
                </Card>

                {/* Review 3 */}
                <Card className="break-inside-avoid mb-4 border shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold text-sm">
                        L
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Luis De Jesus</p>
                        <p className="text-xs text-muted-foreground">22 hours ago</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Great response time and professionalism! Aaron cleaned the dryer vent duct and replaced the exit cover in less than 30 minutes. I do not know the current market rate. However, I wish it could be more ...
                    </p>
                    <button className="text-[#2A75AE] text-sm font-medium mt-2">More</button>
                  </CardContent>
                </Card>

                {/* Review 4 */}
                <Card className="break-inside-avoid mb-4 border shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold text-sm">
                        B
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Bill Mcgrath</p>
                        <p className="text-xs text-muted-foreground">2 weeks ago</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Absolutely the best service, technician was very polite and did a very clean job.
                    </p>
                  </CardContent>
                </Card>

                {/* Review 5 */}
                <Card className="break-inside-avoid mb-4 border shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                        P
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Paula Furr</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Fast reply to my request for service. Quick and efficient work. Very happy with the results and would highly recommend!
                    </p>
                  </CardContent>
                </Card>

                {/* Review 6 */}
                <Card className="break-inside-avoid mb-4 border shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-pink-400 flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
                        <Image src="/placeholder.svg?height=40&width=40" alt="Brenda Lintinger" width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Brenda Lintinger</p>
                        <p className="text-xs text-muted-foreground">2 weeks ago</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Fast reply to my request for service. Quick and professional work completed same day!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#2A75AE] text-white">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">Ready to Protect Your Home?</h2>
          <p className="text-lg text-white/90 text-pretty">
            Get your free estimate today and join hundreds of satisfied customers who trust Dryer Vent Superheroes for
            their home safety needs.
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
              className="bg-transparent border-white text-white hover:bg-white hover:text-[#2A75AE]"
              asChild
            >
              <a href="tel:6156322980">
                <Phone className="mr-2 h-5 w-5" />
                (615) 632-2980
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
