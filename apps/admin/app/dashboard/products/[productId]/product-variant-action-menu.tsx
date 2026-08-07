import { type ProductVariant } from "@/app/features/products/variants/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components//dropdown-menu";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DeleteVariantDialogForm } from "./delete-variant-form-dialog";

export function ProductVariantActionMenu({ productId, variant }: {
  productId: number;
  variant: ProductVariant;
}) {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  console.log({ pathname });
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis size={16} className="ml-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href={`${pathname}/variants/${variant.id}/images`}>
            <DropdownMenuItem>
              Edit
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpen(true)}
          >
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
  );
}
