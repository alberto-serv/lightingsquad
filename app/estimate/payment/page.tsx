"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  CreditCard,
  Lock,
  Calendar,
  CheckCircle,
  DollarSign,
  Shield,
} from "lucide-react"
import { format } from "date-fns"

const timeWindows: Record<string, string> = {
  morning: "8:00 AM - 12:00 PM",
  afternoon: "12:00 PM - 4:00 PM",
  evening: "5:00 PM - 7:00 PM",
  flexible: "Any Time",
  "8am": "8:00 AM - 9:00 AM",
  "10am": "10:00 AM - 11:00 AM",
  "11am": "11:00 AM - 12:00 PM",
  "1pm": "1:00 PM - 2:00 PM",
  "2pm": "2:00 PM - 3:00 PM",
  "4pm": "4:00 PM - 5:00 PM",
  "5pm": "5:00 PM - 6:00 PM",
}

const availableServices = [
  { id: "dryer-vent-cleaning", name: "Dryer Vent Cleaning", basePrice: 159 },
  { id: "roof-access", name: "Roof Access Vent Cleaning", basePrice: 249 },
  { id: "ac-duct-cleaning", name: "AC or DUCT Cleaning", basePrice: 500 },
  { id: "repair-estimate", name: "Repair or Reroute Estimate", basePrice: 0 },
  { id: "dryer-vent-special", name: "Dryer Vent Cleaning Special", basePrice: 350 },
  { id: "second-floor", name: "Second Floor Cleaning", basePrice: 189 },
  { id: "coil-cleaning", name: "Coil Cleaning", basePrice: 385 },
  { id: "bathroom-fan", name: "Bathroom Fan Cleaning", basePrice: 175 },
]

export default function PaymentPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [promoDiscount, setPromoDiscount] = useState(0)

  // Payment form state
  const [cardName, setCardName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvc, setCvc] = useState("")
  const [billingZip, setBillingZip] = useState("")

  useEffect(() => {
    // Load booking data from localStorage
    const storedData = localStorage.getItem("estimateData")
    const confirmationData = localStorage.getItem("bookingConfirmation")

    if (confirmationData) {
      // Use bookingConfirmation if available (has customer data)
      setBookingData(JSON.parse(confirmationData))
    } else if (storedData) {
      // Fall back to estimateData
      setBookingData(JSON.parse(storedData))
    } else {
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

  const getSubtotal = () => {
    const services = getSelectedServicesWithDetails()
    return services.reduce((total: number, service: any) => total + service.price, 0)
  }

  const getSubscriptionDiscount = () => {
    if (!bookingData?.services?.isSubscription) return 0
    return Math.round(getSubtotal() * 0.15)
  }

  const getTotal = () => {
    return getSubtotal() - getSubscriptionDiscount() - promoDiscount
  }

  const handleApplyPromo = () => {
    // Simple promo code logic - in production this would validate against a backend
    if (promoCode.toUpperCase() === "SAVE10") {
      const discount = Math.round(getSubtotal() * 0.1)
      setPromoDiscount(discount)
      setAppliedPromo(promoCode.toUpperCase())
    } else if (promoCode.toUpperCase() === "FIRST20") {
      const discount = Math.round(getSubtotal() * 0.2)
      setPromoDiscount(discount)
      setAppliedPromo(promoCode.toUpperCase())
    } else {
      setPromoDiscount(0)
      setAppliedPromo(null)
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store confirmation data
    const confirmationData = {
      ...bookingData,
      payment: {
        last4: cardNumber.slice(-4),
        promoCode: appliedPromo,
        promoDiscount: promoDiscount,
        total: getTotal(),
      },
      customer: {
        ...bookingData.customer,
        appliedPromoCode: appliedPromo,
        promoDiscount: promoDiscount,
      },
    }

    localStorage.setItem("bookingConfirmation", JSON.stringify(confirmationData))
    
    // Clear estimate data
    localStorage.removeItem("estimateData")

    router.push("/estimate/confirmation")
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-[#2A75AE]" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitPayment} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          maxLength={19}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                          maxLength={5}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="cvc"
                            placeholder="123"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            maxLength={4}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="billingZip">Billing ZIP Code *</Label>
                      <Input
                        id="billingZip"
                        placeholder="12345"
                        value={billingZip}
                        onChange={(e) => setBillingZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                        maxLength={5}
                        required
                      />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                      <Lock className="h-4 w-4" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Promo Code Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-[#2A75AE]" />
                    Promo Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleApplyPromo}
                    >
                      Apply
                    </Button>
                  </div>
                  {appliedPromo && (
                    <p className="text-sm text-green-600 mt-2">
                      Promo code "{appliedPromo}" applied successfully!
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Info Banner */}
              <Card className="bg-blue-50 border-[#2A75AE]/20">
                <CardContent className="p-4">
                  <p className="text-sm text-foreground">
                    {"You'll be charged today and your service will be scheduled."}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Payment is fully refundable prior to your first service.
                  </p>
                </CardContent>
              </Card>

              {/* Submit Button - Mobile */}
              <div className="lg:hidden">
                <Button
                  onClick={handleSubmitPayment}
                  disabled={isLoading}
                  className="w-full bg-[#2A75AE] hover:bg-[#2A75AE]/90"
                  size="lg"
                >
                  {isLoading ? "Processing..." : `Pay $${getTotal().toFixed(2)}`}
                </Button>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Appointment */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Appointment</span>
                    </div>
                    <div className="pl-6 text-sm text-muted-foreground">
                      {bookingData.customer?.preferredDate && (
                        <p>{format(new Date(bookingData.customer.preferredDate), "EEEE, MMMM do, yyyy")}</p>
                      )}
                      <p>{timeWindows[bookingData.customer?.timeWindow as keyof typeof timeWindows] || "Flexible"}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Selected Services */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle className="h-4 w-4 text-[#2A75AE]" />
                      <span>Selected Services</span>
                    </div>
                    <div className="space-y-2 pl-6">
                      {getSelectedServicesWithDetails().map((service: any) => (
                        <div key={service.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{service.name}</span>
                          <span className="font-medium">${service.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subscription Discount */}
                  {bookingData?.services?.isSubscription && getSubscriptionDiscount() > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Subscribe & Save (15%)</span>
                      <span className="font-medium text-green-600">-${getSubscriptionDiscount().toFixed(2)}</span>
                    </div>
                  )}

                  {/* Promo Discount */}
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Promo Code ({appliedPromo})</span>
                      <span className="font-medium text-green-600">-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 font-semibold">
                      <DollarSign className="h-4 w-4 text-[#2A75AE]" />
                      <span>Total</span>
                    </div>
                    <span className="text-xl font-bold">${getTotal().toFixed(2)}</span>
                  </div>

                  {/* Subscription Info Box */}
                  {bookingData?.services?.isSubscription && (
                    <div className="border-2 border-[#2A75AE] rounded-lg p-3 bg-[#2A75AE]/5">
                      <p className="text-xs text-[#2A75AE] leading-relaxed">
                        <span className="font-semibold">Recurring Service:</span> Annual subscription with 15% savings. Cancel anytime.
                      </p>
                    </div>
                  )}

                  {/* Secure Checkout */}
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
                    <Shield className="h-4 w-4" />
                    <span>Secure checkout</span>
                  </div>

                  {/* Submit Button - Desktop */}
                  <div className="hidden lg:block pt-2">
                    <Button
                      onClick={handleSubmitPayment}
                      disabled={isLoading}
                      className="w-full bg-[#2A75AE] hover:bg-[#2A75AE]/90"
                      size="lg"
                    >
                      {isLoading ? "Processing..." : `Pay $${getTotal().toFixed(2)}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
