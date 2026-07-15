import { useGetCategories } from "@/app/features/categories/queries"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import { CategoryActionsMenu } from "./category-action-menu"

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
                <CategoryActionsMenu category={category} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
    </>
)}
