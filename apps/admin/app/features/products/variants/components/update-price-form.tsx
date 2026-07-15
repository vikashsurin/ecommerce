
import { useForm } from '@tanstack/react-form-nextjs'
import { Button } from "@workspace/ui/components/button"
import { ButtonGroup } from "@workspace/ui/components/button-group"
import { Input } from "@workspace/ui/components/input"
import { Minus, Plus } from "lucide-react"
import { useUpdateProductVariant } from '../queries'
import { updateProductVariantSchema } from '../schema'

export function UpdatePriceForm({ productId, variantId, price, setOpen }: { productId: number; variantId: number; price?: number; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

  const {mutate, isPending,} = useUpdateProductVariant()

  const form = useForm({
    defaultValues: {
      price: price!,
    },
    validators: {
      onSubmit:updateProductVariantSchema,
    },
    onSubmit: async ({ value }) => {
      console.log({ value })
      mutate({ data: value, productId, variantId }, {
        onSuccess: () => {
          setOpen(false)
        },
        onError: () => {
          alert('Failed to update stock')
        },
      })
    },
  })

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      form.handleSubmit()
    }}>
      <form.Field name="price">
        {(field) => {
          return (
            <ButtonGroup>
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  field.handleChange(field.state.value - 1);
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
                  e.preventDefault();
                  field.handleChange(field.state.value + 1);
                }}
              >
                <Plus size={16} />
              </Button>
            </ButtonGroup>
          );
        }}
      </form.Field>
      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant="ghost" size={'xs'}
          onClick={() => setOpen(false)}
        >Cancel</Button>
        <Button type="submit" variant="default" size={'xs'}>
          {isPending ? 'Updating...' : 'Update'}
        </Button>
      </div>
    </form>
  )
}
