"use client";

import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { rpcClient } from "@/lib"; // your Hono RPC client
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type Props = {
  checkoutSessionId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
};

export function RazorpayButton({
  checkoutSessionId,
  userName,
  userEmail,
  userPhone,
}: Props) {
  const [scriptLoaded, setScriptLoaded] = useState(false);


  const createOrder = useMutation({
    mutationFn: async () => {
      const res = await rpcClient.api.checkout["create-order"].$post({
        json: { checkoutSessionId },
      });
      console.log({ res })
      if (!res.ok) throw new Error("Failed to create order");
      const { data } = await res.json();
      return data;
    },
  });

  const verifyPayment = useMutation({
    mutationFn: async (payload: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      checkoutSessionId: string;
    }) => {
      const res = await rpcClient.api.checkout["verify-payment"].$post({
        json: payload,
      });
      if (!res.ok) throw new Error("Payment verification failed");
      return res.json();
    },
  });

  const handlePay = useCallback(async () => {
    if (!scriptLoaded) return;

    const order = await createOrder.mutateAsync();

    const rzp = new window.Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Your Store",
      description: "Order payment",
      order_id: order.razorpayOrderId,
      prefill: {
        name: userName,
        email: userEmail,
        contact: userPhone,
      },
      handler: async (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => {
        await verifyPayment.mutateAsync({
          ...response,
          checkoutSessionId,
        });
        // redirect to order confirmation page here
      },
      modal: {
        ondismiss: () => {
          // optional: mark session back to "pending" or log abandonment
        },
      },
      theme: { color: "#111111" },
    });

    rzp.on("payment.failed", (resp: any) => {
      console.error("Payment failed", resp.error);
      // surface toast, keep session in awaiting_payment for retry
    });

    rzp.open();
  }, [scriptLoaded, createOrder, verifyPayment, checkoutSessionId, userName, userEmail, userPhone]);

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setScriptLoaded(true)}
        strategy="lazyOnload"
      />
      <button
        onClick={handlePay}
        disabled={!scriptLoaded || createOrder.isPending}
        className="w-full rounded-md bg-black px-4 py-3 text-white disabled:opacity-50"
      >
        {createOrder.isPending ? "Preparing payment..." : "Pay now"}
      </button>
    </>
  );
}
