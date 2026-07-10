'use client'

import CreateCategoryForm from "@/app/features/categories/components/create-category-form"
import { useGetCategories } from "@/app/features/categories/queries"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog"

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu"

import { Button } from "@workspace/ui/components/button"
import { ArrowRight, Ellipsis } from 'lucide-react'

import Link from "next/link"
import { useState } from "react"

export default function CategoriesPage() {

  return (
    <div>
      <h1>Categories</h1>
      <AddCategory />
      <CategoryTable />
    </div>
  )
}


function AddCategory() {
  const [isOpen, setIsOpen] = useState(false)
  return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger render={<Button size={'sm'}>Add Category</Button>}></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Add a new category to the store.
            </DialogDescription>
          </DialogHeader>
          <CreateCategoryForm setIsOpen={setIsOpen} />
        </DialogContent>
      </Dialog>
  )
}


function CategoryTable() {
  const { data: categories, isLoading } = useGetCategories()
  if (isLoading) return <p>Loading...</p>

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories && categories.map((category) => (
          <TableRow key={category.id}>
            <TableHead>{category.id}</TableHead>
            <TableHead>{category.name}</TableHead>
            <TableHead>{category.slug}</TableHead>
            <TableHead>
              <DropdownMenu>
              <DropdownMenuTrigger>
                  <Ellipsis size={16} className="ml-4"/>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link
                      href={`/dashboard/products/categories/${category.id}/attributes`}
                      className="flex gap-2 items-center justify-between"
                    >
                      Attributes
                      <ArrowRight />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </TableHead>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
