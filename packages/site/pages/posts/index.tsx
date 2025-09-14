import { PageConfig } from 'next'
import meta from '@/public/data/meta.json'
import Section from '@/components/Section'
import List from '@/components/List'
import ListItem from '@/components/ListItem'
import ArticleCard from '@/devto/ArticleCard'
import GoatCounterPixel from '@/components/GoatCounterPixel'
import { listDevArticles } from '@resume/activity'

export const config: PageConfig = {
  unstable_runtimeJS: false,
}

export default function PostsIndex({
  posts,
}: {
  posts: Awaited<ReturnType<typeof listDevArticles>>
}) {
  return (
    <>
      <Section title="Posts">
        <List>
          {posts?.map((post, index: number) => (
            <ListItem key={index}>
              <ArticleCard value={post} />
            </ListItem>
          ))}
        </List>
      </Section>

      <GoatCounterPixel path='/posts' />
    </>
  )
}

export async function getStaticProps() {
  const posts = await listDevArticles(10)

  return {
    props: {
      meta: {
        title: 'Posts',
        description: meta.site_description,
      },
      posts,
    },
  }
}
