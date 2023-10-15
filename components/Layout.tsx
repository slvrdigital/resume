export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <div className="container mx-auto">
          <p>Frank Chimero</p>
          <p>Brand & Product Designer</p>
          <p>Brooklyn, New York</p>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <div className="container mx-auto">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui,
            dolor. Dolores voluptas excepturi tempore sunt fugiat cum non, totam
            iure et quasi qui delectus voluptates eum cumque repellat amet a.
          </p>
        </div>
      </footer>
    </>
  );
}
