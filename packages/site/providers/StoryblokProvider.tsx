'use client'

import { storyblokInit, apiPlugin } from '@storyblok/react'
import Post from '@/storyblok/Post'
import PostContent from '@/storyblok/PostContent'

storyblokInit({
  accessToken: process.env.STORYBLOK_API_KEY,
  use: [apiPlugin],
  components: {
    post: Post,
    post_content: PostContent,
  },
});

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
