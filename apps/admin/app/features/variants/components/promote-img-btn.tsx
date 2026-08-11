import { promoteImage } from "@/app/features/variants/api";
import { queryClient } from "@/lib";
import { IconStar } from "@tabler/icons-react";
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

export function PromoteImage({ id }: { id: number }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutate } = useMutation({
    mutationFn: promoteImage,
    onSuccess: (data: any) => {
      console.log({data})
      if (data) {
        queryClient.invalidateQueries({
          queryKey: variantKeys.detail(data.variantId),
        });
        toast.info("Image promoted");
      }
      setIsOpen(false);
    },
  });
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        render={
          <Button size="icon-xs" className="absolute top-0 p-0 left-0 mt-2 ml-2 rounded">
            <IconStar size={12} />
          </Button>
        }
      >
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate(id)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
