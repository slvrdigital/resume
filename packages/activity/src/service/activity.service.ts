import { parseISO } from 'date-fns'
import { formatDate } from '@resume/utils/date'
import { listGithubContributionsAsActions } from './github.service'
import { listStravaActivitiesAsActions } from './strava.service'
import type { ActivityResource } from '../schemas/ActivitySchema'

export function groupActivities(
  activities: ActivityResource[],
  limit: number
) {
  const sorted = [...activities].sort(
    (a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime()
  )

  const grouped: Record<string, ActivityResource[]> = {}

  for (const activity of sorted) {
    const key = formatDate(activity.date)
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(activity)
  }

  const keys = Object.keys(grouped)
    .sort(
      (a, b) =>
        parseISO(b).getTime() - parseISO(a).getTime()
    )
    .slice(0, limit)

  const limited: Record<string, ActivityResource[]> = {}
  for (const key of keys) {
    limited[key] = grouped[key]
  }

  return limited
}

export const listActivities = async (limit = 5) => {
  const data = await Promise.all([
    listStravaActivitiesAsActions(),
    listGithubContributionsAsActions(),
  ])

  return groupActivities(data.flat(), limit)
}
