import meta from '@/public/data/meta.json'
import Section from '@/components/Section'
import GoatCounterPixel from '@/components/GoatCounterPixel'
import ActivityFeed from '@/components/activity/ActivityFeed'
import { listActivities } from '@resume/activity'

interface Props {
  data: Awaited<ReturnType<typeof listActivities>>
}

export default function Page({ data }: Props) {
  return (
    <>
      <Section title='Activity'>
        <ActivityFeed data={data} />
      </Section>

      <GoatCounterPixel path='/activity' />
    </>
  )
}

export async function getStaticProps() {
  const data = await listActivities(25)

  return {
    props: {
      meta: {
        title: 'Activity',
        description: meta.site_description,
      },
      data
    },
  }
}
