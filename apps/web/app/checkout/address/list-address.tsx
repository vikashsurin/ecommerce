import { useAddresses } from "@/app/features/address/queries";
import { Label } from "@workspace/ui/components/label";
import {
  RadioGroup,
  RadioGroupItem
} from "@workspace/ui/components/radio-group";
import Link from "next/link";

export default function ListAddress({ selectedAddressId, setSelectedAddressId }: {
  selectedAddressId: number | null;
  setSelectedAddressId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const { data: addresses, isLoading } = useAddresses()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="mt-6">
      <RadioGroup
        className={'flex flex-col gap-6'}
        onValueChange={(value) => setSelectedAddressId(value)}
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

    </div >
  )
}
