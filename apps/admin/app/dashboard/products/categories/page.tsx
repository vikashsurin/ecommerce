"use client"

import CreateCategoryForm from "@/app/features/categories/components/create-category-form"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Plus, SlidersHorizontal } from "lucide-react"
import { useState } from "react"
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

function AddCategory() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
      className={'mt-4'}
        render={
          <Button>
            <Plus />  Add Category
          </Button>
        }/>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Add Category</DialogTitle>
          <DialogDescription>
            Add a new category to the store.
          </DialogDescription>
        </DialogHeader>
        <CreateCategoryForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
