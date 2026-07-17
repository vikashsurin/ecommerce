'use client'

import { useProducts } from '@/app/features/products/queries'
import Item from '../features/products/components/Item'

export default function ProductsPage() {
  const { data, isLoading, isError, isSuccess } = useProducts()

  if (isLoading) return <div>Loading...</div>


  if (isError) return <div>There was an error</div>


  if (isSuccess) {
    return (
      <>
        <div>
          <h1>Products</h1>
          <div className='flex flex-wrap gap-2'>
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
