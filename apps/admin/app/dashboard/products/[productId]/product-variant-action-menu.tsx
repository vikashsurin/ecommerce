
import { type ProductVariant } from "@/app/features/products/variants/schema";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@workspace/ui/components//dropdown-menu";
import { Ellipsis } from "lucide-react";
import { DeleteVariantDialogForm } from "./delete-variant-form-dialog";
import { useState } from "react";

export function ProductVariantActionMenu({ productId, variant }: {
  productId: number;
  variant: ProductVariant
}) {
  const [open, setOpen] = useState(false);

  return (
    <>

    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis size={16} className="ml-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpen(true)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
      </DropdownMenu>
      <DeleteVariantDialogForm
        open={open}
        setOpen={setOpen}
        productId={productId}
        variant={variant}
      />
    </>
  )
}
