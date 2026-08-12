"use client";

import RegisterForm from "../../features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <section className="m-8">
      <h1 className="">Register</h1>
      <p className="text-amber-800 bg-amber-100 w-max px-1 py-0.5 rounded text-xs mb-4">
        Register as admin / maintainer
      </p>
      <RegisterForm />
    </section>
  );
}
