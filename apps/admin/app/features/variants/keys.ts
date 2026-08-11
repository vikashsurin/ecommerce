export const variantKeys = {
  all: ["variants"] as const,
  detail: (id: number | string) => [...variantKeys.all, "detail", String(id)] as const,
};

// useVariant
// queryKey: variantKeys.detail(id ?? ""),
  // invalidation
  // queryClient.invalidateQueries({ queryKey: variantKeys.detail(variables.variantId) });
