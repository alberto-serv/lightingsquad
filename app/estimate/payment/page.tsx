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
  Zap,
  Check,
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
  { id: "light-fixture", name: "Light Fixture Installation / Replacement", basePrice: 150 },
  { id: "ceiling-fan", name: "Ceiling Fan Installation", basePrice: 185 },
  { id: "tv-small", name: "TV Installation (up to 55\")", basePrice: 200 },
  { id: "tv-large", name: "TV Installation (65\" and larger)", basePrice: 350 },
  { id: "soundbar", name: "Soundbar Installation", basePrice: 200 },
  { id: "surround-sound", name: "Full Surround System", basePrice: 600 },
  { id: "doorbell", name: "Ring Doorbell Installation", basePrice: 150 },
  { id: "single-camera", name: "Single Camera Installation", basePrice: 175 },
  { id: "multi-camera", name: "Multi-Camera System", basePrice: 475 },
  { id: "outlet-switch", name: "Outlet / Dimmer Switch Upgrade", basePrice: 100 },
  { id: "smart-switch", name: "Smart Switch / Dimmer Install", basePrice: 125 },
  { id: "picture-hanging-standard", name: "Picture & Art Hanging (1-3 items)", basePrice: 125 },
  { id: "picture-hanging-gallery", name: "Gallery Walls / Multi-Piece Installs", basePrice: 237 },
  { id: "landscape-basic", name: "Landscape & Outdoor Lighting (basic)", basePrice: 850 },
  { id: "landscape-custom", name: "Landscape & Outdoor Lighting (custom)", basePrice: 2500 },
  { id: "cabinet-standard", name: "Cabinet Lighting (standard)", basePrice: 550 },
  { id: "cabinet-custom", name: "Cabinet Lighting (custom)", basePrice: 1150 },
  { id: "garage-hex-1car", name: "Garage Hex Lighting (1-car)", basePrice: 700 },
  { id: "garage-hex-2car", name: "Garage Hex Lighting (2-car)", basePrice: 1150 },
  { id: "permanent-led-exterior", name: "Permanent LED Lighting (exterior)", basePrice: 27 },
  { id: "permanent-led-home", name: "Permanent LED Lighting (home)", basePrice: 4250 },
  { id: "led-bulb-per-fixture", name: "LED Bulb Upgrade (per fixture)", basePrice: 17 },
  { id: "led-bulb-whole-home", name: "LED Bulb Whole-Home Conversion", basePrice: 400 },
  { id: "fixture-cleaning", name: "Light Fixture / Chandelier Cleaning", basePrice: 150 },
  { id: "exterior-bulb-replacement", name: "Exterior Light Bulb Replacement", basePrice: 150 },
]

const SUBSCRIPTION_DISCOUNT = 0.15
const MONTHLY_MEMBERSHIP_FEE = 29.99

export default function PaymentPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [isSubscription, setIsSubscription] = useState(false)

  // Payment form state
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvc, setCvc] = useState("")
  const [billingZip, setBillingZip] = useState("")

  useEffect(() => {
    // Load booking data from localStorage
    const storedData = localStorage.getItem("estimateData")
    const confirmationData = localStorage.getItem("bookingConfirmation")

    if (confirmationData) {
      const parsed = JSON.parse(confirmationData)
      setBookingData(parsed)
      setIsSubscription(parsed.services?.isSubscription || false)
    } else if (storedData) {
      const parsed = JSON.parse(storedData)
      setBookingData(parsed)
      setIsSubscription(parsed.services?.isSubscription || false)
    } else {
      router.push("/estimate/services")
    }
  }, [router])

  // Persist subscription choice to localStorage
  useEffect(() => {
    if (!bookingData) return
    const updatedData = {
      ...bookingData,
      services: {
        ...bookingData.services,
        isSubscription,
      },
    }
    setBookingData(updatedData)
    localStorage.setItem("estimateData", JSON.stringify(updatedData))
  }, [isSubscription])

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

  const getSubtotal = () => {
    const services = getSelectedServicesWithDetails()
    return services.reduce((total: number, service: any) => total + service.price, 0)
  }

  const getLadderFeeCount = () => {
    return bookingData?.services?.ladderFeeServices?.length || 0
  }

  const getLadderFeeTotal = () => {
    return getLadderFeeCount() > 0 ? 400 : 0
  }

  const getSubscriptionDiscount = () => {
    if (!isSubscription) return 0
    return Math.round((getSubtotal() + getLadderFeeTotal()) * SUBSCRIPTION_DISCOUNT)
  }

  const getTotal = () => {
    return getSubtotal() + getLadderFeeTotal() - getSubscriptionDiscount() - promoDiscount
  }

  const handleApplyPromo = () => {
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
      services: {
        ...bookingData.services,
        isSubscription,
        totalPrice: getTotal(),
      },
      payment: {
        last4: cardNumber.slice(-4),
        promoCode: appliedPromo,
        promoDiscount: promoDiscount,
        subscriptionDiscount: getSubscriptionDiscount(),
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

  const subtotal = getSubtotal()
  const ladderFeeCount = getLadderFeeCount()
  const ladderFeeTotal = getLadderFeeTotal()
  const savings = getSubscriptionDiscount()
  const potentialSavings = Math.round((subtotal + ladderFeeTotal) * SUBSCRIPTION_DISCOUNT)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Membership + Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Membership Option */}
              <Card className={`overflow-hidden transition-all duration-200 ${isSubscription ? "ring-2 ring-[#FFCB00]" : ""}`}>
                <CardContent className="p-0">
                  <div
                    className="cursor-pointer p-5"
                    onClick={() => setIsSubscription(!isSubscription)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                        isSubscription
                          ? "border-[#FFCB00] bg-[#FFCB00]"
                          : "border-gray-300"
                      }`}>
                        {isSubscription && <Check className="w-3 h-3 text-black" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          Save ${potentialSavings.toLocaleString("en-US")} on this order?
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-[#FFCB00]" />
                          <span className="text-sm font-medium text-gray-700">Join the Lighting Squad</span>
                          <span className="text-xs font-bold bg-[#FFCB00] text-black px-2 py-0.5 rounded-full">${MONTHLY_MEMBERSHIP_FEE}/mo</span>
                        </div>

                        {/* Perks */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {[
                            "15% off all services",
                            "Priority scheduling",
                            "Annual maintenance visit",
                            "1-year workmanship warranty",
                          ].map((perk) => (
                            <div key={perk} className="flex items-center gap-1.5 text-xs text-gray-600">
                              <Check className="w-3.5 h-3.5 text-[#FFCB00] flex-shrink-0" />
                              {perk}
                            </div>
                          ))}
                        </div>

                        {isSubscription && subtotal > 0 && (
                          <div className="mt-3 p-2.5 bg-[#FFCB00]/10 rounded-lg border border-[#FFCB00]/30">
                            <p className="text-sm text-[#b8920a] font-semibold">
                              You save ${savings.toLocaleString("en-US")} on today&apos;s order
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-[#FFCB00]" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitPayment} className="space-y-4">
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

                  </form>
                </CardContent>
              </Card>

              {/* Promo Code Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-[#FFCB00]" />
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
                      Promo code &quot;{appliedPromo}&quot; applied successfully!
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Submit Button - Mobile */}
              <div className="lg:hidden">
                <Button
                  onClick={handleSubmitPayment}
                  disabled={isLoading}
                  className="w-full bg-[#FFCB00] hover:bg-[#FFCB00]/90 text-black"
                  size="lg"
                >
                  {isLoading ? "Processing..." : `Pay $${getTotal().toLocaleString("en-US")}`}
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
                      <CheckCircle className="h-4 w-4 text-[#FFCB00]" />
                      <span>Selected Services</span>
                    </div>
                    <div className="space-y-2 pl-6">
                      {getSelectedServicesWithDetails().map((service: any) => (
                        <div key={service.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{service.name}</span>
                          <span className="font-medium">${service.price.toLocaleString("en-US")}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Large Ladder Fee */}
                  {ladderFeeCount > 0 && (
                    <>
                      <Separator />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Large Ladder Fee
                        </span>
                        <span className="font-medium">${ladderFeeTotal.toLocaleString("en-US")}</span>
                      </div>
                    </>
                  )}

                  {/* Membership Discount */}
                  {isSubscription && (
                    <>
                      <Separator />
                      <div className="flex justify-between text-sm">
                        <span className="text-[#b8920a] font-medium">Member Discount (15%)</span>
                        <span className="font-medium text-[#b8920a]">
                          -${savings.toLocaleString("en-US")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Monthly membership</span>
                        <span className="font-medium text-muted-foreground">${MONTHLY_MEMBERSHIP_FEE}/mo</span>
                      </div>
                    </>
                  )}

                  {/* Promo Discount */}
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Promo Code ({appliedPromo})</span>
                      <span className="font-medium text-green-600">-${promoDiscount.toLocaleString("en-US")}</span>
                    </div>
                  )}

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 font-semibold">
                      <DollarSign className="h-4 w-4 text-[#FFCB00]" />
                      <span>Total</span>
                    </div>
                    <span className="text-xl font-bold">${getTotal().toLocaleString("en-US")}</span>
                  </div>

                  {/* Submit Button - Desktop */}
                  <div className="hidden lg:block pt-2">
                    <Button
                      onClick={handleSubmitPayment}
                      disabled={isLoading}
                      className="w-full bg-[#FFCB00] hover:bg-[#FFCB00]/90 text-black"
                      size="lg"
                    >
                      {isLoading ? "Processing..." : `Pay $${getTotal().toLocaleString("en-US")}`}
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
