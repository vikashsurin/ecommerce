'use client'

import { useProduct } from "@/app/features/products/queries";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading } = useProduct(id)

  console.log({product})
  return (
    <>
      <div>Product</div>
      {isLoading && <div>Loading...</div>}
      {product &&
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 w-max">
            <Image
            src={''}
            alt={product.name}
            className="w-70 h-70 object-cover border" />
          <div>

            <div className="flex flex-col gap-3  rounded-md">
              <h3>{product.name}</h3>
              <div>
                <h6 className="font-semibold text-sm">Description:</h6>
                <p className="text-gray-600 border p-1 px-2 rounded text-sm">{product.description}</p>
              </div>

              <div>
                <h6 className="font-semibold text-sm">
                  Slug:
                </h6>
                <p className="text-gray-600 border p-1 px-2 rounded text-sm">{product.slug}</p>
              </div>

              <div>
                <h6 className="font-semibold text-sm">
                  Price:
                </h6>
                <p className="text-gray-600 border p-1 px-2 rounded text-sm">{product.price}</p>
              </div>

            </div>
          </div>

        </div>
          <Button className={'w-max'}>Add New Variant</Button>
        </div>
      }
    </>
  )
}
