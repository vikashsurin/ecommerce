import AddVariantForm from "@/app/features/products/variants/components/create-variant-form"
import { Button } from "@workspace/ui/components/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import { useState } from "react"
import { Plus } from "lucide-react"

export default function AddVariantDrawer({
  categoryId,
}: {
  categoryId: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      swipeDirection="right"
      disablePointerDismissal
    >
      <DrawerTrigger
        className={"w-max"}
        render={
          <Button>
            <Plus />
            Add Variant
          </Button>
        }
      ></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add Variant</DrawerTitle>
          <DrawerDescription>
            Add a new variant for the product
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4">
          <AddVariantForm categoryId={categoryId} setIsOpen={setIsOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
