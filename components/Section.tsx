import Link from "next/link"
import Title from "./Title"
import Container from '@/components/Container'

export interface Props {
  title: string;
  href?: string;
  spacing?: "default" | "compact";
  headerSlot?: React.ReactNode;
  children?: React.ReactNode;
  [key: string]: unknown;
}

export default function Section({
  title,
  headerSlot,
  href,
  spacing = "default",
  children,
  ...props
}: Props) {
  const _spacing = spacing === "default" ? "mb-20" : "mb-10";
  const className = `w-full ${_spacing}`;

  return (
    <section className={className} {...props}>
      {title && (
        <header className='w-full mb-3'>
          <Container>
            <Title>
              {href ? (
                <Link
                  href={href}
                  className="group inline-flex items-center gap-1"
                >
                  <span className="link">{title}</span>
                  <span className="mt-0.5 -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </span>
                </Link>
              ) : (
                title
              )}
            </Title>

            {headerSlot}
          </Container>
        </header>
      )}

      <Container>
        {children}
      </Container>
    </section>
  )
}
