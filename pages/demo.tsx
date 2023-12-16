import { PageConfig } from "next";
import refs from "@/public/data/refs.json";
import experience from "@/public/data/xp.json";

type Props = Record<"posts", any[]>;

export const config: PageConfig = {
  unstable_runtimeJS: false,
};

export default function Demo({ posts }: Props) {
  return (
    <>
      <section className="section">
        <h2 className="section__title">About</h2>
        <div className="content">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt
            itaque aspernatur, unde cupiditate blanditiis impedit, molestiae
            dolore, minima ipsa cumque iste distinctio excepturi. Hic id
            similique incidunt velit nihil obcaecati.
          </p>
          <p>
            Quo mollitia consequatur deleniti excepturi delectus ab, rerum magni
            animi eligendi quisquam. Quaerat at fuga enim, sed laborum
            laudantium aspernatur natus in voluptas corporis blanditiis saepe
            dolore quis maiores consectetur?
          </p>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">Contact</h2>
        <ul className="grid gap-4">
          {refs.map((item, index) => (
            <li key={index} className="grid gap-4 items-start grid-cols-3">
              <p className="color-100">{item.label}</p>
              <p className="sm:col-span-2">
                <a className="link" href={item.url} target="_blank">
                  {item.text}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 className="section__title">Work Experience</h2>
        <ul className="work">
          {posts.map((post, index) => (
            <li key={index} className="work__item">
              <p className="work__date">{post.years.join(" — ")}</p>
              <div className="work__body">
                <h3
                  className="work__company-name"
                  dangerouslySetInnerHTML={{ __html: post.company_name }}
                ></h3>
                <p className="work__details">{post.details}</p>
                <div className="content">
                  <p>{post.summary}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  return {
    props: {
      refs,
      posts: experience,
      meta: {
        title: "Demo page",
        description: "Demo page desciption",
      },
    },
  };
}
