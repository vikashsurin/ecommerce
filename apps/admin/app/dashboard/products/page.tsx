'use client'

import ProductItem from "@/app/features/products/components/ProductItem";
import { useProducts } from "@/app/features/products/queries";

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-4xl font-serif font-bold">Products</h1>

      <div className="flex gap-2">
      <a href="/dashboard/products/new" className="underline">Add Product</a>
      <a href="/dashboard/products/categories" className="underline">Categories</a>
      </div>


      <ProductList  />
    </div>
  );
}

function ProductList() {
  const { data: products, isLoading } = useProducts()
  console.log({products})
  return (
    <>
        {isLoading && <p>Loading...</p>}
      <div className="flex gap-2">
        {products && products.map((product) => (
          <ProductItem
            key={product.id}
            product={product} />

        ))}
      </div>
    </>
  )
}
