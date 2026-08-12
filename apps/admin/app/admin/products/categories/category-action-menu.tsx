import { Category } from "@/app/features/categories/schema"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu"
import { ArrowRight, Ellipsis } from "lucide-react"
import Link from "next/link"
import { DeleteCategoryDialog } from "./delete-category-form-dialog"

import { useState } from "react"

export function CategoryActionsMenu({ category }: { category: Category }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className="ml-4 flex items-center gap-2">
            <Ellipsis size={16} />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link
              href={`/admin/products/categories/${category.id}/attributes`}
              className="flex items-center justify-between gap-2"
            >
              Attributes
              <ArrowRight />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              setOpen(true)
            }}>
              Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteCategoryDialog
        open={open}
        setOpen={setOpen}
        category={category} />
    </>
  )
}
