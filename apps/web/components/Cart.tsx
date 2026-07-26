'use client'

import { useCart } from '@/app/features/cart/queries'
import { Loader, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function Cart() {
  const { data: cart, isLoading } = useCart()


  return (
    <>
      <Link href='/cart'>
        <div className='flex items-center gap-2'>
          {isLoading ?
            <Loader size={'16'} className='animate-spin' /> :
            <div className='bg-gray-50 rounded-full p-1 flex items-center justify-center h-6 w-6'>
              {cart?.items?.length ?? 0}
            </div>}

          <ShoppingBag />
        </div>
      </Link>
    </>
  )
}
