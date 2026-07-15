import { useForm } from "@tanstack/react-form-nextjs"
import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { redirect } from "next/navigation"
import { useGetCategories } from "../../categories/queries"
import { useCreateProduct } from "../queries"
import { createProductSchema, Product } from "../schema"

export default function CreateProductForm() {
  const { data: categories, isLoading } = useGetCategories()

  const { mutate: createProduct, isError, reset } = useCreateProduct()

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      categoryId: 0,
      brandId: 0,
    },
    validators: {
      onSubmit: createProductSchema,
    },
    onSubmit: async ({ value }) => {
      createProduct(value, {
        onSuccess: (data: Product) => {
          const id = data?.id
          console.log("succes", data)
          reset()
          form.reset()
          redirect(`/dashboard/products/${id}`)
        },
      })
    },
  })
  return (
    <form
      className="max-w-md mt-6"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      if (isError) reset()
                      field.handleChange(e.target.value)
                    }}
                    placeholder="Product name"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </>
            )
          }}
        </form.Field>

        <form.Field name="description">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      if (isError) reset()
                      field.handleChange(e.target.value)
                    }}
                    placeholder="Product's description"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </>
            )
          }}
        </form.Field>

        <form.Field name="categoryId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldContent>
                    <FieldLabel htmlFor="form-tanstack-select-category">
                      Category
                    </FieldLabel>
                  </FieldContent>

                  <Select
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(val) => {
                      field.handleChange(val ? Number(val) : 0)
                    }}
                  >
                    <SelectTrigger
                      id="form-tanstack-select-category"
                      aria-invalid={isInvalid}
                    >
                      <SelectValue placeholder="Select">
                        {
                          categories?.find(
                            (c) => String(c.id) === String(field.state.value)
                          )?.name
                        }
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {categories &&
                        categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </>
            )
          }}
        </form.Field>
        <form.Field name="brandId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>BrandId</FieldLabel>
                  <Input
                    type="number"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      const val = e.target.value
                      if (isError) reset()
                      field.handleChange(Number(val))
                    }}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </>
            )
          }}
        </form.Field>

        <Button type="submit">Submit</Button>
      </FieldGroup>
    </form>
  )
}
