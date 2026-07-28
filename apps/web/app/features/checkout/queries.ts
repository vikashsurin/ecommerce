import { useQuery } from "@tanstack/react-query";
import {
  getCheckoutSession,
  getCurrentCheckoutSession
} from "./api";


export const useCheckoutSession = () => {
  return useQuery({
    queryKey: ["checkout-session"],
    queryFn: async () => {
      return await getCurrentCheckoutSession();
    },
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
