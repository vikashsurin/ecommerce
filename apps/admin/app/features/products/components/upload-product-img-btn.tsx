import { useUploadProductImages } from "@/app/features/products/queries";
import { formatFileSize } from "@/utils";
import { IconPhotoUp } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form-nextjs";
import { Button } from "@workspace/ui/components/button";
import { toast } from "sonner";

export function UploadImageButton(
  { productId, multiple = false }: { productId: string; multiple: boolean; variantId?: string | undefined },
) {
  const { mutate: uploadImage } = useUploadProductImages();

  const form = useForm({
    defaultValues: { images: [] as File[] },

    onSubmit: async ({ value }) => {
      if (value.images.length <= 0) {
        toast.error("Please select an Image first!");
        return;
      }

      uploadImage({ productId: Number(productId), files: value.images }, {});
    },
  });

  console.log(form.getFieldValue("images")[0]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex  w-40 flex-col justify-center items-center gap-1"
    >
      <div>
        <label htmlFor="file-input" className="flex flex-col  items-center border border-dashed p-2 rounded">
          <IconPhotoUp className="text-gray-400 " size={16} />
          <form.Subscribe selector={(state) => state.values.images}>
            {(images) =>
              images.length <= 0
                ? <span className="text-xs underline text-blue-800">Choose Image</span>
                : (
                  <div className="text-xs mt-2  justify-center">
                    <p className="text-wrap wrap text-ellipsis max-w-40 truncate">
                      {images[0]?.name}
                    </p>
                    <p className="text-gray-400 flex justify-self-center ">
                      {formatFileSize(images[0])}
                    </p>
                  </div>
                )}
          </form.Subscribe>
        </label>
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

      <Button variant="ghost" size="xs" type="submit" className={"w-max"}>
        Upload
      </Button>
    </form>
  );
}
