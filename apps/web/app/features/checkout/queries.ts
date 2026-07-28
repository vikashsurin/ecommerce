import { useQuery } from "@tanstack/react-query";
import {
  getCheckoutSession
} from "./api";


export const useCheckoutSession = (cartId: number | undefined | null) => {
  return useQuery({
    queryKey: ["checkout-session", cartId],
    queryFn: async () => {
      return await getCheckoutSession(cartId as number);
    },
    enabled: !!cartId,
  });
}

export const useRazorpayOrder = (sessionId: number) => {
  return useQuery({
    queryKey: ["razorpay-order", sessionId],
    queryFn: async () => {
      return await getCheckoutSession(sessionId);
    },
  });
}
