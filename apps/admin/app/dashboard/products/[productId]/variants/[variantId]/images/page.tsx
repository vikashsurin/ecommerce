"use client";

import { UploadVariantImageButton } from "@/app/features/variants/components/upload-variant-img-btn";
import { useVariant } from "@/app/features/variants/queries";
import { IconPhoto, IconPlus } from "@tabler/icons-react";
import { useParams } from "next/navigation";

export default function() {
  const { variantId } = useParams();
  const { data: variant, isLoading } = useVariant(Number(variantId));

  const images = variant ? variant.images : [];
  console.log({ images });

  if (isLoading) <div>loading...</div>;

  return (
    <section className="m-8">
      <div>
        <h1>Update Images</h1>
      </div>
      <div>
        <div className="border-2 border-gray-100  flex items-center justify-center w-50 h-60 rounded bg-gray-100 ">
          <IconPhoto className="text-gray-300" size={44} />
        </div>
      </div>

      <div className="">
        <UploadVariantImageButton isPrimary={true} variantId={Number(variantId)} />
      </div>
    </section>
  );
}
