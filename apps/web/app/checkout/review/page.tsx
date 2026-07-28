'use client'

import { RazorpayButton } from "@/app/features/checkout/components/payment-btn";
import { useCheckoutSession } from "@/app/features/checkout/queries";
import { calculatePercentageDiscount } from "@/lib/percentage";
import Image from "next/image";

export default function ReviewOrderPage() {

  const { data: checkoutSession, isLoading } = useCheckoutSession()

  const items = checkoutSession?.items

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="m-4">
      <h2>Review Order</h2>
      <section>
        {items && items?.map((item) => (
          <div key={item.variantId} className="grid grid-cols-12 border  gap-4 p-2">

            <Image
              src={'https://picsum.photos/200'}
              alt={item.name}
              width={150}
              height={150}
              className="col-span-1"
            />

            <div className="col-span-9">
              <div>
                <p className="text-xl font-bold">{item.name}</p>
                <p className="font-medium text-sm text-gray-400">{item.sku}</p>
              </div>

              <div className="mt-4">
                {Object.entries(JSON.parse(item.attributes) as Record<string, string>).map(([key, value]) => (
                  <div key={key} className="text-sm text-gray-600">
                    <span className="font-bold ">
                      {key} : {' '}
                    </span>
                    <span>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            <div className="col-span-2 justify-self-end">
              <div className="flex items-start gap-2">
                <span className="text-gray-400 text-sm pt-2" >
                  {item.quantity} x
                </span>

                {item.originalUnitPrice > item.unitPrice ?
                  <div className="flex flex-col items-end gap-2">
                    <div>
                      <span className="text-sm font-semibold bg-red-600 p-1 line-through mr-2 rounded text-white">
                        {calculatePercentageDiscount(item.originalUnitPrice, item.unitPrice)} %
                      </span>

                      <span className="font-bold text-2xl">
                        {item.unitPrice}
                      </span>

                    </div>
                    <div>
                      <span className="text-sm text-gray-400">MRP: <span className="text-xs font-medium text-gray-600 line-through">{item.originalUnitPrice}</span></span>
                    </div>
                  </div>
                  :
                  <span>{item.unitPrice}</span>
                }
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="flex justify-end py-4 px-2">
        <div className="flex justify-between items-end gap-4 w-sm p-2" >
          <span className="font-bold text-2xl">Total:</span>
          <span className="text-3xl font-bold">{checkoutSession?.total}</span>
        </div>
      </section>

      <section className="flex justify-end py-2">
        <RazorpayButton
          checkoutSessionId={checkoutSession?.id}
          userName={'vikas'}
          userEmail={'vikas@gmail.com'}
          userPhone={'7304985028934'}
        />
      </section>

    </div>
  )
}
