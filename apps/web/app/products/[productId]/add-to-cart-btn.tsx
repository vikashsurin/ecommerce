// import { IconMinus, IconPlus } from "@tabler/icons-react"
// import { useForm } from "@tanstack/react-form-nextjs"
// import { Button } from "@workspace/ui/components/button"
// import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"

// export function AddToCart() {
//   const form = useForm({
//     defaultValues: {
//       quantity: 1,
//     },
//   })
//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault()
//         form.handleSubmit()
//       }}
//     >
//       <FieldGroup>
//         <form.Field name="quantity">
//           {(field) => {
//             return (
//               <>
//                 <Field>
//                   <FieldLabel>Quantity</FieldLabel>

//                   <div className="flex">
//                     <div className="flex w-max rounded-md bg-gray-100 p-1">
//                       <button
//                         className="rounded border bg-white"
//                         onClick={() => {
//                           const value = field.state.value
//                           if (value > 1) field.setValue(value - 1)
//                         }}
//                       >
//                         <IconMinus />
//                       </button>

//                       <div className="flex w-10 items-center justify-center">
//                         <span className="">{field.state.value}</span>
//                       </div>

//                       <button
//                         className="rounded border bg-white"
//                         onClick={() => {
//                           const value = field.state.value
//                           field.setValue(value + 1)
//                         }}
//                       >
//                         <IconPlus />
//                       </button>
//                     </div>
//                   </div>
//                 </Field>
//               </>
//             )
//           }}
//         </form.Field>
//         <Button type="submit" className={"w-max"}>
//           Add to Cart
//         </Button>
//       </FieldGroup>
//     </form>
//   )
// }
//
//
"use client"

import { Button } from "@workspace/ui/components/button"
import { type ProductVariant } from "@/app/features/products/variants/schema"

export function AddToCartButton({
  variant,
  onAddToCart,
}: {
  variant: ProductVariant | undefined
  onAddToCart?: (variantId: number) => void
}) {
  const outOfStock = variant ? variant.stock <= 0 : false
  const disabled = !variant || outOfStock

  return (
    <Button
      type="button"
      disabled={disabled}
      onClick={() => variant && onAddToCart?.(variant.id)}
      className="w-full"
    >
      {outOfStock ? "Out of Stock" : "Add to Cart"}
    </Button>
  )
}
