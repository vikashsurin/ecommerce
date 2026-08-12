

import { useDeleteCategory } from "@/app/features/categories/queries";
import { type Category } from "@/app/features/categories/schema";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@workspace/ui/components/alert-dialog";
import { toast } from "sonner";


export function DeleteCategoryDialog({ open, setOpen, category }: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category: Category
}) {

  const { mutate: deleteCategory, isPending } = useDeleteCategory()


  function handleDelete() {
    deleteCategory(category.id, {
      onSuccess: () => {
        setOpen(false)
        toast.success(`${category.name} deleted successfully`)
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
            Delete <b className='text-black'>{category.name}</b>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={'destructive'}
            onClick={handleDelete}
            disabled={isPending}
          >Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
