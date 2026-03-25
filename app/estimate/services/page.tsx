"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle2,
  Lightbulb,
  Sparkles,
  Wrench,
  Plus,
  ArrowRight,
  ShoppingCart,
} from "lucide-react"

interface ServiceOption {
  id: string
  name: string
  price: number | null
  priceLabel?: string
  description?: string
  popular?: boolean
}

interface ServiceCategory {
  id: string
  name: string
  description: string
  icon: React.ElementType
  color: string
  services: ServiceOption[]
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "installation-replacement",
    name: "Installation",
    description: "Fixtures, fans, TVs & more",
    icon: Lightbulb,
    color: "#FFCB00",
    services: [
      { id: "light-fixture", name: "Light Fixture Install", price: 150, description: "Install or replace any standard light fixture", popular: true },
      { id: "ceiling-fan", name: "Ceiling Fan Install", price: 185, description: "Install or replace a ceiling fan", popular: true },
      { id: "tv-small", name: "TV Mounting (up to 55\")", price: 200, description: "Wall mount with cable management" },
      { id: "tv-large", name: "TV Mounting (65\"+)", price: 350, description: "Large TV wall mount with cable management", popular: true },
      { id: "soundbar", name: "Soundbar Install", price: null, priceLabel: "$150–$250", description: "Soundbar mounting with concealed wiring" },
      { id: "surround-sound", name: "Surround System", price: null, priceLabel: "$400–$800", description: "5.1 or 7.1 surround sound setup" },
      { id: "doorbell", name: "Ring Doorbell", price: null, priceLabel: "$125–$175", description: "Smart doorbell installation" },
      { id: "single-camera", name: "Security Camera", price: null, priceLabel: "$150–$200", description: "Single camera installation" },
      { id: "multi-camera", name: "Multi-Camera System", price: null, priceLabel: "$350–$600", description: "3–5 camera security system" },
      { id: "outlet-switch", name: "Outlet / Dimmer Upgrade", price: null, priceLabel: "$75–$125", description: "Per unit outlet or switch upgrade" },
      { id: "smart-switch", name: "Smart Switch Install", price: null, priceLabel: "$100–$150", description: "Per unit smart switch or dimmer" },
      { id: "picture-hanging-standard", name: "Picture Hanging (1–3)", price: null, priceLabel: "$100–$150", description: "Hang 1-3 pictures or art pieces" },
      { id: "picture-hanging-gallery", name: "Gallery Wall Install", price: null, priceLabel: "$175–$300", description: "Multi-piece art installation" },
    ],
  },
  {
    id: "specialized-lighting",
    name: "Specialty",
    description: "Landscape, cabinet & LED",
    icon: Sparkles,
    color: "#FF9500",
    services: [
      { id: "landscape-basic", name: "Landscape Lighting (Basic)", price: null, priceLabel: "$500–$1,200", description: "5–8 light pathway or garden setup", popular: true },
      { id: "landscape-custom", name: "Landscape Lighting (Custom)", price: null, priceLabel: "$1,500–$3,500+", description: "Large custom outdoor lighting" },
      { id: "cabinet-standard", name: "Cabinet Lighting", price: null, priceLabel: "$300–$800", description: "Standard kitchen under-cabinet LEDs", popular: true },
      { id: "cabinet-custom", name: "Cabinet Lighting (Custom)", price: null, priceLabel: "$800–$1,500", description: "High-end custom cabinet lighting" },
      { id: "garage-hex-1car", name: "Garage Hex Lights (1-Car)", price: null, priceLabel: "$500–$900", description: "Hexagonal LED garage lighting" },
      { id: "garage-hex-2car", name: "Garage Hex Lights (2-Car)", price: null, priceLabel: "$800–$1,500", description: "Hexagonal LED for larger garages" },
      { id: "permanent-led-exterior", name: "Permanent LED (per ft)", price: null, priceLabel: "$20–$35/ft", description: "Permanent exterior LED system" },
      { id: "permanent-led-home", name: "Permanent LED (Whole Home)", price: null, priceLabel: "$2,500–$6,000", description: "Full-home exterior LED lighting", popular: true },
      { id: "led-bulb-per-fixture", name: "LED Bulb Swap", price: null, priceLabel: "$10–$25", description: "Per fixture LED upgrade" },
      { id: "led-bulb-whole-home", name: "Whole-Home LED Conversion", price: null, priceLabel: "$200–$600", description: "Convert all fixtures to LED" },
    ],
  },
  {
    id: "maintenance-cleaning",
    name: "Maintenance",
    description: "Cleaning & bulb replacement",
    icon: Wrench,
    color: "#34C759",
    services: [
      { id: "fixture-cleaning", name: "Fixture / Chandelier Cleaning", price: 150, description: "Professional deep cleaning" },
      { id: "exterior-bulb-replacement", name: "Exterior Bulb Replacement", price: 150, description: "Hard-to-reach bulb replacement" },
    ],
  },
  {
    id: "additional-fees",
    name: "Add-Ons",
    description: "Special access fees",
    icon: Plus,
    color: "#AF52DE",
    services: [
      { id: "large-ladder-fee", name: "Large Ladder Fee (15'+)", price: 400, description: "Required for jobs needing a tall ladder" },
    ],
  },
]

export default function ServicesPage() {
  const router = useRouter()
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [estimateData, setEstimateData] = useState<any>(null)
  const [activeCategory, setActiveCategory] = useState<string>("installation-replacement")

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

  const activeCategoryData = serviceCategories.find((c) => c.id === activeCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-24 pb-32">
        {/* Hero header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                What can we help you with?
              </h1>
              <p className="text-gray-500 mb-6">Select the services you need and we&apos;ll handle the rest.</p>
              <div className="flex items-center justify-center gap-3 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-[#FFCB00] text-black text-xs font-bold flex items-center justify-center">1</span>
                  Services
                </span>
                <div className="w-8 h-px bg-gray-300" />
                <span className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-xs font-bold flex items-center justify-center">2</span>
                  Details
                </span>
                <div className="w-8 h-px bg-gray-300" />
                <span className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-xs font-bold flex items-center justify-center">3</span>
                  Payment
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Category tabs - horizontal scrollable */}
        <div className="bg-white border-b sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:justify-center">
              {serviceCategories.map((category) => {
                const isActive = activeCategory === category.id
                const selectedCount = category.services.filter((s) => selectedServices.includes(s.id)).length
                const Icon = category.icon

                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                      isActive
                        ? "bg-[#FFCB00] text-black shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                    {selectedCount > 0 && (
                      <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                        isActive ? "bg-black/20 text-black" : "bg-[#FFCB00] text-black"
                      }`}>
                        {selectedCount}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Services grid */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Category description */}
            {activeCategoryData && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">{activeCategoryData.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{activeCategoryData.description}</p>
              </div>
            )}

            {/* Service cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCategoryData?.services.map((service) => {
                const isSelected = selectedServices.includes(service.id)

                return (
                  <Card
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`cursor-pointer transition-all duration-200 relative overflow-hidden group ${
                      isSelected
                        ? "ring-2 ring-[#FFCB00] bg-[#FFCB00]/5 shadow-md"
                        : "hover:shadow-md hover:border-gray-300 bg-white"
                    }`}
                  >
                    {service.popular && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-[#FFCB00] text-black text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                          POPULAR
                        </div>
                      </div>
                    )}
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="font-semibold text-gray-900 text-sm leading-snug pr-2">
                          {service.name}
                        </h3>
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-[#FFCB00] bg-[#FFCB00]"
                            : "border-gray-300 group-hover:border-gray-400"
                        }`}>
                          {isSelected && <CheckCircle2 className="w-3 h-3 text-black" />}
                        </div>
                      </div>
                      {service.description && (
                        <p className="text-xs text-gray-500 mb-3 leading-relaxed">{service.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">
                          {service.price ? `$${service.price}` : service.priceLabel}
                        </span>
                        <span className={`text-xs font-medium transition-colors ${
                          isSelected ? "text-[#FFCB00]" : "text-gray-400 group-hover:text-gray-600"
                        }`}>
                          {isSelected ? "Selected" : "Add"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Floating bottom bar - cart summary */}
      {selectedServices.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-2xl">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 text-gray-700" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#FFCB00] text-black text-xs font-bold flex items-center justify-center">
                    {selectedServices.length}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""} selected
                  </div>
                  <div className="text-xs text-gray-500">
                    {calculateTotalPrice() > 0
                      ? `$${calculateTotalPrice().toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                      : ""}
                    {hasRangeItems && calculateTotalPrice() > 0 && " + variable pricing"}
                    {hasRangeItems && calculateTotalPrice() === 0 && "Variable pricing"}
                  </div>
                </div>
              </div>

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
                className="bg-[#FFCB00] hover:bg-[#FFCB00]/90 text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
