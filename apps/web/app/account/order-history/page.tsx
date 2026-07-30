"use client";

import { getOrders } from "@/app/features/orders/api";
import { useQuery } from "@tanstack/react-query";

export default function OrderHistoryPage() {
  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  console.log({ orders });
  return (
    <div>
      <h1>Order History</h1>
    </div>
  );
}
