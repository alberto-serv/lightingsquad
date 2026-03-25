"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Phone, Calendar, Shield, Lightbulb } from "lucide-react"

export default function AnnualServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge className="bg-[#FFCB00] text-black hover:bg-[#FFCB00]/90 mb-4">MAINTENANCE PLAN</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Annual Lighting Maintenance</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Keep your home's lighting in top shape year-round. Our annual maintenance plan covers fixture inspections, bulb replacements, and cleaning.
            </p>
          </div>

          {/* What's Included */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">What's Included</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#FFCB00]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-[#FFCB00]" />
                  </div>
                  <h3 className="font-bold text-lg">Fixture Inspection</h3>
                  <p className="text-muted-foreground">
                    Complete inspection of all light fixtures, wiring connections, and switches
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#FFCB00]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-[#FFCB00]" />
                  </div>
                  <h3 className="font-bold text-lg">Scheduled Service</h3>
                  <p className="text-muted-foreground">
                    We reach out when it's time for service—no need to remember
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#FFCB00]/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-[#FFCB00]" />
                  </div>
                  <h3 className="font-bold text-lg">Priority Service</h3>
                  <p className="text-muted-foreground">
                    Annual plan members get priority scheduling and preferred time slots
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-[#FFCB00] text-black rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Keep Your Lights Shining Bright</h2>
            <p className="text-lg mb-8 text-black/80">
              Contact us to learn about annual maintenance plans for your home or business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/estimate/services">
                  Get Started
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
                  Call Us
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
