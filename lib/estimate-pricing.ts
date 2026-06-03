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

/**
 * Split selected line items into the ones charged at checkout (fixed price)
 * and the ones quoted on-site ("from" / estimate). Only the payable bucket
 * (plus membership) is paid online.
 */
export function splitByPayment<T extends { id: string }>(items: T[]): { payable: T[]; estimate: T[] } {
  return {
    payable: items.filter((i) => !ESTIMATE_PRICE_IDS.has(i.id)),
    estimate: items.filter((i) => ESTIMATE_PRICE_IDS.has(i.id)),
  }
}

/** The flat ladder fee is charged today only when it applies to a fixed-price service. */
export function ladderAppliesToPayable(ladderIds: string[] | undefined | null): boolean {
  return !!ladderIds?.some((id) => !ESTIMATE_PRICE_IDS.has(id))
}

/** Format a line price as "$X" or "from $X" depending on whether the id is an estimate. */
export function formatServicePrice(id: string, price: number): string {
  const formatted = `$${price.toLocaleString("en-US")}`
  return ESTIMATE_PRICE_IDS.has(id) ? `from ${formatted}` : formatted
}
