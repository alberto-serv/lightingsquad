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
        priceLabel: "$20–$6,000",
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
        priceLabel: "$500–$1,500",
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
        priceLabel: "$75–$150",
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
        priceLabel: "$10–$600",
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
        priceLabel: "$500–$3,500+",
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
        priceLabel: "$200–$350",
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
        priceLabel: "$150–$800",
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
        priceLabel: "$150–$600",
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
        priceLabel: "$100–$300",
        subOptions: [
          { id: "picture-hanging-standard", label: "1–3 items", price: null, priceLabel: "$100–$150" },
          { id: "picture-hanging-gallery", label: "Gallery Wall", price: null, priceLabel: "$175–$300" },
        ],
      },
      { id: "ceiling-fan", name: "Ceiling Fan Install", price: 185, description: "Install or replace a ceiling fan" },
    ],
  },
]

function formatPrice(amount: number): string {
  return amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function ServicesPage() {
  const router = useRouter()
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [estimateData, setEstimateData] = useState<any>(null)
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

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
      // Expand cards that have selected sub-options
      const expanded = new Set<string>()
      for (const category of serviceCategories) {
        for (const service of category.services) {
          if (service.subOptions?.some((sub) => services.includes(sub.id))) {
            expanded.add(service.id)
          }
        }
      }
      setExpandedCards(expanded)
    }
  }, [router])

  const handleCardClick = (service: ServiceItem) => {
    if (service.subOptions) {
      setExpandedCards((prev) => {
        const next = new Set(prev)
        if (next.has(service.id)) {
          // Deselect sub-options and collapse
          next.delete(service.id)
          const subIds = service.subOptions!.map((s) => s.id)
          setSelectedServices((prev) => prev.filter((id) => !subIds.includes(id)))
        } else {
          next.add(service.id)
        }
        return next
      })
    } else {
      handleServiceToggle(service.id)
    }
  }

  const handleServiceToggle = (serviceId: string, siblingIds?: string[]) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId)
      }
      const without = siblingIds ? prev.filter((id) => !siblingIds.includes(id)) : prev
      return [...without, serviceId]
    })
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

        {/* All services with section dividers */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-10">
            {serviceCategories.map((category) => {
              const Icon = category.icon
              const selectedCount = category.services.reduce((count, s) => {
                if (s.subOptions) {
                  return count + s.subOptions.filter((sub) => selectedServices.includes(sub.id)).length
                }
                return count + (selectedServices.includes(s.id) ? 1 : 0)
              }, 0)

              return (
                <div key={category.id}>
                  {/* Section divider */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border shadow-sm">
                      <Icon className="w-4 h-4 text-[#FFCB00]" />
                      <span className="text-sm font-semibold text-gray-900">{category.name}</span>
                      {selectedCount > 0 && (
                        <span className="w-5 h-5 rounded-full bg-[#FFCB00] text-black text-xs font-bold flex items-center justify-center">
                          {selectedCount}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-400">{category.description}</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  {/* Services grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.services.map((service) => {
                      const hasSubOptions = !!service.subOptions
                      const selected = isCardSelected(service)
                      const isExpanded = expandedCards.has(service.id)

                      const isPopped = hasSubOptions && isExpanded

                      return (
                        <Card
                          key={service.id}
                          onClick={() => handleCardClick(service)}
                          className={`cursor-pointer transition-all duration-200 overflow-hidden ${
                            isPopped
                              ? "ring-2 ring-[#FFCB00] bg-[#FFCB00]/5 shadow-lg -translate-y-1"
                              : selected
                                ? "ring-2 ring-[#FFCB00] bg-[#FFCB00]/5 shadow-md"
                                : "hover:shadow-md hover:border-gray-300 bg-white"
                          }`}
                        >
                          <CardContent className="p-4 flex flex-col justify-between h-full">
                            <div>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900 text-sm leading-snug">
                                    {service.name}
                                  </h3>
                                  {service.description && (
                                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{service.description}</p>
                                  )}
                                </div>
                                {hasSubOptions && (
                                  <ChevronDown
                                    className={`w-4 h-4 text-gray-400 flex-shrink-0 ml-2 mt-0.5 transition-transform duration-200 ${
                                      isExpanded ? "rotate-180" : ""
                                    }`}
                                  />
                                )}
                              </div>

                              {/* Expanded sub-options */}
                              {hasSubOptions && isExpanded && (
                                <div className="mt-2.5 space-y-1.5" onClick={(e) => e.stopPropagation()}>
                                  {service.subOptions!.map((sub) => {
                                    const subSelected = selectedServices.includes(sub.id)
                                    return (
                                      <button
                                        key={sub.id}
                                        onClick={() => handleServiceToggle(sub.id, service.subOptions!.map(s => s.id))}
                                        className={`w-full text-left px-2.5 py-2 rounded-md text-sm transition-all ${
                                          subSelected
                                            ? "bg-[#FFCB00]/15 border border-[#FFCB00]"
                                            : "bg-gray-50 border border-gray-100 hover:bg-gray-100"
                                        }`}
                                      >
                                        <div className="flex items-center justify-between">
                                          <span className={`text-xs font-medium ${subSelected ? "text-gray-900" : "text-gray-700"}`}>
                                            {sub.label}
                                          </span>
                                          <span className="font-bold text-gray-900 text-xs">
                                            {sub.price ? `$${formatPrice(sub.price)}` : sub.priceLabel}
                                          </span>
                                        </div>
                                      </button>
                                    )
                                  })}
                                </div>
                              )}
                            </div>

                            {/* Price at bottom */}
                            {!isExpanded && (
                              <span className="text-base font-bold text-gray-900 mt-2.5">
                                {service.price ? `$${formatPrice(service.price)}` : service.priceLabel}
                              </span>
                            )}
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )
            })}
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
                      ? `$${formatPrice(calculateTotalPrice())}`
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
