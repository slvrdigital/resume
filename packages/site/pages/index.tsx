import { PageConfig } from 'next'
import meta from '@/public/data/meta.json'
import Section from '@/components/Section'
import List from '@/components/List'
import ListItem from '@/components/ListItem'
import JobCard from '@/storyblok/JobCard'
import RefCard from '@/storyblok/RefCard'
import RichText from '@/storyblok/RichText'
import ArticleCard from '@/devto/ArticleCard'
import ActivityFeed from '@/components/activity/ActivityFeed'
import GoatCounterPixel from '@/components/GoatCounterPixel'
import { fetchIndexPage } from '@/service/storyblok.service'
import { listActivities, listDevArticles } from '@resume/activity'

export const config: PageConfig = {
  unstable_runtimeJS: false,
}

interface PageProps {
  page: Awaited<ReturnType<typeof fetchIndexPage>>
  posts: Awaited<ReturnType<typeof listDevArticles>>
  feed: Awaited<ReturnType<typeof listActivities>>
}

export default function Index({ page, posts, feed }: PageProps) {
  return (
    <>
      <Section title="About">
        <RichText content={page.about} />
      </Section>

      <Section title="Contact">
        <List variant="compact">
          {page.links?.map((ref, index: number) => (
            <ListItem key={index}>
              <RefCard value={ref} />
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="Work Experience" href="/jobs">
        <List>
          {page.jobs?.map((job, index: number) => (
            <ListItem key={index}>
              <JobCard value={job} />
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="Posts" href="/posts">
        <List>
          {posts?.map((post, index: number) => (
            <ListItem key={index}>
              <ArticleCard value={post} />
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="Activities" href='/activity'>
        <ActivityFeed data={feed} />
      </Section>

      <GoatCounterPixel path='/' />
    </>
  )
}

export async function getStaticProps() {
  const indexPage = await fetchIndexPage()
  const posts = await listDevArticles()
  const feed = await listActivities()

  return {
    props: {
      meta: {
        title: 'Index',
        description: meta.site_description,
      },
      page: indexPage,
      posts,
      feed,
    },
  }
}
