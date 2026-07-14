import { useDeleteAttribute } from "@/app/features/categories/queries";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@workspace/ui/components/alert-dialog";
import { Button } from "@workspace/ui/components/button";


export function DeleteAttributeDialog({ isOpen, setIsOpen, id }: { isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; id: number }) {
  const {mutate, isPending} = useDeleteAttribute()

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => setIsOpen(false),
    })
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Attribute</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <p>Are you sure you want to delete this attribute?</p>
        </div>
        <AlertDialogFooter>
          <Button variant={'secondary'} onClick={() => setIsOpen(false)}>Cancel</Button>

          <Button
            variant={'destructive'}
            onClick={handleDelete}
            disabled={isPending}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
