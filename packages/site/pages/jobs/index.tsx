import { PageConfig } from 'next'
import meta from '@/public/data/meta.json'
import Section from '@/components/Section'
import List from '@/components/List'
import ListItem from '@/components/ListItem'
import JobCard from '@/storyblok/JobCard'
import GoatCounterPixel from '@/components/GoatCounterPixel'
import { listJobStories } from '@/service/storyblok.service'

export const config: PageConfig = {
  unstable_runtimeJS: false,
}

export default function Page({
  jobs,
}: {
  jobs: Awaited<ReturnType<typeof listJobStories>>
}) {
  return (
    <>
      <Section title="Work Experience">
        <List>
          {jobs?.map((job, index: number) => (
            <ListItem key={index}>
              <JobCard value={job} />
            </ListItem>
          ))}
        </List>
      </Section>

      <GoatCounterPixel path='/jobs' />
    </>
  )
}

export async function getStaticProps() {
  const jobs = await listJobStories()

  return {
    props: {
      meta: {
        title: 'Jobs',
        description: meta.site_description,
      },
      jobs,
    },
  }
}
