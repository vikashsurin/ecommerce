// apps/web/src/features/checkout/payment-button.tsx
"use client";

import { useRazorpayScript } from "@/hooks/use-razorpay-script";
import { useRouter } from "next/navigation";
import { useCreateRazorpayOrder, useRazorPayOrder } from "../queries";
import { apiClient } from "@/lib";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function PaymentButton({ sessionId, amount, userName, userEmail, userPhone }: {
  sessionId: string;
  amount: number;
  userName: string;
  userEmail: string;
  userPhone: string;
}) {
  const scriptLoaded = useRazorpayScript();
  const router = useRouter();
  const { mutate: createOrder } = useCreateRazorpayOrder();
  const { data } = useRazorPayOrder(Number(sessionId));
  async function handlePay() {
    // Step 1: ask your backend to create the Razorpay order
    // const res = await rpcClient.checkout[":sessionId"]["payment"]["create-order"].$post({
    //   param: { sessionId },
    // });
    // const { data } = await res.json();
    createOrder(Number(sessionId))

    // Step 2: open Razorpay's hosted checkout — card data goes straight to Razorpay
    const razorpay = new window.Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data?.amount,
      currency: data?.currency,
      order_id: data?.orderId,
      name: "Your Store Name",
      prefill: { name: userName, email: userEmail, contact: userPhone },
      handler: async function (response: any) {
        // Step 3: send the returned ids to your backend for verification
        const verifyRes = await apiClient.api.checkout[":sessionId"]["payment"]["verify"].$post({
          param: { sessionId },
          json: {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          },
        });
        const verifyData = await verifyRes.json();
        if (verifyData.data?.verified) {
          router.push(`/checkout/review?session=${sessionId}`);
        }
      },
      theme: { color: "#000000" },
    });

    razorpay.open();
  }

  return (
    <button onClick={handlePay} disabled={!scriptLoaded}>
      Pay ₹{amount / 100}
    </button>
  );
}
