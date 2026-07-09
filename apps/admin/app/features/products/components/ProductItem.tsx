import { Product } from "../schema";

export default function ProductItem({ product }:{ product: Product}) {
  return (
    <a href={`/dashboard/products/${product.id}`}>
      <div className="h-50 w-50 border p-2">
        <h5>{product.name}</h5>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    </a>
  )
}
