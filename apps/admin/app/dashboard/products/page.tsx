"use client"

import ProductItem from "@/app/features/products/components/product-item"
import { useProducts } from "@/app/features/products/queries"
import { Button } from "@workspace/ui/components/button"
import { ArrowRight, Plus } from "lucide-react"
import Link from "next/link"


export default function ProductsPage() {
  return (
    <div className="p-4">
      <h1>Products</h1>

      <div className="flex gap-2 mt-4">
        <Link href="/dashboard/products/categories" className="underline">
          <Button variant={'secondary'}>Categories <ArrowRight /></Button>
        </Link>
        <Link href="/dashboard/products/new" className="underline">
          <Button> <Plus />Add Products</Button>
        </Link>
      </div>

      <ProductList />
    </div>
  )
}



function ProductList() {
  const { data: products, isLoading } = useProducts()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!products || products.length === 0) {
    return <div>No products found.</div>
  }

  return (
    <>
      <div className="mt-6 flex w-screen flex-wrap gap-2">
        {products &&
          products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </div>
    </>
  )
}
