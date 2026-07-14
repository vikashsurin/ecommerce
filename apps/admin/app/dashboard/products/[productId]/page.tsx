"use client"

import { useProduct } from "@/app/features/products/queries"
import Image from "next/image"
import { useParams } from "next/navigation"
import AddVariantDrawer from "./add-variant-drawer"
import ProductVariantsTable from "./product-variants-table"

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>()
  const { data: product, isLoading } = useProduct(productId)

  return (
    <>
      {isLoading && <div>Loading...</div>}

      <section className="flex justify-between gap-4">
        <div className="flex flex-col gap-4">
          {product && (
            <div className="flex w-max gap-4">
              <Image
                src={"https://picsum.photos/200"}
                width={200}
                height={200}
                alt={product.name}
                className="h-70 w-70 border object-cover"
              />
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

                  {/* <div>
                    <h6 className="text-sm font-semibold">Price:</h6>
                    <p className="rounded border p-1 px-2 text-sm text-gray-600">
                      {product.price}
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 p-4">
          {product && product.categoryId ? (
            <AddVariantDrawer categoryId={product.categoryId} />
          ) : (
            <div></div>
          )}
        </div>
      </section>

      <ProductVariantsTable />
    </>
  )
}
