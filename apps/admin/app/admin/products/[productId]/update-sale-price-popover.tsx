import { UpdateSalePriceForm } from "@/app/features/variants/components/update-sale-price-form"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { SquarePen } from "lucide-react"
import { useState } from "react"

export default function UpdateSalePricePopover({
  productId,
  variantId,
  price,
  salePrice,
}: {
  productId: number
  variantId: number
  price: number
  salePrice: number | null
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={
            "absolute left-full rounded-sm bg-gray-100 p-0.5 hover:bg-blue-500 hover:text-white hover:shadow"
          }
        >
          <SquarePen size={16} />
        </PopoverTrigger>

        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Change Sale Price</PopoverTitle>
            <PopoverDescription>
              Change the sale price for this variant.
            </PopoverDescription>
          </PopoverHeader>

          <UpdateSalePriceForm
            productId={Number(productId)}
            variantId={variantId}
            price={price}
            salePrice={salePrice}
            setOpen={setOpen}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
