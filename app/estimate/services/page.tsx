"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Zap,
  Hammer,
  ArrowRight,
  ShoppingCart,
  Search,
  Plus,
  Minus,
  Check,
  ChevronUp,
  ChevronDown,
  X,
  Trash2,
} from "lucide-react"
import Image from "next/image"

/* -------------------------------------------------------------------------- */
/*  Catalog                                                                    */
/*                                                                             */
/*  Every priced choice maps to a canonical service id whose price matches the */
/*  downstream customer / payment / confirmation pages, so the live total on   */
/*  this page stays consistent all the way through checkout. Quantity items    */
/*  repeat their canonical id once per unit (downstream sums duplicates);       */
/*  the large-ladder fee is a single flat $400 when any selected service uses  */
/*  it (mirrors the existing pages).                                            */
/* -------------------------------------------------------------------------- */

type ServiceType = "lighting" | "installation"

interface Variant {
  id: string
  label: string
  canonicalId: string
  price: number
}

interface AttributeOption {
  id: string
  label: string
  note?: string
}

interface AttributeGroup {
  id: string
  label: string
  options: AttributeOption[]
}

type Pricing =
  | { kind: "fixed"; canonicalId: string; price: number }
  | {
      kind: "quantity"
      canonicalId: string
      unitPrice: number
      unitLabel: string
      min: number
      max: number
      default: number
    }
  | { kind: "variant"; groupLabel: string; variants: Variant[]; attributes?: AttributeGroup[] }

interface Service2 {
  id: string
  name: string
  description: string
  image?: string
  type: ServiceType
  benefits: string[]
  hasLadderFee?: boolean
  pricing: Pricing
  /** Shown under the price when extra work might apply. */
  reviewNote?: string
}

const catalog: Service2[] = [
  /* -------------------------------- Lighting ----------------------------- */
  {
    id: "light-fixture",
    name: "Light Fixture Install",
    description: "Install or replace any standard light fixture.",
    image: "/services/light-fixture.webp",
    type: "lighting",
    benefits: ["Hardware check included", "Cleanup included"],
    hasLadderFee: true,
    pricing: { kind: "fixed", canonicalId: "light-fixture", price: 150 },
  },
  {
    id: "smart-switch",
    name: "Smart Switch / Dimmer",
    description: "Smart switch or dimmer install and app pairing.",
    image: "/services/switches-outlets.webp",
    type: "lighting",
    benefits: ["App pairing included", "Per device"],
    pricing: { kind: "fixed", canonicalId: "smart-switch", price: 125 },
  },
  {
    id: "outlet-switch",
    name: "Outlet / Dimmer Upgrade",
    description: "Upgrade or replace an outlet or dimmer switch.",
    image: "/services/switches-outlets.webp",
    type: "lighting",
    benefits: ["Per device", "Safety tested"],
    pricing: { kind: "fixed", canonicalId: "outlet-switch", price: 100 },
  },
  {
    id: "led-bulb",
    name: "LED Bulb Upgrade",
    description: "Swap existing bulbs to energy-efficient LEDs.",
    image: "/services/led-bulb-upgrade.webp",
    type: "lighting",
    benefits: ["Energy efficient", "Per fixture pricing", "Bulbs not included"],
    pricing: {
      kind: "quantity",
      canonicalId: "led-bulb-per-fixture",
      unitPrice: 17,
      unitLabel: "fixtures",
      min: 1,
      max: 40,
      default: 4,
    },
  },
  {
    id: "fixture-cleaning",
    name: "Fixture / Chandelier Cleaning",
    description: "Professional deep cleaning of fixtures and chandeliers.",
    image: "/services/fixture-cleaning.webp",
    type: "lighting",
    benefits: ["Detailed hand cleaning", "Bulb check included", "Cleanup included"],
    hasLadderFee: true,
    pricing: { kind: "fixed", canonicalId: "fixture-cleaning", price: 150 },
  },
  {
    id: "exterior-bulb",
    name: "Exterior Bulb Replacement",
    description: "Hard-to-reach exterior bulb replacement.",
    image: "/services/exterior-bulb.webp",
    type: "lighting",
    benefits: ["Tall-reach equipment", "Per visit", "Bulbs not included"],
    pricing: { kind: "fixed", canonicalId: "exterior-bulb-replacement", price: 150 },
  },
  {
    id: "outdoor-lighting",
    name: "Outdoor Lighting",
    description: "Pathway, garden, and accent lighting design.",
    image: "/services/outdoor-lighting.webp",
    type: "lighting",
    benefits: ["Custom layout", "Weatherproof fixtures"],
    pricing: {
      kind: "variant",
      groupLabel: "Project size",
      variants: [
        { id: "outdoor-basic", label: "Basic (5 – 8 lights)", canonicalId: "landscape-basic", price: 850 },
        { id: "outdoor-custom", label: "Custom / large", canonicalId: "landscape-custom", price: 2500 },
      ],
    },
  },
  {
    id: "garage-hex",
    name: "Garage Hex Lighting",
    description: "Hexagonal LED garage lighting system.",
    image: "/services/garage-hex.webp",
    type: "lighting",
    benefits: ["Modular layout", "Energy efficient"],
    pricing: {
      kind: "variant",
      groupLabel: "Garage size",
      variants: [
        { id: "garage-1", label: "1-car garage", canonicalId: "garage-hex-1car", price: 700 },
        { id: "garage-2", label: "2-car garage", canonicalId: "garage-hex-2car", price: 1150 },
      ],
    },
  },
  {
    id: "permanent-led",
    name: "Permanent LED Lighting",
    description: "Year-round permanent exterior LED, priced by your area size at $30 / linear foot.",
    image: "/services/permanent-led.webp",
    type: "lighting",
    benefits: ["Custom layout & design", "App-controlled scenes", "Weatherproof, year-round"],
    reviewNote: "$30 per linear foot · final footage confirmed on site.",
    pricing: {
      kind: "variant",
      groupLabel: "Area size",
      variants: [
        { id: "pled-s", label: "S · 50 ft", canonicalId: "permanent-led-s", price: 1500 },
        { id: "pled-m", label: "M · 100 ft", canonicalId: "permanent-led-m", price: 3000 },
        { id: "pled-l", label: "L · 150 ft", canonicalId: "permanent-led-l", price: 4500 },
        { id: "pled-xl", label: "XL · 200 ft", canonicalId: "permanent-led-xl", price: 6000 },
      ],
    },
  },

  /* ------------------------------ Installation --------------------------- */
  {
    id: "tv-mounting",
    name: "TV Mounting",
    description: "Professional wall mounting with clean cable management.",
    image: "/services/tv-mounting.webp",
    type: "installation",
    benefits: ["Cable concealment", "Level & secure mount"],
    pricing: {
      kind: "variant",
      groupLabel: "TV Size",
      variants: [
        { id: "tv-55", label: 'Up to 55"', canonicalId: "tv-small", price: 200 },
        { id: "tv-75", label: '56" – 75"', canonicalId: "tv-large", price: 350 },
        { id: "tv-76", label: '76" and larger', canonicalId: "tv-large", price: 350 },
      ],
    },
    reviewNote: "Existing power outlet behind the TV assumed.",
  },
  {
    id: "ceiling-fan",
    name: "Ceiling Fan Install",
    description: "Install or replace a standard ceiling fan.",
    image: "/services/ceiling-fan.webp",
    type: "installation",
    benefits: ["Balance & test", "Cleanup included"],
    hasLadderFee: true,
    pricing: { kind: "fixed", canonicalId: "ceiling-fan", price: 185 },
  },
  {
    id: "doorbell",
    name: "Ring Doorbell Install",
    description: "Smart video doorbell installation and app setup.",
    image: "/services/doorbell.webp",
    type: "installation",
    benefits: ["Existing wiring", "App + chime setup", "Same-day available"],
    pricing: { kind: "fixed", canonicalId: "doorbell", price: 150 },
    reviewNote: "New wiring may require a technician review.",
  },
  {
    id: "security-cameras",
    name: "Security Cameras",
    description: "Camera installation, mounting, and app setup.",
    image: "/services/security-cameras.webp",
    type: "installation",
    benefits: ["App + recording setup", "Cable management"],
    hasLadderFee: true,
    pricing: {
      kind: "variant",
      groupLabel: "How many cameras?",
      variants: [
        { id: "cam-single", label: "1 camera", canonicalId: "single-camera", price: 175 },
        { id: "cam-multi", label: "3 – 5 cameras", canonicalId: "multi-camera", price: 475 },
      ],
      attributes: [
        {
          id: "placement",
          label: "Indoor or Outdoor?",
          options: [
            { id: "indoor", label: "Indoor" },
            { id: "outdoor", label: "Outdoor" },
            { id: "both", label: "Both" },
          ],
        },
      ],
    },
  },
  {
    id: "audio-system",
    name: "Audio System Install",
    description: "Soundbar or full surround sound setup.",
    image: "/services/audio-system.webp",
    type: "installation",
    benefits: ["Concealed wiring", "Calibration included"],
    hasLadderFee: true,
    pricing: {
      kind: "variant",
      groupLabel: "System type",
      variants: [
        { id: "audio-soundbar", label: "Soundbar (concealed wiring)", canonicalId: "soundbar", price: 200 },
        { id: "audio-surround", label: "Full surround (5.1 / 7.1)", canonicalId: "surround-sound", price: 600 },
      ],
    },
  },
  {
    id: "picture-hanging",
    name: "Picture & Art Hanging",
    description: "Professional picture and art installation.",
    image: "/services/picture-hanging.webp",
    type: "installation",
    benefits: ["Precise leveling", "Wall-safe anchors", "Cleanup included"],
    hasLadderFee: true,
    pricing: {
      kind: "variant",
      groupLabel: "How much?",
      variants: [
        { id: "pic-standard", label: "1 – 3 items", canonicalId: "picture-hanging-standard", price: 125 },
        { id: "pic-gallery", label: "Gallery wall", canonicalId: "picture-hanging-gallery", price: 237 },
      ],
    },
  },
]

const sections: { type: ServiceType; icon: React.ElementType; title: string; subtitle: string }[] = [
  { type: "installation", icon: Hammer, title: "Installation", subtitle: "TVs, audio, security & more" },
  { type: "lighting", icon: Zap, title: "Lighting", subtitle: "LED, fixtures, outdoor & maintenance" },
]

const LADDER_FEE = 400

interface CartConfig {
  variantId?: string
  attributes: Record<string, string>
  quantity?: number
  ladderFee: boolean
}

function formatPrice(amount: number): string {
  return amount.toLocaleString("en-US")
}

function defaultConfig(service: Service2): CartConfig {
  const p = service.pricing
  return {
    variantId: p.kind === "variant" ? p.variants[0].id : undefined,
    attributes:
      p.kind === "variant" && p.attributes
        ? Object.fromEntries(p.attributes.map((g) => [g.id, g.options[0].id]))
        : {},
    quantity: p.kind === "quantity" ? p.default : undefined,
    ladderFee: false,
  }
}

function selectedVariant(service: Service2, cfg: CartConfig): Variant | undefined {
  if (service.pricing.kind !== "variant") return undefined
  return service.pricing.variants.find((v) => v.id === cfg.variantId) ?? service.pricing.variants[0]
}

/** Line price for a service excluding the shared ladder fee. */
function linePrice(service: Service2, cfg: CartConfig): number {
  const p = service.pricing
  if (p.kind === "fixed") return p.price
  if (p.kind === "quantity") return p.unitPrice * (cfg.quantity ?? p.default)
  if (p.kind === "variant") return selectedVariant(service, cfg)?.price ?? 0
  return 0
}

/** The "starting at" headline price shown on a collapsed card. */
function startingPrice(service: Service2): number {
  const p = service.pricing
  if (p.kind === "fixed") return p.price
  if (p.kind === "quantity") return p.unitPrice * p.default
  if (p.kind === "variant") return Math.min(...p.variants.map((v) => v.price))
  return 0
}

/** Expand a configured cart entry into canonical service ids for downstream pages. */
function canonicalIdsFor(service: Service2, cfg: CartConfig): string[] {
  const p = service.pricing
  if (p.kind === "fixed") return [p.canonicalId]
  if (p.kind === "quantity") return Array(cfg.quantity ?? p.default).fill(p.canonicalId)
  if (p.kind === "variant") {
    const v = selectedVariant(service, cfg)
    return v ? [v.canonicalId] : []
  }
  return []
}

/** Canonical id used to flag a ladder fee for downstream (any non-empty set => flat $400). */
function ladderCanonicalId(service: Service2, cfg: CartConfig): string | undefined {
  const p = service.pricing
  if (p.kind === "fixed") return p.canonicalId
  if (p.kind === "variant") return selectedVariant(service, cfg)?.canonicalId
  return undefined
}

export default function ServicesPage() {
  const router = useRouter()
  const [estimateData, setEstimateData] = useState<any>(null)
  const [cart, setCart] = useState<Record<string, CartConfig>>({})
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const [cartOpen, setCartOpen] = useState(false)

  /* ----------------------------- persistence ---------------------------- */
  useEffect(() => {
    const storedData = localStorage.getItem("estimateData")
    if (!storedData) {
      const initialData = { services: { selectedServices: [], isSubscription: false } }
      localStorage.setItem("estimateData", JSON.stringify(initialData))
      setEstimateData(initialData)
      return
    }
    const parsed = JSON.parse(storedData)
    setEstimateData(parsed)
    if (parsed.services2?.cart) {
      // Restore the richer services2 cart and re-hydrate defaults for any new fields.
      const restored: Record<string, CartConfig> = {}
      for (const [id, cfg] of Object.entries(parsed.services2.cart as Record<string, CartConfig>)) {
        const service = catalog.find((s) => s.id === id)
        if (!service) continue
        restored[id] = { ...defaultConfig(service), ...cfg }
      }
      setCart(restored)
    }
  }, [])

  const cartEntries = Object.entries(cart)
    .map(([id, cfg]) => {
      const service = catalog.find((s) => s.id === id)
      return service ? { service, cfg } : null
    })
    .filter(Boolean) as { service: Service2; cfg: CartConfig }[]

  const servicesSubtotal = cartEntries.reduce((sum, { service, cfg }) => sum + linePrice(service, cfg), 0)
  const anyLadder = cartEntries.some(({ cfg }) => cfg.ladderFee)
  const total = servicesSubtotal + (anyLadder ? LADDER_FEE : 0)
  const itemCount = cartEntries.length

  // Persist on every cart change so a refresh restores the order.
  useEffect(() => {
    if (!estimateData) return

    const selectedServices: string[] = []
    const ladderFeeServices: string[] = []
    for (const { service, cfg } of cartEntries) {
      selectedServices.push(...canonicalIdsFor(service, cfg))
      if (cfg.ladderFee) {
        const id = ladderCanonicalId(service, cfg)
        if (id) ladderFeeServices.push(id)
      }
    }

    const updated = {
      ...estimateData,
      services: {
        ...estimateData.services,
        selectedServices,
        ladderFeeServices,
        totalPrice: total,
        isSubscription: false,
      },
      services2: { cart },
    }
    localStorage.setItem("estimateData", JSON.stringify(updated))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])

  /* ------------------------------- helpers ------------------------------- */
  const isInCart = (id: string) => id in cart

  const addToCart = (service: Service2) => {
    setCart((prev) => ({ ...prev, [service.id]: prev[service.id] ?? defaultConfig(service) }))
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const updateConfig = (service: Service2, patch: Partial<CartConfig>) => {
    setCart((prev) => {
      const base = prev[service.id] ?? defaultConfig(service)
      return { ...prev, [service.id]: { ...base, ...patch } }
    })
  }

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filterServices = (services: Service2[]) => {
    if (!searchQuery.trim()) return services
    const q = searchQuery.toLowerCase()
    return services.filter(
      (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    )
  }

  const handleCheckout = () => {
    const selectedServices: string[] = []
    const ladderFeeServices: string[] = []
    for (const { service, cfg } of cartEntries) {
      selectedServices.push(...canonicalIdsFor(service, cfg))
      if (cfg.ladderFee) {
        const id = ladderCanonicalId(service, cfg)
        if (id) ladderFeeServices.push(id)
      }
    }
    const updated = {
      ...estimateData,
      source: "services",
      services: {
        ...estimateData?.services,
        selectedServices,
        ladderFeeServices,
        totalPrice: total,
        isSubscription: false,
      },
      services2: { cart },
    }
    localStorage.setItem("estimateData", JSON.stringify(updated))
    router.push("/estimate/customer")
  }

  // Clicking anywhere on a card (outside the controls) runs its primary action.
  const handleCardClick = (service: Service2) => {
    if (isInCart(service.id)) return
    const configurable = service.pricing.kind === "variant" || service.pricing.kind === "quantity"
    if (configurable && !expanded.has(service.id)) toggleExpanded(service.id)
    else addToCart(service)
  }

  /* --------------------------- card rendering ---------------------------- */
  const renderCard = (service: Service2) => {
    const inCart = isInCart(service.id)
    const cfg = cart[service.id] ?? defaultConfig(service)
    const configurable = service.pricing.kind === "variant" || service.pricing.kind === "quantity"
    const showConfig = configurable && (inCart || expanded.has(service.id))

    return (
      <Card
        key={service.id}
        onClick={() => handleCardClick(service)}
        className={`flex flex-col overflow-hidden rounded-xl !p-0 !gap-0 transition-all duration-200 cursor-pointer ${
          inCart ? "ring-2 ring-[#FFCB00] bg-[#FFCB00]/5 shadow-md" : "bg-white hover:shadow-md hover:border-gray-300"
        }`}
      >
        {/* Image */}
        {service.image && (
          <div className="relative w-full aspect-[3/2] overflow-hidden">
            <Image
              src={service.image}
              alt={service.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {inCart && (
              <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-[#FFCB00] pl-2 pr-2.5 py-1 shadow">
                <Check className="w-3.5 h-3.5 text-black" />
                <span className="text-[11px] font-bold text-black">Added</span>
              </div>
            )}
          </div>
        )}

        <CardContent className="flex flex-1 flex-col p-4">
          <h3 className="font-semibold text-gray-900 text-[15px] leading-snug">{service.name}</h3>
          <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2 min-h-[2.5rem]">{service.description}</p>

          {/* Value bullets — fixed reserve so 2- and 3-item cards match height */}
          <ul className="mt-2.5 space-y-1 min-h-[3.75rem]">
            {service.benefits.map((b) => (
              <li key={b} className="flex items-center gap-1.5 text-xs text-gray-600 min-w-0">
                <Check className="w-3.5 h-3.5 text-[#FFCB00] flex-shrink-0" />
                <span className="truncate">{b}</span>
              </li>
            ))}
          </ul>

          {/* Inline configurator */}
          {showConfig && service.pricing.kind === "variant" && (
            <div className="mt-3 space-y-3" onClick={(e) => e.stopPropagation()}>
              <ConfigGroup label={service.pricing.groupLabel}>
                {service.pricing.variants.map((v) => (
                  <OptionPill
                    key={v.id}
                    active={(cfg.variantId ?? service.pricing.variants[0].id) === v.id}
                    onClick={() => updateConfig(service, { variantId: v.id })}
                    label={v.label}
                    trailing={`$${formatPrice(v.price)}`}
                  />
                ))}
              </ConfigGroup>
              {service.pricing.attributes?.map((group) => {
                const selectedOpt = group.options.find((o) => o.id === cfg.attributes[group.id])
                return (
                  <ConfigGroup key={group.id} label={group.label}>
                    {group.options.map((o) => (
                      <OptionPill
                        key={o.id}
                        active={cfg.attributes[group.id] === o.id}
                        onClick={() =>
                          updateConfig(service, { attributes: { ...cfg.attributes, [group.id]: o.id } })
                        }
                        label={o.label}
                      />
                    ))}
                    {selectedOpt?.note && (
                      <p className="w-full text-[11px] text-amber-600 mt-1">{selectedOpt.note}</p>
                    )}
                  </ConfigGroup>
                )
              })}
            </div>
          )}

          {showConfig && service.pricing.kind === "quantity" && (
            <div className="mt-3" onClick={(e) => e.stopPropagation()}>
              <p className="text-xs font-medium text-gray-700 mb-1.5">How many {service.pricing.unitLabel}?</p>
              <div className="flex items-center gap-3">
                <Stepper
                  value={cfg.quantity ?? service.pricing.default}
                  min={service.pricing.min}
                  max={service.pricing.max}
                  onChange={(q) => updateConfig(service, { quantity: q })}
                />
                <span className="text-xs text-gray-500">${formatPrice(service.pricing.unitPrice)} each</span>
              </div>
            </div>
          )}

          {/* Large ladder fee — separated module */}
          {service.hasLadderFee && (inCart || showConfig) && (
            <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3" onClick={(e) => e.stopPropagation()}>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cfg.ladderFee}
                  onChange={(e) => updateConfig(service, { ladderFee: e.target.checked })}
                  className="w-4 h-4 accent-[#FFCB00] cursor-pointer flex-shrink-0"
                />
                <span className="text-xs font-semibold text-gray-800">
                  Add large ladder fee <span className="text-[#8a6d00]">+${LADDER_FEE}</span>
                </span>
              </label>
              <p className="mt-1 pl-[26px] text-[11px] text-gray-500 leading-tight">
                For interior ceilings over 15&apos; tall.
              </p>
            </div>
          )}

          {/* Price + action pinned to the bottom */}
          <div className="mt-auto pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-baseline justify-between">
              <div className="w-full">
                <span className="text-lg font-bold text-gray-900">
                  {service.pricing.kind !== "fixed" && (
                    <span className="text-xs font-medium text-gray-500">from </span>
                  )}
                  ${formatPrice(inCart ? linePrice(service, cfg) : startingPrice(service))}
                </span>
                {/* Reserve two lines so cards with and without a note match height */}
                {!inCart && (
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-tight line-clamp-2 min-h-[1.75rem]">
                    {service.reviewNote ?? ""}
                  </p>
                )}
              </div>
            </div>

            {inCart ? (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#FFCB00]/15 h-10 text-sm font-semibold text-[#8a6d00]">
                  <Check className="w-4 h-4" />
                  Added to cart
                </div>
                <button
                  onClick={() => removeFromCart(service.id)}
                  className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 h-10 text-sm text-gray-500 hover:text-red-600 hover:border-red-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            ) : configurable && !expanded.has(service.id) ? (
              <Button
                onClick={() => toggleExpanded(service.id)}
                className="mt-2 w-full rounded-lg bg-gray-900 hover:bg-gray-800 text-white h-10 text-sm"
              >
                Choose options
              </Button>
            ) : (
              <Button
                onClick={() => addToCart(service)}
                className="mt-2 w-full rounded-lg bg-[#FFCB00] hover:bg-[#FFCB00]/90 text-black font-semibold h-10 text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                {configurable ? "Add to cart" : "Book"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  /* -------------------------------- render ------------------------------- */
  const noResults =
    searchQuery.trim() && catalog.every((s) => filterServices([s]).length === 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-24 pb-40">
        {/* Hero */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Build your service order</h1>
              <p className="text-gray-500">
                Book fixed-price jobs instantly or get a live quote on custom work — build your order and check out online.
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="container mx-auto px-4 pt-6 pb-2">
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-full border-gray-200 bg-white shadow-sm focus-visible:ring-[#FFCB00]"
              />
            </div>
          </div>
        </div>

        {/* Sections by booking type */}
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {sections.map((section) => {
              const SectionIcon = section.icon
              const services = filterServices(catalog.filter((s) => s.type === section.type))
              if (services.length === 0) return null
              return (
                <div key={section.type}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border shadow-sm">
                      <SectionIcon className="w-4 h-4 text-[#FFCB00]" />
                      <span className="text-sm font-semibold text-gray-900">{section.title}</span>
                    </div>
                    <span className="text-sm text-gray-400">{section.subtitle}</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                    {services.map(renderCard)}
                  </div>
                </div>
              )
            })}

            {noResults && (
              <div className="text-center py-12 text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                <p className="font-medium">No services match &quot;{searchQuery}&quot;</p>
                <p className="text-sm mt-1">Try a different search term.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Running cart summary */}
      {itemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-2xl">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Expandable line items */}
              {cartOpen && (
                <div className="py-4 border-b max-h-[45vh] overflow-y-auto">
                  <div className="space-y-2.5">
                    {cartEntries.map(({ service, cfg }) => {
                      const variant = selectedVariant(service, cfg)
                      const detail =
                        service.pricing.kind === "quantity"
                          ? `${cfg.quantity ?? service.pricing.default} ${service.pricing.unitLabel}`
                          : variant?.label
                      return (
                        <div key={service.id} className="flex items-center justify-between gap-3 text-sm">
                          <div className="min-w-0">
                            <span className="font-medium text-gray-900">{service.name}</span>
                            {detail && <span className="text-gray-400"> · {detail}</span>}
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="font-semibold text-gray-900">
                              {service.pricing.kind !== "fixed" && (
                                <span className="text-xs font-normal text-gray-400">from </span>
                              )}
                              ${formatPrice(linePrice(service, cfg))}
                            </span>
                            <button
                              onClick={() => removeFromCart(service.id)}
                              className="text-gray-400 hover:text-gray-700"
                              aria-label={`Remove ${service.name}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                    {anyLadder && (
                      <div className="flex items-center justify-between text-sm pt-1 border-t border-gray-100">
                        <span className="text-gray-500">Large ladder fee</span>
                        <span className="font-semibold text-gray-900">${formatPrice(LADDER_FEE)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Summary bar */}
              <div className="flex items-center justify-between gap-4 py-4">
                <button onClick={() => setCartOpen((o) => !o)} className="flex items-center gap-3 group">
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6 text-gray-700" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#FFCB00] text-black text-xs font-bold flex items-center justify-center">
                      {itemCount}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                      {itemCount} service{itemCount > 1 ? "s" : ""} selected
                      {cartOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </div>
                    <div className="text-xs text-gray-500">Total ${formatPrice(total)}</div>
                  </div>
                </button>

                <Button
                  onClick={handleCheckout}
                  className="bg-[#FFCB00] hover:bg-[#FFCB00]/90 text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book now · ${formatPrice(total)}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

/* ------------------------------ subcomponents ----------------------------- */

function ConfigGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-700 mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  )
}

function OptionPill({
  active,
  onClick,
  label,
  trailing,
}: {
  active: boolean
  onClick: () => void
  label: string
  trailing?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition-all ${
        active ? "border-[#FFCB00] bg-[#FFCB00]/15 text-gray-900" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
      }`}
    >
      {label}
      {trailing && <span className="ml-1.5 font-bold">{trailing}</span>}
    </button>
  )
}

function Stepper({
  value,
  min,
  max,
  onChange,
}: {
  value: number
  min: number
  max: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-8 h-8 rounded-md border border-gray-200 flex items-center justify-center text-gray-700 hover:border-gray-300 disabled:opacity-40"
        aria-label="Decrease"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-8 text-center text-sm font-semibold text-gray-900">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-8 h-8 rounded-md border border-gray-200 flex items-center justify-center text-gray-700 hover:border-gray-300 disabled:opacity-40"
        aria-label="Increase"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  )
}
