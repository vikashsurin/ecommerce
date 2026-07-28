
// "use client";

// import { useRazorpayScript } from "@/hooks/use-razorpay-script";
// import { useRouter } from "next/navigation";
// import { useCreateRazorpayOrder, useRazorpayOrder, useVerifyRazorpayOrder } from "../queries";

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// export function PaymentButton({ sessionId, amount, userName, userEmail, userPhone }: {
//   sessionId: string;
//   amount: number;
//   userName: string;
//   userEmail: string;
//   userPhone: string;
// }) {
//   const scriptLoaded = useRazorpayScript();
//   const router = useRouter();
//   const { mutate: createOrder } = useCreateRazorpayOrder();
//   const { data } = useRazorpayOrder(Number(sessionId));
//   const { mutate: verifyOrder } = useVerifyRazorpayOrder();

//   async function handlePay() {
//     // Step 1: ask your backend to create the Razorpay order
//     createOrder(Number(sessionId))

//     // Step 2: open Razorpay's hosted checkout — card data goes straight to Razorpay
//     const razorpay = new window.Razorpay({
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//       amount: data?.total,
//       currency: data?.currency,
//       order_id: data?.gatewayOrderId,
//       name: "Your Store Name",
//       prefill: { name: userName, email: userEmail, contact: userPhone },
//       handler: async function (response: any) {

//         // Step 3: send the returned ids to your backend for verification
//         verifyOrder({
//           sessionId: Number(sessionId),
//           razorpay_order_id: response.razorpay_order_id,
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_signature: response.razorpay_signature,
//         }, {
//           onSuccess: (data) => {
//             if (data) {
//               router.push(`/checkout/review?session=${sessionId}`);
//             }
//           },
//           onError: (error) => {
//             alert(error?.message);
//           },
//         })
//       },
//     });

//     razorpay.open();
//   }

//   return (
//     <button onClick={handlePay} disabled={!scriptLoaded}>
//       Pay ₹{amount / 100}
//     </button>
//   );
// }
