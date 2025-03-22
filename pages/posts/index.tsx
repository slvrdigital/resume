import { PageConfig } from 'next'
import meta from '@/public/data/meta.json'
import Section from '@/components/Section'
import List from '@/components/List'
import ListItem from '@/components/ListItem'
import ArticleCard from '@/devto/ArticleCard'
import { fetchArticles } from '@/service/devToApi'

export const config: PageConfig = {
  unstable_runtimeJS: false,
}

export default function PostsIndex({
  posts,
}: {
  posts: Awaited<ReturnType<typeof fetchArticles>>
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
    </>
  )
}

export async function getStaticProps() {
  const posts = await fetchArticles(10)

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
