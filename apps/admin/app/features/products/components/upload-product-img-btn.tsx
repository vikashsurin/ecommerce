import { useUploadProductImages } from "@/app/features/products/queries";
import { useForm } from "@tanstack/react-form-nextjs";

export function UploadImageButton({productId}: { productId: string; variantId?: string | undefined }) {
  const { mutate: uploadImage } = useUploadProductImages();

  const form = useForm({
    defaultValues: { images: [] as File[] },
    onSubmit: async ({ value }) => {
      uploadImage({ productId: Number(productId),  files: value.images }, {});
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-2 border"
    >
      <input
        type="file"
        multiple
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            form.setFieldValue("images", Array.from(files));
          }
        }}
        className="border"
      />
      <button type="submit">
        Upload
      </button>
    </form>
  );
}
