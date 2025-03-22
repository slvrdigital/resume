import { GetStaticPaths, PageConfig } from 'next'
import meta from '@/public/data/meta.json'
import Content from '@/components/Content'
import { fetchArticle, fetchArticles } from '@/service/devToApi'

export const config: PageConfig = {
  unstable_runtimeJS: false,
}

export default function Post({
  post,
}: {
  post: Awaited<ReturnType<typeof fetchArticle>>
}) {
  return <Content html={post.body_html} />
}

export async function getStaticProps({ params }: { params: { id: number } }) {
  const post = await fetchArticle(params.id)

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
  const posts = await fetchArticles(100) // not all but 100
  const paths = posts.map((post: { id: number }) => `/posts/${post.id}`) || []

  return {
    paths,
    fallback: true,
  }
}
