"use client"

import { AddCategory } from "./add-category-dialog"
import CategoryTable from "./categories-table"


export default function CategoriesPage() {
  return (
    <div className="p-4">
      <h1 className="flex items-center gap-2">
        Categories
      </h1>
      <AddCategory />
      <CategoryTable />
    </div>
  )
}
