import { useForm } from "@tanstack/react-form-nextjs";
import { Button } from "@workspace/ui/components/button";
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { useUploadVariantImages } from "../queries";

export function UploadVariantImageButton(
  { isPrimary, variantId }: { isPrimary: boolean; variantId?: number | undefined },
) {
  const { mutate: uploadImage } = useUploadVariantImages();

  const form = useForm({
    defaultValues: { images: [] as File[] },
    onSubmit: async ({ value }) => {
      if (!variantId) return;
      uploadImage({ variantId: Number(variantId), isPrimary: isPrimary, files: value.images }, {});
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="w-50 mt-4"
    >
      <div>
        <Input
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
      </div>
      <Button type="submit" className={"w-full mt-2"}>
        Upload
      </Button>
    </form>
  );
}
