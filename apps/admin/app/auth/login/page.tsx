"use client";

import LoginForm from "../../features/auth/components/login-form";

export default function LoginPage() {
  return (
    <section className="m-8">
      <h1>Login</h1>
      <p className="text-amber-800 bg-amber-100 w-max px-1 py-0.5 rounded text-xs mb-4">For admins only</p>
      <LoginForm />
    </section>
  );
}
