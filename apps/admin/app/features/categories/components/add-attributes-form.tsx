import { useForm } from "@tanstack/react-form-nextjs";
import { Button } from "@workspace/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { TagInput } from "@workspace/ui/components/TagInput";
import { useCreateAttribute } from "../queries";
import { CreateAttributeSchema } from "../schema";


export function AddAttributesForm() {

  const {mutate, isPending, isError, reset} = useCreateAttribute()

  const boolOptions = [
    {id: 1, label: "Yes", value: true},
    {id: 2, label: "No", value: false}
  ]

  const inputTypes = [
    {
      label: 'Text',
      value: 'text',
    },
    {
      label: 'Number',
      value: 'number',
    },
    {
      label: 'Select',
      value: 'select',
    },
  ]

  const form = useForm({
    defaultValues: {
      key: '',
      label: '',
      inputType: '',
      options: [] as string[],
      required:false,
      skuAbbreviation: false,
      sortOrder:0,
    },
    onSubmit: async ({value}) => {
      console.log(value)

    },
    validators: {
      onSubmit: CreateAttributeSchema
    }


  })
  return (
    <form
      className="max-w-md"
      onSubmit={
      (e) => {
        e.preventDefault()
        form.handleSubmit()
      }
    }>
      <FieldGroup>

        <form.Field name='key'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Key</FieldLabel>
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
        <form.Field name='label'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Label</FieldLabel>
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
        <form.Field name='inputType'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Input Type</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(val) => {
                      field.handleChange(val ?? '')
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select'/>
                    </SelectTrigger>

                    <SelectContent>
                      {inputTypes.map((type) => (
                        <SelectItem
                          key={type.value}
                          value={type.value}
                        >{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
            </>
          )
          }}
        </form.Field>

        {/*<form.Subscribe
        selector={(state)=>state.values.inp}
        />*/}

        <form.Subscribe
          selector={(state)=>state.values.inputType}
        >
          {(inputType) => {
            if (inputType !== 'select') return null
            return (
        <form.Field name='options'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Options</FieldLabel>
                  <TagInput
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    placeholder="Enter options"
                  />
                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
            </>
          )
          }}
        </form.Field>
            )
          }}
        </form.Subscribe>
        <form.Field name='required'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Required</FieldLabel>
                  <RadioGroup
                    name={field.name}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <div className="flex gap-4">
                    {boolOptions.map(option => {
                      return (
                        <div key={option.id} className="flex items-center  gap-2">
                          <RadioGroupItem
                          value={option.value}/>
                          <span>{option.label}</span>
                     </div>
                      )
                    })}
                    </div>
                  </RadioGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}

                </Field>
            </>
          )
          }}
        </form.Field>
        <form.Field name='skuAbbreviation'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Sku Abbreviation</FieldLabel>
                  <RadioGroup
                    name={field.name}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <div className="flex gap-4">
                    {boolOptions.map(option => {
                      return (
                        <div key={option.id} className="flex items-center  gap-2">
                          <RadioGroupItem
                          value={option.value}/>
                          <span>{option.label}</span>
                     </div>
                      )
                    })}
                    </div>
                  </RadioGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
            </>
          )
          }}
        </form.Field>
        <form.Field name='sortOrder'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <>
                <Field>
                  <FieldLabel>Sort Order</FieldLabel>
                  <Input
                    type="number"
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
        <Button type="submit">Submit</Button>
      </FieldGroup>


    </form>
  );
}
