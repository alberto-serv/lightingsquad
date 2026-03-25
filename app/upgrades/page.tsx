"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Phone, Shield, Zap, Wind } from "lucide-react"

const upgradePackages = [
  {
    id: "fire-resistant-transition",
    title: "Fire-Resistant Transition Hose",
    description:
      "Upgrade to a premium fire-resistant, high-flow transition hose that connects your dryer to the wall vent. This flexible metal hose is designed to withstand high temperatures and prevent lint buildup.",
    price: 89,
    image: "/dryer-vent-cleaning.jpg",
    benefits: [
      "UL-listed fire-resistant material",
      "Improved airflow for faster drying",
      "Prevents kinking and crushing",
      "Meets all building codes",
      "Professional installation included",
    ],
    icon: Shield,
  },
  {
    id: "magnetic-vent-door",
    title: "Magnetic Bird-Proof Vent Door",
    description:
      "Replace your old exterior vent cover with a premium magnetic vent door that prevents birds, rodents, and debris from entering while allowing optimal airflow.",
    price: 79,
    image: "/roof-access.jpg",
    benefits: [
      "Magnetic closure prevents pest entry",
      "Weather-resistant construction",
      "Maintains proper airflow",
      "Easy to clean design",
      "Professional installation included",
    ],
    icon: Wind,
  },
  {
    id: "braided-washer-hoses",
    title: "Braided Stainless Steel Washer Hoses",
    description:
      "Upgrade to premium braided stainless steel washer hoses that are burst-resistant and prevent water damage. These hoses are 10x stronger than standard rubber hoses.",
    price: 69,
    image: "/second-floor-cleaning.jpeg",
    benefits: [
      "Burst-resistant up to 1,500 PSI",
      "Prevents catastrophic water damage",
      "Corrosion-resistant stainless steel",
      "10-year warranty",
      "Professional installation included",
    ],
    icon: Zap,
  },
  {
    id: "complete-upgrade-bundle",
    title: "Complete Upgrade Bundle",
    description:
      "Get all three premium upgrades together and save $150! This bundle includes the fire-resistant transition hose, magnetic vent door, and braided washer hoses - everything you need for maximum safety and performance.",
    price: 350,
    originalPrice: 500,
    image: "/special-offer.png",
    benefits: [
      "All three premium upgrades included",
      "Save $150 compared to individual purchases",
      "Complete home protection package",
      "Professional installation of all components",
      "Best value for comprehensive safety",
    ],
    icon: CheckCircle2,
    featured: true,
  },
]

export default function UpgradesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge className="bg-[#D3331D] text-white hover:bg-[#D3331D]/90 mb-4">Premium Upgrades</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Upgrade Your Home Safety</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enhance your dryer vent cleaning service with premium upgrades designed for maximum safety, efficiency,
              and peace of mind. Purchase ahead of time and save.
            </p>
          </div>

          {/* Featured Bundle */}
          {upgradePackages
            .filter((pkg) => pkg.featured)
            .map((pkg) => {
              const Icon = pkg.icon
              return (
                <Card
                  key={pkg.id}
                  className="mb-12 border-4 border-[#D3331D] shadow-2xl overflow-hidden bg-gradient-to-br from-white to-blue-50"
                >
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-[#D3331D] text-white text-sm px-4 py-2">BEST VALUE - SAVE $150</Badge>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="relative h-96 lg:h-auto">
                      <Image
                        src={pkg.image || "/placeholder.svg"}
                        alt={pkg.title}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8 lg:p-12 space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#2A75AE] text-white rounded-full p-3">
                          <Icon className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold">{pkg.title}</h2>
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed">{pkg.description}</p>
                      <div className="flex items-baseline gap-3">
                        {pkg.originalPrice && (
                          <span className="text-2xl text-muted-foreground line-through">${pkg.originalPrice}</span>
                        )}
                        <span className="text-5xl font-bold text-[#2A75AE]">${pkg.price}</span>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg">What's Included:</h3>
                        {pkg.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#2A75AE] flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button size="lg" className="bg-[#D3331D] hover:bg-[#D3331D]/90 flex-1" asChild>
                          <Link href="/estimate/services">
                            Purchase Bundle
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                          <a href="tel:6156322980">
                            <Phone className="mr-2 h-5 w-5" />
                            Questions?
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}

          {/* Individual Upgrades */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Individual Upgrades</h2>
            <p className="text-center text-muted-foreground mb-8">
              Or choose individual upgrades to customize your service
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {upgradePackages
                .filter((pkg) => !pkg.featured)
                .map((pkg) => {
                  const Icon = pkg.icon
                  return (
                    <Card
                      key={pkg.id}
                      className="hover:shadow-xl transition-all duration-300 border-2 hover:border-[#2A75AE] overflow-hidden"
                    >
                      <div className="relative h-64">
                        <Image
                          src={pkg.image || "/placeholder.svg"}
                          alt={pkg.title}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 flex items-center gap-2">
                            <Icon className="h-5 w-5 text-[#2A75AE]" />
                            <span className="font-bold">{pkg.title}</span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6 space-y-4">
                        <p className="text-muted-foreground leading-relaxed">{pkg.description}</p>
                        <div className="space-y-2">
                          {pkg.benefits.slice(0, 3).map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#2A75AE] flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t">
                          <span className="text-3xl font-bold text-[#2A75AE]">${pkg.price}</span>
                          <Button className="bg-[#2A75AE] hover:bg-[#2A75AE]/90" asChild>
                            <Link href="/estimate/services">Purchase</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </div>

          {/* Why Upgrade Section */}
          <div className="bg-gradient-to-b from-blue-50 to-white rounded-2xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Upgrade?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="bg-[#2A75AE]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-[#2A75AE]" />
                </div>
                <h3 className="font-bold text-xl">Enhanced Safety</h3>
                <p className="text-muted-foreground">
                  Premium components provide superior fire protection and prevent common hazards
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="bg-[#2A75AE]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="h-8 w-8 text-[#2A75AE]" />
                </div>
                <h3 className="font-bold text-xl">Better Performance</h3>
                <p className="text-muted-foreground">
                  Improved airflow and efficiency means faster drying and lower energy bills
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="bg-[#2A75AE]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8 text-[#2A75AE]" />
                </div>
                <h3 className="font-bold text-xl">Long-Term Value</h3>
                <p className="text-muted-foreground">
                  Quality components last longer and prevent costly repairs or damage
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">How Upgrade Purchases Work</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#2A75AE] text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold mb-1">Purchase Ahead of Time</h3>
                  <p className="text-muted-foreground">
                    Select and purchase your upgrades when booking your service or anytime before your appointment
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#2A75AE] text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold mb-1">We Bring Everything</h3>
                  <p className="text-muted-foreground">
                    Our technicians arrive with all purchased upgrades and professional installation tools
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#2A75AE] text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold mb-1">Professional Installation</h3>
                  <p className="text-muted-foreground">
                    All upgrades are professionally installed during your scheduled service appointment
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#2A75AE] text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-bold mb-1">Enjoy Peace of Mind</h3>
                  <p className="text-muted-foreground">
                    Rest easy knowing your home has the best protection and performance available
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center bg-[#2A75AE] text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Home Safety?</h2>
            <p className="text-lg mb-8 text-white/90">
              Purchase your upgrades today and we'll install them during your next service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/estimate/services">
                  Purchase Upgrades
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
                  Questions? Call Us
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
