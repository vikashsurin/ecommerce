import { UpdatePriceForm } from "@/app/features/products/components/update-price-form";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@workspace/ui/components/popover";
import { SquarePen } from "lucide-react";
import { useState } from "react";

export default function UpdatePricePopover({ productId, variantId, price }: {
  productId: number;
  variantId: number;
  price?: number
}) {



  const [open, setOpen] = useState(false)

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className={'absolute left-full  bg-gray-100 p-0.5 rounded-sm hover:bg-blue-500 hover:text-white  hover:shadow'}>
          <SquarePen size={16}  />
        </PopoverTrigger>

        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Change Price</PopoverTitle>
            <PopoverDescription>Change the price for this variant.</PopoverDescription>
          </PopoverHeader>

          <UpdatePriceForm
            productId={Number(productId)}
            variantId={variantId}
            price={price}
            setOpen={setOpen}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
