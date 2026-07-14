import { useGetCategories } from "@/app/features/categories/queries"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import { ArrowRight, Ellipsis } from "lucide-react"
import Link from "next/link"

export default function CategoryTable() {
  const { data: categories, isLoading, isError } = useGetCategories()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error...</p>

  return (
    <>
    <Table className="mt-6">
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories &&
          categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.slug}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <span className="ml-4 flex items-center gap-2">
                      <Ellipsis size={16} />
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link
                        href={`/dashboard/products/categories/${category.id}/attributes`}
                        className="flex items-center justify-between gap-2"
                      >
                        Attributes
                        <ArrowRight />
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
    </>
)}
