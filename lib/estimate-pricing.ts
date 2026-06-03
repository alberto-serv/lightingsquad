/**
 * Canonical service ids whose price is an estimate ("from $X"), not a fixed price.
 * These are the variable / configurable services (size, quantity, project scope),
 * so their displayed price is always a starting estimate — never a final set price.
 * Keep this in sync with the variant / quantity services in /estimate/services2.
 */
export const ESTIMATE_PRICE_IDS = new Set<string>([
  "tv-small",
  "tv-large",
  "soundbar",
  "surround-sound",
  "single-camera",
  "multi-camera",
  "picture-hanging-standard",
  "picture-hanging-gallery",
  "landscape-basic",
  "landscape-custom",
  "cabinet-standard",
  "cabinet-custom",
  "garage-hex-1car",
  "garage-hex-2car",
  "permanent-led-exterior",
  "permanent-led-home",
  "permanent-led-s",
  "permanent-led-m",
  "permanent-led-l",
  "permanent-led-xl",
  "led-bulb-per-fixture",
  "led-bulb-whole-home",
])

export function isEstimatePrice(id: string): boolean {
  return ESTIMATE_PRICE_IDS.has(id)
}

/** Format a line price as "$X" or "from $X" depending on whether the id is an estimate. */
export function formatServicePrice(id: string, price: number): string {
  const formatted = `$${price.toLocaleString("en-US")}`
  return ESTIMATE_PRICE_IDS.has(id) ? `from ${formatted}` : formatted
}
