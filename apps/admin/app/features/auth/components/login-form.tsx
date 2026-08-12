"use client";

import { useForm } from "@tanstack/react-form-nextjs";
import { Button } from "@workspace/ui/components/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { useLogin } from "../queries";
import { loginSchema } from "../schema";

export default function LoginForm() {
  const { mutate: login, isError, reset } = useLogin();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      login(value);
      reset();
    },
  });

  return (
    <form
      className="max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="email">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
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
                      if (isError) reset();
                      field.handleChange(e.target.value);
                    }}
                    className="rounded-sm"
                    placeholder="Enter email"
                  />
                </Field>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </>
            );
          }}
        </form.Field>

        <form.Field name="password">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
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
                      if (isError) reset();
                      field.handleChange(e.target.value);
                    }}
                    className="rounded-sm"
                    placeholder="Enter email"
                  />

                  <div className="flex">
                    <a
                      href="/auth/forgot-password"
                      className="ml-auto w-max text-sm text-blue-800 hover:underline"
                    >
                      forgot password?
                    </a>
                  </div>
                </Field>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </>
            );
          }}
        </form.Field>
        <Button type="submit">Login</Button>
      </FieldGroup>

      <div className="mt-8 flex justify-center gap-1 text-sm">
        Don&apos;t have an account?{" "}
        <a href="/auth/register" className="text-blue-800 hover:underline">
          Create an account
        </a>
      </div>
    </form>
  );
}
