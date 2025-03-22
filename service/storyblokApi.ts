import { getStoryblokApi, ISbStoriesParams } from '@storyblok/react'
import { commonStoryblokParams } from '@/config/storyblokParams'
import type { ISbStoryData } from 'storyblok'
import type { ResumeIndexSb, ResumePostSb } from '@/typings/storyblok'

const storyblokApi = getStoryblokApi()

export async function fetchIndexPage(): Promise<ResumeIndexSb> {
  const params = commonStoryblokParams({
    resolve_relations: ['index.jobs', 'index.posts'],
  })

  const response = await storyblokApi.get(`cdn/stories/index`, params, {
    cache: 'no-store',
  })

  return response?.data.story.content ?? {}
}
