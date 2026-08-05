// utils/generate-sku.ts

/**
 * Converts any string into a SKU-safe token:
 * uppercase, alphanumeric only, no spaces/symbols.
 */
function toSkuToken(value: string): string {
  return value
    .toUpperCase()
    .trim()
    .replace(/[^A-Z0-9]+/g, ""); // strip spaces, hyphens, symbols
}

/**
 * Generates a SKU from a product name and a dynamic attributes object.
 * Attribute keys are sorted alphabetically for deterministic ordering
 * regardless of how the JSON was constructed.
 *
 * e.g. generateSku("Classic Hoodie", { color: "Red", size: "XL" })
 *      -> "CLASSICHOODIE-RED-XL-4F9A"
 */
export function generateSku(name: string, attributes: Record<string, unknown>): string {

  console.log("from generateSku", { name, attributes })
  const namePart = toSkuToken(name).slice(0, 20); // cap length for sanity

  const attrPart = Object.keys(attributes)
    .sort() // deterministic order: color always before size, etc.
    .map((key) => {
      const value = attributes[key];
      if (value === null || value === undefined || value === "") return null;
      return toSkuToken(String(value));
    })
    .filter(Boolean)
    .join("-");

  // 4-char random suffix as a collision safety net
  const suffix = crypto.randomUUID().replace(/-/g, "").slice(0, 4).toUpperCase();

  return [namePart, attrPart, suffix].filter(Boolean).join("-");
}
