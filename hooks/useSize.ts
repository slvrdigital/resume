export type Size = "base" | "lg" | "xl";

export function useSize(size: Size) {
  const variants: Record<Size, string> = {
    base: "text-lg sm:text-base",
    lg: "text-xl sm:text-lg",
    xl: "text-2xl sm:text-xl",
  };

  return variants[size];
}
