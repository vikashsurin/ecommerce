'use client'

import CreateAddressForm from '@/app/features/address/components/create-address-form'
import SelectAddressForm from '@/app/features/checkout/components/select-address-form'
import { Button } from '@workspace/ui/components/button'
import { Label } from '@workspace/ui/components/label'
import { RadioGroup, RadioGroupItem } from '@workspace/ui/components/radio-group'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AddressPage() {

  const [type, setType] = useState('existing')
  const router = useRouter()
  function handleChange(type: string) {
    console.log("type::", type)
    setType(type)
  }
  return (
    <div className='m-6'>
      <Button variant={'secondary'} onClick={() => {
        router.push('/cart')
      }} ><ArrowLeft />cart </Button>
      <h1>Address</h1>
      <RadioGroup
        defaultValue={'existing'}
        onValueChange={handleChange}
        className={'flex gap-10 my-4'}
      >
        <div className='flex gap-2'>
          <RadioGroupItem value='existing' />
          <Label>Existing Address</Label>
        </div>
        <div className='flex gap-2'>
          <RadioGroupItem value='new' />
          <Label>New Address</Label>
        </div>
      </RadioGroup>
      {type === 'new' && <CreateAddressForm />}
      {type === 'existing' &&
        <SelectAddressForm />}


      {/*<Button onClick={handleClick}>Continue <ArrowRight /></Button>*/}


    </div >
  )
}
