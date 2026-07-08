import { Product } from "../schema"

export default function Item({ product }: { product: Product }) {
  return (
    <a href={`/products/${product.id}`}>
      <div className="h-50 w-50 border p-2">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    </a>
  )
}
