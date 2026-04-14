"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  CheckCircle,
  User,
  Home,
  ArrowRight,
  Shield,
  DollarSign,
  Lightbulb,
} from "lucide-react"
import { format } from "date-fns"

const serviceDetails: Record<string, { name: string; icon: React.ReactNode }> = {
  "light-fixture": { name: "Light Fixture Installation / Replacement", icon: <Lightbulb className="h-4 w-4" /> },
  "ceiling-fan": { name: "Ceiling Fan Installation", icon: <Lightbulb className="h-4 w-4" /> },
  "tv-small": { name: 'TV Installation (up to 55")', icon: <Home className="h-4 w-4" /> },
  "tv-large": { name: 'TV Installation (65" and larger)', icon: <Home className="h-4 w-4" /> },
  "soundbar": { name: "Soundbar Installation", icon: <Home className="h-4 w-4" /> },
  "surround-sound": { name: "Full Surround System", icon: <Home className="h-4 w-4" /> },
  "doorbell": { name: "Ring Doorbell Installation", icon: <Home className="h-4 w-4" /> },
  "single-camera": { name: "Single Camera Installation", icon: <Home className="h-4 w-4" /> },
  "multi-camera": { name: "Multi-Camera System", icon: <Home className="h-4 w-4" /> },
  "outlet-switch": { name: "Outlet / Dimmer Switch Upgrade", icon: <Lightbulb className="h-4 w-4" /> },
  "smart-switch": { name: "Smart Switch / Dimmer Install", icon: <Lightbulb className="h-4 w-4" /> },
  "picture-hanging-standard": { name: "Picture & Art Hanging (1-3 items)", icon: <Home className="h-4 w-4" /> },
  "picture-hanging-gallery": { name: "Gallery Walls / Multi-Piece Installs", icon: <Home className="h-4 w-4" /> },
  "landscape-basic": { name: "Landscape & Outdoor Lighting (basic)", icon: <Lightbulb className="h-4 w-4" /> },
  "landscape-custom": { name: "Landscape & Outdoor Lighting (custom)", icon: <Lightbulb className="h-4 w-4" /> },
  "cabinet-standard": { name: "Cabinet Lighting (standard)", icon: <Lightbulb className="h-4 w-4" /> },
  "cabinet-custom": { name: "Cabinet Lighting (custom)", icon: <Lightbulb className="h-4 w-4" /> },
  "garage-hex-1car": { name: "Garage Hex Lighting (1-car)", icon: <Lightbulb className="h-4 w-4" /> },
  "garage-hex-2car": { name: "Garage Hex Lighting (2-car)", icon: <Lightbulb className="h-4 w-4" /> },
  "permanent-led-exterior": { name: "Permanent LED Lighting (exterior)", icon: <Lightbulb className="h-4 w-4" /> },
  "permanent-led-home": { name: "Permanent LED Lighting (home)", icon: <Lightbulb className="h-4 w-4" /> },
  "led-bulb-per-fixture": { name: "LED Bulb Upgrade (per fixture)", icon: <Lightbulb className="h-4 w-4" /> },
  "led-bulb-whole-home": { name: "LED Bulb Whole-Home Conversion", icon: <Lightbulb className="h-4 w-4" /> },
  "fixture-cleaning": { name: "Light Fixture / Chandelier Cleaning", icon: <Lightbulb className="h-4 w-4" /> },
  "exterior-bulb-replacement": { name: "Exterior Light Bulb Replacement", icon: <Lightbulb className="h-4 w-4" /> },
  "large-ladder-fee": { name: "Large Ladder Fee (15'+)", icon: <Home className="h-4 w-4" /> },
}

const timeWindows: Record<string, string> = {
  morning: "Morning (8:00 AM - 12:00 PM)",
  afternoon: "Afternoon (12:00 PM - 4:00 PM)",
  evening: "Evening (5:00 PM - 7:00 PM)",
  flexible: "Flexible - Any Time",
  "8am": "8:00 AM - 9:00 AM",
  "10am": "10:00 AM - 11:00 AM",
  "11am": "11:00 AM - 12:00 PM",
  "1pm": "1:00 PM - 2:00 PM",
  "2pm": "2:00 PM - 3:00 PM",
  "4pm": "4:00 PM - 5:00 PM",
  "5pm": "5:00 PM - 6:00 PM",
}

const availableServices = [
  {
    id: "light-fixture",
    name: "Light Fixture Installation / Replacement",
    description: "Professional installation or replacement of light fixtures",
    basePrice: 150,
    category: "standard",
    pricingType: "flat",
  },
  {
    id: "ceiling-fan",
    name: "Ceiling Fan Installation",
    description: "Professional ceiling fan installation",
    basePrice: 185,
    category: "standard",
    pricingType: "flat",
  },
  {
    id: "tv-small",
    name: 'TV Installation (up to 55")',
    description: "Wall mount and installation for TVs up to 55 inches",
    basePrice: 200,
    category: "standard",
    pricingType: "flat",
  },
  {
    id: "tv-large",
    name: 'TV Installation (65" and larger)',
    description: "Wall mount and installation for TVs 65 inches and larger",
    basePrice: 350,
    category: "standard",
    pricingType: "flat",
  },
  {
    id: "soundbar",
    name: "Soundbar Installation",
    description: "Professional soundbar mounting and setup",
    basePrice: 200,
    category: "standard",
    pricingType: "flat",
  },
  {
    id: "surround-sound",
    name: "Full Surround System",
    description: "Complete surround sound system installation and configuration",
    basePrice: 600,
    category: "specialty",
    pricingType: "flat",
  },
  {
    id: "doorbell",
    name: "Ring Doorbell Installation",
    description: "Ring doorbell installation and setup",
    basePrice: 150,
    category: "standard",
    pricingType: "flat",
  },
  {
    id: "single-camera",
    name: "Single Camera Installation",
    description: "Professional installation of a single security camera",
    basePrice: 175,
    category: "standard",
    pricingType: "flat",
  },
  {
    id: "multi-camera",
    name: "Multi-Camera System",
    description: "Installation of a multi-camera security system",
    basePrice: 475,
    category: "specialty",
    pricingType: "flat",
  },
  {
    id: "outlet-switch",
    name: "Outlet / Dimmer Switch Upgrade",
    description: "Upgrade outlets or dimmer switches",
    basePrice: 100,
    category: "standard",
    pricingType: "flat",
  },
  {
    id: "smart-switch",
    name: "Smart Switch / Dimmer Install",
    description: "Installation of smart switches or dimmers",
    basePrice: 125,
    category: "standard",
    pricingType: "flat",
  },
  {
    id: "picture-hanging-standard",
    name: "Picture & Art Hanging (1-3 items)",
    description: "Professional hanging of 1-3 pictures or art pieces",
    basePrice: 125,
    category: "standard",
    pricingType: "flat",
  },
  {
    id: "picture-hanging-gallery",
    name: "Gallery Walls / Multi-Piece Installs",
    description: "Gallery wall layout and multi-piece art installation",
    basePrice: 237,
    category: "specialty",
    pricingType: "flat",
  },
  {
    id: "landscape-basic",
    name: "Landscape & Outdoor Lighting (basic)",
    description: "Basic landscape and outdoor lighting installation",
    basePrice: 850,
    category: "specialty",
    pricingType: "flat",
  },
  {
    id: "landscape-custom",
    name: "Landscape & Outdoor Lighting (custom)",
    description: "Custom landscape and outdoor lighting design and installation",
    basePrice: 2500,
    category: "specialty",
    pricingType: "flat",
  },
  {
    id: "cabinet-standard",
    name: "Cabinet Lighting (standard)",
    description: "Standard under-cabinet or in-cabinet lighting installation",
    basePrice: 550,
    category: "specialty",
    pricingType: "flat",
  },
  {
    id: "cabinet-custom",
    name: "Cabinet Lighting (custom)",
    description: "Custom cabinet lighting design and installation",
    basePrice: 1150,
    category: "specialty",
    pricingType: "flat",
  },
  {
    id: "garage-hex-1car",
    name: "Garage Hex Lighting (1-car)",
    description: "Hexagonal LED lighting for a 1-car garage",
    basePrice: 700,
    category: "specialty",
    pricingType: "flat",
  },
  {
    id: "garage-hex-2car",
    name: "Garage Hex Lighting (2-car)",
    description: "Hexagonal LED lighting for a 2-car garage",
    basePrice: 1150,
    category: "specialty",
    pricingType: "flat",
  },
  {
    id: "permanent-led-exterior",
    name: "Permanent LED Lighting (exterior)",
    description: "Permanent exterior LED lighting per linear foot",
    basePrice: 27,
    category: "specialty",
    pricingType: "flat",
  },
  {
    id: "permanent-led-home",
    name: "Permanent LED Lighting (home)",
    description: "Whole-home permanent LED lighting installation",
    basePrice: 4250,
    category: "specialty",
    pricingType: "flat",
  },
  {
    id: "led-bulb-per-fixture",
    name: "LED Bulb Upgrade (per fixture)",
    description: "LED bulb upgrade for a single fixture",
    basePrice: 17,
    category: "standard",
    pricingType: "flat",
  },
  {
    id: "led-bulb-whole-home",
    name: "LED Bulb Whole-Home Conversion",
    description: "Convert all home fixtures to LED bulbs",
    basePrice: 400,
    category: "standard",
    pricingType: "flat",
  },
  {
    id: "fixture-cleaning",
    name: "Light Fixture / Chandelier Cleaning",
    description: "Professional cleaning of light fixtures and chandeliers",
    basePrice: 150,
    category: "standard",
    pricingType: "flat",
  },
  {
    id: "exterior-bulb-replacement",
    name: "Exterior Light Bulb Replacement",
    description: "Replacement of exterior light bulbs",
    basePrice: 150,
    category: "standard",
    pricingType: "flat",
  },
  {
    id: "large-ladder-fee",
    name: "Large Ladder Fee (15'+)",
    description: "Additional fee for work requiring a large ladder (15 feet or more)",
    basePrice: 400,
    category: "standard",
    pricingType: "flat",
  },
]

export default function ConfirmationPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<any>(null)

  useEffect(() => {
    // Load booking data from localStorage
    const storedData = localStorage.getItem("bookingConfirmation")
    if (storedData) {
      setBookingData(JSON.parse(storedData))
      // Clear the confirmation data after loading
      localStorage.removeItem("bookingConfirmation")
    } else {
      // If no booking data, redirect to start
      router.push("/estimate/services")
    }
  }, [router])

  const getSelectedServicesWithDetails = () => {
    if (!bookingData?.services?.selectedServices) {
      return []
    }

    return bookingData.services.selectedServices
      .map((serviceId: string) => {
        const service = availableServices.find((s) => s.id === serviceId)
        if (!service) return null

        return {
          id: service.id,
          name: service.name,
          price: service.basePrice,
        }
      })
      .filter(Boolean)
  }

  if (!bookingData) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#FFCB00] mb-2">Thank you!</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your lighting and electrical service appointment has been successfully scheduled. We'll contact you to
              confirm the exact time and provide any additional details.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Order Summary - Left Column */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-[#FFCB00]" />
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {/* Appointment Details */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm font-medium">
                    <CheckCircle className="h-4 w-4 text-[#FFCB00]" />
                    <span>Appointment Details</span>
                  </div>
                  <div className="space-y-1 pl-6">
                    {bookingData.customer.preferredDate && (
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(bookingData.customer.preferredDate), "EEEE, MMMM do, yyyy")}
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground">
                      {timeWindows[bookingData.customer.timeWindow as keyof typeof timeWindows]}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Selected Services */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm font-medium">
                    <CheckCircle className="h-4 w-4 text-[#FFCB00]" />
                    <span>Selected Services</span>
                  </div>
                  <div className="space-y-2 pl-6">
                    {(() => {
                      const servicesWithDetails = getSelectedServicesWithDetails()
                      return servicesWithDetails.length > 0
                        ? servicesWithDetails.map((service: any, index: number) => (
                            <div key={index} className="flex justify-between text-sm gap-2">
                              <span className="text-muted-foreground break-words flex-1">{service.name}</span>
                              <span className="font-medium flex-shrink-0">${service.price.toLocaleString("en-US")}</span>
                            </div>
                          ))
                        : bookingData.services.selectedServices.map((serviceId: string) => {
                            const service = serviceDetails[serviceId as keyof typeof serviceDetails]
                            if (!service) return null
                            return (
                              <div key={serviceId} className="flex justify-between text-sm gap-2">
                                <span className="text-muted-foreground break-words flex-1">{service.name}</span>
                                <span className="font-medium flex-shrink-0">$</span>
                              </div>
                            )
                          })
                    })()}
                  </div>
                </div>

                {(() => {
                  const ladderFeeCount = bookingData?.services?.ladderFeeServices?.length || 0
                  if (ladderFeeCount === 0) return null
                  const ladderFeeTotal = ladderFeeCount * 400
                  return (
                    <>
                      <Separator />
                      <div className="flex justify-between text-sm gap-2">
                        <span className="text-muted-foreground break-words flex-1">
                          Large Ladder Fee{ladderFeeCount > 1 ? ` (×${ladderFeeCount})` : ""}
                        </span>
                        <span className="font-medium flex-shrink-0">
                          ${ladderFeeTotal.toLocaleString("en-US")}
                        </span>
                      </div>
                    </>
                  )
                })()}

                {bookingData?.services?.isSubscription && (
                  <>
                    <Separator />
                    <div className="flex justify-between text-sm gap-2">
                      <span className="text-green-600 break-words flex-1">Annual Plan Discount (15%)</span>
                      <span className="font-medium text-green-600 flex-shrink-0">
                        -{(() => {
                          const services = bookingData.services.selectedServices || []
                          const subtotal = services.reduce((t: number, id: string) => {
                            const svc = availableServices.find((s) => s.id === id)
                            return t + (svc?.basePrice || 0)
                          }, 0)
                          const ladderFeeCount = bookingData?.services?.ladderFeeServices?.length || 0
                          const ladderFeeTotal = ladderFeeCount * 400
                          return `$${Math.round((subtotal + ladderFeeTotal) * 0.15).toLocaleString("en-US")}`
                        })()}
                      </span>
                    </div>
                    <div className="rounded-lg border border-[#FFCB00]/30 bg-[#FFCB00]/5 p-3">
                      <p className="text-xs text-gray-600">
                        <span className="font-semibold">Annual Plan:</span> Priority scheduling, annual maintenance visit, and 1-year workmanship warranty.
                      </p>
                    </div>
                  </>
                )}

                {bookingData?.customer?.appliedPromoCode && bookingData?.customer?.promoDiscount > 0 && (
                  <>
                    <Separator />
                    <div className="flex justify-between text-sm gap-2">
                      <span className="text-green-600 break-words flex-1">
                        Promo Code ({bookingData.customer.appliedPromoCode})
                      </span>
                      <span className="font-medium text-green-600 flex-shrink-0">
                        -${bookingData.customer.promoDiscount.toLocaleString("en-US")}
                      </span>
                    </div>
                  </>
                )}

                <Separator />

                {/* Total Estimate */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-semibold">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-[#FFCB00]" />
                      <span className="text-sm">Total Estimate</span>
                    </div>
                    <span className="text-base">
                      $
                      {((bookingData.services.totalPrice || 0) - (bookingData?.customer?.promoDiscount || 0)).toLocaleString(
                        "en-US", { minimumFractionDigits: 2 },
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Details - Right Column */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-[#FFCB00]" />
                  <span>Customer Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Property Address</p>
                  <p className="font-medium">
                    {bookingData.address
                      ? bookingData.address.fullAddress || bookingData.address.searchQuery
                      : bookingData.customer
                        ? `${bookingData.customer.streetAddress || ""}, ${bookingData.customer.city || ""}, ${bookingData.customer.state || ""} ${bookingData.customer.zipCode || ""}`.replace(/^,\s*/, "").trim()
                        : "N/A"}
                  </p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="font-medium">
                    {bookingData.customer.firstName} {bookingData.customer.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="break-all">{bookingData.customer.email}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p>{bookingData.customer.phone}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* What's Next Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ArrowRight className="h-5 w-5 text-[#FFCB00]" />
                <span>What's Next?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#FFCB00] text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Confirmation Call</p>
                    <p className="text-sm text-muted-foreground">
                      Our team will contact you within 24 hours to confirm your appointment details and answer any
                      questions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#FFCB00] text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Property Assessment</p>
                    <p className="text-sm text-muted-foreground">
                      On the scheduled day, our professional team will arrive and conduct a final assessment before
                      beginning work.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#FFCB00] text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Service Completion</p>
                    <p className="text-sm text-muted-foreground">
                      We'll complete your lighting and electrical service and ensure you're completely satisfied with the
                      results.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Return Home Button */}
          <div className="text-center">
            <Button onClick={() => router.push("/")} size="lg" className="px-8">
              Return to Home
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
