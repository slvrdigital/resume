import { z } from 'zod'

export const DevArticleResourceSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  tag_list: z.array(z.string()),
  body_html: z.string(),
  body_markdown: z.string(),
  url: z.string()
})

export type DevArticleResource = z.infer<typeof DevArticleResourceSchema>