"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Zap,
  Hammer,
  ArrowRight,
  ShoppingCart,
  ChevronDown,
} from "lucide-react"

interface SubOption {
  id: string
  label: string
  price: number | null
  priceLabel?: string
}

interface ServiceItem {
  id: string
  name: string
  description?: string
  price: number | null
  priceLabel?: string
  subOptions?: SubOption[]
}

interface ServiceCategory {
  id: string
  name: string
  description: string
  icon: React.ElementType
  services: ServiceItem[]
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "lighting",
    name: "Lighting",
    description: "LED, fixtures, outdoor & maintenance",
    icon: Zap,
    services: [
      {
        id: "permanent-led",
        name: "Permanent LED Lighting",
        description: "Permanent exterior LED systems",
        price: null,
        subOptions: [
          { id: "permanent-led-exterior", label: "Per Linear Foot", price: null, priceLabel: "$20–$35/ft" },
          { id: "permanent-led-home", label: "Whole Home", price: null, priceLabel: "$2,500–$6,000" },
        ],
      },
      {
        id: "garage-hex",
        name: "Garage Hex Lighting",
        description: "Hexagonal LED garage lighting",
        price: null,
        subOptions: [
          { id: "garage-hex-1car", label: "1-Car Garage", price: null, priceLabel: "$500–$900" },
          { id: "garage-hex-2car", label: "2-Car Garage", price: null, priceLabel: "$800–$1,500" },
        ],
      },
      {
        id: "switches-outlets",
        name: "Switches & Outlets",
        description: "Upgrade or install per unit",
        price: null,
        subOptions: [
          { id: "outlet-switch", label: "Outlet / Dimmer Upgrade", price: null, priceLabel: "$75–$125" },
          { id: "smart-switch", label: "Smart Switch / Dimmer", price: null, priceLabel: "$100–$150" },
        ],
      },
      {
        id: "led-bulb-upgrade",
        name: "LED Bulb Upgrade",
        description: "Swap to energy-efficient LED",
        price: null,
        subOptions: [
          { id: "led-bulb-per-fixture", label: "Per Fixture", price: null, priceLabel: "$10–$25" },
          { id: "led-bulb-whole-home", label: "Whole Home", price: null, priceLabel: "$200–$600" },
        ],
      },
      { id: "light-fixture", name: "Light Fixture Install", price: 150, description: "Install or replace any standard light fixture" },
      { id: "fixture-cleaning", name: "Fixture / Chandelier Cleaning", price: 150, description: "Professional deep cleaning" },
      {
        id: "outdoor-lighting",
        name: "Outdoor Lighting",
        description: "Pathway, garden, and outdoor setups",
        price: null,
        subOptions: [
          { id: "landscape-basic", label: "Basic (5–8 lights)", price: null, priceLabel: "$500–$1,200" },
          { id: "landscape-custom", label: "Custom / Large", price: null, priceLabel: "$1,500–$3,500+" },
        ],
      },
      { id: "exterior-bulb-replacement", name: "Exterior Bulb Replacement", price: 150, description: "Hard-to-reach bulb replacement" },
    ],
  },
  {
    id: "installation",
    name: "Installation",
    description: "TVs, audio, security & more",
    icon: Hammer,
    services: [
      {
        id: "tv-mounting",
        name: "TV Mounting",
        description: "Wall mount with cable management",
        price: null,
        subOptions: [
          { id: "tv-small", label: "Up to 55\"", price: 200 },
          { id: "tv-large", label: "65\" and larger", price: 350 },
        ],
      },
      {
        id: "audio-system",
        name: "Audio System Install",
        description: "Soundbar or surround sound setup",
        price: null,
        subOptions: [
          { id: "soundbar", label: "Soundbar (concealed wiring)", price: null, priceLabel: "$150–$250" },
          { id: "surround-sound", label: "Full Surround (5.1 / 7.1)", price: null, priceLabel: "$400–$800" },
        ],
      },
      { id: "doorbell", name: "Ring Doorbell Install", price: null, priceLabel: "$125–$175", description: "Smart doorbell installation" },
      {
        id: "security-cameras",
        name: "Security Cameras",
        description: "Camera installation and setup",
        price: null,
        subOptions: [
          { id: "single-camera", label: "Single Camera", price: null, priceLabel: "$150–$200" },
          { id: "multi-camera", label: "Multi-Camera (3–5)", price: null, priceLabel: "$350–$600" },
        ],
      },
      {
        id: "picture-hanging",
        name: "Picture & Art Hanging",
        description: "Professional picture and art installation",
        price: null,
        subOptions: [
          { id: "picture-hanging-standard", label: "1–3 items", price: null, priceLabel: "$100–$150" },
          { id: "picture-hanging-gallery", label: "Gallery Wall", price: null, priceLabel: "$175–$300" },
        ],
      },
      { id: "ceiling-fan", name: "Ceiling Fan Install", price: 185, description: "Install or replace a ceiling fan" },
    ],
  },
]

export default function ServicesPage() {
  const router = useRouter()
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [estimateData, setEstimateData] = useState<any>(null)
  const [activeCategory, setActiveCategory] = useState<string>("lighting")
  const [expandedCards, setExpandedCards] = useState<string[]>([])

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
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    )
  }

  const toggleCardExpanded = (cardId: string) => {
    setExpandedCards((prev) =>
      prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]
    )
  }

  const getServiceById = (serviceId: string): (SubOption & { parentName?: string }) | undefined => {
    for (const category of serviceCategories) {
      for (const service of category.services) {
        if (service.id === serviceId && !service.subOptions) {
          return { id: service.id, label: service.name, price: service.price, priceLabel: service.priceLabel }
        }
        if (service.subOptions) {
          const sub = service.subOptions.find((s) => s.id === serviceId)
          if (sub) return { ...sub, parentName: service.name }
        }
      }
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

  const isCardSelected = (service: ServiceItem) => {
    if (!service.subOptions) return selectedServices.includes(service.id)
    return service.subOptions.some((sub) => selectedServices.includes(sub.id))
  }

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
              <p className="text-gray-500">Select the services you need and we&apos;ll handle the rest.</p>
            </div>
          </div>
        </div>

        {/* Category tabs - scrolls with page */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:justify-center">
              {serviceCategories.map((category) => {
                const isActive = activeCategory === category.id
                const selectedCount = category.services.reduce((count, s) => {
                  if (s.subOptions) {
                    return count + s.subOptions.filter((sub) => selectedServices.includes(sub.id)).length
                  }
                  return count + (selectedServices.includes(s.id) ? 1 : 0)
                }, 0)
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
            {activeCategoryData && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">{activeCategoryData.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{activeCategoryData.description}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCategoryData?.services.map((service) => {
                const hasSubOptions = !!service.subOptions
                const selected = isCardSelected(service)
                const isExpanded = expandedCards.includes(service.id)

                if (hasSubOptions) {
                  return (
                    <Card
                      key={service.id}
                      className={`transition-all duration-200 overflow-hidden ${
                        selected
                          ? "ring-2 ring-[#FFCB00] bg-[#FFCB00]/5 shadow-md"
                          : "bg-white hover:shadow-md hover:border-gray-300"
                      }`}
                    >
                      <CardContent className="p-5">
                        <button
                          onClick={() => toggleCardExpanded(service.id)}
                          className="w-full text-left"
                        >
                          <h3 className="font-semibold text-gray-900 text-sm leading-snug">
                            {service.name}
                          </h3>
                          {service.description && (
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{service.description}</p>
                          )}
                          <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                            <span>{service.subOptions!.length} options</span>
                            <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                            {service.subOptions!.map((sub) => {
                              const subSelected = selectedServices.includes(sub.id)
                              return (
                                <button
                                  key={sub.id}
                                  onClick={() => handleServiceToggle(sub.id)}
                                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                                    subSelected
                                      ? "bg-[#FFCB00]/15 border border-[#FFCB00]"
                                      : "bg-gray-50 border border-gray-100 hover:bg-gray-100"
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className={`font-medium ${subSelected ? "text-gray-900" : "text-gray-700"}`}>
                                      {sub.label}
                                    </span>
                                    <span className="font-bold text-gray-900 text-sm">
                                      {sub.price ? `$${sub.price}` : sub.priceLabel}
                                    </span>
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                }

                return (
                  <Card
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`cursor-pointer transition-all duration-200 overflow-hidden group ${
                      selected
                        ? "ring-2 ring-[#FFCB00] bg-[#FFCB00]/5 shadow-md"
                        : "hover:shadow-md hover:border-gray-300 bg-white"
                    }`}
                  >
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1">
                        {service.name}
                      </h3>
                      {service.description && (
                        <p className="text-xs text-gray-500 mb-3 leading-relaxed">{service.description}</p>
                      )}
                      <span className="text-lg font-bold text-gray-900">
                        {service.price ? `$${service.price}` : service.priceLabel}
                      </span>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Floating bottom bar */}
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
