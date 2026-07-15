import { UpdateStockForm } from "@/app/features/products/components/update-stock-form";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@workspace/ui/components/popover";
import { SquarePen } from "lucide-react";
import { useState } from "react";

export default function UpdateStock({ productId, variantId, stockValue }: {
  productId: number;
  variantId: number;
  stockValue?: number;
}) {


  const [open, setOpen] = useState(false)

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className={'absolute  left-full bg-gray-100 p-0.5 rounded-sm hover:bg-blue-500 hover:text-white  hover:shadow'}>
          <SquarePen size={16}  />
        </PopoverTrigger>

        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Change Stock</PopoverTitle>
            <PopoverDescription>Change the stock quantity for this variant.</PopoverDescription>
          </PopoverHeader>

          <UpdateStockForm
            productId={Number(productId)}
            variantId={variantId}
            stockValue={stockValue}
            setOpen={setOpen}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
