import { useUploadProductImages } from "@/app/features/products/queries";
import { formatFileSize } from "@/utils";
import { useForm } from "@tanstack/react-form-nextjs";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import React, { useState } from "react";
import { toast } from "sonner";

export function UploadImageModal(
  { trigger, productId, multiple = false, onSuccess }: {
    trigger: string;
    productId: string;
    multiple: boolean;
    variantId?: string | undefined;
    onSuccess?: () => void;
  },
) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen} disablePointerDismissal>
        <DialogTrigger className={"bg-white px-1 text-xs rounded shadow-sm"}>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Upload Image
            </DialogTitle>
            <DialogDescription>
              Supported formats png, jpg, jpeg
            </DialogDescription>
          </DialogHeader>
          <UploadImageButton setIsOpen={setIsOpen} productId={productId} multiple={multiple} onSuccess={onSuccess} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export function UploadImageButton(
  { setIsOpen, productId, multiple = false, onSuccess }: {
    setIsOpen: (arg0: boolean) => void;
    productId: string;
    multiple: boolean;
    variantId?: string | undefined;
    onSuccess?: () => void;
  },
) {
  const { mutate: uploadImage } = useUploadProductImages();

  const form = useForm({
    defaultValues: { images: [] as File[] },

    onSubmit: async ({ value }) => {
      console.log(value);
      const images = value.images;

      if (images.length <= 0) {
        toast.error("Please select an Image first!");
        return;
      }

      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      const invalidFile = images.find((file) => !allowedTypes.includes(file.type));
      if (invalidFile) {
        toast.error(`"${invalidFile.name}" isn't a supported format`);
        return;
      }

      uploadImage({ productId: Number(productId), files: value.images }, {
        onSuccess: () => {
          onSuccess?.();
        },
      });
    },
  });

  console.log(form.getFieldValue("images")[0]);
  const [_, setIsDragging] = useState(false);

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
    console.log("1");
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    console.log("2");
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const files = Array.from(event.dataTransfer.files) as File[];

      form.setFieldValue("images", Array.from(files));
      event.dataTransfer.clearData();
    }
    console.log("3");
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex  flex-col "
    >
      <div
        data-drag-box
        className={`border  flex items-center justify-center border-dashed h-40 border-gray-500 rounded `}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex">
          Drag and drop image here or
          <label
            htmlFor="file-input"
            className="pl-1 underline text-blue-600"
          >
            browse files
          </label>
        </div>
        <input
          id="file-input"
          type="file"
          multiple={multiple}
          onChange={(e) => {
            const files = e.target.files;
            console.log("files", files);
            if (files) {
              form.setFieldValue("images", Array.from(files));
            }
          }}
          className="border tex-xs p-0"
          hidden
        />
      </div>
      <form.Subscribe
        selector={(state) => state.values.images}
        children={(values) =>
          values.map((file, index) => {
            const isImage = file.type.startsWith("image/");
            return (
              <div key={index}>
                {isImage
                  ? (
                    <div className="flex p-2 bg-gray-100 rounded-lg border gap-2 mt-2 ">
                      <div>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="h-20 rounded "
                        />
                      </div>
                      <div>
                        <p className="text-xs">
                          filename :
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatFileSize(file)}
                        </p>
                      </div>
                    </div>
                  )
                  : <div className="text-red-500">Invalid file type</div>}
              </div>
            );
          })}
      />
      <div className="flex justify-end mt-1">
        <Button
          variant="ghost"
          size="xs"
          className={"w-max"}
          onClick={() => {
            form.reset();
            setIsOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="default"
          size="xs"
          type="submit"
          className={"w-max"}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
