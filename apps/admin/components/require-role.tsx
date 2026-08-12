import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RequireRole({ role, children }: { role: string; children: React.ReactNode }) {
  const { data: user, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace("/login");
    else if (user.role !== role) router.replace("/");
  }, [isLoading, user, role, router]);

  if (isLoading || !user || user.role !== role) return null;

  return <>{children}</>;
}
