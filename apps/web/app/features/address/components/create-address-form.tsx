'use client'

import { useForm } from '@tanstack/react-form-nextjs'
import { Button } from '@workspace/ui/components/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@workspace/ui/components/field'
import { Input } from '@workspace/ui/components/input'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useCreateAddress } from '../queries'
import { createAddressSchema } from '../schema'

export default function CreateAddressForm() {

  const { mutate: saveAddress, reset } = useCreateAddress()

  const form = useForm({
    defaultValues: {
      address: '',
      street: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
      type: ''
    },
    onSubmit: async ({ value }) => {
      saveAddress(value, {
        onSuccess: () => {
          form.reset()
          reset()
          toast.success("Address created successfully")
        },
        onError: () => {
          toast.error("Failed to create address")
        },
      })
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
        <form.Field name='landmark'>
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
        </form.Field>
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
        <Button type='submit'>Save Address</Button>
      </FieldGroup>
    </form>
  )
}
