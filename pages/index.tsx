import { PageConfig } from "next";
import xp from "@/public/data/xp.json";
import refs from "@/public/data/refs.json";
import meta from "@/public/data/meta.json";
import about from "@/public/data/about.json";
import projects from "@/public/data/projects.json";
import Image from "next/image";

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
          {xp.map((post, index) => (
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

      <section className="section">
        <h2 className="section__title">Side Projects</h2>
        <ul className="work">
          {projects.map((post, index) => (
            <li key={index} className="work__item">
              <div className="work__body">
                <h3
                  className="work__company-name"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                ></h3>
                <ul className="work__details">
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
      meta: {
        title: "Index",
        description: meta.site_description,
      },
    },
  };
}
