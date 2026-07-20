
import { ProductVariant } from '@/app/features/products/variants/schema'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@workspace/ui/components/sheet'
import { useState } from 'react'

export default function PlaceOrderPage({ cart }: {
  cart: {
    quantity: number,
    variant: ProductVariant
  }[]
}) {

  const [open, setOpen] = useState<boolean>(cart.length > 0)
  const [prevCartLength, setPrevCartLength] = useState(cart.length)

  // Sync state during render if the cart length grows
  if (cart.length !== prevCartLength) {
    setPrevCartLength(cart.length)
    if (cart.length > prevCartLength && cart.length > 0) {
      setOpen(true)
    }
  }

  console.log({ cart })
  return (
    <>
      <Sheet>
        <SheetTrigger>sfsdf</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>This action cannot be undone.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  )
}
