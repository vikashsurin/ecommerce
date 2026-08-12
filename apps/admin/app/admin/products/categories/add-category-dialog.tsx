
import CreateCategoryForm from '@/app/features/categories/components/create-category-form'
import { Button } from '@workspace/ui/components/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@workspace/ui/components/dialog'
import { Plus } from 'lucide-react'
import { useState } from 'react'


export function AddCategory() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className={'mt-4'}
        render={
          <Button>
            <Plus />  Add Category
          </Button>
        } />
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Add Category</DialogTitle>
          <DialogDescription>
            Add a new category to the store.
          </DialogDescription>
        </DialogHeader>
        <CreateCategoryForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
