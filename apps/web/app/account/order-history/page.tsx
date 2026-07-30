"use client";

import { getOrders } from "@/app/features/orders/api";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";

export default function OrderHistoryPage() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  console.log({ orders });
  return (
    <section className="m-10">
      <div>
        <h1>Order History</h1>
        <p className="text-sm text-gray-400 mb-4">See all the orders from past</p>
      </div>
      {isLoading && <p>Loading...</p>}

      <div className="flex flex-col gap-8">
        {orders && orders.map((order) => (
          <div key={order.id}>
            <div className="font-semibold text-sm text-gray-400 py-1 flex gap-2">
              <p>Order ID: {order.id}</p>
              <p>Total:{order.total}</p>
              <p>Date: {formatDate(order.createdAt)}</p>
            </div>
            <div className="flex gap-2">
              <OrderItems items={order.items as any[]} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function OrderItems({ items }: { items: any[] }) {
  return (
    <div className="flex gap-4">
      {items && items.map((item) => (
        <div key={item.productVariantId} className="border rounded p-2">
          <Image
            src='https://picsum.photos/200/200'
            alt={item.name}
            width={100}
            height={100}
          />

          <div className="mt-2">
            <p className="font-semibold">{item.name}</p>
            <div>
              {Object.entries(item.attributes as unknown as { [key: string]: unknown }[]).map(([key, value]: [string, unknown]) => (
                <div key={key} className="text-sm">
                  <p>
                    <span className="font-semibold text-gray-400">
                      {key} : {' '}
                    </span>
                    {value as string}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
