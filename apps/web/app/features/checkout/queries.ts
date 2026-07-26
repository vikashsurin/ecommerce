import { queryClient } from "@/lib";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCheckoutSession, getRazorpayOrder } from "./api";
import { type CreateCheckoutSessionSchema } from "./schema";




export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: (data: CreateCheckoutSessionSchema) => {
      return createCheckoutSession(data)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["checkout-session"] });
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export const useRazorPayOrder = (sessionId: number) => {
  return useQuery({
    queryKey: ["razorpay-order", sessionId],
    queryFn: async () => {
      return await getRazorpayOrder(sessionId);
    },
  });
}
