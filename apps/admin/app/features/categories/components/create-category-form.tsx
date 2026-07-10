import { useForm } from "@tanstack/react-form-nextjs";
import { Button } from "@workspace/ui/components/button";
import { DialogClose, DialogFooter } from "@workspace/ui/components/dialog";
import { Field, FieldGroup, FieldLabel, FieldError } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { z } from "zod";
import { useCreateCategory } from "../queries";

export default function CreateCategoryForm({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const {mutate: createCategory, reset,isPending, isError} = useCreateCategory()
  const form = useForm({
    defaultValues: {
      name: '',
    },
    onSubmit: async ({value}) => {
      createCategory(value, {
        onSuccess: () => {
          reset()
          form.reset()
          setIsOpen(false)
        },
      })
    },
    validators: {
      onSubmit: z.object({
        name: z.string().min(3),
      })
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
      </FieldGroup>
      <DialogFooter>
        <DialogClose>Cancel</DialogClose>
        <Button type="submit">
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </DialogFooter>
    </form>
  )
}
