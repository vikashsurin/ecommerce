'use client'

import { AddAttributesForm } from "@/app/features/categories/components/add-attributes-form"
import { useGetAttributes } from "@/app/features/categories/queries"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import { useParams } from "next/navigation"

export default function AttributesPage() {

 return (
    <>
      <div>
       <h1>Attributes Page</h1>
       <AttributesTable />
       <AddAttributesForm />
      </div>
    </>
  )
}

function AttributesTable() {
  const { id } = useParams<{id:string}>()
  const { data, isLoading, isError } = useGetAttributes(Number(id))

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading attributes.</p>


  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead>Id</TableHead>
          <TableHead>Key</TableHead>
          <TableHead>Label</TableHead>
          <TableHead>Input Type</TableHead>
          <TableHead>Options</TableHead>
          <TableHead>Required</TableHead>
          <TableHead>SkuAbbr</TableHead>
          <TableHead>Sort Order</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data && data.map((attr) =>
          <TableRow key={attr.id}>
            <TableCell>{attr.id}</TableCell>
            <TableCell>{attr.key}</TableCell>
            <TableCell>{attr.label}</TableCell>
            <TableCell>{attr.inputType}</TableCell>
            <TableCell>{attr.options?.toString()}</TableCell>
            <TableCell>{attr.required?.toString()}</TableCell>
            <TableCell>{attr.skuAbbreviation?.toString()}</TableCell>
            <TableCell>{attr.sortOrder}</TableCell>
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
