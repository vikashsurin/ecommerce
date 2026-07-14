import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"

import { Button } from "@workspace/ui/components/button"

import { AddAttributesForm } from "@/app/features/categories/components/add-attributes-form"
import { Plus } from "lucide-react"
import { useState } from "react"

export function AddAttributeDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      swipeDirection="right"
      disablePointerDismissal
    >
      <DrawerTrigger
        render={
          <Button>
            <Plus />
            Add Attribute
          </Button>
        }
      ></DrawerTrigger>
      <DrawerContent className={"p-2"}>
        <DrawerHeader>
          <DrawerTitle>Add Attribute</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <AddAttributesForm setIsOpen={setIsOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
