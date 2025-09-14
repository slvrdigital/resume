import { GetStaticPaths, PageConfig } from 'next'
import meta from '@/public/data/meta.json'
import Content from '@/components/Content'
import Title from '@/components/Title'
import GoatCounterPixel from '@/components/GoatCounterPixel'
import { getDevArticle, listDevArticles } from '@resume/activity'

export const config: PageConfig = {
  unstable_runtimeJS: false,
}

export default function Post({
  post,
}: {
  post: Awaited<ReturnType<typeof getDevArticle>>
}) {
  return (
    post && (
      <article>
        <Title tag="h1">{post.title}</Title>
        <Content html={post.body_html} />
        <GoatCounterPixel path={`/posts/${post.slug}`} />
      </article>
    )
  )
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = await getDevArticle(params.slug)

  return {
    props: {
      meta: {
        title: post.title,
        description: post.description || meta.site_description,
      },
      post: post ?? {},
    },
  }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const posts = await listDevArticles(100) // not all but 100
  const paths = posts.map((post) => `/posts/${post.slug}`) || []

  return {
    paths,
    fallback: true,
  }
}
