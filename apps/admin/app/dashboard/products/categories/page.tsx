"use client"

import { SlidersHorizontal } from "lucide-react"
import { AddCategory } from "./add-category-dialog"
import CategoryTable from "./categories-table"


export default function CategoriesPage() {
  return (
    <div className="p-4">
      <h1 className="flex items-center gap-2">
        <SlidersHorizontal  size={32} strokeWidth={3} />
        Categories
      </h1>
      <AddCategory />
      <CategoryTable />
    </div>
  )
}
