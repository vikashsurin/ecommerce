
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@workspace/ui/components/drawer";

import { UpdateAttributesForm } from "@/app/features/categories/components/update-attributes.form";

export function EditAttributesDrawer({
  isOpen,
  setIsOpen,
  data,
  id,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any
  id: number;
}) {

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} swipeDirection="right" disablePointerDismissal>
      <DrawerContent className={'p-2'}>
        <DrawerHeader>
          <DrawerTitle>Edit Attribute</DrawerTitle>
        </DrawerHeader>
        <div className={'p-4'}>
        <UpdateAttributesForm setIsOpen={setIsOpen}  data={data} id={id} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
