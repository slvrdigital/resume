import { getStoryblokApi } from '@storyblok/react'
import { commonStoryblokParams } from '@/config/storyblokParams'
import type { ResumeIndexSb, ResumeJobSb } from '@/typings/storyblok'
import type { ISbStoryData } from 'storyblok'

const storyblokApi = getStoryblokApi()

export async function fetchIndexPage(): Promise<ResumeIndexSb> {
  const params = commonStoryblokParams({
    resolve_relations: ['index.jobs', 'index.posts'],
  })

  const response = await storyblokApi?.get(`cdn/stories/index`, params, {
    cache: 'no-store',
  })

  return response?.data.story.content ?? {}
}

export async function listJobStories(): Promise<ISbStoryData<ResumeJobSb>[]> {
  const params = commonStoryblokParams({
    starts_with: 'jobs'
  })

  const response = await storyblokApi?.get(`cdn/stories`, params, {
    cache: 'no-store',
  })

  return response?.data.stories ?? []
}
