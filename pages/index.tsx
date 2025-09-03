import { PageConfig } from 'next'
import meta from '@/public/data/meta.json'
import projects from '@/public/data/projects.json'
import Section from '@/components/Section'
import List from '@/components/List'
import ListItem from '@/components/ListItem'
import Strava from '@/components/strava/Strava'
import type { Activity } from '@/typings/strava'
import JobCard from '@/storyblok/JobCard'
import RefCard from '@/storyblok/RefCard'
import ProjectCard, { type Project } from '@/storyblok/ProjectCard'
import RichText from '@/storyblok/RichText'
import ArticleCard from '@/devto/ArticleCard'
import GoatCounterPixel from '@/components/GoatCounterPixel'
import { fetchExtendedActivities } from '@/service/stravaApi'
import { fetchIndexPage } from '@/service/storyblokApi'
import { fetchArticles } from '@/service/devToApi'

export const config: PageConfig = {
  unstable_runtimeJS: false,
}

interface PageProps {
  page: Awaited<ReturnType<typeof fetchIndexPage>>
  posts: Awaited<ReturnType<typeof fetchArticles>>
  activities: Activity[]
}

export default function Index({ page, posts, activities }: PageProps) {
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

      <Section title="Work Experience">
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

      <Section title="Side Projects">
        <List>
          {projects.map((project: Project, index: number) => (
            <ListItem key={index}>
              <ProjectCard value={project} />
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="Recent Activities" href={meta.strava_profile}>
        <Strava activities={activities} />
      </Section>

      <GoatCounterPixel path='/' />
    </>
  )
}

export async function getStaticProps() {
  const stravaActivities = await fetchExtendedActivities()
  const indexPage = await fetchIndexPage()
  const posts = await fetchArticles()

  return {
    props: {
      meta: {
        title: 'Index',
        description: meta.site_description,
      },
      activities: stravaActivities,
      page: indexPage,
      posts,
    },
  }
}
