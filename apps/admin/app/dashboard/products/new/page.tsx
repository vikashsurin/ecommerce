'use client'
import CreateProductForm from "@/app/features/products/components/create-product-form";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-bold font-serif text-4xl">New Product</h1>
      <CreateProductForm />
    </div>
  );
}
