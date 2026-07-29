"use client"

import { useCart } from "@/app/features/cart/queries"
import { Loader, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function Cart() {
  const { data: cart, isLoading } = useCart()

  if (isLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    )
  }

  return (
    <>
      <Link href="/cart">
        <div className="flex items-center gap-2">
          {isLoading ? (
            <Loader size={"16"} className="animate-spin" />
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-50 p-1">
              {cart?.items?.length ?? 0}
            </div>
          )}
          <ShoppingBag />
        </div>
      </Link>
    </>
  )
}
