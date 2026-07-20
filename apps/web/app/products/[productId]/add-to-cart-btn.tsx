"use client"

import { useAddToCart } from "@/app/features/cart/queries"
import { type ProductVariant } from "@/app/features/products/variants/schema"
import { Button } from "@workspace/ui/components/button"
import { ButtonGroup } from "@workspace/ui/components/button-group"
import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"

export function AddToCartButton({
  variant,
}: {
  variant: ProductVariant | undefined
}) {
  const outOfStock = variant ? variant.stock <= 0 : false
  const disabled = !variant || outOfStock

  const [quantity, setQuantity] = useState(1)

  const { mutate: addToCart } = useAddToCart()

  function handleAddToCart() {
    if (variant) {
      addToCart({ quantity, productVariantId: variant.id })
    }
  }

  return (
    <div>
      <Field>
        <FieldLabel>Select Quantity</FieldLabel>
        <ButtonGroup className="">
          <Button
            disabled={disabled}
            size={'icon'}
            variant={'secondary'}
            onClick={() => {
              if (quantity > 1) setQuantity(quantity - 1)
            }}>
            <Minus />
          </Button>

          <Button
            disabled={disabled}
            size={'icon'} variant={'ghost'}
          >
            <span>{quantity}</span>
          </Button>

          <Button
            disabled={disabled}
            size={'icon'}
            variant={'secondary'}
            onClick={() =>
              setQuantity(quantity + 1)
            }>
            <Plus />
          </Button>
        </ButtonGroup>
      </Field>

      <Button
        type="button"
        disabled={disabled}
        onClick={handleAddToCart}
        className="w-max mt-4"
      >
        {outOfStock ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  )
}
