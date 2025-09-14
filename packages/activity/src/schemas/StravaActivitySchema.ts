import { z } from 'zod'

export const StravaActivityResourceSchema = z.object({
  name: z.string(),
  description: z.string(),
  distance: z.number(),
  moving_time: z.number(),
  elapsed_time: z.number(),
  type: z.string(),
  sport_type: z.union([
    z.literal('Crossfit'),
    z.literal('Workout')
  ]),
  id: z.number(),
  start_date: z.iso.datetime(),
  start_date_local: z.iso.datetime(),
  timezone: z.string(),
  location_city: z.any(),
  location_state: z.any(),
  location_country: z.any(),
  private: z.boolean(),
  average_speed: z.number(),
  max_speed: z.number(),
  has_heartrate: z.boolean(),
  average_heartrate: z.number(),
  max_heartrate: z.number(),
  calories: z.number()
})

export type StravaActivityResource = z.infer<typeof StravaActivityResourceSchema>