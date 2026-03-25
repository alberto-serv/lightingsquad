"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Minus, Plus } from "lucide-react"

interface Service {
  id: string
  name: string
  description: string
  price: number
  image: string
  dotPosition: { x: number; y: number }
}

const availableServices: Service[] = [
  {
    id: "dryer-vent-cleaning",
    name: "Dryer Vent Cleaning",
    description:
      "Full deep cleaning of dryer vent including vent inspection camera scope cleaning using professional tools and a years guarantee",
    price: 159.0,
    image: "",
    dotPosition: { x: 23, y: 75 },
  },
  {
    id: "dryer-vent-special",
    name: "Dryer Vent Cleaning Special",
    description:
      "Our full, professional deep clean of your dryer vent, a new, fire resistant and high flow transition hose, a new magnetic and bird-proof exterior vent door and new braided washer hoses - save on upgrades with this bundle!",
    price: 350.0,
    image: "",
    dotPosition: { x: 23, y: 75 },
  },
  {
    id: "bathroom-fan",
    name: "Bathroom Fan Cleaning",
    description:
      "Remove dust and debris from bathroom exhaust fans for better ventilation and air quality. Reduces moisture and prevents mold.",
    price: 175.0,
    image: "",
    dotPosition: { x: 37, y: 23 },
  },
  {
    id: "coil-cleaning",
    name: "Coil Cleaning",
    description:
      "Deep cleaning of AC coils for maximum efficiency and performance. Improves cooling capacity and reduces energy costs.",
    price: 385.0,
    image: "",
    dotPosition: { x: 96, y: 75 },
  },
  {
    id: "ac-duct-cleaning",
    name: "AC Duct Cleaning",
    description:
      "AC Duct Cleaning - Pricing depends on the amount of ducts in your home. Most single family homes have 8-10 air ducts. Please list how many ducts are in your home in your booking.",
    price: 500.0,
    image: "",
    dotPosition: { x: 78, y: 32 },
  },
]

export default function ServicesPage() {
  const router = useRouter()
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [estimateData, setEstimateData] = useState<any>(null)
  const [ductCount, setDuctCount] = useState(10)
  const [dryerVentAccessType, setDryerVentAccessType] = useState("1st-floor")
  const [isSubscription, setIsSubscription] = useState(true)

  useEffect(() => {
    const storedData = localStorage.getItem("estimateData")
    if (!storedData) {
      // Initialize with default data and dryer-vent-cleaning selected
      const initialData = {
        services: {
          selectedServices: ["dryer-vent-cleaning"],
          ductCount: 10,
          isSubscription: true,
          dryerVentAccessType: "1st-floor",
        },
      }
      localStorage.setItem("estimateData", JSON.stringify(initialData))
      setEstimateData(initialData)
      setSelectedServices(["dryer-vent-cleaning"])
    } else {
      const parsedData = JSON.parse(storedData)
      setEstimateData(parsedData)
      // If no services selected, default to dryer-vent-cleaning
      const services = parsedData.services?.selectedServices || ["dryer-vent-cleaning"]
      setSelectedServices(services.length > 0 ? services : ["dryer-vent-cleaning"])
      setDuctCount(parsedData.services?.ductCount || 10)
      setIsSubscription(parsedData.services?.isSubscription ?? true)
      setDryerVentAccessType(parsedData.services?.dryerVentAccessType || "1st-floor")
    }
  }, [router])

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId)
      } else {
        return [...prev, serviceId]
      }
    })
  }

  const calculateAcDuctPrice = () => {
    const basePrice = 500
    const extraDucts = Math.max(0, ductCount - 10)
    return basePrice + extraDucts * 30
  }

  const getDryerVentCleaningPrice = () => {
    if (dryerVentAccessType === "roof") return 249 // Fixed to return proper prices without adding .65
    if (dryerVentAccessType === "2nd-floor") return 189 // Fixed to return proper prices without adding .65
    return 159 // Fixed to return proper prices without adding .65
  }

  const calculateTotalPrice = () => {
    const baseTotal = selectedServices.reduce((total, id) => {
      const service = availableServices.find((s) => s.id === id)
      if (!service) return total
      if (id === "ac-duct-cleaning") {
        return total + calculateAcDuctPrice()
      }
      if (id === "dryer-vent-cleaning") {
        return total + getDryerVentCleaningPrice()
      }
      return total + service.price
    }, 0)

    return baseTotal
  }

  const getSubscriptionPrice = () => {
    return Math.round(calculateTotalPrice() * 0.85) // 15% discount
  }

  useEffect(() => {
    // Only update if selectedServices has been set
    if (selectedServices.length === 0 && !estimateData) return
    
    const finalTotal = isSubscription ? getSubscriptionPrice() : calculateTotalPrice()
    const updatedData = {
      ...estimateData,
      services: {
        selectedServices,
        totalPrice: finalTotal,
        ductCount: selectedServices.includes("ac-duct-cleaning") ? ductCount : undefined,
        isSubscription,
        dryerVentAccessType: selectedServices.includes("dryer-vent-cleaning")
          ? dryerVentAccessType
          : undefined,
      },
    }
    setEstimateData(updatedData)
    localStorage.setItem("estimateData", JSON.stringify(updatedData))
  }, [selectedServices, ductCount, isSubscription, dryerVentAccessType])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12 pt-28">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Choose Your Service</h1>
            <p className="text-sm text-gray-500 mb-4">Step 1 of 3: Service Selection</p>
            <Progress value={33} className="w-full md:w-64 mx-auto mb-2 h-1 bg-gray-100 [&>div]:bg-[#2A75AE]" />
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Service Cards Section */}
            <div className="space-y-3">
              {availableServices.map((service) => {
                const isSelected = selectedServices.includes(service.id)
                const isSpecial = service.id === "dryer-vent-special"
                const isFree = service.price === 0
                const isAcDuct = service.id === "ac-duct-cleaning"
                const isDryerVent = service.id === "dryer-vent-cleaning"
                const displayPrice = isAcDuct
                  ? calculateAcDuctPrice()
                  : isDryerVent
                    ? getDryerVentCleaningPrice()
                    : service.price

                return (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all duration-300 relative overflow-hidden group border ${
                      isSelected
                        ? "border-[#2A75AE] shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                    onClick={(e) => {
                      if (
                        (e.target as HTMLElement).closest(".duct-counter") ||
                        (e.target as HTMLElement).closest(".access-type-selector")
                      ) {
                        return
                      }
                      handleServiceToggle(service.id)
                    }}
                  >
                    <CardContent className="p-3">
                      <div className="flex gap-3">
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex items-start gap-2 flex-1 min-w-0">
                              <div
                                className={`flex-shrink-0 rounded-full border p-0.5 transition-all duration-300 mt-0.5 ${
                                  isSelected ? "border-[#2A75AE] bg-[#2A75AE]" : "border-gray-300 bg-white"
                                }`}
                              >
                                <CheckCircle2
                                  className={`w-3 h-3 transition-colors duration-300 ${
                                    isSelected ? "text-white" : "text-transparent"
                                  }`}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm leading-tight text-gray-900 mb-0.5">
                                  {service.name}
                                </h3>
                                {isSpecial && (
                                  <div className="bg-[#D3331D] text-white px-2 py-0.5 rounded-full font-bold text-[10px] inline-block">
                                    BEST VALUE
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-lg font-bold text-[#2A75AE]">
                                ${displayPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-600 leading-snug text-xs">{service.description}</p>

                          {isDryerVent && isSelected && (
                            <div className="access-type-selector mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                              <div className="p-2 bg-gray-50 rounded border border-gray-200">
                                <span className="text-xs font-semibold text-gray-900 mb-2 block">Access Type</span>
                                <div className="grid grid-cols-3 gap-1.5">
                                  {[
                                    { type: "1st-floor", label: "1st floor", price: 159 },
                                    { type: "2nd-floor", label: "2nd floor", price: 189 },
                                    { type: "roof", label: "Roof", price: 249 },
                                  ].map((option) => (
                                    <button
                                      key={option.type}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setDryerVentAccessType(option.type as any)
                                      }}
                                      className={`px-2 py-1.5 text-xs font-semibold rounded border ${
                                        dryerVentAccessType === option.type
                                          ? "bg-[#2A75AE] text-white border-[#2A75AE]"
                                          : "bg-white text-gray-700 border-gray-200 hover:border-[#2A75AE]"
                                      }`}
                                    >
                                      <div>{option.label}</div>
                                      <div className="text-[10px] opacity-80">${option.price.toFixed(2)}</div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {isAcDuct && isSelected && (
                            <div className="duct-counter mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                              <div className="p-2 bg-gray-50 rounded border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs font-semibold text-gray-900">Ducts</span>
                                  <span className="text-[10px] text-gray-500">Min 10</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="h-7 w-7 p-0 rounded border border-gray-200 hover:border-[#2A75AE] hover:bg-white bg-transparent"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setDuctCount(Math.max(10, ductCount - 1))
                                    }}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <Input
                                    type="number"
                                    min="10"
                                    value={ductCount}
                                    onChange={(e) => {
                                      e.stopPropagation()
                                      setDuctCount(Math.max(10, Number.parseInt(e.target.value) || 10))
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-center flex-1 h-7 text-sm font-semibold rounded border border-gray-200"
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="h-7 w-7 p-0 rounded border border-gray-200 hover:border-[#2A75AE] hover:bg-white bg-transparent"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setDuctCount(ductCount + 1)
                                    }}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                                {ductCount > 10 && (
                                  <p className="text-[10px] text-gray-600 mt-1.5 text-right">
                                    +${((ductCount - 10) * 30).toFixed(2)} for {ductCount - 10} extra
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Selected Services Summary - Made much more compact */}
            {selectedServices.length > 0 && (
              <div className="space-y-3">
                <Card className="bg-white border border-[#2A75AE] shadow-md overflow-hidden">
                  <CardContent className="p-3 space-y-3">
                    {/* Selected count and total */}
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-[#2A75AE] text-white rounded-full p-1 flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <h4 className="font-semibold text-sm text-gray-900">
                            Selected Services ({selectedServices.length})
                          </h4>
                        </div>
                        <div className="text-2xl font-bold text-[#2A75AE]">
                          $
                          {(isSubscription ? getSubscriptionPrice() : calculateTotalPrice())
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                      </div>
                      {isSubscription && (
                        <div className="text-right mt-1">
                          <span className="text-xs text-green-600 font-semibold bg-green-50 rounded py-0.5 px-2 inline-block">
                            Save $
                            {(calculateTotalPrice() - getSubscriptionPrice())
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Service Frequency integrated into same card */}
                    <div className="pt-2 border-t border-gray-100">
                      <h3 className="font-semibold text-xs mb-2 text-gray-900">Service Frequency</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {/* Annual Subscription Option */}
                        <button
                          onClick={() => setIsSubscription(true)}
                          className={`text-left p-2 rounded border transition-all duration-200 relative ${
                            isSubscription ? "border-[#2A75AE] bg-blue-50" : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="absolute top-1 right-1 bg-green-600 text-white px-1.5 py-0.5 rounded-full font-bold text-[9px]">
                            15% OFF
                          </div>
                          <div className="flex items-start gap-1.5">
                            <div
                              className={`flex-shrink-0 rounded-full w-3.5 h-3.5 border flex items-center justify-center transition-all duration-200 mt-0.5 ${
                                isSubscription ? "border-[#2A75AE] bg-white" : "border-gray-300 bg-white"
                              }`}
                            >
                              {isSubscription && <div className="w-1.5 h-1.5 rounded-full bg-[#2A75AE]" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-xs mb-0.5 text-gray-900">Annual</h4>
                              <div className="flex items-baseline gap-1 mb-0.5">
                                <span className="text-sm font-bold text-[#2A75AE]">
                                  $
                                  {getSubscriptionPrice()
                                    .toFixed(2)
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </span>
                                <span className="text-[9px] text-gray-400 line-through">
                                  $
                                  {calculateTotalPrice()
                                    .toFixed(2)
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </span>
                              </div>
                              <p className="text-[9px] text-gray-500 leading-tight">Card on file</p>
                            </div>
                          </div>
                        </button>

                        {/* One-Time Service Option */}
                        <button
                          onClick={() => setIsSubscription(false)}
                          className={`text-left p-2 rounded border transition-all duration-200 ${
                            !isSubscription ? "border-[#2A75AE] bg-blue-50" : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-start gap-1.5">
                            <div
                              className={`flex-shrink-0 rounded-full w-3.5 h-3.5 border flex items-center justify-center transition-all duration-200 mt-0.5 ${
                                !isSubscription ? "border-[#2A75AE] bg-white" : "border-gray-300 bg-white"
                              }`}
                            >
                              {!isSubscription && <div className="w-1.5 h-1.5 rounded-full bg-[#2A75AE]" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-xs mb-0.5 text-gray-900">One-Time</h4>
                              <div className="text-sm font-bold text-[#2A75AE] mb-0.5">
                                $
                                {calculateTotalPrice()
                                  .toFixed(2)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </div>
                              <p className="text-[9px] text-gray-500 leading-tight">No commitment</p>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CTA Button */}
                <Button
                  onClick={() => {
                    const finalTotal = isSubscription ? getSubscriptionPrice() : calculateTotalPrice()

                    const updatedData = {
                      ...estimateData,
                      services: {
                        selectedServices,
                        totalPrice: finalTotal,
                        ductCount: selectedServices.includes("ac-duct-cleaning") ? ductCount : undefined,
                        isSubscription,
                        dryerVentAccessType: selectedServices.includes("dryer-vent-cleaning")
                          ? dryerVentAccessType
                          : undefined,
                      },
                    }
                    localStorage.setItem("estimateData", JSON.stringify(updatedData))
                    router.push("/estimate/customer")
                  }}
                  size="lg"
                  className="w-full bg-[#2A75AE] hover:bg-[#1e5a8a] shadow-md hover:shadow-lg transition-all duration-300 text-sm font-semibold py-5 rounded-lg"
                >
                  Continue
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
