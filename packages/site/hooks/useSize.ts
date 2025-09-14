export type Size = "base" | "lg" | "xl";

export function useSize(size: Size) {
  const variants: Record<Size, string> = {
    base: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
  };

  return variants[size];
}
