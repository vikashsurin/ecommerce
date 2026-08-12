import { deleteVariantImage } from "@/app/features/variants/api";
import { queryClient } from "@/lib";
import { IconInfoTriangle, IconTrash } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog";
import { Button } from "@workspace/ui/components/button";
import { useState } from "react";
import { toast } from "sonner";
import { variantKeys } from "../keys";

export function DeleteVariantImgBtn({ id }: { id: number }) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteImage, isPending } = useMutation({
    mutationFn: deleteVariantImage,
    onSuccess: (data) => {
      if (data) {
        console.log({ data });
        queryClient.invalidateQueries({
          queryKey: variantKeys.detail(data.variantId),
        });
        toast.info("Deleted 1 image");
        setIsOpen(false);
      }
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        render={
          <Button size="icon-xs" className="absolute top-0 p-0 right-0 mt-2 mr-2 rounded">
            <IconTrash size={12} />
          </Button>
        }
      >
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete image?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account from our servers.
            <span className="flex text-xs items-center mt-2 gap-2 bg-amber-200 p-1 px-2 rounded">
              <IconInfoTriangle size={14} />
              <i>When an image is primary it cannot be deleted.</i>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteImage(id)}>{isPending ? "Deleting" : "Delete"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
