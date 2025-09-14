export interface ListProps {
  children: React.ReactNode;
  variant?: "default" | "compact";
}

export default function List({ children, variant = "default" }: ListProps) {
  const _variant = variant === "default" ? "gap-8" : "gap-4";
  const className = `grid ${_variant}`;

  return <ul className={className}>{children}</ul>;
}
