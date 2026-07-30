import { Product } from "../features/products/schema"
import Image from "next/image"

export default function ProductItem({ product }: { product: Product }) {
  return (
      <a href={`/products/${product.id}`}
        className="p-2 border">
          <div>
              <Image
                  src='https://picsum.photos/200/250'
                  width={200}
                  height={250}
                  alt={product.name}
              />
              
      </div>
      <div className="border p-2">
        <h6>{product.name}</h6>
        <p>{product.description}</p>
      </div>
    </a>
  )
}
