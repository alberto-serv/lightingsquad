"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react"

interface ServiceOption {
  id: string
  name: string
  price: number | null
  priceLabel?: string
  description?: string
}

interface ServiceCategory {
  id: string
  name: string
  description: string
  icon: string
  services: ServiceOption[]
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "installation-replacement",
    name: "Installation & Replacement",
    description: "Light fixtures, ceiling fans, TVs, and more",
    icon: "💡",
    services: [
      { id: "light-fixture", name: "Light Fixture Installation / Replacement", price: 150, description: "Install or replace any standard light fixture" },
      { id: "ceiling-fan", name: "Ceiling Fan Installation", price: 185, description: "Install a new ceiling fan or replace an existing one" },
      { id: "tv-small", name: "TV Installation (up to 55\")", price: 200, description: "Wall mount and cable management for TVs up to 55\"" },
      { id: "tv-large", name: "TV Installation (65\" and larger)", price: 350, description: "Wall mount and cable management for large TVs 65\"+", },
      { id: "soundbar", name: "Soundbar Installation (concealed wiring)", price: null, priceLabel: "$150–$250", description: "Soundbar mounting with concealed wiring" },
      { id: "surround-sound", name: "Full Surround System (5.1 / 7.1)", price: null, priceLabel: "$400–$800", description: "Complete surround sound system installation" },
      { id: "doorbell", name: "Ring Doorbell Installation", price: null, priceLabel: "$125–$175", description: "Install Ring or smart doorbell" },
      { id: "single-camera", name: "Single Camera Installation", price: null, priceLabel: "$150–$200", description: "Install a single security camera" },
      { id: "multi-camera", name: "Multi-Camera System (3–5 cams)", price: null, priceLabel: "$350–$600", description: "Install a multi-camera security system" },
      { id: "outlet-switch", name: "Outlet / Dimmer Switch Upgrade (per unit)", price: null, priceLabel: "$75–$125", description: "Replace or upgrade a single outlet or switch" },
      { id: "smart-switch", name: "Smart Switch / Dimmer Install (per unit)", price: null, priceLabel: "$100–$150", description: "Install a smart switch or dimmer" },
      { id: "picture-hanging-standard", name: "Picture & Art Hanging (1–3 items)", price: null, priceLabel: "$100–$150", description: "Hang 1-3 pictures or art pieces" },
      { id: "picture-hanging-gallery", name: "Gallery Walls / Multi-Piece Installs", price: null, priceLabel: "$175–$300", description: "Gallery wall or multi-piece art installation" },
    ],
  },
  {
    id: "specialized-lighting",
    name: "Specialized Lighting Systems",
    description: "Landscape, cabinet, garage, and permanent LED lighting",
    icon: "✨",
    services: [
      { id: "landscape-basic", name: "Landscape & Outdoor Lighting (basic, 5–8 lights)", price: null, priceLabel: "$500–$1,200", description: "Basic pathway or garden lighting setup" },
      { id: "landscape-custom", name: "Landscape & Outdoor Lighting (larger custom)", price: null, priceLabel: "$1,500–$3,500+", description: "Larger custom outdoor lighting systems" },
      { id: "cabinet-standard", name: "Cabinet Lighting (standard kitchen)", price: null, priceLabel: "$300–$800", description: "Under-cabinet lighting for a standard kitchen" },
      { id: "cabinet-custom", name: "Cabinet Lighting (high-end / custom)", price: null, priceLabel: "$800–$1,500", description: "High-end or custom cabinet lighting installation" },
      { id: "garage-hex-1car", name: "Garage Hex Lighting (1-car garage)", price: null, priceLabel: "$500–$900", description: "Hexagonal LED lighting for a 1-car garage" },
      { id: "garage-hex-2car", name: "Garage Hex Lighting (2-car garage)", price: null, priceLabel: "$800–$1,500", description: "Hexagonal LED lighting for a 2-car garage" },
      { id: "permanent-led-exterior", name: "Permanent LED Lighting (exterior, per linear ft)", price: null, priceLabel: "$20–$35/ft", description: "Permanent exterior LED lighting system" },
      { id: "permanent-led-home", name: "Permanent LED Lighting (typical home total)", price: null, priceLabel: "$2,500–$6,000", description: "Full-home permanent exterior LED lighting" },
      { id: "led-bulb-per-fixture", name: "LED Bulb Upgrade (per fixture swap)", price: null, priceLabel: "$10–$25", description: "Swap a single fixture to LED" },
      { id: "led-bulb-whole-home", name: "LED Bulb Whole-Home Conversion", price: null, priceLabel: "$200–$600", description: "Convert all fixtures in your home to LED" },
    ],
  },
  {
    id: "maintenance-cleaning",
    name: "Maintenance & Cleaning",
    description: "Fixture cleaning and bulb replacement",
    icon: "🧹",
    services: [
      { id: "fixture-cleaning", name: "Light Fixture / Chandelier Cleaning", price: 150, description: "Professional cleaning of light fixtures and chandeliers" },
      { id: "exterior-bulb-replacement", name: "Exterior Light Bulb Replacement", price: 150, description: "Replace hard-to-reach exterior light bulbs" },
    ],
  },
  {
    id: "additional-fees",
    name: "Additional Fees",
    description: "Extra charges for special access requirements",
    icon: "🪜",
    services: [
      { id: "large-ladder-fee", name: "Large Ladder Fee (15'+)", price: 400, description: "Required for jobs needing a ladder over 15 feet" },
    ],
  },
]

export default function ServicesPage() {
  const router = useRouter()
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [estimateData, setEstimateData] = useState<any>(null)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["installation-replacement"])

  useEffect(() => {
    const storedData = localStorage.getItem("estimateData")
    if (!storedData) {
      const initialData = {
        services: {
          selectedServices: [],
          isSubscription: false,
        },
      }
      localStorage.setItem("estimateData", JSON.stringify(initialData))
      setEstimateData(initialData)
    } else {
      const parsedData = JSON.parse(storedData)
      setEstimateData(parsedData)
      const services = parsedData.services?.selectedServices || []
      setSelectedServices(services)
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

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    )
  }

  const getServiceById = (serviceId: string): ServiceOption | undefined => {
    for (const category of serviceCategories) {
      const service = category.services.find((s) => s.id === serviceId)
      if (service) return service
    }
    return undefined
  }

  const calculateTotalPrice = () => {
    return selectedServices.reduce((total, id) => {
      const service = getServiceById(id)
      if (!service || !service.price) return total
      return total + service.price
    }, 0)
  }

  const hasRangeItems = selectedServices.some((id) => {
    const service = getServiceById(id)
    return service && !service.price
  })

  useEffect(() => {
    if (selectedServices.length === 0 && !estimateData) return

    const updatedData = {
      ...estimateData,
      services: {
        selectedServices,
        totalPrice: calculateTotalPrice(),
        isSubscription: false,
      },
    }
    setEstimateData(updatedData)
    localStorage.setItem("estimateData", JSON.stringify(updatedData))
  }, [selectedServices])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12 pt-28">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Choose Your Service</h1>
            <p className="text-sm text-gray-500 mb-4">Step 1 of 3: Service Selection</p>
            <Progress value={33} className="w-full md:w-64 mx-auto mb-2 h-1 bg-gray-100 [&>div]:bg-[#FFCB00]" />
          </div>

          {/* Service Categories */}
          <div className="space-y-4">
            {serviceCategories.map((category) => {
              const isExpanded = expandedCategories.includes(category.id)
              const selectedInCategory = category.services.filter((s) => selectedServices.includes(s.id)).length

              return (
                <div key={category.id}>
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full text-left p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#FFCB00] transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <h2 className="font-semibold text-gray-900">{category.name}</h2>
                        <p className="text-xs text-gray-500">{category.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedInCategory > 0 && (
                        <span className="bg-[#FFCB00] text-black text-xs font-bold px-2 py-0.5 rounded-full">
                          {selectedInCategory}
                        </span>
                      )}
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Category Services */}
                  {isExpanded && (
                    <div className="mt-2 space-y-2 pl-2">
                      {category.services.map((service) => {
                        const isSelected = selectedServices.includes(service.id)

                        return (
                          <Card
                            key={service.id}
                            className={`cursor-pointer transition-all duration-200 border ${
                              isSelected
                                ? "border-[#FFCB00] shadow-sm bg-[#FFCB00]/5"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => handleServiceToggle(service.id)}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`flex-shrink-0 rounded-full border p-0.5 transition-all duration-200 ${
                                    isSelected ? "border-[#FFCB00] bg-[#FFCB00]" : "border-gray-300 bg-white"
                                  }`}
                                >
                                  <CheckCircle2
                                    className={`w-3.5 h-3.5 transition-colors duration-200 ${
                                      isSelected ? "text-black" : "text-transparent"
                                    }`}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-medium text-sm text-gray-900">{service.name}</h3>
                                  {service.description && (
                                    <p className="text-xs text-gray-500 mt-0.5">{service.description}</p>
                                  )}
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <div className="text-sm font-bold text-gray-900">
                                    {service.price ? `$${service.price.toFixed(2)}` : service.priceLabel}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Selected Services Summary */}
          {selectedServices.length > 0 && (
            <div className="mt-6 space-y-3">
              <Card className="bg-white border border-[#FFCB00] shadow-md overflow-hidden">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-[#FFCB00] text-black rounded-full p-1 flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <h4 className="font-semibold text-sm text-gray-900">
                        Selected Services ({selectedServices.length})
                      </h4>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">
                        {calculateTotalPrice() > 0
                          ? `$${calculateTotalPrice().toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                          : ""}
                      </div>
                      {hasRangeItems && (
                        <p className="text-[10px] text-gray-500">+ items with variable pricing</p>
                      )}
                    </div>
                  </div>

                  {/* List selected items */}
                  <div className="space-y-1 pt-2 border-t border-gray-100">
                    {selectedServices.map((id) => {
                      const service = getServiceById(id)
                      if (!service) return null
                      return (
                        <div key={id} className="flex justify-between text-xs text-gray-600">
                          <span>{service.name}</span>
                          <span className="font-medium">
                            {service.price ? `$${service.price.toFixed(2)}` : service.priceLabel}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={() => {
                  const updatedData = {
                    ...estimateData,
                    services: {
                      selectedServices,
                      totalPrice: calculateTotalPrice(),
                      isSubscription: false,
                    },
                  }
                  localStorage.setItem("estimateData", JSON.stringify(updatedData))
                  router.push("/estimate/customer")
                }}
                size="lg"
                className="w-full bg-[#FFCB00] hover:bg-[#FFCB00]/90 text-black shadow-md hover:shadow-lg transition-all duration-300 text-sm font-semibold py-5 rounded-lg"
              >
                Continue
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
