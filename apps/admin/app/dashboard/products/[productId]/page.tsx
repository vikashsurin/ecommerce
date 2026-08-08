"use client";

import { UploadImageButton } from "@/app/features/products/components/upload-product-img-btn";
import { useProduct } from "@/app/features/products/queries";
import { useProductImage } from "@/app/features/products/queries";
import { IconPencil } from "@tabler/icons-react";
import { Button } from "@workspace/ui/components/button";
import { useParams } from "next/navigation";
import { useState } from "react";
import AddVariantDrawer from "./add-variant-drawer";
import ProductVariantsTable from "./product-variants-table";

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading } = useProduct(productId);
  const [showChange, setShowChange] = useState(false);

  console.log({ showChange });

  const { data: productImage, isLoading: isLoadingImage } = useProductImage(productId);

  if (isLoading || isLoadingImage) return <div>Loading...</div>;
  return (
    <>
      <div className="m-4">
        <section className="flex justify-between gap-4">
          <div className="flex flex-col gap-4">
            {product && (
              <div className="flex w-max gap-4">
                <div
                  data-image
                  className="flex relative flex-col h-50 w-50 items-center justify-center border"
                >
                  {productImage && productImage.url !== null || showChange
                    ? (
                      <div className="">
                        <img
                          src={productImage.url}
                          placeholder="Product Image"
                          className="h-50 w-50 object-cover"
                        />

                        <button
                          onClick={() => setShowChange(true)}
                          className="absolute right-0 flex items-center m-1 bottom-0 bg-gray-300 p-1 "
                        >
                          <IconPencil size={12} />
                          <span className="text-xs">Edit</span>
                        </button>
                      </div>
                    )
                    : (
                      <div className="flex flex-col justify-center items-center">
                        <UploadImageButton productId={productId} multiple={false} />
                      </div>
                    )}
                  {showChange
                    && (
                      <div className="absolute bg-gray-200 rounded">
                        <UploadImageButton productId={productId} multiple={false} />
                        <Button
                          onClick={() => setShowChange(false)}
                          size={"xs"}
                          variant="ghost"
                          className={"flex mb-1 justify-self-center"}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                </div>
                <div>
                  <div className="flex flex-col gap-3 rounded-md">
                    <h3>{product.name}</h3>
                    <div>
                      <h6 className="text-sm font-semibold">Description:</h6>
                      <p className="rounded border p-1 px-2 text-sm text-gray-600">
                        {product.description}
                      </p>
                    </div>

                    <div>
                      <h6 className="text-sm font-semibold">Slug:</h6>
                      <p className="rounded border p-1 px-2 text-sm text-gray-600">
                        {product.slug}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex-col gap-4 p-4">
            {product && product.categoryId ? <AddVariantDrawer categoryId={product.categoryId} /> : <div></div>}
          </div>
        </section>
        <ProductVariantsTable />
      </div>
    </>
  );
}
