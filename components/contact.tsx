"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export function Contact() {
  const router = useRouter()

  return (
    <section id="contact" className="py-24 bg-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-balance">Get Your Free Quote Today</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Ready to protect your home from fire hazards? Contact us for a free estimate and see the difference
            professional dryer vent cleaning makes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card>
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium">
                    Service Needed
                  </label>
                  <Input id="service" placeholder="Residential cleaning, commercial service, etc." />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Additional Details
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your dryer vent system and cleaning needs..."
                    rows={4}
                  />
                </div>

                <Button size="lg" className="w-full" type="button" onClick={() => router.push("/estimate")}>
                  Get Free Estimate
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardContent className="p-8 space-y-6">
                <h3 className="text-2xl font-semibold">Contact Information</h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-muted-foreground">(615) 632-2980</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">anaramos@homerunfranchises.com</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Service Area</div>
                      <div className="text-muted-foreground">Metro Area & Surrounding Cities</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Business Hours</div>
                      <div className="text-muted-foreground">Mon-Sat: 7AM-6PM</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8 text-center space-y-4">
                <h3 className="text-2xl font-semibold">Emergency Services Available</h3>
                <p className="text-primary-foreground/90">
                  Need urgent dryer vent cleaning? We offer emergency services for fire hazards, dryer malfunctions, and
                  other urgent situations.
                </p>
                <Button variant="secondary" size="lg">
                  Call for Emergency Service
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
