// components/require-auth.tsx
"use client";

import { useSession } from "@/hooks/useSession";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, isError } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && (isError || !user)) {
      router.replace(`/login?redirectTo=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, isError, user, router, pathname]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return null; // redirect in-flight, no flash

  return <>{children}</>;
}
