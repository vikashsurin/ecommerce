import { useMutation } from "@tanstack/react-query"
import { Button } from "@workspace/ui/components/button"
import { ArrowRight } from "lucide-react"
import { addCheckoutItems } from "../api"

export const CheckoutItemsButton = ({ cartId }: { cartId: number }) => {
  const { mutate } = useMutation({
    mutationFn: addCheckoutItems
  })
  return (
    <>
      <Button onClick={() => mutate({ cartId })}>
        Checkout <ArrowRight />
      </Button>
    </>
  )
}
