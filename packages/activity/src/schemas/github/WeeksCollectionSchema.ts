import { z } from 'zod'

export const WeeksCollectionResourceSchema = z.array(
  z.object({
    firstDay: z.iso.date(),
    contributionDays: z.array(
      z.object({
        date: z.iso.date(),
        contributionCount: z.number()
      })
    )
  })
)

export type WeeksCollectionResource = z.infer<typeof WeeksCollectionResourceSchema>
