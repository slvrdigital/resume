import type { ISbStoriesParams, ISbRichtext } from "@storyblok/react";
import { getStoryblokApi, RichTextResolver } from "@storyblok/react";
import { PageConfig } from "next";
import Link from "next/link";
import meta from "@/public/data/meta.json";
import Title from "@/components/Title";

export const config: PageConfig = {
  unstable_runtimeJS: false,
};

export default function PostsIndex({
  posts,
}: {
  posts: Record<string, any>[];
}) {
  const richText = (data: ISbRichtext) => new RichTextResolver().render(data);

  return (
    <>
      <section className="section">
        <h2 className="section__title">Log</h2>

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
      </section>
    </>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  const { data } = await fetchData();

  return {
    props: {
      meta: {
        title: "Posts",
        description: meta.site_description,
      },
      posts: data?.stories ?? [],
    },
  };
}

export async function fetchData() {
  const sbParams: ISbStoriesParams = {
    version: "published",
    starts_with: "posts",
    per_page: 10,
  };

  const storyblokApi = getStoryblokApi();
  return await storyblokApi.get(`cdn/stories`, sbParams, { cache: "no-store" });
}
