import { useForm } from "@tanstack/react-form-nextjs";
import { Button } from "@workspace/ui/components/button";
import { DialogClose, DialogFooter } from "@workspace/ui/components/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { toast } from "sonner";
import { useCreateCategory } from "../queries";
import { Category, createCategorySchema } from "../schema";

export default function CreateCategoryForm({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { mutate: createCategory, reset, isPending, isError } = useCreateCategory()
  const form = useForm({
    defaultValues: {
      name: '',
      specificationsLabel: '',
    },
    onSubmit: async ({ value }) => {
      createCategory(value, {
        onSuccess: (data: any) => {
          const category = data as Category
          reset()
          form.reset()
          setIsOpen(false)
          toast.success(<p> Category <b>{category.name}</b> created successfully</p>)
        },
      })
    },

    validators: {
      onSubmit: createCategorySchema
    }

  })
  return (
    <form
      className="max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit()
      }}>
      <FieldGroup>
        <form.Field name='name'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      if (isError) reset()
                      field.handleChange(e.target.value)
                    }}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </>
            )
          }}
        </form.Field>
        <form.Field name='specificationsLabel'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Specifications Label</FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      if (isError) reset()
                      field.handleChange(e.target.value)
                    }}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              </>
            )
          }}
        </form.Field>
      </FieldGroup>
      <DialogFooter className="mt-4">
        <DialogClose>Cancel</DialogClose>
        <Button type="submit">
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </DialogFooter>
    </form>
  )
}
