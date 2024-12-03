export type Size = "base" | "lg" | "xl";

export function useSize(size: Size) {
  const variants: Record<Size, string> = {
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return variants[size];
}
