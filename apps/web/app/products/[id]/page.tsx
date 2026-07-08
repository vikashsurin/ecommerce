"use client"

import { useParams } from "next/navigation"
import { useProduct } from "../../features/products/queries"
import { Button } from "@workspace/ui/components/button"
import { useForm } from "@tanstack/react-form-nextjs"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { IconMinus, IconPlus } from "@tabler/icons-react"

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading, isSuccess, isError } = useProduct(id)

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>Try again later</p>

  if (!isSuccess) return null
  console.log(data)

  return (
    <>
      <div className="grid grid-cols-3 gap-2 p-4">
        <div className="h-70 w-70 border p-4"></div>
        <div>
          <h3>{data.name}</h3>
          <p>{data.description}</p>
          <p>
            <span> M.R.P:</span>
            <span className="text-xl font-bold"> {data.price}</span>
          </p>
        </div>
        <div>
          <AddToCart />
        </div>
      </div>
    </>
  )
}

function AddToCart() {
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field name="quantity">
          {(field) => {
            return (
              <>
                <Field>
                  <FieldLabel>Quantity</FieldLabel>

                  <div className="flex">
                    <div className="flex w-max rounded-md bg-gray-100 p-1">
                      <button
                        className="rounded border bg-white"
                        onClick={() => {
                          const value = field.state.value
                          if (value > 1) field.setValue(value - 1)
                        }}
                      >
                        <IconMinus />
                      </button>

                      <div className="flex w-10 items-center justify-center">
                        <span className="">{field.state.value}</span>
                      </div>

                      <button
                        className="rounded border bg-white"
                        onClick={() => {
                          const value = field.state.value
                          field.setValue(value + 1)
                        }}
                      >
                        <IconPlus />
                      </button>
                    </div>
                  </div>
                </Field>
              </>
            )
          }}
        </form.Field>
        <Button type="submit" className={"w-max"}>
          Add to Cart
        </Button>
      </FieldGroup>
    </form>
  )
}
