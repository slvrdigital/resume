import axios from 'axios'

import type { DevArticleResource } from '../schemas/DevArticleSchema'


const client = axios.create({
  baseURL: 'https://dev.to/api',
  headers: {
    'api-key': process.env.DEV_TO_API_KEY,
  },
})

export async function listDevArticles(perPage: number = 3): Promise<DevArticleResource[]> {
  const USERNAME = process.env.DEV_TO_USERNAME!

  try {
    const response = await client.get(`/articles`, {
      params: {
        username: USERNAME,
        per_page: perPage,
      },
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch articles')
  }
}

export async function getDevArticle(slug: string): Promise<DevArticleResource> {
  const USERNAME = process.env.DEV_TO_USERNAME!

  try {
    const response = await client.get(`/articles/${USERNAME}/${slug}`)

    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch article')
  }
}
