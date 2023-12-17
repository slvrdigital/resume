import meta from "@/public/data/meta.json";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="header">
        <h1 className="grid">
          <span className="color-300">{meta.site_name}</span>
          <span className="color-100">{meta.position}</span>
          <span className="color-100">{meta.location}</span>
        </h1>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <p className="color-100 text-right">
          Copyright © {new Date().getFullYear()} &mdash; {meta.site_name}
        </p>
      </footer>
    </>
  );
}
