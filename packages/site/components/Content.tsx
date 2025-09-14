interface Props {
  className?: string;
  html: string;
}

export default function Content({
  html,
  className = "content text-lg font-serif leading-relaxed",
}: Props) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}
