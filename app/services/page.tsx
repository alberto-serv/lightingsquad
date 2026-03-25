"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Wind, Sparkles, Fan } from "lucide-react"

const services = [
  {
    id: "regular-cleaning",
    title: "Regular Dryer Vent Cleaning",
    description: "Our most popular service - complete dryer vent cleaning with inspection camera",
    price: "Starting at $159",
    icon: CheckCircle2,
    image: "/dryer-vent-cleaning-service.jpg",
  },
  {
    id: "duct-cleaning",
    title: "AC & HVAC Duct Cleaning",
    description: "Professional duct cleaning for improved air quality and system efficiency",
    price: "Starting at $500",
    icon: Wind,
    image: "/hvac-duct-cleaning-service.jpg",
  },
  {
    id: "coil-cleaning",
    title: "AC Coil Cleaning",
    description: "Deep cleaning of AC coils for maximum cooling efficiency",
    price: "$385",
    icon: Sparkles,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "bathroom-fan",
    title: "Bathroom Fan Cleaning",
    description: "Remove dust and debris for better ventilation and air quality",
    price: "$175",
    icon: Fan,
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional cleaning services to keep your home safe, efficient, and healthy
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Link key={service.id} href={`/services/${service.id}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-[#2A75AE] cursor-pointer overflow-hidden group">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5 text-[#2A75AE]" />
                            <span className="font-bold text-lg">{service.title}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-[#2A75AE] font-bold text-lg">{service.price}</span>
                        <Button className="bg-[#2A75AE] hover:bg-[#2A75AE]/90">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-[#2A75AE] hover:bg-[#2A75AE]/90" asChild>
              <Link href="/estimate/services">
                Get Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
