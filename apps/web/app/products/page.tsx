'use client'

import { useProducts } from '@/app/features/products/queries'
import Item from './ProductItem'

export default function ProductsPage() {
  const { data, isLoading, isError, isSuccess } = useProducts()

  if (isLoading) return <div>Loading...</div>


  if (isError) return <div>There was an error</div>


  if (isSuccess) {
    return (
      <>
        <div className='m-4'>
          <h1>Products</h1>
          <div className='flex flex-wrap gap-2 mt-6'>
            {data.map((product) => {
              return (
                <Item key={product.id} product={product} />
              )
            })}
          </div>
        </div>
      </>
    )
  }
}
