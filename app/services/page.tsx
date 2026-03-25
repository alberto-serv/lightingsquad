"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Lightbulb, Tv, Shield, Plug } from "lucide-react"

const services = [
  {
    id: "lighting",
    title: "Light Fixture Installation",
    description: "Install or replace light fixtures, ceiling fans, and chandeliers with expert precision",
    price: "Starting at $150",
    icon: Lightbulb,
  },
  {
    id: "tv-audio",
    title: "TV & Sound System Installation",
    description: "Professional TV mounting, soundbar install, and full surround sound with concealed wiring",
    price: "Starting at $150",
    icon: Tv,
  },
  {
    id: "security",
    title: "Security & Smart Home",
    description: "Ring doorbell, camera systems, smart switches, and dimmer installations",
    price: "Starting at $75",
    icon: Shield,
  },
  {
    id: "specialized",
    title: "Specialized Lighting Systems",
    description: "Landscape lighting, cabinet lighting, garage hex lighting, and permanent LED systems",
    price: "Starting at $300",
    icon: Plug,
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
              Professional lighting installation, electrical services, and smart home solutions for Nashville and Middle Tennessee
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.id} className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-[#FFCB00] cursor-pointer overflow-hidden group">
                  <CardContent className="p-8 space-y-4">
                    <div className="bg-[#FFCB00]/10 w-16 h-16 rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-[#FFCB00]" />
                    </div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-[#112337] font-bold text-lg">{service.price}</span>
                      <Button className="bg-[#FFCB00] hover:bg-[#FFCB00]/90 text-black" asChild>
                        <Link href="/estimate/services">
                          Book Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-[#FFCB00] hover:bg-[#FFCB00]/90 text-black" asChild>
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
