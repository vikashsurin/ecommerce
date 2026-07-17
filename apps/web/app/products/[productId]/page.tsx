"use client"

import { useProductVariants } from "@/app/features/products/variants/queries"
import {
  type VariantAttributes,
  findMatchingVariant,
  getAttributeKeys,
  getDefaultSelection,
} from "@/lib/variant-attributes"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useProduct } from "../../features/products/queries"
import { AddToCartButton } from "./add-to-cart-btn"
import { VariantSelector } from "./variant-selector"

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>()

  const { data: variants } = useProductVariants(Number(productId))
  const { data, isLoading, isSuccess, isError } = useProduct(productId)

  const attributeKeys = useMemo(
    () => getAttributeKeys(variants ?? []),
    [variants]
  )

  const [selected, setSelected] = useState<VariantAttributes>({})

  // Variants load asynchronously, so set the default selection once they arrive.
  // Guarded so it only runs once (won't stomp a selection the user has already made).
  useEffect(() => {
    if (!variants || variants.length === 0) return
    setSelected((prev) => {
      if (Object.keys(prev).length > 0) return prev
      return getDefaultSelection(variants, attributeKeys)
    })
  }, [variants, attributeKeys])

  const selectedVariant = useMemo(
    () => (variants ? findMatchingVariant(variants, selected) : undefined),
    [variants, selected]
  )

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Try again later</p>
  if (!isSuccess) return null

  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      <div>
        <Image
          src="https://picsum.photos/200/300"
          alt={data.name}
          width={300}
          height={300}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="ml-6">
        <div>
          <h3>{data.name}</h3>
          <p>{data.description}</p>
        </div>

        {selectedVariant && (
          <div className="mt-4 text-sm">
            <h6>{selectedVariant.sku}</h6>

            {/*price*/}
            {selectedVariant.salePrice &&
            selectedVariant.salePrice < selectedVariant.price ? (
              <p>
                <span className="line-through">₹{selectedVariant.price}</span> ₹
                {selectedVariant.salePrice}
              </p>
            ) : (
              <p>₹{selectedVariant.price}</p>
            )}
            <p className="text-muted-foreground">
              {selectedVariant.stock > 0
                ? `${selectedVariant.stock} in stock`
                : "Out of stock"}
            </p>
          </div>
        )}

        <div className="mt-4">
          {variants && (
            <VariantSelector
              variants={variants}
              selected={selected}
              onSelect={setSelected}
            />
          )}
        </div>
      </div>
      <AddToCartButton
        variant={selectedVariant}
        onAddToCart={(variantId) => {
          console.log("add to cart:", variantId)
          // actual mutation call goes here once you build the cart endpoint
        }}
      />
      <div>{/* AddToCart goes here */}</div>
    </div>
  )
}
