import { ISbStoriesParams } from "@storyblok/react";

export function commonStoryblokParams(params?: ISbStoriesParams) {
  const _params: ISbStoriesParams = {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
    ...params,
  };

  return _params;
}
