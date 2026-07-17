import { useForm } from "@tanstack/react-form-nextjs"
import { Button } from "@workspace/ui/components/button"
import { ButtonGroup } from "@workspace/ui/components/button-group"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useUpdateProductVariant } from "../queries"
import { updateProductVariantSchema } from "../schema"

export function UpdateSalePriceForm({
  productId,
  variantId,
  price,
  salePrice,
  setOpen,
}: {
  productId: number
  variantId: number
  price: number
  salePrice: number | null
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { mutate, isPending } = useUpdateProductVariant()

  const [onSale, setOnSale] = useState<boolean>(
    salePrice !== undefined ? salePrice !== null : false
  )

  const form = useForm({
    defaultValues: {
      price: price!,
      salePrice: salePrice ?? null,
    },
    validators: {
      onSubmit: updateProductVariantSchema,
    },

    onSubmit: async ({ value }) => {
      mutate(
        { data: value, productId, variantId },
        {
          onSuccess: () => {
            setOpen(false)
            toast.success("Sale Price Updated")
          },
          onError: () => {
            toast.error("Error updating sale price")
          },
        }
      )
    },
  })



  useEffect(() => {
    if (!onSale) {
      form.setFieldValue("salePrice", null)
    } else {
      form.setFieldValue("salePrice", salePrice ?? price - 1)
    }
  }, [onSale, form, salePrice, price])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <form.Field name="salePrice">
        {(field) => {
          return (
            <>
              <div className="my-2 flex items-start justify-between gap-2 rounded-lg border p-2">
                <div>
                  <label htmlFor="onSale" className="font-semibold">
                    On Sale
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    Check the box to change the sale price.
                  </p>
                </div>

                <Checkbox
                  id="onSale"
                  name="on-sale-checkbox"
                  checked={onSale}
                  onCheckedChange={setOnSale}
                />
              </div>

              <ButtonGroup aria-disabled={!onSale}>
                <Button
                  disabled={!onSale}
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault()
                    field.handleChange(Number(field.state.value) - 1)
                  }}
                >
                  <Minus size={16} />
                </Button>
                <Input
                  disabled={!onSale}
                  value={field.state.value !== null ? field.state.value : ""}
                  onChange={(e) =>
                    field.handleChange(
                      onSale === false ? null : Number(e.target.value)
                    )
                  }
                />
                <Button
                  disabled={!onSale}
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault()
                    const current = Number(field.state.value)
                    if (current >= price) {
                      toast.error('Sale Price cannot be greater than the regular price')
                      return
                    } else {
                    field.handleChange(current + 1)
                    }
                  }}
                >
                  <Plus size={16} />
                </Button>
              </ButtonGroup>
            </>
          )
        }}
      </form.Field>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="ghost" size={"xs"} onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" variant="default" size={"xs"}>
          {onSale ? "Update" : onSale === false? "Remove sale": isPending ? "Updating..." : ''}
        </Button>
      </div>
    </form>
  )
}
