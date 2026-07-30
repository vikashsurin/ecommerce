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
    <section className="lg:m-10 md:m-4 sm:m-2 xs:m-1">
      <div>
        <h1>Order History</h1>
        <p className="text-sm text-gray-400 mb-4">See all the orders from past</p>
      </div>
      {isLoading && <p>Loading...</p>}

      <div className="flex flex-col gap-10">
        {orders && orders.map((order) => (
          <div key={order.id}>
            <div className="font-semibold text-xs text-gray-400 py-1 flex gap-4">
              <p>Order ID: {order.id}</p>
              <p>Total:{order.total}</p>
              <p>Order Date: {formatDate(order.createdAt)}</p>
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
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4  w-full">
      {items && items.map((item) => (
        <div key={crypto.randomUUID()} className="border rounded p-2">
          <Image
            src='https://picsum.photos/400/400'
            alt={item.name}
            width={100}
            height={100}
            className="h-50 w-full ounded-t-xs bg-cover object-cover"
          />

          <div className="mt-2">
            <div>
              <p data-name className="font-semibold text-sm">{item.name}</p>
              <span className="text-xs text-gray-400">{item.sku}</span>
            </div>
            <div>
              {Object.entries(item.attributes as unknown as { [key: string]: unknown }[]).map(([key, value]: [string, unknown]) => (
                <div key={key} className="text-sm">
                  <div data-attributes>
                    <span className="font-semibold text-xs text-gray-400">
                      {key} : {' '}
                    </span>
                    <span className="font-semibold text-gray-600 text-xs">
                      {value as string}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex mt-2 justify-between items-center border-t">
              <span className="text-xs">Price:</span>
              <span className="font-semibold">{item.unitPrice}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
