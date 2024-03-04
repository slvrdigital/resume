import { PageConfig } from "next";
import xp from "@/public/data/xp.json";
import refs from "@/public/data/refs.json";
import meta from "@/public/data/meta.json";
import about from "@/public/data/about.json";
import projects from "@/public/data/projects.json";

export const config: PageConfig = {
  unstable_runtimeJS: false,
};

export default function Index() {
  return (
    <>
      <section className="section">
        <h2 className="section__title">About</h2>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: about.content }}
        />
      </section>

      <section className="section">
        <h2 className="section__title">Contact</h2>
        <ul className="list list--tight">
          {refs.map((item, index) => (
            <li key={index} className="list__item ref">
              <p className="ref__label">
                {item.label}
              </p>
              <p className="ref-info">
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
        <ul className="list">
          {xp.map((post, index) => (
            <li key={index} className="list__item job">
              <p className="job__date">{post.years.join(" — ")}</p>
              <div className="job-body">
                <h3
                  className="title"
                  dangerouslySetInnerHTML={{ __html: post.company_name }}
                ></h3>
                <p className="subtitle">{post.details}</p>
                <div className="content">
                  <p>{post.summary}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 className="section__title">Side Projects</h2>
        <ul className="list">
          {projects.map((post, index) => (
            <li key={index} className="list__item project">
              <h3
                className="title"
                dangerouslySetInnerHTML={{ __html: post.title }}
              ></h3>
              <ul className="project-tags">
                {post.tags.map((tag: string, tagIndex: number) => (
                  <li key={tagIndex} className="tag">
                    <span>{tag}</span>
                  </li>
                ))}
              </ul>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: post.description }}
              />
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
      meta: {
        title: "Index",
        description: meta.site_description,
      },
    },
  };
}
