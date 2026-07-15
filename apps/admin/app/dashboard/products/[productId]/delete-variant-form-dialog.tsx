

import { useDeleteProductVariant } from "@/app/features/products/variants/queries";
import { type ProductVariant } from "@/app/features/products/variants/schema";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@workspace/ui/components/alert-dialog";

import { toast } from "sonner";

export function DeleteVariantDialogForm({ productId, variant, open, setOpen }: {
  productId: number;
  variant: ProductVariant;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const { mutate: deleteVariant, isPending } = useDeleteProductVariant()


  function handleDelete() {
    deleteVariant({
      productId,
      variantId: variant.id
    },
      {
        onSuccess: () => {
          setOpen(false)
          toast.success(`Variant deleted successfully`)
        },
        onError: () => {
          toast.error("Something went wrong")
        },
      })
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Delete <b className='text-black'>{variant.id}</b>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={'destructive'}
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
