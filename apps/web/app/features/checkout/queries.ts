import { queryClient } from "@/lib";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCheckoutSession, getCurrentCheckoutSession } from "./api";
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

export const useCheckoutSession = () => {
  return useQuery({
    queryKey: ["checkout-session"],
    queryFn: async () => {
      return await getCurrentCheckoutSession();
    },
  });
}
