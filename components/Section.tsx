import Title from "./Title";

export interface Props {
  title: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
  [key: string]: unknown;
}

export default function Section({ title, action, children, ...props }: Props) {
  return (
    <section className="w-full mb-16" {...props}>
      <header className="w-full flex items-center gap-8 justify-between">
        <Title className="mb-6">{title}</Title>
        {action}
      </header>
      {children}
    </section>
  );
}
