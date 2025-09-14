import { config } from 'dotenv'
import { z } from 'zod'
import path from 'path'

config({ path: path.resolve(__dirname, '.env.local') })

const envSchema = z.object({
  STORYBLOK_API_KEY: z.string({ error: 'Invalid environment variables, missing: STORYBLOK_API_KEY!"' }),
  STORYBLOK_PREVIEW_SECRET: z.string({ error: 'Invalid environment variables, missing: STORYBLOK_PREVIEW_SECRET!"' }),
  STORYBLOK_SPACE_ID: z.string({ error: 'Invalid environment variables, missing: STORYBLOK_SPACE_ID!"' }),
  STRAVA_CLIENT_ID: z.string({ error: 'Invalid environment variables, missing: STRAVA_CLIENT_ID!"' }),
  STRAVA_CLIENT_SECRET: z.string({ error: 'Invalid environment variables, missing: STRAVA_CLIENT_SECRET!"' }),
  STRAVA_REFRESH_TOKEN: z.string({ error: 'Invalid environment variables, missing: STRAVA_REFRESH_TOKEN!"' }),
  NEXT_PUBLIC_API_URL: z.string({ error: 'Invalid environment variables, missing: NEXT_PUBLIC_API_URL!"' }),
  BASE_PATH: z.string({ error: 'Invalid environment variables, missing: BASE_PATH!"' }),
  DEV_TO_API_KEY: z.string({ error: 'Invalid environment variables, missing: DEV_TO_API_KEY!"' }),
  DEV_TO_USERNAME: z.string({ error: 'Invalid environment variables, missing: DEV_TO_USERNAME!"' }),
  GITHUB_USERNAME: z.string({ error: 'Invalid environment variables, missing: GITHUB_USERNAME!"' }),
  GITHUB_TOKEN: z.string({ error: 'Invalid environment variables, missing: GITHUB_TOKEN!"' })
})

export const ENV = envSchema.parse(process.env)
