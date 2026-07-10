import { useForm } from "@tanstack/react-form-nextjs";
import { Button } from "@workspace/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { useCreateProduct } from "../queries";
import { createProductSchema } from "../schema";

export default function CreateProductForm() {

  const { mutate: createProduct, isError, reset } = useCreateProduct()

  const form = useForm({
    defaultValues: {
      name: "",
      description: '',
      price: 0,
      salePrice: 0,
      stock: 0,
      categoryId: 0,
      brandId:0,
    },
    validators: {
      onSubmit:createProductSchema
    },
    onSubmit: async ({ value }) => {
      console.log('submit', value)
      createProduct(value)
      reset()
    }

  })
  return (
    <form
      className="max-w-md"
      onSubmit={(e) => {
      e.preventDefault();
      form.handleSubmit()
    }}>
      <FieldGroup>
        <form.Field name='name'>
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
                  />
                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
            </>
          )
          }}
        </form.Field>



        <form.Field name='description'>
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
                  />
                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
            </>
          )
          }}
        </form.Field>

        <form.Field name='price'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Price</FieldLabel>
                  <Input
                    type="number"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      if (isError) reset()
                      field.handleChange(Number(e.target.value))
                    }}
                    />
                     {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
            </>
          )
          }}
        </form.Field>

        <form.Field name='salePrice'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>SalePrice</FieldLabel>
                  <Input
                    type="number"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      if (isError) reset()
                      field.handleChange(Number(e.target.value))
                    }}
                  />
                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
            </>
          )
          }}
        </form.Field>
        <form.Field name='stock'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Stock</FieldLabel>
                  <Input
                    type="number"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      if (isError) reset()
                      field.handleChange(Number(e.target.value))
                    }}
                  />
                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
            </>
          )
          }}
        </form.Field>
        <form.Field name='categoryId'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Category Id</FieldLabel>
                  <Input
                    type="number"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      if (isError) reset()
                      field.handleChange(Number(e.target.value))
                    }}
                  />
                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
            </>
          )
          }}
        </form.Field>
        <form.Field name='brandId'>
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
                      if (isError) reset()
                      field.handleChange(Number(e.target.value))
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
  );
}
