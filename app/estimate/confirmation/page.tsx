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
  Phone,
  Mail,
  Home,
  TreePine,
  Building,
  Droplets,
  MessageSquare,
  ArrowRight,
  Shield,
  DollarSign,
  Plus,
} from "lucide-react"
import { format } from "date-fns"

const serviceDetails = {
  "dryer-vent-cleaning": { name: "Dryer Vent Cleaning", icon: <Home className="h-4 w-4" /> },
  "roof-access": { name: "Roof Access Vent Cleaning", icon: <Building className="h-4 w-4" /> },
  "ac-duct-cleaning": { name: "AC or DUCT Cleaning", icon: <Droplets className="h-4 w-4" /> },
  "repair-estimate": { name: "Repair or Reroute Estimate", icon: <Home className="h-4 w-4" /> },
  "dryer-vent-special": { name: "Dryer Vent Cleaning Special", icon: <TreePine className="h-4 w-4" /> },
  "second-floor": { name: "Second Floor Cleaning", icon: <Building className="h-4 w-4" /> },
  "coil-cleaning": { name: "Coil Cleaning", icon: <Droplets className="h-4 w-4" /> },
  "bathroom-fan": { name: "Bathroom Fan Cleaning", icon: <Home className="h-4 w-4" /> },
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

// Added interfaces and data for detailed order summary
interface AddOn {
  id: string
  name: string
  description: string
  price: number
  pricingType?: "flat" | "perUnit"
  unit?: string
}

const availableAddOns: AddOn[] = [
  {
    id: "window-cleaning",
    name: "Window Cleaning",
    description: "Interior and exterior window cleaning",
    price: 8,
    pricingType: "perUnit",
    unit: "window",
  },
  {
    id: "gutter-guards",
    name: "Gutter Guard Installation",
    description: "Protect gutters from debris buildup",
    price: 350,
    pricingType: "flat",
  },
  {
    id: "concrete-sealing",
    name: "Concrete Sealing",
    description: "Protective sealant for driveways and walkways",
    price: 200,
    pricingType: "flat",
  },
  {
    id: "rust-removal",
    name: "Rust Stain Removal",
    description: "Specialized treatment for rust stains",
    price: 80,
    pricingType: "flat",
  },
]

const availableServices = [
  {
    id: "dryer-vent-cleaning",
    name: "Dryer Vent Cleaning",
    description:
      "Full deep cleaning of dryer vent including vent inspection camera scope cleaning using professional tools and a years guarantee",
    basePrice: 159,
    category: "standard",
    pricingType: "flat",
  },
  {
    id: "roof-access",
    name: "Roof Access Vent Cleaning",
    description:
      "Access Via Roof for Basic Dryer Vent Cleaning - Includes Vent Inspection Camera Scope & Cleaning with One Year Guarantee",
    basePrice: 249,
    category: "specialty",
    pricingType: "flat",
  },
  {
    id: "ac-duct-cleaning",
    name: "AC or DUCT Cleaning",
    description:
      "AC Duct Cleaning - Pricing for AC Duct Cleaning depends on the amount of AC Ducts in your home. Most single family homes (8-10 air ducts) will cost $500.",
    basePrice: 500,
    category: "specialty",
    pricingType: "flat",
  },
  {
    id: "repair-estimate",
    name: "Repair or Reroute Estimate",
    description: "Free consultation for repair or reroute services",
    basePrice: 0,
    category: "consultation",
    pricingType: "flat",
  },
  {
    id: "dryer-vent-special",
    name: "Dryer Vent Cleaning Special",
    description:
      "Our full, professional deep clean of your dryer vent, a new, fire resistant and high flow transition hose, a new magnetic and bird-proof exterior vent door and new braided washer hoses - save $150 on upgrades with this bundle!",
    basePrice: 350,
    category: "special",
    pricingType: "flat",
  },
  {
    id: "second-floor",
    name: "Second Floor Cleaning",
    description:
      "Basic dryer vent cleaning from a second floor dryer including vent inspection camera scope cleaning using professional tools and a years guarantee",
    basePrice: 189,
    category: "standard",
    pricingType: "flat",
  },
  {
    id: "coil-cleaning",
    name: "Coil Cleaning",
    description:
      "Deep cleaning of AC coils for maximum efficiency and performance. Improves cooling capacity and reduces energy costs.",
    basePrice: 385,
    category: "specialty",
    pricingType: "flat",
  },
  {
    id: "bathroom-fan",
    name: "Bathroom Fan Cleaning",
    description:
      "Remove dust and debris from bathroom exhaust fans for better ventilation and air quality.",
    basePrice: 175,
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

        let price = service.basePrice
        if (serviceId === "ac-duct-cleaning" && bookingData.services.ductCount) {
          const ductCount = bookingData.services.ductCount
          if (ductCount > 10) {
            price = 500 + (ductCount - 10) * 30
          }
        }

        return {
          id: service.id,
          name: service.name,
          price: price,
        }
      })
      .filter(Boolean)
  }

  const getSelectedAddOnsWithDetails = () => {
    if (!bookingData?.services?.selectedAddOns) {
      return []
    }

    return bookingData.services.selectedAddOns
      .map((addOnId: string) => {
        const addOn = availableAddOns.find((a) => a.id === addOnId)
        if (!addOn) return null

        const quantity = bookingData.services.addOnQuantities?.[addOnId] || 1
        const totalPrice = addOn.price * quantity

        return {
          id: addOn.id,
          name: addOn.name,
          price: totalPrice,
          quantity: quantity,
          unitPrice: addOn.price,
          pricingType: addOn.pricingType,
          unit: addOn.unit,
        }
      })
      .filter(Boolean)
  }

  const getDiscountAmount = () => {
    if (!bookingData?.services?.isSubscription) return 0
    const servicesWithDetails = getSelectedServicesWithDetails()
    const servicesTotal = servicesWithDetails.reduce((total: number, service: any) => total + service.price, 0)
    const addOnsWithDetails = getSelectedAddOnsWithDetails()
    const addOnsTotal = addOnsWithDetails.reduce((total: number, addOn: any) => total + addOn.price, 0)
    const subtotal = servicesTotal + addOnsTotal
    return Math.round(subtotal * 0.15) // 15% subscription discount
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
            <div className="mx-auto w-16 h-16 bg-[#2A75AE]/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-[#2A75AE]" />
            </div>
            <h1 className="text-3xl font-bold text-[#2A75AE] mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your dryer vent cleaning appointment has been successfully scheduled. We'll contact you to confirm the
              exact time and provide any additional details.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Order Summary - Left Column */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-[#2A75AE]" />
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {/* Appointment Details */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm font-medium">
                    <CheckCircle className="h-4 w-4 text-[#2A75AE]" />
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
                    <CheckCircle className="h-4 w-4 text-[#2A75AE]" />
                    <span>Selected Services</span>
                  </div>
                  <div className="space-y-2 pl-6">
                    {(() => {
                      const servicesWithDetails = getSelectedServicesWithDetails()
                      return servicesWithDetails.length > 0
                        ? servicesWithDetails.map((service: any, index: number) => (
                            <div key={index} className="flex justify-between text-sm gap-2">
                              <span className="text-muted-foreground break-words flex-1">{service.name}</span>
                              <span className="font-medium flex-shrink-0">${service.price.toFixed(2)}</span>
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

                {/* Add-Ons */}
                {getSelectedAddOnsWithDetails().length > 0 && (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm font-medium">
                        <Plus className="h-4 w-4 text-[#2A75AE]" />
                        <span>Add-Ons</span>
                      </div>
                      <div className="space-y-2 pl-6">
                        {getSelectedAddOnsWithDetails().map((addOn: any, index: number) => (
                          <div key={index} className="flex justify-between text-sm gap-2">
                            <span className="text-muted-foreground break-words flex-1">
                              {addOn.name}
                              {addOn.pricingType === "perUnit" &&
                                ` (${addOn.quantity} ${addOn.unit}${addOn.quantity > 1 ? "s" : ""})`}
                            </span>
                            <span className="font-medium flex-shrink-0">${addOn.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Discounts */}
                {bookingData?.services?.isSubscription && getDiscountAmount() > 0 && (
                  <>
                    <Separator />
                    <div className="flex justify-between text-sm gap-2">
                      <span className="text-green-600 break-words flex-1">Subscribe & Save Discount (15%)</span>
                      <span className="font-medium text-green-600 flex-shrink-0">
                        -${getDiscountAmount().toFixed(2)}
                      </span>
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
                        -${bookingData.customer.promoDiscount.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}

                <Separator />

                {/* Total Estimate */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-semibold">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-[#2A75AE]" />
                      <span className="text-sm">Total Estimate</span>
                    </div>
                    <span className="text-base">
                      $
                      {((bookingData.services.totalPrice || 0) - (bookingData?.customer?.promoDiscount || 0)).toFixed(
                        2,
                      )}
                    </span>
                  </div>
                </div>

                {/* Subscription Message Box */}
                {bookingData?.services?.isSubscription && (
                  <>
                    <Separator />
                    <div className="border-2 border-[#2A75AE] rounded-lg p-3 bg-[#2A75AE]/5">
                      <div className="text-xs text-[#2A75AE] leading-relaxed">
                        <span className="font-semibold">Recurring Service:</span> Annual subscription with 15% savings
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Customer Details - Right Column */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-[#2A75AE]" />
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
                <ArrowRight className="h-5 w-5 text-[#2A75AE]" />
                <span>What's Next?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#2A75AE] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
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
                  <div className="w-6 h-6 bg-[#2A75AE] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
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
                  <div className="w-6 h-6 bg-[#2A75AE] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Service Completion</p>
                    <p className="text-sm text-muted-foreground">
                      We'll complete your dryer vent cleaning service and ensure you're completely satisfied with the
                      results.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Need Help Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-[#2A75AE]" />
                <span>Need Help?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Have questions about your booking or need to make changes? We're here to help!
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <Button variant="outline" className="flex items-center space-x-2 bg-transparent" asChild>
                  <a href="tel:+16156322980">
                    <Phone className="h-4 w-4" />
                    <span>Call (615) 632-2980</span>
                  </a>
                </Button>

                <Button variant="outline" className="flex items-center space-x-2 bg-transparent" asChild>
                  <a href="mailto:anaramos@homerunfranchises.com">
                    <Mail className="h-4 w-4" />
                    <span>Email Support</span>
                  </a>
                </Button>
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
