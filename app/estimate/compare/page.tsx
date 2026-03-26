"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowRight, Check, Zap } from "lucide-react"

const availableServices = [
  { id: "light-fixture", name: "Light Fixture Install", basePrice: 150 },
  { id: "ceiling-fan", name: "Ceiling Fan Install", basePrice: 185 },
  { id: "tv-small", name: "TV Mounting (up to 55\")", basePrice: 200 },
  { id: "tv-large", name: "TV Mounting (65\"+)", basePrice: 350 },
  { id: "soundbar", name: "Soundbar Install", basePrice: 200 },
  { id: "surround-sound", name: "Full Surround System", basePrice: 600 },
  { id: "doorbell", name: "Ring Doorbell Install", basePrice: 150 },
  { id: "single-camera", name: "Single Camera", basePrice: 175 },
  { id: "multi-camera", name: "Multi-Camera System", basePrice: 475 },
  { id: "outlet-switch", name: "Outlet / Dimmer Upgrade", basePrice: 100 },
  { id: "smart-switch", name: "Smart Switch / Dimmer", basePrice: 125 },
  { id: "picture-hanging-standard", name: "Picture Hanging (1–3)", basePrice: 125 },
  { id: "picture-hanging-gallery", name: "Gallery Wall Install", basePrice: 237 },
  { id: "landscape-basic", name: "Outdoor Lighting (Basic)", basePrice: 850 },
  { id: "landscape-custom", name: "Outdoor Lighting (Custom)", basePrice: 2500 },
  { id: "cabinet-standard", name: "Cabinet Lighting", basePrice: 550 },
  { id: "cabinet-custom", name: "Cabinet Lighting (Custom)", basePrice: 1150 },
  { id: "garage-hex-1car", name: "Garage Hex (1-Car)", basePrice: 700 },
  { id: "garage-hex-2car", name: "Garage Hex (2-Car)", basePrice: 1150 },
  { id: "permanent-led-exterior", name: "Permanent LED (per ft)", basePrice: 27 },
  { id: "permanent-led-home", name: "Permanent LED (Whole Home)", basePrice: 4250 },
  { id: "led-bulb-per-fixture", name: "LED Bulb Swap", basePrice: 17 },
  { id: "led-bulb-whole-home", name: "Whole-Home LED Conversion", basePrice: 400 },
  { id: "fixture-cleaning", name: "Fixture / Chandelier Cleaning", basePrice: 150 },
  { id: "exterior-bulb-replacement", name: "Exterior Bulb Replacement", basePrice: 150 },
]

const SUBSCRIPTION_DISCOUNT = 0.15

function fmt(n: number) {
  return n.toLocaleString("en-US")
}

export default function ComparePage() {
  const router = useRouter()
  const [estimateData, setEstimateData] = useState<any>(null)
  const [selected, setSelected] = useState<"one-time" | "subscription" | null>(null)

  useEffect(() => {
    const storedData = localStorage.getItem("estimateData")
    if (!storedData) {
      router.push("/estimate/services")
      return
    }
    const data = JSON.parse(storedData)
    if (!data.services?.selectedServices?.length) {
      router.push("/estimate/services")
      return
    }
    setEstimateData(data)
  }, [router])

  if (!estimateData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    )
  }

  const selectedServices = estimateData.services.selectedServices
    .map((id: string) => availableServices.find((s) => s.id === id))
    .filter(Boolean)

  const oneTimeTotal = selectedServices.reduce((sum: number, s: any) => sum + s.basePrice, 0)
  const subscriptionTotal = Math.round(oneTimeTotal * (1 - SUBSCRIPTION_DISCOUNT))
  const savings = oneTimeTotal - subscriptionTotal

  const handleContinue = () => {
    const isSubscription = selected === "subscription"
    const updatedData = {
      ...estimateData,
      services: {
        ...estimateData.services,
        isSubscription,
        totalPrice: isSubscription ? subscriptionTotal : oneTimeTotal,
      },
    }
    localStorage.setItem("estimateData", JSON.stringify(updatedData))
    router.push("/estimate/customer")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Save 15% with an annual plan
              </h1>
              <p className="text-gray-500 max-w-xl mx-auto">
                Get the same services at a lower price with priority scheduling and annual maintenance included.
              </p>
            </div>

            {/* Comparison Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* One-Time Card */}
              <Card
                onClick={() => setSelected("one-time")}
                className={`cursor-pointer transition-all duration-200 relative ${
                  selected === "one-time"
                    ? "ring-2 ring-gray-900 shadow-lg"
                    : "hover:shadow-md"
                }`}
              >
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900">One-Time Service</h2>
                    <p className="text-sm text-gray-500 mt-1">Pay once, no commitment</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">${fmt(oneTimeTotal)}</span>
                  </div>

                  <Separator className="mb-4" />

                  <div className="space-y-2.5 mb-6">
                    {selectedServices.map((service: any) => (
                      <div key={service.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{service.name}</span>
                        <span className="font-medium text-gray-900">${fmt(service.basePrice)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator className="mb-4" />

                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      Standard scheduling
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      90-day workmanship warranty
                    </li>
                  </ul>

                  <Button
                    variant={selected === "one-time" ? "default" : "outline"}
                    className={`w-full mt-6 ${
                      selected === "one-time"
                        ? "bg-gray-900 hover:bg-gray-800 text-white"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelected("one-time")
                    }}
                  >
                    {selected === "one-time" ? "Selected" : "Select One-Time"}
                  </Button>
                </CardContent>
              </Card>

              {/* Subscription Card */}
              <Card
                onClick={() => setSelected("subscription")}
                className={`cursor-pointer transition-all duration-200 relative overflow-hidden ${
                  selected === "subscription"
                    ? "ring-2 ring-[#FFCB00] shadow-lg"
                    : "hover:shadow-md"
                }`}
              >
                {/* Best Value Badge */}
                <div className="bg-[#FFCB00] text-black text-xs font-bold text-center py-1.5 px-4">
                  BEST VALUE — SAVE ${fmt(savings)}
                </div>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#FFCB00]" />
                      <h2 className="text-lg font-bold text-gray-900">Annual Plan</h2>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Save 15% with priority service</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">${fmt(subscriptionTotal)}</span>
                    <span className="text-sm text-gray-400 line-through ml-2">${fmt(oneTimeTotal)}</span>
                  </div>

                  <Separator className="mb-4" />

                  <div className="space-y-2.5 mb-6">
                    {selectedServices.map((service: any) => {
                      const discounted = Math.round(service.basePrice * (1 - SUBSCRIPTION_DISCOUNT))
                      return (
                        <div key={service.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">{service.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 line-through text-xs">${fmt(service.basePrice)}</span>
                            <span className="font-medium text-gray-900">${fmt(discounted)}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <Separator className="mb-4" />

                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                      <Check className="w-4 h-4 text-[#FFCB00] flex-shrink-0" />
                      15% off all services
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                      <Check className="w-4 h-4 text-[#FFCB00] flex-shrink-0" />
                      Priority scheduling
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                      <Check className="w-4 h-4 text-[#FFCB00] flex-shrink-0" />
                      Annual maintenance visit included
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                      <Check className="w-4 h-4 text-[#FFCB00] flex-shrink-0" />
                      1-year workmanship warranty
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#FFCB00] flex-shrink-0" />
                      Cancel anytime
                    </li>
                  </ul>

                  <Button
                    className={`w-full mt-6 ${
                      selected === "subscription"
                        ? "bg-[#FFCB00] hover:bg-[#FFCB00]/90 text-black"
                        : "bg-[#FFCB00]/10 hover:bg-[#FFCB00]/20 text-black border border-[#FFCB00]"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelected("subscription")
                    }}
                  >
                    {selected === "subscription" ? "Selected" : "Select Annual Plan"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => router.push("/estimate/services")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              <Button
                onClick={handleContinue}
                disabled={!selected}
                className="gap-2 bg-[#FFCB00] hover:bg-[#FFCB00]/90 text-black font-semibold px-8"
                size="lg"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
