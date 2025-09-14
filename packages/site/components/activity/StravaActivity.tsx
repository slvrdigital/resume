import Title from '@/components/Title'
import Content from '@/components/Content'
import StravaStats from '@/components/strava/StravaStats'

import type { ActivityResource } from '@resume/activity/schemas/ActivitySchema'
import type { StravaActivityResource } from '@resume/activity/schemas/StravaActivitySchema'

export default function StravaActivity({ value }: { value: ActivityResource }) {
  const meta = value.meta as StravaActivityResource

  return (
    <>
      <Title tag='h3'>
        <a href={value.url!} className='link' target='_blank'>
          {value.title}
        </a>
      </Title>

      <div className='mb-4'>
        <StravaStats value={meta} />
      </div>

      {meta.description && <Content html={meta.description} />}
    </>
  )
}
