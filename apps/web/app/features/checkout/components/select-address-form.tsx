import { useAddresses } from "@/app/features/address/queries";
import { useCart } from "@/app/features/cart/queries";
import { useForm } from "@tanstack/react-form-nextjs";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import {
  RadioGroup,
  RadioGroupItem
} from "@workspace/ui/components/radio-group";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateCheckoutSession } from "../queries";

export default function SelectAddressForm() {
  const { data: addresses, isLoading: isAddressesLoading } = useAddresses()
  const { data: cart, isLoading: isCartLoading } = useCart()
  const { mutate: createCheckoutSession } = useCreateCheckoutSession()
  const [manualAddressId, setManualAddressId] = useState<number | undefined>(undefined)

  const selectedAddressId = manualAddressId ?? (addresses?.[0]?.id ?? 0)

  const router = useRouter()
  const isLoading = isAddressesLoading || isCartLoading


  console.log({ selectedAddressId })
  console.log({ cart })

  const form = useForm({
    defaultValues: {
      cartId: cart?.id ?? 0,
      addressId: Number(selectedAddressId),
      paymentMethod: 'card' as const,
      total: cart?.total ?? 0,
      status: "address_selected" as const
    },
    onSubmit: async ({ value }) => {

      console.log('submitting form')

      createCheckoutSession(value, {
        onSuccess: () => {
          toast.success('Address selected')
          router.push(`/checkout/review`)
        },
      })
    },
  })


  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!cart) {
    toast.error('Cart is empty')
    router.replace('/')
    return null
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      form.handleSubmit(e)
    }}>

      <div className="mt-6">
        <RadioGroup
          className={'flex flex-col gap-6'}
          value={selectedAddressId}
          onValueChange={(value) => setManualAddressId(value)}
        >
          {addresses && addresses.map((address) => (
            <div key={address.id} className="flex  flex-col">
              <div className="flex gap-4">
                <RadioGroupItem
                  key={address.id}
                  value={address.id}
                  id={String(address.id)}
                />
                <div className="flex flex-col gap-3 items-start">
                  <Label
                    htmlFor={String(address.id)}
                    className='flex flex-col gap-2 items-start'
                  >
                    <h6>{address.type}</h6>
                    <div className="flex gap-2">
                      <span>{address.street},</span>
                      <span>{address.city},</span>
                      <span>{address.state},</span>
                      <span>{address.zip},</span>
                      <span>{address.country},</span>
                    </div>
                  </Label>

                  <Link href={`/checkout/address/edit/${address.id}`}>
                    <button className="text-blue-800 text-sm underline">Edit address</button>
                  </Link>
                </div>
              </div>

            </div>
          ))
          }
        </RadioGroup >
        <div className="flex items-center mt-4 gap-4">

          <Button type="submit">Continue <ArrowRight /></Button>
        </div>
      </div >
    </form>
  )
}
