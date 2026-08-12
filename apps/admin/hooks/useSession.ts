import { apiClient } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { parseResponse } from "hono/client";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await apiClient.api.auth.me.$get();
      const result = await parseResponse(res);
      return result.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
}
