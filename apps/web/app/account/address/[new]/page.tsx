'use client'

import CreateOrUpdateAddressForm from "@/app/features/address/components/create-or-update-address-form";
import { useRouter } from 'next/navigation'

export default function NewAddressPage() {

  const router = useRouter()
  return (
    <>
      <section className="m-8">
        <header>
          <h1>Add New Address</h1>
        </header>
        <div>
          <CreateOrUpdateAddressForm callbackAction={() => router.push('/account/address')}/>
        </div>
      </section>
    </>
  )
}
