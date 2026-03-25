"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Phone, Lightbulb, Tv, Shield } from "lucide-react"

const upgradePackages = [
  {
    id: "led-whole-home",
    title: "Whole-Home LED Conversion",
    description:
      "Convert every fixture in your home to energy-efficient LED bulbs. Save on energy costs and enjoy brighter, longer-lasting light throughout your home.",
    price: 400,
    priceLabel: "$200–$600",
    benefits: [
      "Every fixture converted to LED",
      "Significant energy bill savings",
      "LED bulbs last 25x longer than incandescent",
      "Better light quality throughout your home",
      "Professional installation included",
    ],
    icon: Lightbulb,
  },
  {
    id: "smart-home-bundle",
    title: "Smart Home Starter Bundle",
    description:
      "Get started with a smart home setup: smart switches, dimmers, and a Ring doorbell professionally installed with clean wiring.",
    price: 375,
    benefits: [
      "3 smart switches/dimmers installed",
      "Ring doorbell installation",
      "All wiring concealed",
      "App setup and configuration",
      "Professional installation included",
    ],
    icon: Shield,
  },
  {
    id: "entertainment-bundle",
    title: "Entertainment Setup Bundle",
    description:
      "Complete entertainment setup: TV wall mounting with concealed wiring plus soundbar installation. Transform your living room.",
    price: 325,
    benefits: [
      "TV wall mounting (up to 65\")",
      "Soundbar installation with concealed wiring",
      "Cable management included",
      "Clean, professional finish",
      "Save vs. booking separately",
    ],
    icon: Tv,
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
            <Badge className="bg-[#FFCB00] text-black hover:bg-[#FFCB00]/90 mb-4">Service Bundles</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Bundle & Save</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Combine popular services into bundles for better value. All bundles include professional installation.
            </p>
          </div>

          {/* Bundle Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {upgradePackages.map((pkg) => {
              const Icon = pkg.icon
              return (
                <Card
                  key={pkg.id}
                  className={`hover:shadow-xl transition-all duration-300 border-2 hover:border-[#FFCB00] overflow-hidden ${
                    pkg.featured ? "border-[#FFCB00] shadow-lg" : ""
                  }`}
                >
                  {pkg.featured && (
                    <div className="bg-[#FFCB00] text-black text-center py-1 text-sm font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#FFCB00]/10 w-12 h-12 rounded-full flex items-center justify-center">
                        <Icon className="h-6 w-6 text-[#FFCB00]" />
                      </div>
                      <h3 className="text-lg font-bold">{pkg.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">{pkg.description}</p>
                    <div className="space-y-2">
                      {pkg.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#FFCB00] flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-3xl font-bold text-[#112337]">${pkg.price}</span>
                      <Button className="bg-[#FFCB00] hover:bg-[#FFCB00]/90 text-black" asChild>
                        <Link href="/estimate/services">Book Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTA */}
          <div className="text-center bg-[#FFCB00] text-black rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Home?</h2>
            <p className="text-lg mb-8 text-black/80">
              Book a bundle today or build your own custom service package
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/estimate/services">
                  Browse All Services
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
