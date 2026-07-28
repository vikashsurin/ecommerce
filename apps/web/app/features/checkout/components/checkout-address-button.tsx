import { useMutation } from "@tanstack/react-query"
import { Button } from "@workspace/ui/components/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useCart } from "../../cart/queries"
import { addCheckoutAddress } from "../api"


export const SaveAddressButton = ({ addressId }: { addressId: number }) => {

  const router = useRouter()
  const { data: cart } = useCart()

  const { mutate } = useMutation({
    mutationFn: addCheckoutAddress,
    onSuccess: () => {
      toast.success("Address saved successfully")
      router.push(`/checkout/review`)
    },
    onError: () => {
      toast.error("Failed to save address")
    },
  })

  return (
    <Button onClick={() => {
      if (!cart) throw new Error("No checkout session")
      mutate({
        addressId,
        cartId: cart?.id
      })
    }}>Save Address</Button>
  )
}
