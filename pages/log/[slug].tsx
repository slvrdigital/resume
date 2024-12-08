import { getStoryblokApi, StoryblokComponent } from "@storyblok/react";
import { GetStaticPaths, PageConfig } from "next";
import meta from "@/public/data/meta.json";
import { useStoryblok } from "@/hooks/useStoryblok";

export const config: PageConfig = {
  unstable_runtimeJS: false,
};

export default function Post({ story }: { story: Record<string, any> }) {
  return (
    <StoryblokComponent
      id={story?.content._uid}
      name={story?.name}
      blok={story?.content}
    />
  );
}

// This function gets called at build time
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { data } = await fetchData(params.slug);
  const story = data?.story;

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
  const { data } = await fetchAllPosts(); // not all but 100
  const paths =
    data.stories.map((story: { slug: string }) => `/log/${story.slug}`) || [];

  return {
    paths,
    fallback: true,
  };
};

export async function fetchData(slug: string) {
  const sbParams = useStoryblok({
    resolve_relations: ["post.tags"],
  }).params;

  const storyblokApi = getStoryblokApi();
  return await storyblokApi.get(`cdn/stories/posts/${slug}`, sbParams, {
    cache: "no-store",
  });
}

export async function fetchAllPosts() {
  const sbParams = useStoryblok({
    starts_with: "posts",
    per_page: 100,
  }).params;

  const storyblokApi = getStoryblokApi();
  return await storyblokApi.get(`cdn/stories`, sbParams, { cache: "no-store" });
}
