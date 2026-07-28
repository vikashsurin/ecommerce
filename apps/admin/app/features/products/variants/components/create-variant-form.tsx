import { type Attribute } from "@/app/features/categories/schema"
import { useForm } from "@tanstack/react-form-nextjs"
import { Button } from "@workspace/ui/components/button"
import { DrawerClose, DrawerFooter } from "@workspace/ui/components/drawer"
import {
  Field,
  FieldDescription,
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
import { Info } from "lucide-react"
import { useParams } from "next/navigation"
import { useGetAttributes } from "../../../categories/queries"
import { useCreateProductVariant, useGenerateSku } from "../queries"
import { createProductVariantSchema } from "../schema"

function getOptionsList(options: any): string[] {
  if (!Array.isArray(options)) return []
  return options.filter((opt): opt is string => typeof opt === "string")
}


export default function AddVariantForm({
  categoryId,
  setIsOpen,
}: {
  categoryId: number
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { productId } = useParams<{ productId: string }>()
  const { data: categoryAttributes, isLoading } = useGetAttributes(categoryId)

  if (isLoading) return <div>Loading attributes...</div>
  if (!categoryAttributes)
    return <div>No attributes found for this category.</div>

  return (
    <VariantFormFields
      categoryAttributes={categoryAttributes}
      productId={Number(productId)}
      setIsOpen={setIsOpen}
    />
  )
}



function VariantFormFields({
  categoryAttributes,
  productId,
  setIsOpen,
}: {
  categoryAttributes: Attribute[]
  productId: number
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const {
    mutate: createProductVariant,
    isError,
    reset,
  } = useCreateProductVariant()
  const form = useForm({
    defaultValues: {
      productId,
      sku: "",
      price: 0,
      salePrice: 0,
      stock: 0,
      // Record<attributeKey, value> — NOT the schema array itself
      attributes: categoryAttributes.reduce<Record<string, string>>(
        (acc, attr) => {
          acc[attr.key] = ""
          return acc
        },
        {}
      ),
    },
    onSubmit: async ({ value }) => {
      createProductVariant(value)
      reset()
      form.reset()
      setIsOpen(false)
      console.log(value)
    },
    validators: {
      onSubmit: createProductVariantSchema,
    },
  })

  const { mutate: generateSku, isPending: isGenerateSkuPending } = useGenerateSku()

  function handleGenerateSku() {
    generateSku(
      { productId, attributes: form.state.values.attributes },
      {
        onSuccess: (sku) => {
          form.setFieldValue("sku", sku)
        },
      }
    )
  }

  return (
    <form
      className=""
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        {categoryAttributes
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((attribute) => (
            <form.Field
              key={attribute.id}
              name={`attributes.${attribute.key}` as const}
              validators={{
                // TODO: Review this section
                onChange: attribute.required
                  ? ({ value }) =>
                    !value ? `${attribute.label} is required` : undefined
                  : undefined,
              }}
            >
              {(field) => {
                const options = getOptionsList(attribute.options)
                return (
                  <div className="flex flex-col gap-1">
                    <label htmlFor={field.name}>{attribute.label}</label>

                    {attribute.inputType === "select" ? (
                      <Select
                        value={field.state.value}
                        onValueChange={(val) => field.handleChange(val)}
                      >
                        <SelectTrigger id={field.name}>
                          <SelectValue
                            placeholder={`Select ${attribute.label}`}
                          />
                        </SelectTrigger>
                        <SelectContent>

                          {options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={field.name}
                        type={
                          attribute.inputType === "number" ? "number" : "text"
                        }
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    )}

                    {field.state.meta.errors.length > 0 && (
                      <span className="text-sm text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </span>
                    )}
                  </div>
                )
              }
              }
            </form.Field>
          ))}

        <form.Field name="price">
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
                      field.handleChange(e.target.value)
                    }}
                    placeholder="Price"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </>
            )
          }}
        </form.Field>
        <form.Field name="salePrice">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Sale Price</FieldLabel>
                  <Input
                    type="number"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                    placeholder="Price"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </>
            )
          }}
        </form.Field>

        <form.Field name="stock">
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
                      field.handleChange(e.target.value)
                    }}
                    placeholder="Stock/Quantity"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </>
            )
          }}
        </form.Field>

        <form.Field name="sku">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Sku</FieldLabel>
                  <FieldDescription className="flex gap-2">
                    <Info size={32} />
                    You can customize the SKU or automatically generate one
                    based on the selected attributes.
                  </FieldDescription>
                  <div className="flex gap-2">
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
                      placeholder="NAME-COLOR-SIZE"
                    />
                    <Button variant="secondary" onClick={handleGenerateSku}>
                      {isGenerateSkuPending ? 'Generating...' : 'Generate'}
                    </Button>
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </>
            )
          }}
        </form.Field>
      </FieldGroup>

      <DrawerFooter className="mt-4 p-0">
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "Saving..." : "Save Variant"}
            </Button>
          )}
        </form.Subscribe>
        <DrawerClose>Cancel</DrawerClose>
      </DrawerFooter>
    </form>
  )
}
