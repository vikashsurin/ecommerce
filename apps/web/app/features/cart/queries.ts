import { queryClient } from "@/lib";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { addToCart, deleteCartItem, getCart, updateCartItemQuantity } from "./api";
import { type AddToCartSchema } from "./schema";

export const useAddToCart = () => {
  return useMutation({
    mutationFn: async (data: AddToCartSchema) => {
      return await addToCart(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      })
      toast.success("Product added to cart");
    },
  });
}


export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      return await getCart();
    },
  });
}


export const useUpdateCartItemQuantity = () => {
  return useMutation({
    mutationFn: async (data: {
      cartItemId: number;
      quantity: number
    }) => {
      return await updateCartItemQuantity(data.cartItemId, data.quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      })
      toast.success("Cart item quantity updated");
    },
  });
}



export const useDeleteCartItem = () => {
  return useMutation({
    mutationFn: async (cartItemId: number) => {
      return await deleteCartItem(cartItemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      })
      toast.success("Cart item deleted");
    },
  });
}
