"use client";

import { DeleteVariantImgBtn } from "@/app/features/variants/components/delete-variant-img-btn";
import { PromoteImage } from "@/app/features/variants/components/promote-img-btn";
import { UploadImageModal } from "@/app/features/variants/components/upload-variant-img-btn";
import { useVariant } from "@/app/features/variants/queries";
import { IconStar } from "@tabler/icons-react";
import { Button } from "@workspace/ui/components/button";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function() {
  const { variantId } = useParams<{ variantId: string }>();
  const { data: variant, isLoading } = useVariant(Number(variantId));
  const images = variant?.images ?? [];
  const sorted = [...images].sort((a, b) => {
    if (a.isPrimary) return -1;
    if (b.isPrimary) return 1;
    return a.sortOrder - b.sortOrder;
  });

  if (isLoading) <div>loading...</div>;
  const [showActionsFor, setShowActionsFor] = useState<number>();
  return (
    <section className="m-8">
      <div className="flex flex-wrap gap-2 ">
        {sorted.map((img) => (
          <div
            key={img.id}
            className="border relative p-1 bg-gray-200 rounded-md"
            onMouseOver={() => setShowActionsFor(img.id)}
          >
            <img src={img.url} alt={`image` + img.id} className="h-40 w-40 rounded" />

            {img.isPrimary === true && (
              <Button size="icon-xs" className="absolute top-0 p-0 left-0 mt-2 ml-2 rounded bg-amber-700">
                <IconStar size={12} />
              </Button>
            )}
            {showActionsFor === img.id && !img.isPrimary
              && (
                <div>
                  <PromoteImage id={img.id} />
                  <DeleteVariantImgBtn id={Number(img.id)} />
                </div>
              )}
          </div>
        ))}
        <div className="p-1">
          <UploadImageModal variantId={variantId} />
        </div>
      </div>
      <div>
      </div>
    </section>
  );
}
