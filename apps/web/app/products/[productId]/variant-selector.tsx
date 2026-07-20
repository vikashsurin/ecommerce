"use client"

import { cn } from "@workspace/ui/lib/utils"
import { type ProductVariant } from "@/app/features/products/variants/schema"
import {
  type VariantAttributes,
  getAttributeKeys,
  getUniqueAttributeValues,
  isValueAvailable,
} from "@/lib/variant-attributes"

export function VariantSelector({
  variants,
  selected,
  onSelect,
}: {
  variants: ProductVariant[]
  selected: VariantAttributes
  onSelect: (updater: (prev: VariantAttributes) => VariantAttributes) => void
}) {
  const attributeKeys = getAttributeKeys(variants)
  const primaryKey = attributeKeys[0] // treat first key as primary — always clickable

  const selectAttribute = (key: string, value: string) => {
    onSelect((prev) => {
      if (key !== primaryKey) {
        return { ...prev, [key]: value }
      }

      const next: VariantAttributes = { [key]: value }

      for (const otherKey of attributeKeys) {
        if (otherKey === key) continue

        // Keep the old value if it's still valid with the new primary selection
        if (prev[otherKey] && isValueAvailable(variants, otherKey, prev[otherKey], next)) {
          next[otherKey] = prev[otherKey]
          continue
        }

        // Otherwise, auto-pick the first valid value for this key
        const fallback = getUniqueAttributeValues(variants, otherKey).find((v) =>
          isValueAvailable(variants, otherKey, v, next)
        )
        if (fallback) next[otherKey] = fallback
      }

      return next
    })
  }

  return (
    <div className="space-y-4">
      {attributeKeys.map((key) => (
        <div key={key}>
          <p className="text-sm mb-2 capitalize">
            {key}: <span className="font-semibold">{selected[key] ?? "Select"}</span>
          </p>
          <div className="flex gap-2">
            {getUniqueAttributeValues(variants, key).map((value) => {
              const available =
                key === primaryKey || isValueAvailable(variants, key, value, selected)

              return (
                <button
                  key={value}
                  type="button"
                  disabled={!available}
                  onClick={() => selectAttribute(key, value)}
                  className={cn(
                    "border rounded-md px-3 py-2 text-sm",
                    selected[key] === value && "ring-2 ring-primary",
                    !available && "opacity-40 cursor-not-allowed"
                  )}
                >
                  {value}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
