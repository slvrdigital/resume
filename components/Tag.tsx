interface Props {
  children: React.ReactNode;
  [key: string]: unknown;
}

export default function Tag({ children, ...props }: Props) {
  return (
    <span
      className="border border-gray-400 border-opacity-20 px-1.5 py-1 rounded-md text-xs font-normal focus:ring-2 dark:border-gray-50"
      tabIndex={0}
    >
      <span {...props}>{children}</span>
    </span>
  );
}
