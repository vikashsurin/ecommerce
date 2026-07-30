import Image from "next/image"
import { Product } from "../features/products/schema"

export default function ProductItem({ product }: { product: Product }) {
  return (
    <a href={`/products/${product.id}`}
      className="p-2 border rounded">
      <div>
        <Image
          src='https://picsum.photos/200/250'
          width={200}
          height={250}
          alt={product.name}
          className="rounded-xs"
        />

      </div>
      <div className=" p-2">
        <h6>{product.name}</h6>
        <p className="text-gray-500 text-sm">{product.description}</p>
      </div>
    </a>
  )
}
