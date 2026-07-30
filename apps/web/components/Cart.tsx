"use client"

import { useCart } from "@/app/features/cart/queries"
import { Loader, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function Cart() {
  const { data: cart, isLoading } = useCart()


  return (
    <>
      <Link href="/cart">
        <div className="flex items-center gap-1 border-2 border-amber-700 rounded-md p-1 ">
          {isLoading ? (
            <span className="p-1">
              <Loader size={"16"} className="animate-spin text-amber-700" />
            </span>
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full text-amber-700 p-1">
              {cart?.items?.length ?? 0}
            </div>
          )}
          <ShoppingBag className=""  />
        </div>
      </Link>
    </>
  )
}
