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
            Ready to upgrade your lighting or need electrical work done? Contact us for a free estimate and see the difference professional service makes.
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
                  <Input id="phone" type="tel" placeholder="(615) 555-1234" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium">
                    Service Needed
                  </label>
                  <Input id="service" placeholder="Light fixture installation, TV mounting, etc." />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Additional Details
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your lighting or electrical project..."
                    rows={4}
                  />
                </div>

                <Button size="lg" className="w-full bg-[#FFCB00] hover:bg-[#FFCB00]/90 text-black" type="button" onClick={() => router.push("/estimate")}>
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
                    <div className="w-12 h-12 bg-[#FFCB00]/10 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-[#FFCB00]" />
                    </div>
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-muted-foreground">(615) 880-6701</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#FFCB00]/10 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-[#FFCB00]" />
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">info@thelightingsquad.com</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#FFCB00]/10 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-[#FFCB00]" />
                    </div>
                    <div>
                      <div className="font-medium">Service Area</div>
                      <div className="text-muted-foreground">Nashville & Middle Tennessee</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#FFCB00]/10 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-[#FFCB00]" />
                    </div>
                    <div>
                      <div className="font-medium">Business Hours</div>
                      <div className="text-muted-foreground">Mon-Sat: 7AM-6PM</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#FFCB00] text-black">
              <CardContent className="p-8 text-center space-y-4">
                <h3 className="text-2xl font-semibold">Same-Day Service Available</h3>
                <p className="text-black/80">
                  Need a light fixture installed or a quick electrical fix today? We offer same-day service for many of our most popular jobs.
                </p>
                <Button variant="secondary" size="lg">
                  Call for Same-Day Service
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
