export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="site">
        <header className="header">
          <p className="color-300">Yevhenii Kshevitskyi</p>
          <p className="color-100">Front-end engineer</p>
          <p className="color-100">Amsterdam, The Netherlands</p>
        </header>
        <main className="main">{children}</main>
        <footer className="footer">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo
            debitis labore a aspernatur veritatis ipsam amet accusantium
            temporibus doloremque adipisci vero nisi incidunt assumenda
            laboriosam consequatur natus, sunt impedit eligendi.
          </p>
          <p>
            Et temporibus tempore, eius ratione, deserunt sunt minus dolorem aut
            repudiandae nihil delectus aperiam provident quo aliquam molestiae
            minima! A ullam expedita rerum corrupti, provident perferendis fuga
            debitis earum. Aliquam.
          </p>
          <p>
            Earum asperiores, dolor corporis culpa eligendi magnam, ut atque
            sunt aspernatur quaerat modi a iure illo quod sit molestias
            perferendis et architecto fugit maiores quas? Ut beatae tempora
            quidem explicabo?
          </p>
        </footer>
      </div>
    </>
  );
}
