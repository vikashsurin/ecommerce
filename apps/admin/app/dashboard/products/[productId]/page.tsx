"use client";

import { UploadImageModal } from "@/app/features/products/components/upload-product-img-btn";
import { useProduct } from "@/app/features/products/queries";
import { useProductImage } from "@/app/features/products/queries";
import { useParams } from "next/navigation";
import { useState } from "react";
import AddVariantDrawer from "./add-variant-drawer";
import ProductVariantsTable from "./product-variants-table";

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading } = useProduct(productId);
  const [showEdit, setShowEdit] = useState(false);

  const { data: productImage, isLoading: isLoadingImage } = useProductImage(productId);
  const imgUrl = productImage ? productImage.url : null;

  function onSuccess() {
    setShowEdit(false);
  }

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
                  {imgUrl !== null
                    ? (
                      <div
                        onMouseOverCapture={() => setShowEdit(true)}
                        onMouseOutCapture={() => setShowEdit(false)}
                      >
                        <img
                          src={imgUrl}
                          alt="Product Image"
                          className="h-50 w-50 object-cover"
                        />
                        <div className="absolute right-1 bottom-1">
                          {showEdit
                            && (
                              <UploadImageModal
                                trigger="edit"
                                productId={productId}
                                multiple={false}
                                onSuccess={onSuccess}
                              />
                            )}
                        </div>
                      </div>
                    )
                    : (
                      <div className="flex flex-col justify-center items-center">
                        <UploadImageModal
                          trigger="Upload image"
                          productId={productId}
                          multiple={false}
                          onSuccess={onSuccess}
                        />
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
