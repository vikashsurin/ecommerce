import { useForm } from "@tanstack/react-form-nextjs"
import { Button } from "@workspace/ui/components/button"
import { ButtonGroup } from "@workspace/ui/components/button-group"
import { Input } from "@workspace/ui/components/input"
import { Minus, Plus } from "lucide-react"
import { toast } from "sonner"
import { useUpdateProductVariant } from "../queries"
import { updateProductVariantSchema } from "../schema"

export function UpdateStockForm({
  variantId,
  stockValue,
  setOpen,
}: {
  variantId: number
  stockValue?: number
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { mutate, isPending } = useUpdateProductVariant()

  const form = useForm({
    defaultValues: {
      stock: stockValue!,
    },
    validators: {
      onSubmit: updateProductVariantSchema,
    },
    onSubmit: async ({ value }) => {
      mutate(
        { data: value,  variantId },
        {
          onSuccess: () => {
            setOpen(false)
            toast.success("Stock Quantity Updated")
          },
          onError: () => {
            toast.error("Failed to update stock")
          },
        }
      )
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <form.Field name="stock">
        {(field) => {
          return (
            <ButtonGroup>
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault()
                  field.handleChange(field.state.value - 1)
                }}
              >
                <Minus size={16} />
              </Button>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault()
                  field.handleChange(field.state.value + 1)
                }}
              >
                <Plus size={16} />
              </Button>
            </ButtonGroup>
          )
        }}
      </form.Field>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="ghost" size={"xs"} onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" variant="default" size={"xs"}>
          {isPending ? "Updating..." : "Update"}
        </Button>
      </div>
    </form>
  )
}
