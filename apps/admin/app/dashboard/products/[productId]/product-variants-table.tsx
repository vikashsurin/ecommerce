import { useProductVariants } from "@/app/features/products/queries"
import { Badge } from "@workspace/ui/components/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@workspace/ui/components/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { Ellipsis, Link, ArrowRight } from "lucide-react"
import { useParams } from "next/dist/client/components/navigation"

export default function ProductVariantsTable() {
  const { productId } = useParams<{ productId: string }>()

  const { data: productVariants, isLoading } = useProductVariants(
    Number(productId)
  )

  console.log({ productVariants })
  if (isLoading) return <div>Loading product variants...</div>

  return (
    <>
      <h3>Product variants</h3>
      <div>
        {productVariants && productVariants.length > 0 ? (
          <Table className="w-full border-collapse border border-gray-300">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Attributes</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Sale Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productVariants.map((variant) => (
                <TableRow key={variant.id}>
                  <TableCell>{variant.id}</TableCell>
                  <TableCell>{variant.sku}</TableCell>
                  <TableCell>
                    {Object.entries(variant.attributes).map(
                      ([key, value]: [string, any]) => (
                        <div key={key} className="my-1">
                          <span className="inline-block w-10">{key}:</span>
                          <span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                            {value}
                          </span>
                        </div>
                      )
                    )}
                  </TableCell>
                  <TableCell>{variant.price}</TableCell>
                  <TableCell>{variant.salePrice}</TableCell>
                  <TableCell>{variant.stock}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Ellipsis size={16} className="ml-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
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
        ) : (
          <p>No variants found for this product.</p>
        )}
      </div>
    </>
  )
}
