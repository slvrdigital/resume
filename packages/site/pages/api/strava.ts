import { listExtendedStravaActivities } from '@resume/activity'
import type { StravaActivityResource } from '@resume/activity/schemas/StravaActivitySchema'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StravaActivityResource[]>
) {
  const response = await listExtendedStravaActivities()

  res.status(200).json(response)
}
