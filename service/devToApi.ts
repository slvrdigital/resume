import axios from 'axios'

interface Article {
  id: number
  slug: string
  title: string
  description: string
  tag_list: string[]
  body_html: string
  body_markdown: string
  url: string
  [key: string]: any
}

const USERNAME = 'kshevitsky'

export const client = axios.create({
  baseURL: 'https://dev.to/api',
})

export async function fetchArticles(perPage: number = 3): Promise<Article[]> {
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

export async function fetchArticle(id: number): Promise<Article> {
  try {
    const response = await client.get(`/articles/${id}`)

    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch article')
  }
}
