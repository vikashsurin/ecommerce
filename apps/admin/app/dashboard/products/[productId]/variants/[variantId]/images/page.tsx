"use client";

import { UploadImageModal } from "@/app/features/variants/components/upload-variant-img-btn";
import { useVariant } from "@/app/features/variants/queries";
import { useParams } from "next/navigation";

export default function() {
  const { variantId } = useParams<{ variantId: string }>();
  const { data: variant, isLoading } = useVariant(Number(variantId));

  if (isLoading) <div>loading...</div>;

  return (
    <section className="m-8">
      <div>
        <div>
          <UploadImageModal variantId={variantId} />
        </div>
      </div>
    </section>
  );
}
