"use client"

import { useParams } from "next/navigation"

export default function OrderConfirmationPage() {
  const params = useParams<{ orderId: string }>()

  console.log("order confirmed", params.orderId)
  return (
    <div>
      <h1>Order Confirmation</h1>
    </div>
  )
}
