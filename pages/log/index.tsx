import { getStoryblokApi } from "@storyblok/react";
import { PageConfig } from "next";
import Link from "next/link";
import meta from "@/public/data/meta.json";
import Section from "@/components/Section";
import Title from "@/components/Title";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import RichText from "@/storyblok/RichText";
import { commonStoryblokParams } from "@/config/storyblokParams";

export const config: PageConfig = {
  unstable_runtimeJS: false,
};

export default function PostsIndex({
  posts,
}: {
  posts: Record<string, any>[];
}) {
  return (
    <>
      <Section title="Log">
        <List>
          {posts.map((post, index) => (
            <ListItem key={index}>
              <Title tag="h3">
                <Link href={`/log/${post.slug}`}>{post.name}</Link>
              </Title>
              <RichText content={post.content.description} />
            </ListItem>
          ))}
        </List>
      </Section>
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
  const sbParams = commonStoryblokParams({
    starts_with: "posts",
    per_page: 10,
  });

  const storyblokApi = getStoryblokApi();
  return await storyblokApi.get(`cdn/stories`, sbParams, { cache: "no-store" });
}
