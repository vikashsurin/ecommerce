import { useForm } from "@tanstack/react-form-nextjs"

export default function CreateVariantPage() {
  const form = useForm({
    defaultValues: {
      productId: 0,
      price: 0,
      stock: 0,
      attributes: {},
      
    }
  })
  return (
    <>
      <div>
        <h1>Create Variant</h1>
        
      </div>
    </>
  )
}