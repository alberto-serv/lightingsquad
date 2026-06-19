"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  Search,
  Plus,
  Minus,
  Check,
  Trash2,
  MessageSquare,
  Send,
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
  /** Flat variant price, or the per-unit price when `perUnit` is set. */
  price: number
  /** When set, this variant is priced per unit and shows a quantity stepper. */
  perUnit?: { unitLabel: string; min: number; max: number; default: number }
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
  | { kind: "hourly"; canonicalId: string; hourlyRate: number }
  | {
      kind: "quantity"
      canonicalId: string
      unitPrice: number
      unitLabel: string
      min: number
      max: number
      default: number
      /** Non-pricing notes captured for the technician (e.g. indoor vs outdoor). */
      attributes?: AttributeGroup[]
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
  /** Shows a "I need a wall mount" checkbox (no price impact — captured as a note). */
  mountOption?: boolean
  /** Shows a "+$75 mount soundbar & connect subwoofer" checkbox (TV). */
  soundbarOption?: boolean
  /** Shows a numeric "estimated fixture height (ft)" input — captured as a note, no price impact. */
  heightInput?: boolean
  pricing: Pricing
  /** Shown under the price when extra work might apply. */
  reviewNote?: string
  /** Renders the price as a "from $X" starting estimate (no configurable options). */
  estimate?: boolean
}

const catalog: Service2[] = [
  {
    id: "light-fixture",
    name: "Light Fixture Install",
    description: "Install or replace any standard light fixture.",
    image: "/services/light-fixture.webp",
    type: "lighting",
    benefits: ["Removal of existing fixture included", "Hardware check included", "Cleanup included"],
    hasLadderFee: true,
    pricing: { kind: "fixed", canonicalId: "light-fixture", price: 150 },
    reviewNote: "Additional fee for extensive assembly or crystal chandeliers.",
  },
  {
    id: "outdoor-lighting",
    name: "Outdoor Lighting",
    description: "Pathway, garden, and accent lighting design. Commercial grade components.",
    image: "/services/outdoor-lighting.webp",
    type: "lighting",
    benefits: ["Custom layout", "Weatherproof fixtures"],
    estimate: true,
    pricing: { kind: "fixed", canonicalId: "landscape-basic", price: 850 },
  },
  {
    id: "garage-hex",
    name: "Garage Hex Lighting",
    description: "Hexagonal LED garage lighting system.",
    image: "/services/garage-hex.webp",
    type: "lighting",
    benefits: ["Lights included", "Modular layout", "Energy efficient"],
    pricing: {
      kind: "variant",
      groupLabel: "Garage size",
      variants: [
        { id: "garage-1", label: "1-car garage", canonicalId: "garage-hex-1car", price: 750 },
        { id: "garage-2", label: "2-car garage", canonicalId: "garage-hex-2car", price: 1150 },
      ],
    },
  },
  {
    id: "ceiling-fan",
    name: "Ceiling Fan Install",
    description: "Install or replace a standard ceiling fan.",
    image: "/services/ceiling-fan.webp",
    type: "installation",
    benefits: ["Balance & test", "Cleanup included"],
    hasLadderFee: true,
    pricing: { kind: "fixed", canonicalId: "ceiling-fan", price: 175 },
  },
  {
    id: "tv-mounting",
    name: "TV Mounting",
    description: "Professional wall mounting with clean cable management.",
    image: "/services/tv-mounting.webp",
    type: "installation",
    benefits: ["Cable concealment", "Wall mount not included"],
    mountOption: true,
    soundbarOption: true,
    pricing: {
      kind: "variant",
      groupLabel: "TV Size",
      variants: [
        { id: "tv-74", label: '74" and smaller', canonicalId: "tv-small", price: 200 },
        { id: "tv-75", label: '75" and larger', canonicalId: "tv-large", price: 275 },
      ],
    },
    reviewNote: "Wall mount/bracket not included. Existing outlet behind the TV assumed.",
  },
  {
    id: "fixture-cleaning",
    name: "Fixture / Chandelier Cleaning",
    description: "Professional deep cleaning of fixtures and chandeliers.",
    image: "/services/fixture-cleaning.webp",
    type: "lighting",
    benefits: ["Detailed hand cleaning", "Bulb check included", "Cleanup included"],
    hasLadderFee: true,
    pricing: { kind: "hourly", canonicalId: "fixture-cleaning", hourlyRate: 150 },
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
  {
    id: "audio-system",
    name: "Audio System Install",
    description: "Soundbar or full surround sound setup. Material provided by client.",
    image: "/services/audio-system.webp",
    type: "installation",
    benefits: ["Concealed wiring", "Calibration included"],
    hasLadderFee: true,
    pricing: { kind: "hourly", canonicalId: "audio-system", hourlyRate: 150 },
  },
  {
    id: "smart-switch",
    name: "Smart Switch / Dimmer / Outlet Installation",
    description: "Smart switch or dimmer install and app pairing. Materials provided by the client.",
    image: "/services/switches-outlets.webp",
    type: "lighting",
    benefits: ["App pairing included", "Per device"],
    pricing: { kind: "fixed", canonicalId: "smart-switch", price: 150 },
  },
  {
    id: "exterior-bulb",
    name: "Exterior Bulb Replacement",
    description: "Hard-to-reach exterior bulb replacement.",
    image: "/services/exterior-bulb.webp",
    type: "lighting",
    benefits: ["Tall-reach equipment", "Per visit", "Bulbs not included"],
    heightInput: true,
    pricing: { kind: "fixed", canonicalId: "exterior-bulb-replacement", price: 150 },
  },
  {
    id: "doorbell",
    name: "Smart Doorbell Install",
    description: "Smart video doorbell installation and app setup.",
    image: "/services/doorbell.webp",
    type: "installation",
    benefits: ["Existing wiring", "App + chime setup", "Same-day available"],
    pricing: { kind: "fixed", canonicalId: "doorbell", price: 150 },
    reviewNote: "Doorbell hardware sold separately (≈ $99). New wiring may need a tech review.",
  },
  {
    id: "security-cameras",
    name: "Security Cameras / Security Lights",
    description: "Camera installation, mounting, security light installation and app setup.",
    image: "/services/security-cameras.webp",
    type: "installation",
    benefits: ["App + recording setup", "Cable management"],
    hasLadderFee: true,
    pricing: { kind: "hourly", canonicalId: "single-camera", hourlyRate: 150 },
  },
  {
    id: "picture-hanging",
    name: "Picture & Art Hanging",
    description: "Professional picture and art installation.",
    image: "/services/picture-hanging.webp",
    type: "installation",
    benefits: ["Precise leveling", "Cleanup included"],
    hasLadderFee: true,
    pricing: { kind: "hourly", canonicalId: "picture-hanging", hourlyRate: 150 },
  },
]

const LADDER_FEE = 400
const SOUNDBAR_FEE = 75

interface CartConfig {
  variantId?: string
  attributes: Record<string, string>
  quantity?: number
  /** True when the ceiling is 15'+ and the large-ladder fee applies. */
  ladderFee: boolean
  needsMount?: boolean
  /** TV: mount a soundbar & connect subwoofer (+$75). */
  soundbar?: boolean
  /** Exterior bulb: customer's estimated fixture height in feet (note only). */
  heightFt?: string
}

function formatPrice(amount: number): string {
  return amount.toLocaleString("en-US")
}

/** Rough singular of a unit label for per-unit price copy ("fixtures" → "fixture"). */
function singular(label: string): string {
  return label.endsWith("s") ? label.slice(0, -1) : label
}

function defaultConfig(service: Service2): CartConfig {
  const p = service.pricing
  return {
    variantId: p.kind === "variant" ? p.variants[0].id : undefined,
    attributes:
      p.kind === "variant" && p.attributes
        ? Object.fromEntries(p.attributes.map((g) => [g.id, g.options[0].id]))
        : p.kind === "quantity" && p.attributes
        ? Object.fromEntries(p.attributes.map((g) => [g.id, g.options[0].id]))
        : {},
    quantity:
      p.kind === "quantity"
        ? p.default
        : p.kind === "variant"
        ? p.variants[0].perUnit?.default
        : undefined,
    ladderFee: false,
    needsMount: false,
    soundbar: false,
    heightFt: "",
  }
}

function selectedVariant(service: Service2, cfg: CartConfig): Variant | undefined {
  if (service.pricing.kind !== "variant") return undefined
  return service.pricing.variants.find((v) => v.id === cfg.variantId) ?? service.pricing.variants[0]
}

/** Quantity in effect for a per-unit variant (falls back to its default). */
function variantQuantity(variant: Variant, cfg: CartConfig): number {
  return cfg.quantity ?? variant.perUnit?.default ?? 1
}

/** True when this service is billed hourly (price shown as "$X/hr"). */
function isHourly(service: Service2): boolean {
  return service.pricing.kind === "hourly"
}

/** Line price for a service excluding the shared ladder fee. */
function linePrice(service: Service2, cfg: CartConfig): number {
  const p = service.pricing
  let base = 0
  if (p.kind === "fixed") base = p.price
  else if (p.kind === "hourly") base = p.hourlyRate
  else if (p.kind === "quantity") base = p.unitPrice * (cfg.quantity ?? p.default)
  else if (p.kind === "variant") {
    const v = selectedVariant(service, cfg)
    base = v ? (v.perUnit ? v.price * variantQuantity(v, cfg) : v.price) : 0
  }
  if (service.soundbarOption && cfg.soundbar) base += SOUNDBAR_FEE
  return base
}

/** The "starting at" headline price shown on a collapsed card. */
function startingPrice(service: Service2): number {
  const p = service.pricing
  if (p.kind === "fixed") return p.price
  if (p.kind === "hourly") return p.hourlyRate
  if (p.kind === "quantity") return p.unitPrice * p.default
  if (p.kind === "variant")
    return Math.min(...p.variants.map((v) => (v.perUnit ? v.price * v.perUnit.min : v.price)))
  return 0
}

/** Expand a configured cart entry into canonical service ids for downstream pages. */
function canonicalIdsFor(service: Service2, cfg: CartConfig): string[] {
  const p = service.pricing
  const ids: string[] = []
  if (p.kind === "fixed" || p.kind === "hourly") ids.push(p.canonicalId)
  else if (p.kind === "quantity") ids.push(...Array(cfg.quantity ?? p.default).fill(p.canonicalId))
  else if (p.kind === "variant") {
    const v = selectedVariant(service, cfg)
    if (v) ids.push(...(v.perUnit ? Array(variantQuantity(v, cfg)).fill(v.canonicalId) : [v.canonicalId]))
  }
  // Soundbar add-on (TV) propagates as its own line so downstream totals match.
  if (service.soundbarOption && cfg.soundbar) ids.push("tv-soundbar")
  return ids
}

/** Canonical id used to flag a ladder fee for downstream (any non-empty set => flat $400). */
function ladderCanonicalId(service: Service2, cfg: CartConfig): string | undefined {
  const p = service.pricing
  if (p.kind === "fixed" || p.kind === "hourly") return p.canonicalId
  if (p.kind === "variant") return selectedVariant(service, cfg)?.canonicalId
  return undefined
}

export default function ServicesPage() {
  const router = useRouter()
  const [estimateData, setEstimateData] = useState<any>(null)
  const [cart, setCart] = useState<Record<string, CartConfig>>({})
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const [requestMessage, setRequestMessage] = useState("")
  const [requestSent, setRequestSent] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

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

  // The flat $400 large-ladder fee is charged once. The first selected service that
  // opts in "carries" it (its card price shows the fee); any later ladder selection
  // just flags that the fee is already in the total via a toast.
  const ladderOwnerId = cartEntries.find(({ cfg }) => cfg.ladderFee)?.service.id

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
    // Collapse the card back to its original (unexpanded) height on deselect.
    setExpanded((prev) => {
      if (!prev.has(id)) return prev
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const updateConfig = (service: Service2, patch: Partial<CartConfig>) => {
    setCart((prev) => {
      const base = prev[service.id] ?? defaultConfig(service)
      return { ...prev, [service.id]: { ...base, ...patch } }
    })
  }

  // Toggling the large-ladder fee. The $400 only adds once, so if another selected
  // service already carries it, tell the customer it's already in their total.
  const setLadder = (service: Service2, value: boolean) => {
    if (value) {
      const alreadyCharged = cartEntries.some(({ service: s, cfg }) => s.id !== service.id && cfg.ladderFee)
      if (alreadyCharged) setToast("We've already added the $400 large-ladder fee to your total.")
    }
    updateConfig(service, { ladderFee: value })
  }

  // Auto-dismiss the toast.
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3500)
    return () => clearTimeout(t)
  }, [toast])

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

  const handleRequestSubmit = () => {
    if (!requestMessage.trim()) return
    const subject = encodeURIComponent("Service Request — The Lighting Squad")
    const body = encodeURIComponent(requestMessage)
    window.location.href = `mailto:hello@thelightingsquad.com?subject=${subject}&body=${body}`
    setRequestSent(true)
    setTimeout(() => setRequestSent(false), 4000)
  }

  // Clicking anywhere on a card (outside the controls) toggles it: a selected
  // card is removed, an unselected one is added (or expanded to choose options).
  const handleCardClick = (service: Service2) => {
    if (isInCart(service.id)) {
      // removeFromCart also collapses the card back to its original height.
      removeFromCart(service.id)
      return
    }
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
    // This card shows the flat $400 fee in its price only when it's the one carrying it.
    const carriesLadder = inCart && cfg.ladderFee && service.id === ladderOwnerId
    // Whether the card reveals any extra controls once added (and so grows on its own).
    const hasInCartExtras =
      configurable ||
      !!service.hasLadderFee ||
      !!service.soundbarOption ||
      !!service.mountOption ||
      !!service.heightInput

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
                    trailing={v.perUnit ? `$${formatPrice(v.price)}/${singular(v.perUnit.unitLabel)}` : `$${formatPrice(v.price)}`}
                  />
                ))}
              </ConfigGroup>
              {(() => {
                const v = selectedVariant(service, cfg)
                if (!v?.perUnit) return null
                return (
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1.5">
                      How many {v.perUnit.unitLabel}?
                    </p>
                    <div className="flex items-center gap-3">
                      <Stepper
                        value={variantQuantity(v, cfg)}
                        min={v.perUnit.min}
                        max={v.perUnit.max}
                        onChange={(q) => updateConfig(service, { quantity: q })}
                      />
                      <span className="text-xs text-gray-500">${formatPrice(v.price)} each</span>
                    </div>
                  </div>
                )
              })()}
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
            <div className="mt-3 space-y-3" onClick={(e) => e.stopPropagation()}>
              <div>
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

          {/* Ceiling height — drives the large-ladder fee */}
          {service.hasLadderFee && (inCart || showConfig) && (
            <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3" onClick={(e) => e.stopPropagation()}>
              <p className="text-xs font-semibold text-gray-800">Is your ceiling under 15&apos; tall?</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <OptionPill
                  active={!cfg.ladderFee}
                  onClick={() => setLadder(service, false)}
                  label="Yes, under 15'"
                />
                <OptionPill
                  active={cfg.ladderFee}
                  onClick={() => setLadder(service, true)}
                  label="No, 15' or taller"
                />
              </div>
              {cfg.ladderFee && (
                <p className="mt-2 text-[11px] font-semibold text-gray-800">
                  {service.id === ladderOwnerId
                    ? `Large ladder required — an extra $${LADDER_FEE} applies for ceilings 15' and taller.`
                    : `The $${LADDER_FEE} large-ladder fee is already in your total.`}
                </p>
              )}
              <p className="mt-1 text-[11px] text-gray-800 leading-tight">
                Indoors we can reach fixtures up to 26&apos; tall.
              </p>
            </div>
          )}

          {/* Soundbar add-on — TV only (+$75) */}
          {service.soundbarOption && (inCart || showConfig) && (
            <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3" onClick={(e) => e.stopPropagation()}>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!cfg.soundbar}
                  onChange={(e) => updateConfig(service, { soundbar: e.target.checked })}
                  className="w-4 h-4 accent-[#FFCB00] cursor-pointer flex-shrink-0"
                />
                <span className="text-xs font-semibold text-gray-800">
                  Mount soundbar &amp; connect subwoofer <span className="text-[#8a6d00]">+${SOUNDBAR_FEE}</span>
                </span>
              </label>
            </div>
          )}

          {/* Wall-mount option — no price impact, captured as a note */}
          {service.mountOption && (inCart || showConfig) && (
            <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3" onClick={(e) => e.stopPropagation()}>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!cfg.needsMount}
                  onChange={(e) => updateConfig(service, { needsMount: e.target.checked })}
                  className="w-4 h-4 accent-[#FFCB00] cursor-pointer flex-shrink-0"
                />
                <span className="text-xs font-semibold text-gray-800">I need a wall mount</span>
              </label>
              <p className="mt-1 pl-[26px] text-[11px] text-gray-500 leading-tight">
                The mount/bracket isn&apos;t included — check this and we&apos;ll bring one to fit your TV.
              </p>
            </div>
          )}

          {/* Estimated fixture height — exterior bulb (note only, no price impact) */}
          {service.heightInput && (inCart || showConfig) && (
            <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3" onClick={(e) => e.stopPropagation()}>
              <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                Estimated height of the fixtures
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={cfg.heightFt ?? ""}
                  onChange={(e) => updateConfig(service, { heightFt: e.target.value })}
                  placeholder="e.g. 20"
                  className="h-9 w-24 rounded-lg"
                />
                <span className="text-xs text-gray-500">feet</span>
              </div>
              <p className="mt-1 text-[11px] text-gray-500 leading-tight">
                Helps us bring the right reach equipment. Indoors we reach up to 26&apos;.
              </p>
            </div>
          )}

          {/* Price + action pinned to the bottom */}
          <div className="mt-auto pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-baseline justify-between">
              <div className="w-full">
                {isHourly(service) ? (
                  <span className="text-lg font-bold text-gray-900">
                    ${formatPrice(startingPrice(service))}
                    <span className="text-xs font-medium text-gray-500">/hr</span>
                    {carriesLadder && (
                      <span className="block text-xs font-semibold text-[#8a6d00]">+ ${formatPrice(LADDER_FEE)} large-ladder fee</span>
                    )}
                  </span>
                ) : !inCart && service.pricing.kind === "quantity" ? (
                  <span className="text-lg font-bold text-gray-900">
                    ${formatPrice(service.pricing.unitPrice)}
                    <span className="text-xs font-medium text-gray-500"> / {singular(service.pricing.unitLabel)}</span>
                  </span>
                ) : (
                  <span className="text-lg font-bold text-gray-900">
                    {((!inCart && service.pricing.kind !== "fixed") || service.estimate) && (
                      <span className="text-xs font-medium text-gray-500">from </span>
                    )}
                    ${formatPrice((inCart ? linePrice(service, cfg) : startingPrice(service)) + (carriesLadder ? LADDER_FEE : 0))}
                  </span>
                )}
                {/* Reserve two lines so cards with and without a note match height.
                    Cards that reveal no extra controls when added keep the reserve so
                    their height stays constant on selection. */}
                {(!inCart || !hasInCartExtras) && (
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-tight line-clamp-2 min-h-[1.75rem]">
                    {!inCart ? service.reviewNote ?? "" : ""}
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
                {configurable || service.estimate ? "Add to cart" : "Book"}
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
    <div className="min-h-screen bg-gray-50 max-sm:pb-24">
      <Header />

      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 z-50 -translate-x-1/2 px-4 w-full max-w-sm">
          <div className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
            <Check className="h-4 w-4 flex-shrink-0 text-[#FFCB00]" />
            {toast}
          </div>
        </div>
      )}

      <div className="pt-24 pb-16 max-sm:pb-28">
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

        {/* All services in one flat grid */}
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {filterServices(catalog).length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                {filterServices(catalog).map(renderCard)}
              </div>
            )}

            {noResults && (
              <div className="text-center py-12 text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                <p className="font-medium">No services match &quot;{searchQuery}&quot;</p>
                <p className="text-sm mt-1">Try a different search term.</p>
              </div>
            )}

            {/* Book section — count + total + checkout.
                In-flow card on desktop; pinned to the bottom of the screen on mobile. */}
            {itemCount > 0 && (
              <div className="border-t border-gray-200 pt-10 max-sm:border-0 max-sm:pt-0 max-sm:!my-0 max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:z-40 max-sm:bg-gray-900 max-sm:shadow-2xl">
                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 sm:p-6 shadow-sm max-sm:rounded-none max-sm:border-0 max-sm:bg-transparent max-sm:shadow-none max-sm:p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-base font-semibold text-white">
                        {itemCount} service{itemCount > 1 ? "s" : ""}
                      </div>
                      <div className="text-sm text-gray-300">Total ${formatPrice(total)}</div>
                    </div>
                    <Button
                      onClick={handleCheckout}
                      className="bg-[#FFCB00] hover:bg-[#FFCB00]/90 text-black font-semibold h-12 px-12 max-sm:px-8 rounded-full text-base shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Book now · ${formatPrice(total)}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Request a service — simplified */}
            <div className="border-t border-gray-200 pt-10">
              <div className="max-w-xl mx-auto rounded-2xl border bg-white p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-5 h-5 text-[#FFCB00]" />
                  <h2 className="text-base font-semibold text-gray-900">Don&apos;t see what you need?</h2>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  Tell us what you&apos;re looking for and we&apos;ll get back to you.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Describe the service you need…"
                    value={requestMessage}
                    onChange={(e) => setRequestMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleRequestSubmit()}
                    className="h-11 rounded-lg border-gray-200 bg-white"
                  />
                  <Button
                    onClick={handleRequestSubmit}
                    disabled={!requestMessage.trim()}
                    className="h-11 shrink-0 rounded-lg bg-gray-900 hover:bg-gray-800 text-white px-5"
                  >
                    {requestSent ? (
                      "Opening email…"
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send request
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
