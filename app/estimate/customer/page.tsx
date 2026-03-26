"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Clock,
  User,
  Mail,
  Phone,
  ArrowLeft,
  ArrowRight,
  MapPin,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react"
import {
  format,
  addDays,
  isWeekend,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns"
import { Checkbox } from "@/components/ui/checkbox"

interface CustomerData {
  firstName: string
  lastName: string
  email: string
  phone: string
  streetAddress: string
  city: string
  state: string
  zipCode: string
  preferredDate?: Date
  timeWindow: string
  termsAccepted?: boolean
  appliedPromoCode?: string | null
  promoDiscount?: number
  phoneVerified?: boolean
}

interface AddOn {
  id: string
  name: string
  description: string
  price: number
  pricingType: string
  unit?: string
}

const timeSlots = [
  { value: "8am", label: "8:00 AM - 9:00 AM" },
  { value: "10am", label: "10:00 AM - 11:00 AM" },
  { value: "11am", label: "11:00 AM - 12:00 PM" },
  { value: "1pm", label: "1:00 PM - 2:00 PM" },
  { value: "2pm", label: "2:00 PM - 3:00 PM" },
  { value: "4pm", label: "4:00 PM - 5:00 PM" },
]

// Simulate unavailability: derive hidden slots from the selected date
function getUnavailableSlots(date: Date | undefined): string[] {
  if (!date) return []
  const day = date.getDate()
  const values = timeSlots.map((s) => s.value)
  const unavailable: string[] = []
  unavailable.push(values[day % values.length])
  unavailable.push(values[(day + 2) % values.length])
  unavailable.push(values[(day + 5) % values.length])
  return [...new Set(unavailable)]
}

// US Federal Holidays for 2024-2026
const HOLIDAYS = [
  "2024-01-01", "2024-01-15", "2024-02-19", "2024-05-27", "2024-06-19",
  "2024-07-04", "2024-09-02", "2024-10-14", "2024-11-11", "2024-11-28",
  "2024-12-25",
  "2025-01-01", "2025-01-20", "2025-02-17", "2025-05-26", "2025-06-19",
  "2025-07-04", "2025-09-01", "2025-10-13", "2025-11-11", "2025-11-27",
  "2025-12-25",
  "2026-01-01", "2026-01-19", "2026-02-16", "2026-05-25", "2026-06-19",
  "2026-07-03", "2026-09-07", "2026-10-12", "2026-11-11", "2026-11-26",
  "2026-12-25",
]

function isHoliday(date: Date): boolean {
  const dateStr = format(date, "yyyy-MM-dd")
  return HOLIDAYS.includes(dateStr)
}

function getFirstAvailableDate(): Date {
  let date = new Date()
  while (isWeekend(date) || isHoliday(date)) {
    date = addDays(date, 1)
  }
  return date
}

const availableServices = [
  { id: "light-fixture", name: "Light Fixture Installation / Replacement", basePrice: 150, category: "installation", pricingType: "flat" },
  { id: "ceiling-fan", name: "Ceiling Fan Installation", basePrice: 185, category: "installation", pricingType: "flat" },
  { id: "tv-small", name: "TV Installation (up to 55\")", basePrice: 200, category: "installation", pricingType: "flat" },
  { id: "tv-large", name: "TV Installation (65\" and larger)", basePrice: 350, category: "installation", pricingType: "flat" },
  { id: "soundbar", name: "Soundbar Installation", basePrice: 200, category: "installation", pricingType: "flat" },
  { id: "surround-sound", name: "Full Surround System (5.1/7.1)", basePrice: 600, category: "installation", pricingType: "flat" },
  { id: "doorbell", name: "Ring Doorbell Installation", basePrice: 150, category: "installation", pricingType: "flat" },
  { id: "single-camera", name: "Single Camera Installation", basePrice: 175, category: "installation", pricingType: "flat" },
  { id: "multi-camera", name: "Multi-Camera System (3-5 cams)", basePrice: 475, category: "installation", pricingType: "flat" },
  { id: "outlet-switch", name: "Outlet / Dimmer Switch Upgrade", basePrice: 100, category: "electrical", pricingType: "flat" },
  { id: "smart-switch", name: "Smart Switch / Dimmer Install", basePrice: 125, category: "electrical", pricingType: "flat" },
  { id: "picture-hanging-standard", name: "Picture & Art Hanging (1-3 items)", basePrice: 125, category: "installation", pricingType: "flat" },
  { id: "picture-hanging-gallery", name: "Gallery Walls / Multi-Piece Installs", basePrice: 237, category: "installation", pricingType: "flat" },
  { id: "landscape-basic", name: "Landscape & Outdoor Lighting (basic)", basePrice: 850, category: "lighting", pricingType: "flat" },
  { id: "landscape-custom", name: "Landscape & Outdoor Lighting (custom)", basePrice: 2500, category: "lighting", pricingType: "flat" },
  { id: "cabinet-standard", name: "Cabinet Lighting (standard)", basePrice: 550, category: "lighting", pricingType: "flat" },
  { id: "cabinet-custom", name: "Cabinet Lighting (custom)", basePrice: 1150, category: "lighting", pricingType: "flat" },
  { id: "garage-hex-1car", name: "Garage Hex Lighting (1-car)", basePrice: 700, category: "lighting", pricingType: "flat" },
  { id: "garage-hex-2car", name: "Garage Hex Lighting (2-car)", basePrice: 1150, category: "lighting", pricingType: "flat" },
  { id: "permanent-led-exterior", name: "Permanent LED Lighting (exterior per ft)", basePrice: 27, category: "lighting", pricingType: "flat" },
  { id: "permanent-led-home", name: "Permanent LED Lighting (typical home)", basePrice: 4250, category: "lighting", pricingType: "flat" },
  { id: "led-bulb-per-fixture", name: "LED Bulb Upgrade (per fixture)", basePrice: 17, category: "lighting", pricingType: "flat" },
  { id: "led-bulb-whole-home", name: "LED Bulb Whole-Home Conversion", basePrice: 400, category: "lighting", pricingType: "flat" },
  { id: "fixture-cleaning", name: "Light Fixture / Chandelier Cleaning", basePrice: 150, category: "maintenance", pricingType: "flat" },
  { id: "exterior-bulb-replacement", name: "Exterior Light Bulb Replacement", basePrice: 150, category: "maintenance", pricingType: "flat" },
]

const availableAddOns: AddOn[] = []


export default function CustomerPage() {
  const router = useRouter()
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    timeWindow: "",
    termsAccepted: false,
    phoneVerified: false,
  })
  const [estimateData, setEstimateData] = useState<any>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [otpCode, setOtpCode] = useState<string>("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)

  const [showPromoCode, setShowPromoCode] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [promoError, setPromoError] = useState("")

  useEffect(() => {
    // Check if previous steps are completed
    const storedData = localStorage.getItem("estimateData")

    if (!storedData) {
      router.push("/estimate/services")
      return
    }

    const data = JSON.parse(storedData)

    if (!data.services) {
      router.push("/estimate/services")
    } else {
      setEstimateData(data)
      // Pre-fill customer data if available from previous session
      if (data.customer) {
        setCustomerData({
          ...data.customer,
          preferredDate: data.customer.preferredDate ? new Date(data.customer.preferredDate) : getFirstAvailableDate(),
        })
        if (data.customer.phoneVerified) {
          setPhoneVerified(true)
        }
        if (data.customer.appliedPromoCode) {
          setAppliedPromoCode(data.customer.appliedPromoCode)
          setPromoDiscount(data.customer.promoDiscount || 0)
        }
      } else {
        // Set default date for new customers
        setCustomerData((prev) => ({
          ...prev,
          preferredDate: getFirstAvailableDate(),
        }))
      }
    }
  }, [router])

  useEffect(() => {
    if (showOtpInput && resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (resendTimer === 0) {
      setCanResend(true)
    }
  }, [showOtpInput, resendTimer])

  const handleInputChange = (field: keyof CustomerData, value: any) => {
    const updated = { ...customerData, [field]: value }

    // Clear time window if date changes and selected slot is now unavailable
    if (field === "preferredDate" && updated.timeWindow) {
      const unavailable = getUnavailableSlots(value as Date)
      if (unavailable.includes(updated.timeWindow)) {
        updated.timeWindow = ""
      }
    }

    setCustomerData(updated)
  }

  const handlePhoneVerification = () => {
    if (customerData.phone && !showOtpInput) {
      setShowOtpInput(true)
      setResendTimer(30)
      setCanResend(false)
      // Simulate sending OTP
      console.log("[v0] Sending OTP to:", customerData.phone)
    }
  }

  const handleOtpChange = (value: string) => {
    // Only allow numbers and limit to 6 digits
    const numericValue = value.replace(/\D/g, "").slice(0, 6)
    setOtpCode(numericValue)
  }

  const handleOtpVerification = () => {
    if (otpCode.length === 6) {
      setIsVerifying(true)
      // Simulate OTP verification
      setTimeout(() => {
        setPhoneVerified(true)
        setShowOtpInput(false)
        setIsVerifying(false)
        setOtpCode("")
      }, 1500)
    }
  }

  const handleResendCode = () => {
    if (canResend) {
      setResendTimer(30)
      setCanResend(false)
      setOtpCode("")
      console.log("[v0] Resending OTP to:", customerData.phone)
    }
  }

  const handleApplyPromoCode = () => {
    setPromoError("")

    const validPromoCodes: { [key: string]: number } = {
      SAVE10: 10,
      SAVE20: 20,
      FIRST15: 15,
    }

    const upperPromoCode = promoCode.toUpperCase()

    if (validPromoCodes[upperPromoCode]) {
      const discountPercent = validPromoCodes[upperPromoCode]
      const servicesWithDetails = getSelectedServicesWithDetails()
      const servicesTotal = servicesWithDetails.reduce((total: number, service: any) => {
        return typeof service.price === "string" ? total : total + service.price
      }, 0)
      const addOnsWithDetails = getSelectedAddOnsWithDetails()
      const addOnsTotal = addOnsWithDetails.reduce((total: number, addOn: any) => total + addOn.price, 0)
      const subtotal = servicesTotal + addOnsTotal
      const discount = subtotal * (discountPercent / 100)

      setAppliedPromoCode(upperPromoCode)
      setPromoDiscount(discount)
      setPromoCode("")
    } else {
      setPromoError("Invalid promo code")
    }
  }

  const handleRemovePromoCode = () => {
    setAppliedPromoCode(null)
    setPromoDiscount(0)
    setPromoError("")
  }

  const handleNext = () => {
    if (isFormComplete) {
      // Update localStorage with customer data
      const storedData = JSON.parse(localStorage.getItem("estimateData") || "{}")

      const updatedData = {
        ...storedData,
        customer: {
          ...customerData,
          appliedPromoCode,
          promoDiscount,
          phoneVerified, // Ensure phoneVerified status is saved
        },
      }
      localStorage.setItem("estimateData", JSON.stringify(updatedData))

      localStorage.setItem("bookingConfirmation", JSON.stringify(updatedData))
      router.push("/estimate/payment")
    }
  }

  const isFormComplete =
    customerData.firstName &&
    customerData.lastName &&
    customerData.email &&
    customerData.phone &&
    customerData.streetAddress &&
    customerData.city &&
    customerData.state &&
    customerData.zipCode &&
    customerData.preferredDate &&
    customerData.timeWindow &&
    (estimateData?.services?.isSubscription ? true : customerData.termsAccepted)

  const getAvailableDates = () => {
    const dates = []
    let currentDate = new Date() // Start from today

    while (dates.length < 60) {
      // Extended range for calendar view
      if (!isWeekend(currentDate) && !isHoliday(currentDate)) {
        dates.push(new Date(currentDate))
      }
      currentDate = addDays(currentDate, 1)
    }

    return dates
  }

  const availableDates = getAvailableDates()

  const isDateAvailable = (date: Date) => {
    return availableDates.some((availableDate) => availableDate.toDateString() === date.toDateString())
  }

  const generateCalendarDays = () => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    const days = eachDayOfInterval({ start, end })

    // Add padding days from previous month
    const startDay = start.getDay()
    const paddingDays = []
    for (let i = startDay - 1; i >= 0; i--) {
      paddingDays.push(addDays(start, -i - 1))
    }

    return [...paddingDays, ...days]
  }

  const calendarDays = generateCalendarDays()

  const getSelectedServicesWithDetails = () => {
    if (!estimateData?.services?.selectedServices) {
      return []
    }

    return estimateData.services.selectedServices
      .map((serviceId: string) => {
        const service = availableServices.find((s) => s.id === serviceId)
        if (!service) return null

        let price = service.basePrice

        return {
          id: service.id,
          name: service.name,
          price: price,
        }
      })
      .filter(Boolean)
  }

  const getTotalServicesPrice = () => {
    const servicesWithDetails = getSelectedServicesWithDetails()
    return servicesWithDetails.reduce((total: number, service: any) => {
      return typeof service.price === "string" ? total : total + service.price
    }, 0)
  }

  const getDiscountAmount = () => {
    if (!estimateData?.services?.isSubscription) return 0
    const servicesTotal = getTotalServicesPrice()
    const addOnsTotal = getTotalAddOnsPrice()
    const subtotal = servicesTotal + addOnsTotal
    return Math.round(subtotal * 0.15) // 15% subscription discount
  }

  const getSelectedAddOnsWithDetails = () => {
    if (!estimateData?.services?.selectedAddOns) {
      return []
    }

    return estimateData.services.selectedAddOns
      .map((addOnId: string) => {
        const addOn = availableAddOns.find((a) => a.id === addOnId)
        if (!addOn) return null

        const quantity = estimateData.services.addOnQuantities?.[addOnId] || 1
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

  const getTotalAddOnsPrice = () => {
    const addOnsWithDetails = getSelectedAddOnsWithDetails()
    return addOnsWithDetails.reduce((total: number, addOn: any) => total + addOn.price, 0)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Book your Service </h1>
            <p className="text-xs text-muted-foreground/60 mb-2">Step 2 of 3: Schedule & Contact</p>
            <Progress value={66} className="w-full md:w-64 mx-auto mb-2 h-1" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Contact & Scheduling */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-2">Contact Details & Scheduling</h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  Provide your contact information and preferred appointment time.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
                    <User className="h-5 w-5 text-[#FFCB00]" />
                    <span>Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={customerData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={customerData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10"
                        value={customerData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="pl-10"
                        value={customerData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This phone number will be used to communicate with you
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="streetAddress" className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      Street Address *
                    </Label>
                    <Input
                      id="streetAddress"
                      placeholder="1234 Music Row, Nashville"
                      value={customerData.streetAddress}
                      onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="space-y-2 col-span-2 sm:col-span-1">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Nashville"
                        value={customerData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        placeholder="TN"
                        value={customerData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        maxLength={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        placeholder="37203"
                        value={customerData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        maxLength={10}
                      />
                    </div>
                  </div>

                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
                    <Clock className="h-5 w-5 text-[#FFCB00]" />
                    <div>
                      <span>Schedule Appointment</span>
                      <p className="text-sm font-normal text-muted-foreground mt-1">
                        Please choose your preferred appointment window. Our team will get in touch with you to confirm
                        the exact appointment time.
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      {/* Calendar Header */}
                      <div className="flex items-center justify-between mb-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                          className="p-1"
                        >
                          <ChevronLeft className="h-4 w-4 text-[#FFCB00]" />
                        </Button>
                        <h4 className="text-base font-medium">{format(currentMonth, "MMMM yyyy")}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                          className="p-1"
                        >
                          <ChevronRight className="h-4 w-4 text-[#FFCB00]" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {/* Day headers */}
                        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                            {day}
                          </div>
                        ))}

                        {/* Calendar days */}
                        {calendarDays.map((day, index) => {
                          const isCurrentMonth = isSameMonth(day, currentMonth)
                          const isSelected = customerData.preferredDate && isSameDay(day, customerData.preferredDate)
                          const isAvailable = isDateAvailable(day) && isCurrentMonth
                          const isPast = day < new Date()

                          return (
                            <button
                              key={index}
                              onClick={() => {
                                if (isAvailable && !isPast) {
                                  handleInputChange("preferredDate", day)
                                }
                              }}
                              disabled={!isAvailable || isPast}
                              className={`
                                aspect-square text-xs font-medium rounded transition-colors h-8 w-8
                                ${
                                  isSelected
                                    ? "bg-[#FFCB00] text-white"
                                    : isAvailable && !isPast
                                      ? "hover:bg-gray-100 text-gray-900"
                                      : "text-gray-300 cursor-not-allowed"
                                }
                                ${!isCurrentMonth ? "text-gray-300" : ""}
                              `}
                            >
                              {format(day, "d")}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-semibold text-gray-700">Select Appointment Time</h3>

                      <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                        {timeSlots.map((slot) => {
                          const isUnavailable = getUnavailableSlots(customerData.preferredDate).includes(slot.value)
                          return (
                          <button
                            key={slot.value}
                            onClick={() => !isUnavailable && handleInputChange("timeWindow", slot.value)}
                            disabled={isUnavailable}
                            className={`
                              w-full p-3 text-left border rounded-lg transition-colors relative
                              ${
                                isUnavailable
                                  ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed opacity-60"
                                  : customerData.timeWindow === slot.value
                                    ? "border-[#FFCB00] bg-[#FFCB00]/10"
                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                              }
                            `}
                          >
                            <span className={`text-sm font-medium ${isUnavailable ? "text-gray-300" : "text-gray-900"}`}>
                              {slot.label}
                            </span>
                            {isUnavailable && (
                              <span className="text-xs text-gray-400 ml-2">Unavailable</span>
                            )}
                          </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>


                </CardContent>
              </Card>

              {/* Terms and Conditions section for one-time jobs */}
              {estimateData?.services?.isSubscription === false && (
                <Card className="mt-4">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
                      <Checkbox
                        id="terms"
                        checked={customerData.termsAccepted || false}
                        onCheckedChange={(checked) => handleInputChange("termsAccepted", checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          I agree to the{" "}
                          <a
                            href="/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FFCB00] hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Terms & Conditions
                          </a>{" "}
                          and{" "}
                          <a
                            href="/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FFCB00] hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Privacy Policy
                          </a>
                        </label>
                        <p className="text-xs text-muted-foreground mt-1">
                          By checking this box, you acknowledge that you have read and agree to our terms of service.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <Card className="lg:sticky lg:top-24">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  {/* Appointment Details */}
                  {customerData.preferredDate && customerData.timeWindow && (
                    <>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm font-medium">
                          <CheckCircle className="h-4 w-4 text-[#FFCB00]" />
                          <span>Appointment Details</span>
                        </div>
                        <div className="space-y-1 pl-6">
                          <div className="text-sm text-muted-foreground">
                            {format(customerData.preferredDate, "EEEE, MMMM do, yyyy")}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {timeSlots.find((w) => w.value === customerData.timeWindow)?.label}
                          </div>
                        </div>
                      </div>
                      <Separator />
                    </>
                  )}

                  {/* Selected Services */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm font-medium">
                      <CheckCircle className="h-4 w-4 text-[#FFCB00]" />
                      <span>Selected Services</span>
                    </div>
                    <div className="space-y-2 pl-6">
                      {(() => {
                        const servicesWithDetails = getSelectedServicesWithDetails()
                        return servicesWithDetails.length > 0 ? (
                          servicesWithDetails.map((service: any, index: number) => (
                            <div key={index} className="flex justify-between text-sm gap-2">
                              <span className="text-muted-foreground break-words flex-1">{service.name}</span>
                              <span className="font-medium flex-shrink-0">
                                {typeof service.price === "string" ? service.price : `$${service.price.toLocaleString("en-US")}`}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-muted-foreground">
                            {estimateData ? "No services selected" : "Loading services..."}
                          </div>
                        )
                      })()}
                    </div>
                  </div>

                  {/* Discounts */}
                  {estimateData?.services?.isSubscription && getDiscountAmount() > 0 && (
                    <>
                      <Separator />
                      <div className="flex justify-between text-sm gap-2">
                        <span className="text-green-600 break-words flex-1">Subscribe & Save Discount (15%)</span>
                        <span className="font-medium text-green-600 flex-shrink-0">
                          -${getDiscountAmount().toLocaleString("en-US")}
                        </span>
                      </div>
                    </>
                  )}

                  {appliedPromoCode && promoDiscount > 0 && (
                    <>
                      <Separator />
                      <div className="flex justify-between text-sm gap-2">
                        <span className="text-green-600 break-words flex-1">Promo Code ({appliedPromoCode})</span>
                        <span className="font-medium text-green-600 flex-shrink-0">-${promoDiscount.toLocaleString("en-US")}</span>
                      </div>
                    </>
                  )}

                  <Separator />

                  {/* Total Estimate */}
                  {estimateData?.services && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-semibold">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-[#FFCB00]" />
                          <span className="text-sm">Total Estimate</span>
                        </div>
                        <span className="text-base">
                          ${(getTotalServicesPrice() + getTotalAddOnsPrice() - getDiscountAmount() - promoDiscount).toLocaleString("en-US")}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Subscription Message Box */}
                  {estimateData?.services?.isSubscription && (
                    <>
                      <Separator />
                      <div className="border-2 border-[#FFCB00] rounded-lg p-3 bg-[#FFCB00]/5">
                        <div className="text-xs text-[#FFCB00] leading-relaxed">
                          <span className="font-semibold">Recurring Service:</span> Annual subscription with 15%
                          savings. Cancel anytime.
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button variant="outline" onClick={() => router.push("/estimate/services")} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isFormComplete}
              className="gap-2 bg-[#FFCB00] hover:bg-[#1e5a8a]"
              size="lg"
            >
              Continue to Payment
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
