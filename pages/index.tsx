import { PageConfig } from "next";
import xp from "@/public/data/xp.json";
import refs from "@/public/data/refs.json";
import meta from "@/public/data/meta.json";
import about from "@/public/data/about.json";
import projects from "@/public/data/projects.json";
import Title from "@/components/Title";
import Section from "@/components/Section";
import {
  getStoryblokApi,
  ISbRichtext,
  ISbStoriesParams,
  RichTextResolver,
} from "@storyblok/react";
import Link from "next/link";

const RECENT_LOG_ENTRIES = 3;

export const config: PageConfig = {
  unstable_runtimeJS: false,
};

export default function Index({ posts }: { posts: Record<string, any>[] }) {
  const richText = (data: ISbRichtext) => new RichTextResolver().render(data);

  return (
    <>
      <Section title="About">
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: about.content }}
        />
      </Section>

      <Section title="Contact">
        <ul className="list list--tight">
          {refs.map((item, index) => (
            <li key={index} className="list__item ref">
              <p className="ref__label">{item.label}</p>
              <p className="ref-info">
                <a className="link" href={item.url} target="_blank">
                  {item.text}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Work Experience">
        <ul className="list">
          {xp.map((post, index) => (
            <li key={index} className="list__item job">
              <p className="job__date">{post.years.join(" — ")}</p>
              <div className="job-body">
                <Title
                  tag="h3"
                  dangerouslySetInnerHTML={{ __html: post.company_name }}
                />
                <p className="text-sm mb-4 color-100">{post.details}</p>
                <div className="content">
                  <p>{post.summary}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="Log"
        action={
          posts.length > RECENT_LOG_ENTRIES && (
            <Link href="/log" className="link mb-6">
              See All
            </Link>
          )
        }
      >
        <ul className="list">
          {posts.map((post, index) => (
            <li key={index} className="list__item post">
              <Title tag="h3">
                <Link href={`/log/${post.slug}`}>{post.name}</Link>
              </Title>
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: richText(post.content.description),
                }}
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Side Projects">
        <ul className="list">
          {projects.map((post, index) => (
            <li key={index} className="list__item project">
              <Title
                tag="h3"
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
              <ul className="tags">
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
      </Section>
    </>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  const { data: _posts } = await fetchData();

  return {
    props: {
      meta: {
        title: "Index",
        description: meta.site_description,
      },
      posts: _posts?.stories ?? [],
    },
  };
}

export async function fetchData() {
  const sbParams: ISbStoriesParams = {
    version: "published",
    starts_with: "posts",
    per_page: RECENT_LOG_ENTRIES,
  };

  const storyblokApi = getStoryblokApi();
  return await storyblokApi.get(`cdn/stories`, sbParams, { cache: "no-store" });
}
