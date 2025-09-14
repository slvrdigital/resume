import Title from '@/components/Title'
import Content from '@/components/Content'

import type { ActivityResource } from '@resume/activity/schemas/ActivitySchema'

export default function GithubActivity({ value }: { value: ActivityResource }) {
  return (
    <>
      <Title tag='h3'>
        <a href={value.url!} className='link' target='_blank'>
          {value.title}
        </a>
      </Title>

      {value.description && <Content html={value.description} />}
    </>
  )
}
