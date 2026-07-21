'use client'

import CreateAddressForm from '@/app/features/address/components/create-address-form'
import { Label } from '@workspace/ui/components/label'
import { RadioGroup, RadioGroupItem } from '@workspace/ui/components/radio-group'
import { useState } from 'react'

export default function AddressPage() {

  const [value, setValue] = useState('existing')


  console.log({ value })
  return (
    <div className='m-6'>
      <h1>Address</h1>
      <RadioGroup
        defaultValue={'existing'}
        onValueChange={(value) => setValue(value)}
        className={'flex gap-2 my-4'}
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
      <CreateAddressForm />
    </div>
  )
}
