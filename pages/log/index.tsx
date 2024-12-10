import { PageConfig } from "next";
import Link from "next/link";
import meta from "@/public/data/meta.json";
import Section from "@/components/Section";
import Title from "@/components/Title";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import RichText from "@/storyblok/RichText";
import { fetchPosts } from "@/service/storyblokApi";

export const config: PageConfig = {
  unstable_runtimeJS: false,
};

export default function PostsIndex({
  posts,
}: {
  posts: Awaited<ReturnType<typeof fetchPosts>>;
}) {
  return (
    <>
      <Section title="Log">
        <List>
          {posts.map((post, index) => (
            <ListItem key={index}>
              <Title tag="h3">
                <Link href={`/log/${post.slug}`} className="link">
                  {post.name}
                </Link>
              </Title>
              <RichText content={post.content.description} />
            </ListItem>
          ))}
        </List>
      </Section>
    </>
  );
}

export async function getStaticProps() {
  const posts = await fetchPosts({ per_page: 10 });

  return {
    props: {
      meta: {
        title: "Posts",
        description: meta.site_description,
      },
      posts,
    },
  };
}
