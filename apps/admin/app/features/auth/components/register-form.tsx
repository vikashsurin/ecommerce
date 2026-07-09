"use client"

import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { useForm } from "@tanstack/react-form-nextjs"
import { useRegister } from "../queries"
import { registerSchema } from "../schema"
import { useState } from "react"

export default function RegisterForm() {
  const [countryCode, setCountryCode] = useState("+91")
  const { mutate: register, isError, reset } = useRegister()
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      register({ ...value, phone: `${countryCode}${value.phone}` })
      reset()
    },
  })
  return (
    <>
      <form
        className="max-w-md"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field name="name">
            {(field) => {
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
                      className="rounded-sm"
                      placeholder="Enter Name"
                    />
                  </Field>
                </>
              )
            }}
          </form.Field>
          <form.Field name="email">
            {(field) => {
              return (
                <>
                  <Field>
                    <FieldLabel>Email</FieldLabel>
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
                      className="rounded-sm"
                      placeholder="Enter email"
                    />
                  </Field>
                </>
              )
            }}
          </form.Field>
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <>
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        if (isError) reset()
                        field.handleChange(e.target.value)
                      }}
                      className="rounded-sm"
                      placeholder="*****"
                    />
                  </Field>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </>
              )
            }}
          </form.Field>
          <form.Field name="confirmPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <>
                  <Field>
                    <FieldLabel>Confirm Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        if (isError) reset()
                        field.handleChange(e.target.value)
                      }}
                      className="rounded-sm"
                      placeholder="*****"
                    />
                  </Field>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </>
              )
            }}
          </form.Field>
          <form.Field name="phone">
            {(field) => {
              return (
                <>
                  <Field>
                    <FieldLabel>Phone</FieldLabel>
                    <div className="flex gap-2">
                      <Select
                        value={countryCode}
                        onValueChange={(value) => {
                          if (isError) reset()
                          if (value) setCountryCode(value)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="+91" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="+91">+91</SelectItem>
                            <SelectItem value="+92">+92</SelectItem>
                            <SelectItem value="+93">+93</SelectItem>
                            <SelectItem value="+94">+94</SelectItem>
                            <SelectItem value="+95">+95</SelectItem>
                            <SelectItem value="+96">+96</SelectItem>
                            <SelectItem value="+97">+97</SelectItem>
                            <SelectItem value="+98">+98</SelectItem>
                            <SelectItem value="+99">+99</SelectItem>
                            <SelectItem value="+100">+100</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>

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
                        className="rounded-sm"
                        placeholder="Enter Phone"
                      />
                    </div>
                  </Field>
                </>
              )
            }}
          </form.Field>
          <Button type="submit"> Register</Button>
        </FieldGroup>
        <div className="mt-8 flex justify-center gap-1 text-sm">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-800 hover:underline">
            Login
          </a>
        </div>
      </form>
    </>
  )
}
