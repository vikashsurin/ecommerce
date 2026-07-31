'use client'

import { useForm } from '@tanstack/react-form-nextjs'
import { Button } from '@workspace/ui/components/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@workspace/ui/components/field'
import { Input } from '@workspace/ui/components/input'
import { toast } from 'sonner'
import { useCreateAddress, useUpdateAddress } from '../queries'
import { createAddressSchema } from '../schema'
import { useQuery } from '@tanstack/react-query'
import { getAddressById } from '../api'

export default function CreateOrUpdateAddressForm({ addressId, isUpdate = false, callbackAction }: { addressId?: any, isUpdate?: boolean, callbackAction?: () => void }) {

  const { data } = useQuery({
    queryKey: ['address', addressId],
    enabled: !!addressId,
    queryFn: () => getAddressById(addressId),
  })


  const { mutate: saveAddress, reset } = useCreateAddress()
  const { mutate: updateAddress } = useUpdateAddress()

  const form = useForm({
    defaultValues: {
      address: '',
      street: data?.street ?? '',
      city: data?.city ?? '',
      state: data?.state ?? '',
      pincode: data?.zip ?? '',
      country: data?.country ?? '',
      type: data?.type ?? ''
    },
    onSubmit: async ({ value }) => {
      if (isUpdate) {
        updateAddress({ id: addressId, data: value }, {
          onSuccess: () => {
            form.reset()
            toast.success("Address updated successfully")
            callbackAction?.()
          },
          onError: () => {
            toast.error("Failed to update address")
          },
        })
      } else {
        saveAddress(value, {
          onSuccess: () => {
            form.reset()
            reset()
            toast.success("Address created successfully")
            callbackAction?.()
          },
          onError: () => {
            toast.error("Failed to create address")
          },
        })
      }
    },
    validators: {
      onSubmit: createAddressSchema,
      onChange: ({ value }) => {
        console.log({ value })
      }
    }
  })




  return (
    <form
      className=''
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup className='w-md'>
        <form.Field name='address'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Address</FieldLabel>
                  <Input
                    type='text'
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                    className='rounded-sm'
                    placeholder='address'
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </>
            )
          }}
        </form.Field>
        <form.Field name='street'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Street, Area, Sector, Village</FieldLabel>
                  <Input
                    type='text'
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                    className='rounded-sm'
                    placeholder='street'
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </>
            )
          }}
        </form.Field>
        {/*<form.Field name='landmark'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Landmark</FieldLabel>
                  <Input
                    type='text'
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                    className='rounded-sm'
                    placeholder='landmark'
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </>
            )
          }}
        </form.Field>*/}
        <form.Field name='city'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>City</FieldLabel>
                  <Input
                    type='text'
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                    className='rounded-sm'
                    placeholder='city'
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </>
            )
          }}
        </form.Field>
        <form.Field name='pincode'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Pincode</FieldLabel>
                  <Input
                    type='text'
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                    className='rounded-sm'
                    placeholder='pincode'
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </>
            )
          }}
        </form.Field>
        <form.Field name='state'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>State</FieldLabel>
                  <Input
                    type='text'
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                    className='rounded-sm'
                    placeholder='state'
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </>
            )
          }}
        </form.Field>

        <form.Field name='country'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Country</FieldLabel>
                  <Input
                    type='text'
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                    className='rounded-sm'
                    placeholder='country'
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </>
            )
          }}
        </form.Field>

        <form.Field name='type'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Type</FieldLabel>
                  <Input
                    type='text'
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                    className='rounded-sm'
                    placeholder='type'
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </>
            )
          }}
        </form.Field>
        <Button type='submit'>
          {isUpdate ? 'Update Address' : 'Save Address'}
        </Button>
      </FieldGroup>
    </form>
  )
}
