import { type ProductVariant } from "@/app/features/products/variants/schema"

export type VariantAttributes = Record<string, string>

export function getAttributes(attributes: JSONValue): VariantAttributes {
  if (typeof attributes !== "object" || attributes === null || Array.isArray(attributes)) {
    return {}
  }
  const result: VariantAttributes = {}
  for (const [key, value] of Object.entries(attributes)) {
    if (typeof value === "string") result[key] = value
  }
  return result
}

export function getAttributeKeys(variants: ProductVariant[]): string[] {
  const keys = new Set<string>()
  variants.forEach((v) => Object.keys(getAttributes(v.attributes)).forEach((k) => keys.add(k)))
  return Array.from(keys)
}

export function getUniqueAttributeValues(variants: ProductVariant[], key: string): string[] {
  const values = new Set<string>()
  variants.forEach((v) => {
    const val = getAttributes(v.attributes)[key]
    if (val) values.add(val)
  })
  return Array.from(values)
}

export function isValueAvailable(
  variants: ProductVariant[],
  key: string,
  value: string,
  selected: VariantAttributes
): boolean {
  return variants.some((v) => {
    const attrs = getAttributes(v.attributes)
    if (attrs[key] !== value) return false
    return Object.entries(selected).every(([k, val]) => k === key || attrs[k] === val)
  })
}

export function getDefaultSelection(
  variants: ProductVariant[],
  attributeKeys: string[]
): VariantAttributes {
  const firstVariant = variants[0]
  if (!firstVariant) return {}
  const attrs = getAttributes(firstVariant.attributes)
  const defaults: VariantAttributes = {}
  attributeKeys.forEach((key) => {
    if (attrs[key]) defaults[key] = attrs[key]
  })
  return defaults
}

export function findMatchingVariant(
  variants: ProductVariant[],
  selected: VariantAttributes
): ProductVariant | undefined {
  return variants.find((v) => {
    const attrs = getAttributes(v.attributes)
    return Object.entries(selected).every(([key, value]) => attrs[key] === value)
  })
}
