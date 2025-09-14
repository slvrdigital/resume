import { z } from 'zod'

export const ActivitSourceEnum = z.enum([
  'github',
  'strava'
])

export const ActivityResourceSchema = z.object({
  date: z.iso.datetime(),
  source: ActivitSourceEnum,
  title: z.string(),
  description: z.string().nullish(),
  url: z.string().nullish(),
  meta: z.unknown().nullish()
})

export type ActivityResource = z.infer<typeof ActivityResourceSchema>