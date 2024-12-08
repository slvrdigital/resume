import Providers from "@/providers/Providers";
import Image from "next/image";
import Link from "next/link";
import meta from "@/public/data/meta.json";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="header flex items-center gap-4">
        <Link href="/">
          <Image
            width={64}
            height={64}
            src={`${process.env.BASE_PATH ?? ""}/avatar.jpeg`}
            alt={meta.site_name}
            className="rounded-full active:scale-95"
            loading="lazy"
          />
        </Link>

        <h1 className="inline-grid">
          <Link href="/" className="color-300">
            {meta.site_name}
          </Link>
          <span className="color-100">{meta.position}</span>
        </h1>
      </header>
      <main className="main">
        <Providers>{children}</Providers>
      </main>
      <footer className="footer">
        <p className="color-100 text-right">
          Copyright © {new Date().getFullYear()} &mdash; {meta.site_name}
        </p>
      </footer>
    </>
  );
}
