import ActivityCard from './ActivityCard'
import GithubActivity from './GithubActivity'
import StravaActivity from './StravaActivity'
import ActivityBadge from './ActivityBadge'

import type { ActivityResource } from '@resume/activity/schemas/ActivitySchema'


export default function ActivityFeed({ data }: { data: Record<string, ActivityResource[]> }) {
  return (
    <div className='grid gap-6'>
      {Object.entries(data).map(([date, items], idx) => (
        <ActivityCard key={idx} date={date}>
          <ul className='space-y-6'>
            {items.map((item, activityIdx) => (
              <li key={activityIdx} className='grid'>
                <div className='flex items-baseline gap-2'>
                  <ActivityBadge type={item.source} />
                  <ul>
                    <li>
                      {item.source === 'github' && <GithubActivity value={item} />}
                      {item.source === 'strava' && <StravaActivity value={item} />}
                    </li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </ActivityCard>
      ))}
    </div>
  )
}
