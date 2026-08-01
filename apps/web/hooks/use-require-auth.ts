import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSession } from "./useSession"

//  To be used in routes where auth user is necessary
export function useRequireAuth() {
  const { data: user, isLoading } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/checkout")
    }
  }, [user, isLoading, router])

  return { user, isLoading }
}
