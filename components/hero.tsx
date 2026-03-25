"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from 'lucide-react'

export function Hero() {
  const router = useRouter()

  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-balance leading-tight">
                Your Trusted <span className="text-[#FFCB00]">Lighting & Electrical</span> Handyman
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Professional lighting installation, fixture replacement, smart home setup, and electrical services for homes and businesses across Nashville and Middle Tennessee.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 bg-[#FFCB00] hover:bg-[#FFCB00]/90 text-black" onClick={() => router.push("/estimate")}>
                Get Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                <a href="tel:+16158806701">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (615) 880-6701
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FFCB00]">1000+</div>
                <div className="text-sm text-muted-foreground">Jobs Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FFCB00]">5&#9733;</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FFCB00]">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Professional lighting installation service"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-6 shadow-lg">
              <div className="text-sm text-muted-foreground">Satisfaction Guaranteed</div>
              <div className="text-2xl font-bold text-[#FFCB00]">100%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
