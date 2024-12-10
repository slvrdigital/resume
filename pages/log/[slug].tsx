import { StoryblokComponent } from "@storyblok/react";
import { GetStaticPaths, PageConfig } from "next";
import meta from "@/public/data/meta.json";
import { fetchPost, fetchPosts } from "@/service/storyblokApi";

export const config: PageConfig = {
  unstable_runtimeJS: false,
};

export default function Post({
  story,
}: {
  story: Awaited<ReturnType<typeof fetchPost>>;
}) {
  return (
    <StoryblokComponent
      id={story?.content._uid}
      name={story?.name}
      blok={story?.content}
    />
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const story = await fetchPost(params.slug);

  return {
    props: {
      meta: {
        title: story.name,
        description: meta.site_description,
      },
      story: story ?? {},
    },
  };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const posts = await fetchPosts(); // not all but 100
  const paths =
    posts.map((story: { slug: string }) => `/log/${story.slug}`) || [];

  return {
    paths,
    fallback: true,
  };
};
