import { getStoryblokApi, ISbStoriesParams } from "@storyblok/react";
import { commonStoryblokParams } from "@/config/storyblokParams";
import type { ISbStoryData } from "storyblok";
import type { ResumeIndexSb, ResumePostSb } from "@/typings/storyblok";

const storyblokApi = getStoryblokApi();

export async function fetchIndexPage(): Promise<ResumeIndexSb> {
  const params = commonStoryblokParams({
    resolve_relations: ["index.jobs", "index.posts"],
  });

  const response = await storyblokApi.get(`cdn/stories/index`, params, {
    cache: "no-store",
  });

  return response?.data.story.content ?? {};
}

export async function fetchPost(
  slug: string
): Promise<ISbStoryData<ResumePostSb>> {
  const params = commonStoryblokParams({
    resolve_relations: ["post.tags"],
  });

  const response = await storyblokApi.get(`cdn/stories/posts/${slug}`, params, {
    cache: "no-store",
  });

  return response?.data.story ?? {};
}

export async function fetchPosts(
  queryParams: ISbStoriesParams = {}
): Promise<ISbStoryData<ResumePostSb>[]> {
  const params = commonStoryblokParams({
    starts_with: "posts",
    per_page: 100,
    ...queryParams,
  });

  const response = await storyblokApi.get(`cdn/stories`, params, {
    cache: "no-store",
  });

  return response.data.stories ?? [];
}
