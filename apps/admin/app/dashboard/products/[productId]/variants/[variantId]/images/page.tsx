"use client";

import { DeleteVariantImgBtn } from "@/app/features/variants/components/delete-variant-img-btn";
import { MarkVariantImgPrimaryBtn } from "@/app/features/variants/components/mark-variant-img-primary-btn";
import { UploadImageModal } from "@/app/features/variants/components/upload-variant-img-btn";
import { useVariant } from "@/app/features/variants/queries";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function() {
  const { variantId } = useParams<{ variantId: string }>();
  const { data: variant, isLoading } = useVariant(Number(variantId));

  if (isLoading) <div>loading...</div>;
  const [showActionsFor, setShowActionsFor] = useState<number>();
  return (
    <section className="m-8">
      <div className="flex flex-wrap gap-2 ">
        {variant && variant.images.map((img) => (
          <div
            key={img.id}
            className="border relative p-1 bg-gray-200 rounded"
            onMouseOver={() => setShowActionsFor(img.id)}
          >
            <img src={img.url} alt={`image` + img.id} className="h-40 w-40 rounded" />

            {img.isPrimary === true && (
              <p className="absolute top-2 rounded-xs left-2 text-xs bg-amber-500 px-1 py-0.5 ">primary</p>
            )}
            {showActionsFor === img.id && !img.isPrimary
              && (
                <div>
                  <MarkVariantImgPrimaryBtn />
                  <DeleteVariantImgBtn id={Number(img.id)} />
                </div>
              )}
          </div>
        ))}
      </div>
      <div>
        <div>
          <UploadImageModal variantId={variantId} />
        </div>
      </div>
    </section>
  );
}
