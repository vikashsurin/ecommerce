'use client'

import { useGetAttributes, useGetCategory } from "@/app/features/categories/queries"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import { Ellipsis } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"
import { AddAttributeDrawer } from "./add-attibute-drawer"
import { DeleteAttributeDialog } from "./delete-attribute-dialog"
import { EditAttributesDrawer } from "./update-attribute-drawer"

export default function AttributesPage() {
  const { categoryId } = useParams<{ categoryId: string }>()

  const { data: category, isLoading } = useGetCategory(Number(categoryId))

 return (
    <>
      <div className="m-4">
       <h1>{isLoading ? "Loading..." : category?.name}</h1>
       <p className="mb-4 text-gray-600">These are the list of attributes for the category {category?.name}</p>
       <AddAttributeDrawer />
       <AttributesTable />
      </div>
    </>
  )
}

function AttributesTable() {
  const [isOpen, setIsOpen] = useState(false)

  const [isDelete, setIsDelete] = useState(false)

  const { categoryId } = useParams<{ categoryId: string }>()
  const { data, isLoading, isError } = useGetAttributes(Number(categoryId))

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading attributes.</p>


  return (
    <Table className="mt-6 border-collapse border border-gray-300">
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead>Id</TableHead>
          <TableHead>CategoryId</TableHead>
          <TableHead>Key</TableHead>
          <TableHead>Label</TableHead>
          <TableHead>Input Type</TableHead>
          <TableHead>Options</TableHead>
          <TableHead>Required</TableHead>
          <TableHead>SkuAbbr</TableHead>
          <TableHead>Sort Order</TableHead>
          <TableHead>Actions</TableHead>

        </TableRow>
      </TableHeader>

      <TableBody>
        {data && data.map((attr) =>
          <TableRow key={attr.id}>
           <TableCell>{attr.id}</TableCell>
           <TableCell>{attr.categoryId}</TableCell>
            <TableCell>{attr.key}</TableCell>
            <TableCell>{attr.label}</TableCell>
            <TableCell>{attr.inputType}</TableCell>
            <TableCell>{attr.options?.toString()}</TableCell>
            <TableCell>{attr.required?.toString()}</TableCell>
            <TableCell>{attr.skuAbbreviation?.toString()}</TableCell>
            <TableCell>{attr.sortOrder}</TableCell>
            <TableCell>
              <DropdownMenu>
              <DropdownMenuTrigger>
                  <Ellipsis size={16} className="ml-4"/>
              </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault()
                      setIsOpen(true)
                    }}>Edit</DropdownMenuItem>


                  <DropdownMenuItem variant="destructive"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsDelete(true)
                    }}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </TableCell>
              <EditAttributesDrawer
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              id={attr.id}
              data={attr} />

            <DeleteAttributeDialog
              isOpen={isDelete}
              setIsOpen={setIsDelete}
              id={attr.id} />
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}


// <div>
//   <div className="flex gap-2 items-center ">
//     <h5>Key:</h5>
//     <span>{attr.key}</span>
//   </div>

//   <div className="flex gap-2 items-center ">
//     <h5>Label:</h5>
//     <span>{attr.label}</span>
//   </div>

//   <div className="flex gap-2 items-center ">
//     <h5>Input Type:</h5>
//     <span>{attr.inputType}</span>
//   </div>

//   <div className="flex gap-2 items-center ">
//     <h5>Options:</h5>
//     <span>{attr.options?.toString()}</span>
//   </div>

//   <div className="flex gap-2 items-center ">
//     <h5>Required:</h5>
//     <span>{attr.required?.toString()}</span>
//   </div>

//   <div className="flex gap-2 items-center ">
//     <h5>Sku Abbreviation:</h5>
//     <span>{attr.skuAbbreviation?.toString()}</span>
//   </div>

//   <div className="flex gap-2 items-center ">
//     <h5>Sort Order:</h5>
//     <span>{attr.sortOrder}</span>
//   </div>

// </div>
